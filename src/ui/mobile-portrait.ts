/**
 * Interfaccia unificata per display verticali (smartphone in portrait).
 *
 * Su schermi orizzontali (desktop, tablet, telefono ruotato) questo modulo
 * resta inattivo e lascia lavorare il canvas 16:9 di Phaser così com'è.
 *
 * Su display verticali (`window.innerHeight > window.innerWidth`):
 *  - NON divide lo schermo in due e NON duplica i menu: nasconde i testi,
 *    i pannelli e i bottoni duplicati dentro il canvas Phaser, lasciando nel
 *    canvas Phaser SOLO il mondo animato a fondo schermo (cielo, Wuhu Island,
 *    pista d'atletica, checkpoint e Pico che corre/salta);
 *  - mostra UN UNICO menu / quiz in stile Nintendo Wii Sports a tutto schermo
 *    (`#mobile-deck`), con il titolo, le domande, le icone e i pulsanti grandi
 *    perfettamente impaginati per lo schermo verticale.
 */
import type Phaser from 'phaser';
import { getMobileItems, type MobileItem } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { GAME_NAME } from '../core/constants';

interface TextEntry {
  text: string;
  x: number;
  y: number;
}

const origAlphaMap = new WeakMap<object, number>();

/**
 * In modalità verticale nasconde gli elementi UI di Phaser (testi, bottoni,
 * cornici) così non compaiono due volte (sopra nel canvas e sotto in HTML),
 * lasciando visibili nel canvas SOLO lo sfondo, la pista e Pico (`depth <= -13`).
 */
function sincronizzaVisibilitaCanvas(
  scene: Phaser.Scene | null,
  nascondiUiPhaser: boolean
): void {
  if (!scene) return;
  for (const obj of scene.children.list) {
    const o = obj as unknown as {
      depth?: number;
      name?: string;
      alpha?: number;
      setAlpha?: (a: number) => void;
    };
    if (typeof o.setAlpha !== 'function' || typeof o.alpha !== 'number') continue;
    const depth = o.depth ?? 0;
    // Manteniamo visibili: cielo, colline, pista, bordo, polvere, Pico, checkpoint, bandiera
    const isMondo = depth <= -13;
    if (isMondo) continue;

    if (nascondiUiPhaser) {
      if (!origAlphaMap.has(o) && o.alpha > 0.01) {
        origAlphaMap.set(o, o.alpha);
      }
      if (o.alpha > 0.002) {
        o.setAlpha(0.001);
      }
    } else if (origAlphaMap.has(o)) {
      o.setAlpha(origAlphaMap.get(o)!);
      origAlphaMap.delete(o);
    }
  }
}

/** Estrae l'eventuale icona della prova "riconosci l'immagine" come data URL. */
function estraiIconaProva(scene: Phaser.Scene | null): string | null {
  if (!scene) return null;
  for (const obj of scene.children.list) {
    const n = obj as {
      type?: string;
      texture?: { key?: string; getSourceImage?: () => HTMLCanvasElement | HTMLImageElement };
    };
    const key = n.texture?.key ?? '';
    if (n.type === 'Image' && key.startsWith('icon-')) {
      const src = n.texture?.getSourceImage?.();
      if (src && 'toDataURL' in src && typeof src.toDataURL === 'function') {
        return src.toDataURL();
      }
    }
  }
  return null;
}

function raccogliTesti(scene: Phaser.Scene | null): TextEntry[] {
  if (!scene) return [];
  const out: TextEntry[] = [];
  const walk = (o: unknown): void => {
    const n = o as {
      type?: string;
      text?: string;
      x?: number;
      y?: number;
      visible?: boolean;
      parentContainer?: unknown;
      list?: unknown[];
    };
    if (!n || n.visible === false) return;
    if (n.type === 'Text' && n.text && !n.parentContainer) {
      const t = String(n.text).trim();
      if (t) out.push({ text: t, x: n.x ?? 0, y: n.y ?? 0 });
    }
    if (n.list) n.list.forEach(walk);
  };
  scene.children.list.forEach(walk);
  return out;
}

