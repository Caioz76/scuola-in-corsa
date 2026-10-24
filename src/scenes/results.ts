import Phaser from 'phaser';
import { makeText, makeButton } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { setStars } from '../core/progress';
import { allPacks } from '../content/packs';
import { setLevel } from './shared';

export class ResultsScene extends Phaser.Scene {
  constructor() {
    super('Results');
  }

  create(data: { packId: string; levelId: string; correct: number; total: number }): void {
    const cfg = resolveConfig(loadSettings());
    const { packId, levelId, correct, total } = data;

    makeText(this, 512, 90, 'Tappa completata!', cfg, {
      size: 40,
      bold: true,
      color: '#ffd93d',
      outline: true
    });

    makeText(this, 512, 170, `${correct} su ${total}`, cfg, {
      size: 28,
      color: '#ffffff'
    });

    const stelle =
      correct === total
        ? 3
        : correct >= (total * 2) / 3
          ? 2
          : correct >= 1
            ? 1
            : 0;

    setStars(packId, levelId, stelle);
    setLevel(levelId);

    const pack = allPacks().find((p) => p.packId === packId);
    const idx = pack?.levels.findIndex((l) => l.id === levelId) ?? -1;
    const prossima = idx >= 0 ? pack?.levels[idx + 1] : undefined;

    if (pack && idx >= 0) {
      makeText(this, 512, 322, pack.levels[idx].title, cfg, { size: 15, color: '#b8c4e0' });
    }

    const xs = [512 - 120, 512, 512 + 120];
    xs.forEach((x, i) => {
      const star = this.add.image(x, 260, 'star').setScale(1.8);
      if (i >= stelle) {
        star.setAlpha(0.2);
      }
    });

    const rigioca = makeButton(this, cfg, 392, prossima ? 475 : 470, 'Rigioca', {
      scale: prossima ? 0.78 : 0.82
    });
    rigioca.onTap(() => this.scene.start('Game'));

    if (prossima) {
      const avanti = makeButton(this, cfg, 512, 390, 'Tappa successiva', { scale: 0.9 });
      avanti.onTap(() => {
        setLevel(prossima.id);
        this.scene.start('Game');
      });
    }

    const titolo = makeButton(this, cfg, 632, prossima ? 475 : 470, 'Torna al titolo', {
      scale: prossima ? 0.78 : 0.82
    });
    titolo.onTap(() => this.scene.start('Title'));
  }
}
