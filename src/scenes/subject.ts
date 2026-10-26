import Phaser from 'phaser';
import { type Materia, setMateria, setLevel } from './shared';
import { drawSportChannelFrame, makeButton, makeText } from '../challenges/ui';
import { ANNO_BY_ID, resolveConfig } from '../bes/resolver';
import { loadSettings } from '../core/settings';
import { allPacks, defaultLevelForYear, resetPercorso } from '../content/packs';
import { starsFor } from '../core/progress';
import { getTeamSetup, getPlayerSummary } from '../core/player';
import { addWorld } from '../art/world';
import { synth } from '../audio/synth';

export class SubjectScene extends Phaser.Scene {
  constructor() {
    super('Subject');
  }

  create(): void {
    const cfg = resolveConfig(loadSettings());
    const w = this.scale.gameSize.width;

    const frameW = Math.min(960, w - 40);
    const frameX = (w - frameW) / 2;
    addWorld(this, 'scuola', cfg, { speed: 44 });
    drawSportChannelFrame(this, cfg, { x: frameX, y: 16, w: frameW, h: 544, headerH: 80 });

    makeText(this, w / 2, 40, 'Scegli la Materia', cfg, {
      size: 26,
      bold: true,
      color: '#000000',
      wrap: 520,
      maxH: 30
    });

    const infoAnno = ANNO_BY_ID.get(cfg.schoolYear);
    const labelAnno = infoAnno ? infoAnno.label : cfg.schoolYear;
    const team = getTeamSetup();
    const playerText = team.numPlayers > 1 ? `👥 Squadra: ${getPlayerSummary()}` : `👤 Giocatore: ${getPlayerSummary()}`;
    makeText(
      this,
      w / 2,
      70,
      `${playerText}  ·  Classe: ${labelAnno}  ·  Scegli una disciplina:`,
      cfg,
      {
        size: 13.5,
        bold: true,
        color: '#0369a1',
        wrap: 700,
        maxH: 20
      }
    );

    // Accesso diretto per l'insegnante: tutte le tappe, con le stelle.
    const tappe = makeButton(this, cfg, frameX + frameW - 76, 40, 'Tutte le tappe', {
      scale: 0.65,
      maxTargetScale: 1.03,
      depth: 10
    });
    tappe.onTap(() => this.scene.start('Levels'));

    const voci: Array<{ id: Materia; label: string; x: number; y: number }> = [
      { id: 'matematica', label: 'Matematica', x: w / 2 - 192, y: 236 },
      { id: 'italiano', label: 'Italiano', x: w / 2 + 192, y: 236 },
      { id: 'scienze', label: 'Scienze', x: w / 2 - 192, y: 366 },
      { id: 'storia', label: 'Storia', x: w / 2 + 192, y: 366 }
    ];

    for (const v of voci) {
      const b = makeButton(this, cfg, v.x, v.y, v.label, {
        scale: 0.90,
        maxTargetScale: 1.03,
        depth: 10
      });
      b.onTap(() => {
        synth.play('click');
        setMateria(v.id);
        setLevel(null);
        resetPercorso(v.id);
        this.scene.start('Game');
      });
      const pack = allPacks().find((p) => p.subject === v.id);
      const livello = pack ? defaultLevelForYear(pack, cfg.schoolYear) : undefined;
      if (pack && livello) {
        const stelle = starsFor(pack.packId, livello.id);
        makeText(this, v.x, v.y + 42, `★ ${stelle} / 3`, cfg, {
          size: 15,
          bold: stelle > 0,
          color: stelle > 0 ? '#d99a00' : '#8a99ad',
          maxH: 20
        });
      }
    }

    const btnTorna = makeButton(this, cfg, w / 2, 496, 'Torna al menu', {
      scale: 0.76,
      maxTargetScale: 1.03,
      depth: 50
    });
    btnTorna.onTap(() => {
      synth.play('click');
      this.scene.start('Title');
    });
  }
}