function creaBtnDom(item: MobileItem, extraClass = ''): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  const st = item.state();
  const en = item.enabled();
  b.className = `m-btn m-state-${st} ${extraClass}`.trim();
  b.textContent = item.label();
  b.disabled = !en && st === 'disabled';
  b.addEventListener('click', (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    item.trigger();
  });
  return b;
}

export function initMobilePortrait(game: Phaser.Game): void {
  const deck = document.createElement('div');
  deck.id = 'mobile-deck';
  deck.setAttribute('role', 'region');
  deck.setAttribute('aria-label', 'Interfaccia mobile verticale');
  document.body.appendChild(deck);

  let ultimaChiave = '';

  const aggiorna = (): void => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const verticale = vh > vw;
    document.body.classList.toggle('verticale', verticale);

    const attive = game.scene.getScenes(true);
    const scena = attive[attive.length - 1] ?? null;
    const key = scena?.scene.key ?? 'Boot';
    document.body.dataset.scena = key;

    if (!verticale) {
      sincronizzaVisibilitaCanvas(scena, false);
      if (deck.style.display !== 'none') {
        deck.style.display = 'none';
        ultimaChiave = '';
      }
      return;
    }

    const impostazioni = loadSettings();
    // Nel Runner 3D attivo durante la partita lavorano il canvas 3D + #comandi-runner + #risposte-runner
    const inRunner3D =
      document.body.classList.contains('con-3d') &&
      impostazioni.mode === 'runner' &&
      key === 'Game';
    if (inRunner3D || key === 'Boot') {
      sincronizzaVisibilitaCanvas(scena, false);
      deck.style.display = 'none';
      ultimaChiave = `hidden:${key}:${inRunner3D}`;
      return;
    }

    // Nascondiamo i menu/testi duplicati dal canvas Phaser, lasciando solo il mondo e Pico!
    sincronizzaVisibilitaCanvas(scena, true);
    deck.style.display = 'flex';

    const cfg = resolveConfig(impostazioni);
    deck.classList.toggle('bes-dislessia', cfg.font === 'dyslexia');
    deck.classList.toggle('bes-hc', cfg.highContrast);
    deck.style.setProperty('--m-font-scale', String(cfg.fontScale));

    const items = getMobileItems(scena);
    const testi = raccogliTesti(scena);
    const iconaUrl = key === 'Game' ? estraiIconaProva(scena) : null;

    const firmaItems = items
      .map(
        (it) =>
          `${it.id}:${it.kind}:${it.label()}:${it.state()}:${it.enabled() ? 1 : 0}:${Math.round(it.x())}:${Math.round(it.y())}`
      )
      .join('|');
    const firmaTesti = testi.map((t) => `${t.text}@${Math.round(t.y)}`).join('|');
    const chiaveAttuale = `${key}::${cfg.font}::${cfg.highContrast}::${cfg.fontScale}::${Boolean(iconaUrl)}::${firmaItems}::${firmaTesti}`;

    if (chiaveAttuale === ultimaChiave) return;
    ultimaChiave = chiaveAttuale;

    const scrollPrev = deck.scrollTop;
    deck.innerHTML = '';

    if (key === 'Title') {
      renderTitle(deck, items, testi);
    } else if (key === 'Subject') {
      renderSubject(deck, items, testi, scena);
    } else if (key === 'Levels') {
      renderLevels(deck, items, testi);
    } else if (key === 'Settings') {
      renderSettings(deck, items, testi);
    } else if (key === 'Progress') {
      renderProgress(deck, items, testi);
    } else if (key === 'Game') {
      renderGame(deck, items, testi, iconaUrl);
    } else if (key === 'Pause' || key === 'Results') {
      renderModalScene(deck, items, testi);
    }

    if (scrollPrev > 0) deck.scrollTop = scrollPrev;
  };

  window.addEventListener('resize', aggiorna);
  window.addEventListener('orientationchange', aggiorna);
  window.setInterval(aggiorna, 100);
  aggiorna();
}

