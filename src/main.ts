import Phaser from 'phaser';
import './style.css';
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
import { stato3D, type Stato3D } from './art/three-world';
import { getActiveRounds } from './content/packs';
import type { Round } from './content/types';
import { initMobilePortrait } from './ui/mobile-portrait';

// Audio: applica le regole BES e sblocca il contesto al primo gesto.
initAudio();

function calcolaLarghezzaIniziale(): number {
  if (typeof window === 'undefined') return 1024;
  const vv = window.visualViewport;
  const vw = vv ? vv.width : window.innerWidth;
  const vh = vv ? vv.height : window.innerHeight;
  if (vw >= vh) {
    const ratio = Math.max(16 / 9, vw / vh);
    return Math.min(1920, Math.max(1024, Math.round(576 * ratio)));
  }
  return 1024;
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: calcolaLarghezzaIniziale(),
  height: 576,
  parent: 'game',
  // Trasparente: quando c'è il mondo 3D (canvas Three.js sotto), Phaser deve
  // lasciar vedere il 3D. In 2D il fondo è coperto dalla scenografia o dal body.
  transparent: true,
  backgroundColor: '#eaf6ff',
  roundPixels: true,
  render: {
    antialias: true,
    roundPixels: true,
    powerPreference: 'high-performance'
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.NO_CENTER
  },
  scene: [BootScene, TitleScene, SubjectScene, LevelsScene, GameScene, ResultsScene, SettingsScene, PauseScene, ProgressScene]
});

/**
 * Adatta dinamicamente la larghezza del canvas Phaser in modalità orizzontale.
 * Su iPhone e dispositivi moderni (schermi panoramici ~19.5:9 o 20:9), una larghezza
 * fissa a 16:9 causerebbe bande nere o un gioco miniaturizzato al centro.
 * Calcolando targetW in base all'aspect ratio reale dello schermo, il canvas
 * riempie il 100% dell'area visibile con zero bordi sprecati.
 */
function adattaScalaGioco(): void {
  const vv = window.visualViewport;
  const vw = vv ? vv.width : window.innerWidth;
  const vh = vv ? vv.height : window.innerHeight;
  const orizzontale = vw >= vh;
  if (orizzontale) {
    const ratio = Math.max(16 / 9, vw / vh);
    const targetW = Math.min(1920, Math.max(1024, Math.round(576 * ratio)));
    if (game.scale.gameSize.width !== targetW || game.scale.gameSize.height !== 576) {
      game.scale.resize(targetW, 576);
    }
  } else {
    if (game.scale.gameSize.width !== 1024 || game.scale.gameSize.height !== 576) {
      game.scale.resize(1024, 576);
    }
  }
  game.scale.refresh();
}

game.events.once(Phaser.Core.Events.READY, () => {
  adattaScalaGioco();
});

window.addEventListener('resize', adattaScalaGioco);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', adattaScalaGioco);
}
window.addEventListener('orientationchange', () => {
  setTimeout(adattaScalaGioco, 100);
  setTimeout(adattaScalaGioco, 350);
});

adattaScalaGioco();

initMobilePortrait(game);

// Se supportato dal browser, blocca l'orientamento in verticale per smartphone
try {
  if (typeof screen !== 'undefined' && screen.orientation && 'lock' in screen.orientation) {
    (screen.orientation as unknown as { lock: (mode: string) => Promise<void> })
      .lock('portrait')
      .catch(() => {});
  }
} catch {
  // Ignora se non supportato
}

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
    treD: Stato3D;
    rounds: Round[];
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
  },
  // Stato del mondo 3D (se attivo): posizione del cancello, pannelli, arrivo.
  // Come gli altri getter, legge il valore al momento della richiesta.
  get treD(): Stato3D {
    return stato3D();
  },
  // Prove estratte per la partita in corso.
  get rounds(): Round[] {
    return getActiveRounds();
  }
};
