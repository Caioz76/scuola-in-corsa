import { BES_RULES, RULE_BY_ID } from './rules';
import { PROFILE_BY_ID } from './profiles';

/**
 * Resolver BES:
 *   default regole  →  preset del profilo  →  override manuali
 * produce:
 *   - `rules`: mappa completa ruleId → boolean
 *   - `EffectiveConfig`: campi derivati comodi per il motore di gioco
 */

export interface EffectiveConfig {
  /** Mappa completa delle regole risolte. */
  rules: Record<string, boolean>;
  /** Profilo attivo (o null). */
  profileId: string | null;
  /** Override manuali applicati sopra il profilo. */
  overrides: Record<string, boolean>;

  // ── Derivati per il motore di gioco ─────────────────────────────
  timeLimitMs: number | null;
  maxOptions: number;
  font: 'default' | 'dyslexia';
  fontScale: number;
  highContrast: boolean;
  motion: 'full' | 'reduced' | 'off';
  slowPace: boolean;
  decoration: boolean;
  dragEnabled: boolean;
  targetScale: number;
  permissiveTouch: boolean;
  music: boolean;
  sfx: boolean;
  visualAudioCues: boolean;
  colorCoding: boolean;
  showStreak: boolean;
  showHintUpfront: boolean;
  showExplanationOnWrong: boolean;
  simpleLanguage: boolean;
  shorterText: boolean;
  oneAtATime: boolean;
  visualSupports: boolean;
  mascotGuide: boolean;
  clearProgress: boolean;
  pauseAllowed: boolean;
  repeatPrompt: boolean;
  /** Anno scolastico attivo (P1..P5 primaria, S1..S3 secondaria I grado). */
  schoolYear: AnnoScolastico;
  /** Ciclo scolastico derivato dall'anno ('primaria' | 'secondaria'). */
  schoolCycle: 'primaria' | 'secondaria';
  /** Livello di difficoltà modellato sull'anno scolastico (1, 2 o 3). */
  targetDifficulty: 1 | 2 | 3;
  /** Velocità di crociera del Runner (px/s) calibrata su anno e regole BES. */
  runnerSpeed: number;
  /** Selettore velocità Runner: 'slow' | 'normal' | 'fast' */
  runnerSpeedMultiplier: 'slow' | 'normal' | 'fast';
}

/**
 * Anno scolastico:
 *  - P1..P5: Scuola Primaria (1ª – 5ª)
 *  - S1..S3: Scuola Secondaria di primo grado (1ª – 3ª)
 */
export type AnnoScolastico = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'S1' | 'S2' | 'S3';

export interface InfoAnnoScolastico {
  id: AnnoScolastico;
  short: string;
  label: string;
  ciclo: 'primaria' | 'secondaria';
  classe: number;
  difficulty: 1 | 2 | 3;
  /** Indice preferito della tappa iniziale (0-based). */
  defaultLevelIndex: number;
  runnerSpeed: number;
  description: string;
}

export const ANNI_SCOLASTICI: InfoAnnoScolastico[] = [
  {
    id: 'P1',
    short: '1ª P',
    label: '1ª Primaria',
    ciclo: 'primaria',
    classe: 1,
    difficulty: 1,
    defaultLevelIndex: 0,
    runnerSpeed: 360,
    description: 'Primaria 1ª: prime parole, numeri entro 20, 3 opzioni e supporti visivi.'
  },
  {
    id: 'P2',
    short: '2ª P',
    label: '2ª Primaria',
    ciclo: 'primaria',
    classe: 2,
    difficulty: 1,
    defaultLevelIndex: 0,
    runnerSpeed: 420,
    description: 'Primaria 2ª: calcoli entro 50, frasi semplici, osservazione della natura.'
  },
  {
    id: 'P3',
    short: '3ª P',
    label: '3ª Primaria',
    ciclo: 'primaria',
    classe: 3,
    difficulty: 1,
    defaultLevelIndex: 0,
    runnerSpeed: 480,
    description: 'Primaria 3ª: tabelline, ortografia, viventi e preistoria.'
  },
  {
    id: 'P4',
    short: '4ª P',
    label: '4ª Primaria',
    ciclo: 'primaria',
    classe: 4,
    difficulty: 2,
    defaultLevelIndex: 1,
    runnerSpeed: 480,
    description: 'Primaria 4ª: operazioni e problemi, grammatica, ecosistemi e antiche civiltà.'
  },
  {
    id: 'P5',
    short: '5ª P',
    label: '5ª Primaria',
    ciclo: 'primaria',
    classe: 5,
    difficulty: 2,
    defaultLevelIndex: 2,
    runnerSpeed: 500,
    description: 'Primaria 5ª: frazioni e divisioni, tempi verbali, energia, Grecia e Roma.'
  },
  {
    id: 'S1',
    short: '1ª M',
    label: '1ª Secondaria',
    ciclo: 'secondaria',
    classe: 1,
    difficulty: 3,
    defaultLevelIndex: 2,
    runnerSpeed: 520,
    description: 'Secondaria I gr. 1ª: potenze e divisibilità, morfologia, cellula e Medioevo.'
  },
  {
    id: 'S2',
    short: '2ª M',
    label: '2ª Secondaria',
    ciclo: 'secondaria',
    classe: 2,
    difficulty: 3,
    defaultLevelIndex: 3,
    runnerSpeed: 540,
    description: 'Secondaria I gr. 2ª: proporzioni e frazioni, analisi logica, chimica ed Età moderna.'
  },
  {
    id: 'S3',
    short: '3ª M',
    label: '3ª Secondaria',
    ciclo: 'secondaria',
    classe: 3,
    difficulty: 3,
    defaultLevelIndex: 3,
    runnerSpeed: 560,
    description: 'Secondaria I gr. 3ª: algebra e geometria, analisi del periodo, fisica, genetica e Novecento.'
  }
];

