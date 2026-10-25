/**
 * Interfaccia unificata per display verticali (smartphone in portrait).
 *
 * Su schermi orizzontali (desktop, tablet, telefono ruotato) questo modulo
 * resta inattivo e lascia lavorare il canvas 16:9 di Phaser così com'è.
 *
 * Su display verticali (`window.innerHeight > window.innerWidth`):
 *  - NON divide lo schermo in due e NON duplica i menu: nasconde i testi,
 *    i pannelli e i bottoni duplicati dentro il canvas Phaser, lasciando nel
 *    canvas Phaser SOLO il mondo animato a fondo schermo (cielo, Isola dell Atleta,
 *    pista d'atletica, checkpoint e Pico che corre/salta);
 *  - mostra UN UNICO menu / quiz in stile Edu Sports Arena a tutto schermo
 *    (`#mobile-deck`), con il titolo, le domande, le icone e i pulsanti grandi
 *    perfettamente impaginati per lo schermo verticale.
 */
import type Phaser from 'phaser';
import { getMobileItems, type MobileItem } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { GAME_NAME, GAME_PAYOFF } from '../core/constants';
import { getTeamSetup, getProfileLabel, getPlayerSummary } from '../core/player';
import { totalStarsForPlayer } from '../core/progress';
import { toggleFullscreen } from './fullscreen';

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
    const isTouch = typeof navigator !== 'undefined' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);
    const minDim = Math.min(vw, vh);
    const isPhone = isTouch && minDim <= 768;
    const verticale = vh > vw;
    document.body.classList.toggle('verticale', verticale);
    document.body.classList.toggle('smartphone', isPhone);
    document.body.classList.toggle('smartphone-orizzontale', isPhone && !verticale);

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
      game.scale.refresh();
      return;
    }

    if (key === 'Boot') {
      sincronizzaVisibilitaCanvas(scena, false);
      deck.style.display = 'none';
      ultimaChiave = `hidden:${key}`;
      return;
    }

    // In verticale mostriamo l'interfaccia card touch per smartphone
    sincronizzaVisibilitaCanvas(scena, true);
    deck.style.display = 'flex';

    const impostazioni = loadSettings();
    const cfg = resolveConfig(impostazioni);
    deck.classList.toggle('bes-dislessia', cfg.font === 'dyslexia');
    deck.classList.toggle('bes-hc', cfg.highContrast);
    deck.style.setProperty('--m-font-scale', String(cfg.fontScale));

    const items = getMobileItems(scena);
    const testi = raccogliTesti(scena);
    const iconaUrl = key === 'Game' ? estraiIconaProva(scena) : null;
    const pageTab = document.body.dataset.settingsPage ?? '';

    const firmaItems = items
      .map(
        (it) =>
          `${it.id}:${it.kind}:${it.label()}:${it.state()}:${it.enabled() ? 1 : 0}`
      )
      .join('|');
    const firmaTesti = testi.map((t) => t.text).join('|');
    const chiaveAttuale = `${key}::${pageTab}::${cfg.font}::${cfg.highContrast}::${cfg.fontScale}::${Boolean(iconaUrl)}::${firmaItems}::${firmaTesti}`;

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
      renderGame(deck, items, testi, iconaUrl, scena);
    } else if (key === 'Pause' || key === 'Results') {
      renderModalScene(deck, items, testi);
    }

    if (scrollPrev > 0) deck.scrollTop = scrollPrev;
  };

  const suResize = (): void => {
    game.scale.refresh();
    aggiorna();
  };

  window.addEventListener('resize', suResize);
  window.addEventListener('orientationchange', suResize);
  window.setInterval(aggiorna, 250);
  aggiorna();
}

