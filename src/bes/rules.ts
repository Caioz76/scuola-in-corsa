/**
 * Motore BES — regole atomiche.
 *
 * Ogni regola è un interruttore indipendente, etichettato in italiano
 * (visibile nel pannello Impostazioni per l'insegnante/lo studente).
 * I PROFILI sono solo preset: attivano/disattivano gruppi di regole.
 * L'insegnante può poi sovrascrivere qualsiasi regola singolarmente.
 */

export type RuleCategory =
  | 'tempo'
  | 'cognitivo'
  | 'visivo'
  | 'audio'
  | 'feedback'
  | 'motorio'
  | 'linguistico'
  | 'organizzazione';

export interface BesRule {
  id: string;
  label: string;
  description: string;
  category: RuleCategory;
  /** Valore di default quando nessun profilo è attivo. */
  enabled: boolean;
}

export const RULE_CATEGORIES: Record<RuleCategory, string> = {
  tempo: 'Tempo e ritmo',
  cognitivo: 'Carico cognitivo',
  visivo: 'Aspetto visivo',
  audio: 'Audio',
  feedback: 'Feedback e incoraggiamento',
  motorio: 'Movimento e tocchi',
  linguistico: 'Linguaggio',
  organizzazione: 'Organizzazione'
};

export const BES_RULES: BesRule[] = [
  // ── Tempo e ritmo ────────────────────────────────────────────────
  {
    id: 'extraTime',
    label: 'Nessuna fretta',
    description: 'Nessun limite di tempo sulle risposte.',
    category: 'tempo',
    enabled: false
  },
  {
    id: 'pauseAllowed',
    label: 'Pausa quando serve',
    description: 'La partita si mette in pausa da sola se esci dalla pagina o cambi app.',
    category: 'tempo',
    enabled: false
  },
  {
    id: 'slowPace',
    label: 'Ritmo lento',
    description: 'Animazioni e transizioni più lente e prevedibili.',
    category: 'tempo',
    enabled: false
  },

  // ── Carico cognitivo ─────────────────────────────────────────────
  {
    id: 'oneAtATime',
    label: 'Una prova alla volta',
    description: 'Si vede solo la domanda corrente, niente anticipazioni.',
    category: 'cognitivo',
    enabled: false
  },
  {
    id: 'fewerOptions',
    label: 'Meno opzioni',
    description: 'Massimo 2-3 opzioni invece di 4, più spazio per pensarci.',
    category: 'cognitivo',
    enabled: false
  },
  {
    id: 'shorterText',
    label: 'Testi brevi',
    description: 'Domande e spiegazioni accorciate al massimo.',
    category: 'cognitivo',
    enabled: false
  },
  {
    id: 'hintFirst',
    label: 'Suggerimento in partenza',
    description: 'Il suggerimento è già visibile insieme alla domanda.',
    category: 'cognitivo',
    enabled: false
  },

  // ── Aspetto visivo ───────────────────────────────────────────────
  {
    id: 'highContrast',
    label: 'Alto contrasto',
    description: 'Colori più decisi e testi più marcati.',
    category: 'visivo',
    enabled: false
  },
  {
    id: 'dyslexiaFont',
    label: 'Font leggibile (dislessia)',
    description: 'Atkinson Hyperlegible con spaziature ampie.',
    category: 'visivo',
    enabled: false
  },
  {
    id: 'largerText',
    label: 'Testo più grande',
    description: 'Aumenta la dimensione di tutto il testo.',
    category: 'visivo',
    enabled: false
  },
  {
    id: 'reduceMotion',
    label: 'Riduci i movimenti',
    description: 'Niente parallax né animazioni decorative.',
    category: 'visivo',
    enabled: false
  },
  {
    id: 'noDecoration',
    label: 'Schermata pulita',
    description: 'Rimuove elementi decorativi non necessari.',
    category: 'visivo',
    enabled: false
  },
  {
    id: 'colorCoding',
    label: 'Colori guida',
    description: 'Verde = giusto, rosso = da rifare: sempre uguale.',
    category: 'visivo',
    enabled: false
  },
  {
    id: 'visualSupports',
    label: 'Supporti visivi (matematica)',
    description: 'Riga numerica e blocchi base dieci accanto ai numeri.',
    category: 'visivo',
    enabled: false
  },

  // ── Audio ────────────────────────────────────────────────────────
  {
    id: 'musicOff',
    label: 'Niente musica di sottofondo',
    description: 'Silenzio musicale durante il gioco.',
    category: 'audio',
    enabled: false
  },
  {
    id: 'soundCues',
    label: 'Suoni di conferma',
    description: 'Suoni distinti per risposta giusta e da rifare.',
    category: 'audio',
    enabled: true
  },
  {
    id: 'visualInsteadOfAudio',
    label: 'Segnali visivi invece che sonori',
    description: 'Ogni suono ha un equivalente visivo (per sordità).',
    category: 'audio',
    enabled: false
  },

  // ── Feedback ─────────────────────────────────────────────────────
  {
    id: 'immediateFeedback',
    label: 'Risposta subito',
    description: 'Si vede subito se la risposta è giusta o da rifare.',
    category: 'feedback',
    enabled: true
  },
  {
    id: 'positiveReinforcement',
    label: 'Tanti complimenti',
    description: 'Feedback positivi frequenti, anche sui tentativi.',
    category: 'feedback',
    enabled: false
  },
  {
    id: 'noStreakPressure',
    label: 'Niente pressione della serie',
    description: 'La combo non sparisce mai: solo divertimento.',
    category: 'feedback',
    enabled: false
  },
  {
    id: 'errorExplanation',
    label: 'Spiegazione dopo l’errore',
    description: 'Dopo una risposta da rifare si mostra la spiegazione.',
    category: 'feedback',
    enabled: false
  },

  // ── Motorio ──────────────────────────────────────────────────────
  {
    id: 'tapInsteadOfDrag',
    label: 'Tocca invece di trascinare',
    description: 'Le prove a trascinamento diventano tap: tocca A, tocca B.',
    category: 'motorio',
    enabled: false
  },
  {
    id: 'largerTargets',
    label: 'Bottoni più grandi',
    description: 'Opzioni e bottoni più grandi e distanziati.',
    category: 'motorio',
    enabled: false
  },
  {
    id: 'noPrecision',
    label: 'Tocchi permissivi',
    description: 'Non serve precisione: basta toccare la zona giusta.',
    category: 'motorio',
    enabled: false
  },

  // ── Linguaggio ───────────────────────────────────────────────────
  {
    id: 'simpleLanguage',
    label: 'Linguaggio semplice',
    description: 'Frasi brevi, una sola idea per volta.',
    category: 'linguistico',
    enabled: false
  },
  {
    id: 'repeatPrompt',
    label: 'Rileggi la domanda',
    description: 'Bottone "Rileggi" sempre disponibile.',
    category: 'linguistico',
    enabled: false
  },

  // ── Organizzazione ───────────────────────────────────────────────
  {
    id: 'clearProgress',
    label: 'Progresso ben visibile',
    description: 'Barra di avanzamento grande e contatore chiaro.',
    category: 'organizzazione',
    enabled: false
  },
  {
    id: 'predictableLayout',
    label: 'Schermate sempre uguali',
    description: 'Nessun cambio di disposizione a sorpresa.',
    category: 'organizzazione',
    enabled: false
  },
  {
    id: 'mascotGuide',
    label: 'Pico guida i passi',
    description: 'La mascotte Pico indica sempre cosa fare.',
    category: 'organizzazione',
    enabled: false
  }
];

export const RULE_BY_ID: ReadonlyMap<string, BesRule> = new Map(BES_RULES.map((r) => [r.id, r]));
