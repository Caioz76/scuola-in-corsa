/**
 * Risposte del Runner 3D: una barra in basso, fuori dal canvas.
 *
 * Perché non in Phaser: su un telefono il canvas viene scalato e i bottoni
 * diventerebbero piccoli; inoltre le risposte devono stare **sotto Pico**, non
 * davanti al personaggio o al simbolo del cancello. La barra è HTML, con aree
 * toccabili grandi, safe area e due colonne sugli schermi stretti.
 *
 * La barra non decide nulla: riceve `onPick` e restituisce lo stato visivo
 * (giusto / sbagliato / spento) alla prova Runner.
 */

export type EsitoRisposta = 'giusto' | 'sbagliato' | 'spento';

export interface RisposteRunner {
  /** Il varco è fermo: le risposte si possono toccare. */
  abilita(): void;
  /** Durante l'avvicinamento e dopo la scelta. */
  disabilita(): void;
  segna(i: number, esito: EsitoRisposta): void;
  /** Riporta tutte le risposte allo stato normale (dopo un errore). */
  pulisci(): void;
  /** In pausa la barra non deve restare cliccabile sopra la scheda. */
  nascondi(): void;
  mostra(): void;
  dispose(): void;
}

let barra: HTMLDivElement | null = null;

export function mostraRisposteRunner(
  labels: string[],
  onPick: (i: number) => void
): RisposteRunner {
  nascondiRisposte();

  const el = document.createElement('div');
  el.id = 'risposte-runner';
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', 'Scegli la risposta');
  el.style.setProperty('--n', String(Math.max(1, labels.length)));

  const bottoni = labels.map((label, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'risposta-runner';
    b.dataset.indice = String(i);
    b.textContent = label;
    b.disabled = true;
    b.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (!b.disabled) onPick(i);
    });
    el.appendChild(b);
    return b;
  });

  document.body.appendChild(el);
  // L'avviso "ruota il telefono" finirebbe dietro alle risposte.
  document.body.classList.add('risposte-aperte');
  barra = el;

  return {
    abilita(): void {
      bottoni.forEach((b) => {
        b.disabled = false;
        b.classList.remove('spento');
      });
    },
    disabilita(): void {
      bottoni.forEach((b) => {
        b.disabled = true;
      });
    },
    segna(i: number, esito: EsitoRisposta): void {
      const b = bottoni[i];
      if (!b) return;
      b.classList.remove('giusto', 'sbagliato', 'spento');
      if (esito === 'giusto') b.classList.add('giusto');
      else if (esito === 'sbagliato') b.classList.add('sbagliato');
      else b.classList.add('spento');
    },
    pulisci(): void {
      bottoni.forEach((b) => b.classList.remove('giusto', 'sbagliato', 'spento'));
    },
    nascondi(): void {
      el.style.display = 'none';
    },
    mostra(): void {
      el.style.display = '';
    },
    dispose: nascondiRisposte
  };
}

/** Toglie la barra (cambio prova, pausa, uscita). */
export function nascondiRisposte(): void {
  barra?.remove();
  barra = null;
  document.body.classList.remove('risposte-aperte');
}
