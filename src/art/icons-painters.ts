import type { Painter } from './icons';

const cane: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#b5793c';
  ctx.beginPath(); ctx.roundRect(18*u, 34*u, 60*u, 40*u, 14*u); ctx.fill();
  ctx.beginPath(); ctx.roundRect(64*u, 20*u, 26*u, 34*u, 10*u); ctx.fill();
  ctx.fillStyle = '#8a5a28';
  ctx.beginPath(); ctx.ellipse(22*u, 44*u, 8*u, 14*u, 0.3, 0, 7); ctx.fill();
  ctx.fillStyle = '#f4d7b3';
  ctx.beginPath(); ctx.ellipse(84*u, 44*u, 7*u, 6*u, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(88*u, 42*u, 2.6*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(74*u, 32*u, 3*u, 0, 7); ctx.fill();
  ctx.strokeStyle = '#8a5a28'; ctx.lineWidth = 5*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(18*u, 56*u); ctx.quadraticCurveTo(8*u, 46*u, 12*u, 36*u); ctx.stroke();
};

const gatto: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#8d99ae';
  ctx.beginPath(); ctx.arc(48*u, 54*u, 26*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(28*u, 40*u); ctx.lineTo(24*u, 14*u); ctx.lineTo(42*u, 30*u); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(68*u, 40*u); ctx.lineTo(72*u, 14*u); ctx.lineTo(54*u, 30*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(38*u, 52*u, 3.2*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(58*u, 52*u, 3.2*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#f78fb3';
  ctx.beginPath(); ctx.moveTo(48*u, 60*u); ctx.lineTo(44*u, 64*u); ctx.lineTo(52*u, 64*u); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#5c677d'; ctx.lineWidth = 2.4*u; ctx.lineCap = 'round';
  for (const [a, b, c, d] of [[24,58,8,54],[24,62,10,66],[72,58,88,54],[72,62,86,66]] as const) {
    ctx.beginPath(); ctx.moveTo(a*u, b*u); ctx.lineTo(c*u, d*u); ctx.stroke();
  }
};

const uccello: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#4dabf7';
  ctx.beginPath(); ctx.ellipse(44*u, 54*u, 26*u, 18*u, -0.2, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(70*u, 36*u, 14*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#ff9f43';
  ctx.beginPath(); ctx.moveTo(82*u, 34*u); ctx.lineTo(96*u, 38*u); ctx.lineTo(82*u, 42*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2b7fd4';
  ctx.beginPath(); ctx.ellipse(40*u, 56*u, 14*u, 8*u, -0.4, 0, 7); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(74*u, 33*u, 2.6*u, 0, 7); ctx.fill();
  ctx.strokeStyle = '#ff9f43'; ctx.lineWidth = 3*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(30*u, 70*u); ctx.lineTo(28*u, 82*u); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(40*u, 70*u); ctx.lineTo(38*u, 82*u); ctx.stroke();
};

const pesce: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ff9f43';
  ctx.beginPath(); ctx.ellipse(42*u, 48*u, 28*u, 18*u, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(66*u, 48*u); ctx.lineTo(92*u, 30*u); ctx.lineTo(86*u, 48*u); ctx.lineTo(92*u, 66*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e07b1f';
  ctx.beginPath(); ctx.ellipse(36*u, 36*u, 12*u, 6*u, -0.5, 0, 7); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(26*u, 44*u, 3.4*u, 0, 7); ctx.fill();
  ctx.strokeStyle = '#e07b1f'; ctx.lineWidth = 2.6*u;
  ctx.beginPath(); ctx.arc(46*u, 48*u, 8*u, 0.6, 2.6); ctx.stroke();
};

const leone: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#c98a2d';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.beginPath(); ctx.arc(48*u + Math.cos(a)*26*u, 48*u + Math.sin(a)*26*u, 10*u, 0, 7); ctx.fill();
  }
  ctx.fillStyle = '#e8b764';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 24*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#f4d7b3';
  ctx.beginPath(); ctx.ellipse(48*u, 56*u, 13*u, 10*u, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(40*u, 42*u, 3*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(56*u, 42*u, 3*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(48*u, 54*u, 4*u, 3*u, 0, 0, 7); ctx.fill();
};

const elefante: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#a8b6c8';
  ctx.beginPath(); ctx.arc(50*u, 46*u, 30*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(22*u, 46*u, 14*u, 20*u, 0.2, 0, 7); ctx.fill();
  ctx.strokeStyle = '#a8b6c8'; ctx.lineWidth = 10*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(50*u, 64*u); ctx.quadraticCurveTo(52*u, 84*u, 66*u, 86*u); ctx.stroke();
  ctx.fillStyle = '#7f8fa6';
  ctx.beginPath(); ctx.ellipse(20*u, 44*u, 8*u, 12*u, 0.2, 0, 7); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(40*u, 40*u, 3*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(62*u, 40*u, 3*u, 0, 7); ctx.fill();
};

const coniglio: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#e8d9c5';
  ctx.beginPath(); ctx.ellipse(38*u, 26*u, 8*u, 22*u, -0.15, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(58*u, 26*u, 8*u, 22*u, 0.15, 0, 7); ctx.fill();
  ctx.fillStyle = '#f78fb3';
  ctx.beginPath(); ctx.ellipse(38*u, 28*u, 4*u, 14*u, -0.15, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(58*u, 28*u, 4*u, 14*u, 0.15, 0, 7); ctx.fill();
  ctx.fillStyle = '#e8d9c5';
  ctx.beginPath(); ctx.arc(48*u, 58*u, 24*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(38*u, 54*u, 3*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(58*u, 54*u, 3*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#f78fb3';
  ctx.beginPath(); ctx.ellipse(48*u, 62*u, 3.4*u, 2.6*u, 0, 0, 7); ctx.fill();
};

const giraffa: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#f2c14e';
  ctx.beginPath(); ctx.moveTo(30*u, 90*u); ctx.lineTo(36*u, 30*u); ctx.lineTo(56*u, 30*u); ctx.lineTo(62*u, 90*u); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(62*u, 22*u, 12*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#b5793c';
  for (const [x, y] of [[40,44],[52,52],[38,64],[56,70],[48,82],[60,18]] as const) {
    ctx.beginPath(); ctx.arc(x*u, y*u, 4*u, 0, 7); ctx.fill();
  }
  ctx.strokeStyle = '#b5793c'; ctx.lineWidth = 3*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(58*u, 12*u); ctx.lineTo(58*u, 4*u); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(66*u, 12*u); ctx.lineTo(68*u, 4*u); ctx.stroke();
  ctx.fillStyle = '#b5793c';
  ctx.beginPath(); ctx.arc(58*u, 4*u, 2.4*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(68*u, 4*u, 2.4*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(64*u, 20*u, 2.6*u, 0, 7); ctx.fill();
};

const cavallo: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#8a5a28';
  ctx.beginPath();
  ctx.moveTo(20*u, 78*u); ctx.lineTo(24*u, 40*u); ctx.lineTo(34*u, 22*u);
  ctx.lineTo(52*u, 18*u); ctx.lineTo(78*u, 34*u); ctx.lineTo(84*u, 58*u);
  ctx.lineTo(70*u, 60*u); ctx.lineTo(66*u, 78*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#5c3a1a';
  ctx.beginPath(); ctx.moveTo(34*u, 22*u); ctx.quadraticCurveTo(20*u, 30*u, 22*u, 50*u);
  ctx.lineTo(30*u, 48*u); ctx.quadraticCurveTo(30*u, 32*u, 42*u, 24*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(64*u, 40*u, 3.2*u, 0, 7); ctx.fill();
};

const serpente: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.strokeStyle = '#58d68d'; ctx.lineWidth = 10*u; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(16*u, 74*u);
  ctx.bezierCurveTo(16*u, 40*u, 80*u, 90*u, 78*u, 52*u);
  ctx.stroke();
  ctx.fillStyle = '#58d68d';
  ctx.beginPath(); ctx.arc(78*u, 48*u, 10*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#2f9e5d';
  ctx.beginPath(); ctx.arc(74*u, 38*u, 3*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(84*u, 38*u, 3*u, 0, 7); ctx.fill();
  ctx.strokeStyle = '#ff5d5d'; ctx.lineWidth = 2.4*u;
  ctx.beginPath(); ctx.moveTo(78*u, 56*u); ctx.lineTo(78*u, 66*u); ctx.stroke();
};

const albero: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#8a5a28';
  ctx.beginPath(); ctx.roundRect(40*u, 52*u, 16*u, 38*u, 5*u); ctx.fill();
  ctx.fillStyle = '#4caf50';
  for (const [x, y, r] of [[48,30,22],[28,42,16],[68,42,16]] as const) {
    ctx.beginPath(); ctx.arc(x*u, y*u, r*u, 0, 7); ctx.fill();
  }
  ctx.fillStyle = '#ff5d5d';
  for (const [x, y] of [[40,26],[58,34],[32,44],[64,40]] as const) {
    ctx.beginPath(); ctx.arc(x*u, y*u, 2.4*u, 0, 7); ctx.fill();
  }
};

const fiore: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.strokeStyle = '#35b06f'; ctx.lineWidth = 5*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(48*u, 52*u); ctx.lineTo(48*u, 88*u); ctx.stroke();
  ctx.fillStyle = '#35b06f';
  ctx.beginPath(); ctx.ellipse(36*u, 74*u, 10*u, 5*u, -0.5, 0, 7); ctx.fill();
  ctx.fillStyle = '#f78fb3';
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath(); ctx.arc(48*u + Math.cos(a)*14*u, 34*u + Math.sin(a)*14*u, 10*u, 0, 7); ctx.fill();
  }
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.arc(48*u, 34*u, 10*u, 0, 7); ctx.fill();
};

const sole: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ffb020';
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(48*u + Math.cos(a)*24*u, 48*u + Math.sin(a)*24*u);
    ctx.lineTo(48*u + Math.cos(a - 0.18)*38*u, 48*u + Math.sin(a - 0.18)*38*u);
    ctx.lineTo(48*u + Math.cos(a + 0.18)*38*u, 48*u + Math.sin(a + 0.18)*38*u);
    ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 22*u, 0, 7); ctx.fill();
};

const luna: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 28*u, 0, 7); ctx.fill();
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath(); ctx.arc(60*u, 40*u, 24*u, 0, 7); ctx.fill();
  ctx.restore();
};

const stella: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ffd93d';
  const pts: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 34 : 14;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    pts.push([48 + Math.cos(a) * r, 48 + Math.sin(a) * r]);
  }
  ctx.beginPath(); ctx.moveTo(pts[0][0]*u, pts[0][1]*u);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0]*u, pts[i][1]*u);
  ctx.closePath(); ctx.fill();
};

const nuvola: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ffffff';
  for (const [x, y, r] of [[34,52,14],[52,42,18],[70,52,13],[52,56,16]] as const) {
    ctx.beginPath(); ctx.arc(x*u, y*u, r*u, 0, 7); ctx.fill();
  }
  ctx.beginPath(); ctx.roundRect(22*u, 52*u, 60*u, 14*u, 7*u); ctx.fill();
};

const montagna: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#7f8fa6';
  ctx.beginPath(); ctx.moveTo(6*u, 84*u); ctx.lineTo(40*u, 22*u); ctx.lineTo(74*u, 84*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#5c6b84';
  ctx.beginPath(); ctx.moveTo(50*u, 84*u); ctx.lineTo(78*u, 40*u); ctx.lineTo(94*u, 84*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.moveTo(40*u, 22*u); ctx.lineTo(32*u, 40*u); ctx.lineTo(48*u, 40*u); ctx.closePath(); ctx.fill();
};

const fiume: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#4dabf7';
  ctx.beginPath();
  ctx.moveTo(8*u, 34*u);
  ctx.bezierCurveTo(30*u, 26*u, 66*u, 42*u, 88*u, 34*u);
  ctx.lineTo(88*u, 58*u);
  ctx.bezierCurveTo(66*u, 66*u, 30*u, 50*u, 8*u, 58*u);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#8fd0ff'; ctx.lineWidth = 3*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(20*u, 44*u); ctx.quadraticCurveTo(34*u, 40*u, 48*u, 46*u); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(54*u, 50*u); ctx.quadraticCurveTo(68*u, 46*u, 80*u, 50*u); ctx.stroke();
};

const foglia: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#58d68d';
  ctx.beginPath();
  ctx.moveTo(20*u, 76*u);
  ctx.quadraticCurveTo(10*u, 30*u, 76*u, 20*u);
  ctx.quadraticCurveTo(80*u, 66*u, 20*u, 76*u);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#2f9e5d'; ctx.lineWidth = 3*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(22*u, 74*u); ctx.quadraticCurveTo(40*u, 50*u, 72*u, 24*u); ctx.stroke();
};

const mela: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ff5d5d';
  ctx.beginPath(); ctx.arc(48*u, 56*u, 26*u, 0, 7); ctx.fill();
  ctx.strokeStyle = '#8a5a28'; ctx.lineWidth = 4*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(48*u, 32*u); ctx.quadraticCurveTo(50*u, 22*u, 56*u, 18*u); ctx.stroke();
  ctx.fillStyle = '#4caf50';
  ctx.beginPath(); ctx.ellipse(60*u, 26*u, 10*u, 5*u, -0.4, 0, 7); ctx.fill();
};

const banana: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.strokeStyle = '#ffd93d'; ctx.lineWidth = 16*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(24*u, 24*u); ctx.quadraticCurveTo(16*u, 66*u, 72*u, 76*u); ctx.stroke();
  ctx.strokeStyle = '#e8b71e'; ctx.lineWidth = 8*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(26*u, 28*u); ctx.quadraticCurveTo(20*u, 62*u, 68*u, 72*u); ctx.stroke();
  ctx.fillStyle = '#8a5a28';
  ctx.beginPath(); ctx.arc(24*u, 24*u, 4*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(72*u, 76*u, 4*u, 0, 7); ctx.fill();
};

const carota: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ff9f43';
  ctx.beginPath(); ctx.moveTo(28*u, 30*u); ctx.lineTo(68*u, 30*u); ctx.lineTo(50*u, 88*u); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#e07b1f'; ctx.lineWidth = 3*u; ctx.lineCap = 'round';
  for (const [x, y] of [[38,44],[52,52],[46,64]] as const) {
    ctx.beginPath(); ctx.moveTo((x-4)*u, y*u); ctx.lineTo((x+4)*u, y*u); ctx.stroke();
  }
  ctx.strokeStyle = '#4caf50'; ctx.lineWidth = 5*u; ctx.lineCap = 'round';
  for (const dx of [-8, 0, 8]) {
    ctx.beginPath(); ctx.moveTo(48*u, 28*u); ctx.lineTo((48+dx)*u, 10*u); ctx.stroke();
  }
};

const mano: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#f4c99b';
  ctx.beginPath(); ctx.roundRect(28*u, 44*u, 44*u, 34*u, 12*u); ctx.fill();
  for (let i = 0; i < 4; i++) {
    ctx.beginPath(); ctx.roundRect((30 + i * 11)*u, 18*u, 9*u, 36*u, 4*u); ctx.fill();
  }
  ctx.beginPath(); ctx.roundRect(12*u, 52*u, 22*u, 10*u, 5*u); ctx.fill();
  ctx.save(); ctx.translate(18*u, 57*u); ctx.rotate(-0.5);
  ctx.fillStyle = '#f4c99b';
  ctx.beginPath(); ctx.roundRect(-10*u, -5*u, 26*u, 10*u, 5*u); ctx.fill();
  ctx.restore();
};

const occhio: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.ellipse(48*u, 48*u, 30*u, 18*u, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = '#20222f'; ctx.lineWidth = 3*u;
  ctx.beginPath(); ctx.ellipse(48*u, 48*u, 30*u, 18*u, 0, 0, 7); ctx.stroke();
  ctx.fillStyle = '#4dabf7';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 11*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 5.5*u, 0, 7); ctx.fill();
};

