/**
 * Modalità grafica 3D: un mondo Three.js in terza persona dietro l'interfaccia
 * Phaser. Pico corre su una pista pastello, la camera lo segue da dietro e le
 * domande arrivano come cancelli con porte colorate. Le risposte, però, non
 * stanno nel mondo: sono una barra HTML in basso (`src/ui/runner-answers.ts`),
 * così non coprono Pico né il badge "?".
 *
 * Perché un canvas separato: Phaser resta il motore di input, testi e prove
 * (accessibilità, BES, testi grandi). Three.js disegna solo il mondo, sotto.
 * Il canvas di Phaser diventa trasparente quando c'è il 3D (vedi main.ts).
 *
 * Regole rispettate:
 *  - `motion: off` → niente scorrimento, il cancello si presenta subito;
 *  - `highContrast` → il 3D si spegne (fondo chiaro uniforme, testi neri);
 *  - `decoration: false` → niente alberi e nuvole, resta la pista.
 */
import * as THREE from 'three';
import Phaser from 'phaser';
import type { EffectiveConfig } from '../bes/resolver';
import type { ThemeKey } from './backgrounds';
import type { World } from './world';

export interface Gate3D {
  /** Il cancello è arrivato e la barra delle risposte si può abilitare. */
  onArrive(cb: () => void): void;
  /** Una porta è stata scelta (indice nell'ordine delle risposte). */
  onPick(cb: (i: number) => void): void;
  markCorrect(i: number): void;
  markWrong(i: number): void;
  /** Riporta le porte allo stato normale dopo un errore. */
  reset(): void;
  reveal(correct: number): void;
  lock(): void;
  dispose(): void;
}

export interface World3D extends World {
  openGate(labels: string[]): Gate3D;
}

export interface Stato3D {
  attivo: boolean;
  pronta: boolean;
  /** Distanza che manca al cancello, in unità di mondo (0 = fermo). */
  cancello: number | null;
  arrivato: boolean;
  velocita: number;
  /** @deprecated Le risposte non sono più nel mondo: resta vuoto per i test. */
  pannelli: Array<{ x: number; y: number }>;
  /** Etichette delle porte, nello stesso ordine della barra in basso. */
  etichette: string[];
  /** Errori toccati nel cancello corrente (si azzera a ogni cancello). */
  errori: number;
  /** Come scegliere la porta i (per i test, senza passare dal mouse). */
  pick: (i: number) => void;
}

const VUOTO: Stato3D = {
  attivo: false,
  pronta: false,
  cancello: null,
  arrivato: false,
  velocita: 0,
  pannelli: [],
  etichette: [],
  errori: 0,
  pick: () => undefined
};

let stato: Stato3D = VUOTO;

/** Stato del 3D per i test e per la dashboard. */
export function stato3D(): Stato3D {
  return stato;
}

/** Unità di mondo per pixel di scorrimento (scala della corsa). */
const SCALA = 0.018;
/** Dove si ferma il cancello, davanti a Pico. */
const STOP_Z = -6;
/** Da dove arriva il cancello. */
const START_Z = -34;

interface Tema {
  cielo: string;
  prato: string;
  pista: string;
  chioma: string;
  chioma2: string;
  tronco: string;
  roccia: string;
  collina: string;
  collina2: string;
}

const TEMI: Record<ThemeKey, Tema> = {
  scuola: {
    cielo: '#dff3ff', prato: '#a9e6a2', pista: '#f5efdf', chioma: '#7fd07a',
    chioma2: '#5fbf6a', tronco: '#b98a5e', roccia: '#cfd8e3',
    collina: '#bfe9c4', collina2: '#a7ddb0'
  },
  matematica: {
    cielo: '#dff3ff', prato: '#a9e6a2', pista: '#f5efdf', chioma: '#7fd07a',
    chioma2: '#5fbf6a', tronco: '#b98a5e', roccia: '#cfd8e3',
    collina: '#bfe9c4', collina2: '#a7ddb0'
  },
  italiano: {
    cielo: '#fff2e2', prato: '#bfe6a8', pista: '#f7ecd8', chioma: '#f0b98a',
    chioma2: '#d99a6c', tronco: '#b98a5e', roccia: '#e3d6c8',
    collina: '#f6d9bc', collina2: '#eec4a2'
  },
  scienze: {
    cielo: '#e6fbf3', prato: '#a8e6c8', pista: '#f2f0e0', chioma: '#6fd0a0',
    chioma2: '#4fbb8a', tronco: '#a98a6a', roccia: '#cfe0dc',
    collina: '#bcebd8', collina2: '#9fe0c8'
  },
  storia: {
    cielo: '#fdf1dc', prato: '#d9e2a8', pista: '#efe6d2', chioma: '#c9b06a',
    chioma2: '#b39a58', tronco: '#a9855e', roccia: '#ded3c0',
    collina: '#e9dcb8', collina2: '#dccb9e'
  }
};

