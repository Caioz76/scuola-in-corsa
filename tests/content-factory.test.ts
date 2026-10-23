import { describe, expect, it } from 'vitest';
import { normalizeRound } from '../tools/content-factory/index';

/**
 * Test della Content Factory — "Scuola in Corsa".
 *
 * PERCHÉ QUESTI TEST ESISTONO
 * La Content Factory normalizza ciò che il modello linguistico produce in round
 * validi per il gioco. Questa normalizzazione è l'unico punto di contatto fra
 * l'output di un LLM (imprevedibile) e i tipi del gioco (rigidi).
 *
 * ⚠️ Il rischio che questi test coprono: la patch A→G rende OBBLIGATORI i campi
 * `sortItems` / `leftItems` / `rightItems` / `pairs` a seconda del `mode`.
 * Se la factory smettesse di produrli correttamente, i round verrebbero scartati
 * SILENZIOSAMENTE (la factory restituisce `null` e il round sparisce) e te ne
 * accorgeresti solo contando i round generati, a generazione avvenuta.
 *
 * Questi test girano OFFLINE: non contattano LM Studio, non usano la GPU.
 */

function normalizza(raw: Record<string, unknown>) {
  return normalizeRound(raw, 'test-L1-1', new Set<string>());
}

describe('Content Factory — normalizzazione dei round', () => {
  describe('dragdrop mode "sort"', () => {
    it('produce sortItems (campo OBBLIGATORIO dopo la patch A)', () => {
      const round = normalizza({
        type: 'dragdrop',
        mode: 'sort',
        prompt: 'Metti in ordine i numeri dal più piccolo al più grande.',
        hint: 'Parti dal più piccolo.',
        explanation: 'Da 1 a 5, in ordine crescente.',
        sortItems: ['1', '2', '3', '4', '5']
      });

      expect(round, 'il round non deve essere scartato').not.toBeNull();
      const r = round;
      expect(r?.type).toBe('dragdrop');
      if (r && r.type === 'dragdrop' && r.mode === 'sort') {
        expect(r.sortItems).toEqual(['1', '2', '3', '4', '5']);
      }
    });

    it('SCARTA un sort con meno di 2 elementi', () => {
      const round = normalizza({
        type: 'dragdrop',
        mode: 'sort',
        prompt: 'Ordina.',
        sortItems: ['solo uno']
      });
      expect(round).toBeNull();
    });
  });

  describe('dragdrop mode "match"', () => {
    it('produce leftItems, rightItems E pairs (tutti obbligatori dopo la patch A)', () => {
      const round = normalizza({
        type: 'dragdrop',
        mode: 'match',
        prompt: 'Abbina ogni animale al suo verso.',
        leftItems: ['cane', 'gatto', 'mucca'],
        rightItems: ['miao', 'bau', 'muu']
      });

      expect(round).not.toBeNull();
      const r = round;
      if (r && r.type === 'dragdrop' && r.mode === 'match') {
        expect(r.leftItems).toHaveLength(3);
        expect(r.rightItems).toHaveLength(3);
        /* `pairs` diventa OBBLIGATORIO con la patch A: se manca, è un bug. */
        expect(r.pairs, 'pairs è obbligatorio: se manca, la patch A rompe tutto').toBeDefined();
        expect(r.pairs).toHaveLength(3);
      }
    });

    it('ricostruisce da sé le coppie (il modello sbaglia gli indici)', () => {
      const round = normalizza({
        type: 'dragdrop',
        mode: 'match',
        prompt: 'Abbina.',
        leftItems: ['a', 'b', 'c'],
        rightItems: ['x', 'y', 'z']
      });

      const r = round;
      expect(r).not.toBeNull();
      if (r && r.type === 'dragdrop' && r.mode === 'match') {
        /* `pairs` è opzionale PRIMA della patch A, obbligatorio DOPO.
         * Il test deve restare valido in entrambi i casi: se manca, è un
         * fallimento reale (la patch A lo rende obbligatorio). */
        const pairs = r.pairs;
        expect(pairs, 'pairs mancante: la patch A lo rende obbligatorio').toBeDefined();
        if (!pairs) return;

        /* La semantica impone pairs[i][0] === i (documentato in types.ts). */
        pairs.forEach(([sinistra], i) => {
          expect(sinistra).toBe(i);
        });
        /* Ogni indice di destra deve essere valido, senza duplicati. */
        const destri = pairs.map(([, d]) => d).sort();
        expect(destri).toEqual([0, 1, 2]);
      }
    });

    it('SCARTA un match con colonne di lunghezza diversa', () => {
      const round = normalizza({
        type: 'dragdrop',
        mode: 'match',
        prompt: 'Abbina.',
        leftItems: ['a', 'b', 'c'],
        rightItems: ['x', 'y']
      });
      expect(round).toBeNull();
    });
  });

  describe('quiz', () => {
    it('accetta un quiz con 2-4 opzioni e una sola corretta', () => {
      const round = normalizza({
        type: 'quiz',
        prompt: 'Quanto fa 2+2?',
        hint: 'Conta con le dita.',
        explanation: 'Quattro.',
        options: [
          { label: '3', correct: false },
          { label: '4', correct: true },
          { label: '5', correct: false }
        ]
      });

      expect(round).not.toBeNull();
      expect(round!.type).toBe('quiz');
    });

    it('SCARTA un quiz senza opzioni', () => {
      const round = normalizza({ type: 'quiz', prompt: 'Domanda?' });
      expect(round).toBeNull();
    });
  });

  describe('robustezza a input malformati', () => {
    it('restituisce null per un tipo sconosciuto', () => {
      const round = normalizza({ type: 'tipo-inventato', prompt: 'x' });
      expect(round).toBeNull();
    });

    it('restituisce null per un dragdrop senza mode valido', () => {
      const round = normalizza({ type: 'dragdrop', mode: 'boh', prompt: 'x' });
      expect(round).toBeNull();
    });

    it('non lancia eccezioni su input vuoto', () => {
      expect(() => normalizza({})).not.toThrow();
    });
  });

  describe('contratto coi tipi del gioco', () => {
    it('ogni round normalizzato ha un id non vuoto', () => {
      const round = normalizza({
        type: 'quiz',
        prompt: 'Quanto fa 1+1?',
        options: [
          { label: '2', correct: true },
          { label: '3', correct: false }
        ]
      });
      expect(round!.id).toBeTruthy();
    });

    it('l\'id è assegnato dal CODICE, non dal modello', () => {
      /* Anche se il modello prova a imporre un id, viene ignorato. */
      const round = normalizeRound(
        {
          type: 'quiz',
          id: 'id-inventato-dal-modello',
          prompt: 'Quanto fa 1+1?',
          options: [
            { label: '2', correct: true },
            { label: '3', correct: false }
          ]
        },
        'id-del-codice',
        new Set<string>()
      );
      expect(round!.id).toBe('id-del-codice');
    });
  });
});
