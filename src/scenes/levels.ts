import Phaser from 'phaser';
import { drawWiiChannelFrame, makeButton, makeText } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { allPacks } from '../content/packs';
import { starsFor } from '../core/progress';
import { type Materia, setMateria, setLevel } from './shared';
import { addWorld } from '../art/world';

/**
 * Scelta diretta della tappa.
 *
 * Serve all'insegnante: senza questa schermata le tappe successive si
 * raggiungono solo giocando le precedenti fino ai risultati. Qui tutte le
 * tappe di tutte le materie sono a due tocchi dal titolo, con le stelle già
 * guadagnate.
 */

const MATERIE: Array<{ id: Materia; label: string }> = [
  { id: 'matematica', label: 'Matematica' },
  { id: 'italiano', label: 'Italiano' },
  { id: 'scienze', label: 'Scienze' },
  { id: 'storia', label: 'Storia' }
];

const X_TAPPE = [420, 680, 915];

export class LevelsScene extends Phaser.Scene {
  constructor() {
    super('Levels');
  }

  create(): void {
    const cfg = resolveConfig(loadSettings());

    addWorld(this, 'scuola', cfg, { speed: 24 });
    drawWiiChannelFrame(this, cfg, { x: 24, y: 14, w: 976, h: 468, headerH: 88 });

    makeText(this, 512, 46, 'Tutte le tappe', cfg, {
      size: 30,
      bold: true,
      color: '#1d6fb8',
      wrap: 620,
      maxH: 38,
      outline: true
    });
    makeText(this, 512, 86, 'Scegli direttamente la tappa da giocare.', cfg, {
      size: 14,
      color: '#5f7186',
      wrap: 720,
      maxH: 22
    });

    MATERIE.forEach((m, row) => {
      const y = 150 + row * 92;
      const pack = allPacks().find((p) => p.subject === m.id);
      makeText(this, 135, y, m.label, cfg, {
        size: 19,
        bold: true,
        color: '#2f3b4c',
        wrap: 210,
        maxH: 34
      });

      pack?.levels.forEach((livello, i) => {
        const x = X_TAPPE[i] ?? 420 + i * 250;
        const stelle = starsFor(pack.packId, livello.id);
        const b = makeButton(this, cfg, x, y, `Tappa ${i + 1} · ★ ${stelle}`, {
          scale: 0.72,
          maxTargetScale: 1.0,
          depth: 10
        });
        if (stelle === 3) b.setKind('correct');
        b.onTap(() => {
          setMateria(m.id);
          setLevel(livello.id);
          this.scene.start('Game');
        });
      });
    });

    const indietro = makeButton(this, cfg, 512, 525, 'Indietro', {
      scale: 0.62,
      maxTargetScale: 1.04
    });
    indietro.onTap(() => this.scene.start('Subject'));
  }
}