function renderTitle(deck: HTMLElement, items: MobileItem[], testi: TextEntry[]): void {
  const card = document.createElement('div');
  card.className = 'm-card m-card-title';

  // Badge superiore stile Sport
  const badgeTop = document.createElement('div');
  badgeTop.className = 'm-sport-tag';
  badgeTop.textContent = '★ EDIZIONE EDU SPORTIVA ★';
  card.appendChild(badgeTop);

  // Titolo principale unico (non duplicato)
  const titleEl = document.createElement('h1');
  titleEl.className = 'm-game-title';
  titleEl.textContent = GAME_NAME;
  card.appendChild(titleEl);

  const payoffEl = document.createElement('p');
  payoffEl.className = 'm-sub m-payoff';
  payoffEl.textContent = GAME_PAYOFF;
  card.appendChild(payoffEl);

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

  const btnPlayer = items.find(
    (i) =>
      i.label().includes('Giocatore') ||
      i.label().includes('👥') ||
      i.label().includes('🦊') ||
      i.label().includes('👤')
  );
  if (btnPlayer) {
    card.appendChild(creaBtnDom(btnPlayer, 'm-btn-secondary'));
  }

  const gioca = items.find((i) => i.label() === 'Gioca');
  if (gioca) {
    card.appendChild(creaBtnDom(gioca, 'm-btn-primary m-btn-hero'));
  }

  const row = document.createElement('div');
  row.className = 'm-grid-2';
  const imp = items.find((i) => i.label() === 'Configura' || i.label() === 'Impostazioni');
  const prog = items.find((i) => i.label() === 'Progressi' || i.label().includes('Progressi'));
  if (imp) row.appendChild(creaBtnDom(imp, 'm-btn-secondary'));
  if (prog) row.appendChild(creaBtnDom(prog, 'm-btn-secondary'));
  card.appendChild(row);

  const musica = items.find((i) => i.label().includes('Musica'));
  if (musica) {
    card.appendChild(creaBtnDom(musica, 'm-btn-secondary'));
  }

  const fsBtn = document.createElement('button');
  fsBtn.type = 'button';
  fsBtn.className = 'm-btn m-btn-fullscreen';
  fsBtn.innerHTML = '⛶ A tutto schermo (Web App)';
  fsBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    toggleFullscreen().catch(() => undefined);
  });
  card.appendChild(fsBtn);

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

  const team = getTeamSetup();
  const playerBadge = document.createElement('div');
  playerBadge.className = 'm-pill';
  playerBadge.style.background = '#e0f2fe';
  playerBadge.style.color = '#0369a1';
  playerBadge.style.fontWeight = '800';
  playerBadge.textContent =
    team.numPlayers > 1 ? `👥 Squadra: ${getPlayerSummary()}` : `👤 Giocatore: ${getPlayerSummary()}`;
  card.appendChild(playerBadge);

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

  const SUBJECT_NAMES = ['Matematica', 'Italiano', 'Scienze', 'Storia'];
  const grid = document.createElement('div');
  grid.className = 'm-grid-2';
  const materie = items.filter((i) => SUBJECT_NAMES.includes(i.label()));
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
  homeBtn.textContent = 'Torna al menu';
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
    const yAtteso = 145 + rowIdx * 80;
    const diRiga = bottoniTappe
      .filter((b) => Math.abs(b.y() - yAtteso) < 35)
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

  const indietro = items.find((i) => i.label() === 'Indietro' || i.label().includes('indietro') || i.label().includes('Torna'));
  if (indietro) card.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));

  deck.appendChild(card);
}