function renderTitle(deck: HTMLElement, items: MobileItem[], testi: TextEntry[]): void {
  const card = document.createElement('div');
  card.className = 'm-card m-card-title';

  // Badge superiore stile Wii Sports
  const badgeTop = document.createElement('div');
  badgeTop.className = 'm-wii-tag';
  badgeTop.textContent = '★ WII SPORTS EDU EDITION ★';
  card.appendChild(badgeTop);

  // Titolo principale unico (non duplicato)
  const titleEl = document.createElement('h1');
  titleEl.className = 'm-game-title';
  titleEl.textContent = GAME_NAME;
  card.appendChild(titleEl);

  const sub = testi.find((t) => t.text.includes('Scegli la materia'));
  if (sub) {
    const p = document.createElement('p');
    p.className = 'm-sub';
    p.textContent = sub.text;
    card.appendChild(p);
  }

  // Icone decorative delle 4 materie in fila
  const iconsRow = document.createElement('div');
  iconsRow.className = 'm-sport-badges';
  iconsRow.innerHTML =
    '<span class="m-sport-dot" title="Matematica">📐</span>' +
    '<span class="m-sport-dot" title="Italiano">📖</span>' +
    '<span class="m-sport-dot" title="Scienze">🔬</span>' +
    '<span class="m-sport-dot" title="Storia">🏛️</span>';
  card.appendChild(iconsRow);

  const info = testi.find((t) => t.text.startsWith('Classe:'));
  if (info) {
    const pill = document.createElement('div');
    pill.className = 'm-pill';
    pill.textContent = info.text;
    card.appendChild(pill);
  }

  const gioca = items.find((i) => i.label() === 'Gioca');
  if (gioca) {
    card.appendChild(creaBtnDom(gioca, 'm-btn-primary m-btn-hero'));
  }

  const row = document.createElement('div');
  row.className = 'm-grid-2';
  const imp = items.find((i) => i.label() === 'Impostazioni');
  const prog = items.find((i) => i.label() === 'Progressi');
  if (imp) row.appendChild(creaBtnDom(imp, 'm-btn-secondary'));
  if (prog) row.appendChild(creaBtnDom(prog, 'm-btn-secondary'));
  card.appendChild(row);

  const copy = document.createElement('div');
  copy.className = 'm-copy';
  copy.textContent = '© Claudio Borsotti · Applicazione in fase di sviluppo';
  card.appendChild(copy);

  deck.appendChild(card);
}

function renderSubject(
  deck: HTMLElement,
  items: MobileItem[],
  testi: TextEntry[],
  scena: Phaser.Scene | null
): void {
  const card = document.createElement('div');
  card.className = 'm-card';

  const h = document.createElement('div');
  h.className = 'm-header';
  h.textContent = 'Scegli la materia';
  card.appendChild(h);

  const classeTxt = testi.find((t) => t.text.startsWith('Classe attiva:'));
  if (classeTxt) {
    const pill = document.createElement('div');
    pill.className = 'm-pill';
    pill.textContent = classeTxt.text;
    card.appendChild(pill);
  }

  const icone: Record<string, string> = {
    Matematica: '📐 ',
    Italiano: '📖 ',
    Scienze: '🔬 ',
    Storia: '🏛️ '
  };

  const grid = document.createElement('div');
  grid.className = 'm-grid-2';
  const materie = items.filter((i) => i.label() !== 'Tutte le tappe');
  materie.forEach((m) => {
    const b = creaBtnDom(m, 'm-btn-subject');
    const starTxt = testi.find(
      (t) => Math.abs(t.x - m.x()) < 40 && Math.abs(t.y - (m.y() + 52)) < 25
    );
    b.innerHTML = `<span class="m-subj-title">${icone[m.label()] ?? ''}${m.label()}</span>${
      starTxt ? `<span class="m-subj-stars">${starTxt.text}</span>` : ''
    }`;
    grid.appendChild(b);
  });
  card.appendChild(grid);

  const bottomRow = document.createElement('div');
  bottomRow.className = 'm-grid-2';
  const tappe = items.find((i) => i.label() === 'Tutte le tappe');
  if (tappe) {
    bottomRow.appendChild(creaBtnDom(tappe, 'm-btn-secondary'));
  }
  const homeBtn = document.createElement('button');
  homeBtn.type = 'button';
  homeBtn.className = 'm-btn m-btn-secondary';
  homeBtn.textContent = 'Torna al titolo';
  homeBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    scena?.scene.start('Title');
  });
  bottomRow.appendChild(homeBtn);
  card.appendChild(bottomRow);

  deck.appendChild(card);
}

