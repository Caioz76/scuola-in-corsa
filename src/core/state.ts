import type { Pack } from '../content/types';

/**
 * Stato globale di sessione (non persistito qui: la persistenza la fa
 * core/storage quando serve). Le scene leggono/scrivono questi campi.
 */

export interface StudentProfile {
  /** Pseudonimo scelto dallo studente (mai nome reale). */
  pseudonym: string;
  /** Classe/età indicativa, libera. */
  classLabel: string;
  /** Note libere (es. indicazioni PEI/PDP), opzionali. */
  notes: string;
}

export interface SessionState {
  student: StudentProfile;
  /** Pacchetti disponibili (embed + caricati da file). */
  packs: Pack[];
  /** Pacchetto scelto. */
  activePack: Pack | null;
  /** Indice livello scelto. */
  activeLevelIndex: number;
  /** Risultato dell'ultima partita (per la scena Results). */
  lastResult: GameResult | null;
}

export interface RoundOutcome {
  roundId: string;
  correct: boolean;
  attempts: number;
  timeMs: number;
}

export interface GameResult {
  packId: string;
  levelId: string;
  total: number;
  correct: number;
  /** Percentuale 0-100. */
  scorePct: number;
  durationMs: number;
  profileId: string | null;
  outcomes: RoundOutcome[];
  finishedAt: number;
}

export const session: SessionState = {
  student: {
    pseudonym: '',
    classLabel: '',
    notes: ''
  },
  packs: [],
  activePack: null,
  activeLevelIndex: 0,
  lastResult: null
};

export function setStudent(p: Partial<StudentProfile>): void {
  Object.assign(session.student, p);
}
