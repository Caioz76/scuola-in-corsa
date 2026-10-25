import Phaser from 'phaser';
import { GAME_NAME } from '../core/constants';
import { makeButton, makeText } from '../challenges/ui';
import { ANNO_BY_ID, resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { addWorld } from '../art/world';
import { add3DWorld } from '../art/three-world';
import { toggleFullscreen } from '../ui/fullscreen';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create(): void {
    const settings = loadSettings();
    const cfg = resolveConfig(settings);
    const w = this.scale.gameSize.width;
    const h = this.scale.gameSize.height;

    const treD = (settings.graphics ?? '2d') === '3d' && !cfg.highContrast;
    if (treD) {
      add3DWorld(this, 'scuola', cfg, 48);
    } else {
      addWorld(this, 'scuola', cfg, { speed: 58 });
    }

    const scenografia = cfg.decoration && !cfg.highContrast;
    const animato = scenografia && cfg.motion !== 'off';

    // ── Pannello centrale "Hero" in stile Edu Sports Arena ──
    const card = this.add.graphics().setDepth(2);
    if (scenografia) {
      // Ombra morbida stratificata stile console Sport
      card.fillStyle(0x005b8f, 0.15);
      card.fillRoundedRect(w / 2 - 318, 92, 636, 412, 34);
      card.fillStyle(0x005b8f, 0.08);
      card.fillRoundedRect(w / 2 - 312, 88, 624, 410, 32);

      // Corpo principale bianco porcellana Sport
      card.fillStyle(0xffffff, 0.9);
      card.fillRoundedRect(w / 2 - 308, 84, 616, 404, 30);

      // Scanline orizzontali tipiche del menu Sport Console
      card.fillStyle(0x00a2e8, 0.038);
      for (let sy = 98; sy < 476; sy += 6) {
        card.fillRect(w / 2 - 294, sy, 588, 2);
      }

      // Fascia luminosa superiore (effetto glossy Sport)
      card.fillStyle(0xe6f5ff, 0.88);
      card.fillRoundedRect(w / 2 - 296, 94, 592, 122, 24);
      card.fillStyle(0xffffff, 0.78);
      card.fillRoundedRect(w / 2 - 284, 98, 568, 42, 18);

      // Swoosh sportivi diagonali Azzurro Sport (#00a2e8) e Arancio Sport (#ff9f1c)
      card.fillStyle(0x00a2e8, 0.22);
      card.fillTriangle(w / 2 - 294, 96, w / 2 - 196, 96, w / 2 - 294, 168);
      card.fillStyle(0xff9f1c, 0.24);
      card.fillTriangle(w / 2 + 294, 96, w / 2 + 196, 96, w / 2 + 294, 168);

      // Filetto divisorio Azzurro Sport sotto il titolo
      card.lineStyle(2.5, 0x00a2e8, 0.55);
      card.lineBetween(w / 2 - 240, 216, w / 2 + 240, 216);

      // Doppia cornice luminosa Azzurro Sport (#00a2e8) + bianco speculare
      card.lineStyle(3.5, 0x00a2e8, 0.85);
      card.strokeRoundedRect(w / 2 - 308, 84, 616, 404, 30);
      card.lineStyle(2, 0xffffff, 0.98);
      card.strokeRoundedRect(w / 2 - 303, 89, 606, 394, 27);

      // Pillola informativa stile canale Sport sotto il sottotitolo
      card.fillStyle(0xe8f6ff, 0.98);
      card.fillRoundedRect(w / 2 - 244, h / 2 - 32, 488, 34, 17);
      card.lineStyle(2, 0x00a2e8, 0.85);
      card.strokeRoundedRect(w / 2 - 244, h / 2 - 32, 488, 34, 17);

      // Badge delle 4 materie ai lati della card (medaglioni lucidi Sport)
      const badges: Array<{ icon: string; x: number; y: number; ring: number; bg: number }> = [
        { icon: 'icon-abaco', x: 116, y: 184, ring: 0x00a2e8, bg: 0xe6f6ff },
        { icon: 'icon-pergamena', x: 908, y: 184, ring: 0xff9f1c, bg: 0xfff5e6 },
        { icon: 'icon-sole', x: 102, y: 324, ring: 0x26c266, bg: 0xe8faef },
        { icon: 'icon-corona', x: 922, y: 324, ring: 0x7d68d8, bg: 0xf2eeff }
      ];

      badges.forEach((b, idx) => {
        const g = this.add.graphics().setDepth(3);
        g.fillStyle(0x005b8f, 0.16);
        g.fillCircle(b.x, b.y + 4, 40);
        g.fillStyle(0xffffff, 0.98);
        g.fillCircle(b.x, b.y, 38);
        g.fillStyle(b.bg, 0.92);
        g.fillCircle(b.x, b.y, 32);
        g.lineStyle(3, b.ring, 0.92);
        g.strokeCircle(b.x, b.y, 36);
        // Riflesso superiore a mezzaluna
        g.fillStyle(0xffffff, 0.65);
        g.fillEllipse(b.x, b.y - 16, 36, 14);

        const ic = this.add.image(b.x, b.y, b.icon).setScale(0.52).setDepth(4);
        if (animato) {
          this.tweens.add({
            targets: [g, ic],
            y: '-=7',
            duration: 1500 + idx * 190,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        }
      });

      // Stelline decorative attorno al titolo
      const stars: Array<{ x: number; y: number; s: number; a: number }> = [
        { x: w / 2 - 252, y: 146, s: 0.48, a: -0.18 },
        { x: w / 2 + 252, y: 146, s: 0.48, a: 0.18 },
        { x: w / 2 - 224, y: 214, s: 0.34, a: 0.12 },
        { x: w / 2 + 224, y: 214, s: 0.34, a: -0.12 }
      ];
      stars.forEach((st, idx) => {
        const starImg = this.add
          .image(st.x, st.y, 'star')
          .setScale(st.s)
          .setRotation(st.a)
          .setDepth(4);
        if (animato) {
          this.tweens.add({
            targets: starImg,
            scale: st.s * 1.16,
            duration: 1200 + idx * 160,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        }
      });
    } else if (cfg.highContrast) {
      card.fillStyle(0xffffff, 1);
      card.fillRoundedRect(w / 2 - 306, 88, 612, 398, 20);
      card.lineStyle(3, 0x000000, 1);
      card.strokeRoundedRect(w / 2 - 306, 88, 612, 398, 20);
    }

    makeText(this, w / 2, h / 2 - 124, GAME_NAME, cfg, {
      size: 50,
      bold: true,
      color: '#1d6fb8',
      wrap: 560,
      maxH: 58,
      outline: true
    }).setDepth(5);

    makeText(this, w / 2, h / 2 - 60, 'Scegli la materia e corri!', cfg, {
      size: 21,
      bold: true,
      color: '#5f7186',
      wrap: 540,
      maxH: 30
    }).setDepth(5);

    const infoAnno = ANNO_BY_ID.get(cfg.schoolYear);
    const labelAnno = infoAnno ? infoAnno.label : cfg.schoolYear;
    const modeLabel = settings.mode === 'runner' ? 'Runner' : 'Quiz';
    const graficaLabel = (settings.graphics === '3d' ? '3d' : '2d').toUpperCase();
    makeText(
      this,
      w / 2,
      h / 2 - 15,
      `Classe: ${labelAnno}  ·  Modalità: ${modeLabel} ${graficaLabel}`,
      cfg,
      {
        size: 14,
        bold: true,
        color: '#2b6cb0',
        wrap: 468,
        maxH: 24
      }
    ).setDepth(5);

    const gioca = makeButton(this, cfg, w / 2, h / 2 + 70, 'Gioca', {
      maxTargetScale: 1.08,
      depth: 10
    });
    gioca.onTap(() => this.scene.start('Subject'));

    const impostazioni = makeButton(this, cfg, w / 2, h / 2 + 170, 'Impostazioni', {
      scale: 0.62,
      maxTargetScale: 1.05,
      depth: 10
    });
    impostazioni.onTap(() => this.scene.start('Settings'));

    const progressi = makeButton(this, cfg, 872, 44, 'Progressi', {
      scale: 0.55,
      maxTargetScale: 1.05,
      depth: 10
    });
    progressi.onTap(() => this.scene.start('Progress'));

    const schermoIntero = makeButton(this, cfg, 152, 44, 'Schermo intero', {
      scale: 0.55,
      maxTargetScale: 1.05,
      depth: 10
    });
    schermoIntero.onTap(() => {
      toggleFullscreen().catch(() => undefined);
    });

    makeText(
      this,
      w / 2,
      558,
      '© Claudio Borsotti · Applicazione in fase di sviluppo',
      cfg,
      {
        size: 12,
        color: '#3b4a5a',
        wrap: 620,
        maxH: 18,
        outline: true
      }
    ).setDepth(5);
  }
}
