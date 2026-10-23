import { describe, expect, it } from 'vitest';
import { hitRect } from '../src/challenges/hit';

/**
 * Regressione del difetto trovato il 23/10: le aree cliccabili erano
 * rettangoli CENTRATI su 0, ma Phaser sposta il punto locale di
 * `displayOrigin` (metà del frame) prima di controllarlo. Risultato: il
 * centro dei chip non rispondeva, e una tappa di ordinamento era ingiocabile.
 *
 * Questi test simulano ESATTAMENTE la normalizzazione di Phaser, senza
 * caricare Phaser in Node.
 */

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Riproduce `InputManager.pointWithinHitArea` di Phaser. */
function phaserContains(r: Rect, frameW: number, frameH: number, localX: number, localY: number): boolean {
  const x = localX + frameW / 2; // + displayOriginX
  const y = localY + frameH / 2; // + displayOriginY
  return x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height;
}

describe('hitRect — area cliccabile in coordinate di texture', () => {
  it('il CENTRO della card 256×96 è cliccabile', () => {
    const r = hitRect(256, 96, false);
    expect(phaserContains(r, 256, 96, 0, 0)).toBe(true);
  });

  it('copre il frame intero, angoli compresi', () => {
    const w = 320;
    const h = 84;
    const r = hitRect(w, h, false);
    for (const [lx, ly] of [
      [-w / 2 + 1, -h / 2 + 1],
      [w / 2 - 1, -h / 2 + 1],
      [-w / 2 + 1, h / 2 - 1],
      [w / 2 - 1, h / 2 - 1]
    ]) {
      expect(phaserContains(r, w, h, lx, ly)).toBe(true);
    }
  });

  it('il tocco permissivo allarga del 12% e resta centrato', () => {
    const normale = hitRect(256, 96, false);
    const permissivo = hitRect(256, 96, true);
    expect(permissivo.width / normale.width).toBeCloseTo(1.12, 5);
    expect(permissivo.height / normale.height).toBeCloseTo(1.12, 5);
    expect(permissivo.x + permissivo.width / 2).toBeCloseTo(128, 5);
    expect(permissivo.y + permissivo.height / 2).toBeCloseTo(48, 5);
  });

  it('documenta la vecchia formula: il rettangolo reale del chip NON copriva il centro', () => {
    // Valori misurati nel browser il 23/10: card 216×81 a schermo, hit ±91,125.
    const vecchio: Rect = { x: -91.125, y: -40.5, width: 182.25, height: 81 };
    expect(phaserContains(vecchio, 256, 96, 0, 0)).toBe(false);
    // ...e il tocco funzionava solo in una fascia in alto a sinistra.
    expect(phaserContains(vecchio, 256, 96, -100, -48)).toBe(true);
  });
});