function renderLevels(deck: HTMLElement, items: MobileItem[], _testi: TextEntry[]): void {
  const card = document.createElement('div');
  card.className = 'm-card';

  const h = document.createElement('div');
  h.className = 'm-header';
  h.textContent = 'Tutte le tappe';
  card.appendChild(h);

  const nomiMaterie = ['Matematica', 'Italiano', 'Scienze', 'Storia'];
  const bottoniTappe = items.filter((i) => i.label().startsWith('Tappa'));

  nomiMaterie.forEach((nome, rowIdx) => {
    const yAtteso = 150 + rowIdx * 92;
    const diRiga = bottoniTappe
      .filter((b) => Math.abs(b.y() - yAtteso) < 25)
      .sort((a, b) => a.x() - b.x());
    if (diRiga.length === 0) return;

    const grp = document.createElement('div');
    grp.className = 'm-level-group';
    const lbl = document.createElement('div');
    lbl.className = 'm-group-title';
    lbl.textContent = nome;
    grp.appendChild(lbl);

    const row = document.createElement('div');
    row.className = 'm-grid-3';
    diRiga.forEach((b) => row.appendChild(creaBtnDom(b, 'm-btn-compact')));
    grp.appendChild(row);
    card.appendChild(grp);
  });

  const indietro = items.find((i) => i.label() === 'Indietro');
  if (indietro) card.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));

  deck.appendChild(card);
}

