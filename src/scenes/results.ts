import Phaser from 'phaser';
import { drawSportChannelFrame, makeText, makeButton } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { setStars, setPlayerStars, totalStarsForPlayer, pushResult } from '../core/progress';
import { allPacks } from '../content/packs';
import { setLevel } from './shared';
import { getPlayerName, getTeamSetup, getProfileLabel } from '../core/player';
import type { RoundOutcome } from '../core/state';
import type { PlayerRoundStat } from './game';
import { addWorld, themeFor } from '../art/world';
import { start2DCelebration } from '../art/celebration';

export class ResultsScene extends Phaser.Scene {
  private stopCelebration?: () => void;
  public playerStats?: PlayerRoundStat[];

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
    playerStats?: PlayerRoundStat[];
  }): void {
    const cfg = resolveConfig(loadSettings());
    const { packId, levelId, correct, total } = data;
    const team = getTeamSetup();

    const stelle =
      correct === total
        ? 3
        : correct >= (total * 2) / 3
          ? 2
          : correct >= 1
            ? 1
            : 0;

    // Se singolo giocatore salva le stelle globali e per il giocatore
    if (team.numPlayers === 1) {
      setPlayerStars(team.players[0].token.id, packId, levelId, stelle);
    }
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

    // Effetto coriandoli celebrativi in caduta libera!
    this.stopCelebration = start2DCelebration(this);

    const w = this.scale.gameSize.width;
    const cardBg = this.add.graphics().setDepth(2);

    if (team.numPlayers > 1) {
      // ══════════════════════════════════════════════════════════════════════
      // RIEPILOGO MULTIGIOCATORE CON RISULTATI IN VERTICALE
      // ══════════════════════════════════════════════════════════════════════
      const cardW = Math.min(872, w - 40);
      const cardX = (w - cardW) / 2;

      // Scheda solida bianca grande
      cardBg.fillStyle(0x005b8f, 0.16);
      cardBg.fillRoundedRect(cardX - 4, 22, cardW + 8, 442, 28);
      cardBg.fillStyle(0xffffff, 0.98);
      cardBg.fillRoundedRect(cardX, 18, cardW, 438, 26);
      cardBg.lineStyle(3.5, 0x00a2e8, 0.95);
      cardBg.strokeRoundedRect(cardX, 18, cardW, 438, 26);

      // Header fascia
      cardBg.fillStyle(0xf0f7fc, 0.96);
      cardBg.fillRoundedRect(cardX + 4, 22, cardW - 8, 72, 20);
      cardBg.lineStyle(2, 0x00a2e8, 0.65);
      cardBg.lineBetween(cardX + 16, 94, cardX + cardW - 16, 94);

      makeText(this, w / 2, 48, '🏆 Riepilogo della Sessione — Squadra', cfg, {
        size: 26,
        bold: true,
        color: '#000000',
        wrap: 700,
        maxH: 32
      });

      if (pack && idx >= 0) {
        makeText(this, w / 2, 74, `${pack.title} — ${pack.levels[idx].title} (Sessione completata da tutti i giocatori)`, cfg, {
          size: 13.5,
          bold: true,
          color: '#334e68',
          wrap: 700,
          maxH: 20
        });
      }

      // Colonne verticali per ogni soggetto/giocatore
      const stats = data.playerStats ?? team.players.map((p) => ({
        playerIndex: p.playerIndex,
        token: p.token,
        profileId: p.profileId,
        roundsPlayed: 1,
        correct: 1,
        stars: stelle
      }));
      this.playerStats = stats;

      const num = team.numPlayers;
      const colW = Math.min(205, (cardW - 40) / num);
      const totalGridW = num * colW;
      const startX = w / 2 - totalGridW / 2 + colW / 2;

      team.players.forEach((p, i) => {
        const cx = startX + i * colW;
        const st = stats.find((s) => s.playerIndex === p.playerIndex) ?? {
          correct: 0,
          roundsPlayed: 0,
          stars: 0
        };
        const hexColor = parseInt(p.token.color.replace('#', '0x'), 16) || 0x00a2e8;

        // Scheda verticale del singolo giocatore
        cardBg.fillStyle(0xf8fafc, 0.98);
        cardBg.fillRoundedRect(cx - colW / 2 + 6, 108, colW - 12, 328, 16);
        cardBg.lineStyle(2.5, hexColor, 1);
        cardBg.strokeRoundedRect(cx - colW / 2 + 6, 108, colW - 12, 328, 16);

        // Logo del soggetto (in alto, grande)
        const hexBg = parseInt(p.token.bg.replace('#', '0x'), 16) || 0xffffff;
        cardBg.fillStyle(hexBg, 1);
        cardBg.fillCircle(cx, 146, 28);
        cardBg.lineStyle(2, hexColor, 1);
        cardBg.strokeCircle(cx, 146, 28);

        this.add
          .text(cx, 146, p.token.icon, {
            fontSize: '32px'
          })
          .setOrigin(0.5)
          .setDepth(10);

        // Sotto il logo: nome e dettagli
        makeText(this, cx, 192, p.token.name, cfg, {
          size: 15,
          bold: true,
          color: '#000000',
          align: 'center',
          wrap: colW - 16,
          maxH: 22
        });

        makeText(this, cx, 214, `G${p.playerIndex} · ${getProfileLabel(p.profileId)}`, cfg, {
          size: 11.5,
          bold: true,
          color: '#475569',
          align: 'center',
          wrap: colW - 16,
          maxH: 18
        });

        // Progresso ottenuto
        makeText(
          this,
          cx,
          248,
          `${'★ '.repeat(st.stars)}${'☆ '.repeat(3 - st.stars)}`,
          cfg,
          {
            size: 17,
            bold: true,
            color: '#d99a00',
            align: 'center',
            wrap: colW - 16,
            maxH: 24
          }
        );

        const isPerfeito = st.roundsPlayed > 0 && st.correct === st.roundsPlayed;
        const colStat = isPerfeito ? '#16a34a' : st.correct > 0 ? '#d97706' : '#dc2626';

        makeText(this, cx, 280, `${st.correct} / ${st.roundsPlayed} corrette`, cfg, {
          size: 13,
          bold: true,
          color: colStat,
          align: 'center',
          wrap: colW - 16,
          maxH: 20
        });

        const pct = st.roundsPlayed > 0 ? Math.round((st.correct / st.roundsPlayed) * 100) : 0;
        makeText(this, cx, 302, `${pct}% successo`, cfg, {
          size: 12.5,
          bold: true,
          color: colStat,
          align: 'center',
          wrap: colW - 16,
          maxH: 20
        });

        makeText(
          this,
          cx,
          348,
          `Progresso:\n${totalStarsForPlayer(p.token.id)} ★ totali`,
          cfg,
          {
            size: 12,
            bold: true,
            color: '#0369a1',
            align: 'center',
            wrap: colW - 16,
            maxH: 34
          }
        );
      });

      const rigioca = makeButton(this, cfg, 380, 506, 'Rigioca', {
        scale: 0.74,
        maxTargetScale: 1.02,
        depth: 10
      });
      rigioca.onTap(() => {
        this.stopCelebration?.();
        this.scene.start('Game');
      });

      const titolo = makeButton(this, cfg, 644, 506, 'Torna al titolo', {
        scale: 0.74,
        maxTargetScale: 1.02,
        depth: 10
      });
      titolo.onTap(() => {
        this.stopCelebration?.();
        this.scene.start('Title');
      });
      return;
    }

    // ══════════════════════════════════════════════════════════════════════
    // MODALITÀ SINGOLO GIOCATORE
    // ══════════════════════════════════════════════════════════════════════
    // Scheda solida bianca ad alta leggibilità (senza trasparenze sbiadite)
    const cardW = Math.min(744, w - 40);
    const cardX = (w - cardW) / 2;

    cardBg.fillStyle(0x005b8f, 0.16);
    cardBg.fillRoundedRect(cardX - 4, 32, cardW + 8, 332, 30);
    cardBg.fillStyle(0xffffff, 0.98);
    cardBg.fillRoundedRect(cardX, 28, cardW, 328, 28);
    cardBg.lineStyle(3.5, 0x00a2e8, 0.95);
    cardBg.strokeRoundedRect(cardX, 28, cardW, 328, 28);
    cardBg.lineStyle(1.5, 0xffffff, 0.95);
    cardBg.strokeRoundedRect(cardX + 3, 31, cardW - 6, 322, 25);

    cardBg.fillStyle(0xf0f7fc, 0.96);
    cardBg.fillRoundedRect(cardX + 6, 34, cardW - 12, 74, 22);
    cardBg.lineStyle(2, 0x00a2e8, 0.65);
    cardBg.lineBetween(cardX + 20, 108, cardX + cardW - 20, 108);

    const nomeGiocatore = getPlayerName();
    makeText(this, w / 2, 72, nomeGiocatore ? `Bravissimo, ${nomeGiocatore}!` : 'Tappa completata!', cfg, {
      size: 34,
      bold: true,
      color: '#000000',
      wrap: 700,
      maxH: 42
    });

    makeText(this, w / 2, 134, 'Risposte corrette:', cfg, {
      size: 20,
      bold: true,
      color: '#000000',
      maxH: 26
    });

    makeText(this, w / 2, 162, `${correct} su ${total}`, cfg, {
      size: 26,
      bold: true,
      color: '#000000',
      maxH: 32
    });

    if (pack && idx >= 0) {
      makeText(this, w / 2, 186, `${pack.title} — ${pack.levels[idx].title}`, cfg, {
        size: 16,
        bold: true,
        color: '#000000',
        wrap: 700,
        maxH: 24
      });
    }

    // Stelle dorate grandi e luminose
    const xs = [w / 2 - 120, w / 2, w / 2 + 120];
    xs.forEach((x, i) => {
      const star = this.add.image(x, 268, 'star').setScale(2.1).setDepth(10);
      if (i >= stelle) {
        star.setAlpha(0.24).setTint(0x94a3b8);
      } else {
        star.setTint(0xffc83b);
        this.tweens.add({
          targets: star,
          scale: 2.25,
          duration: 900 + i * 200,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      }
    });

    const rigioca = makeButton(this, cfg, w / 2 - 156, prossima ? 476 : 466, 'Rigioca', {
      scale: prossima ? 0.74 : 0.78,
      maxTargetScale: 1.02,
      depth: 10
    });
    rigioca.onTap(() => {
      this.stopCelebration?.();
      this.scene.start('Game');
    });

    if (prossima) {
      const avanti = makeButton(this, cfg, w / 2, 396, 'Tappa successiva', {
        scale: 0.88,
        maxTargetScale: 1.02,
        depth: 10
      });
      avanti.setKind('correct');
      avanti.onTap(() => {
        this.stopCelebration?.();
        setLevel(prossima.id);
        this.scene.start('Game');
      });
    }

    const titolo = makeButton(this, cfg, w / 2 + 156, prossima ? 476 : 466, 'Torna al titolo', {
      scale: prossima ? 0.74 : 0.78,
      maxTargetScale: 1.02,
      depth: 10
    });
    titolo.onTap(() => {
      this.stopCelebration?.();
      this.scene.start('Title');
    });
  }
}
