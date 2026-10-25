import { describe, expect, it } from 'vitest';
import { isValid, validatePack } from '../src/content/validate';
import { EMBEDDED_PACKS, selectRoundsForGame } from '../src/content/packs';
import { BANCA_DOMANDE } from '../src/content/question-bank';
import type { Pack, QuizRound } from '../src/content/types';

function quiz(id: string, options: { label: string; correct: boolean }[]): QuizRound {
  return { id, type: 'quiz', prompt: 'Quanto fa 2+2?', options, hint: 'conta', explanation: '4' };
}

function pack(levels: Pack['levels']): Pack {
  return {
    packId: 'test',
    version: '1',
    title: 'Test',
    subject: 'matematica',
    ageRange: '7-9',
    difficulty: 1,
    levels
  };
}

describe('validatore contenuti', () => {
  it('accetta un pacchetto corretto', () => {
    const p = pack([
      {
        id: 'lv1',
        title: 'Primo',
        difficulty: 1,
        rounds: [
          quiz('r1', [
            { label: '3', correct: false },
            { label: '4', correct: true },
            { label: '5', correct: false }
          ]),
          {
            id: 'r2',
            type: 'sequence',
            prompt: 'Metti in ordine',
            direction: 'tap',
            items: ['prima', 'poi', 'infine']
          },
          {
            id: 'r3',
            type: 'dragdrop',
            mode: 'sort',
            prompt: 'Ordina le parole',
            sortItems: ['il', 'gatto', 'dorme']
          },
          {
            id: 'r4',
            type: 'dragdrop',
            mode: 'match',
            prompt: 'Abbina',
            leftItems: ['Cane', 'Uccello'],
            rightItems: ['Nido', 'Cuccia'],
            pairs: [
              [0, 1],
              [1, 0]
            ]
          },
          {
            id: 'r5',
            type: 'image',
            prompt: 'Che animale è?',
            icon: 'cane',
            options: [
              { label: 'Cane', correct: true },
              { label: 'Gatto', correct: false }
            ]
          }
        ]
      }
    ]);
    expect(validatePack(p)).toEqual([]);
    expect(isValid(p)).toBe(true);
  });

  it('rifiuta zero risposte corrette', () => {
    const p = pack([
      {
        id: 'lv1',
        title: 'x',
        difficulty: 1,
        rounds: [
          quiz('r1', [
            { label: '3', correct: false },
            { label: '5', correct: false }
          ])
        ]
      }
    ]);
    expect(isValid(p)).toBe(false);
    expect(validatePack(p).some((i) => /corretta/.test(i.message))).toBe(true);
  });

  it('rifiuta due risposte corrette', () => {
    const p = pack([
      {
        id: 'lv1',
        title: 'x',
        difficulty: 1,
        rounds: [
          quiz('r1', [
            { label: '4', correct: true },
            { label: '4', correct: true }
          ])
        ]
      }
    ]);
    expect(isValid(p)).toBe(false);
  });

  it('rifiuta markdown residuo nel prompt', () => {
    const bad: QuizRound = { ...quiz('r1', [{ label: '4', correct: true }, { label: '5', correct: false }]) };
    bad.prompt = 'Quanto fa **2+2**?';
    const p = pack([{ id: 'lv1', title: 'x', difficulty: 1, rounds: [bad] }]);
    expect(isValid(p)).toBe(false);
    expect(validatePack(p).some((i) => /markdown/.test(i.message))).toBe(true);
  });

  it('rifiuta ID duplicati', () => {
    const p = pack([
      {
        id: 'lv1',
        title: 'x',
        difficulty: 1,
        rounds: [
          quiz('r1', [
            { label: '4', correct: true },
            { label: '5', correct: false }
          ]),
          quiz('r1', [
            { label: '6', correct: true },
            { label: '7', correct: false }
          ])
        ]
      }
    ]);
    expect(validatePack(p).some((i) => /duplicat/i.test(i.message))).toBe(true);
  });

  it('rifiuta match con coppie incoerenti', () => {
    const p = pack([
      {
        id: 'lv1',
        title: 'x',
        difficulty: 1,
        rounds: [
          {
            id: 'r1',
            type: 'dragdrop',
            mode: 'match',
            prompt: 'Abbina',
            leftItems: ['A', 'B'],
            rightItems: ['X', 'Y'],
            pairs: [
              [0, 0],
              [1, 0]
            ]
          }
        ]
      }
    ]);
    expect(validatePack(p).some((i) => /usata più volte/.test(i.message))).toBe(true);
  });

  it('tutti i pacchetti embedded (3 tappe per materia) e la banca domande sono validi', () => {
    expect(EMBEDDED_PACKS).toHaveLength(4);
    for (const p of EMBEDDED_PACKS) {
      expect(p.levels.length).toBeGreaterThanOrEqual(3);
      expect(validatePack(p), `errori in ${p.packId}`).toEqual([]);
    }
    for (const [materia, voci] of Object.entries(BANCA_DOMANDE)) {
      const p: Pack = {
        packId: `qb-${materia}`,
        version: '1',
        title: materia,
        subject: materia,
        ageRange: '6-14',
        difficulty: 2,
        levels: [
          {
            id: `qb-${materia}-lv`,
            title: 'Banca',
            difficulty: 2,
            rounds: voci.map((v) => v.round)
          }
        ]
      };
      expect(validatePack(p), `errori nella banca di ${materia}`).toEqual([]);
    }
  });

  it('verifica copertura e coerenza della banca domande per tutti gli anni scolastici (P1..S3)', () => {
    const anni: ('P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'S1' | 'S2' | 'S3')[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'S1', 'S2', 'S3'];
    const materie = ['matematica', 'italiano', 'scienze', 'storia'];

    for (const m of materie) {
      const banca = BANCA_DOMANDE[m] ?? [];
      for (const a of anni) {
        const perAnno = banca.filter((t) => t.years.includes(a));
        const quiz = perAnno.filter((t) => t.round.type === 'quiz' || t.round.type === 'image');
        // Deve esserci un numero sufficiente di quesiti
        expect(perAnno.length, `${m} anno ${a} ha ${perAnno.length} domande`).toBeGreaterThanOrEqual(5);
        expect(quiz.length, `${m} anno ${a} ha ${quiz.length} quiz`).toBeGreaterThanOrEqual(4);
      }
    }
  });

  it('garantisce la rigorosa coerenza dei quesiti in base all\'anno scolastico scelto (né più semplici, né più complessi)', () => {
    const mat = EMBEDDED_PACKS.find((p) => p.subject === 'matematica')!;
    const sto = EMBEDDED_PACKS.find((p) => p.subject === 'storia')!;

    // Test S3 (Terza Media): MAI quesiti elementari di prima o seconda primaria
    const s3Mat = selectRoundsForGame(mat, mat.levels[0], {
      profileId: null,
      overrides: {},
      schoolYear: 'S3',
      randomQuestions: true
    });
    expect(s3Mat).toHaveLength(6);
    // Nessun ID da prima primaria o calcoli di base tipo 7+5 (mat-1)
    for (const r of s3Mat) {
      expect(r.id).not.toBe('mat-1');
      expect(r.id).not.toBe('mat-2');
      expect(r.id).not.toBe('mat-3');
      expect(r.id).not.toBe('mat-4');
    }

    // Test P1 (Prima Elementare): MAI quesiti avanzati di scuola media
    const p1Sto = selectRoundsForGame(sto, sto.levels[2], {
      profileId: null,
      overrides: {},
      schoolYear: 'P1',
      randomQuestions: true
    });
    expect(p1Sto).toHaveLength(6);
    for (const r of p1Sto) {
      expect(r.id).not.toBe('sto-l3-1');
      expect(r.id).not.toBe('sto-l3-2');
    }
  });

  it('selectRoundsForGame estrae 6 prove in modo casuale e varia tra partite successive', () => {
    const mat = EMBEDDED_PACKS.find((p) => p.subject === 'matematica')!;
    const lv = mat.levels[0];
    const g1 = selectRoundsForGame(mat, lv, {
      profileId: null,
      overrides: {},
      schoolYear: 'P3',
      randomQuestions: true
    });
    const g2 = selectRoundsForGame(mat, lv, {
      profileId: null,
      overrides: {},
      schoolYear: 'P3',
      randomQuestions: true
    });
    expect(g1).toHaveLength(6);
    expect(g2).toHaveLength(6);
    // Due partite consecutive attingono a domande diverse o in ordine diverso
    expect(g1.map((r) => r.id).join(',')).not.toBe(g2.map((r) => r.id).join(','));
  });
});
