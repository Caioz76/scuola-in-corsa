import Phaser from 'phaser';
import { drawSportChannelFrame, makeButton, makeText } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { allPacks } from '../content/packs';
import { starsFor, loadHistory } from '../core/progress';
import { getPlayerName, openNameDialog } from '../core/player';
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
    drawSportChannelFrame(this, cfg, { x: 32, y: 16, w: 960, h: 544, headerH: 80 });

    const btnIndietro = makeButton(this, cfg, 130, 40, 'Torna al titolo', {
      scale: 0.52,
      maxTargetScale: 1.03,
      depth: 10
    });
    btnIndietro.onTap(() => this.scene.start('Title'));

    const nome = getPlayerName();
    const txtTitolo = makeText(this, 512, 40, nome ? `Progressi di ${nome}` : 'Progressi di Gioco', cfg, {
      size: 26,
      bold: true,
      color: '#ffffff',
      wrap: 520,
      maxH: 30,
      outline: true
    });

    const btnCambiaNome = makeButton(this, cfg, 884, 40, '👤 Profilo', {
      scale: 0.52,
      maxTargetScale: 1.02,
      depth: 10
    });
    btnCambiaNome.onTap(() => {
      openNameDialog((nuovoNome) => {
        txtTitolo.setText(nuovoNome ? `Progressi di ${nuovoNome}` : 'Progressi di Gioco');
      });
    });

    makeText(this, 512, 70, 'Stelle conquistate in ogni tappa (massimo 3 per tappa):', cfg, {
      size: 13.5,
      bold: true,
      color: '#f0f9ff',
      wrap: 680,
      maxH: 20,
      outline: true
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
        bold: true,
        align: 'left',
        wrap: 330,
        maxH: 34,
        color: '#0f2942'
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
      bold: true,
      color: '#102a43',
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

    const indietro = makeButton(this, cfg, 512, 510, 'Torna al titolo', {
      scale: 0.60,
      maxTargetScale: 1.04,
      depth: 10
    });
    indietro.onTap(() => this.scene.start('Title'));
  }
}