export const ANNO_BY_ID: ReadonlyMap<AnnoScolastico, InfoAnnoScolastico> = new Map(
  ANNI_SCOLASTICI.map((a) => [a.id, a])
);

export function normalizzaAnno(v: unknown): AnnoScolastico {
  if (typeof v === 'string' && ANNO_BY_ID.has(v as AnnoScolastico)) {
    return v as AnnoScolastico;
  }
  return 'P3';
}

/**
 * Come si gioca: `quiz` (bottoni) o `runner` (cartelli sulla pista).
 * Non è una regola BES: è una scelta di prodotto, salvata con le impostazioni.
 */
export type GiocoMode = 'quiz' | 'runner';

/**
 * Come si vede il gioco: `2d` (disegno laterale) o `3d` (terza persona).
 * È indipendente dalla modalità: si può giocare Quiz o Runner in entrambe.
 */
export type Grafica = '2d' | '3d';

export interface BesSettings {
  profileId: string | null;
  overrides: Record<string, boolean>;
  /** Modalità scelta; se assente vale `quiz`. */
  mode?: GiocoMode;
  /** Grafica scelta; se assente vale `2d`. */
  graphics?: Grafica;
  /** Anno scolastico scelto (P1..P5 primaria, S1..S3 secondaria I grado); default `P3`. */
  schoolYear?: AnnoScolastico;
  /** Se vero (default), estrae e mescola le domande dal bacino dell'anno/materia. */
  randomQuestions?: boolean;
  /** Velocità runner: 'slow' | 'normal' | 'fast' (default 'normal'). */
  runnerSpeedMultiplier?: 'slow' | 'normal' | 'fast';
}

export const DEFAULT_SETTINGS: BesSettings = {
  profileId: null,
  overrides: {},
  mode: 'quiz',
  graphics: '2d',
  schoolYear: 'P3',
  randomQuestions: true,
  runnerSpeedMultiplier: 'normal'
};