const orecchio: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.strokeStyle = '#f4c99b'; ctx.lineWidth = 14*u; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(60*u, 74*u);
  ctx.quadraticCurveTo(84*u, 60*u, 76*u, 38*u);
  ctx.quadraticCurveTo(70*u, 20*u, 50*u, 24*u);
  ctx.quadraticCurveTo(34*u, 28*u, 34*u, 46*u);
  ctx.stroke();
  ctx.strokeStyle = '#d9a06b'; ctx.lineWidth = 5*u; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(62*u, 58*u);
  ctx.quadraticCurveTo(72*u, 50*u, 68*u, 38*u);
  ctx.quadraticCurveTo(62*u, 30*u, 52*u, 34*u);
  ctx.stroke();
};

const cuore: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ff5d5d';
  ctx.beginPath();
  ctx.moveTo(48*u, 84*u);
  ctx.bezierCurveTo(10*u, 58*u, 12*u, 22*u, 36*u, 24*u);
  ctx.quadraticCurveTo(48*u, 26*u, 48*u, 40*u);
  ctx.quadraticCurveTo(48*u, 26*u, 60*u, 24*u);
  ctx.bezierCurveTo(84*u, 22*u, 86*u, 58*u, 48*u, 84*u);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.beginPath(); ctx.ellipse(34*u, 38*u, 8*u, 5*u, -0.6, 0, 7); ctx.fill();
};

