import Phaser from 'phaser';
import { makeButton, makeText } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';

/**
 * Pausa richiesta dal profilo BES (es. ADHD, ansia).
 *
 * È una scena separata, non un overlay della stessa scena: `Game` viene messa
 * in pausa davvero (timer, tween, input), quindi un feedback a metà non scade
 * mentre il bambino si ferma. Premendo "Continua" si riparte dal punto esatto.
 */
export class PauseScene extends Phaser.Scene {
  constructor() {
    super('Pause');
  }

  create(): void {
    const cfg = resolveConfig(loadSettings());

    // Velo quasi pieno: sotto resta il gioco, ma non sembra più cliccabile.
    this.add.rectangle(512, 288, 1024, 576, 0xffffff, 0.9);

    // Scheda bianca: separa la pausa dal quiz che resta dietro.
    const card = this.add.graphics();
    card.fillStyle(0x3b4a5a, 0.14);
    card.fillRoundedRect(256, 118, 512, 396, 30);
    card.fillStyle(0xffffff, 0.99);
    card.fillRoundedRect(252, 110, 512, 396, 30);
    card.lineStyle(2, 0xc9d3e0, 1);
    card.strokeRoundedRect(252, 110, 512, 396, 30);


    makeText(this, 512, 180, 'Pausa', cfg, {
      size: 42,
      bold: true,
      color: '#1d6fb8',
      outline: true
    });
    makeText(this, 512, 232, 'Quando vuoi, si riprende da dove eri rimasto.', cfg, {
      size: 16,
      color: '#5f7186'
    });

    const continua = makeButton(this, cfg, 512, 336, 'Continua', { depth: 10 });
    continua.onTap(() => {
      this.scene.resume('Game');
      this.scene.stop();
    });

    const titolo = makeButton(this, cfg, 512, 438, 'Torna al titolo', { depth: 10 });
    titolo.onTap(() => {
      this.scene.stop('Game');
      this.scene.start('Title');
    });
  }
}
