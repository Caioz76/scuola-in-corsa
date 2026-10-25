import Phaser from 'phaser';
import { drawSportChannelFrame, makeButton, makeText, makeToggle } from '../challenges/ui';
import {
  ANNI_SCOLASTICI,
  ANNO_BY_ID,
  normalizzaAnno,
  resolveConfig,
  type AnnoScolastico,
  type BesSettings
} from '../bes/resolver';
import { BES_PROFILES } from '../bes/profiles';
import { RULE_BY_ID } from '../bes/rules';
import { loadSettings, saveSettings } from '../core/settings';
import { addWorld } from '../art/world';
import { synth } from '../audio/synth';

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

export type NodoImpostazioni =
  | 'radice'
  | 'bes'
  | 'bes-custom'
  | 'anno'
  | 'anno-primaria'
  | 'anno-secondaria'
  | 'gioco';

let nodoCorrente: NodoImpostazioni = 'radice';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super('Settings');
  }

  create(): void {
    const impostazioni = loadSettings();
    const cfg = resolveConfig(impostazioni);
    const w = this.scale.gameSize.width;

    document.body.dataset.settingsPage = nodoCorrente;
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      delete document.body.dataset.settingsPage;
    });

    addWorld(this, 'scuola', cfg, { pico: false, speed: 20 });
    drawSportChannelFrame(this, cfg, { x: 24, y: 8, w: 976, h: 536, headerH: 86 });

    if (nodoCorrente === 'bes') {
      this.creaBes(impostazioni, cfg, w);
      return;
    }
    if (nodoCorrente === 'bes-custom') {
      this.creaBesCustom(cfg, w);
      return;
    }
    if (nodoCorrente === 'anno') {
      this.creaSceltaGrado(impostazioni, cfg, w);
      return;
    }
    if (nodoCorrente === 'anno-primaria') {
      this.creaClassePrimaria(impostazioni, cfg, w);
      return;
    }
    if (nodoCorrente === 'anno-secondaria') {
      this.creaClasseSecondaria(impostazioni, cfg, w);
      return;
    }
    if (nodoCorrente === 'gioco') {
      this.creaGioco(impostazioni, cfg, w);
      return;
    }

    this.creaMenuRadice(impostazioni, cfg, w);
  }

  // ── 1. NODO RADICE (Menu principale ad albero) ─────────────────────
  private creaMenuRadice(
    impostazioni: BesSettings,
    cfg: ReturnType<typeof resolveConfig>,
    w: number
  ): void {
    makeText(this, w / 2, 28, 'Menu Impostazioni', cfg, {
      size: 26,
      bold: true,
      color: '#ffffff',
      wrap: 480,
      maxH: 30,
      outline: true
    });

    makeText(this, w / 2, 58, 'Seleziona una categoria da personalizzare ad albero:', cfg, {
      size: 14,
      bold: true,
      color: '#e6f4fc',
      wrap: 620,
      maxH: 22
    });

    const scelto = BES_PROFILES.find((p) => p.id === impostazioni.profileId);
    const infoAnno = ANNO_BY_ID.get(normalizzaAnno(impostazioni.schoolYear))!;
    const graficaTxt = impostazioni.graphics === '3d' ? '3D' : '2D';

    // ── Ramo 1: BES ──
    const btnBes = makeButton(
      this,
      cfg,
      w / 2,
      142,
      `Bisogni Educativi Speciali (BES)`,
      { scale: 0.95, maxTargetScale: 1.02, depth: 10 }
    );
    btnBes.setKind(scelto ? 'selected' : 'unselected');
    btnBes.onTap(() => {
      nodoCorrente = 'bes';
      this.scene.restart();
    });

    makeText(
      this,
      w / 2,
      188,
      `Profilo attivo: ${scelto ? scelto.label : 'Standard (Nessun profilo)'} · Personalizza profili e caratteristiche`,
      cfg,
      { size: 12.5, color: '#3b5168', wrap: 720, maxH: 20 }
    );

    // ── Ramo 2: Anno Scolastico ──
    const btnAnno = makeButton(
      this,
      cfg,
      w / 2,
      252,
      `Anno Scolastico & Difficoltà`,
      { scale: 0.95, maxTargetScale: 1.02, depth: 10 }
    );
    btnAnno.setKind('unselected');
    btnAnno.onTap(() => {
      nodoCorrente = 'anno';
      this.scene.restart();
    });

    makeText(
      this,
      w / 2,
      298,
      `Classe attiva: ${infoAnno.label} (Difficoltà ${infoAnno.difficulty}/3) · Scegli tra Primaria e Secondaria`,
      cfg,
      { size: 12.5, color: '#3b5168', wrap: 720, maxH: 20 }
    );

    // ── Ramo 3: Gioco & Grafica ──
    const btnGioco = makeButton(
      this,
      cfg,
      w / 2,
      362,
      `Gioco & Grafica`,
      { scale: 0.95, maxTargetScale: 1.02, depth: 10 }
    );
    btnGioco.setKind('unselected');
    btnGioco.onTap(() => {
      nodoCorrente = 'gioco';
      this.scene.restart();
    });

    makeText(
      this,
      w / 2,
      408,
      `Stato attuale: Grafica ${graficaTxt} · ${synth.muted ? '🔇 Muto' : '🔊 Audio ON'} · Domande ${impostazioni.randomQuestions !== false ? 'Casuali' : 'Fisse'}`,
      cfg,
      { size: 12.5, color: '#3b5168', wrap: 720, maxH: 20 }
    );

    // ── Torna al titolo ──
    const btnTitolo = makeButton(this, cfg, w / 2, 490, 'Torna al titolo', {
      scale: 0.72,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTitolo.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.start('Title');
    });
  }

  // ── 2. RAMO BES (Profili guidati & Caratteristiche) ─────────────────
  private creaBes(
    impostazioni: BesSettings,
    cfg: ReturnType<typeof resolveConfig>,
    w: number
  ): void {
    const btnIndietro = makeButton(this, cfg, 148, 36, 'Torna al menu', {
      scale: 0.52,
      maxTargetScale: 1.03,
      depth: 10
    });
    btnIndietro.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.restart();
    });

    makeText(this, w / 2, 28, 'Profili BES', cfg, {
      size: 24,
      bold: true,
      color: '#ffffff',
      wrap: 420,
      maxH: 28,
      outline: true
    });

    makeText(this, w / 2, 58, 'Seleziona un profilo guidato o personalizza le caratteristiche:', cfg, {
      size: 13,
      bold: true,
      color: '#e6f4fc',
      wrap: 620,
      maxH: 20
    });

    // Tasto Caratteristiche Custom
    const btnCustom = makeButton(
      this,
      cfg,
      w / 2,
      100,
      'Personalizza Caratteristiche (Custom)',
      { scale: 0.76, maxTargetScale: 1.02, depth: 10 }
    );
    btnCustom.setKind('correct');
    btnCustom.onTap(() => {
      nodoCorrente = 'bes-custom';
      this.scene.restart();
    });

    // 9 Profili BES in griglia 3x3
    const xs = [200, 512, 824];
    const ys = [164, 238, 312];
    BES_PROFILES.forEach((p, i) => {
      const b = makeButton(this, cfg, xs[i % 3], ys[Math.floor(i / 3)], p.label, {
        scale: 0.78,
        maxTargetScale: 1.0,
        depth: 10
      });
      const isSel = p.id === impostazioni.profileId;
      b.setKind(isSel ? 'selected' : 'unselected');
      b.onTap(() => {
        saveSettings({ ...impostazioni, profileId: p.id, overrides: {} });
        this.scene.restart();
      });
    });

    // Tasto Nessun Profilo (Standard)
    const btnStandard = makeButton(this, cfg, w / 2, 386, 'Nessun profilo (Standard)', {
      scale: 0.7,
      maxTargetScale: 1.02,
      depth: 10
    });
    btnStandard.setKind(impostazioni.profileId === null ? 'selected' : 'unselected');
    btnStandard.onTap(() => {
      saveSettings({ ...impostazioni, profileId: null, overrides: {} });
      this.scene.restart();
    });

    const scelto = BES_PROFILES.find((p) => p.id === impostazioni.profileId);
    makeText(
      this,
      w / 2,
      436,
      scelto ? scelto.description : 'Regole standard per tutti i bambini.',
      cfg,
      { size: 13, color: scelto ? '#1b7440' : '#496682', wrap: 840, maxH: 22 }
    );

    const btnTornaMenu = makeButton(this, cfg, 380, 492, 'Torna ai profili', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTornaMenu.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.restart();
    });

    const btnTitolo = makeButton(this, cfg, 644, 492, 'Torna al titolo', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTitolo.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.start('Title');
    });
  }

  // ── 3. SOTTO-RAMO CARATTERISTICHE BES (Custom) ──────────────────────
  private creaBesCustom(cfg: ReturnType<typeof resolveConfig>, w: number): void {
    const btnIndietro = makeButton(this, cfg, 148, 36, 'Torna ai profili', {
      scale: 0.52,
      maxTargetScale: 1.03,
      depth: 10
    });
    btnIndietro.onTap(() => {
      nodoCorrente = 'bes';
      this.scene.restart();
    });

    makeText(this, w / 2, 28, 'Caratteristiche BES (Custom)', cfg, {
      size: 24,
      bold: true,
      color: '#ffffff',
      wrap: 520,
      maxH: 28,
      outline: true
    });

    makeText(this, w / 2, 58, 'Attiva o disattiva le singole facilitazioni per il bambino:', cfg, {
      size: 13,
      bold: true,
      color: '#e6f4fc',
      wrap: 620,
      maxH: 20
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
        100 + riga * 34,
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

    const btnTornaProfili = makeButton(this, cfg, 380, 506, 'Torna ai profili', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTornaProfili.onTap(() => {
      nodoCorrente = 'bes';
      this.scene.restart();
    });

    const btnTitolo = makeButton(this, cfg, 644, 506, 'Torna al titolo', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTitolo.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.start('Title');
    });
  }

  // ── 4. RAMO ANNO SCOLASTICO (Scelta Grado) ─────────────────────────
  private creaSceltaGrado(
    impostazioni: BesSettings,
    cfg: ReturnType<typeof resolveConfig>,
    w: number
  ): void {
    const btnIndietro = makeButton(this, cfg, 148, 36, 'Torna al menu', {
      scale: 0.52,
      maxTargetScale: 1.03,
      depth: 10
    });
    btnIndietro.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.restart();
    });

    makeText(this, w / 2, 28, 'Anno Scolastico', cfg, {
      size: 24,
      bold: true,
      color: '#ffffff',
      wrap: 420,
      maxH: 28,
      outline: true
    });

    const infoAnno = ANNO_BY_ID.get(normalizzaAnno(impostazioni.schoolYear))!;
    makeText(
      this,
      w / 2,
      58,
      `Classe attuale: ${infoAnno.label} (Difficoltà ${infoAnno.difficulty}/3) · Scegli il grado scolastico:`,
      cfg,
      { size: 13, bold: true, color: '#e6f4fc', wrap: 620, maxH: 20 }
    );

    // ── Ramo Primaria ──
    const btnPrimaria = makeButton(
      this,
      cfg,
      w / 2,
      176,
      'Scuola Primaria (Elementare)',
      { scale: 0.95, maxTargetScale: 1.02, depth: 10 }
    );
    btnPrimaria.setKind(infoAnno.ciclo === 'primaria' ? 'selected' : 'unselected');
    btnPrimaria.onTap(() => {
      nodoCorrente = 'anno-primaria';
      this.scene.restart();
    });

    makeText(
      this,
      w / 2,
      222,
      'Dalla 1ª alla 5ª Primaria · Esercizi graduati per bambini dai 6 ai 10 anni',
      cfg,
      { size: 13, color: '#3b5168', wrap: 720, maxH: 20 }
    );

    // ── Ramo Secondaria ──
    const btnSecondaria = makeButton(
      this,
      cfg,
      w / 2,
      304,
      'Scuola Secondaria di 1° Grado (Media)',
      { scale: 0.95, maxTargetScale: 1.02, depth: 10 }
    );
    btnSecondaria.setKind(infoAnno.ciclo === 'secondaria' ? 'selected' : 'unselected');
    btnSecondaria.onTap(() => {
      nodoCorrente = 'anno-secondaria';
      this.scene.restart();
    });

    makeText(
      this,
      w / 2,
      350,
      'Dalla 1ª alla 3ª Secondaria · Quesiti logici e di comprensione per ragazzi dagli 11 ai 14 anni',
      cfg,
      { size: 13, color: '#3b5168', wrap: 720, maxH: 20 }
    );

    // ── Bottom Nav ──
    const btnTornaMenu = makeButton(this, cfg, 380, 488, 'Torna ai profili', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTornaMenu.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.restart();
    });

    const btnTitolo = makeButton(this, cfg, 644, 488, 'Torna al titolo', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTitolo.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.start('Title');
    });
  }

  // ── 5. SOTTO-RAMO PRIMARIA (1ª – 5ª) ────────────────────────────────
  private creaClassePrimaria(
    impostazioni: BesSettings,
    cfg: ReturnType<typeof resolveConfig>,
    w: number
  ): void {
    const btnIndietro = makeButton(this, cfg, 148, 36, 'Torna ai gradi', {
      scale: 0.52,
      maxTargetScale: 1.03,
      depth: 10
    });
    btnIndietro.onTap(() => {
      nodoCorrente = 'anno';
      this.scene.restart();
    });

    makeText(this, w / 2, 28, 'Scuola Primaria', cfg, {
      size: 24,
      bold: true,
      color: '#ffffff',
      wrap: 420,
      maxH: 28,
      outline: true
    });

    makeText(this, w / 2, 58, 'Seleziona l\'anno di riferimento della Scuola Primaria:', cfg, {
      size: 13,
      bold: true,
      color: '#e6f4fc',
      wrap: 620,
      maxH: 20
    });

    const attivoId = normalizzaAnno(impostazioni.schoolYear);
    const primaria = ANNI_SCOLASTICI.filter((a) => a.ciclo === 'primaria');

    primaria.forEach((anno, i) => {
      const y = 130 + i * 62;
      const b = makeButton(this, cfg, w / 2, y, anno.label, {
        scale: 0.74,
        maxTargetScale: 1.02,
        depth: 10
      });
      const isSel = anno.id === attivoId;
      b.setKind(isSel ? 'selected' : 'unselected');
      b.onTap(() => {
        saveSettings({ ...impostazioni, schoolYear: anno.id as AnnoScolastico });
        this.scene.restart();
      });
    });

    const btnTorna = makeButton(this, cfg, 380, 488, 'Torna ai profili', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTorna.onTap(() => {
      nodoCorrente = 'anno';
      this.scene.restart();
    });

    const btnTitolo = makeButton(this, cfg, 644, 488, 'Torna al titolo', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTitolo.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.start('Title');
    });
  }

  // ── 6. SOTTO-RAMO SECONDARIA (1ª – 3ª) ──────────────────────────────
  private creaClasseSecondaria(
    impostazioni: BesSettings,
    cfg: ReturnType<typeof resolveConfig>,
    w: number
  ): void {
    const btnIndietro = makeButton(this, cfg, 148, 36, 'Torna ai gradi', {
      scale: 0.52,
      maxTargetScale: 1.03,
      depth: 10
    });
    btnIndietro.onTap(() => {
      nodoCorrente = 'anno';
      this.scene.restart();
    });

    makeText(this, w / 2, 28, 'Scuola Secondaria I Grado', cfg, {
      size: 24,
      bold: true,
      color: '#ffffff',
      wrap: 520,
      maxH: 28,
      outline: true
    });

    makeText(this, w / 2, 58, 'Seleziona l\'anno di riferimento della Scuola Secondaria di 1° grado:', cfg, {
      size: 13,
      bold: true,
      color: '#e6f4fc',
      wrap: 620,
      maxH: 20
    });

    const attivoId = normalizzaAnno(impostazioni.schoolYear);
    const secondaria = ANNI_SCOLASTICI.filter((a) => a.ciclo === 'secondaria');

    secondaria.forEach((anno, i) => {
      const y = 160 + i * 82;
      const b = makeButton(this, cfg, w / 2, y, anno.label, {
        scale: 0.88,
        maxTargetScale: 1.02,
        depth: 10
      });
      const isSel = anno.id === attivoId;
      b.setKind(isSel ? 'selected' : 'unselected');
      b.onTap(() => {
        saveSettings({ ...impostazioni, schoolYear: anno.id as AnnoScolastico });
        this.scene.restart();
      });
    });

    const btnTorna = makeButton(this, cfg, 380, 488, 'Torna ai profili', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTorna.onTap(() => {
      nodoCorrente = 'anno';
      this.scene.restart();
    });

    const btnTitolo = makeButton(this, cfg, 644, 488, 'Torna al titolo', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTitolo.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.start('Title');
    });
  }

  // ── 7. RAMO GIOCO & GRAFICA ────────────────────────────────────────
  private creaGioco(
    impostazioni: BesSettings,
    cfg: ReturnType<typeof resolveConfig>,
    w: number
  ): void {
    const btnIndietro = makeButton(this, cfg, 148, 36, 'Torna al menu', {
      scale: 0.52,
      maxTargetScale: 1.03,
      depth: 10
    });
    btnIndietro.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.restart();
    });

    makeText(this, w / 2, 28, 'Gioco & Grafica', cfg, {
      size: 24,
      bold: true,
      color: '#ffffff',
      wrap: 420,
      maxH: 28,
      outline: true
    });

    makeText(this, w / 2, 58, 'Personalizza grafica 2D/3D, domande e audio:', cfg, {
      size: 13,
      bold: true,
      color: '#e6f4fc',
      wrap: 620,
      maxH: 20
    });

    // ── Grafica: 2D vs 3D ──
    const grafica = impostazioni.graphics ?? '2d';
    makeText(this, 260, 140, 'Grafica di gioco:', cfg, {
      size: 16,
      bold: true,
      color: '#2f3b4c',
      wrap: 180,
      maxH: 24
    });
    (
      [
        ['2d', '2D (Classica)', 452],
        ['3d', '3D (Tre Dimensioni)', 676]
      ] as const
    ).forEach(([id, label, x]) => {
      const b = makeButton(this, cfg, x, 140, label, {
        scale: 0.54,
        maxTargetScale: 1.02,
        depth: 10
      });
      b.setKind(grafica === id ? 'selected' : 'unselected');
      b.onTap(() => {
        if (grafica === id) return;
        saveSettings({ ...impostazioni, graphics: id });
        this.scene.restart();
      });
    });

    makeText(
      this,
      w / 2,
      188,
      grafica === '3d'
        ? 'Modalità 3D attiva: scenario poligonale interattivo con mascotte 3D.'
        : 'Modalità 2D attiva: grafica illustrata pulita, rapida e a basso consumo.',
      cfg,
      { size: 12.5, color: '#3b5168', wrap: 720, maxH: 20 }
    );

    // ── Domande casuali ──
    const casuali = impostazioni.randomQuestions !== false;
    makeToggle(
      this,
      cfg,
      w / 2,
      260,
      560,
      'Domande casuali ad ogni partita (consigliato)',
      casuali,
      () => {
        const s = loadSettings();
        saveSettings({ ...s, randomQuestions: !(s.randomQuestions !== false) });
        this.scene.restart();
      }
    );

    // ── Audio ON / OFF ──
    makeText(this, 320, 348, 'Audio di gioco:', cfg, {
      size: 16,
      bold: true,
      color: '#2f3b4c',
      wrap: 160,
      maxH: 24
    });
    const btnAudio = makeButton(
      this,
      cfg,
      540,
      348,
      synth.muted ? '🔇 Audio OFF' : '🔊 Audio ON',
      { scale: 0.56, maxTargetScale: 1.02, depth: 10 }
    );
    btnAudio.setKind(synth.muted ? 'disabled' : 'correct');
    btnAudio.onTap(() => {
      const muto = synth.toggleMute();
      btnAudio.setLabel(muto ? '🔇 Audio OFF' : '🔊 Audio ON');
      btnAudio.setKind(muto ? 'disabled' : 'correct');
    });

    // ── Bottom Nav ──
    const btnTornaMenu = makeButton(this, cfg, 380, 488, 'Torna ai profili', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTornaMenu.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.restart();
    });

    const btnTitolo = makeButton(this, cfg, 644, 488, 'Torna al titolo', {
      scale: 0.62,
      maxTargetScale: 1.04,
      depth: 10
    });
    btnTitolo.onTap(() => {
      nodoCorrente = 'radice';
      this.scene.start('Title');
    });
  }
}
