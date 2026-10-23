import Phaser from 'phaser';
import { makeText, makeButton } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { setStars } from '../core/progress';

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

    const xs = [512 - 120, 512, 512 + 120];
    xs.forEach((x, i) => {
      const star = this.add.image(x, 260, 'star').setScale(1.8);
      if (i >= stelle) {
        star.setAlpha(0.2);
      }
    });

    const rigioca = makeButton(this, cfg, 512, 400, 'Rigioca');
    rigioca.onTap(() => this.scene.start('Game'));

    const titolo = makeButton(this, cfg, 512, 490, 'Torna al titolo');
    titolo.onTap(() => this.scene.start('Title'));
  }
}
