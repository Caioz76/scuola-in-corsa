import Phaser from 'phaser';
import { getMateria, getLevel } from './shared';
import { showChallenge, type Challenge } from '../challenges/index';
import { allPacks, defaultLevelForYear, selectRoundsForGame } from '../content/packs';
import type { Round } from '../content/types';
import type { RoundOutcome } from '../core/state';
import { drawWiiChannelFrame, showBanner, makeText } from '../challenges/ui';
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

    makeText(
      this,
      500,
      20,
      `${pack.title} — ${level.title}${infoAnno ? ` (${infoAnno.short})` : ''}`,
      cfg,
      {
        size: 14,
        color: '#5f7186',
        wrap: 520,
        maxH: 24
      }
    );

    // Il mondo: scenografia della materia, pista e Pico che corre.
    const runner = mode === 'runner';
    const runSpeed = cfg.runnerSpeed > 0 ? cfg.runnerSpeed : 480;
    const treD = (impostazioni.graphics ?? '2d') === '3d' && !cfg.highContrast;
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

    // Barra superiore e quadro domanda in stile Wii Sports (solo in 2D con decorazioni attive)
    if (!treD) {
      drawWiiChannelFrame(this, cfg, { x: 96, y: 6, w: 832, h: 124, headerH: 30, depth: -10 });
    }
    const contatore = makeText(this, treD && runner ? 700 : 888, 20, '', cfg, {
      size: 14,
      color: '#1f8a4c',
      wrap: 180,
      maxH: 24
    });

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