const cervello: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#f78fb3';
  for (const [x, y, r] of [[34,36,12],[54,34,12],[30,52,11],[58,52,11],[44,44,13],[40,62,10],[54,64,9]] as const) {
    ctx.beginPath(); ctx.arc(x*u, y*u, r*u, 0, 7); ctx.fill();
  }
  ctx.strokeStyle = '#d9648f'; ctx.lineWidth = 3*u;
  ctx.beginPath(); ctx.moveTo(46*u, 28*u); ctx.quadraticCurveTo(42*u, 50*u, 48*u, 70*u); ctx.stroke();
  ctx.strokeStyle = '#d9648f'; ctx.lineWidth = 4*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(40*u, 74*u); ctx.lineTo(40*u, 86*u); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(52*u, 74*u); ctx.lineTo(52*u, 86*u); ctx.stroke();
};

const polmone: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ff8787';
  ctx.beginPath(); ctx.ellipse(34*u, 56*u, 14*u, 22*u, 0.15, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(64*u, 56*u, 14*u, 22*u, -0.15, 0, 7); ctx.fill();
  ctx.strokeStyle = '#d9648f'; ctx.lineWidth = 5*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(49*u, 20*u); ctx.lineTo(49*u, 40*u); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(49*u, 40*u); ctx.quadraticCurveTo(42*u, 48*u, 38*u, 54*u); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(49*u, 40*u); ctx.quadraticCurveTo(56*u, 48*u, 60*u, 54*u); ctx.stroke();
};

