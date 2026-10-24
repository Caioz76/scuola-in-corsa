import Phaser from 'phaser';
import { makeButton, makeText, makeToggle } from '../challenges/ui';
import {
  ANNI_SCOLASTICI,
  ANNO_BY_ID,
  normalizzaAnno,
  resolveConfig
} from '../bes/resolver';
import { BES_PROFILES } from '../bes/profiles';
import { RULE_BY_ID } from '../bes/rules';
import { loadSettings, saveSettings } from '../core/settings';
import { addWorld } from '../art/world';

/**
 * Impostazioni BES, modalità, grafica e anno scolastico:
 * - Profili pronti + regole una per una (tutte le 22 regole con effetto reale)
 * - Selezione per anno scolastico: Scuola Primaria (1ª–5ª) e Scuola
 *   Secondaria di primo grado (1ª–3ª) per modellare difficoltà, ritmo e
 *   bacino di domande.
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
  'noDecoration',
  'shorterText',
  'simpleLanguage',
  'mascotGuide'
];

let pagina: 'profili' | 'regole' | 'classe' = 'profili';

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
    if (pagina === 'classe') {
      this.creaClasse(impostazioni, cfg, w);
      return;
    }

    makeText(this, w / 2, 34, 'Impostazioni', cfg, {
      size: 30,
      bold: true,
      color: '#1d6fb8',
      outline: true
    });

    const scelto = BES_PROFILES.find((p) => p.id === impostazioni.profileId);
    const infoAnno = ANNO_BY_ID.get(normalizzaAnno(impostazioni.schoolYear))!;
    makeText(
      this,
      w / 2,
      64,
      `Anno scolastico: ${infoAnno.label} · Difficoltà ${infoAnno.difficulty}/3 · Domande casuali ${impostazioni.randomQuestions !== false ? 'attive' : 'fisse'}`,
      cfg,
      {
        size: 14,
        color: '#5f7186'
      }
    );
    makeText(this, w / 2, 90, scelto ? scelto.description : 'Nessun profilo: regole standard.', cfg, {
      size: 15,
      color: scelto ? '#1f8a4c' : '#8a99ad',
      wrap: 820
    });

    // ── Modalità di gioco (scelta di prodotto, non regola BES) ──
    const mode = impostazioni.mode ?? 'quiz';
    makeText(this, 280, 126, 'Modalità:', cfg, {
      size: 15,
      bold: true,
      color: '#2f3b4c'
    });
    (
      [
        ['quiz', 'Quiz (bottoni)', 448],
        ['runner', 'Runner (cartelli)', 664]
      ] as const
    ).forEach(([id, label, x]) => {
      const b = makeButton(this, cfg, x, 126, label, { scale: 0.5, depth: 10 });
      if (mode === id) b.setKind('correct');
      b.onTap(() => {
        if (mode === id) return;
        saveSettings({ ...impostazioni, mode: id });
        this.scene.restart();
      });
    });

    // ── Grafica (indipendente dalla modalità: Quiz e Runner in 2D o 3D) ──
    const grafica = impostazioni.graphics ?? '2d';
    makeText(this, 280, 168, 'Grafica:', cfg, {
      size: 15,
      bold: true,
      color: '#2f3b4c'
    });
    (
      [
        ['2d', '2D', 448],
        ['3d', '3D', 664]
      ] as const
    ).forEach(([id, label, x]) => {
      const b = makeButton(this, cfg, x, 168, label, { scale: 0.5, depth: 10 });
      if (grafica === id) b.setKind('correct');
      b.onTap(() => {
        if (grafica === id) return;
        saveSettings({ ...impostazioni, graphics: id });
        this.scene.restart();
      });
    });

    // ── Pulsante rapido per aprire la scheda Anno scolastico ──
    const btnAnno = makeButton(this, cfg, 882, 147, 'Anno scolastico', {
      scale: 0.52,
      depth: 10
    });
    btnAnno.onTap(() => {
      pagina = 'classe';
      this.scene.restart();
    });

    // Griglia 3×3: 9 profili, bottoni larghi abbastanza per le etichette lunghe.
    const xs = [200, 512, 824];
    const ys = [232, 314, 396];
    BES_PROFILES.forEach((p, i) => {
      const b = makeButton(this, cfg, xs[i % 3], ys[Math.floor(i / 3)], p.label, {
        scale: 0.9,
        depth: 10
      });
      if (p.id === impostazioni.profileId) b.setKind('correct');
      b.onTap(() => {
        saveSettings({ ...impostazioni, profileId: p.id, overrides: {} });
        this.scene.restart();
      });
    });

    // ── Barra rapida Anno scolastico (Primaria 1ª–5ª · Secondaria I 1ª–3ª) ──
    makeText(this, 108, 452, 'Classe:', cfg, {
      size: 14,
      bold: true,
      color: '#2f3b4c'
    });
    ANNI_SCOLASTICI.forEach((anno, idx) => {
      const bx = 200 + idx * 102;
      const b = makeButton(this, cfg, bx, 452, anno.short, { scale: 0.29, depth: 10 });
      if (anno.id === infoAnno.id) b.setKind('correct');
      b.onTap(() => {
        if (anno.id === infoAnno.id) return;
        saveSettings({ ...impostazioni, schoolYear: anno.id });
        this.scene.restart();
      });
    });

    const nessuno = makeButton(this, cfg, 250, 500, 'Nessun profilo', { scale: 0.62, depth: 10 });
    nessuno.onTap(() => {
      saveSettings({ ...impostazioni, profileId: null, overrides: {} });
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

  private creaClasse(
    impostazioni: ReturnType<typeof loadSettings>,
    cfg: ReturnType<typeof resolveConfig>,
    w: number
  ): void {
    const attivo = ANNO_BY_ID.get(normalizzaAnno(impostazioni.schoolYear))!;

    makeText(this, w / 2, 42, 'Anno scolastico e difficoltà', cfg, {
      size: 30,
      bold: true,
      color: '#1d6fb8',
      outline: true
    });
    makeText(
      this,
      w / 2,
      78,
      'Modella la difficoltà delle prove, la velocità del Runner e il bacino di domande.',
      cfg,
      { size: 15, color: '#5f7186' }
    );
    makeText(this, w / 2, 108, attivo.description, cfg, {
      size: 15,
      bold: true,
      color: '#1f8a4c',
      wrap: 860
    });

    // ── Scuola Primaria (1ª – 5ª) ──
    makeText(this, w / 2, 152, 'Scuola Primaria (dalla 1ª alla 5ª)', cfg, {
      size: 18,
      bold: true,
      color: '#2f3b4c'
    });
    const primaria = ANNI_SCOLASTICI.filter((a) => a.ciclo === 'primaria');
    primaria.forEach((anno, i) => {
      const x = 136 + i * 188;
      const b = makeButton(this, cfg, x, 204, anno.label, { scale: 0.54, depth: 10 });
      if (anno.id === attivo.id) b.setKind('correct');
      b.onTap(() => {
        saveSettings({ ...impostazioni, schoolYear: anno.id });
        this.scene.restart();
      });
    });

    // ── Scuola Secondaria di primo grado (1ª – 3ª) ──
    makeText(this, w / 2, 274, 'Scuola Secondaria di primo grado (dalla 1ª alla 3ª)', cfg, {
      size: 18,
      bold: true,
      color: '#2f3b4c'
    });
    const secondaria = ANNI_SCOLASTICI.filter((a) => a.ciclo === 'secondaria');
    secondaria.forEach((anno, i) => {
      const x = 256 + i * 256;
      const b = makeButton(this, cfg, x, 326, anno.label, { scale: 0.68, depth: 10 });
      if (anno.id === attivo.id) b.setKind('correct');
      b.onTap(() => {
        saveSettings({ ...impostazioni, schoolYear: anno.id });
        this.scene.restart();
      });
    });

    // ── Estrazione casuale delle domande ──
    const casuali = impostazioni.randomQuestions !== false;
    makeToggle(
      this,
      cfg,
      w / 2,
      418,
      540,
      'Domande casuali ad ogni partita (consigliato)',
      casuali,
      () => {
        const s = loadSettings();
        saveSettings({ ...s, randomQuestions: !(s.randomQuestions !== false) });
        this.scene.restart();
      }
    );

    const indietro = makeButton(this, cfg, 512, 505, 'Torna ai profili', {
      scale: 0.62,
      depth: 10
    });
    indietro.onTap(() => {
      pagina = 'profili';
      this.scene.restart();
    });
  }

  private creaRegole(cfg: ReturnType<typeof resolveConfig>, w: number): void {
    makeText(this, w / 2, 42, 'Regole una per una', cfg, {
      size: 30,
      bold: true,
      color: '#1d6fb8',
      outline: true
    });
    makeText(this, w / 2, 78, 'Tocca una regola per accenderla o spegnerla. Il profilo scelto resta.', cfg, {
      size: 14,
      color: '#5f7186'
    });

    const voci = REGOLE_UI.map((id) => RULE_BY_ID.get(id)).filter(
      (r): r is NonNullable<typeof r> => Boolean(r)
    );

    voci.forEach((regola, i) => {
      const colonna = i < 11 ? 0 : 1;
      const riga = i % 11;
      makeToggle(
        this,
        cfg,
        colonna === 0 ? 268 : 756,
        116 + riga * 35,
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
