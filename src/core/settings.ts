/**
 * Impostazioni BES persistenti.
 *
 * Separato da `src/bes/resolver.ts` (che resta puro): qui c'è solo I/O su
 * localStorage, così il resolver continua a essere testabile senza browser.
 */
import { storage } from './storage';
import { DEFAULT_SETTINGS, type BesSettings } from '../bes/resolver';

const K = 'settings';

export function loadSettings(): BesSettings {
  const s = storage.get<BesSettings>(K, DEFAULT_SETTINGS);
  return {
    profileId: s.profileId ?? null,
    overrides: s.overrides ?? {}
  };
}

export function saveSettings(s: BesSettings): void {
  storage.set(K, s);
  // Segnala subito ai sottosistemi (audio, UI) il cambio di profilo.
  window.dispatchEvent(new CustomEvent('sic:settings'));
}
