/**
 * Sfondi parallax per materia: cielo + sole + decorazioni a tema (far)
 * e colline (mid). Larghezza 2048 = 2× lo schermo, cicli sinusoidali interi
 * → tileabile senza cuciture.
 */
import type Phaser from 'phaser';

type Ctx = CanvasRenderingContext2D;

export const SUBJECTS = ['matematica', 'italiano', 'scienze', 'storia'] as const;
export type SubjectId = (typeof SUBJECTS)[number];

/** Tema neutro per titolo e scelta materia (fuori dalle 4 materie). */
export type ThemeKey = SubjectId | 'scuola';

const W = 2048;
const H = 576;

interface Theme {
  farTop: string; farBottom: string; sun: string;
  hill1: string; hill2: string;
}

const THEMES: Record<ThemeKey, Theme> = {
  scuola:     { farTop: '#bae6ff', farBottom: '#eef9ff', sun: '#ffe885', hill1: '#95e68a', hill2: '#6ad162' },
  matematica: { farTop: '#bae6ff', farBottom: '#eef9ff', sun: '#ffe885', hill1: '#95e68a', hill2: '#6ad162' },
  italiano:   { farTop: '#ffecd2', farBottom: '#fffaf0', sun: '#ffd485', hill1: '#f5cfa8', hill2: '#e6ae82' },
  scienze:    { farTop: '#c4f5e2', farBottom: '#f2fff9', sun: '#ffeb99', hill1: '#9ce8bc', hill2: '#6fd49b' },
  storia:     { farTop: '#faebd4', farBottom: '#fffcf5', sun: '#ffe08c', hill1: '#e6cfa8', hill2: '#cfb284' }
};

/**
 * Adatta i colori dello sfondo della pagina (body e finestra intera) al tema attivo,
 * così in modalità orizzontale la finestra è usata al 100% e lo sfondo prosegue senza tagli.
 */
export function applyPageTheme(themeKey: ThemeKey, highContrast = false): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (highContrast) {
    root.style.setProperty('--bg-sky-top', '#f8fafc');
    root.style.setProperty('--bg-sky-bottom', '#e2e8f0');
    root.style.setProperty('--bg-hill', '#cbd5e1');
    root.style.setProperty('--bg-ground', '#94a3b8');
    root.style.setProperty('--bg-ground-deep', '#64748b');
    return;
  }
  const t = THEMES[themeKey] ?? THEMES.scuola;
  root.style.setProperty('--bg-sky-top', t.farTop);
  root.style.setProperty('--bg-sky-bottom', t.farBottom);
  root.style.setProperty('--bg-hill', t.hill2);
  root.style.setProperty('--bg-ground', '#6ee268');
  root.style.setProperty('--bg-ground-deep', '#58cc52');
}

function cloud(ctx: Ctx, x: number, y: number, s: number): void {
  // Ombra inferiore morbida della nuvola
  ctx.fillStyle = 'rgba(180,215,245,0.42)';
  ctx.beginPath();
  ctx.roundRect(x - 52 * s, y + 4 * s, 104 * s, 22 * s, 11 * s);
  ctx.fill();

  // Corpo soffice della nuvola
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.beginPath();
  ctx.arc(x - 36 * s, y + 7 * s, 18 * s, 0, Math.PI * 2);
  ctx.arc(x - 14 * s, y - 2 * s, 23 * s, 0, Math.PI * 2);
  ctx.arc(x + 12 * s, y, 25 * s, 0, Math.PI * 2);
  ctx.arc(x + 36 * s, y + 8 * s, 17 * s, 0, Math.PI * 2);
  ctx.roundRect(x - 48 * s, y + 5 * s, 96 * s, 19 * s, 9 * s);
  ctx.fill();

  // Riflesso luminoso superiore
  ctx.fillStyle = 'rgba(255,255,255,0.98)';
  ctx.beginPath();
  ctx.arc(x - 14 * s, y - 5 * s, 16 * s, 0, Math.PI * 2);
  ctx.arc(x + 11 * s, y - 4 * s, 18 * s, 0, Math.PI * 2);
  ctx.fill();
}

