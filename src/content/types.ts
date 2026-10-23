/**
 * Modello dei contenuti — "Scuola in Corsa".
 *
 * Questi tipi sono la FONTE UNICA: li condivide il gioco, il validatore,
 * l'editor e il generatore AI (Content Factory). Cambiando qui cambia tutto.
 *
 * I pacchetti sono JSON statici: il gioco NON dipende da LM Studio o da rete.
 */

export type RoundType = 'quiz' | 'image' | 'dragdrop' | 'sequence';

export type Difficulty = 1 | 2 | 3;

/** Supporto visivo per la matematica (riga numerica, base dieci, tabella). */
export type MathSupport = 'numberLine' | 'baseTen' | 'table';

export interface Option {
  /** Testo VISIBILE dell'opzione (mai placeholder tipo "A"/"B"/"C"). */
  label: string;
  correct: boolean;
}

interface RoundBase {
  /** Identificativo univoco (assegnato dal codice, mai dall'LLM). */
  id: string;
  /** Testo della domanda per il bambino. */
  prompt: string;
  /** Suggerimento che aiuta senza rivelare la risposta. */
  hint?: string;
  /** Spiegazione breve (per l'insegnante / feedback post-risposta). */
  explanation?: string;
}

/** Quiz a scelta multipla. 2-4 opzioni, UNA sola corretta. */
export interface QuizRound extends RoundBase {
  type: 'quiz';
  options: Option[];
  /** Supporto visitivo opzionale per la matematica. */
  support?: MathSupport;
}

/**
 * Riconoscimento immagine: viene mostrata un'icona (procedurale) e il
 * bambino sceglie la parola corretta tra le opzioni.
 * `icon` deve riferirsi a un'icona esistente nella libreria procedurale.
 */
export interface ImageRound extends RoundBase {
  type: 'image';
  icon: string;
  options: Option[];
}

/**
 * Trascina-e-rilascia, mode "sort": riordinare `sortItems` nella sequenza
 * corretta (l'ordine dell'array È l'ordine giusto; in gioco vengono
 * mescolate).
 */
export interface SortRound extends RoundBase {
  type: 'dragdrop';
  mode: 'sort';
  /** Elementi nell'ordine CORRETTO. */
  sortItems: string[];
}

/**
 * Trascina-e-rilascia, mode "match": collegare ogni elemento di `leftItems`
 * al corrispondente di `rightItems`. `pairs[i] = [i, indiceInRightItems]`.
 */
export interface MatchDragDropRound extends RoundBase {
  type: 'dragdrop';
  mode: 'match';
  leftItems: string[];
  rightItems: string[];
  /** Coppie [indiceLeft, indiceRight]. La semantica impone pairs[i][0] === i. */
  pairs: [number, number][];
}

/** Union discriminata per `mode`. */
export type DragDropRound = SortRound | MatchDragDropRound;

/**
 * Sequenza: mettere gli eventi/elementi in ordine cronologico o logico.
 *  - direction "tap":  toccare gli elementi già visibili nell'ordine giusto.
 *  - direction "drag": trascinare gli elementi negli slot.
 * `items` è nell'ordine CORRETTO.
 */
export interface SequenceRound extends RoundBase {
  type: 'sequence';
  direction: 'tap' | 'drag';
  items: string[];
}

export type Round = QuizRound | ImageRound | DragDropRound | SequenceRound;

export interface Level {
  id: string;
  title: string;
  difficulty: Difficulty;
  rounds: Round[];
}

export interface Pack {
  /** Identificativo stabile del pacchetto (es. "mat-7-9"). */
  packId: string;
  version: string;
  title: string;
  subject: string;
  /** Fascia d'età (es. "7-9"). */
  ageRange: string;
  /** Difficoltà complessiva del pacchetto. */
  difficulty: Difficulty;
  levels: Level[];
}
