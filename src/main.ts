import Phaser from 'phaser';
import { ensureUI } from './art/textures';
import { resolveConfig, DEFAULT_SETTINGS } from './bes/resolver';
import { makeButton, makeText, showBanner } from './challenges/ui';
import { ensureIcons } from './art/textures';
import { showChallenge, type Challenge } from './challenges/index';
import { allPacks } from './content/packs';
import type { Round } from './content/types';

/** Nome del gioco — UNICA costante, da qui si cambia in un colpo solo. */
export const GAME_NAME = 'Scuola in Corsa';

class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    // Le texture UI (bottoni, card, slot, icone) si creano UNA volta sola qui.
    ensureUI(this);
    ensureIcons(this);
    // Boot non mostra nulla: passa subito alla schermata di titolo.
    this.scene.start('Title');
  }
}

class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create(): void {
    const cfg = resolveConfig(DEFAULT_SETTINGS);
    const w = this.scale.gameSize.width;
    const h = this.scale.gameSize.height;

    makeText(this, w / 2, h / 2 - 110, GAME_NAME, cfg, {
      size: 48,
      bold: true,
      color: '#ffd93d',
      outline: true
    });
    makeText(this, w / 2, h / 2 - 40, 'Scegli la materia e corri!', cfg, {
      size: 20,
      color: '#b8c4e0'
    });

    const gioca = makeButton(this, cfg, w / 2, h / 2 + 70, 'Gioca', { depth: 10 });
    gioca.onTap(() => this.scene.start('Subject'));
  }
}

type Materia = 'matematica' | 'italiano' | 'scienze' | 'storia';

class SubjectScene extends Phaser.Scene {
  constructor() {
    super('Subject');
  }

  create(): void {
    const cfg = resolveConfig(DEFAULT_SETTINGS);
    const w = this.scale.gameSize.width;
    const h = this.scale.gameSize.height;

    makeText(this, w / 2, 90, 'Scegli la materia', cfg, {
      size: 38,
      bold: true,
      color: '#ffd93d',
      outline: true
    });

    const voci: Array<{ id: Materia; label: string; x: number; y: number }> = [
      { id: 'matematica', label: 'Matematica', x: w / 2 - 190, y: h / 2 - 40 },
      { id: 'italiano', label: 'Italiano', x: w / 2 + 190, y: h / 2 - 40 },
      { id: 'scienze', label: 'Scienze', x: w / 2 - 190, y: h / 2 + 80 },
      { id: 'storia', label: 'Storia', x: w / 2 + 190, y: h / 2 + 80 }
    ];

    for (const v of voci) {
      const b = makeButton(this, cfg, v.x, v.y, v.label, { depth: 10 });
      b.onTap(() => {
        setMateria(v.id);
        this.scene.start('Game');
      });
    }
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create(): void {
    const cfg = resolveConfig(DEFAULT_SETTINGS);
    const pack = allPacks().find((p) => p.subject === materiaAttiva);
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

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  parent: 'game',
  backgroundColor: '#1a1c2c',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, TitleScene, SubjectScene, GameScene]
});

// ── Gancio per i test e2e (sessione A) ──────────────────────────────
// Espone la scena attiva SENZA spingere stato (nessun evento, nessun costo
// per frame): un getter che legge la scena al momento della richiesta, quindi
// non può mai essere "vecchio". Vedi COORDINAMENTO.md §3.5.
const g = window as unknown as {
  __GIOCO__?: { scena: string; materia: string | null };
};
let materiaAttiva: Materia | null = null;

g.__GIOCO__ = {
  get scena(): string {
    return game.scene.getScenes(true)[0]?.scene.key ?? 'Boot';
  },
  get materia(): string | null {
    return materiaAttiva;
  }
};

/** Chiamata dalla scena di scelta materia: aggiorna subito ciò che leggono i test. */
export function setMateria(m: Materia): void {
  materiaAttiva = m;
}
