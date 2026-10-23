/**
 * Libreria di icone PROCEDURALI (Canvas 2D, nessun asset binario).
 * Le prove di "riconoscimento immagine" usano l'id dell'icona.
 * Ogni pittura usa coordinate in uno spazio 0..S (S = dimensione).
 */

export type Painter = (ctx: CanvasRenderingContext2D, S: number) => void;

// ── helper ─────────────────────────────────────────────────────────
function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string): void {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}
function ellipse(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, fill: string): void {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string): void {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}
function poly(ctx: CanvasRenderingContext2D, pts: [number, number][], fill: string): void {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fill();
}
function line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, w: number, stroke: string): void {
  ctx.strokeStyle = stroke;
  ctx.lineWidth = w;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
function eye(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  circle(ctx, x, y, r, '#ffffff');
  circle(ctx, x + r * 0.2, y + r * 0.1, r * 0.5, '#1a1c2c');
  circle(ctx, x + r * 0.05, y - r * 0.15, r * 0.18, '#ffffff');
}


import { PAINTERS } from './icons-painters';

export const ICON_PAINTERS: Record<string, Painter> = { ...PAINTERS };
export const ICON_IDS: string[] = Object.keys(ICON_PAINTERS).sort();
