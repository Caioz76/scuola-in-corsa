import Phaser from 'phaser';
import { ensureUI, ensureIcons } from '../art/textures';
import { ensureBackgrounds } from '../art/backgrounds';
import { ensurePico } from '../art/pico';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    // Le texture UI (bottoni, card, slot, icone) si creano UNA volta sola qui.
    ensureUI(this);
    ensureIcons(this);
    // Scenografie delle materie e i frame di Pico (il robot che corre).
    ensureBackgrounds(this);
    ensurePico(this);
    // Boot non mostra nulla: passa subito alla schermata di titolo.
    this.scene.start('Title');
  }
}
