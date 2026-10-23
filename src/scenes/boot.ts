import Phaser from 'phaser';
import { ensureUI, ensureIcons } from '../art/textures';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    // Le texture UI (bottoni, card, slot, icone) si creano UNA volta sola qui.
    ensureUI(this);
    ensureIcons(this);
    // Boot non mostra nulla: passa subito alla schermata di titolo.
    this.scene.start('Title');
  }
}