function renderSettings(deck: HTMLElement, items: MobileItem[], testi: TextEntry[]): void {
  const card = document.createElement('div');
  card.className = 'm-card';

  const toggles = items.filter((i) => i.kind === 'toggle');
  const buttons = items.filter((i) => i.kind === 'button');

  if (toggles.length > 5) {
    const h = document.createElement('div');
    h.className = 'm-header';
    h.textContent = 'Regole BES una per una';
    card.appendChild(h);

    const indietro = buttons.find((b) => b.label() === 'Torna ai profili');
    if (indietro) card.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));

    const list = document.createElement('div');
    list.className = 'm-toggle-list';
    toggles.forEach((t) => {
      const b = document.createElement('button');
      b.type = 'button';
      const on = t.state() === 'on';
      b.className = `m-toggle-row ${on ? 'is-on' : 'is-off'}`;
      b.innerHTML = `<span class="m-toggle-lbl">${t.label()}</span><span class="m-toggle-badge">${
        on ? 'ON' : 'OFF'
      }</span>`;
      b.addEventListener('click', (ev) => {
        ev.preventDefault();
        t.trigger();
      });
      list.appendChild(b);
    });
    card.appendChild(list);
    deck.appendChild(card);
    return;
  }

  if (toggles.length === 1) {
    const h = document.createElement('div');
    h.className = 'm-header';
    h.textContent = 'Anno scolastico e difficoltà';
    card.appendChild(h);

    const desc = testi.find((t) => t.y > 95 && t.y < 125);
    if (desc) {
      const pill = document.createElement('div');
      pill.className = 'm-pill';
      pill.textContent = desc.text;
      card.appendChild(pill);
    }

    const primaria = buttons.filter((b) => b.label().includes('Primaria'));
    if (primaria.length > 0) {
      const lbl = document.createElement('div');
      lbl.className = 'm-group-title';
      lbl.textContent = 'Scuola Primaria (1ª – 5ª)';
      card.appendChild(lbl);
      const g = document.createElement('div');
      g.className = 'm-grid-3';
      primaria.forEach((b) => g.appendChild(creaBtnDom(b, 'm-btn-compact')));
      card.appendChild(g);
    }

    const secondaria = buttons.filter((b) => b.label().includes('Secondaria'));
    if (secondaria.length > 0) {
      const lbl = document.createElement('div');
      lbl.className = 'm-group-title';
      lbl.textContent = 'Scuola Secondaria I grado (1ª – 3ª)';
      card.appendChild(lbl);
      const g = document.createElement('div');
      g.className = 'm-grid-3';
      secondaria.forEach((b) => g.appendChild(creaBtnDom(b, 'm-btn-compact')));
      card.appendChild(g);
    }

    const t = toggles[0];
    const tb = document.createElement('button');
    tb.type = 'button';
    const on = t.state() === 'on';
    tb.className = `m-toggle-row ${on ? 'is-on' : 'is-off'}`;
    tb.innerHTML = `<span class="m-toggle-lbl">${t.label()}</span><span class="m-toggle-badge">${
      on ? 'ON' : 'OFF'
    }</span>`;
    tb.addEventListener('click', (ev) => {
      ev.preventDefault();
      t.trigger();
    });
    card.appendChild(tb);

    const indietro = buttons.find((b) => b.label() === 'Torna ai profili');
    if (indietro) card.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));

    deck.appendChild(card);
    return;
  }

  const h = document.createElement('div');
  h.className = 'm-header';
  h.textContent = 'Impostazioni';
  card.appendChild(h);

  const navTop = document.createElement('div');
  navTop.className = 'm-grid-3';
  ['Torna al titolo', 'Anno scolastico', 'Regole una per una'].forEach((lbl) => {
    const b = buttons.find((it) => it.label() === lbl);
    if (b) navTop.appendChild(creaBtnDom(b, 'm-btn-compact m-btn-secondary'));
  });
  card.appendChild(navTop);

  const modeRow = document.createElement('div');
  modeRow.className = 'm-grid-4';
  ['Quiz (bottoni)', 'Runner (cartelli)', '2D', '3D'].forEach((lbl) => {
    const b = buttons.find((it) => it.label() === lbl);
    if (b) modeRow.appendChild(creaBtnDom(b, 'm-btn-compact'));
  });
  card.appendChild(modeRow);

  const classi = buttons.filter((b) => Math.abs(b.y() - 452) < 15);
  if (classi.length > 0) {
    const lbl = document.createElement('div');
    lbl.className = 'm-group-title';
    lbl.textContent = 'Classe (Primaria 1ª–5ª · Secondaria I 1ª–3ª)';
    card.appendChild(lbl);
    const cg = document.createElement('div');
    cg.className = 'm-grid-4';
    classi.forEach((b) => cg.appendChild(creaBtnDom(b, 'm-btn-compact')));
    card.appendChild(cg);
  }

  const profili = buttons.filter((b) => b.y() >= 210 && b.y() <= 415);
  const nessuno = buttons.find((b) => b.label() === 'Nessun profilo');
  if (profili.length > 0) {
    const lbl = document.createElement('div');
    lbl.className = 'm-group-title';
    lbl.textContent = 'Profilo BES';
    card.appendChild(lbl);
    const pg = document.createElement('div');
    pg.className = 'm-grid-2';
    profili.forEach((b) => pg.appendChild(creaBtnDom(b, 'm-btn-compact')));
    if (nessuno) pg.appendChild(creaBtnDom(nessuno, 'm-btn-compact m-btn-secondary'));
    card.appendChild(pg);
  }

  deck.appendChild(card);
}

