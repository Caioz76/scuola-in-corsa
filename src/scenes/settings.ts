import Phaser from 'phaser';
import { makeButton, makeText } from '../challenges/ui';
import { resolveConfig } from '../bes/resolver';
import { BES_PROFILES } from '../bes/profiles';
import { loadSettings, saveSettings } from '../core/settings';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super('Settings');
  }

  create(): void {
    const impostazioni = loadSettings();
    const cfg = resolveConfig(impostazioni);
    const w = this.scale.gameSize.width;

    makeText(this, w / 2, 46, 'Impostazioni', cfg, {
      size: 32,
      bold: true,
      color: '#ffd93d',
      outline: true
    });

    const scelto = BES_PROFILES.find((p) => p.id === impostazioni.profileId);
    makeText(this, w / 2, 92, 'Scegli un profilo: le regole si applicano subito a tutto il gioco.', cfg, {
      size: 15,
      color: '#b8c4e0'
    });
    makeText(this, w / 2, 124, scelto ? scelto.description : 'Nessun profilo: regole standard.', cfg, {
      size: 15,
      color: scelto ? '#8fe3b0' : '#5a6484',
      wrap: 820
    });

    // Griglia 3×3: 9 profili, bottoni larghi abbastanza per le etichette lunghe.
    const xs = [200, 512, 824];
    const ys = [200, 300, 400];
    BES_PROFILES.forEach((p, i) => {
      const b = makeButton(this, cfg, xs[i % 3], ys[Math.floor(i / 3)], p.label, {
        scale: 0.9,
        depth: 10
      });
      if (p.id === impostazioni.profileId) b.setKind('correct');
      b.onTap(() => {
        saveSettings({ profileId: p.id, overrides: {} });
        this.scene.restart();
      });
    });

    const nessuno = makeButton(this, cfg, 300, 500, 'Nessun profilo', { scale: 0.62, depth: 10 });
    nessuno.onTap(() => {
      saveSettings({ profileId: null, overrides: {} });
      this.scene.restart();
    });

    const indietro = makeButton(this, cfg, 724, 500, 'Torna al titolo', { scale: 0.62, depth: 10 });
    indietro.onTap(() => this.scene.start('Title'));
  }
}
