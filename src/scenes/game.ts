import Phaser from 'phaser';
import { getMateria, getLevel, setLevel } from './shared';
import { showChallenge, type Challenge } from '../challenges/index';
import { allPacks } from '../content/packs';
import type { Round } from '../content/types';
import { showBanner, makeText, makeButton } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create(): void {
    const cfg = resolveConfig(loadSettings());
    const pack = allPacks().find((p) => p.subject === getMateria());
    const level = pack?.levels.find((l) => l.id === getLevel()) ?? pack?.levels[0];

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

    // Progresso esplicito: "Prova 2 di 6". Solo quando il profilo lo chiede.
    const contatore = makeText(this, 888, 26, '', cfg, { size: 14, color: '#8fe3b0' });

    // Pausa: utile a chi ha bisogno di fermarsi senza perdere il punto.
    if (cfg.pauseAllowed) {
      const pausa = makeButton(this, cfg, 72, 40, 'Pausa', { scale: 0.5, depth: 20 });
      pausa.onTap(() => {
        this.scene.launch('Pause');
        this.scene.pause();
      });
    }

    // Con "slowPace" i feedback restano più a lungo sullo schermo.
    const ritmo = cfg.slowPace ? 1.6 : 1;

    let index = 0;
    let correct = 0;
    let current: Challenge | null = null;

    const next = (): void => {
      if (current) {
        current.dispose();
        current = null;
      }
      if (index >= level.rounds.length) {
        this.scene.start('Results', { packId: pack.packId, levelId: level.id, correct, total: level.rounds.length });
        return;
      }
      if (cfg.clearProgress) {
        contatore.setText(`Prova ${index + 1} di ${level.rounds.length}`);
      }
      const round: Round = level.rounds[index];
      current = showChallenge(this, round, cfg, {
        onCorrect: () => {
          correct += 1;
          index += 1;
          const ok = showBanner(this, cfg, 'Giusto!', null, 'ok');
          this.time.delayedCall(900 * ritmo, () => {
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
          this.time.delayedCall(900 * ritmo, () => no.dispose());
          // 3 errori: la prova rivela la risposta, poi si prosegue (mai bloccarsi)
          if (attempts >= 3) {
            index += 1;
            this.time.delayedCall(2600 * ritmo, () => next());
          }
        }
      });
    };

    next();
  }
}
