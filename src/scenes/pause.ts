import Phaser from 'phaser';
import { makeButton, makeText } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';

/**
 * Pausa della partita, con due modi:
 *
 * - `{ conferma: false }` (bottone "Pausa"): si può riprendere o chiedere di
 *   uscire. La partita resta ferma davvero (timer, tween, input), quindi un
 *   feedback a metà non scade mentre il bambino si ferma.
 * - `{ conferma: true }` (bottone "Esci"): prima di buttare via la tappa
 *   chiede conferma, perché uscire ora non salva i progressi della partita.
 *
 * In entrambi i casi Esc riprende: nessuno resta intrappolato.
 */
export class PauseScene extends Phaser.Scene {
  private conferma = false;

  constructor() {
    super('Pause');
  }

  create(data: { conferma?: boolean } = {}): void {
    this.conferma = Boolean(data.conferma);
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

    makeText(this, 512, 160, this.conferma ? 'Vuoi uscire?' : 'Pausa', cfg, {
      size: 38,
      bold: true,
      color: this.conferma ? '#c2554d' : '#1d6fb8',
      wrap: 440,
      maxH: 46,
      outline: true
    });

    makeText(
      this,
      512,
      220,
      this.conferma
        ? 'La tappa non è finita: i progressi di questa partita non vengono salvati.'
        : 'Quando vuoi, si riprende da dove eri rimasto.',
      cfg,
      { size: 15, color: '#5f7186', wrap: 430, maxH: 42 }
    );

    // Con "Pausa quando serve" la pausa diventa anche un momento per respirare.
    if (cfg.pauseAllowed && !this.conferma) {
      makeText(this, 512, 268, 'Fai un respiro: inspira piano, poi espira.', cfg, {
        size: 14,
        italic: true,
        color: '#2f8f6b',
        wrap: 430,
        maxH: 26
      });
    }

    const riprendi = (): void => {
      this.scene.resume('Game');
      this.scene.stop();
    };
    const esci = (): void => {
      this.scene.stop('Game');
      this.scene.start('Title');
    };

    if (this.conferma) {
      const si = makeButton(this, cfg, 512, 332, 'Sì, esci', {
        scale: 0.8,
        maxTargetScale: 1.02,
        depth: 10
      });
      si.onTap(esci);
      const no = makeButton(this, cfg, 512, 420, 'No, torna al gioco', {
        scale: 0.8,
        maxTargetScale: 1.02,
        depth: 10
      });
      no.onTap(riprendi);
    } else {
      const continua = makeButton(this, cfg, 512, 332, 'Continua', {
        scale: 0.8,
        maxTargetScale: 1.02,
        depth: 10
      });
      continua.onTap(riprendi);
      const titolo = makeButton(this, cfg, 512, 420, 'Esci dalla partita', {
        scale: 0.8,
        maxTargetScale: 1.02,
        depth: 10
      });
      // Non esce subito: prima chiede conferma, nella stessa scheda.
      titolo.onTap(() => this.scene.restart({ conferma: true }));
    }

    const tastiera = this.input.keyboard;
    tastiera?.on('keydown-ESC', riprendi);
    tastiera?.on('keydown-P', riprendi);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      tastiera?.off('keydown-ESC', riprendi);
      tastiera?.off('keydown-P', riprendi);
    });
  }
}