function renderSettings(deck: HTMLElement, items: MobileItem[], testi: TextEntry[]): void {
  const card = document.createElement('div');
  card.className = 'm-card';

  const buttons = items.filter((i) => i.kind === 'button');
  const toggles = items.filter((i) => i.kind === 'toggle');

  const page = document.body.dataset.settingsPage || 'radice';

  // ── 1. NODO RADICE (Menu principale ad albero) ──
  if (page === 'radice') {
    const h = document.createElement('div');
    h.className = 'm-header';
    h.textContent = 'Configura';
    card.appendChild(h);

    const sub = document.createElement('p');
    sub.className = 'm-sub';
    sub.textContent = 'Scegli la categoria da personalizzare ad albero:';
    card.appendChild(sub);

    const macro = buttons.filter((b) =>
      [
        'Bisogni Educativi Speciali (BES)',
        'Anno Scolastico & Difficoltà',
        'Gioco & Grafica'
      ].includes(b.label())
    );
    const mg = document.createElement('div');
    mg.className = 'm-toggle-list';
    macro.forEach((b) => {
      mg.appendChild(creaBtnDom(b, 'm-btn-compact'));
    });
    card.appendChild(mg);

    const titolo = buttons.find((b) => b.label() === 'Torna al titolo');
    if (titolo) {
      const bWrap = document.createElement('div');
      bWrap.style.marginTop = '16px';
      bWrap.appendChild(creaBtnDom(titolo, 'm-btn-secondary'));
      card.appendChild(bWrap);
    }

    deck.appendChild(card);
    return;
  }

  // ── 2. NODO BES (Profili guidati & Caratteristiche) ──
  if (page === 'bes') {
    const h = document.createElement('div');
    h.className = 'm-header';
    h.textContent = 'Profili BES / DSA — Talentopolis';
    card.appendChild(h);

    const sub = document.createElement('p');
    sub.className = 'm-sub';
    sub.textContent = 'Seleziona un profilo guidato o personalizza le caratteristiche:';
    card.appendChild(sub);

    const nav = document.createElement('div');
    nav.className = 'm-grid-2';
    const indietro = buttons.find((b) => b.label() === 'Torna al menu' || b.label() === 'Torna ai profili');
    const titolo = buttons.find((b) => b.label() === 'Torna al titolo');
    if (indietro) nav.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));
    if (titolo) nav.appendChild(creaBtnDom(titolo, 'm-btn-secondary'));
    card.appendChild(nav);

    const playerBtns = buttons.filter((b) => /G[1-4]:/.test(b.label()));
    if (playerBtns.length > 0) {
      const pHeader = document.createElement('div');
      pHeader.className = 'm-group-title';
      pHeader.textContent = 'Seleziona il giocatore da configurare:';
      card.appendChild(pHeader);

      const pRow = document.createElement('div');
      pRow.className = 'm-grid-2';
      pRow.style.margin = '6px 0 10px 0';
      playerBtns.forEach((b) => pRow.appendChild(creaBtnDom(b, 'm-btn-compact')));
      card.appendChild(pRow);
    }

    const custom = buttons.find((b) => b.label().includes('Personalizza Caratteristiche'));
    if (custom) {
      const cWrap = document.createElement('div');
      cWrap.style.margin = '10px 0';
      cWrap.appendChild(creaBtnDom(custom, 'm-btn-sport m-btn-correct'));
      card.appendChild(cWrap);
    }

    const standard = buttons.find((b) => b.label().includes('Nessun profilo'));
    if (standard) {
      card.appendChild(creaBtnDom(standard, 'm-btn-compact'));
    }

    const BES_LABELS = [
      'ADHD', 'Autismo', 'Dislessia', 'Discalculia',
      'Disgrafia', 'Disprassia', 'Ipovisione', 'Sordità', 'DSA / Ansia'
    ];
    const profili = buttons.filter((b) => BES_LABELS.includes(b.label()));
    if (profili.length > 0) {
      const lbl = document.createElement('div');
      lbl.className = 'm-group-title';
      lbl.textContent = 'Elenco profili BES disponibili';
      card.appendChild(lbl);
      const pg = document.createElement('div');
      pg.className = 'm-grid-2';
      profili.forEach((b) => pg.appendChild(creaBtnDom(b, 'm-btn-compact')));
      card.appendChild(pg);
    }

    deck.appendChild(card);
    return;
  }

  // ── 3. NODO BES CUSTOM ──
  if (page === 'bes-custom') {
    const h = document.createElement('div');
    h.className = 'm-header';
    h.textContent = 'Caratteristiche BES (Custom)';
    card.appendChild(h);

    const sub = document.createElement('p');
    sub.className = 'm-sub';
    sub.textContent = 'Attiva o disattiva le singole facilitazioni per il bambino:';
    card.appendChild(sub);

    const nav = document.createElement('div');
    nav.className = 'm-grid-2';
    const indietro = buttons.find((b) => b.label() === 'Torna ai profili');
    const titolo = buttons.find((b) => b.label() === 'Torna al titolo');
    if (indietro) nav.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));
    if (titolo) nav.appendChild(creaBtnDom(titolo, 'm-btn-secondary'));
    card.appendChild(nav);

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

    // Navigazione inferiore duplicata per non obbligare a risalire tutta la lista
    const bNav = document.createElement('div');
    bNav.className = 'm-grid-2';
    bNav.style.marginTop = '12px';
    if (indietro) bNav.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));
    if (titolo) bNav.appendChild(creaBtnDom(titolo, 'm-btn-secondary'));
    card.appendChild(bNav);

    deck.appendChild(card);
    return;
  }

  // ── 4. NODO ANNO (Scelta Primaria vs Secondaria) ──
  if (page === 'anno') {
    const h = document.createElement('div');
    h.className = 'm-header';
    h.textContent = 'Anno Scolastico';
    card.appendChild(h);

    const sub = document.createElement('p');
    sub.className = 'm-sub';
    sub.textContent = 'Scegli il grado scolastico del bambino:';
    card.appendChild(sub);

    const nav = document.createElement('div');
    nav.className = 'm-grid-2';
    const indietro = buttons.find((b) => b.label() === 'Torna al menu' || b.label() === 'Torna ai profili');
    const titolo = buttons.find((b) => b.label() === 'Torna al titolo');
    if (indietro) nav.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));
    if (titolo) nav.appendChild(creaBtnDom(titolo, 'm-btn-secondary'));
    card.appendChild(nav);

    const gradi = buttons.filter((b) =>
      b.label().includes('Primaria') || b.label().includes('Secondaria')
    );
    const gg = document.createElement('div');
    gg.className = 'm-toggle-list';
    gradi.forEach((b) => gg.appendChild(creaBtnDom(b, 'm-btn-compact')));
    card.appendChild(gg);

    deck.appendChild(card);
    return;
  }

  // ── 5. NODO ANNO PRIMARIA ──
  if (page === 'anno-primaria') {
    const h = document.createElement('div');
    h.className = 'm-header';
    h.textContent = 'Scuola Primaria (Elementare)';
    card.appendChild(h);

    const sub = document.createElement('p');
    sub.className = 'm-sub';
    sub.textContent = 'Seleziona la classe di scuola primaria (1ª–5ª):';
    card.appendChild(sub);

    const nav = document.createElement('div');
    nav.className = 'm-grid-2';
    const indietro = buttons.find((b) => b.label() === 'Torna ai gradi' || b.label() === 'Torna ai profili');
    const titolo = buttons.find((b) => b.label() === 'Torna al titolo');
    if (indietro) nav.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));
    if (titolo) nav.appendChild(creaBtnDom(titolo, 'm-btn-secondary'));
    card.appendChild(nav);

    const classi = buttons.filter((b) => b.label().includes('Primaria'));
    const cg = document.createElement('div');
    cg.className = 'm-toggle-list';
    classi.forEach((b) => cg.appendChild(creaBtnDom(b, 'm-btn-compact')));
    card.appendChild(cg);

    deck.appendChild(card);
    return;
  }

  // ── 6. NODO ANNO SECONDARIA ──
  if (page === 'anno-secondaria') {
    const h = document.createElement('div');
    h.className = 'm-header';
    h.textContent = 'Scuola Secondaria I Grado';
    card.appendChild(h);

    const sub = document.createElement('p');
    sub.className = 'm-sub';
    sub.textContent = 'Seleziona la classe di scuola media (1ª–3ª):';
    card.appendChild(sub);

    const nav = document.createElement('div');
    nav.className = 'm-grid-2';
    const indietro = buttons.find((b) => b.label() === 'Torna ai gradi' || b.label() === 'Torna ai profili');
    const titolo = buttons.find((b) => b.label() === 'Torna al titolo');
    if (indietro) nav.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));
    if (titolo) nav.appendChild(creaBtnDom(titolo, 'm-btn-secondary'));
    card.appendChild(nav);

    const classi = buttons.filter((b) => b.label().includes('Secondaria'));
    const cg = document.createElement('div');
    cg.className = 'm-toggle-list';
    classi.forEach((b) => cg.appendChild(creaBtnDom(b, 'm-btn-compact')));
    card.appendChild(cg);

    deck.appendChild(card);
    return;
  }

  // ── 7. NODO GIOCO & GRAFICA ──
  if (page === 'gioco') {
    const h = document.createElement('div');
    h.className = 'm-header';
    h.textContent = 'Gioco & Grafica';
    card.appendChild(h);

    const nav = document.createElement('div');
    nav.className = 'm-grid-2';
    const indietro = buttons.find((b) => b.label() === 'Torna al menu' || b.label() === 'Torna ai profili');
    const titolo = buttons.find((b) => b.label() === 'Torna al titolo');
    if (indietro) nav.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));
    if (titolo) nav.appendChild(creaBtnDom(titolo, 'm-btn-secondary'));
    card.appendChild(nav);

    // Audio
    const btnAudio = buttons.find((b) => b.label().includes('Audio'));
    if (btnAudio) {
      const aw = document.createElement('div');
      aw.style.margin = '10px 0';
      aw.appendChild(creaBtnDom(btnAudio, 'm-btn-compact'));
      card.appendChild(aw);
    }

    // Grafica 2D vs 3D
    const modeRow = document.createElement('div');
    modeRow.className = 'm-grid-2';
    ['2D', '3D', '2D (Classica)', '3D (Tre Dimensioni)'].forEach((lbl) => {
      const b = buttons.find((it) => it.label() === lbl);
      if (b) modeRow.appendChild(creaBtnDom(b, 'm-btn-compact'));
    });
    card.appendChild(modeRow);

    // Toggle domande casuali
    const tCasuali = toggles.find((t) => t.label().includes('casuali'));
    if (tCasuali) {
      const tb = document.createElement('button');
      tb.type = 'button';
      const on = tCasuali.state() === 'on';
      tb.className = `m-toggle-row ${on ? 'is-on' : 'is-off'}`;
      tb.innerHTML = `<span class="m-toggle-lbl">${tCasuali.label()}</span><span class="m-toggle-badge">${
        on ? 'ON' : 'OFF'
      }</span>`;
      tb.addEventListener('click', (ev) => {
        ev.preventDefault();
        tCasuali.trigger();
      });
      card.appendChild(tb);
    }

    deck.appendChild(card);
    return;
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

  const indietro = items.find((i) => i.label() === 'Torna al titolo' || i.label() === 'Torna al menu');

  // Pulsante Esci/Torna in ALTO per massima accessibilità immediata su mobile
  const topNav = document.createElement('div');
  topNav.style.margin = '4px 0 8px 0';
  const topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.className = 'm-btn m-btn-secondary';
  topBtn.textContent = '← Torna al Menu Principale';
  topBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (indietro) indietro.trigger();
    else window.location.reload();
  });
  topNav.appendChild(topBtn);
  card.appendChild(topNav);

  const playerBtns = items.filter((i) => /G[1-4]:/.test(i.label()));
  if (playerBtns.length > 0) {
    const pTabs = document.createElement('div');
    pTabs.className = 'm-grid-2';
    pTabs.style.margin = '4px 0 8px 0';
    playerBtns.forEach((b) => pTabs.appendChild(creaBtnDom(b, 'm-btn-compact')));
    card.appendChild(pTabs);
  }

  const tot = testi.find((t) => t.text.startsWith('Totale'));
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

  // Azioni a fondo lista: torna al titolo e azzera progressi
  const azzera = items.find((i) => i.label().includes('Azzera'));
  const bRow = document.createElement('div');
  bRow.className = 'm-grid-2';
  bRow.style.marginTop = '10px';
  if (indietro) bRow.appendChild(creaBtnDom(indietro, 'm-btn-secondary'));
  if (azzera) bRow.appendChild(creaBtnDom(azzera, 'm-btn-compact'));
  card.appendChild(bRow);

  deck.appendChild(card);
}

