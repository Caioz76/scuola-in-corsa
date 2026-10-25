import Phaser from 'phaser';
import { drawSportChannelFrame, makeText, makeButton } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { setStars, setPlayerStars, pushResult } from '../core/progress';
import { allPacks } from '../content/packs';
import { setLevel } from './shared';
import { getPlayerName, getTeamSetup } from '../core/player';
import type { RoundOutcome } from '../core/state';
import { addWorld, themeFor } from '../art/world';
import { start2DCelebration } from '../art/celebration';

export class ResultsScene extends Phaser.Scene {
  private stopCelebration?: () => void;

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

    const stelle =
      correct === total
        ? 3
        : correct >= (total * 2) / 3
          ? 2
          : correct >= 1
            ? 1
            : 0;

    const team = getTeamSetup();
    team.players.forEach((p) => {
      setPlayerStars(p.token.id, packId, levelId, stelle);
    });
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

    // ── Scheda solida bianca ad alta leggibilità (senza trasparenze sbiadite) ──
    const cardBg = this.add.graphics().setDepth(2);
    // Ombra morbida
    cardBg.fillStyle(0x005b8f, 0.16);
    cardBg.fillRoundedRect(140, 32, 744, 332, 30);
    // Fondo solido porcellana
    cardBg.fillStyle(0xffffff, 0.98);
    cardBg.fillRoundedRect(144, 28, 736, 328, 28);
    // Doppia cornice azzurro sportivo
    cardBg.lineStyle(3.5, 0x00a2e8, 0.95);
    cardBg.strokeRoundedRect(144, 28, 736, 328, 28);
    cardBg.lineStyle(1.5, 0xffffff, 0.95);
    cardBg.strokeRoundedRect(147, 31, 730, 322, 25);

    // Fascia d'intestazione superiore chiara con filetto divisorio
    cardBg.fillStyle(0xf0f7fc, 0.96);
    cardBg.fillRoundedRect(150, 34, 724, 74, 22);
    cardBg.lineStyle(2, 0x00a2e8, 0.65);
    cardBg.lineBetween(164, 108, 860, 108);

    // Effetto coriandoli celebrativi in caduta libera!
    this.stopCelebration = start2DCelebration(this);

    // ── Testi ad altissimo contrasto sopra la scheda (depth: 10) ──
    const nomeGiocatore = getPlayerName();
    const titoloFine = team.numPlayers > 1 ? 'Bravissima Squadra!' : (nomeGiocatore ? `Bravissimo, ${nomeGiocatore}!` : 'Tappa completata!');
    makeText(this, 512, 72, titoloFine, cfg, {
      size: 34,
      bold: true,
      color: '#000000',
      wrap: 700,
      maxH: 42
    });

    makeText(this, 512, 134, 'Risposte corrette:', cfg, {
      size: 20,
      bold: true,
      color: '#000000',
      maxH: 26
    });

    makeText(this, 512, 162, `${correct} su ${total}`, cfg, {
      size: 26,
      bold: true,
      color: '#000000',
      maxH: 32
    });

    if (pack && idx >= 0) {
      makeText(this, 512, 186, `${pack.title} — ${pack.levels[idx].title}`, cfg, {
        size: 16,
        bold: true,
        color: '#000000',
        wrap: 700,
        maxH: 24
      });
    }

    // Stelle dorate grandi e luminose
    const xs = [512 - 120, 512, 512 + 120];
    xs.forEach((x, i) => {
      const star = this.add.image(x, 268, 'star').setScale(2.1).setDepth(10);
      if (i >= stelle) {
        star.setAlpha(0.24).setTint(0x94a3b8);
      } else {
        star.setTint(0xffc83b);
        // Leggera animazione pulsante per le stelle vinte
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

    const rigioca = makeButton(this, cfg, 356, prossima ? 476 : 466, 'Rigioca', {
      scale: prossima ? 0.74 : 0.78,
      maxTargetScale: 1.02,
      depth: 10
    });
    rigioca.onTap(() => {
      this.stopCelebration?.();
      this.scene.start('Game');
    });

    if (prossima) {
      const avanti = makeButton(this, cfg, 512, 396, 'Tappa successiva', {
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

    const titolo = makeButton(this, cfg, 668, prossima ? 476 : 466, 'Torna al titolo', {
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