const dente: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#9aa5bd'; ctx.lineWidth = 3*u;
  ctx.beginPath();
  ctx.moveTo(30*u, 22*u);
  ctx.quadraticCurveTo(48*u, 14*u, 66*u, 22*u);
  ctx.quadraticCurveTo(76*u, 30*u, 70*u, 48*u);
  ctx.quadraticCurveTo(66*u, 62*u, 62*u, 78*u);
  ctx.quadraticCurveTo(58*u, 88*u, 52*u, 78*u);
  ctx.lineTo(48*u, 60*u);
  ctx.lineTo(44*u, 78*u);
  ctx.quadraticCurveTo(38*u, 88*u, 34*u, 78*u);
  ctx.quadraticCurveTo(30*u, 62*u, 26*u, 48*u);
  ctx.quadraticCurveTo(20*u, 30*u, 30*u, 22*u);
  ctx.closePath(); ctx.fill(); ctx.stroke();
};

const corona: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath();
  ctx.moveTo(16*u, 72*u); ctx.lineTo(16*u, 34*u); ctx.lineTo(34*u, 52*u);
  ctx.lineTo(48*u, 24*u); ctx.lineTo(62*u, 52*u); ctx.lineTo(80*u, 34*u);
  ctx.lineTo(80*u, 72*u); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#e8b71e'; ctx.lineWidth = 3*u;
  ctx.beginPath(); ctx.moveTo(16*u, 72*u); ctx.lineTo(80*u, 72*u); ctx.stroke();
  ctx.fillStyle = '#ff5d5d';
  ctx.beginPath(); ctx.arc(48*u, 62*u, 5*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#4dabf7';
  ctx.beginPath(); ctx.arc(30*u, 62*u, 4*u, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(66*u, 62*u, 4*u, 0, 7); ctx.fill();
};

const spada: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#cfd6e4';
  ctx.beginPath();
  ctx.moveTo(48*u, 6*u); ctx.lineTo(56*u, 20*u); ctx.lineTo(54*u, 62*u);
  ctx.lineTo(42*u, 62*u); ctx.lineTo(40*u, 20*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.roundRect(26*u, 60*u, 44*u, 10*u, 4*u); ctx.fill();
  ctx.fillStyle = '#8a5a28';
  ctx.beginPath(); ctx.roundRect(42*u, 70*u, 12*u, 20*u, 4*u); ctx.fill();
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.arc(48*u, 92*u, 5*u, 0, 7); ctx.fill();
};

const scudo: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#4dabf7';
  ctx.beginPath();
  ctx.moveTo(20*u, 18*u); ctx.lineTo(76*u, 18*u);
  ctx.quadraticCurveTo(78*u, 56*u, 48*u, 84*u);
  ctx.quadraticCurveTo(18*u, 56*u, 20*u, 18*u);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#20222f'; ctx.lineWidth = 3*u;
  ctx.beginPath();
  ctx.moveTo(20*u, 18*u); ctx.lineTo(76*u, 18*u);
  ctx.quadraticCurveTo(78*u, 56*u, 48*u, 84*u);
  ctx.quadraticCurveTo(18*u, 56*u, 20*u, 18*u);
  ctx.closePath(); ctx.stroke();
  ctx.strokeStyle = '#ffd93d'; ctx.lineWidth = 6*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(48*u, 26*u); ctx.lineTo(48*u, 62*u); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(32*u, 38*u); ctx.lineTo(64*u, 38*u); ctx.stroke();
};

