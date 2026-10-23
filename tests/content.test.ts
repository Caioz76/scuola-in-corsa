import { describe, expect, it } from 'vitest';
import { isValid, validatePack } from '../src/content/validate';
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
});
