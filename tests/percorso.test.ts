import { describe, expect, it } from 'vitest';
import { EMBEDDED_PACKS, selectRoundsForGame, resetPercorso } from '../src/content/packs';

describe('Verifica non ripetizione quesiti nello stesso percorso', () => {
  it('non ripete quesiti tra tappe successive (Tappa 1, 2, 3) per qualsiasi materia e anno', () => {
    const testCases: Array<{ subject: string; year: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'S1' | 'S2' | 'S3' }> = [
      { subject: 'matematica', year: 'P1' },
      { subject: 'matematica', year: 'P3' },
      { subject: 'matematica', year: 'P5' },
      { subject: 'matematica', year: 'S3' },
      { subject: 'italiano', year: 'P1' },
      { subject: 'italiano', year: 'P2' },
      { subject: 'italiano', year: 'P4' },
      { subject: 'italiano', year: 'S1' },
      { subject: 'scienze', year: 'P2' },
      { subject: 'scienze', year: 'P3' },
      { subject: 'scienze', year: 'P4' },
      { subject: 'scienze', year: 'S2' },
      { subject: 'storia', year: 'P1' },
      { subject: 'storia', year: 'P3' },
      { subject: 'storia', year: 'P4' },
      { subject: 'storia', year: 'P5' },
      { subject: 'storia', year: 'S1' },
      { subject: 'storia', year: 'S3' }
    ];

    for (const tc of testCases) {
      resetPercorso(tc.subject);
      const pack = EMBEDDED_PACKS.find((p) => p.subject === tc.subject)!;
      const settings = {
        profileId: null,
        overrides: {},
        schoolYear: tc.year,
        randomQuestions: true
      };

      const g1 = selectRoundsForGame(pack, pack.levels[0], settings);
      const g2 = selectRoundsForGame(pack, pack.levels[1], settings);
      const g3 = selectRoundsForGame(pack, pack.levels[2], settings);

      const ids1 = new Set(g1.map((r) => r.id));
      const ids2 = new Set(g2.map((r) => r.id));
      const ids3 = new Set(g3.map((r) => r.id));

      const overlap12 = [...ids1].filter((id) => ids2.has(id));
      const overlap23 = [...ids2].filter((id) => ids3.has(id));
      const overlap13 = [...ids1].filter((id) => ids3.has(id));

      expect(overlap12, `${tc.subject} ${tc.year}: overlap tra Tappa 1 e 2`).toEqual([]);
      expect(overlap23, `${tc.subject} ${tc.year}: overlap tra Tappa 2 e 3`).toEqual([]);
      expect(overlap13, `${tc.subject} ${tc.year}: overlap tra Tappa 1 e 3`).toEqual([]);
    }
  });

  it('garantisce che una serie di 4 tappe consecutive (24 domande) non contenga doppioni', () => {
    const subjects = ['matematica', 'italiano', 'scienze', 'storia'];
    for (const sub of subjects) {
      resetPercorso(sub);
      const pack = EMBEDDED_PACKS.find((p) => p.subject === sub)!;
      const settings = {
        profileId: null,
        overrides: {},
        schoolYear: 'P4' as const,
        randomQuestions: true
      };

      const tutteLeDomande: string[] = [];
      for (let tappa = 0; tappa < 4; tappa++) {
        const lvl = pack.levels[tappa % pack.levels.length];
        const g = selectRoundsForGame(pack, lvl, settings);
        tutteLeDomande.push(...g.map((r) => r.id));
      }

      const uniche = new Set(tutteLeDomande);
      expect(uniche.size, `${sub}: 24 domande estratte in 4 tappe devono essere tutte distinte`).toBe(24);
    }
  });
});
