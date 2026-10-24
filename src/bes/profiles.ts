/**
 * Profili BES — preset di regole.
 *
 * Un profilo NON è una gabbia: è solo un punto di partenza.
 * L'insegnante può poi modificare ogni regola singolarmente (override).
 */

export interface BesProfile {
  id: string;
  label: string;
  description: string;
  /** icone procedurale dalla libreria */
  icon: string;
  /** Regole modificate rispetto al default (solo quelle cambiate). */
  rules: Record<string, boolean>;
}

export const BES_PROFILES: BesProfile[] = [
  {
    id: 'adhd',
    label: 'ADHD',
    description: 'Meno distrazioni, un passo alla volta, niente fretta.',
    icon: 'focus',
    rules: {
      oneAtATime: true,
      reduceMotion: true,
      noDecoration: true,
      clearProgress: true,
      immediateFeedback: true,
      noStreakPressure: true,
      slowPace: true,
      pauseAllowed: true,
      extraTime: true
    }
  },
  {
    id: 'autismo',
    label: 'Autismo',
    description: 'Prevedibilità totale: stessi colori, stessi suoni, stesso schema.',
    icon: 'pattern',
    rules: {
      predictableLayout: true,
      reduceMotion: true,
      noDecoration: true,
      clearProgress: true,
      immediateFeedback: true,
      colorCoding: true,
      slowPace: true,
      oneAtATime: true,
      hintFirst: true,
      noStreakPressure: true,
      musicOff: true
    }
  },
  {
    id: 'dislessia',
    label: 'Dislessia',
    description: 'Font ad alta leggibilità, testi brevi, più tempo.',
    icon: 'text',
    rules: {
      dyslexiaFont: true,
      largerText: true,
      shorterText: true,
      simpleLanguage: true,
      extraTime: true,
      hintFirst: true,
      errorExplanation: true,
      repeatPrompt: true
    }
  },
  {
    id: 'discalculia',
    label: 'Discalculia',
    description: 'Riga numerica, base dieci, errori spiegati con calma.',
    icon: 'abacus',
    rules: {
      visualSupports: true,
      extraTime: true,
      errorExplanation: true,
      fewerOptions: true,
      oneAtATime: true,
      colorCoding: true,
      slowPace: true
    }
  },
  {
    id: 'disgrafia',
    label: 'Disgrafia',
    description: 'Niente scrittura: si tocca, si sceglie, si trascina.',
    icon: 'pencil',
    rules: {
      tapInsteadOfDrag: true,
      fewerOptions: true,
      largerTargets: true,
      extraTime: true,
      noPrecision: true
    }
  },
  {
    id: 'disprassia',
    label: 'Disprassia',
    description: 'Tocchi grandi e permissivi, niente gesti precisi.',
    icon: 'hand',
    rules: {
      tapInsteadOfDrag: true,
      largerTargets: true,
      noPrecision: true,
      reduceMotion: true,
      noDecoration: true
    }
  },
  {
    id: 'sordita',
    label: 'Sordità',
    description: 'Ogni suono diventa un segnale visivo chiaro.',
    icon: 'ear',
    rules: {
      visualInsteadOfAudio: true,
      soundCues: false,
      musicOff: true,
      colorCoding: true,
      largerText: true
    }
  },
  {
    id: 'disabilita-intellettiva',
    label: 'Disabilità intellettiva',
    description: 'Linguaggio semplice, pochi passi, tanti rinforzi positivi.',
    icon: 'heart',
    rules: {
      simpleLanguage: true,
      shorterText: true,
      fewerOptions: true,
      oneAtATime: true,
      extraTime: true,
      positiveReinforcement: true,
      mascotGuide: true,
      clearProgress: true,
      hintFirst: true,
      largerText: true,
      errorExplanation: true,
      noStreakPressure: true
    }
  },
  {
    id: 'ansia',
    label: 'DSA / Ansia',
    description: 'Zero pressione: si può riprendere, sbagliare e capire.',
    icon: 'calm',
    rules: {
      extraTime: true,
      pauseAllowed: true,
      noStreakPressure: true,
      positiveReinforcement: true,
      slowPace: true,
      errorExplanation: true,
      repeatPrompt: true,
      clearProgress: true
    }
  }
];

export const PROFILE_BY_ID: ReadonlyMap<string, BesProfile> = new Map(
  BES_PROFILES.map((p) => [p.id, p])
);
