import Phaser from 'phaser';
import { makeButton, makeText } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { allPacks } from '../content/packs';
import { starsFor } from '../core/progress';
import { type Materia, setMateria, setLevel } from './shared';
import { addWorld } from '../art/world';

/**
 * Scelta diretta della tappa.
 *
 * Serve all'insegnante: senza questa schermata la seconda tappa si raggiunge
 * solo giocando la prima fino ai risultati. Qui tutte le tappe di tutte le
 * materie sono a due tocchi dal titolo, con le stelle già guadagnate.
 */

const MATERIE: Array<{ id: Materia; label: string }> = [
  { id: 'matematica', label: 'Matematica' },
  { id: 'italiano', label: 'Italiano' },
  { id: 'scienze', label: 'Scienze' },
  { id: 'storia', label: 'Storia' }
];

export class LevelsScene extends Phaser.Scene {
  constructor() {
    super('Levels');
  }

  create(): void {
    const cfg = resolveConfig(loadSettings());

    addWorld(this, 'scuola', cfg, { speed: 24 });

    makeText(this, 512, 50, 'Tutte le tappe', cfg, {
      size: 32,
      bold: true,
      color: '#1d6fb8',
      outline: true
    });
    makeText(this, 512, 90, 'Scegli direttamente la tappa da giocare.', cfg, {
      size: 15,
      color: '#5f7186'
    });

    MATERIE.forEach((m, row) => {
      const y = 150 + row * 92;
      const pack = allPacks().find((p) => p.subject === m.id);
      makeText(this, 210, y, m.label, cfg, { size: 20, bold: true, color: '#2f3b4c' });

      pack?.levels.forEach((livello, i) => {
        const x = i === 0 ? 495 : 785;
        const stelle = starsFor(pack.packId, livello.id);
        const b = makeButton(this, cfg, x, y, `Tappa ${i + 1} · ★ ${stelle}`, {
          scale: 0.82,
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

    const indietro = makeButton(this, cfg, 512, 525, 'Indietro', { scale: 0.62 });
    indietro.onTap(() => this.scene.start('Subject'));
  }
}