function renderModalScene(deck: HTMLElement, items: MobileItem[], testi: TextEntry[]): void {
  const card = document.createElement('div');
  card.className = 'm-card';

  const isResults = testi.some((t) => t.text.includes('Riepilogo') || t.text.includes('Tappa completata') || t.text.includes('Bravissim'));
  const team = getTeamSetup();

  if (isResults && team.numPlayers > 1) {
    const headerEl = document.createElement('div');
    headerEl.className = 'm-header';
    headerEl.textContent = '🏆 Riepilogo della Sessione';
    card.appendChild(headerEl);

    const subEl = document.createElement('div');
    subEl.className = 'm-sub';
    subEl.textContent = 'Risultati e progressi ottenuti da ciascun giocatore:';
    card.appendChild(subEl);

    const vList = document.createElement('div');
    vList.className = 'm-vertical-results-list';

    team.players.forEach((p) => {
      const row = document.createElement('div');
      row.className = 'm-player-vertical-card';
      row.style.borderLeft = `5px solid ${p.token.color}`;
      row.innerHTML = `
        <div class="m-player-v-logo" style="background: ${p.token.bg}; border-color: ${p.token.color};">${p.token.icon}</div>
        <div class="m-player-v-info">
          <div class="m-player-v-name">${p.token.name} (G${p.playerIndex})</div>
          <div class="m-player-v-prof">${getProfileLabel(p.profileId)}</div>
          <div class="m-player-v-stars">Progresso: ${totalStarsForPlayer(p.token.id)} ★ totali</div>
        </div>
      `;
      vList.appendChild(row);
    });

    card.appendChild(vList);

    const col = document.createElement('div');
    col.className = 'm-stack';
    col.style.marginTop = '14px';
    items.forEach((it) => col.appendChild(creaBtnDom(it)));
    card.appendChild(col);

    deck.appendChild(card);
    return;
  }

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
  iconaUrl: string | null,
  scena: Phaser.Scene | null
): void {
  const card = document.createElement('div');
  card.className = 'm-card';

  const team = getTeamSetup();
  const gameScena = scena as { roundPlayer?: import('../core/player').ActivePlayer } | null;
  const activePlayer = gameScena?.roundPlayer ?? team.players[0];

  // Badge prominente del turno con logo (icona), nome e profilo del giocatore (sempre presente)
  const turnCard = document.createElement('div');
  turnCard.className = 'm-turn-banner';
  turnCard.style.borderLeft = `6px solid ${activePlayer.token.color}`;
  turnCard.style.background = activePlayer.token.bg;
  turnCard.innerHTML = `
    <span class="m-turn-avatar" style="font-size: 28px; line-height: 1;">${activePlayer.token.icon}</span>
    <div class="m-turn-info" style="display: flex; flex-direction: column; text-align: left; gap: 1px;">
      <div class="m-turn-label" style="font-size: 11px; font-weight: 800; color: #475569;">
        ${team.numPlayers > 1 ? `TURNO DI G${activePlayer.playerIndex}` : 'GIOCATORE ATTIVO'}
      </div>
      <div class="m-turn-name" style="font-size: 15px; font-weight: 900; color: #000000;">
        ${activePlayer.token.name}
      </div>
      <div class="m-turn-profile" style="font-size: 11px; font-weight: 700; color: #0369a1;">
        Profilo: ${getProfileLabel(activePlayer.profileId)}
      </div>
    </div>
  `;
  card.appendChild(turnCard);

  // Intestazione tappa + contatore
  const headerTappa = testi.find((t) => Math.abs(t.y - 20) < 12 && t.x < 650);
  const contatore = testi.find((t) => t.text.startsWith('Prova ') || t.text.includes(' · Prova '));
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
    const midX = scena ? scena.scale.gameSize.width / 2 : 512;
    const sinistre = chips.filter((c) => c.x() < midX).sort((a, b) => a.y() - b.y());
    const destre = chips.filter((c) => c.x() >= midX).sort((a, b) => a.y() - b.y());

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
