import Phaser from 'phaser';
import { GAME_NAME } from '../core/constants';
import { makeButton, makeText } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { addWorld } from '../art/world';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create(): void {
    const cfg = resolveConfig(loadSettings());
    const w = this.scale.gameSize.width;
    const h = this.scale.gameSize.height;

    addWorld(this, 'scuola', cfg, { speed: 58 });

    makeText(this, w / 2, h / 2 - 110, GAME_NAME, cfg, {
      size: 48,
      bold: true,
      color: '#ffd93d',
      outline: true
    });
    makeText(this, w / 2, h / 2 - 40, 'Scegli la materia e corri!', cfg, {
      size: 20,
      color: '#b8c4e0'
    });

    const gioca = makeButton(this, cfg, w / 2, h / 2 + 70, 'Gioca', { depth: 10 });
    gioca.onTap(() => this.scene.start('Subject'));

    const impostazioni = makeButton(this, cfg, w / 2, h / 2 + 170, 'Impostazioni', {
      scale: 0.62,
      depth: 10
    });
    impostazioni.onTap(() => this.scene.start('Settings'));

    const progressi = makeButton(this, cfg, 872, 44, 'Progressi', { scale: 0.55, depth: 10 });
    progressi.onTap(() => this.scene.start('Progress'));
  }
}
