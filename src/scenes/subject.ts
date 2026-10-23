import Phaser from 'phaser';
import { type Materia, setMateria } from './shared';
import { makeButton, makeText } from '../challenges/ui';
import { resolveConfig, DEFAULT_SETTINGS } from '../bes/resolver';

export class SubjectScene extends Phaser.Scene {
  constructor() {
    super('Subject');
  }

  create(): void {
    const cfg = resolveConfig(DEFAULT_SETTINGS);
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
    }
  }
}
