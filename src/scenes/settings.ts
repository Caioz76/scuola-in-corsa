import Phaser from 'phaser';
import { makeButton, makeText, makeToggle } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { BES_PROFILES } from '../bes/profiles';
import { RULE_BY_ID } from '../bes/rules';
import { loadSettings, saveSettings } from '../core/settings';
import { addWorld } from '../art/world';

/**
 * Impostazioni BES: profili pronti + regole una per una.
 *
 * Le regole mostrate qui sono SOLO quelle con un effetto verificabile nel
 * gioco. Le altre (alto contrasto, testi brevi, linguaggio semplice, Pico
 * guida) non hanno ancora un'implementazione: esporle come interruttori
 * sarebbe una promessa falsa. Vedi RIPRESA.md.
 */
const REGOLE_UI = [
  'pauseAllowed',
  'slowPace',
  'fewerOptions',
  'hintFirst',
  'errorExplanation',
  'dyslexiaFont',
  'largerText',
  'visualSupports',
  'tapInsteadOfDrag',
  'largerTargets',
  'noPrecision',
  'repeatPrompt',
  'clearProgress',
  'musicOff',
  'soundCues',
  'visualInsteadOfAudio',
  'highContrast',
  'reduceMotion',
  'noDecoration'
];

let pagina: 'profili' | 'regole' = 'profili';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super('Settings');
  }

  create(): void {
    const impostazioni = loadSettings();
    const cfg = resolveConfig(impostazioni);
    const w = this.scale.gameSize.width;

    addWorld(this, 'scuola', cfg, { pico: false, speed: 20 });

    if (pagina === 'regole') {
      this.creaRegole(cfg, w);
      return;
    }

    makeText(this, w / 2, 46, 'Impostazioni', cfg, {
      size: 32,
      bold: true,
      color: '#ffd93d',
      outline: true
    });

    const scelto = BES_PROFILES.find((p) => p.id === impostazioni.profileId);
    makeText(this, w / 2, 92, 'Scegli un profilo: le regole si applicano subito a tutto il gioco.', cfg, {
      size: 15,
      color: '#b8c4e0'
    });
    makeText(this, w / 2, 124, scelto ? scelto.description : 'Nessun profilo: regole standard.', cfg, {
      size: 15,
      color: scelto ? '#8fe3b0' : '#5a6484',
      wrap: 820
    });

    // Griglia 3×3: 9 profili, bottoni larghi abbastanza per le etichette lunghe.
    const xs = [200, 512, 824];
    const ys = [200, 300, 400];
    BES_PROFILES.forEach((p, i) => {
      const b = makeButton(this, cfg, xs[i % 3], ys[Math.floor(i / 3)], p.label, {
        scale: 0.9,
        depth: 10
      });
      if (p.id === impostazioni.profileId) b.setKind('correct');
      b.onTap(() => {
        saveSettings({ profileId: p.id, overrides: {} });
        this.scene.restart();
      });
    });

    const nessuno = makeButton(this, cfg, 250, 500, 'Nessun profilo', { scale: 0.62, depth: 10 });
    nessuno.onTap(() => {
      saveSettings({ profileId: null, overrides: {} });
      this.scene.restart();
    });

    const personalizza = makeButton(this, cfg, 512, 500, 'Regole una per una', {
      scale: 0.62,
      depth: 10
    });
    personalizza.onTap(() => {
      pagina = 'regole';
      this.scene.restart();
    });

    const indietro = makeButton(this, cfg, 774, 500, 'Torna al titolo', { scale: 0.62, depth: 10 });
    indietro.onTap(() => {
      pagina = 'profili';
      this.scene.start('Title');
    });
  }

  private creaRegole(cfg: ReturnType<typeof resolveConfig>, w: number): void {
    makeText(this, w / 2, 46, 'Regole una per una', cfg, {
      size: 30,
      bold: true,
      color: '#ffd93d',
      outline: true
    });
    makeText(this, w / 2, 86, 'Tocca una regola per accenderla o spegnerla. Il profilo scelto resta.', cfg, {
      size: 14,
      color: '#b8c4e0'
    });

    const voci = REGOLE_UI.map((id) => RULE_BY_ID.get(id)).filter(
      (r): r is NonNullable<typeof r> => Boolean(r)
    );

    voci.forEach((regola, i) => {
      const colonna = i < 10 ? 0 : 1;
      const riga = i % 10;
      makeToggle(
        this,
        cfg,
        colonna === 0 ? 268 : 756,
        126 + riga * 38,
        460,
        regola.label,
        cfg.rules[regola.id] === true,
        () => {
          const s = loadSettings();
          saveSettings({
            ...s,
            overrides: { ...s.overrides, [regola.id]: !(cfg.rules[regola.id] === true) }
          });
          this.scene.restart();
        }
      );
    });

    const indietro = makeButton(this, cfg, 512, 525, 'Torna ai profili', { scale: 0.62, depth: 10 });
    indietro.onTap(() => {
      pagina = 'profili';
      this.scene.restart();
    });
  }
}