const torre: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#c9b8a0';
  ctx.beginPath(); ctx.roundRect(30*u, 26*u, 36*u, 62*u, 4*u); ctx.fill();
  for (let i = 0; i < 3; i++) {
    ctx.beginPath(); ctx.roundRect((28 + i * 13)*u, 14*u, 10*u, 14*u, 2*u); ctx.fill();
  }
  ctx.fillStyle = '#8a765c';
  ctx.beginPath(); ctx.roundRect(42*u, 58*u, 12*u, 30*u, 6*u); ctx.fill();
  ctx.fillStyle = '#5c6b84';
  ctx.beginPath(); ctx.arc(48*u, 44*u, 4*u, 0, 7); ctx.fill();
};

const nave: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#8a5a28';
  ctx.beginPath();
  ctx.moveTo(12*u, 56*u); ctx.lineTo(84*u, 56*u);
  ctx.lineTo(72*u, 74*u); ctx.lineTo(24*u, 74*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.moveTo(48*u, 10*u); ctx.lineTo(48*u, 54*u); ctx.lineTo(82*u, 54*u); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(44*u, 18*u); ctx.lineTo(44*u, 54*u); ctx.lineTo(18*u, 54*u); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#8a5a28'; ctx.lineWidth = 3*u;
  ctx.beginPath(); ctx.moveTo(46*u, 8*u); ctx.lineTo(46*u, 56*u); ctx.stroke();
  ctx.fillStyle = '#ff5d5d';
  ctx.beginPath(); ctx.moveTo(46*u, 10*u); ctx.lineTo(60*u, 16*u); ctx.lineTo(46*u, 22*u); ctx.closePath(); ctx.fill();
};