function sky(ctx: Ctx, t: Theme): void {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, t.farTop);
  g.addColorStop(0.65, t.farBottom);
  g.addColorStop(1, '#ffffff');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Sole radioso con aloni caldi stratificati
  const sx = 1720;
  const sy = 114;
  ctx.fillStyle = 'rgba(255,244,196,0.34)';
  ctx.beginPath(); ctx.arc(sx, sy, 128, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,235,168,0.48)';
  ctx.beginPath(); ctx.arc(sx, sy, 92, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = t.sun;
  ctx.beginPath(); ctx.arc(sx, sy, 62, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff9de';
  ctx.beginPath(); ctx.arc(sx - 12, sy - 12, 38, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.beginPath(); ctx.arc(sx - 20, sy - 20, 13, 0, Math.PI * 2); ctx.fill();

  // Nuvole morbide distribuite lungo tutta la fascia
  cloud(ctx, 190, 96, 0.95);
  cloud(ctx, 520, 132, 0.72);
  cloud(ctx, 880, 78, 1.05);
  cloud(ctx, 1240, 128, 0.82);
  cloud(ctx, 1510, 86, 0.76);
  cloud(ctx, 1910, 118, 0.88);
}

function hillBand(
  ctx: Ctx,
  colorTop: string,
  colorBottom: string,
  crestColor: string,
  base: number,
  amp: number,
  cycles: number,
  phase = 0
): void {
  const g = ctx.createLinearGradient(0, base - amp, 0, H);
  g.addColorStop(0, colorTop);
  g.addColorStop(1, colorBottom);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, base);
  for (let x = 0; x <= W; x += 16) {
    const y = base - (Math.sin((x / W) * Math.PI * 2 * cycles + phase) * 0.5 + 0.5) * amp;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fill();

  // Profilo luminoso morbido sulla cresta della collina
  ctx.strokeStyle = crestColor;
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let x = 0; x <= W; x += 16) {
    const y = base - (Math.sin((x / W) * Math.PI * 2 * cycles + phase) * 0.5 + 0.5) * amp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function tree(ctx: Ctx, x: number, y: number, s: number, foliage: string, highlight: string): void {
  // Tronco
  ctx.fillStyle = '#9c7a54';
  ctx.beginPath();
  ctx.roundRect(x - 4 * s, y - 6 * s, 8 * s, 24 * s, 3 * s);
  ctx.fill();
  // Chioma morbida a 3 sfere
  ctx.fillStyle = foliage;
  ctx.beginPath();
  ctx.arc(x - 11 * s, y - 10 * s, 13 * s, 0, Math.PI * 2);
  ctx.arc(x + 11 * s, y - 10 * s, 13 * s, 0, Math.PI * 2);
  ctx.arc(x, y - 22 * s, 16 * s, 0, Math.PI * 2);
  ctx.fill();
  // Riflesso chioma
  ctx.fillStyle = highlight;
  ctx.beginPath();
  ctx.arc(x - 4 * s, y - 25 * s, 9 * s, 0, Math.PI * 2);
  ctx.arc(x - 12 * s, y - 13 * s, 6 * s, 0, Math.PI * 2);
  ctx.fill();
}

function schoolBuilding(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Ombra a terra
  ctx.fillStyle = 'rgba(59,74,90,0.12)';
  ctx.beginPath();
  ctx.ellipse(0, 42, 86, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Corpo principale della scuola (crema solare)
  ctx.fillStyle = '#fff6e0';
  ctx.beginPath();
  ctx.roundRect(-72, -18, 144, 60, 8);
  ctx.fill();
  ctx.strokeStyle = 'rgba(180,145,95,0.35)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Tetto spiovente laterale (rosso terracotta pastello)
  ctx.fillStyle = '#e87a64';
  ctx.beginPath();
  ctx.moveTo(-80, -16);
  ctx.lineTo(-56, -42);
  ctx.lineTo(56, -42);
  ctx.lineTo(80, -16);
  ctx.closePath();
  ctx.fill();

  // Avancorpo centrale con torretta dell'orologio
  ctx.fillStyle = '#fffaf0';
  ctx.beginPath();
  ctx.roundRect(-30, -36, 60, 78, 6);
  ctx.fill();
  ctx.strokeStyle = 'rgba(180,145,95,0.35)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Timpano / tetto centrale
  ctx.fillStyle = '#d96550';
  ctx.beginPath();
  ctx.moveTo(-36, -34);
  ctx.lineTo(0, -64);
  ctx.lineTo(36, -34);
  ctx.closePath();
  ctx.fill();

  // Asta e bandierina sul tetto
  ctx.strokeStyle = '#5f7186';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, -64);
  ctx.lineTo(0, -86);
  ctx.stroke();
  ctx.fillStyle = '#4aa8e8';
  ctx.beginPath();
  ctx.moveTo(0, -86);
  ctx.lineTo(22, -79);
  ctx.lineTo(0, -72);
  ctx.closePath();
  ctx.fill();

  // Orologio nel timpano
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, -22, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#66b8f2';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.strokeStyle = '#3b4a5a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(0, -28);
  ctx.moveTo(0, -22);
  ctx.lineTo(5, -22);
  ctx.stroke();

  // Portone d'ingresso ad arco
  ctx.fillStyle = '#c97b42';
  ctx.beginPath();
  ctx.roundRect(-12, 12, 24, 30, [12, 12, 0, 0]);
  ctx.fill();
  ctx.fillStyle = '#f5d08a';
  ctx.beginPath();
  ctx.arc(5, 28, 2.2, 0, Math.PI * 2);
  ctx.fill();

  // Finestre luminose laterali
  ctx.fillStyle = '#bce3ff';
  for (const wx of [-54, -38, 38, 54]) {
    ctx.beginPath();
    ctx.roundRect(wx - 6, -4, 12, 18, 4);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.fillRect(wx - 4, -2, 4, 14);
    ctx.fillStyle = '#bce3ff';
  }

  ctx.restore();
}

function wuhuLighthouse(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Promontorio roccioso/erboso di Isola dell Atleta
  ctx.fillStyle = '#7cd973';
  ctx.beginPath();
  ctx.ellipse(0, 38, 62, 18, 0, Math.PI, 0);
  ctx.fill();

  // Torre del faro (bianca con fasce rosse stile Isola dell Atleta)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-14, 24);
  ctx.lineTo(-10, -48);
  ctx.lineTo(10, -48);
  ctx.lineTo(14, 24);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,120,184,0.28)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Fasce rosse del faro
  ctx.fillStyle = '#ef5b4c';
  ctx.fillRect(-11.5, -26, 23, 12);
  ctx.fillRect(-13, 0, 26, 12);

  // Lanterna vetrata e cupola rossa
  ctx.fillStyle = '#bfeaff';
  ctx.fillRect(-8, -58, 16, 10);
  ctx.fillStyle = '#e04838';
  ctx.beginPath();
  ctx.arc(0, -58, 11, Math.PI, 0);
  ctx.fill();
  ctx.strokeStyle = '#e04838';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, -69);
  ctx.lineTo(0, -78);
  ctx.stroke();

  ctx.restore();
}

function stadiumArch(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Grande arco bianco aerodinamico dello Stadio Sport sullo sfondo
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 44, 108, Math.PI * 1.12, Math.PI * 1.88);
  ctx.stroke();

  ctx.strokeStyle = '#38b6ff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 44, 98, Math.PI * 1.14, Math.PI * 1.86);
  ctx.stroke();

  // Tiranti obliqui dello stadio
  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth = 2;
  for (const dx of [-70, -35, 0, 35, 70]) {
    ctx.beginPath();
    ctx.moveTo(dx, 30);
    ctx.lineTo(dx * 0.85, -38 + Math.abs(dx) * 0.25);
    ctx.stroke();
  }

  ctx.restore();
}

