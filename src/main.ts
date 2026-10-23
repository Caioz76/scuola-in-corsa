import Phaser from 'phaser';
import { BootScene } from './scenes/boot';
import { TitleScene } from './scenes/title';
import { SubjectScene } from './scenes/subject';
import { GameScene } from './scenes/game';
import { ResultsScene } from './scenes/results';
import { getMateria } from './scenes/shared';

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
  scene: [BootScene, TitleScene, SubjectScene, GameScene, ResultsScene]
});

// ── Gancio per i test e2e (sessione A) ──────────────────────────────
// Espone la scena attiva SENZA spingere stato (nessun evento, nessun costo
// per frame): un getter che legge la scena al momento della richiesta, quindi
// non può mai essere "vecchio". Vedi COORDINAMENTO.md §3.5.
const g = window as unknown as {
  __GIOCO__?: { scena: string; materia: string | null; scenaAttiva: Phaser.Scene | null };
};

g.__GIOCO__ = {
  get scena(): string {
    return game.scene.getScenes(true)[0]?.scene.key ?? 'Boot';
  },
  get materia(): string | null {
    return getMateria();
  },
  // I test leggono i testi dei GameObject per giocare come un bambino (il contenuto è già
  // nel bundle, quindi non rivela nulla di segreto), e il getter non spinge stato.
  get scenaAttiva(): Phaser.Scene | null {
    return game.scene.getScenes(true)[0] ?? null;
  }
};
