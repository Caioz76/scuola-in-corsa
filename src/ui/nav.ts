/**
 * Barra di navigazione della partita: pausa e uscita sempre disponibili.
 *
 * È HTML e non Phaser di proposito: il canvas del gioco viene scalato per
 * entrare nello schermo, quindi un bottone disegnato dentro diventerebbe
 * minuscolo su un telefono. Qui i bottoni restano grandi almeno 46 px veri,
 * rispettano la safe area e stanno sopra al canvas (2D e 3D).
 *
 * La barra non decide cosa succede: riceve due callback dalla `GameScene`, che
 * conosce lo stato della partita. Quando la partita è in pausa la barra sparisce
 * e lascia il posto ai bottoni della schermata di pausa.
 */

export interface AzioniNav {
  onPausa: () => void;
  onEsci: () => void;
}

const SVG_PAUSA =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<rect x="6.6" y="4.8" width="4" height="14.4" rx="2"></rect>' +
  '<rect x="13.4" y="4.8" width="4" height="14.4" rx="2"></rect>' +
  '</svg>';

const SVG_ESCI =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path d="M13.5 4.5H18a1.8 1.8 0 0 1 1.8 1.8v11.4A1.8 1.8 0 0 1 18 19.5h-4.5" ' +
  'fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>' +
  '<path d="M9.5 8 5.5 12l4 4M5.8 12h8.4" fill="none" stroke="currentColor" ' +
  'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>' +
  '</svg>';

let barra: HTMLDivElement | null = null;

function creaBottone(
  azione: 'pausa' | 'esci',
  icona: string,
  testo: string,
  aria: string,
  cb: () => void
): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.dataset.azione = azione;
  b.className = 'nav-bottone';
  b.setAttribute('aria-label', aria);
  b.innerHTML = `<span class="nav-icona">${icona}</span><span class="nav-testo">${testo}</span>`;
  b.addEventListener('click', (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    cb();
  });
  return b;
}

/** Mostra la barra (o la aggiorna, se era già visibile). */
export function mostraNav(azioni: AzioniNav): void {
  nascondiNav();

  const el = document.createElement('div');
  el.id = 'nav-gioco';
  el.setAttribute('role', 'toolbar');
  el.setAttribute('aria-label', 'Comandi della partita');
  el.append(
    creaBottone('pausa', SVG_PAUSA, 'Pausa', 'Metti la partita in pausa', azioni.onPausa),
    creaBottone('esci', SVG_ESCI, 'Esci', 'Esci dalla partita', azioni.onEsci)
  );
  document.body.appendChild(el);
  barra = el;
}

/** Toglie la barra dal DOM (pausa, risultati, titolo). */
export function nascondiNav(): void {
  barra?.remove();
  barra = null;
}
