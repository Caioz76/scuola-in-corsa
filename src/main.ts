import Phaser from 'phaser';
import { ensureUI } from './art/textures';
import { resolveConfig, DEFAULT_SETTINGS } from './bes/resolver';
import { makeButton, makeText, showBanner } from './challenges/ui';

/** Nome del gioco — UNICA costante, da qui si cambia in un colpo solo. */
export const GAME_NAME = 'Scuola in Corsa';

class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    // Le texture UI (bottoni, card, slot, icone) si creano UNA volta sola qui.
    ensureUI(this);
    // Boot non mostra nulla: passa subito alla schermata di titolo.
    this.scene.start('Title');
  }
}

class TitleScene extends Phaser.Scene {
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
    gioca.onTap(() => {
      const banner = showBanner(this, cfg, 'In arrivo!', 'La scelta della materia è il prossimo passo.', 'ok');
      this.time.delayedCall(1800, () => banner.dispose());
    });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  parent: 'game',
  backgroundColor: '#1a1c2c',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, TitleScene]
});

// ── Gancio per i test e2e (sessione A) ──────────────────────────────
// Espone la scena attiva SENZA spingere stato (nessun evento, nessun costo
// per frame): un getter che legge la scena al momento della richiesta, quindi
// non può mai essere "vecchio". Vedi COORDINAMENTO.md §3.5.
const g = window as unknown as {
  __GIOCO__?: { scena: string; materia: string | null };
};
g.__GIOCO__ = {
  get scena(): string {
    return game.scene.getScenes(true)[0]?.scene.key ?? 'Boot';
  },
  materia: null
};
