import Phaser from 'phaser';
import { type Materia, setMateria } from './shared';
import { makeButton, makeText } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { allPacks } from '../content/packs';
import { starsFor } from '../core/progress';

export class SubjectScene extends Phaser.Scene {
  constructor() {
    super('Subject');
  }

  create(): void {
    const cfg = resolveConfig(loadSettings());
    const w = this.scale.gameSize.width;
    const h = this.scale.gameSize.height;

    makeText(this, w / 2, 90, 'Scegli la materia', cfg, {
      size: 38,
      bold: true,
      color: '#ffd93d',
      outline: true
    });

    const voci: Array<{ id: Materia; label: string; x: number; y: number }> = [
      { id: 'matematica', label: 'Matematica', x: w / 2 - 190, y: h / 2 - 40 },
      { id: 'italiano', label: 'Italiano', x: w / 2 + 190, y: h / 2 - 40 },
      { id: 'scienze', label: 'Scienze', x: w / 2 - 190, y: h / 2 + 80 },
      { id: 'storia', label: 'Storia', x: w / 2 + 190, y: h / 2 + 80 }
    ];

    for (const v of voci) {
      const b = makeButton(this, cfg, v.x, v.y, v.label, { depth: 10 });
      b.onTap(() => {
        setMateria(v.id);
        this.scene.start('Game');
      });
      const pack = allPacks().find((p) => p.subject === v.id);
      const livello = pack?.levels[0];
      if (pack && livello) {
        const stelle = starsFor(pack.packId, livello.id);
        makeText(this, v.x, v.y + 62, `★ ${stelle} / 3`, cfg, {
          size: 18,
          bold: stelle > 0,
          color: stelle > 0 ? '#ffd93d' : '#5a6484'
        });
      }
    }
  }
}
