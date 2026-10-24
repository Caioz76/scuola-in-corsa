import Phaser from 'phaser';
import { GAME_NAME } from '../core/constants';
import { makeButton, makeText } from '../challenges/ui';
import { ANNO_BY_ID, resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { addWorld } from '../art/world';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create(): void {
    const settings = loadSettings();
    const cfg = resolveConfig(settings);
    const w = this.scale.gameSize.width;
    const h = this.scale.gameSize.height;

    addWorld(this, 'scuola', cfg, { speed: 58 });

    const scenografia = cfg.decoration && !cfg.highContrast;
    const animato = scenografia && cfg.motion !== 'off';

    // ── Pannello centrale "Hero" e badge decorativi ──
    const card = this.add.graphics().setDepth(2);
    if (scenografia) {
      // Ombra morbida stratificata stile Wii
      card.fillStyle(0x2b4c6f, 0.12);
      card.fillRoundedRect(w / 2 - 314, 96, 628, 404, 32);
      card.fillStyle(0x2b4c6f, 0.07);
      card.fillRoundedRect(w / 2 - 308, 92, 616, 404, 30);

      // Corpo principale avorio/bianco semitrasparente
      card.fillStyle(0xffffff, 0.84);
      card.fillRoundedRect(w / 2 - 306, 88, 612, 398, 28);

      // Fascia luminosa superiore (effetto glossy)
      card.fillStyle(0xeaf6ff, 0.72);
      card.fillRoundedRect(w / 2 - 294, 98, 588, 118, 22);
      card.fillStyle(0xffffff, 0.65);
      card.fillRoundedRect(w / 2 - 282, 102, 564, 36, 16);

      // Doppia cornice luminosa
      card.lineStyle(3, 0x8fd0ff, 0.65);
      card.strokeRoundedRect(w / 2 - 306, 88, 612, 398, 28);
      card.lineStyle(1.5, 0xffffff, 0.95);
      card.strokeRoundedRect(w / 2 - 301, 93, 602, 388, 25);

      // Pillola informativa sotto il sottotitolo
      card.fillStyle(0xeaf4ff, 0.95);
      card.fillRoundedRect(w / 2 - 210, h / 2 - 32, 420, 34, 17);
      card.lineStyle(1.5, 0x93d2f7, 0.85);
      card.strokeRoundedRect(w / 2 - 210, h / 2 - 32, 420, 34, 17);

      // Badge delle 4 materie ai lati della card
      const badges: Array<{ icon: string; x: number; y: number; ring: number; bg: number }> = [
        { icon: 'icon-abaco', x: 116, y: 184, ring: 0x66b8f2, bg: 0xeaf6ff },
        { icon: 'icon-pergamena', x: 908, y: 184, ring: 0xffa45c, bg: 0xfff5eb },
        { icon: 'icon-sole', x: 102, y: 324, ring: 0x6fcf8f, bg: 0xebfaef },
        { icon: 'icon-corona', x: 922, y: 324, ring: 0xb3a0f5, bg: 0xf3f0ff }
      ];

      badges.forEach((b, idx) => {
        const g = this.add.graphics().setDepth(3);
        g.fillStyle(0x3b4a5a, 0.14);
        g.fillCircle(b.x, b.y + 4, 38);
        g.fillStyle(0xffffff, 0.95);
        g.fillCircle(b.x, b.y, 37);
        g.fillStyle(b.bg, 0.9);
        g.fillCircle(b.x, b.y, 31);
        g.lineStyle(2.5, b.ring, 0.85);
        g.strokeCircle(b.x, b.y, 35);

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
      outline: true
    }).setDepth(5);

    makeText(this, w / 2, h / 2 - 60, 'Scegli la materia e corri!', cfg, {
      size: 21,
      bold: true,
      color: '#5f7186'
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
        color: '#2b6cb0'
      }
    ).setDepth(5);

    const gioca = makeButton(this, cfg, w / 2, h / 2 + 70, 'Gioca', { depth: 10 });
    gioca.onTap(() => this.scene.start('Subject'));

    const impostazioni = makeButton(this, cfg, w / 2, h / 2 + 170, 'Impostazioni', {
      scale: 0.62,
      depth: 10
    });
    impostazioni.onTap(() => this.scene.start('Settings'));

    const progressi = makeButton(this, cfg, 872, 44, 'Progressi', { scale: 0.55, depth: 10 });
    progressi.onTap(() => this.scene.start('Progress'));

    makeText(
      this,
      w / 2,
      558,
      '© Claudio Borsotti · Applicazione in fase di sviluppo',
      cfg,
      {
        size: 12,
        color: '#3b4a5a',
        outline: true
      }
    ).setDepth(5);
  }
}
