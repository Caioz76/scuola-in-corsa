import { describe, expect, it } from 'vitest';
import { resolveConfig, DEFAULT_SETTINGS, type BesSettings } from '../src/bes/resolver';
import { BES_RULES, RULE_BY_ID } from '../src/bes/rules';
import { BES_PROFILES, PROFILE_BY_ID } from '../src/bes/profiles';

describe('BES resolver', () => {
  it('default: nessuna regola BES attiva, tempo presente', () => {
    const cfg = resolveConfig(DEFAULT_SETTINGS);
    expect(cfg.timeLimitMs).toBe(30_000);
    expect(cfg.font).toBe('default');
    expect(cfg.dragEnabled).toBe(true);
    expect(cfg.showStreak).toBe(true);
    expect(Object.keys(cfg.rules).length).toBe(BES_RULES.length);
  });

  it('ogni profilo produce un EffectiveConfig coerente', () => {
    for (const p of BES_PROFILES) {
      const cfg = resolveConfig({ profileId: p.id, overrides: {} });
      expect(cfg.profileId).toBe(p.id);
      for (const [id, value] of Object.entries(p.rules)) {
        expect(cfg.rules[id], `regola ${id} nel profilo ${p.id}`).toBe(value);
      }
    }
  });

  it('override vince sul profilo', () => {
    const settings: BesSettings = {
      profileId: 'autismo',
      overrides: { reduceMotion: false, largerText: true }
    };
    const cfg = resolveConfig(settings);
    expect(cfg.rules.reduceMotion).toBe(false);
    expect(cfg.rules.largerText).toBe(true);
    // le altre regole del profilo restano
    expect(cfg.rules.colorCoding).toBe(true);
  });

  it('override sconosciuto viene ignorato', () => {
    const cfg = resolveConfig({ profileId: null, overrides: { doesNotExist: true } });
    expect(cfg.rules.doesNotExist).toBeUndefined();
  });

  it('discalculia: supporti visivi e tempo extra', () => {
    const cfg = resolveConfig({ profileId: 'discalculia', overrides: {} });
    expect(cfg.visualSupports).toBe(true);
    expect(cfg.timeLimitMs).toBeNull();
    expect(cfg.maxOptions).toBe(2);
  });

  it('disprassia: niente drag, target grandi', () => {
    const cfg = resolveConfig({ profileId: 'disprassia', overrides: {} });
    expect(cfg.dragEnabled).toBe(false);
    expect(cfg.targetScale).toBeGreaterThan(1);
    expect(cfg.permissiveTouch).toBe(true);
  });

  it('sordità: suoni spenti, segnali visivi accesi', () => {
    const cfg = resolveConfig({ profileId: 'sordita', overrides: {} });
    expect(cfg.sfx).toBe(false);
    expect(cfg.music).toBe(false);
    expect(cfg.visualAudioCues).toBe(true);
  });

  it('slowPace: esposto come regola derivata, indipendente da reduceMotion', () => {
    expect(resolveConfig({ profileId: 'adhd', overrides: {} }).slowPace).toBe(true);
    expect(resolveConfig(DEFAULT_SETTINGS).slowPace).toBe(false);
    // disprassia riduce il movimento ma non chiede un ritmo più lento
    expect(resolveConfig({ profileId: 'disprassia', overrides: {} }).slowPace).toBe(false);
  });

  it('ogni regola è raggiungibile da almeno un profilo o dal default', () => {
    // sanity: nessuna regola orfana (nessun profilo la tocca e default false → ok solo se intenzionale)
    const touched = new Set<string>();
    for (const p of BES_PROFILES) for (const id of Object.keys(p.rules)) touched.add(id);
    for (const r of BES_RULES) {
      if (!r.enabled && !touched.has(r.id)) {
        // regole opzionali non coperte da nessun profilo: le elenchiamo per revisione
        expect(['slowPace'].includes(r.id)).toBe(true);
      }
    }
    expect(RULE_BY_ID.size).toBeGreaterThanOrEqual(28);
  });
});