const moneta: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 28*u, 0, 7); ctx.fill();
  ctx.strokeStyle = '#e8b71e'; ctx.lineWidth = 4*u;
  ctx.beginPath(); ctx.arc(48*u, 48*u, 20*u, 0, 7); ctx.stroke();
  ctx.strokeStyle = '#e8b71e'; ctx.lineWidth = 4*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(38*u, 40*u); ctx.quadraticCurveTo(54*u, 34*u, 58*u, 48*u); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(38*u, 56*u); ctx.quadraticCurveTo(54*u, 50*u, 58*u, 64*u); ctx.stroke();
};

const pergamena: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#fff8e7';
  ctx.beginPath(); ctx.roundRect(24*u, 20*u, 48*u, 56*u, 4*u); ctx.fill();
  ctx.fillStyle = '#e8d9c5';
  ctx.beginPath(); ctx.roundRect(18*u, 16*u, 12*u, 64*u, 6*u); ctx.fill();
  ctx.beginPath(); ctx.roundRect(66*u, 16*u, 12*u, 64*u, 6*u); ctx.fill();
  ctx.strokeStyle = '#9aa5bd'; ctx.lineWidth = 2.6*u; ctx.lineCap = 'round';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(36*u, (34 + i * 10)*u); ctx.lineTo(62*u, (34 + i * 10)*u); ctx.stroke();
  }
};

