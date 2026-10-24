/**
 * Impostazioni BES persistenti.
 *
 * Separato da `src/bes/resolver.ts` (che resta puro): qui c'è solo I/O su
 * localStorage, così il resolver continua a essere testabile senza browser.
 */
import { storage } from './storage';
import { DEFAULT_SETTINGS, normalizzaAnno, type BesSettings } from '../bes/resolver';

const K = 'settings';

export function loadSettings(): BesSettings {
  const s = storage.get<BesSettings>(K, DEFAULT_SETTINGS);
  return {
    profileId: s.profileId ?? null,
    overrides: s.overrides ?? {},
    mode: s.mode === 'runner' ? 'runner' : 'quiz',
    graphics: s.graphics === '3d' ? '3d' : '2d',
    schoolYear: normalizzaAnno(s.schoolYear),
    randomQuestions: s.randomQuestions !== false,
    runnerSpeedMultiplier: s.runnerSpeedMultiplier === 'slow' || s.runnerSpeedMultiplier === 'fast' ? s.runnerSpeedMultiplier : 'normal'
  };
}

export function saveSettings(s: BesSettings): void {
  storage.set(K, s);
  // Segnala subito ai sottosistemi (audio, UI) il cambio di profilo.
  window.dispatchEvent(new CustomEvent('sic:settings'));
}