// ── Piccoli helper ────────────────────────────────────────────────

function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

function textureCanvas(c: HTMLCanvasElement): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/**
 * Porta del cancello: solo la cornice, senza etichetta. Il colore lo dà il
 * materiale (pastello, verde quando è giusta, rosa quando è sbagliata), così
 * le risposte possono stare in basso senza coprire Pico e il simbolo "?".
 */
function texturePorta(): THREE.CanvasTexture {
  const [c, ctx] = canvas(256, 384);
  ctx.clearRect(0, 0, 256, 384);
  ctx.fillStyle = 'rgba(255,255,255,0.66)';
  ctx.beginPath();
  ctx.roundRect(12, 12, 232, 360, 36);
  ctx.fill();
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(12, 12, 232, 360, 36);
  ctx.stroke();
  return textureCanvas(c);
}

/** Pista chiara con righe bianche: lo scorrimento si legge anche da vicino. */
function texturePista(tema: Tema): THREE.CanvasTexture {
  const [c, ctx] = canvas(256, 256);
  ctx.fillStyle = tema.pista;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = 'rgba(180,165,130,0.35)';
  ctx.fillRect(0, 0, 20, 256);
  ctx.fillRect(236, 0, 20, 256);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let y = 10; y < 256; y += 72) ctx.fillRect(122, y, 12, 42);
  const t = textureCanvas(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, 26);
  return t;
}

/** Cielo con gradiente: chiaro all'orizzonte, azzurro in alto. */
function textureCielo(tema: Tema): THREE.CanvasTexture {
  const [c, ctx] = canvas(16, 256);
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  // Un azzurro un po' più pieno in alto, tenue all'orizzonte.
  const alto = new THREE.Color(tema.cielo).lerp(new THREE.Color('#79c8f2'), 0.5).getStyle();
  g.addColorStop(0, alto);
  g.addColorStop(0.55, '#e6f7ff');
  g.addColorStop(1, '#fbfdff');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 16, 256);
  const t = textureCanvas(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  return t;
}

/** Cordolo a blocchi rossi e bianchi: dà il ritmo della velocità. */
function textureCordolo(): THREE.CanvasTexture {
  const [c, ctx] = canvas(32, 64);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 32, 64);
  ctx.fillStyle = '#ef8f7c';
  ctx.fillRect(0, 0, 32, 32);
  ctx.fillStyle = 'rgba(59,74,90,0.10)';
  ctx.fillRect(0, 0, 32, 3);
  const t = textureCanvas(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, 40);
  return t;
}

