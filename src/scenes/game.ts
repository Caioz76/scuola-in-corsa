import Phaser from 'phaser';
import { getMateria, getLevel, setLevel } from './shared';
import { showChallenge, type Challenge } from '../challenges/index';
import { allPacks } from '../content/packs';
import type { Round } from '../content/types';
import type { RoundOutcome } from '../core/state';
import { showBanner, makeText, makeButton } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { addWorld, themeFor } from '../art/world';
import { add3DWorld } from '../art/three-world';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create(): void {
    const impostazioni = loadSettings();
    const cfg = resolveConfig(impostazioni);
    const mode = impostazioni.mode ?? 'quiz';
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
      color: '#5f7186'
    });

    // Il mondo: scenografia della materia, pista e Pico che corre.
    // I checkpoint in basso sono le prove della tappa.
    // In modalità Runner è un side-scroller: Pico corre di profilo, il mondo
    // scorre e i cartelli arrivano da destra. In Quiz Pico avanza da solo.
    // Con la grafica 3D il mondo è Three.js (terza persona); l'interfaccia
    // delle prove resta Phaser, sopra.
    const runner = mode === 'runner';
    const treD = (impostazioni.graphics ?? '2d') === '3d' && !cfg.highContrast;
    const world = treD
      ? add3DWorld(this, themeFor(pack.subject), cfg, runner ? 480 : 38)
      : addWorld(this, themeFor(pack.subject), cfg, {
          track: true,
          speed: runner ? 480 : 38,
          advance: !runner,
          sidePico: runner,
          picoX: runner ? 110 : 66,
          props: runner
        });
    world.setProgress(0, level.rounds.length);

    // Progresso esplicito: "Prova 2 di 6". Solo quando il profilo lo chiede.
    const contatore = makeText(this, 888, 26, '', cfg, { size: 14, color: '#1f8a4c' });

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
    const inizio = Date.now();
    const outcomes: RoundOutcome[] = [];

    const next = (): void => {
      if (current) {
        current.dispose();
        current = null;
      }
      if (index >= level.rounds.length) {
        this.scene.start('Results', {
          packId: pack.packId,
          levelId: level.id,
          correct,
          total: level.rounds.length,
          durationMs: Date.now() - inizio,
          outcomes
        });
        return;
      }
      if (cfg.clearProgress) {
        contatore.setText(`Prova ${index + 1} di ${level.rounds.length}`);
      }
      const round: Round = level.rounds[index];
      const scelta = round.type === 'quiz' || round.type === 'image';
      // In Runner il mondo si ferma per le prove che non sono una corsa
      // (riordino, abbinamento): lì si tocca e si trascina, non si corre.
      if (runner) world.setSpeed(scelta ? 480 : 0);
      // Le prove a opzioni hanno i bottoni in basso: il feedback va sopra.
      const bannerY = scelta ? 186 : 468;
      let errori = 0;
      current = showChallenge(this, round, cfg, {
        onCorrect: () => {
          correct += 1;
          index += 1;
          outcomes.push({ roundId: round.id, correct: true, attempts: errori, timeMs: 0 });
          if (runner) world.setSpeed(560);
          else world.dash();
          world.setProgress(index, level.rounds.length);
          const ok = showBanner(this, cfg, 'Giusto!', null, 'ok', { y: bannerY });
          this.time.delayedCall(900 * ritmo, () => {
            ok.dispose();
            next();
          });
        },
        onWrong: (attempts) => {
          errori += 1;
          const no = showBanner(
            this,
            cfg,
            'Riprova',
            attempts >= 2 ? 'Guarda bene le opzioni.' : null,
            'bad',
            { y: bannerY }
          );
          this.time.delayedCall(900 * ritmo, () => no.dispose());
          // 3 errori: la prova rivela la risposta, poi si prosegue (mai bloccarsi)
          if (attempts >= 3) {
            index += 1;
            outcomes.push({ roundId: round.id, correct: false, attempts: errori, timeMs: 0 });
            world.stumble();
            world.setProgress(index, level.rounds.length);
            this.time.delayedCall(2600 * ritmo, () => next());
          }
        }
      }, { mode, world });
    };

    next();
  }
}
