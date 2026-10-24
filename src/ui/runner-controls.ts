/**
 * Comandi touch del Runner 3D: corsie, salto e scivolata.
 *
 * Stanno in basso ai due lati, fuori dal canvas, con aree da 56 px reali.
 * Compaiono solo mentre si corre: quando il varco si ferma lasciano il posto
 * alla barra delle risposte. Da tastiera e con lo swipe si può fare lo stesso,
 * quindi i bottoni sono una scorciatoia, non l'unico modo.
 */

export interface AzioniComandi {
  /** -1 a sinistra, +1 a destra. */
  onCorsia: (delta: number) => void;
  onSalta: () => void;
  onScivola: () => void;
}

let el: HTMLDivElement | null = null;

function bottone(
  azione: string,
  icona: string,
  testo: string,
  aria: string,
  cb: () => void
): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.dataset.azione = azione;
  b.className = 'comando-runner';
  b.setAttribute('aria-label', aria);
  b.innerHTML =
    `<span class="comando-icona" aria-hidden="true">${icona}</span>` +
    `<span class="comando-testo">${testo}</span>`;
  b.addEventListener('click', (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    cb();
  });
  return b;
}

/** Crea i comandi. Se c'erano già, li rifà con le azioni nuove. */
export function mostraComandiRunner(azioni: AzioniComandi): void {
  nascondiComandi();

  const barra = document.createElement('div');
  barra.id = 'comandi-runner';
  barra.setAttribute('role', 'group');
  barra.setAttribute('aria-label', 'Comandi di corsa');

  const sinistra = document.createElement('div');
  sinistra.className = 'comandi-gruppo';
  sinistra.append(
    bottone('sinistra', '◀', 'SX', 'Sposta Pico a sinistra', () => azioni.onCorsia(-1)),
    bottone('destra', '▶', 'DX', 'Sposta Pico a destra', () => azioni.onCorsia(1))
  );

  const destra = document.createElement('div');
  destra.className = 'comandi-gruppo';
  destra.append(
    bottone('giu', '▼', 'Giù', 'Scivola sotto l’ostacolo', azioni.onScivola),
    bottone('salta', '▲', 'Salta', 'Salta l’ostacolo o scegli la porta', azioni.onSalta)
  );

  barra.append(sinistra, destra);
  document.body.appendChild(barra);
  el = barra;
}

export function nascondiComandi(): void {
  el?.remove();
  el = null;
}

export function comandiVisibili(): boolean {
  return Boolean(el);
}