/** Prato con strisce tenui, come un campo da gioco. */
function texturePrato(tema: Tema): THREE.CanvasTexture {
  const [c, ctx] = canvas(128, 128);
  ctx.fillStyle = tema.prato;
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.fillRect(0, 0, 128, 32);
  ctx.fillRect(0, 64, 128, 32);
  const t = textureCanvas(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(40, 40);
  return t;
}

function texturePunto(): THREE.CanvasTexture {
  const [c, ctx] = canvas(128, 128);
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(64, 64, 58, 0, 7);
  ctx.fill();
  ctx.fillStyle = '#2b7fd4';
  ctx.font = 'bold 86px "Arial Rounded MT Bold", "Trebuchet MS", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('?', 64, 68);
  return textureCanvas(c);
}

// ── Il mondo 3D ───────────────────────────────────────────────────

interface Props {
  gruppo: THREE.Group;
  z: number;
}

interface Stella {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  vita: number;
}

interface Cancello {
  gruppo: THREE.Group;
  /** Porte colorate del varco: riferimenti visivi, senza etichette. */
  porte: THREE.Mesh[];
  materiali: THREE.MeshBasicMaterial[];
  etichette: string[];
  arrived: boolean;
  enabled: boolean;
  uscita: boolean;
  onArrive: (() => void) | null;
  onPick: ((i: number) => void) | null;
  scosso: number;
}

class Mondo3D implements World3D {
  private scene: Phaser.Scene;
  private cfg: EffectiveConfig;
  private tema: Tema;
  private animato: boolean;

  private renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;
  private mondo = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;

  private pico = new THREE.Group();
  private braccioSx!: THREE.Object3D;
  private braccioDx!: THREE.Object3D;
  private gambaSx!: THREE.Object3D;
  private gambaDx!: THREE.Object3D;
  private corpo!: THREE.Mesh;
  private matGiallo!: THREE.MeshStandardMaterial;

  private pista!: THREE.Mesh;
  private pistaTex!: THREE.CanvasTexture;
  private cordoloTex!: THREE.CanvasTexture;
  private caso = prng(4242);
  private props: Props[] = [];
  private nuvole: THREE.Group[] = [];
  private stelle: Stella[] = [];
  private polvere: Array<{ mesh: THREE.Mesh; vita: number }> = [];

  private cancello: Cancello | null = null;

  private velocita: number;
  private bersaglio: number;
  private spinta = 0;
  private saltoT = -1;
  private saltoX = 0;
  private saltoDur = 0.62;
  private inciampoT = 0;
  private tempo = 0;
  private errori = 0;
  private ultimoSync = '';

  private onResize = (): void => this.sincronizza();

  constructor(scene: Phaser.Scene, theme: ThemeKey, cfg: EffectiveConfig, speed: number) {
    this.scene = scene;
    this.cfg = cfg;
    this.tema = TEMI[theme] ?? TEMI.scuola;
    this.animato = cfg.motion !== 'off';
    this.velocita = this.animato ? speed : 0;
    this.bersaglio = this.velocita;

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'tre-d';
    this.canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.canvas);
    // In verticale il canvas Phaser (16:9) va in alto, sotto la barra di
    // navigazione: così la domanda non finisce sopra il cancello.
    document.body.classList.add('con-3d');

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 220);
    this.camera.position.set(0, 3.4, 7.4);

    this.mondo.background = textureCielo(this.tema);
    this.mondo.fog = new THREE.Fog(this.tema.cielo, 34, 100);

    this.luci();
    this.suolo();
    this.scenografia();
    this.creaPico();

    window.addEventListener('resize', this.onResize);
    scene.events.on(Phaser.Scenes.Events.UPDATE, this.aggiorna);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.distruggi);

    this.sincronizza();
    this.aggiorna(0, 0);
    this.renderer.render(this.mondo, this.camera);

    stato = {
      attivo: true,
      pronta: true,
      cancello: null,
      arrivato: false,
      velocita: this.velocita,
      pannelli: [],
      etichette: [],
      errori: 0,
      pick: (i: number) => this.scegli(i)
    };
  }

  // ── Costruzione ────────────────────────────────────────────────

  private luci(): void {
    const cielo = new THREE.HemisphereLight(0xffffff, 0x8fcf86, 1.15);
    this.mondo.add(cielo);
    const sole = new THREE.DirectionalLight(0xfff2cf, 1.7);
    sole.position.set(8, 16, 10);
    sole.castShadow = true;
    sole.shadow.mapSize.set(1024, 1024);
    sole.shadow.camera.left = -18;
    sole.shadow.camera.right = 18;
    sole.shadow.camera.top = 18;
    sole.shadow.camera.bottom = -18;
    sole.shadow.camera.near = 1;
    sole.shadow.camera.far = 50;
    sole.shadow.bias = -0.0005;
    this.mondo.add(sole);
  }

  private suolo(): void {
    const prato = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshStandardMaterial({ map: texturePrato(this.tema), roughness: 1 })
    );
    prato.rotation.x = -Math.PI / 2;
    prato.position.y = -0.02;
    prato.receiveShadow = true;
    this.mondo.add(prato);

    this.pistaTex = texturePista(this.tema);
    const pista = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 220),
      new THREE.MeshStandardMaterial({ map: this.pistaTex, roughness: 0.95 })
    );
    pista.rotation.x = -Math.PI / 2;
    pista.position.set(0, 0.01, -60);
    pista.receiveShadow = true;
    this.mondo.add(pista);
    this.pista = pista;

    // Cordoli ai due lati: si muovono con la pista e rendono la velocità.
    this.cordoloTex = textureCordolo();
    const matCordolo = new THREE.MeshStandardMaterial({ map: this.cordoloTex, roughness: 0.9 });
    for (const lato of [-1, 1]) {
      const cordolo = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 220), matCordolo);
      cordolo.rotation.x = -Math.PI / 2;
      cordolo.position.set(lato * 4.02, 0.02, -60);
      cordolo.receiveShadow = true;
      this.mondo.add(cordolo);
    }
  }

  private scenografia(): void {
    if (!this.cfg.decoration || this.cfg.highContrast) return;
    const caso = prng(20261024);

    // sole e nuvole
    const sole = new THREE.Group();
    const nucleo = new THREE.Mesh(
      new THREE.SphereGeometry(3.4, 20, 16),
      new THREE.MeshBasicMaterial({ color: 0xfff3b0, toneMapped: false, fog: false })
    );
    sole.add(nucleo);
    for (const [raggio, opacita] of [[6.5, 0.28], [11, 0.13]] as const) {
      const alone = new THREE.Mesh(
        new THREE.SphereGeometry(raggio, 20, 16),
        new THREE.MeshBasicMaterial({
          color: 0xfff6c8,
          transparent: true,
          opacity: opacita,
          depthWrite: false,
          toneMapped: false,
          fog: false
        })
      );
      sole.add(alone);
    }
    sole.position.set(34, 26, -95);
    this.mondo.add(sole);

    for (let i = 0; i < 5; i++) {
      const g = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
      for (let j = 0; j < 3; j++) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(2.2 + caso() * 1.2, 12, 10), mat);
        s.position.set((j - 1) * 2.2, caso() * 0.7, 0);
        s.scale.y = 0.62;
        g.add(s);
      }
      g.position.set(-34 + i * 17, 19 + caso() * 6, -60 - caso() * 12);
      this.mondo.add(g);
      this.nuvole.push(g);
    }

    // colline lontane
    for (let i = 0; i < 8; i++) {
      const raggio = 13 + caso() * 9;
      const collina = new THREE.Mesh(
        new THREE.SphereGeometry(raggio, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshLambertMaterial({ color: i % 2 ? this.tema.collina : this.tema.collina2 })
      );
      collina.position.set(-60 + i * 17, -1.2, -72 - caso() * 10);
      collina.scale.y = 0.42;
      this.mondo.add(collina);
    }

    // materiali e geometrie condivisi per gli oggetti di bordo
    const matTronco = new THREE.MeshStandardMaterial({ color: this.tema.tronco, roughness: 1 });
    const matChioma = new THREE.MeshStandardMaterial({ color: this.tema.chioma, roughness: 1 });
    const matChioma2 = new THREE.MeshStandardMaterial({ color: this.tema.chioma2, roughness: 1 });
    const matRoccia = new THREE.MeshStandardMaterial({ color: this.tema.roccia, roughness: 1 });
    const matFiore = new THREE.MeshStandardMaterial({ color: 0xffa8c8, roughness: 0.8 });
    const matGambo = new THREE.MeshStandardMaterial({ color: 0x5cc45c, roughness: 1 });
    const geoTronco = new THREE.CylinderGeometry(0.16, 0.22, 1.6, 8);
    const geoCono = new THREE.ConeGeometry(0.9, 1.8, 10);
    const geoSfera = new THREE.SphereGeometry(0.55, 10, 8);
    const geoRoccia = new THREE.DodecahedronGeometry(0.6, 0);
    const geoGambo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6);

    for (let i = 0; i < 34; i++) {
      const lato = i % 2 === 0 ? 1 : -1;
      const x = lato * (5.4 + caso() * 6.5);
      const z = -2 - i * 2.5 - caso() * 1.6;
      const tipo = i % 4;
      const g = new THREE.Group();
      if (tipo === 0) {
        const tronco = new THREE.Mesh(geoTronco, matTronco);
        tronco.position.y = 0.8;
        tronco.castShadow = true;
        const c1 = new THREE.Mesh(geoCono, matChioma);
        c1.position.y = 2.1;
        c1.castShadow = true;
        const c2 = new THREE.Mesh(geoCono, matChioma2);
        c2.position.y = 2.9;
        c2.scale.setScalar(0.72);
        c2.castShadow = true;
        g.add(tronco, c1, c2);
        g.scale.setScalar(0.9 + caso() * 0.5);
      } else if (tipo === 1) {
        for (let j = 0; j < 3; j++) {
          const s = new THREE.Mesh(geoSfera, j === 1 ? matChioma2 : matChioma);
          s.position.set((j - 1) * 0.45, 0.35 + (j === 1 ? 0.22 : 0), 0);
          s.castShadow = true;
          g.add(s);
        }
      } else if (tipo === 2) {
        const r = new THREE.Mesh(geoRoccia, matRoccia);
        r.position.y = 0.32;
        r.rotation.set(caso(), caso() * 3, caso());
        r.castShadow = true;
        g.add(r);
      } else {
        const gambo = new THREE.Mesh(geoGambo, matGambo);
        gambo.position.y = 0.3;
        const fiore = new THREE.Mesh(geoSfera, matFiore);
        fiore.position.y = 0.66;
        fiore.scale.setScalar(0.55);
        g.add(gambo, fiore);
      }
      g.position.set(x, 0, z);
      this.mondo.add(g);
      this.props.push({ gruppo: g, z });
    }
  }

  private creaPico(): void {
    this.matGiallo = new THREE.MeshStandardMaterial({ color: 0xffe08a, roughness: 0.7 });
    const matGialloScuro = new THREE.MeshStandardMaterial({ color: 0xffd166, roughness: 0.75 });
    const matScuro = new THREE.MeshStandardMaterial({ color: 0x3b4a5a, roughness: 0.8 });
    const matBlu = new THREE.MeshStandardMaterial({ color: 0x66b8f2, roughness: 0.7 });
    const matVisiera = new THREE.MeshStandardMaterial({ color: 0xbfe6ff, roughness: 0.3, metalness: 0.1 });
    const matArancio = new THREE.MeshStandardMaterial({ color: 0xffa45c, roughness: 0.7 });

    // Corpo e testa separati: da dietro si legge la sagoma, non solo una palla.
    const corpo = new THREE.Mesh(new THREE.SphereGeometry(0.62, 24, 18), this.matGiallo);
    corpo.scale.set(1, 1.08, 0.9);
    corpo.position.y = 0.92;
    corpo.castShadow = true;
    this.corpo = corpo;

    const testa = new THREE.Mesh(new THREE.SphereGeometry(0.46, 22, 16), this.matGiallo);
    testa.scale.set(1.05, 1, 0.95);
    testa.position.y = 1.78;
    testa.castShadow = true;

    // zaino blu con spalline: è quello che si vede dalla camera, dietro Pico
    const zaino = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), matBlu);
    zaino.scale.set(1, 1.15, 0.55);
    zaino.position.set(0, 1.14, 0.5);
    zaino.castShadow = true;
    const spallinaGeo = new THREE.BoxGeometry(0.07, 0.5, 0.06);
    const spallinaSx = new THREE.Mesh(spallinaGeo, matBlu);
    spallinaSx.position.set(-0.24, 1.4, 0.3);
    spallinaSx.rotation.x = 0.18;
    const spallinaDx = spallinaSx.clone();
    spallinaDx.position.x = 0.24;

    // visiera frontale, per la lettura di profilo
    const visiera = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.28, 0.08), matVisiera);
    visiera.position.set(0, 1.84, -0.44);
    // anello azzurro attorno alla testa: si vede anche da dietro
    const anello = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.06, 8, 24), matBlu);
    anello.rotation.x = Math.PI / 2;
    anello.position.y = 1.84;

    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.34, 6), matScuro);
    antenna.position.set(0, 2.36, 0.08);
    const pallina = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), matArancio);
    pallina.position.set(0, 2.56, 0.08);
    pallina.castShadow = true;

    const braccioGeo = new THREE.CapsuleGeometry(0.1, 0.34, 4, 8);
    const sx = new THREE.Group();
    const msx = new THREE.Mesh(braccioGeo, matGialloScuro);
    msx.position.y = -0.2;
    msx.castShadow = true;
    sx.add(msx);
    sx.position.set(-0.66, 1.05, 0);
    sx.rotation.z = 0.22;
    const dx = new THREE.Group();
    const mdx = new THREE.Mesh(braccioGeo, matGialloScuro);
    mdx.position.y = -0.2;
    mdx.castShadow = true;
    dx.add(mdx);
    dx.position.set(0.66, 1.05, 0);
    dx.rotation.z = -0.22;
    this.braccioSx = sx;
    this.braccioDx = dx;

    // gambe corte: si alternano e danno il ritmo della corsa
    const gambaGeo = new THREE.CapsuleGeometry(0.11, 0.26, 4, 8);
    const gsx = new THREE.Group();
    const mgsx = new THREE.Mesh(gambaGeo, matGialloScuro);
    mgsx.position.y = -0.18;
    mgsx.castShadow = true;
    gsx.add(mgsx);
    const scarpaSx = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), matArancio);
    scarpaSx.scale.set(1.15, 0.7, 1.4);
    scarpaSx.position.set(0, -0.38, -0.06);
    scarpaSx.castShadow = true;
    gsx.add(scarpaSx);
    gsx.position.set(-0.25, 0.42, 0);
    const gdx = new THREE.Group();
    const mgdx = new THREE.Mesh(gambaGeo, matGialloScuro);
    mgdx.position.y = -0.18;
    mgdx.castShadow = true;
    gdx.add(mgdx);
    const scarpaDx = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), matArancio);
    scarpaDx.scale.set(1.15, 0.7, 1.4);
    scarpaDx.position.set(0, -0.38, -0.06);
    scarpaDx.castShadow = true;
    gdx.add(scarpaDx);
    gdx.position.set(0.25, 0.42, 0);
    this.gambaSx = gsx;
    this.gambaDx = gdx;

    // ombra a terra, morbida
    const ombra = new THREE.Mesh(
      new THREE.CircleGeometry(0.75, 24),
      new THREE.MeshBasicMaterial({ color: 0x3b4a5a, transparent: true, opacity: 0.16 })
    );
    ombra.rotation.x = -Math.PI / 2;
    ombra.position.y = 0.02;

    this.pico.add(
      corpo, testa, zaino, spallinaSx, spallinaDx, visiera, anello,
      antenna, pallina, sx, dx, gsx, gdx, ombra
    );
    this.mondo.add(this.pico);
  }

  // ── Contratto World ────────────────────────────────────────────

  speed(): number {
    return this.velocita;
  }

  setSpeed(px: number): void {
    this.bersaglio = this.animato ? Math.max(0, px) : 0;
  }

  dash(): void {
    this.spinta = 0.7;
    this.salta(0, 0.5);
  }

  leap(_x: number, _y: number): void {
    this.salta(0, 0.55);
  }

  stumble(): void {
    this.inciampoT = 0.38;
  }

  setProgress(_done: number, _total: number): void {
    // Nel 3D non ci sono checkpoint da accendere: il progresso è la corsa.
  }

  openGate(labels: string[]): Gate3D {
    this.chiudiCancello();
    const gruppo = new THREE.Group();
    const materiali: THREE.MeshBasicMaterial[] = [];
    const porte: THREE.Mesh[] = [];
    const n = labels.length;
    const disponibile = 10.2;
    const larghezza = Math.min(2.6, (disponibile - (n - 1) * 0.2) / n);
    const totale = n * larghezza + (n - 1) * 0.2;
    const colori = [0x9fd8ff, 0xffd166, 0x9df0b8, 0xffb3b3];
    const texPorta = texturePorta();

    labels.forEach((_label, i) => {
      const mat = new THREE.MeshBasicMaterial({
        map: texPorta,
        color: colori[i % colori.length],
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        depthWrite: false,
        toneMapped: false
      });
      // Porta bassa e trasparente: Pico, l'antenna e il badge "?" restano visibili.
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(larghezza * 0.92, 2.5), mat);
      mesh.position.set(-totale / 2 + larghezza / 2 + i * (larghezza + 0.2), 1.3, 0.06);
      gruppo.add(mesh);
      materiali.push(mat);
      porte.push(mesh);
    });

    const matPalo = new THREE.MeshStandardMaterial({ color: 0x8a99ad, roughness: 0.9 });
    const matTraversa = new THREE.MeshStandardMaterial({ color: 0xffd93d, roughness: 0.7 });
    const paloGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.6, 8);
    const sx = new THREE.Mesh(paloGeo, matPalo);
    sx.position.set(-totale / 2 - 0.35, 1.8, 0);
    const dx = sx.clone();
    dx.position.x = totale / 2 + 0.35;
    const traversa = new THREE.Mesh(
      new THREE.BoxGeometry(totale + 1.1, 0.2, 0.2),
      matTraversa
    );
    traversa.position.set(0, 3.55, 0);
    const badge = new THREE.Mesh(
      new THREE.PlaneGeometry(0.95, 0.95),
      new THREE.MeshBasicMaterial({ map: texturePunto(), transparent: true, toneMapped: false })
    );
    badge.position.set(0, 3.55, 0.14);
    gruppo.add(sx, dx, traversa, badge);

    gruppo.position.set(0, 0, START_Z);
    this.mondo.add(gruppo);

    const c: Cancello = {
      gruppo,
      porte,
      materiali,
      etichette: labels,
      arrived: false,
      enabled: false,
      uscita: false,
      onArrive: null,
      onPick: null,
      scosso: 0
    };
    this.cancello = c;
    this.errori = 0;
    this.bersaglio = this.animato ? 480 : 0;
    if (!this.animato) {
      c.gruppo.position.z = STOP_Z;
      c.arrived = true;
      c.enabled = true;
      this.bersaglio = 0;
      queueMicrotask(() => c.onArrive?.());
    }

    return {
      onArrive: (cb) => {
        c.onArrive = cb;
        if (c.arrived) cb();
      },
      onPick: (cb) => {
        c.onPick = cb;
      },
      markCorrect: (i) => this.segno(i, true),
      markWrong: (i) => this.segno(i, false),
      reset: () => this.resetSegni(),
      reveal: (correct) => {
        c.enabled = false;
        c.materiali.forEach((m, i) => {
          if (i === correct) m.color.set(0x9df0b8);
          else {
            m.color.set(0xd8dce6);
            m.opacity = 0.55;
          }
        });
      },
      lock: () => {
        c.enabled = false;
      },
      dispose: () => this.chiudiCancello()
    };
  }

  // ── Cancello: risposta, uscita, pulizia ───────────────────────

  private scegli(i: number): void {
    const c = this.cancello;
    if (!c || !c.arrived || !c.enabled || c.uscita) return;
    c.onPick?.(i);
  }

  private segno(i: number, giusto: boolean): void {
    const c = this.cancello;
    if (!c) return;
    c.enabled = false;
    c.materiali.forEach((m, j) => {
      if (j === i) {
        m.color.set(giusto ? 0x9df0b8 : 0xffb3b3);
        m.opacity = 1;
      } else {
        m.color.set(0xd8dce6);
        m.opacity = 0.55;
      }
    });
    if (!giusto) {
      this.errori += 1;
      c.scosso = 0.32;
      this.stumble();
      return;
    }
    // salto verso la porta scelta, stelline, cancello che esce
    const p = c.porte[i];
    const px = p ? p.position.x : 0;
    this.salta(px * 0.62, 0.72);
    this.stelline(c.gruppo.position.x + px, 2.45, c.gruppo.position.z + (p?.position.z ?? 0));
    this.setSpeed(560);
    c.uscita = true;
    const partenza = c.gruppo.position.x;
    const t0 = performance.now();
    const esci = (): void => {
      if (!this.cancello || this.cancello !== c) return;
      const k = Math.min(1, (performance.now() - t0) / 520);
      c.gruppo.position.x = partenza - k * 16;
      c.materiali.forEach((m) => {
        m.opacity = 1 - k;
      });
      if (k < 1) requestAnimationFrame(esci);
      else this.chiudiCancello();
    };
    requestAnimationFrame(esci);
  }

  private resetSegni(): void {
    const c = this.cancello;
    if (!c) return;
    c.materiali.forEach((m) => {
      m.color.set(0xffffff);
      m.opacity = 1;
    });
    c.enabled = true;
  }

  private chiudiCancello(): void {
    const c = this.cancello;
    if (!c) return;
    this.cancello = null;
    this.mondo.remove(c.gruppo);
    c.gruppo.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) {
        const conMappa = mat as THREE.MeshBasicMaterial;
        if (conMappa.map) conMappa.map.dispose();
        mat.dispose();
      }
    });
  }

  // ── Animazioni ─────────────────────────────────────────────────

  private salta(x: number, dur: number): void {
    this.saltoT = 0;
    this.saltoX = x;
    this.saltoDur = dur;
  }

  private stelline(x: number, y: number, z: number): void {
    const geo = new THREE.SphereGeometry(0.1, 8, 6);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffe066 });
    for (let i = 0; i < 8; i++) {
      const ang = (Math.PI * 2 * i) / 8;
      const mesh = new THREE.Mesh(geo, mat.clone());
      mesh.position.set(x, y, z + 0.2);
      this.mondo.add(mesh);
      this.stelle.push({
        mesh,
        vx: Math.cos(ang) * 2.2,
        vy: Math.sin(ang) * 2.2 + 0.8,
        vz: 0.6,
        vita: 0.7
      });
    }
  }

  private polvereNuova(): void {
    if (this.polvere.length > 14) return;
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.09 + this.caso() * 0.06, 6, 5),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
    );
    mesh.position.set((this.caso() - 0.5) * 0.5, 0.15, 0.6);
    this.mondo.add(mesh);
    this.polvere.push({ mesh, vita: 0.45 });
  }

  // ── Ciclo ──────────────────────────────────────────────────────

  /**
   * Il 3D copre tutto lo schermo, non solo il rettangolo 16:9 di Phaser: su
   * telefono in orizzontale (più largo di 16:9) così non restano bande vuote.
   * L'interfaccia Phaser resta centrata sopra.
   */
  private sincronizza(): void {
    const vw = Math.max(1, window.innerWidth);
    const vh = Math.max(1, window.innerHeight);
    const chiave = `${vw}x${vh}`;
    if (chiave === this.ultimoSync) return;
    this.ultimoSync = chiave;
    this.canvas.style.left = '0px';
    this.canvas.style.top = '0px';
    this.canvas.style.width = `${vw}px`;
    this.canvas.style.height = `${vh}px`;
    this.renderer.setSize(vw, vh, false);
    this.camera.aspect = vw / vh;
    this.camera.updateProjectionMatrix();
  }

  private aggiorna = (_t: number, deltaMs: number): void => {
    const dt = Math.min(deltaMs, 50) / 1000;
    this.tempo += dt;
    this.sincronizza();

    // velocità con accelerazione e frenata morbide
    if (this.spinta > 0) this.spinta -= dt;
    const desiderata = this.spinta > 0 ? Math.max(this.bersaglio, 560) : this.bersaglio;
    if (!this.animato) this.velocita = 0;
    else if (this.velocita < desiderata) this.velocita = Math.min(desiderata, this.velocita + 1800 * dt);
    else this.velocita = Math.max(desiderata, this.velocita - 2600 * dt);

    const corsa = this.velocita > 8;
    const spostamento = this.velocita * dt * SCALA;

    // pista
    this.pistaTex.offset.y = (this.pistaTex.offset.y - spostamento / 8.4) % 1;
    this.cordoloTex.offset.y = (this.cordoloTex.offset.y - spostamento / 5.5) % 1;
    // oggetti di bordo
    for (const p of this.props) {
      p.z += spostamento;
      if (p.z > 9) p.z -= 90;
      p.gruppo.position.z = p.z;
    }
    // nuvole
    for (const n of this.nuvole) {
      n.position.x += dt * 0.25;
      if (n.position.x > 48) n.position.x = -48;
    }

    // Pico: corsa, salto, inciampo
    if (this.saltoT >= 0) {
      this.saltoT += dt;
      const k = Math.min(1, this.saltoT / this.saltoDur);
      this.pico.position.x = this.saltoX * Math.sin(k * Math.PI);
      this.pico.position.y = Math.sin(k * Math.PI) * 0.95;
      if (k >= 1) {
        this.saltoT = -1;
        this.pico.position.set(0, 0, 0);
      }
    } else {
      this.pico.position.x *= 0.82;
      this.pico.position.y = corsa ? Math.abs(Math.sin(this.tempo * 9)) * 0.07 : 0;
    }
    if (this.inciampoT > 0) {
      this.inciampoT -= dt;
      this.pico.rotation.z = Math.sin(this.inciampoT * 60) * 0.12;
      this.matGiallo.color.set(0xffb3b3);
    } else {
      this.pico.rotation.z = corsa ? Math.sin(this.tempo * 9) * 0.03 : 0;
      this.matGiallo.color.set(0xffe08a);
    }
    const passo = this.tempo * 9;
    this.braccioSx.rotation.x = corsa ? Math.sin(passo) * 0.8 : 0;
    this.braccioDx.rotation.x = corsa ? -Math.sin(passo) * 0.8 : 0;
    this.gambaSx.rotation.x = corsa ? -Math.sin(passo) * 0.7 : 0;
    this.gambaDx.rotation.x = corsa ? Math.sin(passo) * 0.7 : 0;
    this.corpo.rotation.z = corsa ? Math.sin(passo) * 0.03 : 0;

    if (corsa && this.tempo % 0.08 < dt) this.polvereNuova();
    for (let i = this.polvere.length - 1; i >= 0; i--) {
      const p = this.polvere[i];
      p.vita -= dt;
      p.mesh.position.z += dt * 1.6;
      p.mesh.position.y += dt * 0.25;
      const mat = p.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, p.vita / 0.45) * 0.55;
      if (p.vita <= 0) {
        this.mondo.remove(p.mesh);
        p.mesh.geometry.dispose();
        mat.dispose();
        this.polvere.splice(i, 1);
      }
    }

    // camera in terza persona: segue Pico con un piccolo ritardo
    this.camera.position.x += (this.pico.position.x * 0.35 - this.camera.position.x) * Math.min(1, dt * 5);
    this.camera.position.y = 3.4 + (corsa ? Math.sin(this.tempo * 9) * 0.03 : 0);
    this.camera.lookAt(this.pico.position.x * 0.3, 1.35, -9);

    // cancello: avvicinamento, frenata, arrivo
    const c = this.cancello;
    if (c && !c.arrived && !c.uscita) {
      const distanza = Math.max(0, STOP_Z - c.gruppo.position.z);
      const frenata = Math.sqrt(2 * 3.2 * distanza) / SCALA;
      this.bersaglio = Math.min(480, frenata);
      c.gruppo.position.z += this.velocita * dt * SCALA;
      if (c.gruppo.position.z >= STOP_Z) {
        c.gruppo.position.z = STOP_Z;
        c.arrived = true;
        c.enabled = true;
        this.bersaglio = 0;
        c.onArrive?.();
      }
    }
    if (c && c.scosso > 0) {
      c.scosso -= dt;
      c.gruppo.position.x = Math.sin(c.scosso * 90) * 0.12;
      if (c.scosso <= 0) c.gruppo.position.x = 0;
    }

    // stelline
    for (let i = this.stelle.length - 1; i >= 0; i--) {
      const s = this.stelle[i];
      s.vita -= dt;
      s.vy -= dt * 3.2;
      s.mesh.position.x += s.vx * dt;
      s.mesh.position.y += s.vy * dt;
      s.mesh.position.z += s.vz * dt;
      const mat = s.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, s.vita / 0.7);
      if (s.vita <= 0) {
        this.mondo.remove(s.mesh);
        s.mesh.geometry.dispose();
        mat.dispose();
        this.stelle.splice(i, 1);
      }
    }

    // stato per i test
    stato = {
      attivo: true,
      pronta: true,
      cancello: c ? Math.max(0, STOP_Z - c.gruppo.position.z) : null,
      arrivato: Boolean(c?.arrived),
      velocita: this.velocita,
      pannelli: [],
      etichette: c ? c.etichette : [],
      errori: this.errori,
      pick: (i: number) => this.scegli(i)
    };

    this.renderer.render(this.mondo, this.camera);
  };

  // ── Pulizia ────────────────────────────────────────────────────

  private distruggi = (): void => {
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.aggiorna);
    this.scene.events.off(Phaser.Scenes.Events.SHUTDOWN, this.distruggi);
    window.removeEventListener('resize', this.onResize);
    this.chiudiCancello();
    this.mondo.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) {
        const conMappa = mat as THREE.MeshBasicMaterial;
        if (conMappa.map) conMappa.map.dispose();
        mat.dispose();
      }
    });
    this.renderer.dispose();
    this.canvas.remove();
    document.body.classList.remove('con-3d');
    stato = VUOTO;
  };

  destroy(): void {
    this.distruggi();
  }
}

/** Crea il mondo 3D per la scena di gioco. */
export function add3DWorld(
  scene: Phaser.Scene,
  theme: ThemeKey,
  cfg: EffectiveConfig,
  speed: number
): World3D {
  return new Mondo3D(scene, theme, cfg, speed);
}
