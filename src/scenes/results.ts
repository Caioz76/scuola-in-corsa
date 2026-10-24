import Phaser from 'phaser';
import { makeText, makeButton } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { setStars, pushResult } from '../core/progress';
import { allPacks } from '../content/packs';
import { setLevel } from './shared';
import type { RoundOutcome } from '../core/state';
import { addWorld, themeFor } from '../art/world';

export class ResultsScene extends Phaser.Scene {
  constructor() {
    super('Results');
  }

  create(data: {
    packId: string;
    levelId: string;
    correct: number;
    total: number;
    durationMs?: number;
    outcomes?: RoundOutcome[];
  }): void {
    const cfg = resolveConfig(loadSettings());
    const { packId, levelId, correct, total } = data;

    makeText(this, 512, 90, 'Tappa completata!', cfg, {
      size: 40,
      bold: true,
      color: '#1d6fb8',
      outline: true
    });

    makeText(this, 512, 170, `${correct} su ${total}`, cfg, {
      size: 28,
      color: '#2f3b4c'
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

    // Storico per l'insegnante (max 200 partite, vedi core/progress.ts).
    pushResult({
      packId,
      levelId,
      total,
      correct,
      scorePct: total > 0 ? Math.round((correct / total) * 100) : 0,
      durationMs: data.durationMs ?? 0,
      profileId: cfg.profileId,
      outcomes: data.outcomes ?? [],
      finishedAt: Date.now()
    });

    const pack = allPacks().find((p) => p.packId === packId);
    const idx = pack?.levels.findIndex((l) => l.id === levelId) ?? -1;
    const prossima = idx >= 0 ? pack?.levels[idx + 1] : undefined;

    // Traguardo: Pico esulta, la pista è tutta accesa.
    const world = addWorld(this, themeFor(pack?.subject), cfg, { pico: 'cheer', track: true, speed: 28 });
    world.setProgress(total, total);

    if (pack && idx >= 0) {
      makeText(this, 512, 322, pack.levels[idx].title, cfg, { size: 15, color: '#5f7186' });
    }

    const xs = [512 - 130, 512, 512 + 130];
    xs.forEach((x, i) => {
      const star = this.add.image(x, 260, 'star').setScale(1.8);
      if (i >= stelle) {
        star.setAlpha(0.2);
      }
    });

    const rigioca = makeButton(this, cfg, 376, prossima ? 475 : 470, 'Rigioca', {
      scale: prossima ? 0.76 : 0.8
    });
    rigioca.onTap(() => this.scene.start('Game'));

    if (prossima) {
      const avanti = makeButton(this, cfg, 512, 390, 'Tappa successiva', { scale: 0.9 });
      avanti.onTap(() => {
        setLevel(prossima.id);
        this.scene.start('Game');
      });
    }

    const titolo = makeButton(this, cfg, 648, prossima ? 475 : 470, 'Torna al titolo', {
      scale: prossima ? 0.76 : 0.8
    });
    titolo.onTap(() => this.scene.start('Title'));
  }
}
