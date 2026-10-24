import Phaser from 'phaser';
import { makeButton, makeText } from '../challenges/ui';
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

    makeText(this, 512, 46, 'Progressi', cfg, {
      size: 32,
      bold: true,
      color: '#ffd93d',
      outline: true
    });
    makeText(this, 512, 84, 'Stelle conquistate in ogni tappa (massimo 3 per tappa).', cfg, {
      size: 14,
      color: '#b8c4e0'
    });

    const righe = allPacks().flatMap((pack) =>
      pack.levels.map((livello) => ({
        titolo: `${pack.title} — ${livello.title}`,
        stelle: starsFor(pack.packId, livello.id)
      }))
    );

    let y = 150;
    let totale = 0;
    for (const r of righe) {
      totale += r.stelle;
      makeText(this, 300, y, r.titolo, cfg, { size: 14, align: 'left', wrap: 520, color: '#e8ecf7' });
      makeText(this, 800, y, `★ ${r.stelle} / 3`, cfg, {
        size: 15,
        bold: r.stelle > 0,
        color: r.stelle === 3 ? '#ffd93d' : r.stelle > 0 ? '#8fe3b0' : '#b8c4e0'
      });
      y += 28;
    }

    makeText(this, 512, y + 10, `Totale: ${totale} stelle su ${righe.length * 3}`, cfg, {
      size: 15,
      color: '#b8c4e0'
    });

    const storia = loadHistory();
    const ultima = storia[storia.length - 1];
    if (ultima) {
      const data = new Date(ultima.finishedAt).toLocaleDateString('it-IT');
      makeText(this, 512, y + 34, `Ultima partita: ${ultima.correct}/${ultima.total} — ${data}`, cfg, {
        size: 14,
        color: '#8fe3b0'
      });
    }

    const indietro = makeButton(this, cfg, 512, 528, 'Torna al titolo', { scale: 0.62 });
    indietro.onTap(() => this.scene.start('Title'));
  }
}
