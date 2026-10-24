/**
 * Palette "giorno di scuola": chiara, morbida, arrotondata.
 *
 * Ispirazione: la sensazione delle console di casa Nintendo (Wii) — superfici
 * bianche, colori pastello, ombre leggere, niente contorni neri pesanti.
 * È solo un riferimento di atmosfera: forme, colori e personaggi sono nostri.
 *
 * Tutto il gioco disegna con questi valori → cambio look in un punto solo.
 */

export const C = {
  // base
  bg: '#eaf6ff',
  ink: '#3b4a5a', // contorno morbido, mai nero pieno
  white: '#ffffff',
  paper: '#fffdf7',

  // Pico (robot giallo)
  pico: '#ffe08a',
  picoDark: '#c9a94a',
  picoLight: '#fff3c4',
  picoEye: '#2f3b4c',
  picoCheek: '#ff9db0',

  // primari pastello
  sky: '#8fd0ff',
  skyDeep: '#4aa8e8',
  grass: '#8fe08a',
  grassDeep: '#5cc45c',
  orange: '#ffa45c',
  orangeDeep: '#c96a12',
  red: '#ff8080',
  redDeep: '#d95a5a',
  green: '#6fcf8f',
  greenDeep: '#3aa564',
  blue: '#66b8f2',
  blueDeep: '#2b7fd4',
  purple: '#b3a0f5',
  purpleDeep: '#7d68d8',
  pink: '#ffa8c8',
  pinkDeep: '#d9648f',

  // feedback
  ok: '#2f9e5d',
  okDeep: '#24804a',
  bad: '#e05a5a',
  badDeep: '#b83c3c',

  // neutri
  gray: '#eef2f7',
  grayDeep: '#c9d3e0',
  panel: '#ffffff',
  panelDeep: '#e8f1fa'
} as const;

/** Tema in alto contrasto (regola BES `highContrast`). */
export const C_HC = {
  ...C,
  ink: '#000000',
  paper: '#ffffff',
  panel: '#ffffff',
  panelDeep: '#ffffff',
  gray: '#f2f2f2',
  grayDeep: '#000000'
} as const;

export type Palette = typeof C;

/** Converte un colore CSS ('#rrggbb') nel numero atteso da Phaser Graphics. */
export const hexNum = (h: string): number => parseInt(h.slice(1), 16);

/** Colori del testo (ruoli, non valori sparsi nelle scene). */
export const T = {
  /** testo principale su fondo chiaro */
  body: '#2f3b4c',
  /** sottotitoli e testi secondari */
  sub: '#5f7186',
  /** testi molto tenui (disattivati) */
  faint: '#8a99ad',
  /** titoli di schermata */
  title: '#1d6fb8',
  /** conferme e progressi */
  ok: '#1f8a4c',
  /** errori e avvisi forti */
  bad: '#b83c3c',
  /** avvisi e suggerimenti */
  warn: '#c96a12',
  /** stelle guadagnate (leggibili su chiaro) */
  gold: '#d99a00'
} as const;
