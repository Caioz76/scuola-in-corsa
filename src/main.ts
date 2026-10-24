import Phaser from 'phaser';
import { BootScene } from './scenes/boot';
import { TitleScene } from './scenes/title';
import { SubjectScene } from './scenes/subject';
import { GameScene } from './scenes/game';
import { ResultsScene } from './scenes/results';
import { SettingsScene } from './scenes/settings';
import { LevelsScene } from './scenes/levels';
import { PauseScene } from './scenes/pause';
import { ProgressScene } from './scenes/progress';
import { getMateria } from './scenes/shared';
import { initAudio } from './audio/apply';
import { synth } from './audio/synth';

// Audio: applica le regole BES e sblocca il contesto al primo gesto.
initAudio();

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  parent: 'game',
  backgroundColor: '#eaf6ff',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, TitleScene, SubjectScene, LevelsScene, GameScene, ResultsScene, SettingsScene, PauseScene, ProgressScene]
});

// ── Gancio per i test e2e (sessione A) ──────────────────────────────
// Espone la scena attiva SENZA spingere stato (nessun evento, nessun costo
// per frame): un getter che legge la scena al momento della richiesta, quindi
// non può mai essere "vecchio". Vedi COORDINAMENTO.md §3.5.
const g = window as unknown as {
  __GIOCO__?: {
    scena: string;
    materia: string | null;
    scenaAttiva: Phaser.Scene | null;
    audio: { sfx: boolean; music: boolean; running: boolean; musicPlaying: boolean };
  };
};

g.__GIOCO__ = {
  get scena(): string {
    // Se più scene restano attive durante una transizione, quella in cima
    // (registrata dopo) è quella che il bambino vede.
    const attive = game.scene.getScenes(true);
    return attive[attive.length - 1]?.scene.key ?? 'Boot';
  },
  get materia(): string | null {
    return getMateria();
  },
  // I test leggono i testi dei GameObject per giocare come un bambino (il contenuto è già
  // nel bundle, quindi non rivela nulla di segreto), e il getter non spinge stato.
  get scenaAttiva(): Phaser.Scene | null {
    const attive = game.scene.getScenes(true);
    return attive[attive.length - 1] ?? null;
  },
  // Stato audio osservabile: serve agli e2e per verificare che il gesto sblocchi
  // il contesto e che un profilo BES spenga davvero musica ed effetti.
  get audio(): { sfx: boolean; music: boolean; running: boolean; musicPlaying: boolean } {
    return {
      sfx: synth.sfxOn,
      music: synth.musicOn,
      running: synth.running,
      musicPlaying: synth.musicPlaying
    };
  }
};
