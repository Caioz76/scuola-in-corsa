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
  oneAtATime: boolean;
  visualSupports: boolean;
  mascotGuide: boolean;
  clearProgress: boolean;
  pauseAllowed: boolean;
  repeatPrompt: boolean;
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
}

export const DEFAULT_SETTINGS: BesSettings = {
  profileId: null,
  overrides: {},
  mode: 'quiz',
  graphics: '2d'
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

  return {
    rules,
    profileId: settings.profileId,
    overrides: settings.overrides ?? {},
    timeLimitMs: has('extraTime') ? null : 30_000,
    maxOptions: has('fewerOptions') ? 2 : 4,
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
    showHintUpfront: has('hintFirst'),
    showExplanationOnWrong: has('errorExplanation'),
    simpleLanguage: has('simpleLanguage') || has('shorterText'),
    oneAtATime: has('oneAtATime'),
    visualSupports: has('visualSupports'),
    mascotGuide: has('mascotGuide'),
    clearProgress: has('clearProgress'),
    pauseAllowed: has('pauseAllowed'),
    repeatPrompt: has('repeatPrompt')
  };
}