function renderProgress(deck: HTMLElement, items: MobileItem[], testi: TextEntry[]): void {
  const card = document.createElement('div');
  card.className = 'm-card';

  const h = document.createElement('div');
  h.className = 'm-header';
  h.textContent = 'Progressi e stelle';
  card.appendChild(h);

  const tot = testi.find((t) => t.text.startsWith('Totale:'));
  const ult = testi.find((t) => t.text.startsWith('Ultima partita:'));
  if (tot || ult) {
    const pill = document.createElement('div');
    pill.className = 'm-pill';
    pill.textContent = [tot?.text, ult?.text].filter(Boolean).join(' · ');
    card.appendChild(pill);
  }

  const list = document.createElement('div');
  list.className = 'm-progress-list';
  const righeTitoli = testi.filter((t) => t.text.includes(' — '));
  righeTitoli.forEach((r) => {
    const star = testi.find((t) => t.text.startsWith('★') && Math.abs(t.y - r.y) < 12 && t.x > r.x);
    const row = document.createElement('div');
    row.className = 'm-progress-row';
    row.innerHTML = `<span class="m-prog-title">${r.text}</span><span class="m-prog-stars">${
      star?.text ?? ''
    }</span>`;
    list.appendChild(row);
  });
  card.appendChild(list);

  const indietro = items.find((i) => i.label() === 'Torna al titolo');
  if (indietro) card.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));

  deck.appendChild(card);
}

function renderModalScene(deck: HTMLElement, items: MobileItem[], testi: TextEntry[]): void {
  const card = document.createElement('div');
  card.className = 'm-card';

  testi.forEach((t, idx) => {
    const el = document.createElement('div');
    el.className = idx === 0 ? 'm-header' : 'm-sub';
    el.textContent = t.text;
    card.appendChild(el);
  });

  const col = document.createElement('div');
  col.className = 'm-stack';
  items.forEach((it) => col.appendChild(creaBtnDom(it)));
  card.appendChild(col);

  deck.appendChild(card);
}