function hills(ctx: Ctx, t: Theme, s: ThemeKey): void {
  // Grande arco dello stadio Sport e faro di Isola dell Atleta dietro la prima collina
  stadiumArch(ctx, 520, 326, 0.95);
  stadiumArch(ctx, 1544, 326, 0.95);
  wuhuLighthouse(ctx, 880, 292, 0.85);
  wuhuLighthouse(ctx, 1904, 292, 0.85);

  hillBand(ctx, t.hill1, t.hill2, 'rgba(255,255,255,0.58)', 410, 110, 6, 0);

  if (s === 'scuola') {
    schoolBuilding(ctx, 210, 350, 0.92);
    schoolBuilding(ctx, 1234, 350, 0.92);
  }

  hillBand(ctx, t.hill2, t.hill1, 'rgba(255,255,255,0.45)', 480, 80, 9, 0);

  // Alberelli morbidi lungo le colline per dare profondità al parallasse
  const treeFoliage = s === 'italiano' ? '#e89973' : s === 'storia' ? '#bfa37a' : '#4ecf58';
  const treeLight = s === 'italiano' ? '#ffd0b0' : s === 'storia' ? '#e5d1b0' : '#98f59e';
  const positions: [number, number, number][] = [
    [96, 442, 0.85],
    [340, 418, 1.0],
    [620, 448, 0.78],
    [840, 424, 0.95],
    [1110, 442, 0.85],
    [1364, 418, 1.0],
    [1644, 448, 0.78],
    [1864, 424, 0.95]
  ];
  for (const [tx, ty, ts] of positions) {
    tree(ctx, tx, ty, ts, treeFoliage, treeLight);
  }
}

