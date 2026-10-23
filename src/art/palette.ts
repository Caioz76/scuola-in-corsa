/**
 * Palette "Flash 8/AS3": colori saturi, bordi scuri, gloss.
 * Tutto il gioco disegna con questi valori → cambio look in un punto solo.
 */

export const C = {
  // base
  bg: '#1a1c2c',
  ink: '#20222f', // outline scuri Flash
  white: '#ffffff',
  paper: '#fff8e7',

  // Pico (robot giallo)
  pico: '#ffd93d',
  picoDark: '#e8b71e',
  picoLight: '#ffe98a',
  picoEye: '#1a1c2c',
  picoCheek: '#ff8fab',

  // primari saturi
  sky: '#7ec8f2',
  skyDeep: '#4aa8e8',
  grass: '#7ed957',
  grassDeep: '#4caf50',
  orange: '#ff9f43',
  orangeDeep: '#e07b1f',
  red: '#ff5d5d',
  redDeep: '#d64242',
  green: '#58d68d',
  greenDeep: '#35b06f',
  blue: '#4dabf7',
  blueDeep: '#2b7fd4',
  purple: '#b197fc',
  purpleDeep: '#8465d8',
  pink: '#f78fb3',
  pinkDeep: '#d9648f',

  // feedback
  ok: '#58d68d',
  okDeep: '#2f9e5d',
  bad: '#ff8787',
  badDeep: '#d64242',

  // neutri
  gray: '#cfd6e4',
  grayDeep: '#9aa5bd',
  panel: '#2b3050',
  panelDeep: '#1f2340'
} as const;

/** Tema in alto contrasto (regola BES `highContrast`). */
export const C_HC = {
  ...C,
  sky: '#3aa0e8',
  grass: '#43c93a',
  paper: '#ffffff',
  ink: '#000000',
  gray: '#f2f2f2',
  panel: '#000000',
  panelDeep: '#000000'
} as const;

export type Palette = typeof C;

/** Converte un colore CSS ('#rrggbb') nel numero atteso da Phaser Graphics. */
export const hexNum = (h: string): number => parseInt(h.slice(1), 16);