export function resolveConfig(settings: BesSettings): EffectiveConfig {
  const rules: Record<string, boolean> = {};
  for (const r of BES_RULES) rules[r.id] = r.enabled;

  const profile = settings.profileId ? PROFILE_BY_ID.get(settings.profileId) : undefined;
  if (profile) {
    for (const [id, value] of Object.entries(profile.rules)) {
      if (RULE_BY_ID.has(id)) rules[id] = value;
    }
  }

  for (const [id, value] of Object.entries(settings.overrides ?? {})) {
    if (RULE_BY_ID.has(id)) rules[id] = value;
  }

  const has = (id: string): boolean => rules[id] === true;
  const schoolYear = normalizzaAnno(settings.schoolYear);
  const infoAnno = ANNO_BY_ID.get(schoolYear)!;

  return {
    rules,
    profileId: settings.profileId,
    overrides: settings.overrides ?? {},
    timeLimitMs: has('extraTime') ? null : 30_000,
    maxOptions: has('fewerOptions') ? 2 : schoolYear === 'P1' ? 3 : 4,
    font: has('dyslexiaFont') ? 'dyslexia' : 'default',
    fontScale: has('largerText') ? 1.25 : 1.0,
    highContrast: has('highContrast'),
    motion: has('reduceMotion') ? 'off' : has('slowPace') ? 'reduced' : 'full',
    slowPace: has('slowPace'),
    decoration: !has('noDecoration'),
    dragEnabled: !has('tapInsteadOfDrag'),
    targetScale: has('largerTargets') ? 1.3 : 1.0,
    permissiveTouch: has('noPrecision'),
    music: !has('musicOff'),
    sfx: has('soundCues') && !has('visualInsteadOfAudio'),
    visualAudioCues: has('visualInsteadOfAudio'),
    colorCoding: has('colorCoding'),
    showStreak: !has('noStreakPressure'),
    showHintUpfront: has('hintFirst') || (schoolYear === 'P1' && settings.overrides?.hintFirst !== false),
    showExplanationOnWrong: has('errorExplanation'),
    simpleLanguage: has('simpleLanguage') || has('shorterText'),
    shorterText: has('shorterText'),
    oneAtATime: has('oneAtATime'),
    visualSupports:
      has('visualSupports') || (schoolYear === 'P1' && settings.overrides?.visualSupports !== false),
    mascotGuide: has('mascotGuide'),
    clearProgress: has('clearProgress'),
    pauseAllowed: has('pauseAllowed'),
    repeatPrompt: has('repeatPrompt'),
    schoolYear,
    schoolCycle: infoAnno.ciclo,
    targetDifficulty: infoAnno.difficulty,
    runnerSpeedMultiplier: settings.runnerSpeedMultiplier ?? 'normal',
    runnerSpeed: has('reduceMotion')
      ? 0
      : Math.round(
          (has('slowPace') ? infoAnno.runnerSpeed * 0.78 : infoAnno.runnerSpeed) *
            (settings.runnerSpeedMultiplier === 'slow' ? 0.68 : settings.runnerSpeedMultiplier === 'fast' ? 1.25 : 1.0)
        )
  };
}

/**
 * Semplifica e accorcia un testo quando le regole BES `simpleLanguage` o
 * `shorterText` sono attive. Funzione pura (testabile senza browser/Phaser).
 */
export function testoSemplice(str: string, cfg: EffectiveConfig): string {
  if (!cfg.simpleLanguage && !cfg.shorterText) return str;
  let s = str.trim();

  const mappa: Array<[RegExp, string]> = [
    [
      /^Metti (?:questi quattro |queste quattro |questi |queste |i )?numeri in ordine,? dal più piccolo al più grande\.?$/i,
      'Ordina dal più piccolo.'
    ],
    [/^Metti (?:queste quattro |queste )?parole in ordine alfabetico\.?$/i, 'Ordina dalla A alla Z.'],
    [
      /^Tocca le (?:tre )?parole nell'ordine giusto per formare una frase(?: di senso compiuto)?\.?$/i,
      'Forma la frase.'
    ],
    [/^Quale (?:di queste parole|parola) ha lo stesso significato di /i, 'Sinonimo di '],
    [
      /^Quale di queste frasi è scritta in modo corretto con maiuscola e punto\?$/i,
      'Quale frase è corretta?'
    ],
    [
      /^Come si chiama il processo con cui le piante producono il proprio cibo\?$/i,
      'Come producono cibo le piante?'
    ],
    [/^Quale popolo ha fondato la città di Roma secondo la leggenda\?$/i, 'Chi ha fondato Roma?'],
    [
      /^Metti in ordine questi periodi storici, dal più antico al più recente\.?$/i,
      'Ordina dal più antico.'
    ],
    [/^Metti in ordine questi eventi, dal più antico al più recente\.?$/i, 'Ordina dal più antico.'],
    [/^Abbina ogni operazione al suo risultato\.?$/i, 'Abbina operazione e risultato.'],
    [/^Abbina l'organo alla sua funzione\.?$/i, 'Abbina organo e funzione.']
  ];

  for (const [re, sost] of mappa) {
    if (re.test(s)) {
      s = s.replace(re, sost);
      break;
    }
  }

  s = s
    .replace(/\barticolo determinativo\b/gi, 'articolo')
    .replace(/\bcorpo celeste\b/gi, 'astro')
    .replace(/\bcolonna vertebrale\b/gi, 'spina dorsale')
    .replace(/\bin ordine crescente\b/gi, 'dal più piccolo');

  if (cfg.shorterText) {
    s = s
      .replace(/,\s*perché\s+[^.?!]+([.?!]?)$/i, '$1')
      .replace(/;\s+[^.?!]+([.?!]?)$/i, '$1');
  }

  return s;
}