const aquila: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#5c4327';
  ctx.beginPath(); ctx.ellipse(48*u, 54*u, 16*u, 12*u, 0, 0, 7); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(40*u, 52*u); ctx.quadraticCurveTo(8*u, 30*u, 4*u, 58*u);
  ctx.quadraticCurveTo(20*u, 52*u, 34*u, 60*u); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(56*u, 52*u); ctx.quadraticCurveTo(88*u, 30*u, 92*u, 58*u);
  ctx.quadraticCurveTo(76*u, 52*u, 62*u, 60*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#8a5a28';
  ctx.beginPath(); ctx.arc(48*u, 38*u, 10*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.moveTo(48*u, 34*u); ctx.lineTo(58*u, 40*u); ctx.lineTo(48*u, 44*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(44*u, 36*u, 2.4*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffd93d';
  for (const dx of [-6, 0, 6]) {
    ctx.beginPath(); ctx.moveTo((48+dx)*u, 64*u); ctx.lineTo((48+dx)*u, 76*u); ctx.fill();
  }
};

const arco: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#c9b8a0';
  ctx.beginPath(); ctx.roundRect(14*u, 24*u, 68*u, 62*u, 4*u); ctx.fill();
  ctx.fillStyle = '#5c4327';
  ctx.beginPath();
  ctx.moveTo(34*u, 86*u); ctx.lineTo(34*u, 52*u);
  ctx.arc(48*u, 52*u, 14*u, Math.PI, 0, true);
  ctx.lineTo(62*u, 86*u); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#8a765c'; ctx.lineWidth = 2.6*u;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo((14 + i * 17)*u, 24*u); ctx.lineTo((14 + i * 17)*u, 32*u); ctx.stroke();
  }
};

const abaco: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.strokeStyle = '#8a5a28'; ctx.lineWidth = 5*u; ctx.lineCap = 'round';
  ctx.strokeRect(22*u, 18*u, 52*u, 60*u);
  ctx.lineWidth = 3*u;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath(); ctx.moveTo(24*u, (34 + i * 14)*u); ctx.lineTo(72*u, (34 + i * 14)*u); ctx.stroke();
  }
  const beads: [number, number, string][] = [
    [32,34,'#ff5d5d'],[44,34,'#4dabf7'],[58,34,'#ffd93d'],
    [30,48,'#4dabf7'],[42,48,'#4dabf7'],
    [34,62,'#58d68d'],[50,62,'#ff9f43'],[62,62,'#ff9f43']
  ];
  for (const [x, y, c] of beads) {
    ctx.fillStyle = c;
    ctx.beginPath(); ctx.ellipse(x*u, y*u, 5*u, 6.4*u, 0, 0, 7); ctx.fill();
  }
};

const righello: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.roundRect(10*u, 36*u, 76*u, 24*u, 4*u); ctx.fill();
  ctx.strokeStyle = '#20222f'; ctx.lineWidth = 2.4*u; ctx.lineCap = 'round';
  for (let i = 0; i < 9; i++) {
    const x = 18 + i * 8;
    const h = i % 2 === 0 ? 10 : 6;
    ctx.beginPath(); ctx.moveTo(x*u, 38*u); ctx.lineTo(x*u, (38 + h)*u); ctx.stroke();
  }
};

