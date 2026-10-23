import Phaser from 'phaser';
import { GAME_NAME } from '../core/constants';
import { makeButton, makeText } from '../challenges/ui';
import { resolveConfig, DEFAULT_SETTINGS } from '../bes/resolver';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create(): void {
    const cfg = resolveConfig(DEFAULT_SETTINGS);
    const w = this.scale.gameSize.width;
    const h = this.scale.gameSize.height;

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
  }
}
