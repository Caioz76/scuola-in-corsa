import Phaser from 'phaser';
import { getMateria } from './shared';
import { showChallenge, type Challenge } from '../challenges/index';
import { allPacks } from '../content/packs';
import type { Round } from '../content/types';
import { showBanner, makeText } from '../challenges/ui';
import { resolveConfig, DEFAULT_SETTINGS } from '../bes/resolver';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create(): void {
    const cfg = resolveConfig(DEFAULT_SETTINGS);
    const pack = allPacks().find((p) => p.subject === getMateria());
    const level = pack?.levels[0];

    if (!pack || !level || level.rounds.length === 0) {
      const banner = showBanner(this, cfg, 'Nessuna prova disponibile', "Torna al titolo e scegli un'altra materia.", 'bad');
      this.time.delayedCall(2200, () => {
        banner.dispose();
        this.scene.start('Title');
      });
      return;
    }

    makeText(this, 512, 26, `${pack.title} — ${level.title}`, cfg, {
      size: 16,
      color: '#b8c4e0'
    });

    let index = 0;
    let correct = 0;
    let current: Challenge | null = null;

    const next = (): void => {
      if (current) {
        current.dispose();
        current = null;
      }
      if (index >= level.rounds.length) {
        const banner = showBanner(
          this,
          cfg,
          `Tappa completata: ${correct} su ${level.rounds.length}`,
          null,
          'ok'
        );
        this.time.delayedCall(2500, () => {
          banner.dispose();
          this.scene.start('Title');
        });
        return;
      }
      const round: Round = level.rounds[index];
      current = showChallenge(this, round, cfg, {
        onCorrect: () => {
          correct += 1;
          index += 1;
          const ok = showBanner(this, cfg, 'Giusto!', null, 'ok');
          this.time.delayedCall(900, () => {
            ok.dispose();
            next();
          });
        },
        onWrong: (attempts) => {
          const no = showBanner(
            this,
            cfg,
            'Riprova',
            attempts >= 2 ? 'Guarda bene le opzioni.' : null,
            'bad'
          );
          this.time.delayedCall(900, () => no.dispose());
        }
      });
    };

    next();
  }
}