function renderGame(
  deck: HTMLElement,
  items: MobileItem[],
  testi: TextEntry[],
  iconaUrl: string | null
): void {
  const card = document.createElement('div');
  card.className = 'm-card';

  // Intestazione tappa + contatore
  const headerTappa = testi.find((t) => Math.abs(t.y - 20) < 12 && t.x < 650);
  const contatore = testi.find((t) => t.text.startsWith('Prova '));
  if (headerTappa || contatore) {
    const topMeta = document.createElement('div');
    topMeta.className = 'm-pill';
    topMeta.textContent = [headerTappa?.text, contatore?.text].filter(Boolean).join(' · ');
    card.appendChild(topMeta);
  }

  // Domanda (prompt) e indizio
  const prompt = testi.find((t) => Math.abs(t.y - 66) < 20);
  const hint = testi.find((t) => t.text.startsWith('💡'));
  const rileggi = items.find((i) => i.kind === 'button' && i.label() === 'Rileggi');

  if (prompt || rileggi) {
    const pBox = document.createElement('div');
    pBox.className = 'm-prompt-box';
    if (prompt) {
      const pTxt = document.createElement('div');
      pTxt.className = 'm-prompt-text';
      pTxt.textContent = prompt.text;
      pBox.appendChild(pTxt);
    }
    if (rileggi) {
      pBox.appendChild(creaBtnDom(rileggi, 'm-btn-compact m-btn-secondary'));
    }
    card.appendChild(pBox);
  }

  if (iconaUrl) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'm-icon-wrap';
    const img = document.createElement('img');
    img.src = iconaUrl;
    img.alt = 'Immagine della domanda';
    img.className = 'm-round-icon';
    imgWrap.appendChild(img);
    card.appendChild(imgWrap);
  }

  if (hint) {
    const hBox = document.createElement('div');
    hBox.className = 'm-hint-box';
    hBox.textContent = hint.text;
    card.appendChild(hBox);
  }

  // 1) Prove Quiz / Immagine (bottoni) o Runner 2D (cartelli)
  const opzioni = items.filter(
    (i) => (i.kind === 'button' && i.label() !== 'Rileggi') || i.kind === 'sign'
  );
  if (opzioni.length > 0) {
    const inAvvicinamento =
      opzioni[0].kind === 'sign' &&
      opzioni.every((o) => !o.enabled() && o.state() !== 'correct');
    if (inAvvicinamento) {
      const wait = document.createElement('div');
      wait.className = 'm-pill';
      wait.textContent = '🏃 Pico sta arrivando al cancello… preparati a rispondere!';
      card.appendChild(wait);
    }
    const grid = document.createElement('div');
    grid.className = opzioni.length <= 2 ? 'm-stack' : 'm-grid-2';
    opzioni.forEach((opt) => grid.appendChild(creaBtnDom(opt, 'm-btn-answer')));
    card.appendChild(grid);
    deck.appendChild(card);
    return;
  }

  // 2) Prove con Chip: Abbinamenti (Match) oppure Riordino/Sequenza (Order)
  const chips = items.filter((i) => i.kind === 'chip');
  if (chips.length > 0) {
    const sinistre = chips.filter((c) => Math.abs(c.x() - 276) < 25).sort((a, b) => a.y() - b.y());
    const destre = chips.filter((c) => Math.abs(c.x() - 748) < 25).sort((a, b) => a.y() - b.y());

    if (sinistre.length > 0 && destre.length === sinistre.length) {
      const instr = document.createElement('div');
      instr.className = 'm-sub';
      instr.textContent = 'Tocca un elemento a sinistra e poi il suo compagno a destra:';
      card.appendChild(instr);

      const matchGrid = document.createElement('div');
      matchGrid.className = 'm-grid-2';
      for (let i = 0; i < sinistre.length; i++) {
        matchGrid.appendChild(creaBtnDom(sinistre[i], 'm-btn-chip'));
        matchGrid.appendChild(creaBtnDom(destre[i], 'm-btn-chip'));
      }
      card.appendChild(matchGrid);
    } else {
      const inSlot = chips.filter((c) => c.y() < 300).sort((a, b) => a.x() - b.x());
      const inPool = chips.filter((c) => c.y() >= 300).sort((a, b) => a.x() - b.x());

      const instr = document.createElement('div');
      instr.className = 'm-sub';
      instr.textContent = `Tocca le tessere nell'ordine giusto (da 1 a ${chips.length}):`;
      card.appendChild(instr);

      const slotRow = document.createElement('div');
      slotRow.className = 'm-slot-row';
      for (let i = 0; i < chips.length; i++) {
        const piazzata = inSlot[i];
        if (piazzata) {
          const b = creaBtnDom(piazzata, 'm-btn-slot is-filled');
          b.innerHTML = `<span class="m-slot-num">${i + 1}.</span> <span>${piazzata.label()}</span>`;
          slotRow.appendChild(b);
        } else {
          const empty = document.createElement('div');
          empty.className = 'm-slot-empty';
          empty.textContent = `${i + 1}`;
          slotRow.appendChild(empty);
        }
      }
      card.appendChild(slotRow);

      if (inPool.length > 0) {
        const poolGrid = document.createElement('div');
        poolGrid.className = 'm-grid-2';
        inPool.forEach((c) => poolGrid.appendChild(creaBtnDom(c, 'm-btn-chip')));
        card.appendChild(poolGrid);
      }
    }
  }

  deck.appendChild(card);
}