// ── Decorazioni a tema (alpha bassa, "acquaforte" sullo sfondo) ─────────

function symbol(ctx: Ctx, ch: string, x: number, y: number, size: number): void {
  ctx.fillStyle = 'rgba(70,120,160,0.20)';
  ctx.font = `bold ${size}px Verdana, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(ch, x, y);
}

function atom(ctx: Ctx, x: number, y: number, r: number): void {
  ctx.strokeStyle = 'rgba(70,120,160,0.20)';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0.5, 0, 7); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, -0.5, 0, 7); ctx.stroke();
  ctx.fillStyle = 'rgba(70,120,160,0.28)';
  ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill();
}

function leaf(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.fillStyle = 'rgba(70,120,160,0.18)';
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.5);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(18 * s, -16 * s, 34 * s, 0);
  ctx.quadraticCurveTo(18 * s, 16 * s, 0, 0);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function flask(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.strokeStyle = 'rgba(70,120,160,0.20)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 6 * s, y - 16 * s);
  ctx.lineTo(x - 6 * s, y - 4 * s);
  ctx.lineTo(x - 14 * s, y + 14 * s);
  ctx.lineTo(x + 14 * s, y + 14 * s);
  ctx.lineTo(x + 6 * s, y - 4 * s);
  ctx.lineTo(x + 6 * s, y - 16 * s);
  ctx.closePath(); ctx.stroke();
}

function column(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.fillStyle = 'rgba(70,120,160,0.18)';
  ctx.fillRect(x - 16 * s, y - 22 * s, 32 * s, 5 * s);          // capitello
  ctx.fillRect(x - 12 * s, y - 17 * s, 24 * s, 30 * s);        // fusto
  ctx.fillRect(x - 16 * s, y + 13 * s, 32 * s, 5 * s);         // base
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  for (const dx of [-7, 0, 7]) ctx.fillRect(x + dx * s - 1 * s, y - 15 * s, 2 * s, 26 * s);
}

function arch(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.strokeStyle = 'rgba(70,120,160,0.18)';
  ctx.lineWidth = 5 * s;
  ctx.beginPath();
  ctx.moveTo(x - 20 * s, y + 20 * s);
  ctx.lineTo(x - 20 * s, y);
  ctx.arc(x, y, 20 * s, Math.PI, 0);
  ctx.lineTo(x + 20 * s, y + 20 * s);
  ctx.stroke();
}

function book(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.fillStyle = 'rgba(70,120,160,0.18)';
  ctx.beginPath();
  ctx.moveTo(x, y - 12 * s);
  ctx.quadraticCurveTo(x - 14 * s, y - 16 * s, x - 24 * s, y - 10 * s);
  ctx.lineTo(x - 24 * s, y + 10 * s);
  ctx.quadraticCurveTo(x - 12 * s, y + 4 * s, x, y + 8 * s);
  ctx.quadraticCurveTo(x + 12 * s, y + 4 * s, x + 24 * s, y + 10 * s);
  ctx.lineTo(x + 24 * s, y - 10 * s);
  ctx.quadraticCurveTo(x + 14 * s, y - 16 * s, x, y - 12 * s);
  ctx.closePath(); ctx.fill();
}

function decorations(ctx: Ctx, s: ThemeKey): void {
  if (s === 'matematica') {
    const syms: [string, number, number, number][] = [
      ['+', 260, 220, 40], ['÷', 520, 150, 34], ['×', 760, 250, 38],
      ['=', 1100, 180, 40], ['7', 1350, 260, 36], ['3', 1560, 210, 32],
      ['√', 880, 300, 34], ['π', 1240, 320, 38], ['−', 430, 320, 34], ['9', 1000, 130, 30]
    ];
    for (const [ch, x, y, sz] of syms) symbol(ctx, ch, x, y, sz);
  } else if (s === 'italiano') {
    const ls: [string, number, number, number][] = [
      ['A', 300, 200, 44], ['b', 560, 260, 40], ['C', 820, 160, 42],
      ['D', 1150, 240, 40], ['E', 1420, 170, 38], ['F', 1650, 260, 36]
    ];
    for (const [ch, x, y, sz] of ls) symbol(ctx, ch, x, y, sz);
    book(ctx, 700, 320, 1.2);
    book(ctx, 1300, 300, 1.0);
  } else if (s === 'scienze') {
    atom(ctx, 340, 210, 30);
    atom(ctx, 1200, 170, 26);
    leaf(ctx, 700, 250, 1.4);
    leaf(ctx, 1480, 240, 1.2);
    flask(ctx, 950, 300, 1.4);
    flask(ctx, 1600, 150, 1.1);
  } else if (s === 'storia') {
    column(ctx, 320, 230, 1.4);
    column(ctx, 1300, 210, 1.2);
    arch(ctx, 750, 220, 1.6);
    arch(ctx, 1550, 260, 1.2);
  } else {
    // scuola: libri e lettere, il cortile da cui parte la corsa
    book(ctx, 300, 250, 1.6);
    book(ctx, 1250, 230, 1.3);
    const ls: [string, number, number, number][] = [
      ['A', 640, 170, 44], ['B', 900, 250, 38], ['C', 1550, 190, 40]
    ];
    for (const [ch, x, y, sz] of ls) symbol(ctx, ch, x, y, sz);
  }
}

/** Crea gli sfondi parallax delle 4 materie + il tema neutro (2 texture ciascuna). */
export function ensureBackgrounds(scene: Phaser.Scene): void {
  const temi: ThemeKey[] = ['scuola', ...SUBJECTS];
  for (const s of temi) {
    const t = THEMES[s];
    const farKey = `bg-${s}-far`;
    if (scene.textures.exists(farKey)) scene.textures.remove(farKey);
    const cv = scene.textures.createCanvas(farKey, W, H);
    if (cv) {
      const ctx = cv.getContext();
      sky(ctx, t);
      decorations(ctx, s);
      cv.refresh();
    }
    const midKey = `bg-${s}-mid`;
    if (scene.textures.exists(midKey)) scene.textures.remove(midKey);
    const cv2 = scene.textures.createCanvas(midKey, W, H);
    if (cv2) {
      hills(cv2.getContext(), t, s);
      cv2.refresh();
    }
  }
}
