/**
 * Geometria delle aree cliccabili.
 *
 * PERCHÉ ESISTE (difetto trovato il 23/10): Phaser normalizza il punto del
 * puntatore nelle coordinate LOCALI dell'oggetto e poi aggiunge
 * `displayOriginX/Y` (l'origine della texture, es. 128x48 per la card
 * 256x96). Un rettangolo centrato su 0 copre quindi solo una striscia del
 * bottone: il centro, dove tocca un bambino, non risponde.
 *
 * Qui il rettangolo è espresso in coordinate di TEXTURE (0..larghezza,
 * 0..altezza), che è lo spazio in cui Phaser fa il controllo.
 */

export interface HitRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Rettangolo cliccabile che copre tutto il frame, opzionalmente allargato
 * del 12% (regola BES "tocco permissivo").
 */
export function hitRect(frameW: number, frameH: number, permissive: boolean): HitRect {
  const p = permissive ? 1.12 : 1;
  const width = frameW * p;
  const height = frameH * p;
  return {
    x: (frameW - width) / 2,
    y: (frameH - height) / 2,
    width,
    height
  };
}
