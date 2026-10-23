/**
 * Persistenza delle impostazioni BES + profilo studente.
 * Le chiavi sono omonimizzate (vedi core/storage.ts).
 */
import { storage } from './storage';
import { DEFAULT_SETTINGS, resolveConfig, type BesSettings, type EffectiveConfig } from '../bes/resolver';
import { setStudent, type StudentProfile } from './state';

const K_SETTINGS = 'settings';
const K_STUDENT = 'student';

export function loadSettings(): BesSettings {
  return storage.get<BesSettings>(K_SETTINGS, DEFAULT_SETTINGS);
}

export function saveSettings(s: BesSettings): void {
  storage.set(K_SETTINGS, s);
}

/** Config effettiva corrente (regole risolte) — usata da UI e gioco. */
export function currentConfig(): EffectiveConfig {
  return resolveConfig(loadSettings());
}

export function loadStudent(): StudentProfile {
  const s = storage.get<StudentProfile>(K_STUDENT, { pseudonym: '', classLabel: '', notes: '' });
  setStudent(s);
  return s;
}

export function saveStudent(): void {
  storage.set(K_STUDENT, {
    pseudonym: session.student.pseudonym,
    classLabel: session.student.classLabel,
    notes: session.student.notes
  });
}

import { session } from './state';