const cubo: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#4dabf7';
  ctx.beginPath(); ctx.moveTo(48*u, 14*u); ctx.lineTo(78*u, 30*u); ctx.lineTo(48*u, 46*u); ctx.lineTo(18*u, 30*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2b7fd4';
  ctx.beginPath(); ctx.moveTo(18*u, 30*u); ctx.lineTo(48*u, 46*u); ctx.lineTo(48*u, 84*u); ctx.lineTo(18*u, 68*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#8fd0ff';
  ctx.beginPath(); ctx.moveTo(78*u, 30*u); ctx.lineTo(48*u, 46*u); ctx.lineTo(48*u, 84*u); ctx.lineTo(78*u, 68*u); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#20222f'; ctx.lineWidth = 2.4*u;
  for (const [a, b, c, d] of [[48,14,78,30],[78,30,48,46],[48,46,48,84]] as const) {
    ctx.beginPath(); ctx.moveTo(a*u, b*u); ctx.lineTo(c*u, d*u); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(18*u, 30*u); ctx.lineTo(18*u, 68*u); ctx.lineTo(48*u, 84*u); ctx.lineTo(48*u, 46*u); ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(78*u, 30*u); ctx.lineTo(78*u, 68*u); ctx.lineTo(48*u, 84*u); ctx.stroke();
};

const focus: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.strokeStyle = '#4dabf7'; ctx.lineWidth = 4*u;
  ctx.beginPath(); ctx.arc(48*u, 48*u, 30*u, 0, 7); ctx.stroke();
  ctx.strokeStyle = '#8fd0ff'; ctx.lineWidth = 4*u;
  ctx.beginPath(); ctx.arc(48*u, 48*u, 20*u, 0.5, 5.8); ctx.stroke();
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 10*u, 0, 7); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 4*u, 0, 7); ctx.fill();
};

const pattern: Painter = (ctx, S) => {
  const u = S / 96;
  const colors = ['#ff5d5d', '#ffd93d', '#4dabf7', '#58d68d'];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      ctx.fillStyle = colors[(r + c) % 4];
      ctx.beginPath(); ctx.roundRect((12 + c * 20)*u, (12 + r * 20)*u, 14*u, 14*u, 4*u); ctx.fill();
    }
  }
};

const text: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.fillStyle = '#fff8e7';
  ctx.beginPath(); ctx.roundRect(10*u, 14*u, 76*u, 68*u, 8*u); ctx.fill();
  ctx.strokeStyle = '#20222f'; ctx.lineWidth = 3*u;
  ctx.beginPath(); ctx.roundRect(10*u, 14*u, 76*u, 68*u, 8*u); ctx.stroke();
  ctx.fillStyle = '#20222f';
  ctx.font = `bold 44px Verdana, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('Aa', 48*u, 50*u);
};

const pencil: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.save();
  ctx.translate(48*u, 48*u);
  ctx.rotate(-Math.PI / 4);
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath(); ctx.roundRect(-8*u, -38*u, 16*u, 56*u, 3*u); ctx.fill();
  ctx.fillStyle = '#f4c99b';
  ctx.beginPath(); ctx.moveTo(-8*u, 18*u); ctx.lineTo(8*u, 18*u); ctx.lineTo(0*u, 38*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#20222f';
  ctx.beginPath(); ctx.moveTo(-3*u, 30*u); ctx.lineTo(3*u, 30*u); ctx.lineTo(0*u, 38*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ff8fab';
  ctx.beginPath(); ctx.roundRect(-8*u, -46*u, 16*u, 10*u, 3*u); ctx.fill();
  ctx.restore();
};

const calm: Painter = (ctx, S) => {
  const u = S / 96;
  ctx.strokeStyle = '#8fd0ff'; ctx.lineWidth = 4*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 32*u, 0.4, 2.7); ctx.stroke();
  ctx.strokeStyle = '#b197fc'; ctx.lineWidth = 4*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 22*u, 3.4, 5.7); ctx.stroke();
  ctx.fillStyle = '#58d68d';
  ctx.beginPath(); ctx.arc(48*u, 48*u, 12*u, 0, 7); ctx.fill();
  ctx.strokeStyle = '#2f9e5d'; ctx.lineWidth = 3*u;
  ctx.beginPath(); ctx.moveTo(42*u, 48*u); ctx.quadraticCurveTo(48*u, 42*u, 54*u, 48*u); ctx.stroke();
};

export const PAINTERS: Record<string, Painter> = {
  cane, gatto, uccello, pesce, leone, elefante, coniglio, giraffa, cavallo, serpente,
  albero, fiore, sole, luna, stella, nuvola, montagna, fiume, foglia, mela, banana, carota,
  mano, occhio, orecchio, cuore, cervello, polmone, dente, corona, spada, scudo,
  torre, nave, moneta, pergamena, aquila, arco, abaco, righello, cubo,
  focus, pattern, text, pencil, calm
};
