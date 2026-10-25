/**
 * Ponte tra le regole BES e il motore audio.
 *
 * Prima di questo modulo `synth` non sapeva nulla delle impostazioni: i suoni
 * restavano accesi anche col profilo Sordità e la musica non partiva mai.
 * Qui si applicano le regole risolte, si sblocca l'AudioContext al primo gesto
 * vero e si reagisce ai cambi di profilo (evento emesso da `saveSettings`).
 */
import { synth } from './synth';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';

const SFX_VOL = 0.5;
const MUSIC_VOL = 0.14;

/** Applica subito le regole audio correnti (usabile anche dai test). */
export function applyAudio(): void {
  const cfg = resolveConfig(loadSettings());
  synth.setSfx(cfg.sfx, SFX_VOL);
  synth.setMusic(cfg.music, MUSIC_VOL);
}

let hooked = false;

/** Da chiamare una volta all'avvio del gioco. */
export function initAudio(): void {
  applyAudio();
  if (hooked) return;
  hooked = true;

  const sblocca = (): void => {
    synth.unlock();
    if (synth.running) {
      window.removeEventListener('click', sblocca, true);
      window.removeEventListener('pointerdown', sblocca, true);
      window.removeEventListener('mousedown', sblocca, true);
      window.removeEventListener('keydown', sblocca, true);
      window.removeEventListener('touchstart', sblocca, true);
    }
  };

  // `capture: true` per intercettare il gesto anche su Safari desktop e mobile
  window.addEventListener('click', sblocca, true);
  window.addEventListener('pointerdown', sblocca, true);
  window.addEventListener('mousedown', sblocca, true);
  window.addEventListener('keydown', sblocca, true);
  window.addEventListener('touchstart', sblocca, true);
  window.addEventListener('sic:settings', applyAudio);
}
