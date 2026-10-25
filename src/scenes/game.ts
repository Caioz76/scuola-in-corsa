import Phaser from 'phaser';
import { getMateria, getLevel } from './shared';
import { showChallenge, type Challenge } from '../challenges/index';
import { allPacks, defaultLevelForYear, selectRoundsForGame } from '../content/packs';
import type { Round } from '../content/types';
import type { RoundOutcome } from '../core/state';
import { drawSportChannelFrame, showBanner, makeText } from '../challenges/ui';
import { ANNO_BY_ID, resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { addWorld, themeFor } from '../art/world';
import { add3DWorld } from '../art/three-world';
import { mostraNav, nascondiNav } from '../ui/nav';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create(): void {
    const impostazioni = loadSettings();
    const cfg = resolveConfig(impostazioni);
    const mode = impostazioni.mode ?? 'quiz';
    const pack = allPacks().find((p) => p.subject === getMateria());
    const level =
      pack?.levels.find((l) => l.id === getLevel()) ??
      (pack ? defaultLevelForYear(pack, cfg.schoolYear) : undefined);

    if (!pack || !level || level.rounds.length === 0) {
      const banner = showBanner(this, cfg, 'Nessuna prova disponibile', "Torna al titolo e scegli un'altra materia.", 'bad');
      this.time.delayedCall(2200, () => {
        banner.dispose();
        this.scene.start('Title');
      });
      return;
    }

    // Estrazione delle prove della partita (casuale dal bacino dell'anno scolastico,
    // oppure fissa se randomQuestions === false).
    const rounds = selectRoundsForGame(pack, level, impostazioni);
    const infoAnno = ANNO_BY_ID.get(cfg.schoolYear);

    // Il mondo: scenografia della materia, pista e Pico che corre.
    const runner = mode === 'runner';
    const runSpeed = cfg.runnerSpeed > 0 ? cfg.runnerSpeed : 480;
    const treD = (impostazioni.graphics ?? '2d') === '3d' && !cfg.highContrast;

    const w = this.scale.gameSize.width;

    // Barra superiore e quadro domanda in stile Sport (in 2D o capsula dedicata in 3D)
    if (!treD) {
      drawSportChannelFrame(this, cfg, { x: 96, y: 6, w: 832, h: 124, headerH: 34, depth: -10 });
    } else {
      // In 3D: capsula superiore dedicata su fondo chiaro per garantire massima leggibilità
      const pillBg = this.add.graphics().setDepth(90);
      pillBg.fillStyle(0xffffff, 0.95);
      pillBg.fillRoundedRect(96, 6, 832, 34, 17);
      pillBg.lineStyle(2, 0x00a2e8, 0.7);
      pillBg.strokeRoundedRect(96, 6, 832, 34, 17);
    }

    // Intestazione in alto: materia, tappa, livello scolastico e contatore prove.
    // Centrata nel monitor, in primo piano assoluto (depth: 100), solo testo nero (#000000).
    const testoTitolo = `${pack.title} — ${level.title}${infoAnno ? ` (${infoAnno.short})` : ''}`;

    makeText(this, w / 2, 23, testoTitolo, cfg, {
      size: 14,
      bold: true,
      color: '#000000',
      align: 'center',
      wrap: 580,
      maxH: 22,
      originX: 0.5,
      originY: 0.5
    }).setDepth(100);

    const contatore = makeText(this, 904, 23, '', cfg, {
      size: 13.5,
      bold: true,
      color: '#000000',
      align: 'right',
      wrap: 180,
      maxH: 22,
      originX: 1,
      originY: 0.5
    }).setDepth(100);

    const world = treD
      ? add3DWorld(this, themeFor(pack.subject), cfg, runner ? runSpeed : 38)
      : addWorld(this, themeFor(pack.subject), cfg, {
          track: true,
          speed: runner ? runSpeed : 38,
          advance: !runner,
          sidePico: runner,
          picoX: runner ? 110 : 66,
          props: runner
        });
    world.setProgress(0, rounds.length);

    // Regola BES `mascotGuide`: Pico accompagna lo studente passo per passo.
    const guidaPico = cfg.mascotGuide
      ? makeText(this, 248, 550, '', cfg, {
          size: 13,
          bold: true,
          color: '#1d6fb8',
          wrap: 420,
          maxH: 22,
          outline: true
        })
      : null;

    // ── Navigazione sempre disponibile ──────────────────────────────
    let inPausa = false;
    const azioni = {
      onPausa: () => apriPausa(false),
      onEsci: () => apriPausa(true)
    };
    const mostraBarra = (): void => mostraNav(azioni);
    const suRipresa = (): void => {
      inPausa = false;
      mostraBarra();
    };
    const apriPausa = (conferma: boolean): void => {
      if (inPausa) return;
      inPausa = true;
      nascondiNav();
      this.events.once(Phaser.Scenes.Events.RESUME, suRipresa);
      this.scene.launch('Pause', { conferma });
      this.scene.pause();
    };
    mostraBarra();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.events.off(Phaser.Scenes.Events.RESUME, suRipresa);
      nascondiNav();
    });

    // Tastiera: Esc e P aprono la pausa anche senza mouse.
    const tastiera = this.input.keyboard;
    const suPausa = (): void => apriPausa(false);
    tastiera?.on('keydown-ESC', suPausa);
    tastiera?.on('keydown-P', suPausa);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      tastiera?.off('keydown-ESC', suPausa);
      tastiera?.off('keydown-P', suPausa);
    });

    // Con "Pausa quando serve" il gioco si ferma da solo se il bambino esce
    // dalla pagina o cambia app: al ritorno ritrova la partita dov'era.
    const suVisibilita = (): void => {
      if (document.hidden) apriPausa(false);
    };
    if (cfg.pauseAllowed) document.addEventListener('visibilitychange', suVisibilita);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      document.removeEventListener('visibilitychange', suVisibilita);
    });

    // Con "slowPace" i feedback restano più a lungo sullo schermo.
    const ritmo = cfg.slowPace ? 1.6 : 1;

    let index = 0;
    let correct = 0;
    let current: Challenge | null = null;
    const inizio = Date.now();
    const outcomes: RoundOutcome[] = [];

    const testoGuidaPer = (round: Round): string => {
      if (round.type === 'quiz' || round.type === 'image') {
        return 'Pico: Scegli la risposta giusta!';
      }
      if (round.type === 'dragdrop' && round.mode === 'match') {
        return 'Pico: Tocca le coppie giuste!';
      }
      return 'Pico: Metti gli elementi in ordine!';
    };

    const next = (): void => {
      if (current) {
        current.dispose();
        current = null;
      }
      if (index >= rounds.length) {
        this.scene.start('Results', {
          packId: pack.packId,
          levelId: level.id,
          correct,
          total: rounds.length,
          durationMs: Date.now() - inizio,
          outcomes
        });
        return;
      }
      if (cfg.clearProgress) {
        contatore.setText(`Prova ${index + 1} di ${rounds.length}`);
      }
      const round: Round = rounds[index];
      guidaPico?.setText(testoGuidaPer(round));
      const scelta = round.type === 'quiz' || round.type === 'image';
      if (runner) world.setSpeed(scelta ? runSpeed : 0);
      const bannerY = scelta ? 186 : 468;
      let errori = 0;
      current = showChallenge(this, round, cfg, {
        onCorrect: () => {
          correct += 1;
          index += 1;
          outcomes.push({ roundId: round.id, correct: true, attempts: errori, timeMs: 0 });
          guidaPico?.setText('Pico: Bravissimo, avanti così!');
          if (runner) world.setSpeed(Math.max(560, runSpeed + 80));
          else world.dash();
          world.setProgress(index, rounds.length);
          const ok = showBanner(this, cfg, 'Giusto!', null, 'ok', { y: bannerY });
          this.time.delayedCall(900 * ritmo, () => {
            ok.dispose();
            next();
          });
        },
        onWrong: (attempts) => {
          errori += 1;
          guidaPico?.setText('Pico: Niente paura, riprova con calma!');
          const no = showBanner(
            this,
            cfg,
            'Riprova',
            attempts >= 2 ? 'Guarda bene le opzioni.' : null,
            'bad',
            { y: bannerY }
          );
          this.time.delayedCall(900 * ritmo, () => no.dispose());
          if (attempts >= 3) {
            index += 1;
            outcomes.push({ roundId: round.id, correct: false, attempts: errori, timeMs: 0 });
            world.stumble();
            world.setProgress(index, rounds.length);
            this.time.delayedCall(2600 * ritmo, () => next());
          }
        }
      }, { mode, world });
    };

    next();
  }
}
