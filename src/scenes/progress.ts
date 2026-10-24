import Phaser from 'phaser';
import { drawWiiChannelFrame, makeButton, makeText } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { allPacks } from '../content/packs';
import { starsFor, loadHistory } from '../core/progress';
import { addWorld } from '../art/world';

/**
 * Progressi per l'insegnante: tutte le tappe, tutte le stelle.
 *
 * Legge solo `sic.progress` (nessun dato personale). Non sostituisce il
 * registro dell'insegnante: serve a vedere a colpo d'occhio dove lo studente
 * è arrivato e quale tappa conviene riprendere.
 */
export class ProgressScene extends Phaser.Scene {
  constructor() {
    super('Progress');
  }

  create(): void {
    const cfg = resolveConfig(loadSettings());

    addWorld(this, 'scuola', cfg, { pico: 'cheer', speed: 22 });
    drawWiiChannelFrame(this, cfg, { x: 28, y: 12, w: 968, h: 468, headerH: 76 });

    makeText(this, 512, 38, 'Progressi', cfg, {
      size: 30,
      bold: true,
      color: '#1d6fb8',
      wrap: 620,
      maxH: 36,
      outline: true
    });
    makeText(this, 512, 74, 'Stelle conquistate in ogni tappa (massimo 3 per tappa).', cfg, {
      size: 14,
      color: '#5f7186',
      wrap: 760,
      maxH: 22
    });

    const righe = allPacks().flatMap((pack) =>
      pack.levels.map((livello) => ({
        titolo: `${pack.title} — ${livello.title}`,
        stelle: starsFor(pack.packId, livello.id)
      }))
    );

    let totale = 0;
    righe.forEach((r, idx) => {
      totale += r.stelle;
      const col = idx < 6 ? 0 : 1;
      const row = idx % 6;
      const y = 118 + row * 48;
      const xTitolo = col === 0 ? 210 : 700;
      const xStelle = col === 0 ? 445 : 935;
      makeText(this, xTitolo, y, r.titolo, cfg, {
        size: 13,
        align: 'left',
        wrap: 330,
        maxH: 34,
        color: '#2f3b4c'
      });
      makeText(this, xStelle, y, `★ ${r.stelle} / 3`, cfg, {
        size: 14,
        bold: r.stelle > 0,
        maxH: 22,
        color: r.stelle === 3 ? '#d99a00' : r.stelle > 0 ? '#1f8a4c' : '#8a99ad'
      });
    });

    makeText(this, 512, 424, `Totale: ${totale} stelle su ${righe.length * 3}`, cfg, {
      size: 15,
      color: '#5f7186',
      wrap: 620,
      maxH: 22
    });

    const storia = loadHistory();
    const ultima = storia[storia.length - 1];
    if (ultima) {
      const data = new Date(ultima.finishedAt).toLocaleDateString('it-IT');
      makeText(this, 512, 456, `Ultima partita: ${ultima.correct}/${ultima.total} — ${data}`, cfg, {
        size: 14,
        color: '#1f8a4c',
        wrap: 620,
        maxH: 22
      });
    }

    const indietro = makeButton(this, cfg, 512, 526, 'Torna al titolo', {
      scale: 0.62,
      maxTargetScale: 1.04
    });
    indietro.onTap(() => this.scene.start('Title'));
  }
}
