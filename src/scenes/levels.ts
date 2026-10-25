import Phaser from 'phaser';
import { drawSportChannelFrame, makeButton, makeText } from '../challenges/ui';
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

const X_TAPPE = [380, 615, 850];

export class LevelsScene extends Phaser.Scene {
  constructor() {
    super('Levels');
  }

  create(): void {
    const cfg = resolveConfig(loadSettings());
    const w = this.scale.gameSize.width;

    addWorld(this, 'scuola', cfg, { speed: 24 });
    drawSportChannelFrame(this, cfg, { x: 32, y: 16, w: 960, h: 544, headerH: 80 });

    const btnIndietro = makeButton(this, cfg, 130, 40, 'Torna indietro', {
      scale: 0.52,
      maxTargetScale: 1.03,
      depth: 10
    });
    btnIndietro.onTap(() => this.scene.start('Subject'));

    makeText(this, w / 2, 40, 'Tutte le Tappe', cfg, {
      size: 26,
      bold: true,
      color: '#000000',
      wrap: 520,
      maxH: 30
    });
    makeText(this, w / 2, 70, 'Scegli direttamente la tappa da affrontare o ripassare:', cfg, {
      size: 13.5,
      bold: true,
      color: '#1e293b',
      wrap: 680,
      maxH: 20
    });

    MATERIE.forEach((m, row) => {
      const y = 145 + row * 80;
      const pack = allPacks().find((p) => p.subject === m.id);
      makeText(this, 155, y, m.label, cfg, {
        size: 19,
        bold: true,
        color: '#000000',
        wrap: 180,
        align: 'left',
        maxH: 34
      });

      pack?.levels.forEach((livello, i) => {
        const x = X_TAPPE[i] ?? 380 + i * 235;
        const stelle = starsFor(pack.packId, livello.id);
        const b = makeButton(this, cfg, x, y, `Tappa ${i + 1} · ★ ${stelle}`, {
          scale: 0.68,
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

    const indietro = makeButton(this, cfg, w / 2, 510, 'Torna alle materie', {
      scale: 0.60,
      maxTargetScale: 1.04,
      depth: 10
    });
    indietro.onTap(() => this.scene.start('Subject'));
  }
}
