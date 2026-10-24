/**
 * HUD del Runner 3D: cuori, stelline, punteggio, combo e turbo.
 *
 * È HTML, non Phaser: sul telefono il canvas viene scalato e i numeri
 * diventerebbero minuscoli. La barra sta in alto a destra, non copre il
 * personaggio e non intercetta i tocchi (`pointer-events: none`): è solo
 * informazione. La crea e la distrugge la prova Runner; il mondo 3D la
 * aggiorna quando cambia qualcosa.
 */

export interface DatiHud {
  cuori: number;
  stelle: number;
  punteggio: number;
  combo: number;
  turbo: number;
  boost: boolean;
}

let el: HTMLDivElement | null = null;
let precedente = '';

/** Crea la barra. Se c'è già, non fa nulla. */
export function mostraHudRunner(): void {
  if (el) return;
  el = document.createElement('div');
  el.id = 'hud-runner';
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', 'Stato della corsa');
  el.innerHTML =
    '<span class="hud-cuori" data-hud="cuori"></span>' +
    '<span class="hud-stelle"><span aria-hidden="true">★</span> <b data-hud="stelle">0</b></span>' +
    '<span class="hud-punti"><b data-hud="punti">0</b> <span aria-hidden="true">pt</span></span>' +
    '<span class="hud-combo" data-hud="combo" hidden></span>' +
    '<span class="hud-turbo" aria-label="Turbo"><i data-hud="turbo"></i></span>';
  document.body.appendChild(el);
  precedente = '';
}

/** Aggiorna solo se qualcosa è cambiato: niente scritture inutili ogni frame. */
export function aggiornaHudRunner(d: DatiHud): void {
  if (!el) return;
  const chiave = `${d.cuori}|${d.stelle}|${d.punteggio}|${d.combo}|${Math.round(
    (d.boost ? 1 : d.turbo) * 100
  )}|${d.boost}`;
  if (chiave === precedente) return;
  precedente = chiave;

  const cuori = el.querySelector<HTMLElement>('[data-hud="cuori"]');
  if (cuori) {
    cuori.textContent = '❤️'.repeat(Math.max(0, d.cuori)) + '🤍'.repeat(Math.max(0, 3 - d.cuori));
    cuori.setAttribute('aria-label', `${d.cuori} cuori su 3`);
  }
  const stelle = el.querySelector<HTMLElement>('[data-hud="stelle"]');
  if (stelle) stelle.textContent = String(d.stelle);
  const punti = el.querySelector<HTMLElement>('[data-hud="punti"]');
  if (punti) punti.textContent = String(Math.max(0, Math.round(d.punteggio)));
  const combo = el.querySelector<HTMLElement>('[data-hud="combo"]');
  if (combo) {
    combo.hidden = d.combo <= 1;
    combo.textContent = `x${d.combo}`;
  }
  const turbo = el.querySelector<HTMLElement>('[data-hud="turbo"]');
  if (turbo) turbo.style.width = `${Math.round((d.boost ? 1 : d.turbo) * 100)}%`;
  el.classList.toggle('boost', d.boost);
}

/** Toglie la barra (fine prova, pausa, uscita). */
export function nascondiHudRunner(): void {
  el?.remove();
  el = null;
  precedente = '';
}
