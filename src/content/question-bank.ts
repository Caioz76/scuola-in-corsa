/**
 * Banca estesa di domande per "Scuola in Corsa".
 *
 * Modella le difficoltà lungo gli 8 anni scolastici:
 *  - Primaria: P1 (1ª), P2 (2ª), P3 (3ª), P4 (4ª), P5 (5ª)
 *  - Secondaria di I grado: S1 (1ª), S2 (2ª), S3 (3ª)
 *
 * Ogni partita estrae casualmente le prove combinando quelle della tappa
 * scelta con il bacino dell'anno scolastico attivo, così il gioco resta
 * vario e mai ripetitivo.
 */
import type { AnnoScolastico } from '../bes/resolver';
import type { Round } from './types';

export interface TaggedRound {
  years: AnnoScolastico[];
  round: Round;
}

export const BANCA_DOMANDE: Record<string, TaggedRound[]> = {
  matematica: [
    // ── Primaria 1ª – 2ª (P1, P2) ─────────────────────────────────
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-mat-p1-1',
        type: 'quiz',
        support: 'numberLine',
        prompt: 'Quanto fa 4 + 3?',
        options: [
          { label: '7', correct: true },
          { label: '6', correct: false },
          { label: '8', correct: false },
          { label: '5', correct: false }
        ],
        hint: 'Parti da 4 e fai 3 passi avanti.',
        explanation: '4 + 3 = 7.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-mat-p1-2',
        type: 'quiz',
        support: 'numberLine',
        prompt: 'Quanto fa 9 − 4?',
        options: [
          { label: '5', correct: true },
          { label: '4', correct: false },
          { label: '6', correct: false },
          { label: '3', correct: false }
        ],
        hint: 'Parti da 9 e torna indietro di 4.',
        explanation: '9 − 4 = 5.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-mat-p1-3',
        type: 'quiz',
        prompt: 'Qual è il doppio di 6?',
        options: [
          { label: '12', correct: true },
          { label: '10', correct: false },
          { label: '14', correct: false },
          { label: '8', correct: false }
        ],
        hint: 'Somma 6 + 6.',
        explanation: '6 + 6 = 12.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-mat-p1-4',
        type: 'quiz',
        support: 'baseTen',
        prompt: 'Quante unità ci sono in 1 decina e 4 unità?',
        options: [
          { label: '14', correct: true },
          { label: '41', correct: false },
          { label: '10', correct: false },
          { label: '5', correct: false }
        ],
        hint: 'Una decina vale 10.',
        explanation: '10 + 4 = 14.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-mat-p1-5',
        type: 'quiz',
        support: 'numberLine',
        prompt: 'Quale numero viene subito prima di 10?',
        options: [
          { label: '9', correct: true },
          { label: '11', correct: false },
          { label: '8', correct: false },
          { label: '10', correct: false }
        ],
        hint: 'Fai un passo indietro partendo da 10.',
        explanation: 'Il precedente di 10 è 9.'
      }
    },
    {
      years: ['P1', 'P2', 'P3'],
      round: {
        id: 'qb-mat-p2-1',
        type: 'quiz',
        prompt: 'Sara ha 15 matite e ne presta 6. Quante gliene restano?',
        options: [
          { label: '9', correct: true },
          { label: '8', correct: false },
          { label: '10', correct: false },
          { label: '11', correct: false }
        ],
        hint: 'Togli 6 da 15.',
        explanation: '15 − 6 = 9.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-mat-p2-2',
        type: 'sequence',
        direction: 'tap',
        prompt: 'Tocca i numeri contando di 2 in 2.',
        items: ['2', '4', '6', '8'],
        hint: 'Ogni passo aggiunge 2.',
        explanation: 'La sequenza pari è 2, 4, 6, 8.'
      }
    },
    {
      years: ['P2', 'P3'],
      round: {
        id: 'qb-mat-p2-3',
        type: 'quiz',
        support: 'baseTen',
        prompt: 'Che numero formano 3 decine e 7 unità?',
        options: [
          { label: '37', correct: true },
          { label: '73', correct: false },
          { label: '30', correct: false },
          { label: '10', correct: false }
        ],
        hint: '3 decine valgono 30.',
        explanation: '30 + 7 = 37.'
      }
    },
    {
      years: ['P2', 'P3'],
      round: {
        id: 'qb-mat-p2-4',
        type: 'quiz',
        prompt: 'Quanto fa 25 + 15?',
        options: [
          { label: '40', correct: true },
          { label: '35', correct: false },
          { label: '45', correct: false },
          { label: '30', correct: false }
        ],
        hint: 'Somma prima 20 + 10 e poi 5 + 5.',
        explanation: '25 + 15 = 40.'
      }
    },
    // ── Primaria 3ª – 5ª (P3, P4, P5) ─────────────────────────────
    {
      years: ['P3', 'P4'],
      round: {
        id: 'qb-mat-p3-1',
        type: 'quiz',
        prompt: 'Quanto fa 6 × 7?',
        options: [
          { label: '42', correct: true },
          { label: '36', correct: false },
          { label: '48', correct: false },
          { label: '40', correct: false }
        ],
        hint: '6 × 6 fa 36, aggiungi ancora 6.',
        explanation: '6 × 7 = 42.'
      }
    },
    {
      years: ['P3', 'P4', 'P5'],
      round: {
        id: 'qb-mat-p3-2',
        type: 'quiz',
        prompt: 'Quanto fa 45 ÷ 9?',
        options: [
          { label: '5', correct: true },
          { label: '6', correct: false },
          { label: '4', correct: false },
          { label: '9', correct: false }
        ],
        hint: 'Quale numero moltiplicato per 9 dà 45?',
        explanation: '9 × 5 = 45, quindi 45 ÷ 9 = 5.'
      }
    },
    {
      years: ['P3', 'P4'],
      round: {
        id: 'qb-mat-p3-3',
        type: 'quiz',
        prompt: 'Quanti metri ci sono in 1 chilometro?',
        options: [
          { label: '1000 metri', correct: true },
          { label: '100 metri', correct: false },
          { label: '10 metri', correct: false },
          { label: '500 metri', correct: false }
        ],
        hint: 'Il prefisso chilo significa mille.',
        explanation: '1 km equivale a 1000 m.'
      }
    },
    {
      years: ['P3', 'P4', 'P5'],
      round: {
        id: 'qb-mat-p3-4',
        type: 'sequence',
        direction: 'tap',
        prompt: 'Metti in ordine crescente queste misure di lunghezza.',
        items: ['1 millimetro', '1 centimetro', '1 metro', '1 chilometro'],
        hint: 'Parti dalla misura più piccola fino alla più grande.',
        explanation: 'Dal più piccolo al più grande: mm, cm, m, km.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-mat-p4-1',
        type: 'quiz',
        prompt: 'Un quadrato ha il lato di 7 cm. Qual è il suo perimetro?',
        options: [
          { label: '28 cm', correct: true },
          { label: '14 cm', correct: false },
          { label: '49 cm', correct: false },
          { label: '21 cm', correct: false }
        ],
        hint: 'Il quadrato ha 4 lati uguali.',
        explanation: 'Perimetro = 7 × 4 = 28 cm.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-mat-p4-2',
        type: 'quiz',
        prompt: 'Quanto vale la metà di 90?',
        options: [
          { label: '45', correct: true },
          { label: '40', correct: false },
          { label: '50', correct: false },
          { label: '35', correct: false }
        ],
        hint: 'Dividi 90 per 2.',
        explanation: '90 ÷ 2 = 45.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-mat-p4-3',
        type: 'quiz',
        prompt: 'Quanto fa 2,5 + 1,5?',
        options: [
          { label: '4', correct: true },
          { label: '3,5', correct: false },
          { label: '4,5', correct: false },
          { label: '3', correct: false }
        ],
        hint: '5 decimi più 5 decimi formano 1 unità intera.',
        explanation: '2,5 + 1,5 = 4,0 cioè 4.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-mat-p5-1',
        type: 'quiz',
        prompt: 'Quanto vale 1/4 di 20?',
        options: [
          { label: '5', correct: true },
          { label: '4', correct: false },
          { label: '10', correct: false },
          { label: '8', correct: false }
        ],
        hint: 'Dividi 20 in 4 parti uguali.',
        explanation: '20 ÷ 4 = 5.'
      }
    },
    {
      years: ['P3', 'P4', 'P5'],
      round: {
        id: 'qb-mat-p5-2',
        type: 'dragdrop',
        mode: 'match',
        prompt: 'Abbina ogni moltiplicazione al risultato corretto.',
        leftItems: ['8 × 4', '9 × 5', '7 × 7'],
        rightItems: ['45', '49', '32'],
        pairs: [
          [0, 2],
          [1, 0],
          [2, 1]
        ],
        hint: 'Usa le tabelline del 7, 8 e 9.',
        explanation: '8 × 4 = 32, 9 × 5 = 45, 7 × 7 = 49.'
      }
    },
    {
      years: ['P5', 'S1'],
      round: {
        id: 'qb-mat-p5-3',
        type: 'quiz',
        prompt: 'Un rettangolo ha base 8 cm e altezza 5 cm. Qual è la sua area?',
        options: [
          { label: '40 cm²', correct: true },
          { label: '26 cm²', correct: false },
          { label: '13 cm²', correct: false },
          { label: '80 cm²', correct: false }
        ],
        hint: 'Moltiplica la base per l\'altezza.',
        explanation: 'Area = 8 × 5 = 40 cm².'
      }
    },
    {
      years: ['P5', 'S1'],
      round: {
        id: 'qb-mat-p5-4',
        type: 'quiz',
        prompt: 'Quanto valgono i 3/5 di 30?',
        options: [
          { label: '18', correct: true },
          { label: '6', correct: false },
          { label: '15', correct: false },
          { label: '20', correct: false }
        ],
        hint: 'Dividi 30 per 5 e moltiplica il risultato per 3.',
        explanation: '(30 ÷ 5) × 3 = 6 × 3 = 18.'
      }
    },
    // ── Secondaria di I grado 1ª – 3ª (S1, S2, S3) ────────────────
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-mat-s1-1',
        type: 'quiz',
        prompt: 'Quanto vale la potenza 2⁴?',
        options: [
          { label: '16', correct: true },
          { label: '8', correct: false },
          { label: '12', correct: false },
          { label: '32', correct: false }
        ],
        hint: 'Moltiplica il 2 per se stesso 4 volte.',
        explanation: '2 × 2 × 2 × 2 = 16.'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-mat-s1-2',
        type: 'quiz',
        prompt: 'Qual è il minimo comune multiplo (mcm) tra 4 e 6?',
        options: [
          { label: '12', correct: true },
          { label: '24', correct: false },
          { label: '6', correct: false },
          { label: '8', correct: false }
        ],
        hint: 'Cerca il più piccolo numero divisibile sia per 4 sia per 6.',
        explanation: 'I multipli di 4 sono 4, 8, 12... e 12 è divisibile anche per 6.'
      }
    },
    {
      years: ['S1', 'S2'],
      round: {
        id: 'qb-mat-s1-3',
        type: 'quiz',
        prompt: 'Qual è il Massimo Comune Divisore (MCD) tra 18 e 24?',
        options: [
          { label: '6', correct: true },
          { label: '3', correct: false },
          { label: '12', correct: false },
          { label: '2', correct: false }
        ],
        hint: 'Qual è il numero più grande che divide esattamente sia 18 sia 24?',
        explanation: '18 = 6 × 3 e 24 = 6 × 4, quindi il MCD è 6.'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-mat-s2-1',
        type: 'quiz',
        prompt: 'Nella proporzione 3 : 6 = x : 10, quanto vale x?',
        options: [
          { label: '5', correct: true },
          { label: '4', correct: false },
          { label: '6', correct: false },
          { label: '20', correct: false }
        ],
        hint: 'Il prodotto dei medi è uguale al prodotto degli estremi.',
        explanation: 'x = (3 × 10) ÷ 6 = 30 ÷ 6 = 5.'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-mat-s2-2',
        type: 'quiz',
        prompt: 'Un triangolo rettangolo ha i cateti di 3 cm e 4 cm. Quanto misura l\'ipotenusa?',
        options: [
          { label: '5 cm', correct: true },
          { label: '7 cm', correct: false },
          { label: '6 cm', correct: false },
          { label: '12 cm', correct: false }
        ],
        hint: 'Usa il teorema di Pitagora: √(3² + 4²).',
        explanation: '3² + 4² = 9 + 16 = 25, e la radice quadrata di 25 è 5.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-mat-s3-1',
        type: 'quiz',
        prompt: 'Risolvi l\'equazione: 2x + 5 = 17. Quanto vale x?',
        options: [
          { label: '6', correct: true },
          { label: '11', correct: false },
          { label: '5', correct: false },
          { label: '7', correct: false }
        ],
        hint: 'Porta il 5 a destra cambiando segno, poi dividi per 2.',
        explanation: '2x = 17 − 5 = 12, quindi x = 12 ÷ 2 = 6.'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-mat-s3-2',
        type: 'quiz',
        prompt: 'Quanto vale il 25% di 80?',
        options: [
          { label: '20', correct: true },
          { label: '25', correct: false },
          { label: '15', correct: false },
          { label: '40', correct: false }
        ],
        hint: 'Il 25% corrisponde a un quarto (1/4).',
        explanation: '80 ÷ 4 = 20.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-mat-s3-3',
        type: 'quiz',
        prompt: 'Nell\'insieme dei numeri relativi, quanto fa (−5) + (−3)?',
        options: [
          { label: '−8', correct: true },
          { label: '+8', correct: false },
          { label: '−2', correct: false },
          { label: '+15', correct: false }
        ],
        hint: 'Due numeri concordi negativi si sommano mantenendo il segno meno.',
        explanation: '(−5) + (−3) = −8.'
      }
    },

  // ── Primaria 1ª – 2ª (P1, P2) ─────────────────────────────────
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-6',
      type: 'quiz',
      support: 'numberLine',
      prompt: 'Qual è il numero pari tra questi?',
      options: [
        { label: '8', correct: true },
        { label: '7', correct: false },
        { label: '5', correct: false },
        { label: '9', correct: false }
      ],
      hint: 'I numeri pari si possono dividere in due parti uguali.',
      explanation: '8 è pari perché 4 + 4 = 8.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-7',
      type: 'quiz',
      support: 'numberLine',
      prompt: 'Quanto fa 10 − 7?',
      options: [
        { label: '3', correct: true },
        { label: '2', correct: false },
        { label: '4', correct: false },
        { label: '5', correct: false }
      ],
      hint: 'Pensa a quanto manca a 7 per arrivare a 10.',
      explanation: '10 − 7 = 3 (perché 7 + 3 = 10).'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-8',
      type: 'image',
      icon: 'abaco',
      prompt: 'Quale strumento per contare vedi nell\'immagine?',
      options: [
        { label: 'Un abaco', correct: true },
        { label: 'Una bilancia', correct: false },
        { label: 'Un orologio', correct: false }
      ],
      hint: 'Ha palline colorate infilate su aste verticali.',
      explanation: 'L\'abaco serve per contare unità, decine e centinaia.'
    }
  },
  {
    years: ['P2', 'P3'],
    round: {
      id: 'qb-mat-p2-5',
      type: 'quiz',
      prompt: 'Quanto fa 5 × 4?',
      options: [
        { label: '20', correct: true },
        { label: '15', correct: false },
        { label: '25', correct: false },
        { label: '18', correct: false }
      ],
      hint: 'Conta di 5 in 5 per 4 volte: 5, 10, 15...',
      explanation: '5 × 4 = 20.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p2-6',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Trascina e ordina i numeri dal più piccolo al più grande.',
      sortItems: ['3', '7', '12', '19'],
      hint: 'Inizia dal numero minore.',
      explanation: 'L\'ordine crescente corretto è 3, 7, 12, 19.'
    }
  },
  {
    years: ['P2', 'P3'],
    round: {
      id: 'qb-mat-p2-7',
      type: 'quiz',
      prompt: 'Marco compra un gelato da 2 euro e paga con una banconota da 5 euro. Quanto riceve di resto?',
      options: [
        { label: '3 euro', correct: true },
        { label: '2 euro', correct: false },
        { label: '4 euro', correct: false },
        { label: '1 euro', correct: false }
      ],
      hint: 'Calcola 5 − 2.',
      explanation: '5 − 2 = 3 euro di resto.'
    }
  },

  // ── Primaria 3ª – 4ª – 5ª (P3, P4, P5) ─────────────────────────
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-mat-p3-5',
      type: 'quiz',
      prompt: 'Quanto fa 7 × 8?',
      options: [
        { label: '56', correct: true },
        { label: '54', correct: false },
        { label: '64', correct: false },
        { label: '48', correct: false }
      ],
      hint: 'Pensa alla tabellina dell\'8: 8 × 7.',
      explanation: '7 × 8 = 56.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-mat-p3-6',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni moltiplicazione al suo risultato.',
      leftItems: ['6 × 6', '9 × 3', '4 × 7'],
      rightItems: ['36', '27', '28'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Calcola una moltiplicazione alla volta.',
      explanation: '6 × 6 = 36; 9 × 3 = 27; 4 × 7 = 28.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-mat-p3-7',
      type: 'quiz',
      prompt: 'Qual è il perimetro di un rettangolo con base di 8 cm e altezza di 5 cm?',
      options: [
        { label: '26 cm', correct: true },
        { label: '40 cm', correct: false },
        { label: '13 cm', correct: false },
        { label: '24 cm', correct: false }
      ],
      hint: 'Il perimetro è la somma di tutti e 4 i lati: (8 + 5) × 2.',
      explanation: '(8 + 5) × 2 = 13 × 2 = 26 cm.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-mat-p4-4',
      type: 'quiz',
      prompt: 'Quanto vale la frazione 3/4 di 24?',
      options: [
        { label: '18', correct: true },
        { label: '16', correct: false },
        { label: '20', correct: false },
        { label: '12', correct: false }
      ],
      hint: 'Dividi 24 per 4 (denominatore) e moltiplica il risultato per 3.',
      explanation: '24 : 4 = 6, poi 6 × 3 = 18.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-mat-p4-5',
      type: 'quiz',
      prompt: 'Quale numero decimale corrisponde alla frazione 1/2?',
      options: [
        { label: '0,5', correct: true },
        { label: '0,2', correct: false },
        { label: '1,2', correct: false },
        { label: '0,05', correct: false }
      ],
      hint: 'La metà di 1 intero si scrive con 5 decimi.',
      explanation: '1 : 2 = 0,5.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-mat-p4-6',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Tocca le unità di misura di lunghezza in ordine dalla più piccola alla più grande.',
      items: ['millimetro', 'centimetro', 'metro', 'chilometro'],
      hint: 'Parti da quella usata per la punta della matita fino alla distanza tra città.',
      explanation: 'L\'ordine corretto è millimetro, centimetro, metro, chilometro.'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-mat-p5-5',
      type: 'quiz',
      prompt: 'Qual è l\'area di un triangolo con base di 10 cm e altezza di 6 cm?',
      options: [
        { label: '30 cm²', correct: true },
        { label: '60 cm²', correct: false },
        { label: '16 cm²', correct: false },
        { label: '25 cm²', correct: false }
      ],
      hint: 'La formula dell\'area del triangolo è: (base × altezza) : 2.',
      explanation: '(10 × 6) : 2 = 60 : 2 = 30 cm².'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-mat-p5-6',
      type: 'quiz',
      prompt: 'A quale percentuale corrisponde la frazione 1/4?',
      options: [
        { label: '25%', correct: true },
        { label: '20%', correct: false },
        { label: '50%', correct: false },
        { label: '40%', correct: false }
      ],
      hint: 'Pensa a un quarto di 100.',
      explanation: '100 : 4 = 25%.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-mat-p5-7',
      type: 'quiz',
      prompt: 'Quanti grammi ci sono in 2,5 chilogrammi?',
      options: [
        { label: '2500 g', correct: true },
        { label: '250 g', correct: false },
        { label: '25 g', correct: false },
        { label: '25000 g', correct: false }
      ],
      hint: '1 chilogrammo vale 1000 grammi. Moltiplica 2,5 per 1000.',
      explanation: '2,5 × 1000 = 2500 grammi.'
    }
  },

  // ── Secondaria di I grado (S1, S2, S3) ───────────────────────────
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-mat-s1-4',
      type: 'quiz',
      prompt: 'Qual è il Massimo Comune Divisore (MCD) tra 18 e 24?',
      options: [
        { label: '6', correct: true },
        { label: '3', correct: false },
        { label: '12', correct: false },
        { label: '2', correct: false }
      ],
      hint: 'Trova il divisore comune più grande tra 18 e 24.',
      explanation: 'I divisori di 18 sono 1, 2, 3, 6, 9, 18; quelli di 24 sono 1, 2, 3, 4, 6, 8, 12, 24. Il massimo comune è 6.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-mat-s1-5',
      type: 'quiz',
      prompt: 'Quanto vale la potenza 2⁵?',
      options: [
        { label: '32', correct: true },
        { label: '10', correct: false },
        { label: '16', correct: false },
        { label: '64', correct: false }
      ],
      hint: 'Moltiplica 2 per se stesso 5 volte: 2 × 2 × 2 × 2 × 2.',
      explanation: '2 × 2 × 2 × 2 × 2 = 32.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-mat-s1-6',
      type: 'quiz',
      prompt: 'Secondo le proprietà delle potenze, quanto fa 3⁴ × 3²?',
      options: [
        { label: '3⁶', correct: true },
        { label: '3⁸', correct: false },
        { label: '9⁶', correct: false },
        { label: '3²', correct: false }
      ],
      hint: 'Nel prodotto di potenze con stessa base gli esponenti si sommano: 4 + 2.',
      explanation: '3⁴ × 3² = 3⁴⁺² = 3⁶.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s2-3',
      type: 'quiz',
      prompt: 'In un triangolo rettangolo i cateti misurano 6 cm e 8 cm. Quanto misura l\'ipotenusa?',
      options: [
        { label: '10 cm', correct: true },
        { label: '14 cm', correct: false },
        { label: '12 cm', correct: false },
        { label: '9 cm', correct: false }
      ],
      hint: 'Teorema di Pitagora: radice quadrata di (6² + 8²) = radice di (36 + 64).',
      explanation: '√(36 + 64) = √100 = 10 cm.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s2-4',
      type: 'quiz',
      prompt: 'Nella proporzione 4 : 6 = 10 : x, quanto vale l\'incognita x?',
      options: [
        { label: '15', correct: true },
        { label: '12', correct: false },
        { label: '20', correct: false },
        { label: '16', correct: false }
      ],
      hint: 'Il prodotto dei medi è uguale al prodotto degli estremi: x = (6 × 10) : 4.',
      explanation: 'x = (6 × 10) : 4 = 60 : 4 = 15.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s2-5',
      type: 'quiz',
      prompt: 'Quanto fa il prodotto tra numeri relativi (−4) × (−5)?',
      options: [
        { label: '+20', correct: true },
        { label: '−20', correct: false },
        { label: '−9', correct: false },
        { label: '+9', correct: false }
      ],
      hint: 'Meno per meno fa più.',
      explanation: 'Due numeri concordi negativi moltiplicati danno segno positivo: (−4) × (−5) = +20.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s3-4',
      type: 'quiz',
      prompt: 'Qual è la soluzione dell\'equazione di primo grado: 3x − 7 = 14?',
      options: [
        { label: 'x = 7', correct: true },
        { label: 'x = 5', correct: false },
        { label: 'x = 3', correct: false },
        { label: 'x = 21', correct: false }
      ],
      hint: 'Sposta il −7 a destra cambiandolo di segno: 3x = 14 + 7, poi dividi per 3.',
      explanation: '3x = 21, quindi x = 21 : 3 = 7.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s3-5',
      type: 'quiz',
      prompt: 'Qual è il volume di un cubo con lo spigolo di 5 cm?',
      options: [
        { label: '125 cm³', correct: true },
        { label: '25 cm³', correct: false },
        { label: '150 cm³', correct: false },
        { label: '75 cm³', correct: false }
      ],
      hint: 'La formula del volume del cubo è spigolo al cubo: s³ = 5 × 5 × 5.',
      explanation: '5 × 5 × 5 = 125 cm³.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s3-6',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascuna figura geometrica alla sua formula dell\'area.',
      leftItems: ['Quadrato', 'Rettangolo', 'Triangolo'],
      rightItems: ['lato × lato', 'base × altezza', '(base × altezza) : 2'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Pensa alle formule standard di calcolo delle superfici piane.',
      explanation: 'Area quadrato: l²; Area rettangolo: b × h; Area triangolo: (b × h) : 2.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-mat-s1-m1',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni potenza al suo risultato corretto.',
      leftItems: ['2³', '3²', '10²', '5²'],
      rightItems: ['8', '9', '100', '25'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3]
      ],
      hint: 'Moltiplica la base per se stessa: 2×2×2, 3×3, 10×10, 5×5.',
      explanation: '2³ = 8, 3² = 9, 10² = 100, 5² = 25.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-mat-s1-s1',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Metti in ordine crescente i numeri relativi (dal più piccolo al più grande).',
      sortItems: ['−8', '−2', '0', '+3', '+7'],
      hint: 'I numeri negativi più lontani dallo zero sono i più piccoli.',
      explanation: 'L\'ordine corretto è −8, −2, 0, +3, +7.'
    }
  },
  {
    years: ['S3'],
    round: {
      id: 'qb-mat-s3-m2',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascuna espressione algebrica o teorema alla sua formula.',
      leftItems: ['Teorema di Pitagora', 'Area del cerchio', 'Quadrato di binomio'],
      rightItems: ['c² = a² + b²', 'π × r²', 'a² + 2ab + b²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Pitagora calcola il quadrato dell\'ipotenusa; l\'area del cerchio usa pi greco.',
      explanation: 'Pitagora: c² = a² + b²; Cerchio: πr²; Quadrato di binomio: a² + 2ab + b².'
    }
  },

  // ── Integrazione percorsi: Primaria 1ª – 2ª (P1, P2) ──────────────
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-ext-1',
      type: 'quiz',
      prompt: 'Qual è il numero più grande tra 3, 7 e 5?',
      options: [
        { label: '7', correct: true },
        { label: '5', correct: false },
        { label: '3', correct: false }
      ],
      hint: 'Pensa a quale numero viene dopo quando conti.',
      explanation: '7 è maggiore sia di 5 che di 3.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-ext-2',
      type: 'quiz',
      prompt: 'Se hai 6 matite e ne regali 2, quante matite ti rimangono?',
      options: [
        { label: '4', correct: true },
        { label: '3', correct: false },
        { label: '5', correct: false },
        { label: '8', correct: false }
      ],
      hint: 'Fai una sottrazione: 6 meno 2.',
      explanation: '6 − 2 = 4 matite.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-ext-3',
      type: 'quiz',
      prompt: 'Quanto fa 5 + 5?',
      options: [
        { label: '10', correct: true },
        { label: '9', correct: false },
        { label: '11', correct: false },
        { label: '8', correct: false }
      ],
      hint: 'Pensa alle dita delle due mani insieme.',
      explanation: '5 + 5 fa 10, cioè esattamente una decina.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-ext-4',
      type: 'image',
      icon: 'mela',
      prompt: 'Ci sono 4 mele rosse e 3 mele verdi. Quante mele in tutto?',
      options: [
        { label: '7', correct: true },
        { label: '6', correct: false },
        { label: '8', correct: false }
      ],
      hint: 'Unisci le due quantità: 4 + 3.',
      explanation: '4 + 3 = 7 mele in totale.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-ext-5',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Tocca i numeri in ordine crescente partendo da 1.',
      items: ['1', '2', '3', '4', '5'],
      hint: 'Conta dal più piccolo al più grande.',
      explanation: 'L\'ordine naturale è 1, 2, 3, 4, 5.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-ext-6',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Conta all\'indietro partendo da 5.',
      items: ['5', '4', '3', '2', '1'],
      hint: 'Fai il conto alla rovescia.',
      explanation: 'All\'indietro: 5, 4, 3, 2, 1.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-ext-7',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni addizione semplice al suo risultato.',
      leftItems: ['2 + 2', '3 + 2', '4 + 2'],
      rightItems: ['5', '4', '6'],
      pairs: [[0, 1], [1, 0], [2, 2]],
      hint: 'Calcola le somme una alla volta.',
      explanation: '2 + 2 = 4, 3 + 2 = 5, 4 + 2 = 6.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-ext-8',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni figura geometrica al numero dei suoi lati.',
      leftItems: ['Triangolo', 'Quadrato', 'Cerchio'],
      rightItems: ['4 lati', '0 lati', '3 lati'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Il triangolo ha tre lati, il quadrato ne ha quattro, il cerchio è una linea curva chiusa.',
      explanation: 'Triangolo = 3 lati, Quadrato = 4 lati, Cerchio = 0 lati rettilinei.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-mat-p1-ext-9',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina questi numeri dal minore al maggiore.',
      sortItems: ['2', '6', '9', '15'],
      hint: 'Trova il numero più piccolo e mettilo per primo.',
      explanation: 'L\'ordine crescente è 2, 6, 9, 15.'
    }
  },
  // ── Integrazione percorsi: Primaria 3ª – 5ª (P3, P4, P5) ──────────
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-mat-p3-ext-1',
      type: 'quiz',
      prompt: 'Quanto fa 6 × 7?',
      options: [
        { label: '42', correct: true },
        { label: '36', correct: false },
        { label: '48', correct: false },
        { label: '40', correct: false }
      ],
      hint: 'Pensa alla tabellina del 6: 6 × 6 = 36, aggiungi 6.',
      explanation: '6 × 7 = 42.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-mat-p3-ext-2',
      type: 'quiz',
      prompt: 'Quanto fa 48 ÷ 6?',
      options: [
        { label: '8', correct: true },
        { label: '7', correct: false },
        { label: '9', correct: false },
        { label: '6', correct: false }
      ],
      hint: 'Quale numero moltiplicato per 6 dà 48?',
      explanation: '6 × 8 = 48, quindi 48 ÷ 6 = 8.'
    }
  },
  {
    years: ['P3', 'P4', 'P5'],
    round: {
      id: 'qb-mat-p3-ext-3',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Tocca i multipli di 4 in ordine crescente.',
      items: ['4', '8', '12', '16'],
      hint: 'Aggiungi 4 a ogni passo: tabellina del 4.',
      explanation: '4, 8, 12, 16.'
    }
  },
  {
    years: ['P3', 'P4', 'P5'],
    round: {
      id: 'qb-mat-p3-ext-4',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni frazione al suo significato.',
      leftItems: ['1/2', '1/4', '3/4'],
      rightItems: ['Tre quarti', 'La metà', 'Un quarto'],
      pairs: [[0, 1], [1, 2], [2, 0]],
      hint: '1/2 è la metà, 1/4 è un quarto.',
      explanation: '1/2 = la metà; 1/4 = un quarto; 3/4 = tre quarti.'
    }
  },
  {
    years: ['P3', 'P4', 'P5'],
    round: {
      id: 'qb-mat-p3-ext-5',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina i numeri di tre cifre dal più piccolo al più grande.',
      sortItems: ['120', '240', '360', '480'],
      hint: 'Confronta prima le centinaia.',
      explanation: '120 < 240 < 360 < 480.'
    }
  },
  {
    years: ['P4', 'P5', 'S1'],
    round: {
      id: 'qb-mat-p4-ext-1',
      type: 'quiz',
      prompt: 'Un rettangolo ha la base di 6 cm e l\'altezza di 4 cm. Quanto misura il perimetro?',
      options: [
        { label: '20 cm', correct: true },
        { label: '24 cm', correct: false },
        { label: '10 cm', correct: false },
        { label: '16 cm', correct: false }
      ],
      hint: 'Il perimetro è (base + altezza) × 2.',
      explanation: '(6 + 4) × 2 = 10 × 2 = 20 cm.'
    }
  },
  {
    years: ['P4', 'P5', 'S1'],
    round: {
      id: 'qb-mat-p4-ext-2',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina le unità di misura alla grandezza corrispondente.',
      leftItems: ['Chilometro', 'Litro', 'Chilogrammo'],
      rightItems: ['Capacità', 'Lunghezza', 'Peso (massa)'],
      pairs: [[0, 1], [1, 0], [2, 2]],
      hint: 'I chilometri misurano distanze, i litri liquidi, i chilogrammi il peso.',
      explanation: 'Km = lunghezza; Litro = capacità; Kg = massa/peso.'
    }
  },
  {
    years: ['P5', 'S1', 'S2'],
    round: {
      id: 'qb-mat-p5-ext-1',
      type: 'quiz',
      prompt: 'Quanto vale il 25% di 80?',
      options: [
        { label: '20', correct: true },
        { label: '25', correct: false },
        { label: '40', correct: false },
        { label: '15', correct: false }
      ],
      hint: 'Il 25% equivale a un quarto: 80 ÷ 4.',
      explanation: '80 ÷ 4 = 20.'
    }
  },
  {
    years: ['P5', 'S1', 'S2'],
    round: {
      id: 'qb-mat-p5-ext-2',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina i numeri decimali dal minore al maggiore.',
      sortItems: ['0.2', '0.5', '1.2', '2.0'],
      hint: 'Confronta prima la parte intera e poi i decimi.',
      explanation: '0.2 < 0.5 < 1.2 < 2.0.'
    }
  },
  // ── Integrazione percorsi: Secondaria 1ª – 3ª (S1, S2, S3) ─────────
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-mat-s1-ext-1',
      type: 'quiz',
      prompt: 'Quanto fa (−4) × (−3)?',
      options: [
        { label: '+12', correct: true },
        { label: '−12', correct: false },
        { label: '−7', correct: false },
        { label: '+7', correct: false }
      ],
      hint: 'Il prodotto di due numeri concordi negativi è sempre positivo.',
      explanation: 'Meno per meno fa più: (−4) × (−3) = +12.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-mat-s1-ext-2',
      type: 'quiz',
      prompt: 'Qual è la radice quadrata di 81?',
      options: [
        { label: '9', correct: true },
        { label: '8', correct: false },
        { label: '7', correct: false },
        { label: '18', correct: false }
      ],
      hint: 'Quale numero elevato al quadrato dà 81?',
      explanation: '9 × 9 = 81, quindi √81 = 9.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-mat-s1-ext-3',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Tocca i quadrati perfetti in ordine crescente.',
      items: ['4', '9', '16', '25'],
      hint: '2², 3², 4², 5².',
      explanation: '2²=4, 3²=9, 4²=16, 5²=25.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-mat-s1-ext-4',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni potenza al suo valore calcolato.',
      leftItems: ['2³', '3²', '5²'],
      rightItems: ['9', '25', '8'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: '2³ = 2×2×2 = 8; 3² = 3×3 = 9; 5² = 5×5 = 25.',
      explanation: '2³=8, 3²=9, 5²=25.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s2-ext-1',
      type: 'quiz',
      prompt: 'In un triangolo rettangolo, se i cateti misurano 3 cm e 4 cm, quanto misura l\'ipotenusa?',
      options: [
        { label: '5 cm', correct: true },
        { label: '7 cm', correct: false },
        { label: '6 cm', correct: false },
        { label: '8 cm', correct: false }
      ],
      hint: 'Usa il Teorema di Pitagora: √(3² + 4²) = √(9 + 16).',
      explanation: '√(9 + 16) = √25 = 5 cm.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s2-ext-2',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina questi numeri relativi dal minore al maggiore.',
      sortItems: ['−10', '−3', '0', '+5'],
      hint: 'I numeri negativi con valore assoluto più grande sono i più piccoli.',
      explanation: '−10 < −3 < 0 < +5.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s3-ext-1',
      type: 'quiz',
      prompt: 'Qual è il valore di x nell\'equazione di primo grado 3x − 6 = 12?',
      options: [
        { label: 'x = 6', correct: true },
        { label: 'x = 4', correct: false },
        { label: 'x = 8', correct: false },
        { label: 'x = 2', correct: false }
      ],
      hint: 'Aggiungi 6 a entrambi i membri: 3x = 18, poi dividi per 3.',
      explanation: '3x = 18 → x = 6.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-mat-s3-ext-2',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni espressione algebrica al suo risultato.',
      leftItems: ['(−3) + 7', '(−2) − 5', '(−4) × 2'],
      rightItems: ['−7', '−8', '+4'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Attento ai segni nelle somme e moltiplicazioni.',
      explanation: '−3 + 7 = +4; −2 − 5 = −7; −4 × 2 = −8.'
    }
  },


    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e1",
        type: "quiz",
        prompt: "Quale figura geometrica non ha spigoli né vertici ed è perfettamente rotonda?",
        options: [
          { label: "Il cerchio", correct: true },
          { label: "Il quadrato", correct: false },
          { label: "Il triangolo", correct: false }
        ],
        hint: "Pensa alla forma di una pizza o di una ruota.",
        explanation: "Il cerchio ha una linea curva chiusa, senza angoli né spigoli."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e2",
        type: "quiz",
        prompt: "Nel salvadanaio hai due monete da 2 euro e una da 1 euro. Quanti euro hai in tutto?",
        options: [
          { label: "5 euro", correct: true },
          { label: "4 euro", correct: false },
          { label: "6 euro", correct: false }
        ],
        hint: "Conta: 2 + 2 = 4, più un altro euro.",
        explanation: "2 + 2 + 1 = 5 euro."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e3",
        type: "quiz",
        prompt: "Quale simbolo si usa per dire che un numero è MAGGIORE di un altro?",
        options: [
          { label: ">", correct: true },
          { label: "<", correct: false },
          { label: "=", correct: false }
        ],
        hint: "La punta guarda sempre verso il numero più piccolo, l'apertura verso il più grande.",
        explanation: "Il simbolo '>' significa 'maggiore di', ad esempio 8 > 3."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e4",
        type: "quiz",
        prompt: "Se hai una scatola con 1 decina di matite, quante matite ci sono dentro?",
        options: [
          { label: "10", correct: true },
          { label: "12", correct: false },
          { label: "1", correct: false }
        ],
        hint: "La parola decina deriva dal numero 10.",
        explanation: "Una decina è formata esattamente da 10 unità."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e5",
        type: "quiz",
        prompt: "Quale numero è DISPARI tra questi?",
        options: [
          { label: "7", correct: true },
          { label: "6", correct: false },
          { label: "8", correct: false },
          { label: "4", correct: false }
        ],
        hint: "I numeri dispari non si possono dividere in due parti uguali di numeri interi.",
        explanation: "7 è un numero dispari (1, 3, 5, 7, 9...)."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e6",
        type: "quiz",
        prompt: "Luca è il terzo della fila. Quanti bambini ci sono davanti a lui?",
        options: [
          { label: "2 bambini", correct: true },
          { label: "3 bambini", correct: false },
          { label: "1 bambino", correct: false }
        ],
        hint: "Ci sono il primo e il secondo.",
        explanation: "Davanti al terzo ci sono 2 bambini: il primo e il secondo."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e7",
        type: "dragdrop",
        mode: "sort",
        prompt: "Metti in ordine i numeri dal più piccolo al più grande (ordine crescente).",
        sortItems: ["2", "7", "11", "19"],
        hint: "Trova il numero minore e mettilo per primo.",
        explanation: "2 < 7 < 11 < 19."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e8",
        type: "quiz",
        prompt: "Sul tavolo ci sono 14 caramelle. I bambini ne mangiano 4. Quante ne rimangono?",
        options: [
          { label: "10", correct: true },
          { label: "8", correct: false },
          { label: "12", correct: false }
        ],
        hint: "14 meno le 4 caramelle mangiate.",
        explanation: "14 − 4 = 10 caramelle."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e9",
        type: "quiz",
        prompt: "Quale tra questi oggetti è generalmente il più PESANTE?",
        options: [
          { label: "Uno zaino pieno di libri", correct: true },
          { label: "Una matita", correct: false },
          { label: "Un foglio di carta", correct: false }
        ],
        hint: "Pensa a cosa fai più fatica a sollevare.",
        explanation: "Lo zaino pieno pesa diversi chili, molto più di una matita o di un foglio."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e10",
        type: "quiz",
        prompt: "Quanti lati ha un triangolo?",
        options: [
          { label: "3 lati", correct: true },
          { label: "4 lati", correct: false },
          { label: "5 lati", correct: false }
        ],
        hint: "La parola 'tri-angolo' indica il numero 3.",
        explanation: "Il triangolo ha 3 lati e 3 vertici."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e11",
        type: "quiz",
        prompt: "Qual è il numero che precede (viene prima di) 19?",
        options: [
          { label: "18", correct: true },
          { label: "20", correct: false },
          { label: "17", correct: false }
        ],
        hint: "Togli 1 da 19.",
        explanation: "Prima del 19 c'è il 18."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e12",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni numero al suo 'amico del 10' (coppia che somma 10).",
        leftItems: ["3", "6", "8"],
        rightItems: ["7", "4", "2"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Quanto manca a ciascun numero per arrivare a 10?",
        explanation: "3+7=10, 6+4=10, 8+2=10."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e13",
        type: "quiz",
        prompt: "Hai 6 mele rosse e 6 mele verdi. Quante mele hai in totale?",
        options: [
          { label: "12 mele", correct: true },
          { label: "10 mele", correct: false },
          { label: "14 mele", correct: false }
        ],
        hint: "Il doppio di 6.",
        explanation: "6 + 6 = 12 mele (una dozzina)."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e14",
        type: "quiz",
        prompt: "Quale tra queste linee è una linea CURVA aperta?",
        options: [
          { label: "Un filo ondulato appoggiato sul tavolo", correct: true },
          { label: "Il bordo di un cerchio chiuso", correct: false },
          { label: "Il bordo dritto di un righello", correct: false }
        ],
        hint: "È una linea con curve che non si richiude su se stessa.",
        explanation: "Un filo ondulato aperto è una linea curva aperta."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-mat-p1-e15",
        type: "quiz",
        prompt: "Se conti all'indietro partendo da 10: 10, 9, 8... quale numero viene dopo?",
        options: [
          { label: "7", correct: true },
          { label: "6", correct: false },
          { label: "5", correct: false }
        ],
        hint: "Togli 1 da 8.",
        explanation: "Contando all'indietro: 10, 9, 8, 7, 6..."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e1",
        type: "quiz",
        prompt: "Un orologio a lancette ha la lancetta corta sul 4 e quella lunga sul 12. Che ora è?",
        options: [
          { label: "Le 4 in punto", correct: true },
          { label: "Le 12 e 20", correct: false },
          { label: "Le 4 e mezza", correct: false }
        ],
        hint: "La lancetta corta segna le ore, quella lunga i minuti.",
        explanation: "Quando la lancetta lunga è sul 12 e la corta sul 4 sono le 4:00 in punto."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e2",
        type: "quiz",
        prompt: "Quanto fa 4 × 5?",
        options: [
          { label: "20", correct: true },
          { label: "25", correct: false },
          { label: "16", correct: false }
        ],
        hint: "Conta di 5 in 5 per 4 volte: 5, 10, 15...",
        explanation: "4 × 5 = 20."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e3",
        type: "quiz",
        prompt: "Quale numero è formato da 5 decine e 0 unità?",
        options: [
          { label: "50", correct: true },
          { label: "5", correct: false },
          { label: "500", correct: false }
        ],
        hint: "5 decine valgono 5 volte 10.",
        explanation: "5 decine e 0 unità formano il numero 50."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e4",
        type: "quiz",
        prompt: "Per misurare la lunghezza di una gomma per cancellare, quale unità di misura usi?",
        options: [
          { label: "Centimetri (cm)", correct: true },
          { label: "Chilometri (km)", correct: false },
          { label: "Litri (l)", correct: false }
        ],
        hint: "I chilometri servono per le distanze tra città, i litri per i liquidi.",
        explanation: "I piccoli oggetti si misurano con il righello in centimetri (cm)."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e5",
        type: "quiz",
        prompt: "Quanto fa 60 − 25?",
        options: [
          { label: "35", correct: true },
          { label: "45", correct: false },
          { label: "30", correct: false }
        ],
        hint: "Fai 60 − 20 = 40, poi 40 − 5.",
        explanation: "60 − 25 = 35."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e6",
        type: "quiz",
        prompt: "Una confezione contiene 6 uova. Quante uova ci sono in 3 confezioni uguali?",
        options: [
          { label: "18 uova", correct: true },
          { label: "12 uova", correct: false },
          { label: "24 uova", correct: false }
        ],
        hint: "Moltiplica 6 uova per 3 confezioni.",
        explanation: "6 × 3 = 18 uova."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni solido alla figura piana della sua faccia.",
        leftItems: ["Cubo", "Piramide a base quadrata", "Cilindro (la base)"],
        rightItems: ["Quadrato", "Triangolo", "Cerchio"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Guarda le facce esterne di ogni solido.",
        explanation: "Il cubo ha facce quadrate, la piramide facce triangolari, il cilindro basi circolari."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e8",
        type: "quiz",
        prompt: "Qual è il triplo di 7?",
        options: [
          { label: "21", correct: true },
          { label: "14", correct: false },
          { label: "24", correct: false }
        ],
        hint: "Triplo significa moltiplicare per 3.",
        explanation: "7 × 3 = 21."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e9",
        type: "quiz",
        prompt: "Hai 12 caramelle e vuoi dividerle in parti uguali tra 4 amici. Quante caramelle riceve ciascuno?",
        options: [
          { label: "3 caramelle", correct: true },
          { label: "4 caramelle", correct: false },
          { label: "2 caramelle", correct: false }
        ],
        hint: "Esegui una divisione: 12 diviso 4.",
        explanation: "12 ÷ 4 = 3 caramelle ciascuno."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e10",
        type: "quiz",
        prompt: "Quanti vertici (angoli a punta) ha un rettangolo?",
        options: [
          { label: "4", correct: true },
          { label: "3", correct: false },
          { label: "6", correct: false }
        ],
        hint: "Conta gli angoli retti del rettangolo.",
        explanation: "Il rettangolo ha 4 lati e 4 vertici."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e11",
        type: "quiz",
        prompt: "Se pieghi a metà un foglio e le due parti combaciano alla perfezione, la linea di piega si chiama...",
        options: [
          { label: "Asse di simmetria", correct: true },
          { label: "Diagonale", correct: false },
          { label: "Spigolo", correct: false }
        ],
        hint: "Rende le due metà perfettamente speculari.",
        explanation: "La linea che divide una figura in due parti perfettamente speculari è l'asse di simmetria."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e12",
        type: "quiz",
        prompt: "Quanto fa 100 − 30?",
        options: [
          { label: "70", correct: true },
          { label: "60", correct: false },
          { label: "80", correct: false }
        ],
        hint: "10 decine meno 3 decine.",
        explanation: "100 − 30 = 70."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e13",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i risultati delle moltiplicazioni dal più piccolo al più grande.",
        sortItems: ["2 × 3 (6)", "3 × 4 (12)", "5 × 4 (20)", "6 × 5 (30)"],
        hint: "Calcola il valore di ciascuna operazione.",
        explanation: "6 < 12 < 20 < 30."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e14",
        type: "quiz",
        prompt: "Se compri un quaderno da 3 euro e paghi con una banconota da 10 euro, quanto ti danno di resto?",
        options: [
          { label: "7 euro", correct: true },
          { label: "8 euro", correct: false },
          { label: "6 euro", correct: false }
        ],
        hint: "10 − 3.",
        explanation: "10 − 3 = 7 euro di resto."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-mat-p2-e15",
        type: "quiz",
        prompt: "Quale numero viene subito dopo il 99?",
        options: [
          { label: "100", correct: true },
          { label: "101", correct: false },
          { label: "90", correct: false }
        ],
        hint: "È il primo numero a tre cifre.",
        explanation: "99 + 1 = 100 (un centinaio)."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e1",
        type: "quiz",
        prompt: "Un triangolo ha tutti e tre i lati uguali tra loro. Come si chiama?",
        options: [
          { label: "Triangolo equilatero", correct: true },
          { label: "Triangolo isoscele", correct: false },
          { label: "Triangolo scaleno", correct: false }
        ],
        hint: "'Equi' significa uguale: tutti i lati hanno la stessa lunghezza.",
        explanation: "Un triangolo con 3 lati congruenti è detto equilatero."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e2",
        type: "quiz",
        prompt: "Quanto fa 8 × 9?",
        options: [
          { label: "72", correct: true },
          { label: "64", correct: false },
          { label: "81", correct: false }
        ],
        hint: "Pensa alla tabellina dell'8 o del 9.",
        explanation: "8 × 9 = 72."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e3",
        type: "quiz",
        prompt: "Quanti grammi ci sono in 1 chilogrammo (kg)?",
        options: [
          { label: "1.000 grammi", correct: true },
          { label: "100 grammi", correct: false },
          { label: "10 grammi", correct: false }
        ],
        hint: "Il prefisso 'chilo-' indica mille.",
        explanation: "1 kg = 1.000 g."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e4",
        type: "quiz",
        prompt: "In una pizza divisa in 4 fette uguali, mangi 1 fetta. Quale frazione di pizza hai mangiato?",
        options: [
          { label: "1/4", correct: true },
          { label: "1/2", correct: false },
          { label: "3/4", correct: false }
        ],
        hint: "1 parte considerata su 4 parti totali.",
        explanation: "Hai mangiato un quarto (1/4) della pizza."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e5",
        type: "quiz",
        prompt: "Quanto fa 48 ÷ 6?",
        options: [
          { label: "8", correct: true },
          { label: "7", correct: false },
          { label: "9", correct: false }
        ],
        hint: "Quale numero moltiplicato per 6 dà 48?",
        explanation: "6 × 8 = 48, quindi 48 ÷ 6 = 8."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e6",
        type: "quiz",
        prompt: "Un quadrato ha il lato di 6 cm. Quanto misura il suo perimetro?",
        options: [
          { label: "24 cm", correct: true },
          { label: "36 cm", correct: false },
          { label: "18 cm", correct: false }
        ],
        hint: "Il perimetro è la somma di tutti e 4 i lati: 6 × 4.",
        explanation: "Il perimetro del quadrato si calcola lato × 4: 6 × 4 = 24 cm."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni tipo di angolo alla sua corretta ampiezza.",
        leftItems: ["Angolo retto", "Angolo acuto", "Angolo ottuso"],
        rightItems: ["Misura esattamente 90°", "È più piccolo di 90°", "È più grande di 90°"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "L'angolo retto è quello formato dalle pareti e dal pavimento.",
        explanation: "Retto = 90°, acuto < 90°, ottuso > 90°."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e8",
        type: "quiz",
        prompt: "Quale proprietà della moltiplicazione dice che cambiando l'ordine dei fattori il prodotto non cambia (es. 4 × 5 = 5 × 4)?",
        options: [
          { label: "Proprietà commutativa", correct: true },
          { label: "Proprietà associativa", correct: false },
          { label: "Proprietà distributiva", correct: false }
        ],
        hint: "'Commutare' significa scambiare di posto.",
        explanation: "La proprietà commutativa permette di scambiare l'ordine dei fattori senza cambiare il risultato."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e9",
        type: "quiz",
        prompt: "Quanti minuti ci sono in 2 ore intere?",
        options: [
          { label: "120 minuti", correct: true },
          { label: "100 minuti", correct: false },
          { label: "60 minuti", correct: false }
        ],
        hint: "Un'ora ha 60 minuti. Fai 60 + 60.",
        explanation: "In 1 ora ci sono 60 minuti, quindi in 2 ore ci sono 60 × 2 = 120 minuti."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e10",
        type: "quiz",
        prompt: "Quanto fa 250 + 350?",
        options: [
          { label: "600", correct: true },
          { label: "500", correct: false },
          { label: "550", correct: false }
        ],
        hint: "200 + 300 = 500, poi aggiungi 50 + 50.",
        explanation: "250 + 350 = 600."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e11",
        type: "quiz",
        prompt: "Se dividi 23 per 5, qual è il resto?",
        options: [
          { label: "Resto 3", correct: true },
          { label: "Resto 2", correct: false },
          { label: "Resto 1", correct: false }
        ],
        hint: "5 × 4 fa 20. Quanto manca per arrivare a 23?",
        explanation: "23 = (5 × 4) + 3. Il quoziente è 4 con resto 3."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Metti in ordine crescente queste misure di capacità (dal volume minore al maggiore).",
        sortItems: ["10 millilitri (ml)", "50 centilitri (cl)", "1 litro (l)", "10 litri (l)"],
        hint: "Il millilitro è una goccia, il litro è una bottiglia intera.",
        explanation: "10 ml < 50 cl (mezzo litro) < 1 l < 10 l."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e13",
        type: "quiz",
        prompt: "Che numero rappresenta 1 centinaio, 4 decine e 7 unità?",
        options: [
          { label: "147", correct: true },
          { label: "174", correct: false },
          { label: "417", correct: false }
        ],
        hint: "100 + 40 + 7.",
        explanation: "1 h, 4 da, 7 u formano il numero 147."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e14",
        type: "quiz",
        prompt: "Qual è il doppio di 45?",
        options: [
          { label: "90", correct: true },
          { label: "80", correct: false },
          { label: "85", correct: false }
        ],
        hint: "45 + 45.",
        explanation: "45 × 2 = 90."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-mat-p3-e15",
        type: "quiz",
        prompt: "In una frazione come 3/5, come si chiama il numero che sta in basso (il 5)?",
        options: [
          { label: "Denominatore", correct: true },
          { label: "Numeratore", correct: false },
          { label: "Quoziente", correct: false }
        ],
        hint: "Indica in quante parti è diviso l'intero. Il numeratore sta sopra.",
        explanation: "Il numero in basso è il denominatore, quello in alto è il numeratore."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e1",
        type: "quiz",
        prompt: "Un triangolo ha due lati uguali e uno diverso. Come si chiama?",
        options: [
          { label: "Triangolo isoscele", correct: true },
          { label: "Triangolo scaleno", correct: false },
          { label: "Triangolo rettangolo", correct: false }
        ],
        hint: "Ha due lati (e due angoli alla base) congruenti.",
        explanation: "Il triangolo con due lati uguali si chiama isoscele."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e2",
        type: "quiz",
        prompt: "Quanto fa 1,4 + 2,8?",
        options: [
          { label: "4,2", correct: true },
          { label: "3,2", correct: false },
          { label: "4,0", correct: false }
        ],
        hint: "Somma prima i decimi (4 + 8 = 12 decimi = 1 unità e 2 decimi).",
        explanation: "1,4 + 2,8 = 4,2."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e3",
        type: "quiz",
        prompt: "Qual è l'area di un rettangolo con base di 9 cm e altezza di 4 cm?",
        options: [
          { label: "36 cm²", correct: true },
          { label: "26 cm²", correct: false },
          { label: "13 cm²", correct: false }
        ],
        hint: "L'area del rettangolo si calcola: base × altezza.",
        explanation: "Area = 9 cm × 4 cm = 36 cm²."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e4",
        type: "quiz",
        prompt: "Quanti decilitri (dl) ci sono in 1 litro (l)?",
        options: [
          { label: "10 dl", correct: true },
          { label: "100 dl", correct: false },
          { label: "1.000 dl", correct: false }
        ],
        hint: "Il prefisso 'deci-' indica la decima parte.",
        explanation: "1 litro contiene 10 decilitri."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e5",
        type: "quiz",
        prompt: "Quale tra queste frazioni è una frazione APPARENTE (corrisponde a un numero intero)?",
        options: [
          { label: "8/4", correct: true },
          { label: "3/4", correct: false },
          { label: "5/4", correct: false }
        ],
        hint: "Il numeratore deve essere un multiplo del denominatore (8 diviso 4 fa 2 intero).",
        explanation: "8/4 = 2: è una frazione apparente perché rappresenta un numero intero."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e6",
        type: "quiz",
        prompt: "Un negoziante compra una maglietta a 15 euro (spesa) e la rivende a 25 euro (ricavo). Qual è il suo guadagno?",
        options: [
          { label: "10 euro", correct: true },
          { label: "40 euro", correct: false },
          { label: "15 euro", correct: false }
        ],
        hint: "Guadagno = Ricavo − Spesa.",
        explanation: "25 − 15 = 10 euro di guadagno."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni frazione al rispettivo valore decimale.",
        leftItems: ["1/2", "1/4", "3/4"],
        rightItems: ["0,5", "0,25", "0,75"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Dividi il numeratore per il denominatore.",
        explanation: "1÷2 = 0,5; 1÷4 = 0,25; 3÷4 = 0,75."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e8",
        type: "quiz",
        prompt: "Quanto misura la somma di tutti gli angoli interni di un QUALSIASI triangolo?",
        options: [
          { label: "180°", correct: true },
          { label: "360°", correct: false },
          { label: "90°", correct: false }
        ],
        hint: "È pari a un angolo piatto.",
        explanation: "La somma degli angoli interni di qualunque triangolo è sempre 180°."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e9",
        type: "quiz",
        prompt: "Quanto fa 35 × 100?",
        options: [
          { label: "3.500", correct: true },
          { label: "350", correct: false },
          { label: "35.000", correct: false }
        ],
        hint: "Aggiungi due zeri alla fine del numero.",
        explanation: "Per moltiplicare per 100 si aggiungono due zeri: 35 × 100 = 3.500."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e10",
        type: "quiz",
        prompt: "A quanti metri corrispondono 3,5 chilometri (km)?",
        options: [
          { label: "3.500 metri", correct: true },
          { label: "350 metri", correct: false },
          { label: "35.000 metri", correct: false }
        ],
        hint: "1 km = 1.000 m. Moltiplica 3,5 per 1.000.",
        explanation: "3,5 × 1.000 = 3.500 metri."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e11",
        type: "quiz",
        prompt: "Un parallelogramma ha la base di 10 cm e l'altezza relativa di 6 cm. Qual è la sua area?",
        options: [
          { label: "60 cm²", correct: true },
          { label: "32 cm²", correct: false },
          { label: "30 cm²", correct: false }
        ],
        hint: "L'area del parallelogramma si calcola come quella del rettangolo: base × altezza.",
        explanation: "Area = base × altezza = 10 × 6 = 60 cm²."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina questi numeri decimali dal più piccolo al più grande.",
        sortItems: ["0,08", "0,2", "0,45", "1,1"],
        hint: "Guarda prima la parte intera, poi i decimi e i centesimi.",
        explanation: "0,08 < 0,20 < 0,45 < 1,10."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e13",
        type: "quiz",
        prompt: "Calcola il valore di 2/3 di 18 figurine.",
        options: [
          { label: "12 figurine", correct: true },
          { label: "6 figurine", correct: false },
          { label: "9 figurine", correct: false }
        ],
        hint: "Dividi 18 per il denominatore 3, poi moltiplica per 2.",
        explanation: "18 ÷ 3 = 6; 6 × 2 = 12."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e14",
        type: "quiz",
        prompt: "Come si chiama un poligono che ha 5 lati e 5 angoli?",
        options: [
          { label: "Pentagono", correct: true },
          { label: "Esagono", correct: false },
          { label: "Ottagono", correct: false }
        ],
        hint: "'Penta' in greco significa cinque.",
        explanation: "Un poligono con 5 lati è un pentagono."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-mat-p4-e15",
        type: "quiz",
        prompt: "Quanto fa 7,5 ÷ 10?",
        options: [
          { label: "0,75", correct: true },
          { label: "75", correct: false },
          { label: "0,075", correct: false }
        ],
        hint: "Sposta la virgola a sinistra di una posizione.",
        explanation: "Dividendo per 10 la virgola scala a sinistra: 7,5 ÷ 10 = 0,75."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e1",
        type: "quiz",
        prompt: "Un triangolo ha la base di 12 cm e l'altezza di 8 cm. Qual è la sua area?",
        options: [
          { label: "48 cm²", correct: true },
          { label: "96 cm²", correct: false },
          { label: "20 cm²", correct: false }
        ],
        hint: "Formula dell'area del triangolo: (base × altezza) diviso 2.",
        explanation: "Area = (12 × 8) ÷ 2 = 96 ÷ 2 = 48 cm²."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e2",
        type: "quiz",
        prompt: "Quanto vale il 20% di 150 euro?",
        options: [
          { label: "30 euro", correct: true },
          { label: "20 euro", correct: false },
          { label: "25 euro", correct: false }
        ],
        hint: "Calcola il 10% (15 euro) e raddoppialo.",
        explanation: "150 × 20 / 100 = 30 euro."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e3",
        type: "quiz",
        prompt: "Qual è il segmento che unisce il centro del cerchio con un qualsiasi punto della circonferenza?",
        options: [
          { label: "Raggio", correct: true },
          { label: "Diametro", correct: false },
          { label: "Corda", correct: false }
        ],
        hint: "Il diametro è il doppio di questo segmento.",
        explanation: "Il raggio è la distanza dal centro a qualsiasi punto della circonferenza."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e4",
        type: "quiz",
        prompt: "In un rombo, le diagonali misurano 10 cm e 6 cm. Qual è la sua area?",
        options: [
          { label: "30 cm²", correct: true },
          { label: "60 cm²", correct: false },
          { label: "16 cm²", correct: false }
        ],
        hint: "Formula: (Diagonale maggiore × diagonale minore) diviso 2.",
        explanation: "Area rombo = (D × d) ÷ 2 = (10 × 6) ÷ 2 = 30 cm²."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e5",
        type: "quiz",
        prompt: "Qual è la media aritmetica tra i voti: 7, 8 e 9?",
        options: [
          { label: "8", correct: true },
          { label: "7,5", correct: false },
          { label: "8,5", correct: false }
        ],
        hint: "Somma i tre numeri (7 + 8 + 9 = 24) e dividi per 3.",
        explanation: "(7 + 8 + 9) ÷ 3 = 24 ÷ 3 = 8."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e6",
        type: "quiz",
        prompt: "Lanciamo un comune dado a 6 facce. Qual è la probabilità di ottenere un numero pari (2, 4, 6)?",
        options: [
          { label: "3 su 6 (pari al 50% o 1/2)", correct: true },
          { label: "1 su 6", correct: false },
          { label: "4 su 6", correct: false }
        ],
        hint: "Ci sono 3 casi favorevoli su 6 casi possibili.",
        explanation: "3 facce pari su 6 facce totali: 3/6 = 1/2 = 50%."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni solido alla formula del suo volume.",
        leftItems: ["Cubo (lato l)", "Parallelepipedo rettangolo", "Prisma retto"],
        rightItems: ["l × l × l (l³)", "Area base × altezza", "Area base × altezza"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Il volume si misura in unità cubiche (cm³, m³).",
        explanation: "Volume del cubo = l³, volume del parallelepipedo e del prisma = Area base × altezza."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e8",
        type: "quiz",
        prompt: "A quanto corrisponde la potenza 10³?",
        options: [
          { label: "1.000", correct: true },
          { label: "100", correct: false },
          { label: "30", correct: false }
        ],
        hint: "10 moltiplicato per se stesso 3 volte: 10 × 10 × 10.",
        explanation: "10³ = 10 × 10 × 10 = 1.000 (il numero di zeri è pari all'esponente 3)."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e9",
        type: "quiz",
        prompt: "Un trapezio ha base maggiore di 10 cm, base minore di 6 cm e altezza di 4 cm. Qual è la sua area?",
        options: [
          { label: "32 cm²", correct: true },
          { label: "64 cm²", correct: false },
          { label: "16 cm²", correct: false }
        ],
        hint: "Formula: [(Base maggiore + base minore) × altezza] ÷ 2.",
        explanation: "Area = [(10 + 6) × 4] ÷ 2 = (16 × 4) ÷ 2 = 64 ÷ 2 = 32 cm²."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e10",
        type: "quiz",
        prompt: "Nel piano cartesiano, quali sono le coordinate dell'origine degli assi O?",
        options: [
          { label: "(0; 0)", correct: true },
          { label: "(1; 1)", correct: false },
          { label: "(0; 1)", correct: false }
        ],
        hint: "È il punto d'intersezione dell'asse orizzontale x e di quello verticale y.",
        explanation: "L'origine degli assi cartesiani ha coordinate x=0 e y=0: (0; 0)."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e11",
        type: "quiz",
        prompt: "Quanto fa l'addizione tra frazioni: 2/7 + 3/7?",
        options: [
          { label: "5/7", correct: true },
          { label: "5/14", correct: false },
          { label: "6/7", correct: false }
        ],
        hint: "Quando il denominatore è uguale, si sommano semplicemente i numeratori.",
        explanation: "Poiché il denominatore è uguale a 7: (2 + 3)/7 = 5/7."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina le percentuali dalla minore alla maggiore.",
        sortItems: ["10%", "25% (un quarto)", "50% (la metà)", "75% (tre quarti)"],
        hint: "Pensa alla frazione dell'intero che rappresentano.",
        explanation: "10% < 25% < 50% < 75%."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e13",
        type: "quiz",
        prompt: "Il diametro di un cerchio misura 14 cm. Quanto misura il suo raggio?",
        options: [
          { label: "7 cm", correct: true },
          { label: "28 cm", correct: false },
          { label: "14 cm", correct: false }
        ],
        hint: "Il raggio è la metà esatta del diametro.",
        explanation: "Raggio = Diametro ÷ 2 = 14 ÷ 2 = 7 cm."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e14",
        type: "quiz",
        prompt: "Se a mezzanotte la temperatura era di −2 °C e a mezzogiorno è salita di 6 °C, qual è la temperatura a mezzogiorno?",
        options: [
          { label: "+4 °C", correct: true },
          { label: "+8 °C", correct: false },
          { label: "−8 °C", correct: false }
        ],
        hint: "Parti da −2 sulla retta dei numeri e sali di 6 verso destra.",
        explanation: "−2 + 6 = +4 °C."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-mat-p5-e15",
        type: "quiz",
        prompt: "Qual è il valore approssimato di Pi Greco (π)?",
        options: [
          { label: "3,14", correct: true },
          { label: "2,71", correct: false },
          { label: "1,41", correct: false }
        ],
        hint: "È il rapporto costante tra la circonferenza e il suo diametro.",
        explanation: "Pi Greco vale circa 3,14159... arrotondato abitualmente a 3,14."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e1",
        type: "quiz",
        prompt: "Quale tra questi numeri è un numero PRIMO (divisibile solo per 1 e per se stesso)?",
        options: [
          { label: "17", correct: true },
          { label: "15", correct: false },
          { label: "21", correct: false },
          { label: "9", correct: false }
        ],
        hint: "15 è divisibile per 3 e 5, 21 per 3 e 7, 9 per 3.",
        explanation: "17 ha come unici divisori 1 e 17: è un numero primo."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e2",
        type: "quiz",
        prompt: "Qual è il criterio di divisibilità per 3?",
        options: [
          { label: "La somma delle cifre del numero deve essere un multiplo di 3", correct: true },
          { label: "L'ultima cifra deve essere 3", correct: false },
          { label: "Il numero deve essere dispari", correct: false }
        ],
        hint: "Ad esempio in 123: 1 + 2 + 3 = 6, che è divisibile per 3.",
        explanation: "Un numero è divisibile per 3 se e solo se la somma delle sue cifre è un multiplo di 3."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e3",
        type: "quiz",
        prompt: "Quanto vale la moltiplicazione tra potenze con la stessa base: 2³ × 2²?",
        options: [
          { label: "2⁵ (cioè 32)", correct: true },
          { label: "2⁶", correct: false },
          { label: "4⁵", correct: false }
        ],
        hint: "Per il prodotto di potenze con stessa base, si sommano gli esponenti (3 + 2).",
        explanation: "2³ × 2² = 2^(3+2) = 2⁵ = 32."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e4",
        type: "quiz",
        prompt: "Due rette che non si incontrano mai e mantengono sempre la stessa distanza tra loro si dicono...",
        options: [
          { label: "Rette parallele", correct: true },
          { label: "Rette perpendicolari", correct: false },
          { label: "Rette incidenti", correct: false }
        ],
        hint: "Pensa ai binari del treno.",
        explanation: "Le rette parallele appartengono allo stesso piano e non hanno punti in comune."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e5",
        type: "quiz",
        prompt: "Riduci ai minimi termini la frazione 12/18.",
        options: [
          { label: "2/3", correct: true },
          { label: "3/4", correct: false },
          { label: "4/6", correct: false }
        ],
        hint: "Dividi sia il numeratore che il denominatore per il loro MCD, che è 6.",
        explanation: "12 ÷ 6 = 2; 18 ÷ 6 = 3, quindi la frazione ridotta è 2/3."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e6",
        type: "quiz",
        prompt: "Quanto misura ciascun angolo interno di un triangolo equilatero?",
        options: [
          { label: "60°", correct: true },
          { label: "90°", correct: false },
          { label: "45°", correct: false }
        ],
        hint: "La somma degli angoli è 180°. Dividi 180° per 3 angoli uguali.",
        explanation: "180° ÷ 3 = 60°."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni proprietà delle potenze alla sua regola.",
        leftItems: ["aⁿ × aᵐ", "aⁿ ÷ aᵐ", "(aⁿ)ᵐ"],
        rightItems: ["aⁿ⁺ᵐ (somma esponenti)", "aⁿ⁻ᵐ (differenza esponenti)", "aⁿ·ᵐ (prodotto esponenti)"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Nel prodotto si sommano, nel quoziente si sottraggono, nella potenza di potenza si moltiplicano.",
        explanation: "Regole fondamentali dell'algebra delle potenze con stessa base."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e8",
        type: "quiz",
        prompt: "Qual è il minimo comune multiplo (mcm) tra 6 e 8?",
        options: [
          { label: "24", correct: true },
          { label: "48", correct: false },
          { label: "12", correct: false }
        ],
        hint: "Multipli di 6: 6, 12, 18, 24... Multipli di 8: 8, 16, 24...",
        explanation: "24 è il più piccolo multiplo comune a 6 e 8."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e9",
        type: "quiz",
        prompt: "Due rette incidenti che intersecandosi formano 4 angoli retti di 90° si dicono...",
        options: [
          { label: "Rette perpendicolari", correct: true },
          { label: "Rette parallele", correct: false },
          { label: "Rette coincidenti", correct: false }
        ],
        hint: "Formano una croce perfetta con angoli retti.",
        explanation: "Le rette perpendicolari si intersecano formando angoli di 90°."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e10",
        type: "quiz",
        prompt: "Qual è il Massimo Comune Divisore (MCD) tra 12 e 18?",
        options: [
          { label: "6", correct: true },
          { label: "3", correct: false },
          { label: "2", correct: false }
        ],
        hint: "Divisori di 12: 1, 2, 3, 4, 6, 12. Divisori di 18: 1, 2, 3, 6, 9, 18.",
        explanation: "Il più grande divisore comune è 6."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e11",
        type: "quiz",
        prompt: "Quanto fa l'espressione con precedenze: 5 + 3 × 4?",
        options: [
          { label: "17", correct: true },
          { label: "32", correct: false },
          { label: "23", correct: false }
        ],
        hint: "Le moltiplicazioni e divisioni hanno la precedenza sulle addizioni.",
        explanation: "Prima si esegue la moltiplicazione: 3 × 4 = 12. Poi l'addizione: 5 + 12 = 17."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina queste frazioni dalla più piccola alla più grande.",
        sortItems: ["1/6", "1/4", "1/2", "3/4"],
        hint: "A parità di numeratore, è più grande la frazione col denominatore più piccolo.",
        explanation: "1/6 (0,166) < 1/4 (0,25) < 1/2 (0,5) < 3/4 (0,75)."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e13",
        type: "quiz",
        prompt: "La somma degli angoli interni di un quadrilatero (es. rettangolo, trapezio, rombo) è sempre pari a...",
        options: [
          { label: "360°", correct: true },
          { label: "180°", correct: false },
          { label: "270°", correct: false }
        ],
        hint: "Un quadrilatero si può dividere in 2 triangoli: 180° × 2.",
        explanation: "La somma degli angoli interni di un quadrilatero è (4 − 2) × 180° = 360°."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e14",
        type: "quiz",
        prompt: "Quanto vale la potenza con esponente zero: 7⁰?",
        options: [
          { label: "1", correct: true },
          { label: "0", correct: false },
          { label: "7", correct: false }
        ],
        hint: "Ogni numero diverso da zero elevato a zero è uguale a...",
        explanation: "Qualsiasi numero (diverso da 0) elevato a zero dà sempre 1 per convenzione algebrica."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-mat-s1-e15",
        type: "quiz",
        prompt: "Quanto fa la moltiplicazione tra frazioni: 2/3 × 3/5?",
        options: [
          { label: "2/5", correct: true },
          { label: "6/15", correct: false },
          { label: "5/8", correct: false }
        ],
        hint: "Puoi semplificare a croce il 3 al numeratore col 3 al denominatore.",
        explanation: "Semplificando il 3: (2 × 1) / (1 × 5) = 2/5."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e1",
        type: "quiz",
        prompt: "In un triangolo rettangolo, come si chiama il lato opposto all'angolo retto, che è anche il più lungo?",
        options: [
          { label: "Ipotenusa", correct: true },
          { label: "Cateto maggiore", correct: false },
          { label: "Cateto minore", correct: false }
        ],
        hint: "Il Teorema di Pitagora la lega ai due cateti.",
        explanation: "L'ipotenusa è il lato più lungo del triangolo rettangolo ed è opposta all'angolo di 90°."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e2",
        type: "quiz",
        prompt: "Nella proporzione 4 : 8 = 5 : x, quanto vale l'incognito x?",
        options: [
          { label: "10", correct: true },
          { label: "12", correct: false },
          { label: "9", correct: false }
        ],
        hint: "In una proporzione il prodotto dei medi è uguale al prodotto degli estremi: 4 × x = 8 × 5.",
        explanation: "x = (8 × 5) ÷ 4 = 40 ÷ 4 = 10."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e3",
        type: "quiz",
        prompt: "Quanto vale la radice quadrata di 144 (√144)?",
        options: [
          { label: "12", correct: true },
          { label: "14", correct: false },
          { label: "11", correct: false }
        ],
        hint: "Quale numero moltiplicato per se stesso dà 144?",
        explanation: "12 × 12 = 144, quindi √144 = 12."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e4",
        type: "quiz",
        prompt: "Un paio di scarpe costa 80 euro. Durante i saldi c'è uno sconto del 30%. Quanto risparmi?",
        options: [
          { label: "24 euro", correct: true },
          { label: "30 euro", correct: false },
          { label: "20 euro", correct: false }
        ],
        hint: "Calcola il 30% di 80: (80 × 30) ÷ 100.",
        explanation: "Sconto = 80 × 0,30 = 24 euro."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e5",
        type: "quiz",
        prompt: "Secondo il Teorema di Pitagora, se i cateti di un triangolo rettangolo misurano a=6 cm e b=8 cm, quanto misura l'ipotenusa c?",
        options: [
          { label: "10 cm", correct: true },
          { label: "14 cm", correct: false },
          { label: "12 cm", correct: false }
        ],
        hint: "c² = a² + b² = 6² + 8² = 36 + 64 = 100.",
        explanation: "c = √100 = 10 cm."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e6",
        type: "quiz",
        prompt: "Qual è il rapporto ridotto ai minimi termini tra 15 minuti e 1 ora (60 minuti)?",
        options: [
          { label: "1/4", correct: true },
          { label: "1/3", correct: false },
          { label: "1/5", correct: false }
        ],
        hint: "15/60: dividi numeratore e denominatore per 15.",
        explanation: "15/60 = 1/4 (un quarto d'ora)."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni terna pitagorica ai rispettivi cateti e ipotenusa [cateto, cateto, ipotenusa].",
        leftItems: ["Terna fondamentale (3, 4)", "Terna (5, 12)", "Terna (8, 15)"],
        rightItems: ["Ipotenusa 5 (3² + 4² = 25)", "Ipotenusa 13 (5² + 12² = 169)", "Ipotenusa 17 (8² + 15² = 289)"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Verifica che la somma dei quadrati dei cateti dia il quadrato dell'ipotenusa.",
        explanation: "Terne pitagoriche canoniche: (3,4,5), (5,12,13), (8,15,17)."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e8",
        type: "quiz",
        prompt: "Se due grandezze x e y sono DIRETTAMENTE proporzionali, quale delle seguenti relazioni è vera?",
        options: [
          { label: "Il loro rapporto y / x è costante", correct: true },
          { label: "Il loro prodotto x × y è costante", correct: false },
          { label: "La loro somma x + y è costante", correct: false }
        ],
        hint: "Se una raddoppia, anche l'altra raddoppia: y = k × x.",
        explanation: "Nella proporzionalità diretta il rapporto tra le grandezze è costante (y/x = k)."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e9",
        type: "quiz",
        prompt: "Qual è la formula per calcolare l'area del cerchio di raggio r?",
        options: [
          { label: "Area = π × r²", correct: true },
          { label: "Area = 2 × π × r", correct: false },
          { label: "Area = π × d", correct: false }
        ],
        hint: "2 × π × r è la lunghezza della circonferenza. L'area usa il raggio al quadrato.",
        explanation: "L'area del cerchio è data da π moltiplicato per il quadrato del raggio (πr²)."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e10",
        type: "quiz",
        prompt: "Quanto vale la frazione generatrice del numero decimale periodico semplice 0,(3)?",
        options: [
          { label: "1/3", correct: true },
          { label: "3/10", correct: false },
          { label: "3/100", correct: false }
        ],
        hint: "3/9 si semplifica dividendo per 3.",
        explanation: "0,333... = 3/9 = 1/3."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e11",
        type: "quiz",
        prompt: "Un poligono regolare ha l'apotema di 4 cm e il perimetro di 30 cm. Qual è la sua area?",
        options: [
          { label: "60 cm²", correct: true },
          { label: "120 cm²", correct: false },
          { label: "34 cm²", correct: false }
        ],
        hint: "Area = (Perimetro × apotema) diviso 2.",
        explanation: "Area = (30 × 4) ÷ 2 = 120 ÷ 2 = 60 cm²."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i quadrati perfetti in ordine crescente.",
        sortItems: ["7² (49)", "8² (64)", "9² (81)", "10² (100)"],
        hint: "Calcola il quadrato di ciascun numero.",
        explanation: "49 < 64 < 81 < 100."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e13",
        type: "quiz",
        prompt: "Due triangoli che hanno gli angoli corrispondenti uguali e i lati corrispondenti in proporzione si dicono...",
        options: [
          { label: "Triangoli simili", correct: true },
          { label: "Triangoli congruenti", correct: false },
          { label: "Triangoli equivalenti", correct: false }
        ],
        hint: "Hanno la stessa forma ma dimensioni diverse.",
        explanation: "I poligoni simili hanno angoli ordinatamente congruenti e lati omologhi in proporzione."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e14",
        type: "quiz",
        prompt: "In una cartina geografica la scala è 1 : 100.000. Se due città distano 3 cm sulla mappa, qual è la distanza reale?",
        options: [
          { label: "3 km (300.000 cm)", correct: true },
          { label: "30 km", correct: false },
          { label: "300 metri", correct: false }
        ],
        hint: "3 × 100.000 = 300.000 cm. Trasforma i centimetri in chilometri.",
        explanation: "300.000 cm = 3.000 m = 3 km."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-mat-s2-e15",
        type: "quiz",
        prompt: "Se una stampante stampa 20 pagine in 2 minuti, quante pagine stamperà in 5 minuti alla stessa velocità?",
        options: [
          { label: "50 pagine", correct: true },
          { label: "40 pagine", correct: false },
          { label: "60 pagine", correct: false }
        ],
        hint: "Calcola la velocità al minuto: 20 ÷ 2 = 10 pagine al minuto. Poi moltiplica per 5.",
        explanation: "Proporzione 20 : 2 = x : 5 -> x = (20 × 5) ÷ 2 = 50 pagine."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e1",
        type: "quiz",
        prompt: "Risolvi l'equazione di primo grado: 3x − 7 = 14. Quanto vale l'incognita x?",
        options: [
          { label: "x = 7", correct: true },
          { label: "x = 6", correct: false },
          { label: "x = 8", correct: false }
        ],
        hint: "Sposta il −7 a destra cambiandolo di segno (+7), poi dividi per 3.",
        explanation: "3x = 14 + 7 -> 3x = 21 -> x = 21 ÷ 3 = 7."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e2",
        type: "quiz",
        prompt: "Quanto fa il prodotto dei monomi: (2x²y) × (−3xy³)?",
        options: [
          { label: "−6x³y⁴", correct: true },
          { label: "−6x²y³", correct: false },
          { label: "6x³y⁴", correct: false }
        ],
        hint: "Moltiplica i coefficienti (2 × −3 = −6) e somma gli esponenti delle lettere uguali.",
        explanation: "(2 × −3) · x^(2+1) · y^(1+3) = −6x³y⁴."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e3",
        type: "quiz",
        prompt: "Qual è il volume di un cilindro che ha raggio di base r=3 cm e altezza h=10 cm?",
        options: [
          { label: "90π cm³", correct: true },
          { label: "60π cm³", correct: false },
          { label: "30π cm³", correct: false }
        ],
        hint: "Volume cilindro = Area base × altezza = (π × r²) × h.",
        explanation: "Area base = π × 3² = 9π. Volume = 9π × 10 = 90π cm³ (circa 282,6 cm³)."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e4",
        type: "quiz",
        prompt: "Qual è la formula del quadrato di binomio: (a + b)²?",
        options: [
          { label: "a² + 2ab + b²", correct: true },
          { label: "a² + b²", correct: false },
          { label: "a² − 2ab + b²", correct: false }
        ],
        hint: "Include il quadrato del primo, il doppio prodotto e il quadrato del secondo.",
        explanation: "(a + b)² = a² + 2ab + b²."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e5",
        type: "quiz",
        prompt: "Nell'equazione di una retta y = mx + q, cosa rappresenta il coefficiente m?",
        options: [
          { label: "Il coefficiente angolare (la pendenza della retta)", correct: true },
          { label: "Il punto di intersezione con l'asse x", correct: false },
          { label: "La lunghezza della retta", correct: false }
        ],
        hint: "Se m è positivo la retta sale verso destra, se m è negativo scende.",
        explanation: "m indica la pendenza (inclinazione) della retta rispetto all'asse delle ascisse x."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e6",
        type: "quiz",
        prompt: "In statistica, in una serie di dati ordinati, come si chiama il valore centrale che divide la distribuzione a metà?",
        options: [
          { label: "Mediana", correct: true },
          { label: "Moda", correct: false },
          { label: "Media", correct: false }
        ],
        hint: "La moda è il valore più frequente, la media è la somma diviso il numero di elementi.",
        explanation: "La mediana è il valore centrale che bipartisce la serie dei dati ordinati."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni solido di rotazione alla figura piana che ruota attorno a un asse per generarlo.",
        leftItems: ["Cilindro", "Cono", "Sfera"],
        rightItems: ["Rettangolo che ruota attorno a un lato", "Triangolo rettangolo attorno a un cateto", "Semicerchio che ruota attorno al diametro"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Pensa alla rotazione completa di 360° nello spazio.",
        explanation: "Definizione dei tre principali solidi di rotazione studiati in terza media."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e8",
        type: "quiz",
        prompt: "Risolvi: (−4) × (−5) + (−12) ÷ (+3). Quanto fa?",
        options: [
          { label: "+16", correct: true },
          { label: "+24", correct: false },
          { label: "−16", correct: false }
        ],
        hint: "Meno per meno fa più (+20). Meno diviso più fa meno (−4). Fai 20 − 4.",
        explanation: "(−4) × (−5) = +20; (−12) ÷ (+3) = −4. Risultato: 20 − 4 = 16."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e9",
        type: "quiz",
        prompt: "Qual è il volume di un cubo con spigolo lungo s = 5 cm?",
        options: [
          { label: "125 cm³", correct: true },
          { label: "150 cm³", correct: false },
          { label: "25 cm³", correct: false }
        ],
        hint: "Volume = s³ = 5 × 5 × 5.",
        explanation: "Volume cubo = 5³ = 125 cm³."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e10",
        type: "quiz",
        prompt: "Come si chiama un'equazione che è verificata per QUALSIASI valore assegnato all'incognita (es. 2x + 4 = 2(x + 2))?",
        options: [
          { label: "Identità", correct: true },
          { label: "Equazione impossibile", correct: false },
          { label: "Equazione determinata", correct: false }
        ],
        hint: "Entrambi i membri sono identici per ogni valore di x.",
        explanation: "Un'uguaglianza vera per qualsiasi valore dell'incognita è un'identità."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e11",
        type: "quiz",
        prompt: "In un sacchetto ci sono 5 palline rosse, 3 blu e 2 verdi (10 totali). Qual è la probabilità di estrarre una pallina blu?",
        options: [
          { label: "3/10 (30%)", correct: true },
          { label: "1/3", correct: false },
          { label: "2/10 (20%)", correct: false }
        ],
        hint: "Casi favorevoli (3 blu) su casi totali (10 palline).",
        explanation: "P = 3 / 10 = 0,3 = 30%."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i numeri razionali e irrazionali dal più piccolo al più grande.",
        sortItems: ["−3", "0", "√4 (pari a 2)", "π (circa 3,14)"],
        hint: "I numeri negativi sono sempre minori di zero e dei positivi.",
        explanation: "−3 < 0 < 2 < 3,14."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e13",
        type: "quiz",
        prompt: "Qual è il prodotto notevole somma per differenza: (x + 3)(x − 3)?",
        options: [
          { label: "x² − 9", correct: true },
          { label: "x² + 9", correct: false },
          { label: "x² − 6x + 9", correct: false }
        ],
        hint: "(A + B)(A − B) = A² − B².",
        explanation: "(x + 3)(x − 3) = x² − 3² = x² − 9."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e14",
        type: "quiz",
        prompt: "Qual è la distanza tra i punti A(1; 2) e B(4; 6) nel piano cartesiano?",
        options: [
          { label: "5 unità", correct: true },
          { label: "7 unità", correct: false },
          { label: "4 unità", correct: false }
        ],
        hint: "Applica Pitagora: √[(4−1)² + (6−2)²] = √[3² + 4²].",
        explanation: "d = √[3² + 4²] = √[9 + 16] = √25 = 5."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-mat-s3-e15",
        type: "quiz",
        prompt: "Qual è il grado complessivo del monomio 5x³y²z?",
        options: [
          { label: "6° grado", correct: true },
          { label: "5° grado", correct: false },
          { label: "3° grado", correct: false }
        ],
        hint: "Somma gli esponenti di tutte le lettere: 3 + 2 + 1.",
        explanation: "Esponente di x è 3, di y è 2, di z è 1. Grado = 3 + 2 + 1 = 6."
      }
    },
  ],

  italiano: [
    // ── Primaria 1ª – 2ª (P1, P2) ─────────────────────────────────
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-ita-p1-1',
        type: 'image',
        icon: 'gatto',
        prompt: 'Quale animale vedi nell\'immagine?',
        options: [
          { label: 'Un gatto', correct: true },
          { label: 'Un pesce', correct: false },
          { label: 'Un leone', correct: false }
        ],
        hint: 'Fa le fusa e ha i baffi.',
        explanation: 'L\'icona mostra un gatto.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-ita-p1-2',
        type: 'quiz',
        prompt: 'Quante vocali ci sono nella parola «SOLE»?',
        options: [
          { label: '2', correct: true },
          { label: '1', correct: false },
          { label: '3', correct: false },
          { label: '4', correct: false }
        ],
        hint: 'Le vocali sono A, E, I, O, U.',
        explanation: 'Nella parola SOLE le vocali sono O ed E: sono 2.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-ita-p1-3',
        type: 'image',
        icon: 'mela',
        prompt: 'Con quale sillaba inizia il nome di questo frutto?',
        options: [
          { label: 'ME', correct: true },
          { label: 'BA', correct: false },
          { label: 'CA', correct: false }
        ],
        hint: 'È una ME-LA.',
        explanation: 'Mela inizia con la sillaba ME.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-ita-p1-4',
        type: 'sequence',
        direction: 'tap',
        prompt: 'Tocca le vocali in ordine alfabetico.',
        items: ['A', 'E', 'I', 'O', 'U'],
        hint: 'Inizia da A e finisci con U.',
        explanation: 'Le cinque vocali in ordine sono A, E, I, O, U.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-ita-p1-5',
        type: 'quiz',
        prompt: 'Quale articolo determinativo va davanti alla parola «albero»?',
        options: [
          { label: 'l\'', correct: true },
          { label: 'lo', correct: false },
          { label: 'la', correct: false },
          { label: 'le', correct: false }
        ],
        hint: 'Davanti a vocale «il» o «lo» diventa con l\'apostrofo.',
        explanation: 'Si scrive «l\'albero» con l\'apostrofo.'
      }
    },
    {
      years: ['P1', 'P2', 'P3'],
      round: {
        id: 'qb-ita-p2-1',
        type: 'quiz',
        prompt: 'Quale parola è scritta correttamente?',
        options: [
          { label: 'scuola', correct: true },
          { label: 'squola', correct: false },
          { label: 'scola', correct: false }
        ],
        hint: 'Solo «cuore» e poche altre vogliono la Q; questa inizia con SC.',
        explanation: 'Si scrive «scuola» con SCU.'
      }
    },
    {
      years: ['P1', 'P2', 'P3'],
      round: {
        id: 'qb-ita-p2-2',
        type: 'quiz',
        prompt: 'Nella frase «Il fiore profuma», qual è il verbo (l\'azione)?',
        options: [
          { label: 'profuma', correct: true },
          { label: 'fiore', correct: false },
          { label: 'Il', correct: false }
        ],
        hint: 'Chiediti: che cosa fa il fiore?',
        explanation: '«Profuma» è il verbo: dice cosa fa il fiore.'
      }
    },
    {
      years: ['P2', 'P3'],
      round: {
        id: 'qb-ita-p2-3',
        type: 'quiz',
        prompt: 'Quale di queste parole contiene una consonante doppia corretta?',
        options: [
          { label: 'palla', correct: true },
          { label: 'pala', correct: false },
          { label: 'ppalla', correct: false }
        ],
        hint: 'Con una sola L sarebbe l\'attrezzo per scavare; quella per giocare ha due L.',
        explanation: 'La sfera per giocare si scrive «palla» con due L.'
      }
    },
    {
      years: ['P2', 'P3'],
      round: {
        id: 'qb-ita-p2-4',
        type: 'dragdrop',
        mode: 'sort',
        prompt: 'Rimetti in ordine le parole per formare una frase corretta.',
        sortItems: ['Il', 'cane', 'corre', 'nel', 'prato'],
        hint: 'Inizia con l\'articolo «Il» seguito dal soggetto.',
        explanation: 'La frase ordinata è: Il cane corre nel prato.'
      }
    },
    // ── Primaria 3ª – 5ª (P3, P4, P5) ─────────────────────────────
    {
      years: ['P3', 'P4', 'P5'],
      round: {
        id: 'qb-ita-p3-1',
        type: 'quiz',
        prompt: 'Nella frase «La palla rossa rimbalza», qual è l\'aggettivo qualificativo?',
        options: [
          { label: 'rossa', correct: true },
          { label: 'palla', correct: false },
          { label: 'rimbalza', correct: false },
          { label: 'La', correct: false }
        ],
        hint: 'Indica una qualità della palla (com\'è?).',
        explanation: '«Rossa» è un aggettivo qualificativo perché spiega com\'è la palla.'
      }
    },
    {
      years: ['P3', 'P4'],
      round: {
        id: 'qb-ita-p3-2',
        type: 'quiz',
        prompt: 'Qual è un sinonimo dell\'aggettivo «felice»?',
        options: [
          { label: 'contento', correct: true },
          { label: 'triste', correct: false },
          { label: 'stanco', correct: false },
          { label: 'arrabbiato', correct: false }
        ],
        hint: 'Un sinonimo ha significato uguale o molto simile.',
        explanation: '«Contento» ha lo stesso significato di «felice».'
      }
    },
    {
      years: ['P3', 'P4'],
      round: {
        id: 'qb-ita-p3-3',
        type: 'quiz',
        prompt: 'Come si divide correttamente in sillabe la parola «MATITA»?',
        options: [
          { label: 'MA - TI - TA', correct: true },
          { label: 'MAT - I - TA', correct: false },
          { label: 'MA - TIT - A', correct: false }
        ],
        hint: 'Ogni consonante semplice fa sillaba con la vocale che segue.',
        explanation: 'La divisione corretta è MA-TI-TA.'
      }
    },
    {
      years: ['P3', 'P4', 'P5'],
      round: {
        id: 'qb-ita-p4-1',
        type: 'quiz',
        prompt: 'Quale frase usa correttamente «ha» con l\'H?',
        options: [
          { label: 'Marco ha fame.', correct: true },
          { label: 'Vado ha casa.', correct: false },
          { label: 'Gioco ha palla.', correct: false }
        ],
        hint: 'Si usa l\'H quando significa «possiede» o «sente».',
        explanation: '«Marco ha fame» è voce del verbo avere e vuole l\'H.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-ita-p4-2',
        type: 'quiz',
        prompt: 'Qual è il contrario (antonimo) di «generoso»?',
        options: [
          { label: 'egoista', correct: true },
          { label: 'gentile', correct: false },
          { label: 'altruista', correct: false },
          { label: 'cordiale', correct: false }
        ],
        hint: 'Chi pensa solo a sé e non condivide.',
        explanation: 'Il contrario di generoso è egoista (o avaro).'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-ita-p4-3',
        type: 'dragdrop',
        mode: 'match',
        prompt: 'Abbina ogni parola alla sua categoria grammaticale.',
        leftItems: ['gatto', 'correre', 'veloce'],
        rightItems: ['Verbo', 'Aggettivo', 'Nome'],
        pairs: [
          [0, 2],
          [1, 0],
          [2, 1]
        ],
        hint: 'Uno indica un animale, uno un\'azione, uno una qualità.',
        explanation: 'Gatto è un nome, correre è un verbo, veloce è un aggettivo.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-ita-p5-1',
        type: 'quiz',
        prompt: 'A quale coniugazione appartiene il verbo «dormire»?',
        options: [
          { label: 'Terza coniugazione (-ire)', correct: true },
          { label: 'Prima coniugazione (-are)', correct: false },
          { label: 'Seconda coniugazione (-ere)', correct: false }
        ],
        hint: 'Guarda le ultime tre lettere dell\'infinito.',
        explanation: 'I verbi che finiscono in -ire appartengono alla terza coniugazione.'
      }
    },
    {
      years: ['P4', 'P5', 'S1'],
      round: {
        id: 'qb-ita-p5-2',
        type: 'quiz',
        prompt: 'Nella frase «Luca legge un libro avvincente», qual è il soggetto?',
        options: [
          { label: 'Luca', correct: true },
          { label: 'un libro', correct: false },
          { label: 'legge', correct: false },
          { label: 'avvincente', correct: false }
        ],
        hint: 'Chi compie l\'azione di leggere?',
        explanation: '«Luca» compie l\'azione ed è il soggetto della frase.'
      }
    },
    {
      years: ['P5', 'S1'],
      round: {
        id: 'qb-ita-p5-3',
        type: 'quiz',
        prompt: 'In quale tempo del modo indicativo è il verbo «avevo cantato»?',
        options: [
          { label: 'Trapassato prossimo', correct: true },
          { label: 'Passato prossimo', correct: false },
          { label: 'Imperfetto', correct: false },
          { label: 'Futuro semplice', correct: false }
        ],
        hint: 'L\'ausiliare «avevo» è all\'imperfetto seguito dal participio passato.',
        explanation: 'Imperfetto dell\'ausiliare + participio passato forma il trapassato prossimo.'
      }
    },
    // ── Secondaria di I grado 1ª – 3ª (S1, S2, S3) ────────────────
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-ita-s1-1',
        type: 'quiz',
        prompt: 'In analisi logica, che funzione ha «con gli amici» in «Esco con gli amici»?',
        options: [
          { label: 'Complemento di compagnia', correct: true },
          { label: 'Complemento oggetto', correct: false },
          { label: 'Complemento di luogo', correct: false },
          { label: 'Soggetto', correct: false }
        ],
        hint: 'Risponde alla domanda: insieme a chi?',
        explanation: '«Con gli amici» indica con chi si compie l\'azione: complemento di compagnia.'
      }
    },
    {
      years: ['S1', 'S2'],
      round: {
        id: 'qb-ita-s1-2',
        type: 'quiz',
        prompt: 'Nella frase «Credo che tu sia sincero», in quale modo verbale è «sia»?',
        options: [
          { label: 'Congiuntivo', correct: true },
          { label: 'Indicativo', correct: false },
          { label: 'Condizionale', correct: false },
          { label: 'Imperativo', correct: false }
        ],
        hint: 'È il modo del dubbio, del pensiero e dell\'opinione introdotto da «che».',
        explanation: '«Che tu sia» è congiuntivo presente del verbo essere.'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-ita-s1-3',
        type: 'quiz',
        prompt: 'Nella frase «La nonna prepara una torta», che complemento è «una torta»?',
        options: [
          { label: 'Complemento oggetto', correct: true },
          { label: 'Complemento di termine', correct: false },
          { label: 'Complemento d\'agente', correct: false },
          { label: 'Complemento di mezzo', correct: false }
        ],
        hint: 'Risponde direttamente alla domanda: che cosa?',
        explanation: '«Una torta» riceve direttamente l\'azione transitiva: è complemento oggetto.'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-ita-s2-1',
        type: 'quiz',
        prompt: 'Quale figura retorica trovi nel verso «Sei furbo come una volpe»?',
        options: [
          { label: 'Similitudine', correct: true },
          { label: 'Ossìmoro', correct: false },
          { label: 'Onomatopea', correct: false },
          { label: 'Allitterazione', correct: false }
        ],
        hint: 'C\'è un paragone introdotto da «come».',
        explanation: 'La similitudine confronta due elementi usando «come» o «sembra».'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-ita-s2-2',
        type: 'quiz',
        prompt: 'Nella frase passiva «Il topo è inseguito dal gatto», che complemento è «dal gatto»?',
        options: [
          { label: 'Complemento d\'agente', correct: true },
          { label: 'Complemento di causa efficiente', correct: false },
          { label: 'Complemento di moto da luogo', correct: false },
          { label: 'Complemento di specificazione', correct: false }
        ],
        hint: 'Indica l\'essere animato che compie l\'azione in una frase passiva.',
        explanation: '«Dal gatto» è un essere animato che compie l\'azione passiva: complemento d\'agente.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-ita-s2-3',
        type: 'quiz',
        prompt: 'Quale figura retorica consiste nel paragonare senza usare il «come», ad esempio «Achille è un leone»?',
        options: [
          { label: 'Metafora', correct: true },
          { label: 'Similitudine', correct: false },
          { label: 'Anafora', correct: false },
          { label: 'Iperbole', correct: false }
        ],
        hint: 'È una similitudine abbreviata senza la parola di confronto.',
        explanation: 'La metafora trasferisce il significato di una parola a un\'altra in modo diretto.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-ita-s3-1',
        type: 'quiz',
        prompt: 'Nel periodo «Non esco perché piove», che tipo di subordinata è «perché piove»?',
        options: [
          { label: 'Subordinata causale', correct: true },
          { label: 'Subordinata finale', correct: false },
          { label: 'Subordinata temporale', correct: false },
          { label: 'Coordinata avversativa', correct: false }
        ],
        hint: 'Spiega il motivo per cui non esco.',
        explanation: '«Perché piove» indica la causa dell\'azione principale: è una subordinata causale.'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-ita-s3-2',
        type: 'quiz',
        prompt: 'Chi è l\'autore della «Divina Commedia»?',
        options: [
          { label: 'Dante Alighieri', correct: true },
          { label: 'Alessandro Manzoni', correct: false },
          { label: 'Giacomo Leopardi', correct: false },
          { label: 'Giovanni Boccaccio', correct: false }
        ],
        hint: 'Poeta fiorentino del Trecento, guidato da Virgilio e Beatrice.',
        explanation: 'Dante Alighieri compose la Divina Commedia all\'inizio del XIV secolo.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-ita-s3-3',
        type: 'quiz',
        prompt: 'Chi ha scritto il celebre romanzo storico «I promessi sposi»?',
        options: [
          { label: 'Alessandro Manzoni', correct: true },
          { label: 'Ugo Foscolo', correct: false },
          { label: 'Giovanni Verga', correct: false },
          { label: 'Italo Calvino', correct: false }
        ],
        hint: 'Racconta la storia di Renzo e Lucia nella Lombardia del Seicento.',
        explanation: '«I promessi sposi» è il capolavoro di Alessandro Manzoni.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-ita-s3-4',
        type: 'quiz',
        prompt: 'Nel periodo «Studio molto affinché io superi l\'esame», che subordinata è «affinché io superi l\'esame»?',
        options: [
          { label: 'Subordinata finale', correct: true },
          { label: 'Subordinata concessiva', correct: false },
          { label: 'Subordinata temporale', correct: false },
          { label: 'Subordinata consecutiva', correct: false }
        ],
        hint: 'Indica lo scopo o il fine dell\'azione di studiare.',
        explanation: 'Introdotta da «affinché» o «perché», indica lo scopo: è una subordinata finale.'
      }
    },

  // ── Primaria 1ª – 2ª (P1, P2) ─────────────────────────────────
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-6',
      type: 'quiz',
      prompt: 'Quale parola è scritta nel modo corretto con la lettera Q?',
      options: [
        { label: 'Quadro', correct: true },
        { label: 'Cuadro', correct: false },
        { label: 'Qadro', correct: false },
        { label: 'Kuadro', correct: false }
      ],
      hint: 'La Q è sempre seguita dalla U e da un\'altra vocale.',
      explanation: 'Si scrive quadro con QU.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-7',
      type: 'image',
      icon: 'sole',
      prompt: 'Qual è il nome dell\'astro luminoso mostrato nell\'immagine?',
      options: [
        { label: 'Sole', correct: true },
        { label: 'Luna', correct: false },
        { label: 'Stella', correct: false }
      ],
      hint: 'Scalda la Terra e brilla di giorno nel cielo.',
      explanation: 'L\'icona rappresenta il Sole.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-8',
      type: 'quiz',
      prompt: 'Quale parola contiene una doppia consonante?',
      options: [
        { label: 'Palla', correct: true },
        { label: 'Pala', correct: false },
        { label: 'Mela', correct: false },
        { label: 'Vaso', correct: false }
      ],
      hint: 'Ha due consonanti uguali vicine vicine.',
      explanation: 'Palla contiene la doppia LL.'
    }
  },
  {
    years: ['P2', 'P3'],
    round: {
      id: 'qb-ita-p2-5',
      type: 'quiz',
      prompt: 'Quale frase contiene l\'apostrofo usato correttamente?',
      options: [
        { label: 'C\'è un bel sole', correct: true },
        { label: 'Ce un bel sole', correct: false },
        { label: 'Ci è un bel sole', correct: false }
      ],
      hint: '«C\'è» significa «ci è», l\'apostrofo sostituisce la lettera caduta.',
      explanation: 'Si scrive «C\'è» con l\'apostrofo e l\'accento sulla e.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p2-6',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Metti in ordine alfabetico le seguenti parole.',
      sortItems: ['Ape', 'Barca', 'Cane', 'Dado'],
      hint: 'Guarda la prima lettera di ogni parola: A, B, C, D.',
      explanation: 'L\'ordine alfabetico è Ape (A), Barca (B), Cane (C), Dado (D).'
    }
  },
  {
    years: ['P2', 'P3'],
    round: {
      id: 'qb-ita-p2-7',
      type: 'quiz',
      prompt: 'Qual è il plurale corretto della parola «amico»?',
      options: [
        { label: 'Amici', correct: true },
        { label: 'Amichi', correct: false },
        { label: 'Amicoi', correct: false }
      ],
      hint: 'Al plurale il suono diventa dolce.',
      explanation: 'Il plurale di amico è amici.'
    }
  },

  // ── Primaria 3ª – 4ª – 5ª (P3, P4, P5) ─────────────────────────
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-ita-p3-4',
      type: 'quiz',
      prompt: 'Nella frase «Il gatto bianco dorme sul divano», qual è l\'aggettivo qualificativo?',
      options: [
        { label: 'bianco', correct: true },
        { label: 'gatto', correct: false },
        { label: 'dorme', correct: false },
        { label: 'divano', correct: false }
      ],
      hint: 'Descrive come è fatto il gatto.',
      explanation: '«Bianco» è un aggettivo qualificativo perché indica una qualità del nome gatto.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-ita-p3-5',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun nome al suo contrario.',
      leftItems: ['Alto', 'Luce', 'Felice'],
      rightItems: ['Basso', 'Buio', 'Triste'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Cerca la parola di significato opposto.',
      explanation: 'Alto ↔ Basso; Luce ↔ Buio; Felice ↔ Triste.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-ita-p3-6',
      type: 'quiz',
      prompt: 'Quale voce del verbo AVERE completa correttamente: «I bambini ... giocato tutto il pomeriggio»?',
      options: [
        { label: 'hanno', correct: true },
        { label: 'anno', correct: false },
        { label: 'anno\'', correct: false }
      ],
      hint: 'È voce del verbo avere (essi hanno), quindi serve l\'H iniziale.',
      explanation: '«Hanno» con l\'H è la terza persona plurale del verbo avere.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-ita-p4-4',
      type: 'quiz',
      prompt: 'Nella frase «Marco legge un libro interessante», qual è il complemento oggetto?',
      options: [
        { label: 'un libro interessante', correct: true },
        { label: 'Marco', correct: false },
        { label: 'legge', correct: false },
        { label: 'interessante', correct: false }
      ],
      hint: 'Risponde alla domanda: «chi? che cosa?» dopo il verbo.',
      explanation: 'Marco legge che cosa? «Un libro interessante» è il complemento oggetto (con attributo).'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-ita-p4-5',
      type: 'quiz',
      prompt: 'A quale tempo dell\'indicativo appartiene il verbo «NOI CANTEREMO»?',
      options: [
        { label: 'Futuro semplice', correct: true },
        { label: 'Presente', correct: false },
        { label: 'Passato prossimo', correct: false },
        { label: 'Imperfetto', correct: false }
      ],
      hint: 'Indica un\'azione che avverrà più avanti nel tempo.',
      explanation: '«Canteremo» è prima persona plurale del futuro semplice del verbo cantare.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-ita-p4-6',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Ordina i gradi dell\'aggettivo qualificativo dal grado positivo al superlativo assoluto.',
      items: ['bello', 'più bello di', 'bellissimo'],
      hint: 'Grado positivo, comparativo di maggioranza, superlativo assoluto.',
      explanation: 'Bello (positivo) → Più bello di (comparativo) → Bellissimo (superlativo assoluto).'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-ita-p5-4',
      type: 'quiz',
      prompt: 'Nella frase «La nonna è affettuosa», che tipo di predicato è «è affettuosa»?',
      options: [
        { label: 'Predicato nominale', correct: true },
        { label: 'Predicato verbale', correct: false },
        { label: 'Soggetto sottinteso', correct: false }
      ],
      hint: 'È formato dal verbo essere + un aggettivo che indica una qualità.',
      explanation: 'Verbo essere (copula) + aggettivo (nome del predicato) forma il predicato nominale.'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-ita-p5-5',
      type: 'quiz',
      prompt: 'Quale dei seguenti è un pronome possessivo?',
      options: [
        { label: 'Il mio', correct: true },
        { label: 'Quello', correct: false },
        { label: 'Chiunque', correct: false },
        { label: 'Loro', correct: false }
      ],
      hint: 'Sostituisce il nome indicando a chi appartiene qualcosa.',
      explanation: '«Il mio» usato al posto del nome è un pronome possessivo.'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-ita-p5-6',
      type: 'quiz',
      prompt: 'Qual è il modo verbale che esprime certezza e realtà dei fatti?',
      options: [
        { label: 'Modo Indicativo', correct: true },
        { label: 'Modo Congiuntivo', correct: false },
        { label: 'Modo Condizionale', correct: false },
        { label: 'Modo Imperativo', correct: false }
      ],
      hint: 'È il modo più usato, quello delle certezze oggettive.',
      explanation: 'L\'indicativo è il modo della certezza e della realtà.'
    }
  },

  // ── Secondaria di I grado (S1, S2, S3) ───────────────────────────
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-ita-s1-4',
      type: 'quiz',
      prompt: 'Nella frase «Ho regalato un libro a Giulia», che complemento è «a Giulia»?',
      options: [
        { label: 'Complemento di termine', correct: true },
        { label: 'Complemento di specificazione', correct: false },
        { label: 'Complemento d\'agente', correct: false },
        { label: 'Complemento di causa', correct: false }
      ],
      hint: 'Risponde alla domanda: «a chi? a che cosa?»',
      explanation: 'Il complemento di termine risponde alla domanda «a chi? a che cosa?» ed è introdotto dalla preposizione «a».'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-ita-s1-5',
      type: 'quiz',
      prompt: 'Chi è l\'eroe protagonista dell\'Odissea di Omero che affronta un lungo viaggio per tornare a Itaca?',
      options: [
        { label: 'Ulisse (Odisseo)', correct: true },
        { label: 'Achille', correct: false },
        { label: 'Enea', correct: false },
        { label: 'Ettore', correct: false }
      ],
      hint: 'Re di Itaca, celebre per la sua astuzia e il cavallo di Troia.',
      explanation: 'Ulisse (Odisseo) è il protagonista dell\'Odissea.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-ita-s1-6',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun complemento alla domanda a cui risponde.',
      leftItems: ['Specificazione', 'Mezzo o strumento', 'Causa'],
      rightItems: ['Di chi? Di che cosa?', 'Per mezzo di che cosa?', 'A causa di che cosa?'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Pensa alle domande guida dell\'analisi logica.',
      explanation: 'Specificazione: di chi? Mezzo: con che cosa? Causa: per quale motivo?'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-ita-s2-4',
      type: 'quiz',
      prompt: 'Quale figura retorica consiste nell\'accostare due termini in contraddizione tra loro, come «silenzio assordante»?',
      options: [
        { label: 'Ossimoro', correct: true },
        { label: 'Metafora', correct: false },
        { label: 'Iperbole', correct: false },
        { label: 'Sinestesia', correct: false }
      ],
      hint: 'Unisce due parole di significato opposto nello stesso sintagma.',
      explanation: 'L\'ossimoro unisce concetti apparentemente inconciliabili (es. «ghiaccio bollente», «silenzio assordante»).'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-ita-s2-5',
      type: 'quiz',
      prompt: 'Quale tempo del modo congiuntivo è il verbo «CHE EGLI AVESSE SCRITTO»?',
      options: [
        { label: 'Congiuntivo trapassato', correct: true },
        { label: 'Congiuntivo imperfetto', correct: false },
        { label: 'Congiuntivo passato', correct: false },
        { label: 'Congiuntivo presente', correct: false }
      ],
      hint: 'È composto dall\'imperfetto del verbo ausiliare (avesse) + participio passato.',
      explanation: '«Avesse scritto» è congiuntivo trapassato, terza persona singolare.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-ita-s2-6',
      type: 'quiz',
      prompt: 'Che tipo di subordinata è introdotta nella frase: «Non esco perché piove a dirotto»?',
      options: [
        { label: 'Subordinata causale', correct: true },
        { label: 'Subordinata finale', correct: false },
        { label: 'Subordinata temporale', correct: false },
        { label: 'Subordinata consecutiva', correct: false }
      ],
      hint: 'Spiega la causa o il motivo per cui non si esce.',
      explanation: 'Introdotta da «perché» o «poiché», esprime la causa dell\'azione: è una subordinata causale.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-ita-s3-5',
      type: 'quiz',
      prompt: 'Quale celebre autore italiano ha scritto la raccolta di cento novelle intitolata «Decameron»?',
      options: [
        { label: 'Giovanni Boccaccio', correct: true },
        { label: 'Francesco Petrarca', correct: false },
        { label: 'Dante Alighieri', correct: false },
        { label: 'Ludovico Ariosto', correct: false }
      ],
      hint: 'Uno delle «Tre Corone» fiorentine del Trecento.',
      explanation: 'Il Decameron fu scritto da Giovanni Boccaccio tra il 1349 e il 1353.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-ita-s3-6',
      type: 'quiz',
      prompt: 'Nella frase «Se avessi studiato di più, ... l\'esame», qual è la forma corretta del condizionale passato?',
      options: [
        { label: 'avrei superato', correct: true },
        { label: 'avessi superato', correct: false },
        { label: 'supererei', correct: false },
        { label: 'avrei superante', correct: false }
      ],
      hint: 'Nel periodo ipotetico dell\'irrealtà al passato: se + congiuntivo trapassato, condizionale passato.',
      explanation: 'La concordanza corretta è: «Se avessi studiato di più, avrei superato l\'esame».'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-ita-s3-7',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun prefisso di origine greca al suo significato in italiano.',
      leftItems: ['Bio-', 'Crono-', 'Geo-'],
      rightItems: ['Vita', 'Tempo', 'Terra'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Pensa a parole come biologia, cronometro, geografia.',
      explanation: 'Bio = vita; Crono = tempo; Geo = terra.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-ita-s1-m1',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni complemento alla domanda a cui risponde.',
      leftItems: ['Specificazione', 'Termine', 'Luogo'],
      rightItems: ['Di chi? Di che cosa?', 'A chi? A che cosa?', 'Dove? Verso dove?'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Il complemento di termine risponde ad «a chi?».',
      explanation: 'Specificazione: di chi/cosa; Termine: a chi/cosa; Luogo: dove.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-ita-s2-m1',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni figura retorica al suo esempio poetico.',
      leftItems: ['Similitudine', 'Metafora', 'Personificazione'],
      rightItems: ['Veloce come un lampo', 'Quel ragazzo è un leone', 'Il vento sussurra'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'La similitudine usa «come»; la metafora identifica direttamente; la personificazione dà sentimenti a cose.',
      explanation: 'Similitudine usa «come»; metafora è un paragone senza «come»; personificazione attribuisce sentimenti o azioni a cose.'
    }
  },
  {
    years: ['S3'],
    round: {
      id: 'qb-ita-s3-m1',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni proposizione subordinata al suo tipo.',
      leftItems: ['Causale', 'Temporale', 'Finale'],
      rightItems: ['Perché pioveva', 'Mentre camminavo', 'Per superare la prova'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Causale indica il motivo; temporale indica il tempo; finale indica lo scopo.',
      explanation: 'Causale esprime la causa, temporale il tempo, finale lo scopo.'
    }
  },

  // ── Integrazione percorsi: Primaria 1ª – 2ª (P1, P2) ──────────────
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-ext-1',
      type: 'quiz',
      prompt: 'Quale tra queste è una vocale?',
      options: [
        { label: 'E', correct: true },
        { label: 'M', correct: false },
        { label: 'T', correct: false },
        { label: 'S', correct: false }
      ],
      hint: 'Le cinque vocali sono A, E, I, O, U.',
      explanation: 'La lettera E è una vocale.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-ext-2',
      type: 'quiz',
      prompt: 'Quale parola fa rima con "FIORE"?',
      options: [
        { label: 'Cuore', correct: true },
        { label: 'Prato', correct: false },
        { label: 'Albero', correct: false },
        { label: 'Cane', correct: false }
      ],
      hint: 'Ascolta il suono finale: -ORE.',
      explanation: 'Fiore e Cuore finiscono entrambi con il suono -ore.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-ext-3',
      type: 'quiz',
      prompt: 'Quale parola è scritta nel modo corretto con la doppia?',
      options: [
        { label: 'Gatto', correct: true },
        { label: 'Gato', correct: false },
        { label: 'Gattto', correct: false }
      ],
      hint: 'La parola gatto si scrive con due T.',
      explanation: 'La grafia corretta è gatto con doppia T.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-ext-4',
      type: 'image',
      icon: 'cane',
      prompt: 'Quale articolo determinativo va davanti a questa parola?',
      options: [
        { label: 'Il cane', correct: true },
        { label: 'La cane', correct: false },
        { label: 'Lo cane', correct: false }
      ],
      hint: 'Cane è un nome maschile singolare che inizia con consonante.',
      explanation: 'Si dice "il cane".'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-ext-5',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Tocca le prime lettere dell\'alfabeto in ordine.',
      items: ['A', 'B', 'C', 'D'],
      hint: 'Inizia dalla prima lettera dell\'alfabeto.',
      explanation: 'L\'ordine alfabetico è A, B, C, D.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-ext-6',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni parola al suo contrario.',
      leftItems: ['Alto', 'Giorno', 'Caldo'],
      rightItems: ['Notte', 'Freddo', 'Basso'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Cerca il significato opposto.',
      explanation: 'Alto ↔ Basso; Giorno ↔ Notte; Caldo ↔ Freddo.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-ext-7',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina il nome singolare al suo plurale.',
      leftItems: ['Mela', 'Libro', 'Stella'],
      rightItems: ['Libri', 'Stelle', 'Mele'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Trasforma da uno a tanti.',
      explanation: 'Mela → Mele; Libro → Libri; Stella → Stelle.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-ita-p1-ext-8',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Metti in ordine le sillabe per formare la parola.',
      sortItems: ['MA', 'TI', 'TA'],
      hint: 'Lo strumento che usi per scrivere sul quaderno.',
      explanation: 'MA + TI + TA = MATITA.'
    }
  },
  // ── Integrazione percorsi: Primaria 3ª – 5ª (P3, P4, P5) ──────────
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-ita-p3-ext-1',
      type: 'quiz',
      prompt: 'Quale tra questi è un aggettivo qualificativo?',
      options: [
        { label: 'Luminoso', correct: true },
        { label: 'Casa', correct: false },
        { label: 'Correre', correct: false },
        { label: 'Ieri', correct: false }
      ],
      hint: 'Risponde alla domanda: "com\'è?".',
      explanation: 'Luminoso descrive una qualità del nome.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-ita-p3-ext-2',
      type: 'quiz',
      prompt: 'Qual è il tempo del verbo "Noi giocheremo"?',
      options: [
        { label: 'Futuro semplice', correct: true },
        { label: 'Presente', correct: false },
        { label: 'Passato prossimo', correct: false },
        { label: 'Imperfetto', correct: false }
      ],
      hint: 'Indica un\'azione che deve ancora accadere.',
      explanation: 'Giocheremo è futuro semplice del verbo giocare.'
    }
  },
  {
    years: ['P3', 'P4', 'P5'],
    round: {
      id: 'qb-ita-p3-ext-3',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun nome al suo articolo corretto.',
      leftItems: ['Zaino', 'Albero', 'Scuola'],
      rightItems: ['La', 'Lo', 'L\''],
      pairs: [[0, 1], [1, 2], [2, 0]],
      hint: 'Davanti a Z si usa lo; davanti a vocale l\'apostrofo.',
      explanation: 'Lo zaino, L\'albero, La scuola.'
    }
  },
  {
    years: ['P3', 'P4', 'P5'],
    round: {
      id: 'qb-ita-p3-ext-4',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina le parole per formare una frase corretta.',
      sortItems: ['Il', 'sole', 'splende', 'nel', 'cielo'],
      hint: 'Inizia con l\'articolo e il soggetto.',
      explanation: 'La frase ordinata è: Il sole splende nel cielo.'
    }
  },
  {
    years: ['P4', 'P5', 'S1'],
    round: {
      id: 'qb-ita-p4-ext-1',
      type: 'quiz',
      prompt: 'Quale parola contiene il prefisso che significa "non"?',
      options: [
        { label: 'Infelice', correct: true },
        { label: 'Felicità', correct: false },
        { label: 'Felice', correct: false },
        { label: 'Felicemente', correct: false }
      ],
      hint: 'Il prefisso in- indica negazione.',
      explanation: 'In-felice significa "non felice".'
    }
  },
  {
    years: ['P4', 'P5', 'S1'],
    round: {
      id: 'qb-ita-p4-ext-2',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni parola al suo sinonimo.',
      leftItems: ['Veloce', 'Felice', 'Casa'],
      rightItems: ['Gioioso', 'Abitazione', 'Rapido'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Cerca parole con significato simile.',
      explanation: 'Veloce = Rapido; Felice = Gioioso; Casa = Abitazione.'
    }
  },
  // ── Integrazione percorsi: Secondaria 1ª – 3ª (S1, S2, S3) ─────────
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-ita-s1-ext-1',
      type: 'quiz',
      prompt: 'Nella frase "Marco legge un libro interessante", qual è il complemento oggetto?',
      options: [
        { label: 'Un libro interessante', correct: true },
        { label: 'Marco', correct: false },
        { label: 'Legge', correct: false }
      ],
      hint: 'Risponde alla domanda: "chi? che cosa?".',
      explanation: '"Un libro interessante" risponde alla domanda "che cosa legge Marco?".'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-ita-s1-ext-2',
      type: 'quiz',
      prompt: 'Quale figura retorica è presente in: "Quell\'atleta è una saetta"?',
      options: [
        { label: 'Metafora', correct: true },
        { label: 'Similitudine', correct: false },
        { label: 'Onomatopea', correct: false },
        { label: 'Ossimoro', correct: false }
      ],
      hint: 'È una similitudine abbreviata senza la parola "come".',
      explanation: 'È una metafora perché attribuisce direttamente la qualità senza usare "come".'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-ita-s1-ext-3',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni elemento della frase alla sua funzione logica.',
      leftItems: ['Il gatto', 'insegue', 'il topo'],
      rightItems: ['Predicato verbale', 'Complemento oggetto', 'Soggetto'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Chi compie l\'azione? Che azione fa? Chi la subisce?',
      explanation: 'Il gatto = Soggetto; insegue = Predicato verbale; il topo = Compl. oggetto.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-ita-s1-ext-4',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina le parti del discorso secondo la struttura canonica italiana.',
      sortItems: ['Soggetto', 'Predicato', 'Complemento Oggetto'],
      hint: 'Struttura SVO: Soggetto - Verbo - Oggetto.',
      explanation: 'La struttura canonica è Soggetto → Predicato → Complemento.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-ita-s3-ext-1',
      type: 'quiz',
      prompt: 'Quale modo verbale esprime desiderio, dubbio o possibilità?',
      options: [
        { label: 'Congiuntivo', correct: true },
        { label: 'Indicativo', correct: false },
        { label: 'Imperativo', correct: false },
        { label: 'Participio', correct: false }
      ],
      hint: 'Si usa spesso dopo verbi come "credo che", "spero che".',
      explanation: 'Il congiuntivo è il modo del dubbio e della possibilità.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-ita-s3-ext-2',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni frase al modo verbale sottolineato.',
      leftItems: ['Se studiassi...', 'Vorrei un gelato', 'Ascolta la lezione!'],
      rightItems: ['Condizionale', 'Imperativo', 'Congiuntivo'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Studiassi = congiuntivo; Vorrei = condizionale; Ascolta! = imperativo.',
      explanation: 'Se studiassi (congiuntivo); Vorrei (condizionale); Ascolta (imperativo).'
    }
  },


    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e1",
        type: "quiz",
        prompt: "Quale parola è scritta con la DOPPIA corretta?",
        options: [
          { label: "Gatto", correct: true },
          { label: "Gato", correct: false },
          { label: "Gattto", correct: false }
        ],
        hint: "Ascolta il suono forte della 't'.",
        explanation: "La parola 'gatto' si scrive con due 't'."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e2",
        type: "quiz",
        prompt: "Quale parola contiene il suono dolce 'CI' come in 'ciliegia'?",
        options: [
          { label: "Cinema", correct: true },
          { label: "Casa", correct: false },
          { label: "Cane", correct: false }
        ],
        hint: "Davanti a 'i' la lettera 'c' ha un suono dolce.",
        explanation: "In 'cinema' la 'c' si pronuncia dolce (ci-ne-ma)."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e3",
        type: "quiz",
        prompt: "Quale parola fa rima con 'FIORE'?",
        options: [
          { label: "Cuore", correct: true },
          { label: "Foglia", correct: false },
          { label: "Albero", correct: false }
        ],
        hint: "Ascolta il suono finale: '-ore'.",
        explanation: "Fiore e Cuore finiscono con lo stesso suono (-ore)."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e4",
        type: "quiz",
        prompt: "Quale parola della 'famiglia acqua' si scrive con 'CQU'?",
        options: [
          { label: "Acquario", correct: true },
          { label: "Aquario", correct: false },
          { label: "Accuario", correct: false }
        ],
        hint: "Tutte le parole derivate da 'acqua' vogliono CQU.",
        explanation: "La parola 'acquario' si scrive con 'cqu'."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e5",
        type: "quiz",
        prompt: "Quale lettera ci vuole all'inizio di una frase dopo il punto?",
        options: [
          { label: "La lettera maiuscola", correct: true },
          { label: "La lettera minuscola", correct: false },
          { label: "Un numero", correct: false }
        ],
        hint: "La prima lettera deve essere sempre grande.",
        explanation: "All'inizio di una frase e dopo il punto fermo si usa la lettera maiuscola."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e6",
        type: "quiz",
        prompt: "Quale parola è divisa correttamente in sillabe?",
        options: [
          { label: "CA - SA", correct: true },
          { label: "CAS - A", correct: false },
          { label: "C - ASA", correct: false }
        ],
        hint: "Batti le mani: CA... SA...",
        explanation: "'Casa' è formata da due sillabe: CA-SA."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni parola con il disegno o suono corrispondente.",
        leftItems: ["Ragno", "Bottiglia", "Sciarpa"],
        rightItems: ["Suono GN", "Suono GLI", "Suono SCI"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Ascolta il gruppo consonantico presente in ciascuna parola.",
        explanation: "Ra-gno ha GN, bot-ti-glia ha GLI, sciar-pa ha SCI."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e8",
        type: "quiz",
        prompt: "Quale parola è scritta nel modo corretto?",
        options: [
          { label: "Foglia", correct: true },
          { label: "Folia", correct: false },
          { label: "Follia", correct: false }
        ],
        hint: "Vuole il trigramma 'gli'.",
        explanation: "La foglia dell'albero si scrive con 'gli'."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e9",
        type: "quiz",
        prompt: "Quale tra queste è una parola che indica una COSA?",
        options: [
          { label: "Tavolo", correct: true },
          { label: "Maestra", correct: false },
          { label: "Cane", correct: false }
        ],
        hint: "Maestra è una persona, cane è un animale.",
        explanation: "'Tavolo' è un nome comune di cosa inanimata."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e10",
        type: "quiz",
        prompt: "Quale parola serve per completare la frase: 'Il gatto beve il ...'?",
        options: [
          { label: "latte", correct: true },
          { label: "sasso", correct: false },
          { label: "libro", correct: false }
        ],
        hint: "È una bevanda bianca che piace ai gatti.",
        explanation: "Il gatto beve il latte."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e11",
        type: "quiz",
        prompt: "Quale segno di punteggiatura si mette alla fine di una frase normale?",
        options: [
          { label: "Il punto fermo (.)", correct: true },
          { label: "La virgola (,)", correct: false },
          { label: "I due punti (:)", correct: false }
        ],
        hint: "Chiude il pensiero e ferma la frase.",
        explanation: "La frase si conclude sempre con il punto fermo (.)."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Metti in ordine le parole per formare una frase corretta.",
        sortItems: ["Il", "sole", "brilla", "nel cielo."],
        hint: "Inizia con la parola con la lettera maiuscola.",
        explanation: "La frase corretta è: 'Il sole brilla nel cielo.'"
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e13",
        type: "quiz",
        prompt: "Quale parola contiene il suono 'GN' come in 'lavagna'?",
        options: [
          { label: "Pigna", correct: true },
          { label: "Pena", correct: false },
          { label: "Palla", correct: false }
        ],
        hint: "Il frutto del pino.",
        explanation: "'Pigna' contiene il digramma 'gn'."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e14",
        type: "quiz",
        prompt: "Come si dice al plurale (tanti) se al singolare c'è 'LA MELA'?",
        options: [
          { label: "Le mele", correct: true },
          { label: "I meli", correct: false },
          { label: "La mele", correct: false }
        ],
        hint: "L'articolo 'la' diventa 'le', 'mela' diventa...",
        explanation: "Il plurale di 'la mela' è 'le mele'."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-ita-p1-e15",
        type: "quiz",
        prompt: "Quale parola è scritta nel modo corretto con la lettera 'Q'?",
        options: [
          { label: "Quadro", correct: true },
          { label: "Cuadro", correct: false },
          { label: "Cquadro", correct: false }
        ],
        hint: "La regola dice: prima la Q, poi la U, poi la vocale che vuoi tu.",
        explanation: "La parola 'quadro' si scrive con 'qu' seguita dalla vocale 'a'."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e1",
        type: "quiz",
        prompt: "Quale frase richiede l'apostrofo corretto?",
        options: [
          { label: "L'albero è fiorito.", correct: true },
          { label: "La albero è fiorito.", correct: false },
          { label: "L albero è fiorito.", correct: false }
        ],
        hint: "Davanti a una vocale l'articolo perde la vocale e prende la gocciolina (apostrofo).",
        explanation: "L'albero: la vocale 'a' di 'la' cade e viene sostituita dall'apostrofo."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e2",
        type: "quiz",
        prompt: "Quale parola richiede l'accento sulla vocale finale?",
        options: [
          { label: "Caffè", correct: true },
          { label: "Tavolo", correct: false },
          { label: "Scuola", correct: false }
        ],
        hint: "La voce sale forte sull'ultima sillaba.",
        explanation: "La parola 'caffè' è tronca e vuole l'accento sulla 'e' finale."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e3",
        type: "quiz",
        prompt: "Quale parola è un NOME PROPRIO e si deve scrivere con la lettera maiuscola?",
        options: [
          { label: "Marco", correct: true },
          { label: "Bambino", correct: false },
          { label: "Amico", correct: false }
        ],
        hint: "È il nome di battesimo di una persona specifica.",
        explanation: "I nomi propri di persona (come Marco, Sofia, Luca) si scrivono sempre con l'iniziale maiuscola."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e4",
        type: "quiz",
        prompt: "Quale segno di punteggiatura serve per fare una DOMANDA?",
        options: [
          { label: "Il punto interrogativo (?)", correct: true },
          { label: "Il punto esclamativo (!)", correct: false },
          { label: "La virgola (,)", correct: false }
        ],
        hint: "Si mette alla fine di una richiesta: 'Come ti chiami?'",
        explanation: "Le domande si concludono sempre con il punto interrogativo (?)."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e5",
        type: "quiz",
        prompt: "Quale tra queste parole è un NOME FEMMINILE PLURALE?",
        options: [
          { label: "Farfalle", correct: true },
          { label: "Farfalla", correct: false },
          { label: "Uccelli", correct: false }
        ],
        hint: "Tante femmine: 'Le...'",
        explanation: "'Farfalle' è femminile plurale (singolare: farfalla)."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e6",
        type: "quiz",
        prompt: "Quale parola è il CONTRARIO di 'ALTO'?",
        options: [
          { label: "Basso", correct: true },
          { label: "Grande", correct: false },
          { label: "Lungo", correct: false }
        ],
        hint: "Il contrario esatto di chi ha una statura elevata.",
        explanation: "Il contrario di alto è basso."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e7",
        type: "dragdrop",
        mode: "sort",
        prompt: "Metti queste parole in ORDINE ALFABETICO (dalla A alla Z).",
        sortItems: ["Barca", "Cane", "Gatto", "Mela"],
        hint: "Guarda la prima lettera di ciascuna parola: B, C, G, M.",
        explanation: "B viene prima di C, che viene prima di G, che viene prima di M."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e8",
        type: "quiz",
        prompt: "Quale forma è corretta nella frase: 'Oggi ... una bella giornata'?",
        options: [
          { label: "è (con l'accento, voce del verbo essere)", correct: true },
          { label: "e (senza accento, congiunzione che unisce)", correct: false }
        ],
        hint: "Spiega 'come è' la giornata, quindi è verbo essere.",
        explanation: "'È' con l'accento è voce del verbo essere; 'e' senza accento serve per unire."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e9",
        type: "quiz",
        prompt: "Quale parola è scritta nel modo corretto con l'apostrofo?",
        options: [
          { label: "C'era una volta", correct: true },
          { label: "Ci era una volta", correct: false },
          { label: "Cera una volta", correct: false }
        ],
        hint: "Significa 'ci era'. 'Cera' senza apostrofo è quella delle candele.",
        explanation: "La forma corretta è 'c'era' (ci era)."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e10",
        type: "quiz",
        prompt: "Come si chiama una persona che aggiusta le automobili?",
        options: [
          { label: "Il meccanico", correct: true },
          { label: "Il falegname", correct: false },
          { label: "Il panettiere", correct: false }
        ],
        hint: "Lavora in officina.",
        explanation: "Il meccanico ripara le auto e i motori."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e11",
        type: "quiz",
        prompt: "Quale tra queste parole è un'ESCLAMAZIONE di sorpresa o gioia?",
        options: [
          { label: "Evviva!", correct: true },
          { label: "Forse", correct: false },
          { label: "Perché", correct: false }
        ],
        hint: "Si usa per festeggiare con il punto esclamativo.",
        explanation: "'Evviva!' è un'esclamazione di gioia."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e12",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni animale al verso caratteristico che fa.",
        leftItems: ["Il cane", "Il gatto", "La rana"],
        rightItems: ["Abbaia", "Miagola", "Gracida"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Pensa ai suoni che emettono questi animali.",
        explanation: "Il cane abbaia, il gatto miagola, la rana gracida."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e13",
        type: "quiz",
        prompt: "Nella frase 'Il gattino BIANCO gioca', la parola BIANCO è...",
        options: [
          { label: "Un aggettivo (spiega com'è il gatto)", correct: true },
          { label: "Un'azione (verbo)", correct: false },
          { label: "Un nome di persona", correct: false }
        ],
        hint: "Risponde alla domanda: 'Com'è il gattino?'",
        explanation: "'Bianco' è un aggettivo qualificativo che descrive una qualità del gatto."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e14",
        type: "quiz",
        prompt: "Quale parola è scritta CORRETTAMENTE senza errori?",
        options: [
          { label: "Ombrello", correct: true },
          { label: "Onbrello", correct: false },
          { label: "Ombrelo", correct: false }
        ],
        hint: "Davanti alle lettere 'B' e 'P' si usa sempre la 'M' e mai la 'N'.",
        explanation: "Regola ortografica: prima di B e P ci vuole sempre la M ('ombrello', 'pompa')."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-ita-p2-e15",
        type: "quiz",
        prompt: "Qual è il SINONIMO (parola con significato simile) di 'FELICE'?",
        options: [
          { label: "Contento", correct: true },
          { label: "Triste", correct: false },
          { label: "Arrabbiato", correct: false }
        ],
        hint: "Significa che prova gioia.",
        explanation: "'Contento' è sinonimo di 'felice'."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e1",
        type: "quiz",
        prompt: "Quale forma verbale completa correttamente la frase: 'Ieri i bambini ... al parco'?",
        options: [
          { label: "hanno giocato (passato)", correct: true },
          { label: "giocano (presente)", correct: false },
          { label: "giocheranno (futuro)", correct: false }
        ],
        hint: "La parola 'ieri' indica un'azione già avvenuta nel passato.",
        explanation: "L'azione è passata (ieri), quindi si usa il passato prossimo 'hanno giocato'."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e2",
        type: "quiz",
        prompt: "Quale frase richiede l'uso della lettera 'H' nel verbo avere?",
        options: [
          { label: "Luca ha fame.", correct: true },
          { label: "Vado a casa.", correct: false },
          { label: "Ti do una caramella a testa.", correct: false }
        ],
        hint: "Significa 'egli possiede / prova fame', voce del verbo avere.",
        explanation: "Quando significa possedere o provare una sensazione si usa 'ha' con l'H."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e3",
        type: "quiz",
        prompt: "Quale tra questi è un ARTICOLO DETERMINATIVO maschile plurale?",
        options: [
          { label: "Gli", correct: true },
          { label: "Dei", correct: false },
          { label: "Un", correct: false }
        ],
        hint: "Gli articoli determinativi sono: il, lo, la, i, gli, le.",
        explanation: "'Gli' è un articolo determinativo maschile plurale (es. 'gli alberi')."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e4",
        type: "quiz",
        prompt: "Nella frase 'Noi CORRIAMO veloce', qual è la persona del verbo 'corriamo'?",
        options: [
          { label: "1ª persona plurale (noi)", correct: true },
          { label: "2ª persona plurale (voi)", correct: false },
          { label: "3ª persona plurale (essi)", correct: false }
        ],
        hint: "Il pronome soggetto è 'noi'.",
        explanation: "Noi corrisponde alla 1ª persona plurale."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e5",
        type: "quiz",
        prompt: "Quale parola è un NOME COLLETTIVO (singolare nella forma, ma indica un insieme di elementi)?",
        options: [
          { label: "Gregge (insieme di pecore)", correct: true },
          { label: "Pecora", correct: false },
          { label: "Pecore", correct: false }
        ],
        hint: "Indica un gruppo intero pur essendo una parola singolare.",
        explanation: "'Gregge', 'mandria', 'flotta' sono nomi collettivi."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e6",
        type: "quiz",
        prompt: "Quale frase usa correttamente 'HANNO' (verbo avere) e 'ANNO' (12 mesi)?",
        options: [
          { label: "Quest'anno i ragazzi hanno una nuova maestra.", correct: true },
          { label: "Quest'hanno i ragazzi anno una nuova maestra.", correct: false },
          { label: "Quest'anno i ragazzi anno una nuova maestra.", correct: false }
        ],
        hint: "'Anno' del calendario non ha la H; 'hanno' verbo avere ha la H.",
        explanation: "L'anno solare è senza H; 'hanno' voce del verbo avere richiede l'H."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni nome primitivo al suo nome derivato.",
        leftItems: ["Carta", "Pane", "Libro"],
        rightItems: ["Cartolaio", "Panettiere", "Libreria"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Cerca la parola che deriva dalla radice del nome base.",
        explanation: "Cartolaio deriva da carta, panettiere da pane, libreria da libro."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e8",
        type: "quiz",
        prompt: "Nel verbo 'SALIRE', a quale coniugazione appartiene (-are, -ere, -ire)?",
        options: [
          { label: "3ª coniugazione (-ire)", correct: true },
          { label: "2ª coniugazione (-ere)", correct: false },
          { label: "1ª coniugazione (-are)", correct: false }
        ],
        hint: "Guarda la desinenza all'infinito: finisce in -ire.",
        explanation: "I verbi in -are sono della 1ª, in -ere della 2ª, in -ire della 3ª coniugazione."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e9",
        type: "quiz",
        prompt: "Quale parola è un NOME ASTRATTO (qualcosa che non si può toccare con mano ma si prova con la mente o il cuore)?",
        options: [
          { label: "Coraggio", correct: true },
          { label: "Libro", correct: false },
          { label: "Bicicletta", correct: false }
        ],
        hint: "Libro e bicicletta sono concreti (si possono toccare).",
        explanation: "'Coraggio', 'amicizia', 'paura' sono nomi astratti."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e10",
        type: "quiz",
        prompt: "Qual è il CONTRARIO dell'aggettivo 'GENEROSO'?",
        options: [
          { label: "Avaro", correct: true },
          { label: "Gentile", correct: false },
          { label: "Simpatico", correct: false }
        ],
        hint: "Chi non vuole condividere nulla.",
        explanation: "L'opposto di generoso è avaro (o egoista)."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e11",
        type: "quiz",
        prompt: "Quale tra questi è un ARTICOLO INDETERMINATIVO femminile?",
        options: [
          { label: "Una", correct: true },
          { label: "Un", correct: false },
          { label: "Uno", correct: false }
        ],
        hint: "Si usa davanti a nomi femminili come 'una mela'.",
        explanation: "'Una' (o 'un'' davanti a vocale) è articolo indeterminativo femminile."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina le forme verbali di 'CANTARE' dal passato al futuro.",
        sortItems: ["Ieri cantai", "Ieri ho cantato", "Oggi canto", "Domani canterò"],
        hint: "Passato remoto, passato prossimo, presente e poi futuro semplice.",
        explanation: "Cantai (passato remoto) -> ho cantato -> canto (presente) -> canterò (futuro)."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e13",
        type: "quiz",
        prompt: "Quale parola è un NOME ALTERATO DIMINUTIVO?",
        options: [
          { label: "Casetta", correct: true },
          { label: "Casone", correct: false },
          { label: "Casaccia", correct: false }
        ],
        hint: "Indica una casa piccola e graziosa (-etta).",
        explanation: "'Casetta' è diminutivo, 'casone' accrescitivo, 'casaccia' dispregiativo."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e14",
        type: "quiz",
        prompt: "In quale frase si usa correttamente 'A' preposizione senza H?",
        options: [
          { label: "Vado a scuola con lo zaino.", correct: true },
          { label: "Vado ha scuola con lo zaino.", correct: false }
        ],
        hint: "Risponde alla domanda 'Dove vado?', non è il verbo avere.",
        explanation: "'A scuola' indica il moto a luogo: è una preposizione semplice e non vuole l'H."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-ita-p3-e15",
        type: "quiz",
        prompt: "Come si chiama la parte finale invariabile della frase che dà un ritmo poetico uguale tra due versi?",
        options: [
          { label: "Rima", correct: true },
          { label: "Capoverso", correct: false },
          { label: "Titolo", correct: false }
        ],
        hint: "Come 'stella' e 'bella'.",
        explanation: "L'uguaglianza di suono tra due parole a partire dall'accento tonico si chiama rima."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e1",
        type: "quiz",
        prompt: "Nell'analisi grammaticale, che cos'è la parola 'MOLTO' nella frase 'Il gelato è MOLTO buono'?",
        options: [
          { label: "Un avverbio (modifica l'aggettivo 'buono')", correct: true },
          { label: "Un nome comune", correct: false },
          { label: "Un articolo determinativo", correct: false }
        ],
        hint: "È una parola invariabile che indica la quantità o intensità.",
        explanation: "'Molto' che precisa l'intensità di un aggettivo è un avverbio di quantità."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e2",
        type: "quiz",
        prompt: "Qual è il grado dell'aggettivo nella frase: 'La giraffa è PIÙ ALTA del cavallo'?",
        options: [
          { label: "Comparativo di maggioranza", correct: true },
          { label: "Superlativo assoluto", correct: false },
          { label: "Comparativo di minoranza", correct: false }
        ],
        hint: "Confronta due elementi con la parola 'più... di'.",
        explanation: "'Più alta di' è un comparativo di maggioranza tra due termini di paragone."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e3",
        type: "quiz",
        prompt: "Quale forma verbale è al MODO GERUNDIO?",
        options: [
          { label: "Correndo", correct: true },
          { label: "Corso", correct: false },
          { label: "Correre", correct: false }
        ],
        hint: "I gerundi finiscono in -ando o -endo.",
        explanation: "'Correndo' è il gerundio presente del verbo correre."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e4",
        type: "quiz",
        prompt: "Quale tra queste è una PREPOSIZIONE ARTICOLATA (preposizione semplice + articolo determinativo)?",
        options: [
          { label: "Sullo (su + lo)", correct: true },
          { label: "Su", correct: false },
          { label: "Lo", correct: false }
        ],
        hint: "Nasce dalla fusione della preposizione 'su' con l'articolo 'lo'.",
        explanation: "'Sullo' è una preposizione articolata (formata da su + lo)."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e5",
        type: "quiz",
        prompt: "Quale parola è un PRONOME POSSESSIVO nella frase: 'Questo è il mio libro, dov'è il TUO?'?",
        options: [
          { label: "Tuo (sostituisce la parola 'libro')", correct: true },
          { label: "Mio (accompagna la parola 'libro')", correct: false },
          { label: "Libro", correct: false }
        ],
        hint: "Il pronome sta al posto del nome e non è seguito dal sostantivo.",
        explanation: "'Tuo' sta da solo al posto di 'tuo libro', quindi è un pronome possessivo."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e6",
        type: "quiz",
        prompt: "A quale tempo del modo indicativo appartiene il verbo 'EGLI AVEVA PARLATO'?",
        options: [
          { label: "Trapassato prossimo", correct: true },
          { label: "Passato prossimo", correct: false },
          { label: "Imperfetto", correct: false }
        ],
        hint: "È formato dall'imperfetto dell'ausiliare (aveva) + participio passato (parlato).",
        explanation: "Imperfetto ausiliare + participio = Trapassato prossimo."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni modo verbale indefinito al suo esempio.",
        leftItems: ["Infinito", "Participio passato", "Gerundio"],
        rightItems: ["Studiare", "Studiato", "Studiando"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "I modi indefiniti non specificano la persona (io, tu...).",
        explanation: "Studiare (infinito), studiato (participio), studiando (gerundio)."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e8",
        type: "quiz",
        prompt: "Qual è il SUPERLATIVO ASSOLUTO dell'aggettivo 'RICCO'?",
        options: [
          { label: "Ricchissimo", correct: true },
          { label: "Più ricco", correct: false },
          { label: "Il più ricco di tutti", correct: false }
        ],
        hint: "Usa il suffisso '-issimo' per esprimere il grado massimo senza confronto.",
        explanation: "'Ricchissimo' è il superlativo assoluto."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e9",
        type: "quiz",
        prompt: "Come si chiama un testo che racconta una storia inventata o reale con personaggi, tempo e luogo?",
        options: [
          { label: "Testo narrativo", correct: true },
          { label: "Testo descrittivo", correct: false },
          { label: "Testo regolativo", correct: false }
        ],
        hint: "Narrare significa raccontare una sequenza di eventi.",
        explanation: "Il testo narrativo racconta vicende di personaggi collocate nel tempo e nello spazio."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e10",
        type: "quiz",
        prompt: "Quale tra queste congiunzioni indica una CAUSA o spiegazione?",
        options: [
          { label: "Perché", correct: true },
          { label: "Ma", correct: false },
          { label: "O", correct: false }
        ],
        hint: "Risponde alla domanda: 'Per quale motivo?'",
        explanation: "'Perché' introduce una spiegazione causale."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e11",
        type: "quiz",
        prompt: "Nella frase 'Mio fratello ha letto UN libro INTERESSANTE', la parola INTERESSANTE è...",
        options: [
          { label: "Un aggettivo qualificativo", correct: true },
          { label: "Un nome proprio", correct: false },
          { label: "Un verbo all'infinito", correct: false }
        ],
        hint: "Descrive una qualità del libro.",
        explanation: "'Interessante' è un aggettivo qualificativo a due uscite (maschile e femminile)."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i gradi dell'aggettivo 'bello' dal grado base al superlativo.",
        sortItems: ["Bello (positivo)", "Più bello (comparativo)", "Il più bello (superlativo relativo)", "Bellissimo (superlativo assoluto)"],
        hint: "Grado positivo, comparativo, superlativo relativo e infine assoluto.",
        explanation: "Scala dei gradi dell'aggettivo qualificativo."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e13",
        type: "quiz",
        prompt: "Quale tra questi è un NOME COMPOSTO (formato da due parole unite)?",
        options: [
          { label: "Portapenne (porta + penne)", correct: true },
          { label: "Pennarello", correct: false },
          { label: "Astuccio", correct: false }
        ],
        hint: "Nasce dall'unione di due parole distinte che formano un unico oggetto.",
        explanation: "I nomi composti sono formati da due parole unite (es. portapenne, capotreno, aspirapolvere)."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e14",
        type: "quiz",
        prompt: "Quale figura retorica mette a confronto due cose usando la parola 'COME' (es. 'Agile come una gazzella')?",
        options: [
          { label: "Similitudine", correct: true },
          { label: "Metafora", correct: false },
          { label: "Personificazione", correct: false }
        ],
        hint: "Stabilisce un paragone esplicito con 'come', 'sembra', 'assomiglia'.",
        explanation: "La similitudine è un confronto introdotto da connettivi come 'come' o 'simile a'."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-ita-p4-e15",
        type: "quiz",
        prompt: "Quale dei seguenti verbi è espresso al tempo PASSATO REMOTO?",
        options: [
          { label: "Egli scrisse", correct: true },
          { label: "Egli scriveva", correct: false },
          { label: "Egli ha scritto", correct: false }
        ],
        hint: "Indica un'azione conclusa in un passato lontano.",
        explanation: "'Scrisse' è la 3ª persona singolare del passato remoto di scrivere."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e1",
        type: "quiz",
        prompt: "Quale modo verbale si usa per esprimere un dubbio, un desiderio o una possibilità (es. 'Credo che tu ...')?",
        options: [
          { label: "Modo Congiuntivo", correct: true },
          { label: "Modo Indicativo", correct: false },
          { label: "Modo Imperativo", correct: false }
        ],
        hint: "Spesso è introdotto dalla parolina 'che' ('che io sia, che tu abbia...').",
        explanation: "Il congiuntivo è il modo della possibilità, del dubbio e del desiderio."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e2",
        type: "quiz",
        prompt: "Quale forma verbale completa correttamente la frase: 'Se avessi le ali, ... in cielo'?",
        options: [
          { label: "volerei (condizionale)", correct: true },
          { label: "volavo (imperfetto)", correct: false },
          { label: "volerò (futuro)", correct: false }
        ],
        hint: "Dopo 'se avessi' (congiuntivo trapassato) ci vuole il condizionale presente.",
        explanation: "Periodo ipotetico della possibilità: Se + congiuntivo trapassato -> condizionale presente ('volerei')."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e3",
        type: "quiz",
        prompt: "Nella frase 'Il libro CHE leggo è avvincente', la parola 'CHE' è...",
        options: [
          { label: "Un pronome relativo (significa 'il quale')", correct: true },
          { label: "Una congiunzione", correct: false },
          { label: "Un articolo", correct: false }
        ],
        hint: "Sostituisce il nome 'libro' collegando le due frasi.",
        explanation: "'Che' pronome relativo sta al posto di 'il quale libro'."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e4",
        type: "quiz",
        prompt: "Che cos'è una METAFORA in poesia?",
        options: [
          { label: "Una similitudine abbreviata senza la parola 'come' (es. 'Sei un leone')", correct: true },
          { label: "Una parola con molte lettere doppie", correct: false },
          { label: "Un racconto in versi senza punteggiatura", correct: false }
        ],
        hint: "Trasferisce direttamente il significato di una parola a un'altra.",
        explanation: "La metafora sostituisce un termine con un altro con cui ha un rapporto di analogia senza usare 'come'."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e5",
        type: "quiz",
        prompt: "Nella frase 'Marco mangia UNA MELA', che ruolo sintattico svolge 'UNA MELA' nell'analisi logica?",
        options: [
          { label: "Complemento oggetto (risponde a: chi? che cosa?)", correct: true },
          { label: "Soggetto", correct: false },
          { label: "Complemento di termine", correct: false }
        ],
        hint: "Riceve direttamente l'azione del verbo 'mangia'.",
        explanation: "Il complemento oggetto risponde alla domanda 'che cosa?' ed è collegato direttamente al verbo transitivo."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e6",
        type: "quiz",
        prompt: "Quale figura retorica consiste nell'attribuire azioni o sentimenti umani a cose inanimate o animali (es. 'Il vento sussurra')?",
        options: [
          { label: "Personificazione", correct: true },
          { label: "Iperbole", correct: false },
          { label: "Allitterazione", correct: false }
        ],
        hint: "Fa agire una cosa come se fosse una 'persona'.",
        explanation: "La personificazione dà voce e comportamenti umani a concetti astratti, oggetti o elementi naturali."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni modo verbale finito al suo uso prevalente.",
        leftItems: ["Indicativo", "Congiuntivo", "Condizionale"],
        rightItems: ["Certezza e realtà", "Dubbio e possibilità", "Condizione o cortesia"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "L'indicativo esprime fatti reali, il congiuntivo desideri, il condizionale ciò che accadrebbe a certe condizioni.",
        explanation: "Valore semantico dei tre grandi modi verbali della lingua italiana."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e8",
        type: "quiz",
        prompt: "Qual è il predicato verbale nella frase: 'La rondine vola alta nel cielo'?",
        options: [
          { label: "Vola", correct: true },
          { label: "La rondine", correct: false },
          { label: "Nel cielo", correct: false }
        ],
        hint: "È il verbo che indica l'azione compiuta dal soggetto.",
        explanation: "Il predicato verbale è l'azione: 'vola'."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e9",
        type: "quiz",
        prompt: "Che cos'è un TESTO ARGOMENTATIVO?",
        options: [
          { label: "Un testo in cui l'autore esprime una tesi e porta prove e ragionamenti per sostenerla", correct: true },
          { label: "Una ricetta di cucina con gli ingredienti", correct: false },
          { label: "Una poesia d'amore in rima alternata", correct: false }
        ],
        hint: "Cerca di convincere il lettore della propria opinione (tesi).",
        explanation: "Il testo argomentativo espone una tesi sostenuta da argomenti logici e dati per convincere chi legge."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e10",
        type: "quiz",
        prompt: "Quale tra queste parole è un AGGETTIVO DIMOSTRATIVO?",
        options: [
          { label: "Questo", correct: true },
          { label: "Mio", correct: false },
          { label: "Qualche", correct: false }
        ],
        hint: "Indica la posizione nello spazio o nel tempo rispetto a chi parla (questo, quello).",
        explanation: "'Questo', 'codesto', 'quello' sono aggettivi dimostrativi."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e11",
        type: "quiz",
        prompt: "Come si chiama il predicato formato dal verbo ESSERE seguito da un aggettivo o un nome (es. 'Il mare È CALMO')?",
        options: [
          { label: "Predicato nominale", correct: true },
          { label: "Predicato verbale", correct: false },
          { label: "Attributo", correct: false }
        ],
        hint: "Copula (è) + parte nominale (calmo).",
        explanation: "Verbo essere (copula) + nome/aggettivo costituiscono il predicato nominale."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina le fasi tipiche della struttura di un racconto narrativo.",
        sortItems: ["Situazione iniziale", "Sviluppo ed eventi", "Climax (momento di massima tensione)", "Conclusione e finale"],
        hint: "Dall'inizio alla risoluzione finale.",
        explanation: "Schema narrativo classico: esordio -> peripezie -> culmine -> scioglimento."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e13",
        type: "quiz",
        prompt: "Quale frase contiene un errore nell'accordo tra soggetto e verbo?",
        options: [
          { label: "Il gruppo di studenti sono partiti.", correct: true },
          { label: "Il gruppo di studenti è partito.", correct: false },
          { label: "Gli studenti sono partiti.", correct: false }
        ],
        hint: "Il soggetto grammaticale è 'il gruppo' (singolare).",
        explanation: "'Il gruppo' è singolare, quindi il verbo deve concordare al singolare: 'è partito'."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e14",
        type: "quiz",
        prompt: "Che cosa indica il modo IMPERATIVO?",
        options: [
          { label: "Un comando, un ordine o un'istruzione (es. 'Ascolta!')", correct: true },
          { label: "Un desiderio nel passato", correct: false },
          { label: "Un'azione ipotetica", correct: false }
        ],
        hint: "Si usa per dare ordini o consigli energici.",
        explanation: "Il modo imperativo serve per esprimere ordini, divieti, preghiere o esortazioni."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-ita-p5-e15",
        type: "quiz",
        prompt: "Quale coppia di parole presenta una relazione di OMONIMIA (si scrivono e pronunciano uguali ma hanno significati diversi)?",
        options: [
          { label: "Riso (cereale) e Riso (ridere)", correct: true },
          { label: "Alto e Basso", correct: false },
          { label: "Casa e Abitazione", correct: false }
        ],
        hint: "La stessa identica parola indica sia il cibo che la risata.",
        explanation: "Gli omonimi sono parole con identica grafia e pronuncia ma significato diverso."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e1",
        type: "quiz",
        prompt: "Nell'analisi logica, a quale domanda risponde il COMPLEMENTO DI SPECIFICAZIONE?",
        options: [
          { label: "Di chi? Di che cosa?", correct: true },
          { label: "A chi? A che cosa?", correct: false },
          { label: "Dove? In quale luogo?", correct: false }
        ],
        hint: "È introdotto dalla preposizione 'di' (es. 'Il libro DI PAOLO').",
        explanation: "Il complemento di specificazione specifica e chiarisce il significato del termine a cui si riferisce."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e2",
        type: "quiz",
        prompt: "Qual è il grande poema epico attribuito a Omero che narra il lungo viaggio di ritorno di Ulisse a Itaca?",
        options: [
          { label: "Odissea", correct: true },
          { label: "Iliade", correct: false },
          { label: "Eneide", correct: false }
        ],
        hint: "Ulisse in greco si chiama Odisseo.",
        explanation: "L'Odissea narra le avventure e le peregrinazioni di Odisseo (Ulisse) nel Mar Mediterraneo."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e3",
        type: "quiz",
        prompt: "Nell'analisi logica, come si chiama il complemento che indica verso quale persona o cosa è diretta l'azione, introdotto da 'A' (es. 'Ho telefonato A MARCO')?",
        options: [
          { label: "Complemento di termine", correct: true },
          { label: "Complemento di specificazione", correct: false },
          { label: "Complemento di causa", correct: false }
        ],
        hint: "Risponde alla domanda: 'A chi? A che cosa?'.",
        explanation: "Il complemento di termine individua l'elemento su cui termina l'azione del predicato."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e4",
        type: "quiz",
        prompt: "Qual è la differenza fondamentale tra MITO e FAVOLA?",
        options: [
          { label: "Il mito spiega l'origine del mondo o degli dei, la favola ha protagonisti animali e una morale educativa", correct: true },
          { label: "Il mito è scritto solo in versi, la favola solo in latino", correct: false },
          { label: "Non c'è alcuna differenza", correct: false }
        ],
        hint: "Pensa alle favole di Esopo con la volpe e l'uva e ai miti greci dell'Olimpo.",
        explanation: "Il mito è un racconto sacro sulle origini; la favola ha intento morale con animali parlanti."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e5",
        type: "quiz",
        prompt: "Quale complemento logico è presente nella parte evidenziata: 'Pico corre IN GIARDINO'?",
        options: [
          { label: "Complemento di stato in luogo", correct: true },
          { label: "Complemento di specificazione", correct: false },
          { label: "Complemento di modo", correct: false }
        ],
        hint: "Indica il luogo in cui si svolge l'azione: 'Dove?'.",
        explanation: "'In giardino' indica il luogo fermo o lo spazio in cui avviene l'azione (stato in luogo)."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e6",
        type: "quiz",
        prompt: "Chi è l'autore latino dell'ENEIDE, il poema sulle origini di Roma fondate dall'eroe Enea?",
        options: [
          { label: "Virgilio", correct: true },
          { label: "Omero", correct: false },
          { label: "Dante Alighieri", correct: false }
        ],
        hint: "Poeta romano dell'età augustea.",
        explanation: "L'Eneide fu composta da Publio Virgilio Marone per celebrare la grandezza di Roma e Augusto."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni grande eroe epico al poema in cui è protagonista.",
        leftItems: ["Achille", "Ulisse", "Enea"],
        rightItems: ["Iliade", "Odissea", "Eneide"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Achille combatte a Troia nell'Iliade, Ulisse torna a Itaca, Enea fugge da Troia verso l'Italia.",
        explanation: "I tre grandi protagonisti dei capolavori dell'epica classica studiati in 1ª media."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e8",
        type: "quiz",
        prompt: "Nella frase 'Sofia studia CON ATTENZIONE', che complemento logico è 'CON ATTENZIONE'?",
        options: [
          { label: "Complemento di modo (risponde a: come? in che modo?)", correct: true },
          { label: "Complemento di mezzo", correct: false },
          { label: "Complemento di tempo", correct: false }
        ],
        hint: "Spiega la modalità con cui Sofia sta studiando.",
        explanation: "Il complemento di modo risponde alla domanda 'come? in quale maniera?'."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e9",
        type: "quiz",
        prompt: "Quale delle seguenti è una frase con SOGGETTO SOTTINTESO?",
        options: [
          { label: "Siamo partiti all'alba. (Soggetto sottinteso: Noi)", correct: true },
          { label: "I ragazzi giocano nel parco.", correct: false },
          { label: "Il vento soffiava forte.", correct: false }
        ],
        hint: "Il pronome soggetto non è scritto apertamente ma si capisce dalla desinenza del verbo.",
        explanation: "In 'Siamo partiti' il soggetto non compare espressamente: è sottinteso 'noi'."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e10",
        type: "quiz",
        prompt: "Che cos'è l'EPITETO nell'epica classica (es. 'Achille pié veloce', 'Atena occhi azzurri')?",
        options: [
          { label: "Un aggettivo o formula fissa che caratterizza costantemente un personaggio", correct: true },
          { label: "Un insulto rivolto al nemico prima del duello", correct: false },
          { label: "Il nome della nave degli achei", correct: false }
        ],
        hint: "Formula ricorrente tipica dei canti orali omerici.",
        explanation: "L'epiteto è una formula formulare fissa che accompagnava i personaggi nell'epica classica."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e11",
        type: "quiz",
        prompt: "Quale complemento logico risponde alla domanda 'Da quando? Per quanto tempo? Quando?'?",
        options: [
          { label: "Complemento di tempo (determinato o continuato)", correct: true },
          { label: "Complemento di causa", correct: false },
          { label: "Complemento di luogo", correct: false }
        ],
        hint: "Colloca l'azione sulla linea temporale.",
        explanation: "Il complemento di tempo determinato precisa il momento, quello continuato la durata."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i complementi logici in base alla domanda a cui rispondono: [Chi/Che cosa?], [Di chi?], [A chi?], [Dove?].",
        sortItems: ["Complemento oggetto", "Complemento di specificazione", "Complemento di termine", "Complemento di luogo"],
        hint: "Oggetto diretto -> specificazione -> termine -> luogo.",
        explanation: "Corrispondenza tra domande canoniche e complementi principali dell'analisi logica."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e13",
        type: "quiz",
        prompt: "Quale tra queste figure retoriche consiste nella ripetizione degli stessi suoni o lettere all'inizio o all'interno di parole vicine (es. 'Caddi come corpo morto cade')?",
        options: [
          { label: "Allitterazione", correct: true },
          { label: "Onomatopea", correct: false },
          { label: "Ossimoro", correct: false }
        ],
        hint: "Ripetizione della stessa consonante o sillaba per creare musicalità.",
        explanation: "L'allitterazione è la ripetizione di lettere o suoni simili in parole contigue."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e14",
        type: "quiz",
        prompt: "Come si chiama una parola che imita direttamente un rumore naturale o suono (es. 'tic-tac', 'miao', 'fruscio', 'tintinnio')?",
        options: [
          { label: "Onomatopea", correct: true },
          { label: "Metafora", correct: false },
          { label: "Sinestesia", correct: false }
        ],
        hint: "Copia acusticamente il suono che descrive.",
        explanation: "L'onomatopea è una parola o espressione che evoca o riproduce il suono reale."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-ita-s1-e15",
        type: "quiz",
        prompt: "Nella frase passiva 'La mela è stata mangiata DA MARCO', 'DA MARCO' è...",
        options: [
          { label: "Complemento d'agente (indica chi compie l'azione nella frase passiva)", correct: true },
          { label: "Soggetto", correct: false },
          { label: "Complemento di causa", correct: false }
        ],
        hint: "Risponde alla domanda: 'Da parte di chi?'. Se fosse una cosa sarebbe 'causa efficiente'.",
        explanation: "Il complemento d'agente indica l'essere animato da cui è compiuta l'azione retta da un verbo passivo."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e1",
        type: "quiz",
        prompt: "In narratologia, come si chiama il salto all'indietro nel tempo in cui il narratore racconta fatti accaduti prima (flashback)?",
        options: [
          { label: "Analessi (o flashback)", correct: true },
          { label: "Prolessi (o flashforward)", correct: false },
          { label: "Ellissi", correct: false }
        ],
        hint: "La prolessi anticipa il futuro, l'analessi rievoca il passato.",
        explanation: "L'analessi consiste nell'evocazione a ritroso di eventi anteriori al punto della storia."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e2",
        type: "quiz",
        prompt: "Nell'analisi logica, a quale domanda risponde il COMPLEMENTO DI CAUSA?",
        options: [
          { label: "Per quale motivo? A causa di che cosa?", correct: true },
          { label: "A quale scopo? Con quale fine?", correct: false },
          { label: "Per mezzo di che cosa?", correct: false }
        ],
        hint: "Es. 'Tremava PER LA PAURA'.",
        explanation: "Il complemento di causa esprime il motivo o la circostanza che genera l'azione del predicato."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e3",
        type: "quiz",
        prompt: "Qual è il genere letterario caratterizzato da un enigma, un delitto da risolvere, indizi, sospettati e un investigatore?",
        options: [
          { label: "Romanzo giallo (o poliziesco)", correct: true },
          { label: "Romanzo fantasy", correct: false },
          { label: "Romanzo storico", correct: false }
        ],
        hint: "Pensa a Sherlock Holmes o Hercule Poirot.",
        explanation: "Il giallo ruota attorno all'indagine logica su un delitto o mistero da chiarire."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e4",
        type: "quiz",
        prompt: "Nella frase 'Ho aperto la scatola CON LE FORBICI', 'CON LE FORBICI' è...",
        options: [
          { label: "Complemento di mezzo (o strumento)", correct: true },
          { label: "Complemento di modo", correct: false },
          { label: "Complemento di compagnia", correct: false }
        ],
        hint: "Risponde a: 'Per mezzo di quale strumento?'.",
        explanation: "Il complemento di mezzo indica l'oggetto inanimato o lo strumento usato per compiere l'azione."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e5",
        type: "quiz",
        prompt: "Qual è la differenza in narratologia tra FABULA e INTRECCIO?",
        options: [
          { label: "La fabula segue l'ordine cronologico naturale degli eventi; l'intreccio è l'ordine in cui l'autore sceglie di raccontarli", correct: true },
          { label: "La fabula è la traduzione francese dell'intreccio", correct: false },
          { label: "La fabula riguarda solo i personaggi negativi", correct: false }
        ],
        hint: "L'autore può usare flashback e anticipazioni per cambiare l'ordine cronologico (intreccio).",
        explanation: "Fabula = sequenza cronologica reale; intreccio = montaggio narrativo degli eventi."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e6",
        type: "quiz",
        prompt: "Nella frase 'Vado al cinema CON CHIARA', 'CON CHIARA' è...",
        options: [
          { label: "Complemento di compagnia", correct: true },
          { label: "Complemento di unione", correct: false },
          { label: "Complemento di mezzo", correct: false }
        ],
        hint: "È una persona (essere vivente): se fosse una cosa sarebbe 'unione' (es. 'con l'ombrello').",
        explanation: "Con un essere animato si ha il complemento di compagnia; con un oggetto inanimato il complemento di unione."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni tipo di narratore alla sua caratteristica.",
        leftItems: ["Narratore interno", "Narratore esterno onnisciente", "Narratore esterno nascosto"],
        rightItems: ["Racconta in prima persona (io) ed è un personaggio", "Sa tutto dei personaggi, anche pensieri intimi", "Registra i fatti in modo oggettivo come una telecamera"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Distingui punto di vista in prima e terza persona.",
        explanation: "Tipologie del patto narrativo e focalizzazione studiate in 2ª media."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e8",
        type: "quiz",
        prompt: "Nell'analisi logica, a quale domanda risponde il COMPLEMENTO DI FINE (o scopo)?",
        options: [
          { label: "Per quale fine? Con quale obiettivo?", correct: true },
          { label: "A causa di chi?", correct: false },
          { label: "In che modo?", correct: false }
        ],
        hint: "Es. 'Si allena PER LA GARA'.",
        explanation: "Il complemento di fine indica lo scopo o l'obiettivo verso cui è tesa l'azione."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e9",
        type: "quiz",
        prompt: "Chi è l'autore del capolavoro della letteratura italiana 'I PROMESSI SPOSI'?",
        options: [
          { label: "Alessandro Manzoni", correct: true },
          { label: "Giacomo Leopardi", correct: false },
          { label: "Giovanni Boccaccio", correct: false }
        ],
        hint: "Scrittore milanese del Romanticismo ottocentesco.",
        explanation: "Alessandro Manzoni pubblicò la versione definitiva de 'I Promessi Sposi' nel 1840."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e10",
        type: "quiz",
        prompt: "Nella frase 'La finestra è stata rotta DAL VENTO', 'DAL VENTO' è...",
        options: [
          { label: "Complemento di causa efficiente (cosa inanimata che compie l'azione nella frase passiva)", correct: true },
          { label: "Complemento d'agente", correct: false },
          { label: "Complemento di modo", correct: false }
        ],
        hint: "Il vento non è una persona: è una forza inanimata della natura.",
        explanation: "In una frase passiva, l'essere inanimato o forza naturale che compie l'azione è complemento di causa efficiente."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e11",
        type: "quiz",
        prompt: "Come si chiama un'esagerazione voluta per dare risalto a un concetto (es. 'Ti ho aspettato un milione di anni!')?",
        options: [
          { label: "Iperbole", correct: true },
          { label: "Litote", correct: false },
          { label: "Antitesi", correct: false }
        ],
        hint: "Figura retorica che esagera la realtà per enfasi.",
        explanation: "L'iperbole consiste nell'esagerare per eccesso o per difetto un concetto per renderlo incisivo."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i complementi logici in base alle preposizioni che solitamente li introducono.",
        sortItems: ["Specif.: 'di'", "Termine: 'a'", "Luogo: 'in / a / da'", "Causa: 'per / a causa di'"],
        hint: "Segui l'ordine: specificazione, termine, luogo, causa.",
        explanation: "Corrispondenza tra segnali preposizionali e complementi indiretti."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e13",
        type: "quiz",
        prompt: "Che cos'è l'OSSIMORO in una poesia (es. 'silenzio assordante', 'ghiaccio bollente')?",
        options: [
          { label: "L'accostamento di due parole di significato opposto e apparentemente inconciliabile", correct: true },
          { label: "Una rima imperfetta tra due vocali", correct: false },
          { label: "La ripetizione del nome proprio dell'autore", correct: false }
        ],
        hint: "Unisce due concetti che sembrano contraddirsi.",
        explanation: "L'ossimoro unisce nella stessa locuzione due termini semanticamente contraddittori."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e14",
        type: "quiz",
        prompt: "In un romanzo, come si chiama il personaggio principale che si oppone all'eroe (protagonista)?",
        options: [
          { label: "Antagonista", correct: true },
          { label: "Aiutante", correct: false },
          { label: "Comparsa", correct: false }
        ],
        hint: "Crea ostacoli e si scontra con il protagonista.",
        explanation: "L'antagonista è il personaggio che persegue scopi opposti a quelli del protagonista."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-ita-s2-e15",
        type: "quiz",
        prompt: "Quale complemento logico compare in: 'È famoso PER LA SUA ONESTÀ'?",
        options: [
          { label: "Complemento di causa", correct: true },
          { label: "Complemento di fine", correct: false },
          { label: "Complemento di modo", correct: false }
        ],
        hint: "A causa di che cosa è famoso? Per il motivo della sua onestà.",
        explanation: "'Per la sua onestà' indica il motivo (causa) della notorietà."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e1",
        type: "quiz",
        prompt: "Nell'analisi del periodo, come si chiama la proposizione principale che può reggersi da sola e ha senso compiuto autonomo?",
        options: [
          { label: "Proposizione principale (o indipendente)", correct: true },
          { label: "Proposizione subordinata", correct: false },
          { label: "Proposizione incidentale", correct: false }
        ],
        hint: "È il cuore del periodo e non dipende da nessun'altra frase.",
        explanation: "La proposizione principale regge il periodo e gode di autonomia semantica e sintattica."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e2",
        type: "quiz",
        prompt: "Nella frase 'Esco PERCHÉ DEVO COMPRARE IL PANE', che tipo di proposizione subordinata è 'perché devo comprare il pane'?",
        options: [
          { label: "Subordinata causale", correct: true },
          { label: "Subordinata finale", correct: false },
          { label: "Subordinata temporale", correct: false }
        ],
        hint: "Indica il motivo (la causa) per cui esco.",
        explanation: "La proposizione causale esprime la causa o la ragione di quanto affermato nella reggente."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e3",
        type: "quiz",
        prompt: "Chi è l'autore della celebre poesia 'L'INFINITO' ('Sempre caro mi fu quest'ermo colle...')?",
        options: [
          { label: "Giacomo Leopardi", correct: true },
          { label: "Giovanni Pascoli", correct: false },
          { label: "Giosuè Carducci", correct: false }
        ],
        hint: "Poeta di Recanati, tra i massimi del Romanticismo europeo.",
        explanation: "Giacomo Leopardi compose 'L'Infinito' a Recanati nel 1819."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e4",
        type: "quiz",
        prompt: "Nella frase 'Studio AFFINCHÉ POSSA SUPERARE L'ESAME', la subordinata introdotta da 'affinché' è...",
        options: [
          { label: "Subordinata finale (indica lo scopo o fine)", correct: true },
          { label: "Subordinata causale", correct: false },
          { label: "Subordinata consecutiva", correct: false }
        ],
        hint: "Risponde a: 'Con quale obiettivo/fine?'. Vuole il congiuntivo.",
        explanation: "La subordinata finale esprime il fine verso cui è diretta l'azione della reggente."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e5",
        type: "quiz",
        prompt: "Quale grande scrittore siciliano fu il capofila del VERISMO italiano e scrisse 'I Malavoglia' e 'Rosso Malpelo'?",
        options: [
          { label: "Giovanni Verga", correct: true },
          { label: "Luigi Pirandello", correct: false },
          { label: "Italo Calvino", correct: false }
        ],
        hint: "Autore della poetica dell'impersonalità.",
        explanation: "Giovanni Verga fu il massimo esponente del Verismo ottocentesco in Italia."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e6",
        type: "quiz",
        prompt: "Nella frase 'Ti prometto CHE VERRÒ ALLA TUA FESTA', la subordinata 'che verrò alla tua festa' è...",
        options: [
          { label: "Subordinata oggettiva (fa da complemento oggetto alla reggente)", correct: true },
          { label: "Subordinata soggettiva", correct: false },
          { label: "Subordinata temporale", correct: false }
        ],
        hint: "Prometto che cosa? Funge da complemento oggetto per il verbo 'prometto'.",
        explanation: "La subordinata oggettiva svolge nel periodo il ruolo che il complemento oggetto svolge nella frase."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni subordinata alla congiunzione tipica che la introduce.",
        leftItems: ["Causale", "Finale", "Temporale"],
        rightItems: ["Poiché / Perché", "Affinché / Perché (congiuntivo)", "Quando / Mentre"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Causale esprime il motivo, finale lo scopo, temporale il momento.",
        explanation: "Connettivi subordinanti fondamentali per l'analisi del periodo di 3ª media."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e8",
        type: "quiz",
        prompt: "Che cosa si intende per SINESTESIA in poesia (es. 'voce calda', 'urlo nero')?",
        options: [
          { label: "L'accostamento di due parole appartenenti a sfere sensoriali diverse (es. udito + vista o tatto)", correct: true },
          { label: "La ripetizione dell'ultima parola di un verso nel verso successivo", correct: false },
          { label: "Una poesia di quattordici versi endecasillabi", correct: false }
        ],
        hint: "Mescola due sensi differenti, come suono e colore, o tatto e vista.",
        explanation: "La sinestesia associa termini appartenenti a campi percettivi e sensoriali distinti."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e9",
        type: "quiz",
        prompt: "Quale poeta del Decadentismo elaborò la poetica del 'FANCIULLINO' e scrisse 'Myricae'?",
        options: [
          { label: "Giovanni Pascoli", correct: true },
          { label: "Gabriele D'Annunzio", correct: false },
          { label: "Ugo Foscolo", correct: false }
        ],
        hint: "Sosteneva che dentro ognuno di noi continua a vivere un fanciullino che guarda il mondo con stupore.",
        explanation: "Giovanni Pascoli formulò nel 1897 la celebre poetica del Fanciullino."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e10",
        type: "quiz",
        prompt: "Nella frase 'Sembra CHE OGGI PIOVA', che tipo di subordinata è 'che oggi piova'?",
        options: [
          { label: "Subordinata soggettiva (fa da soggetto al verbo impersonale 'sembra')", correct: true },
          { label: "Subordinata oggettiva", correct: false },
          { label: "Subordinata relativa", correct: false }
        ],
        hint: "Il verbo 'sembra' non ha un soggetto espresso: la frase intera funge da soggetto.",
        explanation: "La subordinata soggettiva fa da soggetto a verbi o locuzioni impersonali."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e11",
        type: "quiz",
        prompt: "Qual è la forma metrica di un SONETTO tradizionale della poesia italiana?",
        options: [
          { label: "14 versi endecasillabi divisi in 2 quartine e 2 terzine", correct: true },
          { label: "3 terzine a rima incatenata", correct: false },
          { label: "Un unico blocco di 20 versi liberi", correct: false }
        ],
        hint: "Inventato da Jacopo da Lentini e reso celebre da Petrarca e Dante.",
        explanation: "Il sonetto è composto da 14 endecasillabi articolati in due quartine e due terzine."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i gradi di subordinazione dal livello principale al terzo grado.",
        sortItems: ["Proposizione principale", "Subordinata di 1° grado", "Subordinata di 2° grado", "Subordinata di 3° grado"],
        hint: "Gerarchia dell'albero del periodo.",
        explanation: "La reggente principale sostiene il 1° grado, che sostiene il 2°, che a sua volta regge il 3°."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e13",
        type: "quiz",
        prompt: "Quale autore del Novecento vinse il Premio Nobel per la Letteratura e scrisse 'Il fu Mattia Pascal' e 'Uno, nessuno e centomila'?",
        options: [
          { label: "Luigi Pirandello", correct: true },
          { label: "Italo Svevo", correct: false },
          { label: "Giuseppe Ungaretti", correct: false }
        ],
        hint: "Teorico dell'umorismo e delle 'maschere' sociali.",
        explanation: "Luigi Pirandello esplorò la crisi dell'identità individuale e vinse il Nobel nel 1934."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e14",
        type: "quiz",
        prompt: "Nella frase 'MANGIANDO LA MELA, Luca si macchiò la maglietta', la proposizione implicita al gerundio ha valore...",
        options: [
          { label: "Temporale (Mentre mangiava la mela)", correct: true },
          { label: "Finale", correct: false },
          { label: "Concessivo", correct: false }
        ],
        hint: "Puoi trasformarla con: 'Nel momento in cui mangiava...'.",
        explanation: "Il gerundio 'mangiando' esprime la contemporaneità temporale dell'azione."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-ita-s3-e15",
        type: "quiz",
        prompt: "Quale poeta ermetico scrisse durante la Prima Guerra Mondiale poesie essenziali e folgoranti come 'Mattina' ('M'illumino d'immenso')?",
        options: [
          { label: "Giuseppe Ungaretti", correct: true },
          { label: "Eugenio Montale", correct: false },
          { label: "Salvatore Quasimodo", correct: false }
        ],
        hint: "Autore della raccolta 'L'Allegria' scritta al fronte sul Carso.",
        explanation: "Giuseppe Ungaretti rivoluzionò la poesia italiana del Novecento con versi brevi e scarni."
      }
    },
  ],

  scienze: [
    // ── Primaria 1ª – 2ª (P1, P2) ─────────────────────────────────
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-sci-p1-1',
        type: 'image',
        icon: 'fiore',
        prompt: 'Che cosa vedi nell\'immagine?',
        options: [
          { label: 'Un fiore', correct: true },
          { label: 'Una nuvola', correct: false },
          { label: 'Un pesce', correct: false }
        ],
        hint: 'Ha i petali colorati e lo stelo verde.',
        explanation: 'L\'immagine mostra un fiore.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-sci-p1-2',
        type: 'quiz',
        prompt: 'Con quale organo di senso ascoltiamo i suoni?',
        options: [
          { label: 'Le orecchie', correct: true },
          { label: 'Gli occhi', correct: false },
          { label: 'Il naso', correct: false },
          { label: 'La pelle', correct: false }
        ],
        hint: 'È l\'organo dell\'udito.',
        explanation: 'Le orecchie sono l\'organo dell\'udito.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-sci-p1-3',
        type: 'image',
        icon: 'pesce',
        prompt: 'Dove vive questo animale?',
        options: [
          { label: 'Nell\'acqua', correct: true },
          { label: 'Sugli alberi', correct: false },
          { label: 'Sotto la sabbia del deserto', correct: false }
        ],
        hint: 'Nuota usando le pinne e respira con le branchie.',
        explanation: 'Il pesce vive nell\'acqua di mari, fiumi e laghi.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-sci-p1-4',
        type: 'quiz',
        prompt: 'Quale parte dell\'albero si trova sotto terra e assorbe l\'acqua?',
        options: [
          { label: 'Le radici', correct: true },
          { label: 'Le foglie', correct: false },
          { label: 'I rami', correct: false },
          { label: 'I frutti', correct: false }
        ],
        hint: 'Tengono la pianta ben salda nel terreno.',
        explanation: 'Le radici assorbono acqua e sali minerali dal suolo.'
      }
    },
    {
      years: ['P1', 'P2', 'P3'],
      round: {
        id: 'qb-sci-p2-1',
        type: 'quiz',
        prompt: 'Quale di questi è un essere vivente?',
        options: [
          { label: 'La quercia', correct: true },
          { label: 'Il sasso', correct: false },
          { label: 'La sedia', correct: false },
          { label: 'La nuvola', correct: false }
        ],
        hint: 'Nasce, cresce, si nutre e si riproduce.',
        explanation: 'La quercia è una pianta, quindi è un essere vivente.'
      }
    },
    {
      years: ['P1', 'P2', 'P3'],
      round: {
        id: 'qb-sci-p2-2',
        type: 'sequence',
        direction: 'tap',
        prompt: 'Metti in ordine le fasi di vita di una pianta.',
        items: ['Seme', 'Germoglio', 'Pianta con fiori', 'Frutto'],
        hint: 'Tutto comincia da un piccolo seme nella terra.',
        explanation: 'Dal seme spunta il germoglio, cresce la pianta che fiorisce e infine dà il frutto.'
      }
    },
    {
      years: ['P2', 'P3'],
      round: {
        id: 'qb-sci-p2-3',
        type: 'quiz',
        prompt: 'Che cosa succede al ghiaccio se lo lasciamo al caldo del Sole?',
        options: [
          { label: 'Si scioglie e diventa acqua liquida', correct: true },
          { label: 'Diventa ancora più duro', correct: false },
          { label: 'Si trasforma in pietra', correct: false }
        ],
        hint: 'Passa dallo stato solido allo stato liquido.',
        explanation: 'Con il calore il ghiaccio fonde e torna acqua liquida.'
      }
    },
    {
      years: ['P2', 'P3'],
      round: {
        id: 'qb-sci-p2-4',
        type: 'dragdrop',
        mode: 'match',
        prompt: 'Abbina ogni organo al senso corrispondente.',
        leftItems: ['Occhi', 'Naso', 'Orecchie'],
        rightItems: ['Olfatto', 'Udito', 'Vista'],
        pairs: [
          [0, 2],
          [1, 0],
          [2, 1]
        ],
        hint: 'Con gli occhi vediamo, col naso annusiamo, con le orecchie sentiamo.',
        explanation: 'Occhi = vista, Naso = olfatto, Orecchie = udito.'
      }
    },
    // ── Primaria 3ª – 5ª (P3, P4, P5) ─────────────────────────────
    {
      years: ['P3', 'P4', 'P5'],
      round: {
        id: 'qb-sci-p3-1',
        type: 'quiz',
        prompt: 'Come si chiamano gli animali che si nutrono solo di vegetali?',
        options: [
          { label: 'Erbivori', correct: true },
          { label: 'Carnivori', correct: false },
          { label: 'Onnivori', correct: false }
        ],
        hint: 'Il loro nome viene da «erba».',
        explanation: 'Gli erbivori si nutrono di erba, foglie, frutti e semi.'
      }
    },
    {
      years: ['P3', 'P4'],
      round: {
        id: 'qb-sci-p3-2',
        type: 'quiz',
        prompt: 'Come si chiama il passaggio dell\'acqua dallo stato liquido al vapore?',
        options: [
          { label: 'Evaporazione', correct: true },
          { label: 'Solidificazione', correct: false },
          { label: 'Fusione', correct: false },
          { label: 'Condensazione', correct: false }
        ],
        hint: 'Avviene quando il Sole scalda il mare o l\'acqua bolle.',
        explanation: 'L\'evaporazione trasforma l\'acqua liquida in vapore acqueo.'
      }
    },
    {
      years: ['P3', 'P4', 'P5'],
      round: {
        id: 'qb-sci-p3-3',
        type: 'quiz',
        prompt: 'Quale di questi animali è un mammifero?',
        options: [
          { label: 'Il delfino', correct: true },
          { label: 'La trota', correct: false },
          { label: 'L\'aquila', correct: false },
          { label: 'La lucertola', correct: false }
        ],
        hint: 'Vive in mare ma respira con i polmoni e allatta i piccoli.',
        explanation: 'Il delfino è un mammifero marino: allatta i cuccioli e respira aria.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-sci-p4-1',
        type: 'quiz',
        prompt: 'Quale gas dell\'aria è indispensabile per la nostra respirazione?',
        options: [
          { label: 'Ossigeno', correct: true },
          { label: 'Anidride carbonica', correct: false },
          { label: 'Elio', correct: false }
        ],
        hint: 'Le piante lo producono con la fotosintesi.',
        explanation: 'I nostri polmoni assorbono l\'ossigeno presente nell\'aria.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-sci-p4-2',
        type: 'quiz',
        prompt: 'Come si chiama il processo con cui le piante usano la luce solare per produrre nutrimento?',
        options: [
          { label: 'Fotosintesi clorofilliana', correct: true },
          { label: 'Impollinazione', correct: false },
          { label: 'Germinazione', correct: false },
          { label: 'Digestione', correct: false }
        ],
        hint: 'Avviene nelle foglie verdi grazie alla clorofilla.',
        explanation: 'Con la fotosintesi clorofilliana le piante trasformano acqua, anidride carbonica e luce in zuccheri e ossigeno.'
      }
    },
    {
      years: ['P3', 'P4', 'P5'],
      round: {
        id: 'qb-sci-p4-3',
        type: 'sequence',
        direction: 'tap',
        prompt: 'Ordina una catena alimentare partendo dal produttore.',
        items: ['Erba', 'Coniglio', 'Volpe'],
        hint: 'Si parte sempre dal vegetale mangiato dall\'erbivoro.',
        explanation: 'L\'erba (produttore) nutre il coniglio (erbivoro), che è preda della volpe (carnivoro).'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-sci-p5-1',
        type: 'quiz',
        prompt: 'Quanto tempo impiega la Terra a compiere un giro completo intorno al Sole?',
        options: [
          { label: 'Un anno (circa 365 giorni)', correct: true },
          { label: 'Un giorno (24 ore)', correct: false },
          { label: 'Un mese', correct: false }
        ],
        hint: 'È il moto di rivoluzione che determina le stagioni.',
        explanation: 'Il moto di rivoluzione attorno al Sole dura circa 365 giorni, cioè un anno.'
      }
    },
    {
      years: ['P4', 'P5', 'S1'],
      round: {
        id: 'qb-sci-p5-2',
        type: 'image',
        icon: 'cuore',
        prompt: 'Qual è la funzione principale dell\'organo mostrato nell\'immagine?',
        options: [
          { label: 'Pompare il sangue in tutto il corpo', correct: true },
          { label: 'Digerire il cibo nello stomaco', correct: false },
          { label: 'Filtrare l\'aria che respiriamo', correct: false }
        ],
        hint: 'È il muscolo al centro dell\'apparato circolatorio.',
        explanation: 'Il cuore batte senza sosta per spingere il sangue nei vasi sanguigni.'
      }
    },
    {
      years: ['P5', 'S1'],
      round: {
        id: 'qb-sci-p5-3',
        type: 'quiz',
        prompt: 'Qual è il pianeta più grande del Sistema Solare?',
        options: [
          { label: 'Giove', correct: true },
          { label: 'Marte', correct: false },
          { label: 'Mercurio', correct: false },
          { label: 'Venere', correct: false }
        ],
        hint: 'È un gigante gassoso famoso per la sua Grande Macchia Rossa.',
        explanation: 'Giove è il pianeta più grande del nostro Sistema Solare.'
      }
    },
    {
      years: ['P5', 'S1'],
      round: {
        id: 'qb-sci-p5-4',
        type: 'image',
        icon: 'polmone',
        prompt: 'A quale apparato appartengono gli organi mostrati nell\'icona?',
        options: [
          { label: 'Apparato respiratorio', correct: true },
          { label: 'Apparato locomotore', correct: false },
          { label: 'Apparato digerente', correct: false }
        ],
        hint: 'Si gonfiano d\'aria quando inspiriamo.',
        explanation: 'I polmoni sono gli organi principali dell\'apparato respiratorio.'
      }
    },
    // ── Secondaria di I grado 1ª – 3ª (S1, S2, S3) ────────────────
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-sci-s1-1',
        type: 'quiz',
        prompt: 'Quale organulo è presente nella cellula vegetale ma assente in quella animale?',
        options: [
          { label: 'Il cloroplasto', correct: true },
          { label: 'Il nucleo', correct: false },
          { label: 'Il mitocondrio', correct: false },
          { label: 'Il ribosoma', correct: false }
        ],
        hint: 'Contiene la clorofilla e svolge la fotosintesi.',
        explanation: 'I cloroplasti sono esclusivi delle cellule vegetali e permettono la fotosintesi.'
      }
    },
    {
      years: ['S1', 'S2'],
      round: {
        id: 'qb-sci-s1-2',
        type: 'quiz',
        prompt: 'A quale temperatura bolle l\'acqua pura a livello del mare?',
        options: [
          { label: '100 °C', correct: true },
          { label: '0 °C', correct: false },
          { label: '50 °C', correct: false },
          { label: '37 °C', correct: false }
        ],
        hint: 'A 0 °C ghiaccia, mentre a questa temperatura passa rapidamente a vapore.',
        explanation: 'Alla pressione atmosferica normale l\'acqua bolle a 100 °C.'
      }
    },
    {
      years: ['S1', 'S2'],
      round: {
        id: 'qb-sci-s1-3',
        type: 'quiz',
        prompt: 'Come si chiamano gli organismi formati da una sola cellula, come i batteri?',
        options: [
          { label: 'Unicellulari', correct: true },
          { label: 'Pluricellulari', correct: false },
          { label: 'Vertebrati', correct: false },
          { label: 'Anfibi', correct: false }
        ],
        hint: 'Il prefisso «uni-» significa uno solo.',
        explanation: 'Gli organismi costituiti da un\'unica cellula si dicono unicellulari.'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-sci-s2-1',
        type: 'quiz',
        prompt: 'Qual è la formula chimica dell\'acqua?',
        options: [
          { label: 'H₂O', correct: true },
          { label: 'CO₂', correct: false },
          { label: 'O₂', correct: false },
          { label: 'NaCl', correct: false }
        ],
        hint: 'Due atomi di idrogeno e uno di ossigeno.',
        explanation: 'Ogni molecola d\'acqua è formata da 2 atomi di idrogeno (H) e 1 di ossigeno (O).'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-sci-s2-2',
        type: 'quiz',
        prompt: 'Qual è l\'unità di misura della forza nel Sistema Internazionale?',
        options: [
          { label: 'Il Newton (N)', correct: true },
          { label: 'Il metro (m)', correct: false },
          { label: 'Il secondo (s)', correct: false },
          { label: 'Il grado Celsius (°C)', correct: false }
        ],
        hint: 'Prende il nome dallo scienziato che formulò la legge di gravitazione universale.',
        explanation: 'La forza si misura in Newton (simbolo N).'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-sci-s2-3',
        type: 'quiz',
        prompt: 'Come si chiamano i vasi sanguigni che portano il sangue dal cuore verso gli organi?',
        options: [
          { label: 'Arterie', correct: true },
          { label: 'Vene', correct: false },
          { label: 'Bronchi', correct: false },
          { label: 'Nervi', correct: false }
        ],
        hint: 'Le vene riportano il sangue al cuore, mentre questi vasi partono dal cuore.',
        explanation: 'Le arterie trasportano il sangue in uscita dal cuore verso tutto il corpo.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-sci-s3-1',
        type: 'quiz',
        prompt: 'Se un treno percorre 180 km in 2 ore a velocità costante, qual è la sua velocità?',
        options: [
          { label: '90 km/h', correct: true },
          { label: '360 km/h', correct: false },
          { label: '60 km/h', correct: false },
          { label: '100 km/h', correct: false }
        ],
        hint: 'Velocità = spazio ÷ tempo.',
        explanation: 'v = 180 km ÷ 2 h = 90 km/h.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-sci-s3-2',
        type: 'quiz',
        prompt: 'Dove si trova il DNA nelle cellule eucariote?',
        options: [
          { label: 'Nel nucleo', correct: true },
          { label: 'Nella membrana esterna', correct: false },
          { label: 'Nei vacuoli', correct: false }
        ],
        hint: 'È la «centrale di comando» della cellula.',
        explanation: 'Nelle cellule eucariote il patrimonio genetico (DNA) è racchiuso nel nucleo.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-sci-s3-3',
        type: 'image',
        icon: 'cervello',
        prompt: 'Di quale sistema è l\'organo principale quello raffigurato?',
        options: [
          { label: 'Sistema nervoso centrale', correct: true },
          { label: 'Sistema linfatico', correct: false },
          { label: 'Apparato escretore', correct: false }
        ],
        hint: 'Elabora i pensieri, la memoria e coordina i movimenti attraverso i neuroni.',
        explanation: 'Il cervello è l\'organo principale del sistema nervoso centrale.'
      }
    },
    {
      years: ['S3'],
      round: {
        id: 'qb-sci-s3-4',
        type: 'quiz',
        prompt: 'Come si chiama lo strato più esterno e roccioso del pianeta Terra?',
        options: [
          { label: 'Crosta terrestre', correct: true },
          { label: 'Nucleo interno', correct: false },
          { label: 'Mantello inferiore', correct: false },
          { label: 'Troposfera', correct: false }
        ],
        hint: 'È l\'involucro solido superficiale su cui camminiamo, diviso in placche.',
        explanation: 'La Terra è divisa dall\'esterno all\'interno in crosta, mantello e nucleo.'
      }
    },

  // ── Primaria 1ª – 2ª (P1, P2) ─────────────────────────────────
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-5',
      type: 'image',
      icon: 'albero',
      prompt: 'Quale parte verde della pianta assorbe la luce solare?',
      options: [
        { label: 'La foglia', correct: true },
        { label: 'La radice', correct: false },
        { label: 'Il tronco', correct: false }
      ],
      hint: 'Cresce sui rami ed è quasi sempre verde.',
      explanation: 'La foglia contiene la clorofilla che cattura la luce.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-6',
      type: 'quiz',
      prompt: 'Quale dei seguenti è un animale erbivoro, che si nutre solo di erba e piante?',
      options: [
        { label: 'La mucca', correct: true },
        { label: 'Il leone', correct: false },
        { label: 'Il lupo', correct: false },
        { label: 'Lo squalo', correct: false }
      ],
      hint: 'Pascola nei prati e produce il latte.',
      explanation: 'La mucca mangia solo vegetali: è un animale erbivoro.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-7',
      type: 'image',
      icon: 'occhio',
      prompt: 'A quale dei cinque sensi corrisponde l\'organo mostrato nell\'immagine?',
      options: [
        { label: 'Alla vista', correct: true },
        { label: 'All\'udito', correct: false },
        { label: 'All\'olfatto', correct: false }
      ],
      hint: 'Ci permette di guardare e vedere colori e forme.',
      explanation: 'L\'occhio è l\'organo deputato al senso della vista.'
    }
  },
  {
    years: ['P2', 'P3'],
    round: {
      id: 'qb-sci-p2-5',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Metti in ordine le quattro stagioni dell\'anno a partire dalla primavera.',
      items: ['Primavera', 'Estate', 'Autunno', 'Inverno'],
      hint: 'Dopo i fiori della primavera arriva il caldo dell\'estate.',
      explanation: 'Il ciclo annuale delle stagioni è Primavera, Estate, Autunno, Inverno.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p2-6',
      type: 'quiz',
      prompt: 'Quando l\'acqua diventa ghiaccio a causa del freddo intenso, in quale stato si trova?',
      options: [
        { label: 'Stato solido', correct: true },
        { label: 'Stato liquido', correct: false },
        { label: 'Stato gassoso', correct: false }
      ],
      hint: 'Ha una forma propria dura e compatta.',
      explanation: 'Il ghiaccio è acqua allo stato solido.'
    }
  },
  {
    years: ['P2', 'P3'],
    round: {
      id: 'qb-sci-p2-7',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun animale alla sua classe biologica.',
      leftItems: ['Aquila', 'Trota', 'Farfalla'],
      rightItems: ['Uccello', 'Pesce', 'Insetto'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Pensa a come si muovono e alle loro caratteristiche.',
      explanation: 'L\'aquila è un uccello; la trota è un pesce; la farfalla è un insetto.'
    }
  },

  // ── Primaria 3ª – 4ª – 5ª (P3, P4, P5) ─────────────────────────
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sci-p3-4',
      type: 'quiz',
      prompt: 'Quale sostanza verde contenuta nelle foglie cattura l\'energia della luce per la fotosintesi?',
      options: [
        { label: 'Clorofilla', correct: true },
        { label: 'Emoglobina', correct: false },
        { label: 'Melanina', correct: false },
        { label: 'Cellulosa', correct: false }
      ],
      hint: 'Dà alle foglie il loro tipico colore verde.',
      explanation: 'La clorofilla è il pigmento che assorbe la luce durante la fotosintesi.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sci-p3-5',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Metti in ordine logico le fasi del ciclo dell\'acqua a partire dall\'evaporazione.',
      items: ['Evaporazione', 'Condensazione', 'Precipitazione'],
      hint: 'L\'acqua sale come vapore, forma le nuvole e poi cade come pioggia.',
      explanation: 'L\'acqua evapora dal mare, si condensa in nuvole e precipita come pioggia o neve.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sci-p3-6',
      type: 'quiz',
      prompt: 'In una catena alimentare, come vengono chiamate le piante verdi che producono il proprio nutrimento da sole?',
      options: [
        { label: 'Produttori', correct: true },
        { label: 'Consumatori primari', correct: false },
        { label: 'Decompositori', correct: false },
        { label: 'Predatori', correct: false }
      ],
      hint: 'Producono la materia organica tramite la fotosintesi.',
      explanation: 'I vegetali sono i produttori alla base della catena trofica.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-sci-p4-4',
      type: 'quiz',
      prompt: 'Qual è il pianeta più vicino al Sole nel nostro Sistema Solare?',
      options: [
        { label: 'Mercurio', correct: true },
        { label: 'Venere', correct: false },
        { label: 'Marte', correct: false },
        { label: 'Terra', correct: false }
      ],
      hint: 'È il primo pianeta roccioso partendo dalla stella centrale.',
      explanation: 'Mercurio è il pianeta più vicino al Sole.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-sci-p4-5',
      type: 'quiz',
      prompt: 'Che cosa provoca l\'alternarsi del giorno e della notte sulla Terra?',
      options: [
        { label: 'La rotazione della Terra sul proprio asse', correct: true },
        { label: 'La rivoluzione della Terra attorno al Sole', correct: false },
        { label: 'Le fasi lunari', correct: false },
        { label: 'Il movimento del Sole', correct: false }
      ],
      hint: 'La Terra compie un giro completo su se stessa in circa 24 ore.',
      explanation: 'Il moto di rotazione della Terra attorno al proprio asse dura 24 ore e causa l\'alternanza di luce e buio.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-sci-p4-6',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun passaggio di stato dell\'acqua alla sua definizione.',
      leftItems: ['Fusione', 'Evaporazione', 'Solidificazione'],
      rightItems: ['Da solido a liquido', 'Da liquido a vapore', 'Da liquido a solido'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Pensa al ghiaccio che si scioglie o all\'acqua che bolle.',
      explanation: 'Fusione: solido → liquido; Evaporazione: liquido → gas; Solidificazione: liquido → solido.'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-sci-p5-5',
      type: 'image',
      icon: 'cuore',
      prompt: 'Quale muscolo involontario funge da pompa per far circolare il sangue in tutto il corpo umano?',
      options: [
        { label: 'Il cuore', correct: true },
        { label: 'Il cervello', correct: false },
        { label: 'Il polmone', correct: false }
      ],
      hint: 'Batte nel petto giorno e notte senza mai fermarsi.',
      explanation: 'Il cuore è la pompa muscolare al centro dell\'apparato circolatorio.'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-sci-p5-6',
      type: 'quiz',
      prompt: 'Quale gas indispensabile alla respirazione degli esseri umani viene rilasciato dalle piante durante la fotosintesi?',
      options: [
        { label: 'Ossigeno', correct: true },
        { label: 'Anidride carbonica', correct: false },
        { label: 'Azoto', correct: false },
        { label: 'Metano', correct: false }
      ],
      hint: 'La sua formula chimica è O₂.',
      explanation: 'Durante la fotosintesi clorofilliana le piante assorbono CO₂ e rilasciano ossigeno nell\'aria.'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-sci-p5-7',
      type: 'quiz',
      prompt: 'Qual è lo strato superficiale più fertile del terreno, ricco di sostanze organiche decomposte?',
      options: [
        { label: 'L\'humus', correct: true },
        { label: 'La roccia madre', correct: false },
        { label: 'La sabbia', correct: false },
        { label: 'L\'argilla', correct: false }
      ],
      hint: 'Ha un colore scuro e nutre le radici delle piante.',
      explanation: 'L\'humus è lo strato fertile formato dalla decomposizione di foglie e resti organici.'
    }
  },

  // ── Secondaria di I grado (S1, S2, S3) ───────────────────────────
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-sci-s1-4',
      type: 'quiz',
      prompt: 'Quale organulo cellulare è considerato la centrale energetica della cellula perché produce ATP tramite la respirazione cellulare?',
      options: [
        { label: 'Il mitocondrio', correct: true },
        { label: 'Il ribosoma', correct: false },
        { label: 'Il nucleo', correct: false },
        { label: 'Il lisosoma', correct: false }
      ],
      hint: 'È presente sia nelle cellule animali sia in quelle vegetali per generare energia.',
      explanation: 'Nei mitocondri avviene la respirazione cellulare con produzione di energia sotto forma di ATP.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-sci-s1-5',
      type: 'quiz',
      prompt: 'Quale struttura protegge e dà rigidità alla cellula vegetale, ma è assente nelle cellule animali?',
      options: [
        { label: 'Parete cellulare', correct: true },
        { label: 'Membrana plasmatica', correct: false },
        { label: 'Citoplasma', correct: false },
        { label: 'Nucleo', correct: false }
      ],
      hint: 'È composta principalmente da fibre di cellulosa.',
      explanation: 'La parete cellulare è esclusiva delle cellule vegetali e fornisce sostegno meccanico.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-sci-s1-6',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun apparato del corpo umano alla sua funzione principale.',
      leftItems: ['Apparato digerente', 'Apparato respiratorio', 'Sistema nervoso'],
      rightItems: ['Assimilare i nutrienti dal cibo', 'Scambiare ossigeno e anidride carbonica', 'Trasmettere impulsi elettrici'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Rifletti sui ruoli vitali di stomaco, polmoni e cervello.',
      explanation: 'Digerente: nutrienti; Respiratorio: gas ossigeno/CO₂; Nervoso: segnali e impulsi.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sci-s2-4',
      type: 'quiz',
      prompt: 'Quale scienziato è considerato il padre della genetica grazie ai suoi celebri esperimenti sulle piante di pisello odoroso?',
      options: [
        { label: 'Gregor Mendel', correct: true },
        { label: 'Charles Darwin', correct: false },
        { label: 'Louis Pasteur', correct: false },
        { label: 'Galileo Galilei', correct: false }
      ],
      hint: 'Formulò le leggi della dominanza e della segregazione dei caratteri.',
      explanation: 'Gregor Mendel scoprì le leggi fondamentali dell\'ereditarietà genetica.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sci-s2-5',
      type: 'quiz',
      prompt: 'Qual è la forma tridimensionale della molecola di DNA scoperta da Watson e Crick?',
      options: [
        { label: 'Doppia elica', correct: true },
        { label: 'Sfera cava', correct: false },
        { label: 'Piramide a base quadrata', correct: false },
        { label: 'Anello piatto', correct: false }
      ],
      hint: 'Ricorda una scala a pioli avvolta a spirale.',
      explanation: 'Il DNA (acido desossiribonucleico) è strutturato come una doppia elica di nucleotidi.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sci-s2-6',
      type: 'quiz',
      prompt: 'Quale particella subatomica con carica elettrica NEGATIVA ruota attorno al nucleo dell\'atomo?',
      options: [
        { label: 'Elettrone', correct: true },
        { label: 'Protone', correct: false },
        { label: 'Neutrone', correct: false },
        { label: 'Fotone', correct: false }
      ],
      hint: 'I protoni hanno carica positiva, mentre questa particella ha carica opposta.',
      explanation: 'L\'elettrone ha carica elettrica negativa (-1) e orbita attorno al nucleo atomico.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sci-s3-5',
      type: 'quiz',
      prompt: 'Secondo il principio di Archimede, un corpo immerso in un liquido riceve una spinta dal basso verso l\'alto pari a:',
      options: [
        { label: 'Al peso del volume di liquido spostato', correct: true },
        { label: 'Al doppio del proprio peso', correct: false },
        { label: 'Alla profondità a cui si trova', correct: false },
        { label: 'All\'area della superficie del liquido', correct: false }
      ],
      hint: 'Spiega perché le navi d\'acciaio galleggiano sull\'acqua.',
      explanation: 'La spinta idrostatica di Archimede è uguale al peso del fluido spostato dal corpo.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sci-s3-6',
      type: 'quiz',
      prompt: 'Quale delle seguenti è una fonte di energia RINNOVABILE che non emette gas serra durante il suo utilizzo?',
      options: [
        { label: 'Energia eolica', correct: true },
        { label: 'Carbone', correct: false },
        { label: 'Petrolio', correct: false },
        { label: 'Gas naturale', correct: false }
      ],
      hint: 'Sfrutta la forza naturale del vento per far girare le turbine.',
      explanation: 'Il vento è una fonte inesauribile e pulita di energia rinnovabile.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sci-s3-7',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascuna grandezza fisica alla sua unità di misura nel Sistema Internazionale (SI).',
      leftItems: ['Massa', 'Forza', 'Tempo'],
      rightItems: ['Chilogrammo (kg)', 'Newton (N)', 'Secondo (s)'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Pensa alle unità standard usate negli esperimenti scientifici.',
      explanation: 'Massa: chilogrammo (kg); Forza: Newton (N); Tempo: secondo (s).'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-m1',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni senso al suo organo corrispondente.',
      leftItems: ['Vista', 'Udito', 'Olfatto'],
      rightItems: ['Occhi', 'Orecchie', 'Naso'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Con gli occhi guardiamo, con le orecchie ascoltiamo, con il naso annusiamo.',
      explanation: 'Occhi = vista, orecchie = udito, naso = olfatto.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-sci-s1-m1',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun organulo della cellula alla sua funzione vitale.',
      leftItems: ['Nucleo', 'Mitocondrio', 'Cloroplasto'],
      rightItems: ['Custodisce il DNA', 'Produce energia chimica', 'Fotosintesi (nelle piante)'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Il nucleo contiene il genoma, il mitocondrio compie la respirazione cellulare.',
      explanation: 'Nucleo: DNA; Mitocondrio: energia; Cloroplasto: fotosintesi.'
    }
  },
  {
    years: ['S3'],
    round: {
      id: 'qb-sci-s3-m1',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun concetto di biologia e fisica alla sua definizione.',
      leftItems: ['DNA', 'Gene', 'Ampere'],
      rightItems: ['Doppia elica ereditaria', 'Tratto di DNA per un carattere', 'Unità di misura corrente elettrica'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Il DNA custodisce l\'informazione genetica; l\'Ampere misura l\'intensità di corrente.',
      explanation: 'DNA: molecola ereditaria; Gene: singola istruzione; Ampere: corrente elettrica.'
    }
  },

  // ── Integrazione percorsi: Primaria 1ª – 2ª (P1, P2) ──────────────
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-ext-1',
      type: 'quiz',
      prompt: 'Quale tra questi è un essere vivente?',
      options: [
        { label: 'Una pianta', correct: true },
        { label: 'Un sasso', correct: false },
        { label: 'Una nuvola', correct: false },
        { label: 'Una matita', correct: false }
      ],
      hint: 'Gli esseri viventi nascono, crescono, respirano e si riproducono.',
      explanation: 'La pianta nasce, cresce, si nutre ed è un essere vivente.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-ext-2',
      type: 'image',
      icon: 'sole',
      prompt: 'Cosa ci dona il Sole?',
      options: [
        { label: 'Luce e calore', correct: true },
        { label: 'Pioggia e neve', correct: false },
        { label: 'Vento e buio', correct: false }
      ],
      hint: 'È la nostra stella e riscalda la Terra.',
      explanation: 'Il Sole è la fonte primaria di luce e calore.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-ext-3',
      type: 'quiz',
      prompt: 'Quale organo usiamo per il senso della vista?',
      options: [
        { label: 'Gli occhi', correct: true },
        { label: 'Le orecchie', correct: false },
        { label: 'Il naso', correct: false },
        { label: 'Le mani', correct: false }
      ],
      hint: 'Ci permettono di vedere colori e forme.',
      explanation: 'Gli occhi sono l\'organo della vista.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-ext-4',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Tocca le quattro stagioni nell\'ordine corretto.',
      items: ['Primavera', 'Estate', 'Autunno', 'Inverno'],
      hint: 'Dopo l\'inverno sbocciano i fiori in primavera, poi arriva l\'estate calda.',
      explanation: 'Il ciclo annuale: Primavera → Estate → Autunno → Inverno.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-ext-5',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun senso al suo organo principale.',
      leftItems: ['Vista', 'Udito', 'Olfatto'],
      rightItems: ['Naso', 'Occhi', 'Orecchie'],
      pairs: [[0, 1], [1, 2], [2, 0]],
      hint: 'Con cosa vedi, senti e annusi?',
      explanation: 'Vista ↔ Occhi; Udito ↔ Orecchie; Olfatto ↔ Naso.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-ext-6',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni animale al suo ambiente naturale.',
      leftItems: ['Pesce', 'Uccello', 'Orso'],
      rightItems: ['Cielo e rami', 'Bosco e montagna', 'Acqua e mare'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Dove vive ciascun animale?',
      explanation: 'Pesce ↔ Acqua; Uccello ↔ Cielo/rami; Orso ↔ Bosco/montagna.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sci-p1-ext-7',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina le fasi di crescita di una pianta.',
      sortItems: ['Seme', 'Germoglio', 'Piantina con foglie', 'Fiore sbocciato'],
      hint: 'Tutto comincia piantando il seme nella terra.',
      explanation: 'Seme → Germoglio → Piantina → Fiore.'
    }
  },
  // ── Integrazione percorsi: Primaria 3ª – 5ª (P3, P4, P5) ──────────
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sci-p3-ext-1',
      type: 'quiz',
      prompt: 'In quale stato si trova l\'acqua quando diventa ghiaccio?',
      options: [
        { label: 'Stato solido', correct: true },
        { label: 'Stato liquido', correct: false },
        { label: 'Stato gassoso', correct: false }
      ],
      hint: 'Il ghiaccio ha forma e volume propri.',
      explanation: 'Il ghiaccio è acqua allo stato solido.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sci-p3-ext-2',
      type: 'quiz',
      prompt: 'Come si chiama il processo con cui le piante verdi producono il proprio nutrimento?',
      options: [
        { label: 'Fotosintesi clorofilliana', correct: true },
        { label: 'Respirazione polmonare', correct: false },
        { label: 'Evaporazione', correct: false },
        { label: 'Digestione', correct: false }
      ],
      hint: 'Utilizza la luce solare, acqua e anidride carbonica.',
      explanation: 'Le piante compiono la fotosintesi clorofilliana.'
    }
  },
  {
    years: ['P3', 'P4', 'P5'],
    round: {
      id: 'qb-sci-p3-ext-3',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun elemento al suo stato della materia a temperatura ambiente.',
      leftItems: ['Vapore acqueo', 'Olio', 'Ferro'],
      rightItems: ['Liquido', 'Gassoso', 'Solido'],
      pairs: [[0, 1], [1, 0], [2, 2]],
      hint: 'Vapore è gas, olio è liquido, ferro è solido.',
      explanation: 'Vapore = Gassoso; Olio = Liquido; Ferro = Solido.'
    }
  },
  {
    years: ['P3', 'P4', 'P5'],
    round: {
      id: 'qb-sci-p3-ext-4',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina gli anelli di una semplice catena alimentare dal primo all\'ultimo.',
      sortItems: ['Erba (produttore)', 'Cavalletta (erbivoro)', 'Rana (carnivoro)', 'Falco (predatore)'],
      hint: 'La pianta produce nutrimento, l\'insetto la mangia, la rana mangia l\'insetto.',
      explanation: 'Erba → Cavalletta → Rana → Falco.'
    }
  },
  {
    years: ['P4', 'P5', 'S1'],
    round: {
      id: 'qb-sci-p4-ext-1',
      type: 'quiz',
      prompt: 'Qual è il pianeta più vicino al Sole nel nostro sistema solare?',
      options: [
        { label: 'Mercurio', correct: true },
        { label: 'Venere', correct: false },
        { label: 'Terra', correct: false },
        { label: 'Marte', correct: false }
      ],
      hint: 'È piccolo, roccioso e precede Venere.',
      explanation: 'Mercurio è il primo pianeta dal Sole.'
    }
  },
  {
    years: ['P4', 'P5', 'S1'],
    round: {
      id: 'qb-sci-p4-ext-2',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni parte del corpo al suo apparato.',
      leftItems: ['Cuore', 'Polmoni', 'Stomaco'],
      rightItems: ['Respiratorio', 'Digerente', 'Circolatorio'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Il cuore pompa il sangue, i polmoni ossigenano, lo stomaco digerisce.',
      explanation: 'Cuore = Circolatorio; Polmoni = Respiratorio; Stomaco = Digerente.'
    }
  },
  // ── Integrazione percorsi: Secondaria 1ª – 3ª (S1, S2, S3) ─────────
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-sci-s1-ext-1',
      type: 'quiz',
      prompt: 'Qual è la struttura cellulare che racchiude il materiale genetico (DNA)?',
      options: [
        { label: 'Il nucleo', correct: true },
        { label: 'La membrana plasmatica', correct: false },
        { label: 'Il citoplasma', correct: false },
        { label: 'Il ribosoma', correct: false }
      ],
      hint: 'È la centrale di controllo della cellula eucariote.',
      explanation: 'Il nucleo contiene il DNA nella cellula.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-sci-s1-ext-2',
      type: 'quiz',
      prompt: 'Quale tra queste è una fonte di energia rinnovabile e inesauribile?',
      options: [
        { label: 'Energia solare', correct: true },
        { label: 'Carbone fossile', correct: false },
        { label: 'Petrolio greggio', correct: false },
        { label: 'Gas naturale', correct: false }
      ],
      hint: 'Sfrutta direttamente i raggi del Sole.',
      explanation: 'L\'energia solare non produce scorie e si rigenera costantemente.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-sci-s1-ext-3',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni elemento della cellula alla sua funzione principale.',
      leftItems: ['Nucleo', 'Mitocondrio', 'Membrana'],
      rightItems: ['Centrale energetica (respirazione)', 'Barriera e scambio con l\'esterno', 'Custodia del patrimonio genetico'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Il nucleo custodisce il DNA, il mitocondrio produce ATP, la membrana protegge.',
      explanation: 'Nucleo ↔ DNA; Mitocondrio ↔ Energia; Membrana ↔ Barriera.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-sci-s1-ext-4',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina i primi quattro pianeti del sistema solare per distanza crescente dal Sole.',
      sortItems: ['Mercurio', 'Venere', 'Terra', 'Marte'],
      hint: 'La Terra è al terzo posto.',
      explanation: 'Mercurio → Venere → Terra → Marte.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sci-s3-ext-1',
      type: 'quiz',
      prompt: 'In genetica, come viene definito l\'insieme dei caratteri visibili di un individuo?',
      options: [
        { label: 'Fenotipo', correct: true },
        { label: 'Genotipo', correct: false },
        { label: 'Cariotipo', correct: false },
        { label: 'Gamete', correct: false }
      ],
      hint: 'Il genotipo è il codice genetico; il fenotipo è l\'aspetto manifestato.',
      explanation: 'Il fenotipo rappresenta i caratteri osservabili determinati da geni e ambiente.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sci-s3-ext-2',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni grandezza fisica alla sua unità di misura nel Sistema Internazionale.',
      leftItems: ['Forza', 'Lavoro ed Energia', 'Potenza'],
      rightItems: ['Joule (J)', 'Watt (W)', 'Newton (N)'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'La forza si misura in Newton, l\'energia in Joule, la potenza in Watt.',
      explanation: 'Forza ↔ Newton; Energia ↔ Joule; Potenza ↔ Watt.'
    }
  },


    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e1",
        type: "quiz",
        prompt: "Quale organo di senso usiamo per ascoltare i suoni e la musica?",
        options: [
          { label: "Le orecchie (udito)", correct: true },
          { label: "Gli occhi (vista)", correct: false },
          { label: "La lingua (gusto)", correct: false }
        ],
        hint: "Ci permettono di sentire la voce degli amici.",
        explanation: "Le orecchie sono gli organi dell'udito."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e2",
        type: "quiz",
        prompt: "Quale tra questi è un ESSERE VIVENTE (nasce, cresce, si nutre, si riproduce e muore)?",
        options: [
          { label: "Una piantina di fragole", correct: true },
          { label: "Un sasso di fiume", correct: false },
          { label: "Una matita di legno", correct: false }
        ],
        hint: "Ha bisogno di acqua, terra e luce per crescere.",
        explanation: "Le piante sono esseri viventi perché compiono il ciclo vitale."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e3",
        type: "quiz",
        prompt: "Quale parte della pianta si trova sotto terra per assorbire acqua e nutrimento?",
        options: [
          { label: "Le radici", correct: true },
          { label: "Le foglie", correct: false },
          { label: "I fiori", correct: false }
        ],
        hint: "Tengono l'albero saldo al terreno.",
        explanation: "Le radici ancorano la pianta al suolo e assorbono acqua e sali minerali."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e4",
        type: "quiz",
        prompt: "Quale organo di senso ci permette di sentire se un oggetto è liscio, ruvido, caldo o freddo?",
        options: [
          { label: "La pelle (tatto)", correct: true },
          { label: "Il naso (olfatto)", correct: false },
          { label: "Gli occhi (vista)", correct: false }
        ],
        hint: "Lo sentiamo toccando con le dita e con le mani.",
        explanation: "Il tatto ha come organo diffuso la pelle di tutto il corpo."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e5",
        type: "quiz",
        prompt: "Cosa appare nel cielo durante il giorno e dona luce e calore alla Terra?",
        options: [
          { label: "Il Sole", correct: true },
          { label: "La Luna", correct: false },
          { label: "Le stelle cadenti", correct: false }
        ],
        hint: "È una stella luminosissima e gialla.",
        explanation: "Il Sole è la stella che illumina e riscalda il nostro pianeta di giorno."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e6",
        type: "quiz",
        prompt: "Quale animale si muove nell'acqua usando le pinne e respira con le branchie?",
        options: [
          { label: "Il pesce", correct: true },
          { label: "Il gatto", correct: false },
          { label: "Il cane", correct: false }
        ],
        hint: "Vive nei mari, nei fiumi e nei laghi.",
        explanation: "I pesci sono animali acquatici dotati di pinne per nuotare e branchie per respirare sott'acqua."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni senso al rispettivo organo del corpo umano.",
        leftItems: ["Vista", "Olfatto", "Gusto"],
        rightItems: ["Occhi", "Naso", "Lingua"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Collega la funzione all'organo che la compie.",
        explanation: "Gli occhi vedono, il naso annusa gli odori, la lingua sente i sapori."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e8",
        type: "quiz",
        prompt: "Quale tra queste è una caratteristica degli esseri NON VIVENTI?",
        options: [
          { label: "Non respirano e non hanno bisogno di cibo", correct: true },
          { label: "Crescono se mangiano molto", correct: false },
          { label: "Hanno cuccioli", correct: false }
        ],
        hint: "Pensa a un mattone o a un sasso.",
        explanation: "I non viventi non hanno cellule, non respirano e non si nutrono."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e9",
        type: "quiz",
        prompt: "Quale parte della pianta cattura la luce del sole e fa respirare la pianta?",
        options: [
          { label: "Le foglie", correct: true },
          { label: "Il tronco", correct: false },
          { label: "Le radici", correct: false }
        ],
        hint: "Di solito sono verdi e cadono in autunno.",
        explanation: "Le foglie sono i laboratori verdi della pianta per assorbire luce solare e anidride carbonica."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e10",
        type: "quiz",
        prompt: "Cosa accade all'acqua se la metti nel congelatore per alcune ore?",
        options: [
          { label: "Diventa ghiaccio solido", correct: true },
          { label: "Evapora e scompare", correct: false },
          { label: "Diventa bollente", correct: false }
        ],
        hint: "Con il freddo intenso l'acqua liquida gela.",
        explanation: "Sotto gli 0 °C l'acqua liquida solidifica diventando ghiaccio."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e11",
        type: "quiz",
        prompt: "Come si muove l'uccello nel cielo?",
        options: [
          { label: "Vola usando le ali", correct: true },
          { label: "Striscia sulla terra", correct: false },
          { label: "Nuota con le pinne", correct: false }
        ],
        hint: "Ha piume e ali leggere per volare.",
        explanation: "Gli uccelli hanno scheletro leggero e ali per il volo."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i momenti della giornata dal mattino alla notte.",
        sortItems: ["Alba (sorge il sole)", "Mezzogiorno (pranzo)", "Tramonto (il sole cala)", "Notte (buio con la luna)"],
        hint: "Dall'inizio del giorno fino al sonno.",
        explanation: "Ciclo giornaliero di luce e buio: alba -> mezzogiorno -> tramonto -> notte."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e13",
        type: "quiz",
        prompt: "Quale sapore sentiamo quando mangiamo una caramella o beviamo una bibita zuccherata?",
        options: [
          { label: "Dolce", correct: true },
          { label: "Salato", correct: false },
          { label: "Amaro", correct: false }
        ],
        hint: "È il sapore del miele e dello zucchero.",
        explanation: "Le papille gustative della lingua riconoscono il sapore dolce dello zucchero."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e14",
        type: "quiz",
        prompt: "In quale stagione dell'anno fa più caldo e si va in vacanza al mare?",
        options: [
          { label: "Estate", correct: true },
          { label: "Inverno", correct: false },
          { label: "Autunno", correct: false }
        ],
        hint: "C'è tanto sole e le giornate sono lunghissime.",
        explanation: "L'estate è la stagione più calda dell'anno."
      }
    },

    {
      years: ["P1"],
      round: {
        id: "qb-sci-p1-e15",
        type: "quiz",
        prompt: "Cosa serve a una pianta per vivere e crescere sana?",
        options: [
          { label: "Luce del sole, acqua e terra", correct: true },
          { label: "Solo buio e freddo", correct: false },
          { label: "Caramelle e succhi", correct: false }
        ],
        hint: "Se la metti al buio e senza bagnarla, la pianta muore.",
        explanation: "Le piante hanno bisogno di luce solare, acqua, sali minerali e aria per sopravvivere."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e1",
        type: "quiz",
        prompt: "Come si chiama un animale che si nutre SOLO di erba, foglie, frutti e piante?",
        options: [
          { label: "Erbivoro", correct: true },
          { label: "Carnivoro", correct: false },
          { label: "Onnivoro", correct: false }
        ],
        hint: "Come la mucca, il cavallo o la pecora.",
        explanation: "Gli erbivori si nutrono esclusivamente di sostanze vegetali."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e2",
        type: "quiz",
        prompt: "Come nascono i cuccioli degli animali OVIPARI (come la gallina o la lucertola)?",
        options: [
          { label: "Dalle uova deposte dalla madre", correct: true },
          { label: "Direttamente dalla pancia della mamma già formati", correct: false },
          { label: "Spuntano dal terreno come i funghi", correct: false }
        ],
        hint: "'Ovo' in latino significa uovo.",
        explanation: "Gli ovipari si riproducono deponendo uova che poi si schiudono."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e3",
        type: "quiz",
        prompt: "Quali sono i TRE stati in cui può trovarsi l'acqua in natura?",
        options: [
          { label: "Solido (ghiaccio), Liquido (acqua), Gassoso (vapore)", correct: true },
          { label: "Caldo, Freddo, Tiepido", correct: false },
          { label: "Fiume, Mare, Lago", correct: false }
        ],
        hint: "Pensa a un cubetto di ghiaccio, all'acqua del rubinetto e al vapore della pentola.",
        explanation: "I tre stati fisici della materia per l'acqua sono solido, liquido e gassoso."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e4",
        type: "quiz",
        prompt: "Come si chiama la trasformazione straordinaria del bruco che diventa crisalide e poi farfalla?",
        options: [
          { label: "Metamorfosi", correct: true },
          { label: "Fotosintesi", correct: false },
          { label: "Letargo", correct: false }
        ],
        hint: "Parola di origine greca che significa 'cambiamento di forma'.",
        explanation: "La metamorfosi è la trasformazione biologica radicale di insetti e anfibi."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e5",
        type: "quiz",
        prompt: "Cosa fanno alcuni animali (come l'orso o il ghiro) per superare il freddo e la mancanza di cibo in inverno?",
        options: [
          { label: "Vanno in letargo (un lungo sonno invernale)", correct: true },
          { label: "Accendono il camino", correct: false },
          { label: "Fanno una grande festa nella tana", correct: false }
        ],
        hint: "Riducono il battito cardiaco e dormono per mesi nella tana.",
        explanation: "Il letargo è un adattamento fisiologico per sopravvivere alla stagione rigida."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e6",
        type: "quiz",
        prompt: "Quale insetto laborioso vola di fiore in fiore trasportando il polline e producendo miele?",
        options: [
          { label: "L'ape", correct: true },
          { label: "La zanzara", correct: false },
          { label: "La mosca", correct: false }
        ],
        hint: "Vive nell'alveare ed è un prezioso impollinatore.",
        explanation: "L'ape raccoglie nettare e polline, favorendo la fecondazione delle piante (impollinazione)."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni tipo di alimentazione all'animale corrispondente.",
        leftItems: ["Erbivoro (erba e foglie)", "Carnivoro (carne)", "Onnivoro (carne e vegetali)"],
        rightItems: ["Mucca", "Leone", "Orso (e l'uomo)"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Guarda la dieta abituale di questi animali.",
        explanation: "La mucca mangia erba, il leone caccia prede, l'orso mangia pesci, bacche e radici."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e8",
        type: "quiz",
        prompt: "Come si chiama il passaggio dell'acqua da LIQUIDA a VAPORE quando bolle sul fuoco?",
        options: [
          { label: "Evaporazione (o ebollizione)", correct: true },
          { label: "Solidificazione", correct: false },
          { label: "Fusione", correct: false }
        ],
        hint: "L'acqua sale verso l'alto sotto forma di vapore trasparente.",
        explanation: "Con il calore l'acqua evapora passando dallo stato liquido a quello gassoso."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e9",
        type: "quiz",
        prompt: "Quale parte colorata del fiore attira gli insetti impollinatori?",
        options: [
          { label: "I petali (corolla)", correct: true },
          { label: "Le radici", correct: false },
          { label: "I rami", correct: false }
        ],
        hint: "Sono vivacemente colorati e profumati.",
        explanation: "I petali formano la corolla del fiore per attrarre api, farfalle e bombi."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e10",
        type: "quiz",
        prompt: "Da cosa nascono i pulcini?",
        options: [
          { label: "Dalle uova covate dalla chioccia", correct: true },
          { label: "Dalla pancia del gallo", correct: false },
          { label: "Dalla terra bagnata", correct: false }
        ],
        hint: "La gallina cova l'uovo per circa 21 giorni.",
        explanation: "Gli uccelli sono ovipari: il pulcino si sviluppa dentro l'uovo e poi rompe il guscio."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e11",
        type: "quiz",
        prompt: "In quale stagione gli alberi a foglie caduche perdono le foglie ingiallite?",
        options: [
          { label: "Autunno", correct: true },
          { label: "Primavera", correct: false },
          { label: "Estate", correct: false }
        ],
        hint: "La stagione delle castagne, delle zucche e dei funghi.",
        explanation: "In autunno la clorofilla cala, le foglie diventano rosse/gialle e cadono."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina le quattro stagioni dell'anno partendo dalla rinascita della natura.",
        sortItems: ["Primavera (fiori e gemme)", "Estate (caldo e mare)", "Autunno (foglie e pioggia)", "Inverno (freddo e neve)"],
        hint: "La sequenza ciclica delle 4 stagioni.",
        explanation: "Primavera -> Estate -> Autunno -> Inverno."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e13",
        type: "quiz",
        prompt: "Cosa c'è all'interno di un frutto che permette di far nascere una nuova pianta?",
        options: [
          { label: "Il seme", correct: true },
          { label: "La foglia", correct: false },
          { label: "Il ramo", correct: false }
        ],
        hint: "Se lo pianti nel terreno e lo innaffi germoglia.",
        explanation: "Il seme custodisce l'embrione della futura piantina."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e14",
        type: "quiz",
        prompt: "Come si chiama un animale che mangia sia vegetali sia carne (come l'uomo, il maiale o l'orso)?",
        options: [
          { label: "Onnivoro", correct: true },
          { label: "Erbivoro", correct: false },
          { label: "Carnivoro", correct: false }
        ],
        hint: "'Omni' significa 'tutto'. Mangia di tutto.",
        explanation: "Gli onnivori hanno un apparato digerente in grado di assimilare sia carne sia vegetali."
      }
    },

    {
      years: ["P2"],
      round: {
        id: "qb-sci-p2-e15",
        type: "quiz",
        prompt: "Quando un cubetto di ghiaccio si scioglie al sole diventando acqua liquida, quale fenomeno avviene?",
        options: [
          { label: "Fusione", correct: true },
          { label: "Solidificazione", correct: false },
          { label: "Condensazione", correct: false }
        ],
        hint: "Il calore fonde il solido trasformandolo in liquido.",
        explanation: "Il passaggio dallo stato solido allo stato liquido è la fusione."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e1",
        type: "quiz",
        prompt: "Come si chiama il processo con cui le piante verdi usano la luce del sole, l'acqua e l'anidride carbonica per produrre cibo e liberare OSSIGENO?",
        options: [
          { label: "Fotosintesi clorofilliana", correct: true },
          { label: "Metamorfosi", correct: false },
          { label: "Ebollizione", correct: false }
        ],
        hint: "Avviene grazie alla clorofilla presente nelle foglie.",
        explanation: "La fotosintesi produce glucosio per la pianta e rilascia ossigeno nell'atmosfera."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e2",
        type: "quiz",
        prompt: "Quale grande caratteristica distingue gli animali VERTEBRATI dagli invertebrati?",
        options: [
          { label: "I vertebrati possiedono uno scheletro interno con la colonna vertebrale", correct: true },
          { label: "I vertebrati hanno le ali per volare", correct: false },
          { label: "I vertebrati vivono solo nell'acqua", correct: false }
        ],
        hint: "Hanno le ossa e la colonna vertebrale all'interno del corpo.",
        explanation: "I vertebrati hanno uno scheletro osseo o cartilagineo interno con colonna vertebrale."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e3",
        type: "quiz",
        prompt: "Nel ciclo dell'acqua, cosa accade quando il vapore acqueo sale in alto, si raffredda e forma minuscole goccioline?",
        options: [
          { label: "Si condensa e forma le nuvole", correct: true },
          { label: "Evapora nello spazio cosmico", correct: false },
          { label: "Diventa lava rovente", correct: false }
        ],
        hint: "Il vapore gassoso torna liquido: condensazione.",
        explanation: "La condensazione del vapore acqueo nell'atmosfera fredda genera le nuvole e la nebbia."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e4",
        type: "quiz",
        prompt: "Come si chiama lo strato superficiale e fertile del terreno, scuro e ricco di resti organici decomposti?",
        options: [
          { label: "Humus", correct: true },
          { label: "Roccia madre", correct: false },
          { label: "Ghiaia pura", correct: false }
        ],
        hint: "È fondamentale per la crescita delle piante nell'orto.",
        explanation: "L'humus è la parte organica più fertile del terreno agrario."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e5",
        type: "quiz",
        prompt: "Quale gas indispensabile per la nostra respirazione viene liberato dalle piante durante il giorno?",
        options: [
          { label: "Ossigeno", correct: true },
          { label: "Anidride carbonica", correct: false },
          { label: "Azoto", correct: false }
        ],
        hint: "È il gas vitale che respirano gli esseri umani e gli animali.",
        explanation: "Con la fotosintesi le piante emettono ossigeno puro nell'aria."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e6",
        type: "quiz",
        prompt: "A quale gruppo di vertebrati appartengono la rana e il rospo, che vivono sia in acqua sia sulla terraferma?",
        options: [
          { label: "Anfibi", correct: true },
          { label: "Rettili", correct: false },
          { label: "Mammiferi", correct: false }
        ],
        hint: "'Anfi' significa 'doppio': hanno una doppia vita in acqua e su terra.",
        explanation: "Gli anfibi nascono in acqua come girini con branchie e da adulti respirano coi polmoni sulla terra."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni classe di vertebrati alla rispettiva caratteristica corporea.",
        leftItems: ["Uccelli", "Pesci", "Mammiferi"],
        rightItems: ["Piume, penne e becco", "Scaglie e pinne", "Peli e allattano i piccoli"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Guarda il rivestimento esterno del corpo.",
        explanation: "Caratteristiche morfologiche distintive delle classi dei vertebrati."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e8",
        type: "quiz",
        prompt: "Quale tra questi animali è un INVERTEBRATO (non ha colonna vertebrale)?",
        options: [
          { label: "La chiocciola (lumaca con guscio)", correct: true },
          { label: "Il cane", correct: false },
          { label: "Il passero", correct: false }
        ],
        hint: "Ha un corpo molle protetto da un guscio calcareo.",
        explanation: "I molluschi (come la chiocciola e il polpo) sono invertebrati privi di ossa."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e9",
        type: "quiz",
        prompt: "Come si chiama l'involucro d'aria invisibile che avvolge e protegge l'intero pianeta Terra?",
        options: [
          { label: "Atmosfera", correct: true },
          { label: "Idrosfera", correct: false },
          { label: "Litosfera", correct: false }
        ],
        hint: "Contiene l'aria che respiriamo e fa da scudo ai raggi solari nocivi.",
        explanation: "L'atmosfera è lo strato di gas trattenuto dalla gravità terrestre."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e10",
        type: "quiz",
        prompt: "Perché le lucertole e i serpenti si scaldano spesso al sole sulle rocce calde?",
        options: [
          { label: "Perché sono animali a sangue freddo (eterotermi)", correct: true },
          { label: "Perché non sanno nuotare", correct: false },
          { label: "Perché mangiano la luce del sole", correct: false }
        ],
        hint: "La loro temperatura corporea dipende dalla temperatura dell'ambiente esterno.",
        explanation: "I rettili sono eterotermi: la temperatura del loro corpo varia con l'ambiente."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e11",
        type: "quiz",
        prompt: "Qual è il pigmento verde all'interno delle foglie che cattura l'energia solare?",
        options: [
          { label: "La clorofilla", correct: true },
          { label: "L'ossigeno", correct: false },
          { label: "La resina", correct: false }
        ],
        hint: "Dona alle foglie il loro colore verde brillante.",
        explanation: "La clorofilla è la sostanza fotosintetica che assorbe la luce solare."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina le fasi del CICLO DELL'ACQUA in natura partendo dal mare riscaldato dal sole.",
        sortItems: ["Evaporazione (l'acqua sale come vapore)", "Condensazione (si formano le nuvole)", "Precipitazione (pioggia o neve)", "Ritorno (i fiumi scorrono al mare)"],
        hint: "Il viaggio senza fine della gocciolina d'acqua.",
        explanation: "Evaporazione -> Condensazione -> Precipitazione -> Ritorno e infiltrazione."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e13",
        type: "quiz",
        prompt: "Quale tipo di terreno lascia passare l'acqua molto velocemente senza trattenerla (molto permeabile)?",
        options: [
          { label: "Il terreno sabbioso", correct: true },
          { label: "Il terreno argilloso", correct: false },
          { label: "Il terreno roccioso compatto", correct: false }
        ],
        hint: "Pensa a cosa succede quando versi un secchiello d'acqua sulla sabbia in spiaggia.",
        explanation: "La sabbia ha grani grossi con ampi spazi vuoti, quindi è molto permeabile all'acqua."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e14",
        type: "quiz",
        prompt: "Quale animale tra questi è un MAMMIFERO che vive nel mare e allatta il suo piccolo sott'acqua?",
        options: [
          { label: "Il delfino", correct: true },
          { label: "Lo squalo (pesce cartilagineo)", correct: false },
          { label: "Il tonno", correct: false }
        ],
        hint: "Respira con i polmoni e deve salire in superficie a prendere aria dallo sfiatatoio.",
        explanation: "I cetacei (delfini e balene) sono mammiferi marini: respirano aria e allattano i piccoli."
      }
    },

    {
      years: ["P3"],
      round: {
        id: "qb-sci-p3-e15",
        type: "quiz",
        prompt: "Come si chiamano i piccoli fori microscopici sulle foglie attraverso cui la pianta scambia i gas dell'aria?",
        options: [
          { label: "Stomi", correct: true },
          { label: "Pori ossei", correct: false },
          { label: "Branchie", correct: false }
        ],
        hint: "Si aprono e si chiudono sulla pagina inferiore della foglia.",
        explanation: "Gli stomi consentono la traspirazione e lo scambio gassoso di ossigeno e anidride carbonica."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e1",
        type: "quiz",
        prompt: "In una catena alimentare, chi sono i PRODUTTORI (quelli che fabbricano da soli il proprio nutrimento)?",
        options: [
          { label: "I vegetali e le piante verdi (autotrofi)", correct: true },
          { label: "Gli erbivori", correct: false },
          { label: "I predatori carnivori", correct: false }
        ],
        hint: "Stanno sempre alla base della piramide ecologica.",
        explanation: "Le piante sono organismi produttori perché producono materia organica tramite fotosintesi."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e2",
        type: "quiz",
        prompt: "Qual è la differenza fondamentale tra CALORE e TEMPERATURA?",
        options: [
          { label: "Il calore è una forma di energia termica; la temperatura è la misura di quanto un corpo è caldo", correct: true },
          { label: "Sono esattamente la stessa identica cosa", correct: false },
          { label: "La temperatura è il combustibile, il calore è il termometro", correct: false }
        ],
        hint: "Il calore si trasferisce da un corpo caldo a uno freddo; la temperatura si misura in gradi Celsius (°C).",
        explanation: "Il calore è energia termica in transito; la temperatura misura l'agitazione termica delle molecole."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e3",
        type: "quiz",
        prompt: "Come si chiama il passaggio di stato diretto da GAS a LIQUIDO (es. il vapore acqueo che forma le gocce sul coperchio freddo)?",
        options: [
          { label: "Condensazione", correct: true },
          { label: "Evaporazione", correct: false },
          { label: "Sublimazione", correct: false }
        ],
        hint: "Il gas cede calore e ritorna liquido.",
        explanation: "La condensazione è il passaggio di stato dalla fase gassosa alla fase liquida."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e4",
        type: "quiz",
        prompt: "In un ecosistema, che ruolo svolgono i DECOMPOSITORI (come batteri, funghi e lombrichi)?",
        options: [
          { label: "Scompongono resti di piante e animali morti trasformandoli in sali minerali per il suolo", correct: true },
          { label: "Cacciano i grandi predatori", correct: false },
          { label: "Fanno ombra alle piante", correct: false }
        ],
        hint: "Riciclano la materia organica chiudendo il ciclo ecologico.",
        explanation: "I decompositori mineralizzano la materia organica morta, rigenerando i nutrienti del terreno."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e5",
        type: "quiz",
        prompt: "Quale tra queste piante NON fa né fiori né semi e si riproduce tramite SPORE?",
        options: [
          { label: "La felce (e i muschi)", correct: true },
          { label: "Il melo", correct: false },
          { label: "Il girasole", correct: false }
        ],
        hint: "Sono piante antichissime, già diffuse ai tempi dei dinosauri.",
        explanation: "Muschi e felci sono piante semplici prive di fiori che si riproducono mediante spore."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e6",
        type: "quiz",
        prompt: "Cosa accade alla maggior parte dei corpi e metalli quando vengono RISCALDATI?",
        options: [
          { label: "Si dilatano aumentando leggermente di volume (dilatazione termica)", correct: true },
          { label: "Si rimpiccioliscono all'istante", correct: false },
          { label: "Cambiano nome chimico", correct: false }
        ],
        hint: "Pensa alle fessure sui ponti stradali per evitare che si spacchino d'estate.",
        explanation: "Con il calore le particelle vibrano con maggiore ampiezza causando la dilatazione termica."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni passaggio di stato della materia al suo nome scientifico.",
        leftItems: ["Solido -> Liquido", "Liquido -> Solido", "Liquido -> Vapore"],
        rightItems: ["Fusione", "Solidificazione", "Evaporazione"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Pensa a cosa accade al ghiaccio e all'acqua con il calore o il freddo.",
        explanation: "I cambiamenti di stato fisico reversibili della materia dovuti a scambi di calore."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e8",
        type: "quiz",
        prompt: "I FUNGHI sono considerati un regno a parte rispetto alle piante perché...",
        options: [
          { label: "Non compiono la fotosintesi (non hanno clorofilla) e assorbono nutrimento dall'esterno", correct: true },
          { label: "Hanno le ali e volano di notte", correct: false },
          { label: "Vivono solo nell'acqua marina salata", correct: false }
        ],
        hint: "Sono eterotrofi, a differenza delle piante autotrofe.",
        explanation: "I funghi costituiscono un regno autonomo perché eterotrofi e privi di clorofilla."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e9",
        type: "quiz",
        prompt: "Quale gas compone la maggior parte dell'aria che respiriamo (circa il 78%)?",
        options: [
          { label: "Azoto", correct: true },
          { label: "Ossigeno (circa 21%)", correct: false },
          { label: "Anidride carbonica", correct: false }
        ],
        hint: "L'ossigeno è fondamentale, ma l'azoto è il gas più abbondante nell'aria.",
        explanation: "L'aria è una miscela composta per il 78% da azoto, 21% da ossigeno e 1% da altri gas."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e10",
        type: "quiz",
        prompt: "Che cos'è la DENSITÀ di un corpo?",
        options: [
          { label: "Il rapporto tra la sua massa e il volume che occupa (Massa / Volume)", correct: true },
          { label: "Il colore esteriore dell'oggetto", correct: false },
          { label: "La temperatura misurata dal termometro", correct: false }
        ],
        hint: "Spiega perché un pezzo di ferro affonda nell'acqua mentre un tronco di legno galleggia.",
        explanation: "La densità (d = m / V) determina la concentrazione di massa nello spazio occupato."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e11",
        type: "quiz",
        prompt: "Come si chiamano gli alberi come il pino e l'abete, che producono pigne con semi non racchiusi in un vero frutto?",
        options: [
          { label: "Gimnosperme (conifere)", correct: true },
          { label: "Angiosperme", correct: false },
          { label: "Muschi", correct: false }
        ],
        hint: "'Gimnosperma' significa 'seme nudo': i semi stanno tra le scaglie della pigna.",
        explanation: "Le conifere appartengono alle gimnosperme, piante con semi scoperti raccolti in strobili."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina gli anelli di una catena alimentare boschiva dal livello base al predatore finale.",
        sortItems: ["Erba e piante (produttori)", "Lepre (consumatore primario erbivoro)", "Volpe (consumatore secondario carnivoro)", "Batteri (decompositori del suolo)"],
        hint: "Segui il flusso dell'energia alimentare.",
        explanation: "Pianta (fotosintesi) -> erbivoro -> carnivoro -> decompositori."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e13",
        type: "quiz",
        prompt: "Come si chiama lo strumento usato per misurare la temperatura di un corpo o dell'ambiente?",
        options: [
          { label: "Termometro", correct: true },
          { label: "Barometro", correct: false },
          { label: "Bilancia", correct: false }
        ],
        hint: "'Termo' si riferisce al calore, 'metro' alla misurazione.",
        explanation: "Il termometro misura la temperatura basandosi sulla dilatazione di liquidi o sensori digitali."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e14",
        type: "quiz",
        prompt: "Quale tra questi materiali è un OTTIMO conduttore termico (trasmette molto rapidamente il calore)?",
        options: [
          { label: "Il rame (o i metalli in generale)", correct: true },
          { label: "Il legno", correct: false },
          { label: "Il sughero", correct: false }
        ],
        hint: "Per questo le pentole sono fatte di metallo e i mestoli di legno.",
        explanation: "I metalli hanno elettroni liberi e sono eccellenti conduttori di calore ed elettricità."
      }
    },

    {
      years: ["P4"],
      round: {
        id: "qb-sci-p4-e15",
        type: "quiz",
        prompt: "In ecologia, che cos'è l'HABITAT di una specie animale o vegetale?",
        options: [
          { label: "Il luogo naturale con le condizioni ambientali ideali in cui una specie vive e prospera", correct: true },
          { label: "Lo zoo in cui gli animali sono in gabbia", correct: false },
          { label: "La temperatura della pelle", correct: false }
        ],
        hint: "È la 'casa' naturale di una specie (es. lo stagno per la rana, la banchisa per l'orso polare).",
        explanation: "L'habitat è l'ambiente ecologico che offre a una popolazione le risorse necessarie per vivere."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e1",
        type: "quiz",
        prompt: "Qual è il muscolo involontario fondamentale che pompa ininterrottamente il sangue in tutto il corpo umano?",
        options: [
          { label: "Il cuore", correct: true },
          { label: "Il fegato", correct: false },
          { label: "Lo stomaco", correct: false }
        ],
        hint: "Batte circa 70 volte al minuto e si trova nel torace.",
        explanation: "Il cuore è una pompa muscolare cava (miocardio) che garantisce la circolazione sanguigna."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e2",
        type: "quiz",
        prompt: "Quanto tempo impiega la Terra a compiere un giro completo su se stessa (moto di ROTAZIONE)?",
        options: [
          { label: "Circa 24 ore (un giorno, che alterna dì e notte)", correct: true },
          { label: "365 giorni (un anno)", correct: false },
          { label: "28 giorni (un mese lunare)", correct: false }
        ],
        hint: "Determina l'alternarsi del giorno e della notte.",
        explanation: "La rotazione della Terra sul proprio asse dura 24 ore ed è la causa del ciclo giorno/notte."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e3",
        type: "quiz",
        prompt: "In quale organo dell'apparato digerente avviene la maggior parte dell'assorbimento delle sostanze nutritive tramite i villi intestinali?",
        options: [
          { label: "Intestino tenue", correct: true },
          { label: "Stomaco", correct: false },
          { label: "Esofago", correct: false }
        ],
        hint: "È un lungo tubo ripiegato lungo diversi metri con pareti coperte da villi.",
        explanation: "L'intestino tenue completa la digestione chimica e assorbe i nutrienti nel sangue."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e4",
        type: "quiz",
        prompt: "Qual è il pianeta più grande del nostro Sistema Solare?",
        options: [
          { label: "Giove (gigante gassoso)", correct: true },
          { label: "Marte", correct: false },
          { label: "Saturno", correct: false }
        ],
        hint: "Ha una massa superiore a quella di tutti gli altri pianeti messi insieme.",
        explanation: "Giove è il pianeta di gran lunga più massiccio e voluminoso del Sistema Solare."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e5",
        type: "quiz",
        prompt: "Quali cellule del sangue hanno il compito fondamentale di difendere l'organismo da virus e batteri?",
        options: [
          { label: "I globuli bianchi (leucociti)", correct: true },
          { label: "I globuli rossi (eritrociti)", correct: false },
          { label: "Le piastrine", correct: false }
        ],
        hint: "Sono i soldati del sistema immunitario.",
        explanation: "I globuli bianchi identificano e neutralizzano agenti patogeni e infezioni."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e6",
        type: "quiz",
        prompt: "Cosa determina l'alternarsi delle QUATTRO STAGIONI sulla Terra?",
        options: [
          { label: "L'inclinazione dell'asse terrestre combinata con il moto di rivoluzione intorno al Sole", correct: true },
          { label: "La distanza variabile della Terra dalla Luna", correct: false },
          { label: "Il vento solare", correct: false }
        ],
        hint: "L'asse terrestre è inclinato di circa 23,5° rispetto al piano orbitale.",
        explanation: "L'asse inclinato fa sì che durante l'anno i raggi solari colpiscano i due emisferi con diversa inclinazione."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni componente del sangue alla sua funzione primaria.",
        leftItems: ["Globuli rossi", "Globuli bianchi", "Piastrine"],
        rightItems: ["Trasporto dell'ossigeno", "Difesa dalle infezioni", "Coagulazione del sangue"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "I rossi portano ossigeno con l'emoglobina, le piastrine fermano le emorragie.",
        explanation: "Le tre principali componenti corpuscolari del sangue umano."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e8",
        type: "quiz",
        prompt: "Nei polmoni, dove avvengono esattamente gli scambi respiratori gassosi tra aria e sangue?",
        options: [
          { label: "Negli alveoli polmonari", correct: true },
          { label: "Nella laringe", correct: false },
          { label: "Nella trachea", correct: false }
        ],
        hint: "Sono milioni di minuscole sacche microscopiche avvolte da capillari sanguigni.",
        explanation: "Negli alveoli polmonari l'ossigeno passa nel sangue e l'anidride carbonica passa nell'aria da espirare."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e9",
        type: "quiz",
        prompt: "Quale tra queste è una fonte di ENERGIA RINNOVABILE e pulita che non si esaurisce mai?",
        options: [
          { label: "L'energia solare ed eolica", correct: true },
          { label: "Il petrolio", correct: false },
          { label: "Il carbone fossile", correct: false }
        ],
        hint: "Sfrutta il sole, il vento e l'acqua senza emettere fumi inquinanti.",
        explanation: "Sole, vento e acqua sono fonti rinnovabili perché si rigenerano naturalmente."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e10",
        type: "quiz",
        prompt: "Come si chiamano le cellule del SISTEMA NERVOSO che trasmettono impulsi elettrici rapidissimi in tutto il corpo?",
        options: [
          { label: "Neuroni", correct: true },
          { label: "Globuli", correct: false },
          { label: "Alveoli", correct: false }
        ],
        hint: "Hanno prolungamenti chiamati dendriti e assoni.",
        explanation: "I neuroni sono le cellule specializzate nella trasmissione di segnali bioelettrici."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e11",
        type: "quiz",
        prompt: "Cosa accade durante un'ECLISSI SOLARE?",
        options: [
          { label: "La Luna si interpone esattamente tra il Sole e la Terra, proiettando la sua ombra", correct: true },
          { label: "Il Sole si spegne per qualche minuto", correct: false },
          { label: "La Terra si sposta improvvisamente dietro a Giove", correct: false }
        ],
        hint: "La Luna copre alla vista il disco solare.",
        explanation: "Nell'eclissi di Sole la Luna si trova allineata tra il Sole e la Terra, oscurando la luce solare."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i primi quattro pianeti del Sistema Solare in base alla distanza crescente dal Sole.",
        sortItems: ["Mercurio (il più vicino)", "Venere", "Terra (il pianeta blu)", "Marte (il pianeta rosso)"],
        hint: "I quattro pianeti rocciosi interni.",
        explanation: "Mercurio -> Venere -> Terra -> Marte."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e13",
        type: "quiz",
        prompt: "Quale apparato del corpo umano ha il compito di proteggere gli organi interni, sostenere il corpo e consentire il movimento insieme ai muscoli?",
        options: [
          { label: "Apparato scheletrico", correct: true },
          { label: "Apparato digerente", correct: false },
          { label: "Apparato escretore", correct: false }
        ],
        hint: "È formato da oltre 200 ossa collegate dalle articolazioni.",
        explanation: "Lo scheletro sostiene il corpo, protegge organi delicati (es. cranio e gabbia toracica) e produce cellule del sangue."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e14",
        type: "quiz",
        prompt: "Qual è il nostro satellite naturale che orbita intorno alla Terra in circa 28 giorni?",
        options: [
          { label: "La Luna", correct: true },
          { label: "Venere", correct: false },
          { label: "La cometa di Halley", correct: false }
        ],
        hint: "Mostra le sue fasi (nuova, crescente, piena, calante) ogni mese.",
        explanation: "La Luna è l'unico satellite naturale della Terra e non brilla di luce propria ma riflette quella del Sole."
      }
    },

    {
      years: ["P5"],
      round: {
        id: "qb-sci-p5-e15",
        type: "quiz",
        prompt: "I vasi sanguigni che portano il sangue ossigenato dal cuore verso tutti gli organi del corpo si chiamano...",
        options: [
          { label: "Arterie", correct: true },
          { label: "Vene", correct: false },
          { label: "Capillari linfatici", correct: false }
        ],
        hint: "Hanno pareti muscolari spesse per resistere alla pressione del battito cardiaco.",
        explanation: "Le arterie trasportano il sangue dal cuore alla periferia; le vene lo riportano al cuore."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e1",
        type: "quiz",
        prompt: "Chi fu il grande scienziato italiano che per primo introdusse il METODO SPERIMENTALE basato su osservazione, ipotesi ed esperimenti verificabili?",
        options: [
          { label: "Galileo Galilei", correct: true },
          { label: "Leonardo da Vinci", correct: false },
          { label: "Alessandro Volta", correct: false }
        ],
        hint: "Usò il cannocchiale astronomico all'inizio del Seicento.",
        explanation: "Galileo Galilei è universalmente considerato il padre del metodo scientifico moderno."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e2",
        type: "quiz",
        prompt: "Quale organello è la 'centrale energetica' della cellula, dove avviene la respirazione cellulare per produrre ATP?",
        options: [
          { label: "Il mitocondrio", correct: true },
          { label: "Il ribosoma", correct: false },
          { label: "L'apparato di Golgi", correct: false }
        ],
        hint: "Presente in tutte le cellule eucariote per produrre energia chimica.",
        explanation: "I mitocondri bruciano glucosio con l'ossigeno per ricavare energia sotto forma di molecole di ATP."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e3",
        type: "quiz",
        prompt: "Qual è la differenza fondamentale tra una cellula VEGETALE e una animale?",
        options: [
          { label: "La cellula vegetale possiede parete cellulare rigida, cloroplasti e un grande vacuolo", correct: true },
          { label: "La cellula vegetale non ha il nucleo", correct: false },
          { label: "La cellula animale è verde", correct: false }
        ],
        hint: "La parete di cellulosa dona rigidità ai fusti delle piante.",
        explanation: "Parete cellulare, cloroplasti per la fotosintesi e grande vacuolo centrale sono esclusivi dei vegetali."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e4",
        type: "quiz",
        prompt: "Che cos'è un MISCUGLIO OMOGENEO (o soluzione)?",
        options: [
          { label: "Un miscuglio in cui i componenti non si possono più distinguere a occhio nudo o al microscopio (es. acqua e sale)", correct: true },
          { label: "Un miscuglio di acqua e sassi", correct: false },
          { label: "Una sostanza radioattiva", correct: false }
        ],
        hint: "Ha proprietà identiche in ogni suo punto.",
        explanation: "In una soluzione omogenea il soluto è disciolto in modo perfettamente uniforme nel solvente."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e5",
        type: "quiz",
        prompt: "Come si chiama l'unità fondamentale e microscopica di cui sono composti TUTTI gli esseri viventi?",
        options: [
          { label: "La cellula", correct: true },
          { label: "Il minerale", correct: false },
          { label: "La roccia", correct: false }
        ],
        hint: "Teoria cellulare: ogni essere vivente è formato da una o più cellule.",
        explanation: "La cellula è la più piccola unità vivente autonoma capace di riprodursi e compiere funzioni vitali."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e6",
        type: "quiz",
        prompt: "Come si chiama una sostanza pura formata da atomi TUTTI IDENTICI tra loro (come l'oro, il ferro o l'ossigeno)?",
        options: [
          { label: "Elemento chimico", correct: true },
          { label: "Composto chimico", correct: false },
          { label: "Miscuglio eterogeneo", correct: false }
        ],
        hint: "È catalogata nella Tavola Periodica di Mendeleev.",
        explanation: "Un elemento è costituito da atomi aventi lo stesso numero atomico e non può essere scomposto."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni parte della cellula alla sua funzione principale.",
        leftItems: ["Nucleo", "Membrana cellulare", "Citoplasma"],
        rightItems: ["Custodisce il DNA", "Regola gli scambi con l'esterno", "Sostanza gelatinosa con gli organelli"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Il nucleo è il cervello della cellula, la membrana è il confine protettivo.",
        explanation: "I tre costituenti fondamentali di qualsiasi cellula eucariote."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e8",
        type: "quiz",
        prompt: "Quale scienziato svedese nel Settecento introdusse la NOMENCLATURA BINOMIA in latino per classificare tutti gli esseri viventi (Genere + specie)?",
        options: [
          { label: "Carlo Linneo", correct: true },
          { label: "Charles Darwin", correct: false },
          { label: "Gregor Mendel", correct: false }
        ],
        hint: "Es. Homo sapiens, Canis lupus.",
        explanation: "Linneo ideò il sistema tassonomico binomiale ancora oggi impiegato nella classificazione scientifica."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e9",
        type: "quiz",
        prompt: "Quale particella subatomica ha carica elettrica POSITIVA e si trova nel nucleo dell'atomo?",
        options: [
          { label: "Il protone", correct: true },
          { label: "L'elettrone (carica negativa)", correct: false },
          { label: "Il neutrone (carica neutra)", correct: false }
        ],
        hint: "Nel nucleo ci sono protoni positivi e neutroni neutri.",
        explanation: "I protoni hanno carica positiva (+1) e definiscono il numero atomico di un elemento."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e10",
        type: "quiz",
        prompt: "I BATTERI sono organismi unicellulari PROCARIOTI. Cosa significa procariote?",
        options: [
          { label: "Che il loro materiale genetico (DNA) è libero nel citoplasma, privo di membrana nucleare", correct: true },
          { label: "Che possiedono 10 nuclei", correct: false },
          { label: "Che vivono solo a 100 gradi", correct: false }
        ],
        hint: "'Pro-karyon' significa 'prima del nucleo': non hanno un nucleo racchiuso da membrana.",
        explanation: "Le cellule procariote sono prive di nucleo delimitato da membrana nucleare."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e11",
        type: "quiz",
        prompt: "Qual è la formula chimica dell'ACQUA, indicante 2 atomi di idrogeno e 1 di ossigeno?",
        options: [
          { label: "H₂O", correct: true },
          { label: "CO₂ (anidride carbonica)", correct: false },
          { label: "NaCl (cloruro di sodio)", correct: false }
        ],
        hint: "Due H e un O legati chimicamente.",
        explanation: "H₂O rappresenta la molecola d'acqua formata da due atomi di idrogeno e uno di ossigeno."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i livelli di organizzazione biologica dal più semplice al più complesso.",
        sortItems: ["Cellula", "Tessuto (insieme di cellule uguali)", "Organo (es. cuore o polmone)", "Apparato o Sistema (es. circolatorio)"],
        hint: "Dal microscopico all'intero organismo coordinato.",
        explanation: "Cellula -> Tessuto -> Organo -> Apparato/Sistema -> Organismo."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e13",
        type: "quiz",
        prompt: "Che cos'è la BIODIVERSITÀ in un ecosistema?",
        options: [
          { label: "La ricchezza e varietà delle diverse specie viventi presenti in un ambiente", correct: true },
          { label: "Il numero di automobili in una città", correct: false },
          { label: "La temperatura media delle rocce", correct: false }
        ],
        hint: "Più specie diverse ci sono, più l'ecosistema è resiliente e sano.",
        explanation: "La biodiversità indica la varietà genetica, tassonomica ed ecologica della biosfera."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e14",
        type: "quiz",
        prompt: "Come si chiama lo strumento ottico formato da lenti d'ingrandimento usato per osservare cellule e microrganismi?",
        options: [
          { label: "Microscopio", correct: true },
          { label: "Telescopio (osserva le stelle lontane)", correct: false },
          { label: "Periscopio", correct: false }
        ],
        hint: "Permette di vedere cose microscopiche invisibili all'occhio nudo.",
        explanation: "Il microscopio ottico ed elettronico permette l'ingrandimento di campioni biologici."
      }
    },

    {
      years: ["S1"],
      round: {
        id: "qb-sci-s1-e15",
        type: "quiz",
        prompt: "Che cos'è una TRASFORMAZIONE CHIMICA (o reazione chimica)?",
        options: [
          { label: "Una trasformazione in cui le sostanze iniziali si modificano creando sostanze completamente nuove (es. combustione)", correct: true },
          { label: "Lo scioglimento di un cubetto di ghiaccio in acqua", correct: false },
          { label: "La rottura di un vetro in frammenti", correct: false }
        ],
        hint: "Nei passaggi fisici la materia resta identica, nelle reazioni chimiche cambia la formula chimica.",
        explanation: "In una reazione chimica si rompono e riformano legami atomici, formando nuove specie chimiche."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e1",
        type: "quiz",
        prompt: "Secondo il Principio di Archimede, un corpo immerso in un liquido riceve una spinta dal basso verso l'alto pari a...",
        options: [
          { label: "Il peso del volume di liquido spostato", correct: true },
          { label: "Il doppio del suo peso reale", correct: false },
          { label: "La pressione atmosferica", correct: false }
        ],
        hint: "È la forza che permette alle grandi navi di acciaio di galleggiare sull'acqua.",
        explanation: "La spinta idrostatica di Archimede è uguale al peso della massa di fluido spostata dal corpo."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e2",
        type: "quiz",
        prompt: "Qual è l'unità di misura della FORZA nel Sistema Internazionale (SI)?",
        options: [
          { label: "Newton (N)", correct: true },
          { label: "Chilogrammo (kg)", correct: false },
          { label: "Joule (J)", correct: false }
        ],
        hint: "Prende il nome dal grande scienziato Isaac Newton.",
        explanation: "La forza si misura in Newton (1 N è la forza che imprime a 1 kg l'accelerazione di 1 m/s²)."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e3",
        type: "quiz",
        prompt: "Come si propaga il calore nel VUOTO dello spazio (come la luce e il calore del Sole che raggiungono la Terra)?",
        options: [
          { label: "Per irraggiamento (onde elettromagnetiche infrarosse)", correct: true },
          { label: "Per conduzione", correct: false },
          { label: "Per convezione", correct: false }
        ],
        hint: "Nel vuoto non c'è materia, quindi non servono particelle a contatto.",
        explanation: "L'irraggiamento avviene tramite radiazioni elettromagnetiche e non richiede alcun mezzo materiale."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e4",
        type: "quiz",
        prompt: "Quale forza invisibile attrae tutti i corpi verso il centro della Terra ed è responsabile del peso degli oggetti?",
        options: [
          { label: "Forza di gravità (o attrazione gravitazionale)", correct: true },
          { label: "Forza magnetica", correct: false },
          { label: "Forza d'attrito", correct: false }
        ],
        hint: "La scoprì Newton osservando la caduta di una mela dall'albero.",
        explanation: "La forza peso è l'interazione gravitazionale esercitata dalla massa della Terra su un corpo."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e5",
        type: "quiz",
        prompt: "Quali organi dell'apparato escretore filtrano continuamente il sangue per eliminare le scorie azotate producendo l'urina?",
        options: [
          { label: "I reni", correct: true },
          { label: "I polmoni", correct: false },
          { label: "Il fegato", correct: false }
        ],
        hint: "Hanno forma di fagiolo e contengono milioni di nefroni filtranti.",
        explanation: "I reni depurano il sangue dai rifiuti metabolici (urea) regolando l'equilibrio idrico-salino."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e6",
        type: "quiz",
        prompt: "Come si chiama l'energia che un corpo possiede in virtù del suo MOVIMENTO (es. un'auto in corsa)?",
        options: [
          { label: "Energia cinetica", correct: true },
          { label: "Energia potenziale gravitazionale", correct: false },
          { label: "Energia nucleare", correct: false }
        ],
        hint: "'Kinesis' in greco significa movimento. Dipende da massa e velocità.",
        explanation: "L'energia cinetica è data dalla formula Ec = 1/2 · m · v²."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni meccanismo di trasmissione del calore al suo mezzo tipico.",
        leftItems: ["Conduzione", "Convezione", "Irraggiamento"],
        rightItems: ["Solidi (contatto diretto di particelle)", "Fluidi: liquidi e gas (moti convettivi)", "Vuoto e spazio (onde elettromagnetiche)"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Nel cucchiaio sul fuoco c'è conduzione, nell'acqua che bolle convezione, dal sole irraggiamento.",
        explanation: "I tre meccanismi fisici fondamentali di propagazione del calore."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e8",
        type: "quiz",
        prompt: "Che cos'è la PRESSIONE in fisica?",
        options: [
          { label: "Il rapporto tra la forza applicata perpendicolarmente e l'area della superficie (P = F / S)", correct: true },
          { label: "Il peso di un corpo moltiplicato per l'altezza", correct: false },
          { label: "La velocità media diviso il tempo", correct: false }
        ],
        hint: "Si misura in Pascal (Pa = N / m²). Per questo gli sci non affondano nella neve fresca.",
        explanation: "Pressione = Forza / Superficie. Allargando la superficie di appoggio la pressione diminuisce."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e9",
        type: "quiz",
        prompt: "In fisica, che cos'è l'ATTRITO?",
        options: [
          { label: "Una forza di contatto che si oppone sempre al movimento tra due superfici", correct: true },
          { label: "Una calamita che attrae il ferro", correct: false },
          { label: "Il calore prodotto da una fiamma", correct: false }
        ],
        hint: "Rallenta le cose che scivolano e permette alle nostre scarpe di non scivolare a terra.",
        explanation: "L'attrito (radente, volvente o viscoso) agisce in direzione contraria al verso del moto."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e10",
        type: "quiz",
        prompt: "Cosa afferma il Principio di Conservazione dell'Energia?",
        options: [
          { label: "L'energia non si crea né si distrugge, ma si trasforma da una forma all'altra", correct: true },
          { label: "L'energia scompare non appena si spegne la luce", correct: false },
          { label: "L'energia aumenta all'infinito da sola", correct: false }
        ],
        hint: "Primo principio della termodinamica: la quantità totale di energia nell'universo è costante.",
        explanation: "L'energia totale di un sistema isolato rimane costante nel tempo, cambiando solo forma."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e11",
        type: "quiz",
        prompt: "Quali proteine speciali prodotte dai linfociti riconoscono e neutralizzano in modo specifico antigeni estranei come virus e batteri?",
        options: [
          { label: "Anticorpi (immunoglobuline)", correct: true },
          { label: "Enzimi digestivi", correct: false },
          { label: "Emoglobina", correct: false }
        ],
        hint: "Vengono stimolati dai vaccini per conferire immunità duratura.",
        explanation: "Gli anticorpi riconoscono specificamente gli antigeni patogeni neutralizzandoli."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina i pianeti gassosi esterni (giganti del Sistema Solare) dal più vicino al più lontano dal Sole.",
        sortItems: ["Giove", "Saturno (con gli anelli)", "Urano", "Nettuno (il più esterno)"],
        hint: "I quattro giganti gassosi e ghiacciati oltre la fascia degli asteroidi.",
        explanation: "Giove -> Saturno -> Urano -> Nettuno."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e13",
        type: "quiz",
        prompt: "Un'automobile percorre 120 chilometri in 2 ore a velocità costante. Qual è la sua velocità media?",
        options: [
          { label: "60 km/h", correct: true },
          { label: "120 km/h", correct: false },
          { label: "240 km/h", correct: false }
        ],
        hint: "Velocità = Spazio diviso Tempo (v = s / t).",
        explanation: "v = 120 km ÷ 2 h = 60 km/h."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e14",
        type: "quiz",
        prompt: "Quale ormone prodotto dal pancreas regola la quantità di glucosio (zuccheri) nel sangue?",
        options: [
          { label: "Insulina", correct: true },
          { label: "Adrenalina", correct: false },
          { label: "Tiroxina", correct: false }
        ],
        hint: "Se scarseggia, può provocare il diabete.",
        explanation: "L'insulina abbassa la glicemia favorendo l'assorbimento cellulare del glucosio."
      }
    },

    {
      years: ["S2"],
      round: {
        id: "qb-sci-s2-e15",
        type: "quiz",
        prompt: "Come si chiama la velocità con cui varia la velocità nel tempo (variazione di velocità / tempo)?",
        options: [
          { label: "Accelerazione", correct: true },
          { label: "Massa inerziale", correct: false },
          { label: "Potenza", correct: false }
        ],
        hint: "Si misura in metri al secondo quadrato (m/s²).",
        explanation: "L'accelerazione indica la rapidità con cui un corpo accelera o frena (a = Δv / Δt)."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e1",
        type: "quiz",
        prompt: "Chi è considerato il padre della GENETICA classica grazie ai suoi esperimenti sulle piante di pisello odoroso e alla scoperta delle leggi dell'ereditarietà?",
        options: [
          { label: "Gregor Mendel", correct: true },
          { label: "Charles Darwin", correct: false },
          { label: "Louis Pasteur", correct: false }
        ],
        hint: "Monaco agostiniano dell'Ottocento.",
        explanation: "Gregor Mendel formulò le leggi della dominanza, segregazione e assortimento indipendente."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e2",
        type: "quiz",
        prompt: "Qual è la struttura a DOPPIA ELICA scoperta nel 1953 da Watson e Crick che custodisce il codice genetico di tutti gli esseri viventi?",
        options: [
          { label: "Il DNA (acido desossiribonucleico)", correct: true },
          { label: "L'emoglobina", correct: false },
          { label: "Il glucosio", correct: false }
        ],
        hint: "Composto da 4 basi azotate: Adenina, Timina, Citosina e Guanina.",
        explanation: "La molecola del DNA ha conformazione a doppia elica e codifica l'informazione genetica."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e3",
        type: "quiz",
        prompt: "Secondo la teoria dell'evoluzione formulata da Charles Darwin ne 'L'origine delle specie', quale meccanismo guida l'adattamento e l'evoluzione dei viventi?",
        options: [
          { label: "La selezione naturale dei caratteri più vantaggiosi per la sopravvivenza", correct: true },
          { label: "La volontà degli animali di migliorarsi", correct: false },
          { label: "L'influenza delle fasi lunari", correct: false }
        ],
        hint: "Gli individui con caratteristiche più adatte all'ambiente sopravvivono e si riproducono con maggior successo.",
        explanation: "La selezione naturale favorisce gli individui portatori di mutazioni vantaggiose nell'ecosistema."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e4",
        type: "quiz",
        prompt: "Cosa afferma la Prima Legge di Ohm per i circuiti elettrici (relazione tra Tensione V, Corrente I e Resistenza R)?",
        options: [
          { label: "V = R × I", correct: true },
          { label: "V = R / I", correct: false },
          { label: "V = R + I", correct: false }
        ],
        hint: "La differenza di potenziale (Volt) è direttamente proporzionale all'intensità di corrente (Ampere).",
        explanation: "La prima legge di Ohm stabilisce che la tensione V è uguale al prodotto della resistenza R per la corrente I."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e5",
        type: "quiz",
        prompt: "Secondo la Teoria della Tettonica delle Placche, da cosa hanno origine i terremoti e le eruzioni vulcaniche?",
        options: [
          { label: "Dal lento movimento e scontro delle placche (zolle) litosferiche sull'astenosfera fluida", correct: true },
          { label: "Dalle maree provocate dalla Luna", correct: false },
          { label: "Dalle piogge torrenziali", correct: false }
        ],
        hint: "La crosta terrestre è divisa in placche rigide che galleggiano sul mantello.",
        explanation: "L'attrito, la subduzione e lo scontro tra zolle tettoniche generano sismi, orogenesi e vulcanismo."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e6",
        type: "quiz",
        prompt: "Nel modello geologico della Terra, come si chiama il punto sotterraneo esatto in cui ha origine la frattura di una faglia e si scatena il terremoto?",
        options: [
          { label: "Ipocentro (fuoco)", correct: true },
          { label: "Epicentro (in superficie sulla verticale)", correct: false },
          { label: "Crast", correct: false }
        ],
        hint: "L'epicentro è il punto in superficie perpendicolare sopra di esso.",
        explanation: "L'ipocentro è la sorgente profonda del sisma; l'epicentro è la sua proiezione in superficie."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e7",
        type: "dragdrop",
        mode: "match",
        prompt: "Abbina ogni tipo di roccia alla sua origine geologica.",
        leftItems: ["Rocce magmatiche (o ignee)", "Rocce sedimentarie", "Rocce metamorfiche"],
        rightItems: ["Raffreddamento e solidificazione del magma/lava", "Accumulo e compattazione di detriti e fossili", "Trasformazione per altissima pressione e temperatura"],
        pairs: [[0, 0], [1, 1], [2, 2]],
        hint: "Il granito e il basalto sono magmatici, il calcare è sedimentario, il marmo è metamorfico.",
        explanation: "Le tre grandi famiglie litologiche del ciclo delle rocce della crosta terrestre."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e8",
        type: "quiz",
        prompt: "Come si chiama un cambiamento casuale e improvviso nella sequenza dei nucleotidi del DNA che può introdurre nuove varianti genetiche?",
        options: [
          { label: "Mutazione genetica", correct: true },
          { label: "Clonazione", correct: false },
          { label: "Simbiosi", correct: false }
        ],
        hint: "Fornisce la materia prima della variabilità su cui agisce la selezione naturale.",
        explanation: "Le mutazioni sono alterazioni spontanee o indotte della sequenza del DNA."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e9",
        type: "quiz",
        prompt: "Nel magnetismo, cosa accade avvicinando due poli magnetici dello STESSO NOME (es. Nord con Nord o Sud con Sud)?",
        options: [
          { label: "Si respingono a vicenda", correct: true },
          { label: "Si attraggono con forza", correct: false },
          { label: "Diventano incandescenti", correct: false }
        ],
        hint: "I poli opposti si attraggono, i poli uguali si...",
        explanation: "Regola fondamentale del magnetismo: poli concordi si respingono, poli discordi si attraggono."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e10",
        type: "quiz",
        prompt: "Cosa alimenta l'immensa energia irradiata dal Sole e da tutte le stelle nell'universo?",
        options: [
          { label: "Le reazioni di fusione nucleare (idrogeno che si fonde in elio nel nucleo)", correct: true },
          { label: "La combustione di legna e carbone", correct: false },
          { label: "L'attrito tra i pianeti", correct: false }
        ],
        hint: "Temperatura di oltre 15 milioni di gradi nel nucleo solare.",
        explanation: "Nel nucleo stellare la fusione di nuclei di idrogeno in elio libera quantità immani di energia (E = mc²)."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e11",
        type: "quiz",
        prompt: "Qual è la forma della nostra galassia, la Via Lattea, in cui si trova il Sistema Solare?",
        options: [
          { label: "Galassia a spirale barrata", correct: true },
          { label: "Galassia ellittica perfetta", correct: false },
          { label: "Galassia triangolare", correct: false }
        ],
        hint: "Ha lunghi bracci a spirale che ruotano attorno al nucleo galattico.",
        explanation: "La Via Lattea è una galassia a spirale con bracci ricchi di stelle, gas e polveri cosmiche."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e12",
        type: "dragdrop",
        mode: "sort",
        prompt: "Ordina le unità di misura elettriche fondamentali: Carica, Corrente, Tensione, Resistenza.",
        sortItems: ["Coulomb (C) - Carica", "Ampere (A) - Corrente", "Volt (V) - Tensione", "Ohm (Ω) - Resistenza"],
        hint: "Le grandezze elettriche canoniche studiate in 3ª media.",
        explanation: "Unità di misura del Sistema Internazionale per i circuiti elettrici."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e13",
        type: "quiz",
        prompt: "In genetica, qual è la differenza tra GENOTIPO e FENOTIPO?",
        options: [
          { label: "Il genotipo è l'insieme dei geni ereditati (DNA); il fenotipo è l'aspetto esteriore visibile manifestato", correct: true },
          { label: "Il genotipo riguarda solo le piante, il fenotipo solo gli animali", correct: false },
          { label: "Non c'è alcuna differenza", correct: false }
        ],
        hint: "Es. geni per gli occhi azzurri (genotipo) -> colore reale degli occhi (fenotipo).",
        explanation: "Il genotipo è il corredo genetico; il fenotipo è la risultante visibile dell'interazione col contesto ambientale."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e14",
        type: "quiz",
        prompt: "Qual è la teoria scientifica che descrive l'inizio dell'espansione dell'Universo avvenuta circa 13,8 miliardi di anni fa?",
        options: [
          { label: "Il Big Bang", correct: true },
          { label: "La Teoria della Gravità", correct: false },
          { label: "La Deriva dei Continenti", correct: false }
        ],
        hint: "Un'espansione primordiale a partire da una singolarità densissima e caldissima.",
        explanation: "Il modello cosmologico del Big Bang descrive l'origine e l'evoluzione dell'universo in espansione."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sci-s3-e15",
        type: "quiz",
        prompt: "Cosa misura la Scala Richter nei terremoti?",
        options: [
          { label: "La magnitudo (l'energia sismica effettivamente sprigionata dall'ipocentro)", correct: true },
          { label: "I danni visibili provocati a edifici e persone (scala Mercalli)", correct: false },
          { label: "La durata in secondi del sisma", correct: false }
        ],
        hint: "La scala Mercalli valuta l'intensità dei danni; la scala Richter misura l'energia oggettiva.",
        explanation: "La scala Richter esprime la magnitudo strumentale quantificando l'energia meccanica rilasciata dal terremoto."
      }
    },
  ],

  storia: [
    // ── Primaria 1ª – 2ª (P1, P2) ─────────────────────────────────
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-sto-p1-1',
        type: 'sequence',
        direction: 'tap',
        prompt: 'Metti in ordine le quattro stagioni partendo dalla primavera.',
        items: ['Primavera', 'Estate', 'Autunno', 'Inverno'],
        hint: 'Dopo la primavera arriva il caldo dell\'estate.',
        explanation: 'Il ciclo delle stagioni è Primavera, Estate, Autunno, Inverno.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-sto-p1-2',
        type: 'quiz',
        prompt: 'Quale parola indica il giorno che viene subito dopo «oggi»?',
        options: [
          { label: 'Domani', correct: true },
          { label: 'Ieri', correct: false },
          { label: 'Prima', correct: false }
        ],
        hint: 'Ieri è passato, oggi è adesso, e dopo viene...',
        explanation: 'Il giorno successivo a oggi si chiama domani.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-sto-p1-3',
        type: 'sequence',
        direction: 'tap',
        prompt: 'Ordina i momenti della giornata dal risveglio fino al sonno.',
        items: ['Mattina', 'Pomeriggio', 'Sera', 'Notte'],
        hint: 'Ci svegliamo di mattina e andiamo a dormire di notte.',
        explanation: 'La giornata scorre così: Mattina, Pomeriggio, Sera, Notte.'
      }
    },
    {
      years: ['P1', 'P2'],
      round: {
        id: 'qb-sto-p1-4',
        type: 'quiz',
        prompt: 'Quanti giorni ci sono in una settimana?',
        options: [
          { label: '7', correct: true },
          { label: '5', correct: false },
          { label: '10', correct: false },
          { label: '12', correct: false }
        ],
        hint: 'Da lunedì a domenica.',
        explanation: 'La settimana è composta da 7 giorni.'
      }
    },
    {
      years: ['P1', 'P2', 'P3'],
      round: {
        id: 'qb-sto-p2-1',
        type: 'quiz',
        prompt: 'Quanti mesi ci sono in un anno?',
        options: [
          { label: '12', correct: true },
          { label: '7', correct: false },
          { label: '10', correct: false },
          { label: '24', correct: false }
        ],
        hint: 'Da gennaio a dicembre.',
        explanation: 'Un anno è formato da 12 mesi.'
      }
    },
    {
      years: ['P1', 'P2', 'P3'],
      round: {
        id: 'qb-sto-p2-2',
        type: 'quiz',
        prompt: 'Con quale strumento misuriamo lo scorrere delle ore e dei minuti?',
        options: [
          { label: 'L\'orologio', correct: true },
          { label: 'Il righello', correct: false },
          { label: 'La bilancia', correct: false },
          { label: 'Il termometro', correct: false }
        ],
        hint: 'Ha le lancette oppure un quadrante digitale.',
        explanation: 'L\'orologio misura il tempo in ore, minuti e secondi.'
      }
    },
    {
      years: ['P2', 'P3'],
      round: {
        id: 'qb-sto-p2-3',
        type: 'quiz',
        prompt: 'Qual è il primo mese dell\'anno?',
        options: [
          { label: 'Gennaio', correct: true },
          { label: 'Settembre', correct: false },
          { label: 'Marzo', correct: false },
          { label: 'Dicembre', correct: false }
        ],
        hint: 'Inizia subito dopo Capodanno, in pieno inverno.',
        explanation: 'Gennaio è il primo dei dodici mesi dell\'anno.'
      }
    },
    // ── Primaria 3ª – 5ª (P3, P4, P5) ─────────────────────────────
    {
      years: ['P3', 'P4'],
      round: {
        id: 'qb-sto-p3-1',
        type: 'quiz',
        prompt: 'Quale grande scoperta segna il passaggio dal Paleolitico al Neolitico?',
        options: [
          { label: 'L\'agricoltura e l\'allevamento', correct: true },
          { label: 'La stampa', correct: false },
          { label: 'La bussola', correct: false }
        ],
        hint: 'L\'uomo smise di essere solo cacciatore nomade e iniziò a coltivare.',
        explanation: 'Con l\'agricoltura e l\'allevamento nel Neolitico nacquero i primi villaggi stabili.'
      }
    },
    {
      years: ['P3', 'P4'],
      round: {
        id: 'qb-sto-p3-2',
        type: 'quiz',
        prompt: 'Uno scheletro di dinosauro o una conchiglia pietrificata nella roccia sono che tipo di fonte storica?',
        options: [
          { label: 'Fonte materiale (fossile)', correct: true },
          { label: 'Fonte scritta', correct: false },
          { label: 'Fonte orale', correct: false }
        ],
        hint: 'È un resto fisico conservato negli strati della Terra per milioni di anni.',
        explanation: 'I fossili sono resti materiali importantissimi per ricostruire la Preistoria.'
      }
    },
    {
      years: ['P3', 'P4', 'P5'],
      round: {
        id: 'qb-sto-p3-3',
        type: 'quiz',
        prompt: 'Quale invenzione segna la fine della Preistoria e l\'inizio della Storia?',
        options: [
          { label: 'La scrittura', correct: true },
          { label: 'La ruota', correct: false },
          { label: 'L\'arco', correct: false },
          { label: 'Il fuoco', correct: false }
        ],
        hint: 'Permise agli antichi popoli di lasciare documenti scritti.',
        explanation: 'La nascita della scrittura (intorno al 3500 a.C.) segna l\'inizio della Storia.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-sto-p4-1',
        type: 'quiz',
        prompt: 'Lungo quale grande fiume si sviluppò la civiltà egizia?',
        options: [
          { label: 'Il Nilo', correct: true },
          { label: 'Il Tevere', correct: false },
          { label: 'Il Danubio', correct: false },
          { label: 'Il Po', correct: false }
        ],
        hint: 'Il suo limo rendeva fertile il deserto africano.',
        explanation: 'L\'antico Egitto nacque lungo le rive del fiume Nilo.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-sto-p4-2',
        type: 'quiz',
        prompt: 'Tra quali due fiumi si trovava l\'antica Mesopotamia?',
        options: [
          { label: 'Tigri ed Eufrate', correct: true },
          { label: 'Arno e Tevere', correct: false },
          { label: 'Indo e Gange', correct: false },
          { label: 'Reno e Senna', correct: false }
        ],
        hint: 'Il nome Mesopotamia significa proprio «terra tra i due fiumi».',
        explanation: 'In Mesopotamia, tra i fiumi Tigri ed Eufrate, fiorirono Sumeri, Babilonesi e Assiri.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-sto-p4-3',
        type: 'image',
        icon: 'nave',
        prompt: 'Quale antico popolo del Mediterraneo fu celebre per le sue navi commerciali e per l\'alfabeto fonetico?',
        options: [
          { label: 'I Fenici', correct: true },
          { label: 'Gli Assiri', correct: false },
          { label: 'Gli Inca', correct: false }
        ],
        hint: 'Abitavano le coste dell\'attuale Libano e commerciavano la porpora.',
        explanation: 'I Fenici erano abilissimi navigatori e idearono il primo alfabeto fonetico.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-sto-p5-1',
        type: 'quiz',
        prompt: 'Come si chiamavano le città-stato indipendenti dell\'antica Grecia?',
        options: [
          { label: 'Póleis', correct: true },
          { label: 'Piramidi', correct: false },
          { label: 'Province', correct: false }
        ],
        hint: 'Atene e Sparta ne sono gli esempi più famosi.',
        explanation: 'Le città-stato greche si chiamavano póleis (al singolare pólis).'
      }
    },
    {
      years: ['P5', 'S1'],
      round: {
        id: 'qb-sto-p5-2',
        type: 'quiz',
        prompt: 'Secondo la tradizione, in quale anno fu fondata la città di Roma?',
        options: [
          { label: '753 a.C.', correct: true },
          { label: '476 d.C.', correct: false },
          { label: '1000 d.C.', correct: false },
          { label: '313 d.C.', correct: false }
        ],
        hint: 'La leggenda narra di Romolo e Remo sul colle Palatino.',
        explanation: 'Secondo la tradizione Roma fu fondata il 21 aprile del 753 a.C.'
      }
    },
    {
      years: ['P5', 'S1'],
      round: {
        id: 'qb-sto-p5-3',
        type: 'sequence',
        direction: 'tap',
        prompt: 'Metti in ordine cronologico le tre fasi della storia dell\'antica Roma.',
        items: ['Monarchia', 'Repubblica', 'Impero'],
        hint: 'Prima governarono i sette Re, poi i Consoli col Senato, infine gli Imperatori.',
        explanation: 'La storia romana si divide in Monarchia, Repubblica e Impero.'
      }
    },
    {
      years: ['P4', 'P5'],
      round: {
        id: 'qb-sto-p5-4',
        type: 'dragdrop',
        mode: 'match',
        prompt: 'Abbina ciascuna civiltà antica alla sua costruzione simbolo.',
        leftItems: ['Egizi', 'Sumeri', 'Romani'],
        rightItems: ['Ziqqurat', 'Colosseo', 'Piramidi'],
        pairs: [
          [0, 2],
          [1, 0],
          [2, 1]
        ],
        hint: 'I Sumeri costruivano templi a gradoni, gli Egizi tombe monumentali per i faraoni.',
        explanation: 'Egizi = Piramidi, Sumeri = Ziqqurat, Romani = Colosseo.'
      }
    },
    // ── Secondaria di I grado 1ª – 3ª (S1, S2, S3) ────────────────
    {
      years: ['S1', 'S2'],
      round: {
        id: 'qb-sto-s1-0',
        type: 'quiz',
        prompt: 'In quale anno cadde l\'Impero Romano d\'Occidente, data con cui inizia il Medioevo?',
        options: [
          { label: '476 d.C.', correct: true },
          { label: '1492', correct: false },
          { label: '800 d.C.', correct: false },
          { label: '313 d.C.', correct: false }
        ],
        hint: 'Fu deposto l\'ultimo giovane imperatore Romolo Augustolo.',
        explanation: 'Il 476 d.C. segna la caduta dell\'Impero Romano d\'Occidente e l\'inizio del Medioevo.'
      }
    },
    {
      years: ['S1', 'S2', 'S3'],
      round: {
        id: 'qb-sto-s1-1',
        type: 'quiz',
        prompt: 'In quale anno Cristoforo Colombo arrivò in America?',
        options: [
          { label: '1492', correct: true },
          { label: '1789', correct: false },
          { label: '476', correct: false },
          { label: '1861', correct: false }
        ],
        hint: 'È la data che per convenzione chiude il Medioevo e apre l\'Età moderna.',
        explanation: 'Il 12 ottobre 1492 Colombo sbarcò nelle Americhe.'
      }
    },
    {
      years: ['S1', 'S2'],
      round: {
        id: 'qb-sto-s1-2',
        type: 'image',
        icon: 'corona',
        prompt: 'Chi fu incoronato imperatore del Sacro Romano Impero nella notte di Natale dell\'anno 800?',
        options: [
          { label: 'Carlo Magno', correct: true },
          { label: 'Giulio Cesare', correct: false },
          { label: 'Napoleone Bonaparte', correct: false }
        ],
        hint: 'Re dei Franchi, incoronato a Roma da papa Leone III.',
        explanation: 'Carlo Magno fu incoronato imperatore la notte di Natale dell\'800.'
      }
    },
    {
      years: ['S1', 'S2'],
      round: {
        id: 'qb-sto-s1-3',
        type: 'image',
        icon: 'torre',
        prompt: 'Nel Medioevo, come si chiamava il territorio affidato dal sovrano a un vassallo?',
        options: [
          { label: 'Feudo', correct: true },
          { label: 'Polis', correct: false },
          { label: 'Colonia', correct: false }
        ],
        hint: 'Da questa parola deriva il nome «feudalesimo».',
        explanation: 'Il beneficio territoriale concesso al vassallo si chiamava feudo.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-sto-s2-1',
        type: 'quiz',
        prompt: 'In quale anno scoppiò la Rivoluzione francese con la presa della Bastiglia?',
        options: [
          { label: '1789', correct: true },
          { label: '1848', correct: false },
          { label: '1700', correct: false },
          { label: '1815', correct: false }
        ],
        hint: 'Il 14 luglio a Parigi.',
        explanation: 'La presa della Bastiglia avvenne il 14 luglio 1789.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-sto-s2-2',
        type: 'quiz',
        prompt: 'In quale anno fu proclamato il Regno d\'Italia?',
        options: [
          { label: '1861', correct: true },
          { label: '1946', correct: false },
          { label: '1815', correct: false },
          { label: '1918', correct: false }
        ],
        hint: 'Culmine del Risorgimento italiano.',
        explanation: 'Il Regno d\'Italia fu proclamato il 17 marzo 1861.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-sto-s2-3',
        type: 'quiz',
        prompt: 'Quale invenzione di James Watt nel Settecento diede impulso alla Prima Rivoluzione Industriale?',
        options: [
          { label: 'La macchina a vapore', correct: true },
          { label: 'La lampadina elettrica', correct: false },
          { label: 'Il telefono', correct: false },
          { label: 'L\'aeroplano', correct: false }
        ],
        hint: 'Permise di azionare telai meccanici e locomotive usando il carbone.',
        explanation: 'Il perfezionamento della macchina a vapore fu il motore della Prima Rivoluzione Industriale.'
      }
    },
    {
      years: ['S3'],
      round: {
        id: 'qb-sto-s3-1',
        type: 'quiz',
        prompt: 'In quale anno entrò in vigore la Costituzione della Repubblica Italiana?',
        options: [
          { label: '1948', correct: true },
          { label: '1915', correct: false },
          { label: '1989', correct: false },
          { label: '1922', correct: false }
        ],
        hint: 'Il 1° gennaio, dopo il referendum del 2 giugno 1946.',
        explanation: 'La Costituzione italiana entrò in vigore il 1° gennaio 1948.'
      }
    },
    {
      years: ['S2', 'S3'],
      round: {
        id: 'qb-sto-s3-2',
        type: 'quiz',
        prompt: 'Quali furono gli anni della Prima guerra mondiale?',
        options: [
          { label: '1914 – 1918', correct: true },
          { label: '1939 – 1945', correct: false },
          { label: '1859 – 1861', correct: false },
          { label: '1929 – 1933', correct: false }
        ],
        hint: 'L\'Italia entrò nel conflitto nel maggio 1915.',
        explanation: 'La Grande Guerra durò dal 1914 al 1918.'
      }
    },
    {
      years: ['S3'],
      round: {
        id: 'qb-sto-s3-3',
        type: 'quiz',
        prompt: 'Che cosa scelse il popolo italiano con il referendum istituzionale del 2 giugno 1946?',
        options: [
          { label: 'La Repubblica (e per la prima volta votarono anche le donne)', correct: true },
          { label: 'Il ritorno alla Monarchia assoluta', correct: false },
          { label: 'L\'ingresso nella Prima guerra mondiale', correct: false }
        ],
        hint: 'Da quell\'evento si celebra ogni anno la Festa della Repubblica il 2 giugno.',
        explanation: 'Il 2 giugno 1946 a suffragio universale gli italiani scelsero la Repubblica ed elessero l\'Assemblea Costituente.'
      }
    },
    {
      years: ['S3'],
      round: {
        id: 'qb-sto-s3-4',
        type: 'quiz',
        prompt: 'In quale anno cadde il Muro di Berlino, simbolo della Guerra Fredda?',
        options: [
          { label: '1989', correct: true },
          { label: '1961', correct: false },
          { label: '1945', correct: false },
          { label: '2001', correct: false }
        ],
        hint: 'Avvenne il 9 novembre, aprendo la strada alla riunificazione tedesca.',
        explanation: 'Il Muro di Berlino fu abbattuto il 9 novembre 1989.'
      }
    }
,

  // ── Primaria 1ª – 2ª (P1, P2) ─────────────────────────────────
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-5',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Tocca le parole che indicano lo scorrere del tempo in ordine cronologico.',
      items: ['Ieri', 'Oggi', 'Domani'],
      hint: 'Dal giorno passato a quello presente fino al giorno futuro.',
      explanation: 'La successione temporale corretta è Ieri (passato), Oggi (presente), Domani (futuro).'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-6',
      type: 'quiz',
      prompt: 'Quale tipo di fonte storica è un antico vaso di terracotta ritrovato da un archeologo?',
      options: [
        { label: 'Fonte materiale (reperto)', correct: true },
        { label: 'Fonte orale', correct: false },
        { label: 'Fonte scritta', correct: false }
      ],
      hint: 'È un oggetto concreto che si può toccare con mano.',
      explanation: 'Gli oggetti, gli strumenti e le costruzioni sono fonti materiali.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-7',
      type: 'image',
      icon: 'pergamena',
      prompt: 'Quale antico supporto di scrittura vedi nell\'immagine?',
      options: [
        { label: 'Una pergamena', correct: true },
        { label: 'Uno scudo', correct: false },
        { label: 'Una spada', correct: false }
      ],
      hint: 'Un rotolo di pelle lavorata usato dagli scribi per scrivere.',
      explanation: 'L\'icona rappresenta una pergamena arrotolata.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p2-4',
      type: 'quiz',
      prompt: 'Chi è lo studioso che scava nel terreno alla ricerca di reperti e resti delle civiltà del passato?',
      options: [
        { label: 'L\'archeologo', correct: true },
        { label: 'L\'astronomo', correct: false },
        { label: 'Il veterinario', correct: false },
        { label: 'Il meteorologo', correct: false }
      ],
      hint: 'Usa pennelli e palette negli scavi archeologici.',
      explanation: 'L\'archeologo scopre e studia le testimonianze materiali del passato.'
    }
  },
  {
    years: ['P2', 'P3'],
    round: {
      id: 'qb-sto-p2-5',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascuna fonte storica al suo esempio pratico.',
      leftItems: ['Fonte visiva', 'Fonte scritta', 'Fonte orale'],
      rightItems: ['Una fotografia d\'epoca', 'Una pagina di diario', 'Il racconto del nonno'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Guarda con gli occhi, leggi con la mente o ascolta con le orecchie.',
      explanation: 'Fotografia: visiva; Diario: scritta; Racconto: orale.'
    }
  },
  {
    years: ['P2', 'P3'],
    round: {
      id: 'qb-sto-p2-6',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Metti in ordine cronologico i periodi della vita di una persona.',
      items: ['Infanzia', 'Giovinezza', 'Età adulta', 'Vecchiaia'],
      hint: 'Dal bambino appena nato all\'anziano saggio.',
      explanation: 'Le tappe della vita si susseguono: infanzia, giovinezza, età adulta e vecchiaia.'
    }
  },

  // ── Primaria 3ª – 4ª – 5ª (P3, P4, P5) ─────────────────────────
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sto-p3-4',
      type: 'quiz',
      prompt: 'Durante il Neolitico gli esseri umani smisero di essere nomadi e divennero sedentari grazie a quale grande scoperta?',
      options: [
        { label: 'L\'agricoltura e l\'allevamento', correct: true },
        { label: 'L\'invenzione della ferrovia', correct: false },
        { label: 'La scoperta dell\'elettricità', correct: false },
        { label: 'L\'invenzione della plastica', correct: false }
      ],
      hint: 'Coltivando piante e addomesticando animali non serviva più spostarsi continuamente.',
      explanation: 'Con la nascita dell\'agricoltura nel Neolitico gli uomini costruirono villaggi stabili.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sto-p3-5',
      type: 'quiz',
      prompt: 'Quale popolo della Mesopotamia inventò la scrittura cuneiforme incidendo tavolette d\'argilla con uno stilo?',
      options: [
        { label: 'I Sumeri', correct: true },
        { label: 'I Romani', correct: false },
        { label: 'I Vichinghi', correct: false },
        { label: 'I Celti', correct: false }
      ],
      hint: 'Abitavano tra i fiumi Tigri ed Eufrate nel IV millennio a.C.',
      explanation: 'I Sumeri inventarono la scrittura cuneiforme intorno al 3200 a.C.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sto-p3-6',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun popolo dell\'antichità al fiume o mare attorno a cui si è sviluppato.',
      leftItems: ['Egizi', 'Sumeri', 'Fenici'],
      rightItems: ['Fiume Nilo', 'Tigri ed Eufrate', 'Mar Mediterraneo'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Ricorda i fiumi delle prime grandi civiltà idrauliche.',
      explanation: 'Egizi: Nilo; Sumeri: Mesopotamia (Tigri ed Eufrate); Fenici: commerci nel Mediterraneo.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-sto-p4-4',
      type: 'quiz',
      prompt: 'Quale famosa polis dell\'antica Grecia era celebre per l\'educazione militare fin dall\'infanzia dei suoi cittadini?',
      options: [
        { label: 'Sparta', correct: true },
        { label: 'Atene', correct: false },
        { label: 'Corinto', correct: false },
        { label: 'Micene', correct: false }
      ],
      hint: 'I suoi guerrieri erano gli opliti spartani, guidati da Leonida alle Termopili.',
      explanation: 'Sparta basava la propria società sulla disciplina e sull\'addestramento militare.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-sto-p4-5',
      type: 'quiz',
      prompt: 'Quale forma di governo nata nell\'Atene di Clistene e Pericle significa letteralmente «governo del popolo»?',
      options: [
        { label: 'Democrazia', correct: true },
        { label: 'Oligarchia', correct: false },
        { label: 'Monarchia', correct: false },
        { label: 'Tirannia', correct: false }
      ],
      hint: 'Dal greco démos (popolo) e krátos (potere).',
      explanation: 'Ad Atene nacque la democrazia, dove l\'assemblea dei cittadini (Ecclesia) votava le leggi.'
    }
  },
  {
    years: ['P4', 'P5'],
    round: {
      id: 'qb-sto-p4-6',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Ordina le tre grandi fasi politiche della storia dell\'antica Roma.',
      items: ['Monarchia', 'Repubblica', 'Impero'],
      hint: 'Dalla fondazione con i sette re fino a Ottaviano Augusto.',
      explanation: 'Roma fu prima una Monarchia (753-509 a.C.), poi Repubblica, infine Impero (dal 27 a.C.).'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-sto-p5-5',
      type: 'quiz',
      prompt: 'Chi fu il primo imperatore romano, salito al potere nel 27 a.C. dopo la fine delle guerre civili?',
      options: [
        { label: 'Ottaviano Augusto', correct: true },
        { label: 'Giulio Cesare', correct: false },
        { label: 'Nerone', correct: false },
        { label: 'Traiano', correct: false }
      ],
      hint: 'Diede il nome al mese di agosto e instaurò la Pax Romana.',
      explanation: 'Ottaviano Augusto fu il primo imperatore di Roma dal 27 a.C. al 14 d.C.'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-sto-p5-6',
      type: 'quiz',
      prompt: 'Quale straordinaria rete di infrastrutture permise ai Romani di collegare tutte le province dell\'Impero?',
      options: [
        { label: 'Le strade lastricate consolari', correct: true },
        { label: 'Le ferrovie a vapore', correct: false },
        { label: 'I canali sottomarini', correct: false },
        { label: 'Le teleferiche', correct: false }
      ],
      hint: 'Da qui deriva il detto: «Tutte le strade portano a Roma».',
      explanation: 'I Romani costruirono oltre 80.000 km di strade consolari come la Via Appia.'
    }
  },
  {
    years: ['P5', 'S1'],
    round: {
      id: 'qb-sto-p5-7',
      type: 'quiz',
      prompt: 'Quale evento segna convenzionalmente per gli storici la fine dell\'Età Antica e l\'inizio del Medioevo?',
      options: [
        { label: 'La caduta dell\'Impero Romano d\'Occidente (476 d.C.)', correct: true },
        { label: 'La scoperta dell\'America (1492)', correct: false },
        { label: 'La Rivoluzione Francese (1789)', correct: false },
        { label: 'La nascita di Roma (753 a.C.)', correct: false }
      ],
      hint: 'Avvenne nel 476 d.C. quando Odoacre depose l\'ultimo imperatore Romolo Augustolo.',
      explanation: 'Nel 476 d.C. cadde l\'Impero Romano d\'Occidente, dando inizio al Medioevo.'
    }
  },

  // ── Secondaria di I grado (S1, S2, S3) ───────────────────────────
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-sto-s1-4',
      type: 'quiz',
      prompt: 'Nella notte di Natale dell\'anno 800, chi fu incoronato a Roma imperatore del Sacro Romano Impero da Papa Leone III?',
      options: [
        { label: 'Carlo Magno', correct: true },
        { label: 'Federico Barbarossa', correct: false },
        { label: 'Giustiniano', correct: false },
        { label: 'Ottone I', correct: false }
      ],
      hint: 'Re dei Franchi, celebre per la rinascita carolingia.',
      explanation: 'Carlo Magno fu incoronato la notte di Natale dell\'800 nella Basilica di San Pietro.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-sto-s1-5',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun ordine della società feudale medievale al suo ruolo.',
      leftItems: ['Oratores', 'Bellatores', 'Laboratores'],
      rightItems: [
        'Coloro che pregano (clero)',
        'Coloro che combattono (nobili cavalieri)',
        'Coloro che lavorano (contadini e artigiani)'
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'La tripartizione sociale ideata dai pensatori medievali.',
      explanation: 'Oratores: preghiera; Bellatores: difesa e guerra; Laboratores: lavoro della terra.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-sto-s1-6',
      type: 'quiz',
      prompt: 'Quali erano le quattro celebri Repubbliche Marinare italiane che dominarono i commerci nel Mediterraneo medievale?',
      options: [
        { label: 'Amalfi, Genova, Pisa e Venezia', correct: true },
        { label: 'Roma, Milano, Napoli e Torino', correct: false },
        { label: 'Firenze, Siena, Lucca e Bologna', correct: false },
        { label: 'Palermo, Cagliari, Bari e Trieste', correct: false }
      ],
      hint: 'I loro stemmi compaiono ancora oggi nella bandiera della Marina Militare italiana.',
      explanation: 'Le quattro Repubbliche Marinare erano Amalfi, Genova, Pisa e Venezia.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sto-s2-4',
      type: 'quiz',
      prompt: 'In quale anno Cristoforo Colombo approdò nelle isole delle Bahamas, evento che segna l\'inizio dell\'Età Moderna?',
      options: [
        { label: '1492', correct: true },
        { label: '1517', correct: false },
        { label: '1348', correct: false },
        { label: '1789', correct: false }
      ],
      hint: 'Nel XV secolo, finanziato dai sovrani cattolici di Spagna Ferdinando e Isabella.',
      explanation: 'Il 12 ottobre 1492 Cristoforo Colombo sbarcò in America.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sto-s2-5',
      type: 'quiz',
      prompt: 'Quale monaco tedesco diede avvio alla Riforma Protestante nel 1517 affiggendo 95 tesi a Wittenberg contro la vendita delle indulgenze?',
      options: [
        { label: 'Martin Lutero', correct: true },
        { label: 'Giovanni Calvino', correct: false },
        { label: 'Erasmo da Rotterdam', correct: false },
        { label: 'Tommaso Moro', correct: false }
      ],
      hint: 'Tradusse la Bibbia in tedesco per renderla accessibile al popolo.',
      explanation: 'Martin Lutero avviò la Riforma Protestante nel 1517.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sto-s2-6',
      type: 'quiz',
      prompt: 'Quale celebre evento del 14 luglio 1789 a Parigi segnò l\'inizio della Rivoluzione Francese?',
      options: [
        { label: 'La presa della Bastiglia', correct: true },
        { label: 'La battaglia di Waterloo', correct: false },
        { label: 'L\'esecuzione di Napoleone', correct: false },
        { label: 'Il Congresso di Vienna', correct: false }
      ],
      hint: 'I cittadini assalirono l\'antica fortezza-prigione simbolo dell\'assolutismo monarchico.',
      explanation: 'La presa della Bastiglia il 14 luglio 1789 diede inizio alla Rivoluzione Francese.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sto-s3-5',
      type: 'quiz',
      prompt: 'In quale anno venne proclamato a Torino il Regno d\'Italia unito sotto la corona di Vittorio Emanuele II?',
      options: [
        { label: '1861', correct: true },
        { label: '1848', correct: false },
        { label: '1870', correct: false },
        { label: '1915', correct: false }
      ],
      hint: 'Il 17 marzo, al termine della Spedizione dei Mille guidata da Giuseppe Garibaldi.',
      explanation: 'Il 17 marzo 1861 il Parlamento di Torino proclamò il Regno d\'Italia.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sto-s3-6',
      type: 'quiz',
      prompt: 'Quale data si celebra ogni anno in Italia come Festa della Liberazione dal nazifascismo al termine della Seconda Guerra Mondiale?',
      options: [
        { label: '25 Aprile', correct: true },
        { label: '2 Giugno', correct: false },
        { label: '1 Maggio', correct: false },
        { label: '4 Novembre', correct: false }
      ],
      hint: 'Nel 1945 il Comitato di Liberazione Nazionale proclamò l\'insurrezione generale.',
      explanation: 'Il 25 Aprile 1945 è la ricorrenza nazionale della Liberazione d\'Italia.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sto-s3-7',
      type: 'quiz',
      prompt: 'Il 2 giugno 1946 gli italiani e per la prima volta anche le donne votarono al referendum istituzionale per scegliere tra:',
      options: [
        { label: 'Monarchia e Repubblica', correct: true },
        { label: 'Guerra e Pace', correct: false },
        { label: 'Alleanza e Neutralità', correct: false },
        { label: 'Presidenzialismo e Federalismo', correct: false }
      ],
      hint: 'Vinse la Repubblica e nacque l\'attuale forma di Stato italiana.',
      explanation: 'Il 2 giugno 1946 il popolo italiano scelse la Repubblica con suffragio universale.'
    }
  },
  {
    years: ['S1', 'S2'],
    round: {
      id: 'qb-sto-s1-m1',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascuna figura o istituzione medievale al suo significato storico.',
      leftItems: ['Sacro Romano Impero', 'Monaci amanuensi', 'I Feudi'],
      rightItems: ['Incoronazione di Carlo Magno (800 d.C.)', 'Copiavano a mano i codici antichi', 'Terre concesse dal sovrano ai vassalli'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: 'Carlo Magno unificò gran parte d\'Europa nell\'800 d.C.',
      explanation: 'Sacro Romano Impero = Carlo Magno; Amanuensi = salvaguardia della cultura; Feudi = terre dei vassalli.'
    }
  },
  {
    years: ['S3'],
    round: {
      id: 'qb-sto-s3-m1',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun grande evento storico dell\'età contemporanea al suo anno.',
      leftItems: ['Rivoluzione Francese', 'Unità d\'Italia', 'Nascita della Repubblica'],
      rightItems: ['1789', '1861', '1946'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      hint: '1789: Presa della Bastiglia; 1861: Regno d\'Italia; 1946: referendum istituzionale.',
      explanation: '1789: Rivoluzione Francese; 1861: Unità d\'Italia; 1946: Nascita della Repubblica.'
    }
  },
  {
    years: ['S3'],
    round: {
      id: 'qb-sto-s3-s1',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Metti in ordine cronologico questi eventi storici del Novecento.',
      sortItems: ['1914: Inizio 1ª Guerra Mondiale', '1939: Inizio 2ª Guerra Mondiale', '1946: Referendum Repubblica', '1948: Entrata in vigore Costituzione'],
      hint: 'La prima guerra mondiale precede la seconda; la Costituzione è entrata in vigore nel 1948.',
      explanation: '1914 (1ª Guerra) → 1939 (2ª Guerra) → 1946 (Repubblica) → 1948 (Costituzione).'
    }
  },

  // ── Integrazione percorsi: Primaria 1ª – 2ª (P1, P2) ──────────────
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-ext-1',
      type: 'quiz',
      prompt: 'Cosa usavano gli uomini antichi per illuminare la notte prima che ci fosse l\'elettricità?',
      options: [
        { label: 'Il fuoco e le torce', correct: true },
        { label: 'La lampadina', correct: false },
        { label: 'La torcia a batterie', correct: false }
      ],
      hint: 'La fiamma naturale produce luce e calore.',
      explanation: 'Prima della luce elettrica si usavano torce, candele e fuochi.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-ext-2',
      type: 'quiz',
      prompt: 'Quale parola indica il giorno che viene subito prima di oggi?',
      options: [
        { label: 'Ieri', correct: true },
        { label: 'Domani', correct: false },
        { label: 'Dopodomani', correct: false }
      ],
      hint: 'È il giorno appena passato.',
      explanation: 'Ieri è il giorno precedente a oggi; domani è il giorno successivo.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-ext-3',
      type: 'image',
      icon: 'pergamena',
      prompt: 'Cosa vedi nell\'immagine?',
      options: [
        { label: 'Un\'antica pergamena', correct: true },
        { label: 'Un computer portatile', correct: false },
        { label: 'Un libro stampato moderno', correct: false }
      ],
      hint: 'È un rotolo di carta antica usato prima dei libri stampati.',
      explanation: 'Gli scribi scrivevano su pergamene arrotolate.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-ext-4',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Tocca i momenti della giornata nell\'ordine in cui si susseguono.',
      items: ['Mattina', 'Pomeriggio', 'Sera', 'Notte'],
      hint: 'Ci si sveglia al mattino e si dorme la notte.',
      explanation: 'Mattina → Pomeriggio → Sera → Notte.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-ext-5',
      type: 'sequence',
      direction: 'tap',
      prompt: 'Tocca i giorni della settimana in ordine.',
      items: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì'],
      hint: 'Lunedì apre la settimana scolastica.',
      explanation: 'Lunedì, Martedì, Mercoledì, Giovedì.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-ext-6',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni oggetto antico al suo equivalente moderno.',
      leftItems: ['Candela', 'Carrozza a cavalli', 'Piuma d\'oca'],
      rightItems: ['Automobile', 'Penna a sfera', 'Lampadina'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Cosa usiamo oggi al posto di candele, carrozze e piume?',
      explanation: 'Candela ↔ Lampadina; Carrozza ↔ Automobile; Piuma ↔ Penna.'
    }
  },
  {
    years: ['P1', 'P2'],
    round: {
      id: 'qb-sto-p1-ext-7',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina i concetti del tempo dal passato verso il futuro.',
      sortItems: ['Ieri (passato)', 'Oggi (presente)', 'Domani (futuro)'],
      hint: 'Il giorno passato precede il presente.',
      explanation: 'Ieri → Oggi → Domani.'
    }
  },
  // ── Integrazione percorsi: Primaria 3ª – 5ª (P3, P4, P5) ──────────
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sto-p3-ext-1',
      type: 'quiz',
      prompt: 'Quale grande scoperta segnò la svolta nella vita dell\'uomo preistorico?',
      options: [
        { label: 'La scoperta del fuoco', correct: true },
        { label: 'L\'invenzione del treno', correct: false },
        { label: 'La costruzione delle autostrade', correct: false }
      ],
      hint: 'Permise di riscaldarsi, difendersi dagli animali e cuocere il cibo.',
      explanation: 'Il controllo del fuoco fu fondamentale per la sopravvivenza preistorica.'
    }
  },
  {
    years: ['P3', 'P4'],
    round: {
      id: 'qb-sto-p3-ext-2',
      type: 'quiz',
      prompt: 'Lungo le rive di quale grande fiume si sviluppò l\'antica civiltà egizia?',
      options: [
        { label: 'Fiume Nilo', correct: true },
        { label: 'Fiume Po', correct: false },
        { label: 'Fiume Tevere', correct: false },
        { label: 'Fiume Danubio', correct: false }
      ],
      hint: 'Le piene di questo fiume rendevano fertile la terra con il limo.',
      explanation: 'L\'antico Egitto sorse lungo il Nilo.'
    }
  },
  {
    years: ['P3', 'P4', 'P5'],
    round: {
      id: 'qb-sto-p3-ext-3',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ciascun popolo antico alla sua grande opera o caratteristica.',
      leftItems: ['Egizi', 'Sumeri', 'Romani'],
      rightItems: ['Invenzione della scrittura cuneiforme', 'Costruzione di acquedotti e strade', 'Costruzione delle piramidi'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Piramidi in Egitto, scrittura cuneiforme in Mesopotamia, acquedotti a Roma.',
      explanation: 'Egizi = Piramidi; Sumeri = Scrittura cuneiforme; Romani = Strade e acquedotti.'
    }
  },
  {
    years: ['P3', 'P4', 'P5'],
    round: {
      id: 'qb-sto-p3-ext-4',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Metti in ordine cronologico le grandi età della Preistoria e della Storia antica.',
      sortItems: ['Paleolitico (cacciatori nomadi)', 'Neolitico (agricoltura e villaggi)', 'Età dei Metalli', 'Civiltà della scrittura'],
      hint: 'Prima si cacciava nella pietra antica, poi nacque l\'agricoltura nel Neolitico.',
      explanation: 'Paleolitico → Neolitico → Età dei Metalli → Prime civiltà storiche.'
    }
  },
  {
    years: ['P4', 'P5', 'S1'],
    round: {
      id: 'qb-sto-p4-ext-1',
      type: 'quiz',
      prompt: 'In quale città greca nacque la prima forma di democrazia?',
      options: [
        { label: 'Atene', correct: true },
        { label: 'Sparta', correct: false },
        { label: 'Corinto', correct: false },
        { label: 'Tebe', correct: false }
      ],
      hint: 'La città del Partenone governata dall\'assemblea dei cittadini liberi.',
      explanation: 'Atene fu la culla della democrazia nella Grecia antica.'
    }
  },
  {
    years: ['P4', 'P5', 'S1'],
    round: {
      id: 'qb-sto-p4-ext-2',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni civiltà al fiume lungo cui è fiorita.',
      leftItems: ['Antichi Egizi', 'Mesopotamia (Sumeri/Babilonesi)', 'Antica Roma'],
      rightItems: ['Tevere', 'Nilo', 'Tigri ed Eufrate'],
      pairs: [[0, 1], [1, 2], [2, 0]],
      hint: 'Egizi sul Nilo, civiltà mesopotamiche tra Tigri ed Eufrate, Roma sul Tevere.',
      explanation: 'Egizi ↔ Nilo; Mesopotamia ↔ Tigri/Eufrate; Roma ↔ Tevere.'
    }
  },
  // ── Integrazione percorsi: Secondaria 1ª – 3ª (S1, S2, S3) ─────────
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-sto-s1-ext-1',
      type: 'quiz',
      prompt: 'In quale anno cadde l\'Impero Romano d\'Occidente, segnando l\'inizio del Medioevo?',
      options: [
        { label: '476 d.C.', correct: true },
        { label: '1492 d.C.', correct: false },
        { label: '313 d.C.', correct: false },
        { label: '1000 d.C.', correct: false }
      ],
      hint: 'Romolo Augustolo fu deposto dal re barbaro Odoacre.',
      explanation: 'Il 476 d.C. segna tradizionalmente la fine dell\'Età Antica e l\'inizio del Medioevo.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-sto-s1-ext-2',
      type: 'quiz',
      prompt: 'Quale navigatore genovese raggiunse l\'America nel 1492 aprendo l\'Età Moderna?',
      options: [
        { label: 'Cristoforo Colombo', correct: true },
        { label: 'Marco Polo', correct: false },
        { label: 'Ferdinando Magellano', correct: false },
        { label: 'Amerigo Vespucci', correct: false }
      ],
      hint: 'Partì da Palos con tre caravelle: Nina, Pinta e Santa Maria.',
      explanation: 'Cristoforo Colombo approdò alle Bahamas il 12 ottobre 1492.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-sto-s1-ext-3',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni data fondamentale all\'evento storico corrispondente.',
      leftItems: ['476 d.C.', '1492', '1789'],
      rightItems: ['Scoperta dell\'America', 'Presa della Bastiglia (Rivoluzione Francese)', 'Caduta dell\'Impero Romano d\'Occidente'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: '476 inizio Medioevo, 1492 Età Moderna, 1789 Età Contemporanea.',
      explanation: '476 = Caduta Roma; 1492 = America; 1789 = Rivoluzione Francese.'
    }
  },
  {
    years: ['S1', 'S2', 'S3'],
    round: {
      id: 'qb-sto-s1-ext-4',
      type: 'dragdrop',
      mode: 'sort',
      prompt: 'Ordina cronologicamente le quattro grandi epoche storiche dell\'umanità.',
      sortItems: ['Età Antica', 'Medioevo', 'Età Moderna', 'Età Contemporanea'],
      hint: 'Dall\'antichità classica fino ai giorni nostri.',
      explanation: 'Età Antica → Medioevo → Età Moderna → Età Contemporanea.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sto-s3-ext-1',
      type: 'quiz',
      prompt: 'In quale anno è stata proclamata l\'Unità d\'Italia con Vittorio Emanuele II re d\'Italia?',
      options: [
        { label: '1861', correct: true },
        { label: '1848', correct: false },
        { label: '1870', correct: false },
        { label: '1915', correct: false }
      ],
      hint: 'Il 17 marzo di quell\'anno nacque il Regno d\'Italia a Torino.',
      explanation: 'Il 17 marzo 1861 fu proclamato il Regno d\'Italia.'
    }
  },
  {
    years: ['S2', 'S3'],
    round: {
      id: 'qb-sto-s3-ext-2',
      type: 'dragdrop',
      mode: 'match',
      prompt: 'Abbina ogni personaggio storico al suo ruolo.',
      leftItems: ['Giuseppe Garibaldi', 'Camillo Benso Conte di Cavour', 'Leonardo da Vinci'],
      rightItems: ['Primo ministro del Regno di Sardegna', 'Genio e artista del Rinascimento', 'Eroe dei Due Mondi e guida dei Mille'],
      pairs: [[0, 2], [1, 0], [2, 1]],
      hint: 'Garibaldi guidò la Spedizione dei Mille; Cavour fu stratega politico; Leonardo dipinse la Gioconda.',
      explanation: 'Garibaldi = Spedizione dei Mille; Cavour = Statista del Risorgimento; Leonardo = Rinascimento.'
    }
  },


    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-01",
        type: "quiz",
        prompt: "Se oggi è mercoledì, quale giorno della settimana era ieri?",
        options: [
          { label: "Giovedì", correct: false },
          { label: "Martedì", correct: true },
          { label: "Lunedì", correct: false },
          { label: "Venerdì", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Ieri indica il giorno appena passato. Prima del mercoledì c'è il martedì."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-02",
        type: "quiz",
        prompt: "Quale azione si compie 'dopo' essersi svegliati la mattina?",
        options: [
          { label: "Dormire tutta la notte", correct: false },
          { label: "Sognare a occhi chiusi", correct: false },
          { label: "Fare colazione", correct: true },
          { label: "Spegnere la sveglia la sera", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Dopo il risveglio mattutino si fa colazione per iniziare la giornata."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-03",
        type: "quiz",
        prompt: "In quale stagione cadono molte foglie dagli alberi e inizia la scuola?",
        options: [
          { label: "Primavera", correct: false },
          { label: "Estate", correct: false },
          { label: "Inverno", correct: false },
          { label: "Autunno", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "In autunno le foglie ingialliscono e cadono, e a settembre comincia la scuola."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-04",
        type: "quiz",
        prompt: "Cosa indica una cosa successa 'nel passato'?",
        options: [
          { label: "Una cosa che è già accaduta", correct: true },
          { label: "Una cosa che succederà domani", correct: false },
          { label: "Una cosa che accade proprio adesso", correct: false },
          { label: "Un sogno futuro", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il passato raccoglie tutti gli eventi e i fatti che sono già avvenuti prima di oggi."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-05",
        type: "quiz",
        prompt: "Quale parte della giornata viene subito prima della notte?",
        options: [
          { label: "Il mattino presto", correct: false },
          { label: "La sera", correct: true },
          { label: "Il mezzogiorno", correct: false },
          { label: "L'alba", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La sera precede la notte, momento in cui ci si prepara per dormire."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-06",
        type: "quiz",
        prompt: "Se oggi è sabato, quale giorno sarà 'dopodomani'?",
        options: [
          { label: "Domenica", correct: false },
          { label: "Martedì", correct: false },
          { label: "Lunedì", correct: true },
          { label: "Venerdì", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Domani è domenica, dopodomani è il giorno successivo: lunedì."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-07",
        type: "quiz",
        prompt: "In quale stagione fa molto caldo e andiamo al mare in vacanza?",
        options: [
          { label: "Inverno", correct: false },
          { label: "Autunno", correct: false },
          { label: "Primavera", correct: false },
          { label: "Estate", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'estate è la stagione più calda dell'anno e coincide con le vacanze estive."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-08",
        type: "quiz",
        prompt: "Quale strumento con le lancette usiamo a casa per leggere che ore sono?",
        options: [
          { label: "L'orologio", correct: true },
          { label: "Il termometro", correct: false },
          { label: "La bilancia", correct: false },
          { label: "Il righello", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'orologio misura il trascorrere delle ore, dei minuti e dei secondi."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-09",
        type: "quiz",
        prompt: "Quanti giorni compongono una settimana intera?",
        options: [
          { label: "5", correct: false },
          { label: "7", correct: true },
          { label: "10", correct: false },
          { label: "12", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I giorni della settimana sono 7: lunedì, martedì, mercoledì, giovedì, venerdì, sabato e domenica."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-10",
        type: "quiz",
        prompt: "Cosa facciamo 'prima' di metterci le scarpe per uscire?",
        options: [
          { label: "Allacciare le scarpe", correct: false },
          { label: "Camminare per strada", correct: false },
          { label: "Infilare le calze", correct: true },
          { label: "Toglierci le scarpe", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "In un ordine cronologico corretto, prima si infilano le calze e poi le scarpe."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-11",
        type: "quiz",
        prompt: "Qual è il primo mese dell'anno sul calendario?",
        options: [
          { label: "Dicembre", correct: false },
          { label: "Marzo", correct: false },
          { label: "Settembre", correct: false },
          { label: "Gennaio", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'anno solare comincia il primo giorno di gennaio."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-12",
        type: "quiz",
        prompt: "Cosa significa la parola 'futuro'?",
        options: [
          { label: "Ciò che deve ancora accadere", correct: true },
          { label: "Ciò che è successo un anno fa", correct: false },
          { label: "Il momento in cui stiamo parlando", correct: false },
          { label: "Un ricordo antico", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il futuro comprende tutto il tempo che verrà dopo il momento presente."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-13",
        type: "quiz",
        prompt: "Quale stagione porta i primi fiori sugli alberi e le rondini nel cielo?",
        options: [
          { label: "Inverno", correct: false },
          { label: "Primavera", correct: true },
          { label: "Autunno", correct: false },
          { label: "Novembre", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La primavera è la stagione del risveglio della natura e della fioritura."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-14",
        type: "quiz",
        prompt: "Qual è l'ultimo giorno della settimana che conclude il fine settimana?",
        options: [
          { label: "Venerdì", correct: false },
          { label: "Lunedì", correct: false },
          { label: "Domenica", correct: true },
          { label: "Giovedì", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La settimana termina con la domenica, giorno di riposo prima del lunedì."
      }
    },

    {
      years: ["P1", "P2"],
      round: {
        id: "qb-sto-exp-p1-15",
        type: "quiz",
        prompt: "Se guardiamo le foto di quando eri un neonato nella culla, guardiamo fatti del...",
        options: [
          { label: "Futuro", correct: false },
          { label: "Presente", correct: false },
          { label: "Dopodomani", correct: false },
          { label: "Passato", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La tua nascita e i primi mesi di vita appartengono al tuo passato."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-16",
        type: "quiz",
        prompt: "Un vaso di terracotta antico ritrovato sottoterra è una fonte...",
        options: [
          { label: "Materiale (o reperto)", correct: true },
          { label: "Orale", correct: false },
          { label: "Scritta", correct: false },
          { label: "Astratta", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Gli oggetti concreti fabbricati nel passato sono fonti materiali o reperti archeologici."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-17",
        type: "quiz",
        prompt: "Il racconto a voce di un nonno sulla sua infanzia è una fonte...",
        options: [
          { label: "Materiale", correct: false },
          { label: "Orale", correct: true },
          { label: "Scritta", correct: false },
          { label: "Fossile", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Le testimonianze trasmesse a voce da persone che hanno vissuto un evento sono fonti orali."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-18",
        type: "quiz",
        prompt: "Come si chiama lo studioso che scava il terreno alla ricerca di reperti del passato?",
        options: [
          { label: "Geografo", correct: false },
          { label: "Botanico", correct: false },
          { label: "Archeologo", correct: true },
          { label: "Astronauta", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'archeologo organizza scavi sul terreno per trovare e studiare reperti di epoche passate."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-19",
        type: "quiz",
        prompt: "Una vecchia fotografia in bianco e nero conservata in un album è una fonte...",
        options: [
          { label: "Orale", correct: false },
          { label: "Scritta", correct: false },
          { label: "Sonora", correct: false },
          { label: "Visiva (o iconografica)", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Fotografie, dipinti e disegni sono fonti visive che ci mostrano volti e luoghi del passato."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-20",
        type: "quiz",
        prompt: "Quale strumento grafico usano gli storici per ordinare i fatti dal più antico al più recente?",
        options: [
          { label: "La linea del tempo", correct: true },
          { label: "La bussola", correct: false },
          { label: "La tabella pitagorica", correct: false },
          { label: "Il termometro", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La linea del tempo orientata da sinistra a destra ordina cronologicamente gli eventi."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-21",
        type: "quiz",
        prompt: "Una lettera scritta a mano da un soldato cento anni fa è una fonte...",
        options: [
          { label: "Orale", correct: false },
          { label: "Scritta", correct: true },
          { label: "Materiale muta", correct: false },
          { label: "Invisibile", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Lettere, diari, leggi e giornali d'epoca costituiscono fonti scritte."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-22",
        type: "quiz",
        prompt: "Nell'albero genealogico della famiglia, chi appartiene alla generazione più anziana?",
        options: [
          { label: "I figli", correct: false },
          { label: "I genitori", correct: false },
          { label: "I bisnonni", correct: true },
          { label: "I cugini piccoli", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I bisnonni sono nati prima dei nonni e dei genitori, quindi formano la generazione più antica."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-23",
        type: "quiz",
        prompt: "Che cos'è un 'fossile' studiato dal paleontologo?",
        options: [
          { label: "Una moneta d'oro medievale", correct: false },
          { label: "Un libro di favole", correct: false },
          { label: "Un minerale sintetico", correct: false },
          { label: "Il resto o l'impronta pietrificata di un essere vivente antico", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I fossili sono resti di piante o animali del passato conservati nelle rocce per milioni di anni."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-24",
        type: "quiz",
        prompt: "Se mettiamo in ordine di tempo la vita di una persona, cosa viene al primo posto?",
        options: [
          { label: "La nascita", correct: true },
          { label: "La scuola primaria", correct: false },
          { label: "L'università", correct: false },
          { label: "Il matrimonio", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La nascita segna l'inizio cronologico assoluto della vita di ciascun essere umano."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-25",
        type: "quiz",
        prompt: "Chi è lo studioso che ricostruisce la storia confrontando tutte le fonti disponibili?",
        options: [
          { label: "Il metereologo", correct: false },
          { label: "Lo storico", correct: true },
          { label: "L'architetto", correct: false },
          { label: "Il marinaio", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Lo storico raccoglie, esamina e interpreta le fonti per spiegare cosa è accaduto in passato."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-26",
        type: "quiz",
        prompt: "Quale periodo dura esattamente 100 anni?",
        options: [
          { label: "Un decennio", correct: false },
          { label: "Un millennio", correct: false },
          { label: "Un secolo", correct: true },
          { label: "Un lustro", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Un secolo equivale a un arco temporale lungo 100 anni consecutivi."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-27",
        type: "quiz",
        prompt: "Se due eventi accadono contemporaneamente nello stesso istante, diciamo che avvengono in...",
        options: [
          { label: "Successione", correct: false },
          { label: "Ritardo", correct: false },
          { label: "Passato remoto", correct: false },
          { label: "Contemporaneità", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La contemporaneità descrive fatti che si svolgono nello stesso momento temporale."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-28",
        type: "quiz",
        prompt: "Una medaglia di bronzo vinta nel 1920 è un esempio di fonte...",
        options: [
          { label: "Materiale", correct: true },
          { label: "Orale", correct: false },
          { label: "Naturale", correct: false },
          { label: "Elettronica", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Un manufatto reale come una medaglia o uno strumento è una fonte materiale."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-29",
        type: "quiz",
        prompt: "Come chiamiamo il disegno che mostra tutti i legami di parentela di una famiglia?",
        options: [
          { label: "Mappa catastale", correct: false },
          { label: "Albero genealogico", correct: true },
          { label: "Termometro generazionale", correct: false },
          { label: "Linea metropolitana", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'albero genealogico rappresenta graficamente le diverse generazioni e i legami di una famiglia."
      }
    },

    {
      years: ["P2", "P3"],
      round: {
        id: "qb-sto-exp-p2-30",
        type: "quiz",
        prompt: "Un'antica registrazione audio con la voce di una cantante del 1930 è una fonte...",
        options: [
          { label: "Fossile", correct: false },
          { label: "Scritta", correct: false },
          { label: "Sonora (o orale)", correct: true },
          { label: "Geologica", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Le registrazioni di suoni, musiche e discorsi registrati sono fonti orali o sonore."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-31",
        type: "quiz",
        prompt: "Come vivevano gli ominidi e gli esseri umani durante il Paleolitico?",
        options: [
          { label: "Abitavano in grandi grattacieli di cemento", correct: false },
          { label: "Vivevano solo di commercio marittimo", correct: false },
          { label: "Lavoravano l'acciaio e il ferro", correct: false },
          { label: "Erano nomadi: cacciavano animali e raccoglievano frutti", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Nel Paleolitico gli uomini erano cacciatori-raccoglitori nomadi che si spostavano seguendo le prede."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-32",
        type: "quiz",
        prompt: "Quale grande scoperta rivoluzionò la vita di Homo Erectus, difendendolo dal freddo e dagli animali?",
        options: [
          { label: "Il controllo e l'accensione del fuoco", correct: true },
          { label: "L'invenzione dell'aeroplano", correct: false },
          { label: "La stampa a caratteri mobili", correct: false },
          { label: "La bussola magnetica", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Homo Erectus imparò a conservare e produrre il fuoco per cuocere il cibo, scaldarsi e difendersi."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-33",
        type: "quiz",
        prompt: "Chi era 'Lucy', il celebre scheletro fossile scoperto nel 1974 in Etiopia?",
        options: [
          { label: "Un dinosauro carnivoro gigante", correct: false },
          { label: "Un esemplare di Australopithecus afarensis", correct: true },
          { label: "Una regina dell'antico Egitto", correct: false },
          { label: "Una donna guerriera romana", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Lucy era un'australopitecina bipede vissuta in Africa circa 3,2 milioni di anni fa."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-34",
        type: "quiz",
        prompt: "Quale capacità diede a Homo Habilis il suo nome scientifico?",
        options: [
          { label: "La capacità di navigare con barche a vela", correct: false },
          { label: "La scrittura alfabetica", correct: false },
          { label: "La capacità di fabbricare i primi strumenti in pietra (chopper)", correct: true },
          { label: "La lavorazione del vetro", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Homo Habilis ('abile') sapeva scheggiare i ciottoli di selce su un solo lato per creare taglienti chopper."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-35",
        type: "quiz",
        prompt: "Quale grande trasformazione segnò l'inizio del Neolitico ('età della pietra nuova')?",
        options: [
          { label: "La scomparsa della caccia", correct: false },
          { label: "L'invenzione dei treni a vapore", correct: false },
          { label: "Il raffreddamento di tutta la Terra", correct: false },
          { label: "La nascita dell'agricoltura e dell'allevamento", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Nel Neolitico l'uomo iniziò a coltivare piante e addomesticare animali, diventando sedentario."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-36",
        type: "quiz",
        prompt: "Cosa diventò l'uomo quando smise di spostarsi continuamente e costruì villaggi stabili?",
        options: [
          { label: "Sedentario", correct: true },
          { label: "Nomade", correct: false },
          { label: "Pellegrino", correct: false },
          { label: "Marinaro", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'uomo stanziale che vive stabilmente nello stesso posto con case fisse è detto sedentario."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-37",
        type: "quiz",
        prompt: "Cosa sono le pitture rupestri trovate in grotte come Lascaux e Altamira?",
        options: [
          { label: "Scritte geroglifiche su fogli di carta", correct: false },
          { label: "Dipinti preistorici sulle pareti rocciose di animali e scene di caccia", correct: true },
          { label: "Quadri a olio su tela rinascimentali", correct: false },
          { label: "Mappe stradali romane", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Nel Paleolitico superiore l'Homo Sapiens dipingeva bisonti, cavalli e cervi sulle pareti delle grotte."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-38",
        type: "quiz",
        prompt: "Quale pietra molto dura e vetrosa veniva scheggiata per creare punte di freccia e lame?",
        options: [
          { label: "Il gesso", correct: false },
          { label: "L'arenaria friabile", correct: false },
          { label: "La selce", correct: true },
          { label: "L'argilla cruda", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La selce e l'ossidiana erano pietre perfette per ricavare bordi affilati e taglienti."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-39",
        type: "quiz",
        prompt: "Quale tipo di case su pali di legno piantati nell'acqua o nelle paludi costruivano nel Neolitico?",
        options: [
          { label: "I castelli merlati", correct: false },
          { label: "I grattacieli", correct: false },
          { label: "Le tende igloo", correct: false },
          { label: "Le palafitte", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Le palafitte sorgevano su piattaforme sostenute da pali lungo fiumi e laghi per protezione."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-40",
        type: "quiz",
        prompt: "Quale specie umana convivette per lungo tempo in Europa con Homo Sapiens prima di estinguersi?",
        options: [
          { label: "L'Uomo di Neanderthal", correct: true },
          { label: "L'Ardipiteco", correct: false },
          { label: "L'Australopiteco", correct: false },
          { label: "Homo Georgicus", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Homo Neanderthalensis viveva in Europa e Asia occidentale ed era robusto e adatto al clima freddo."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-41",
        type: "quiz",
        prompt: "Quale fu il primo metallo a essere fuso e lavorato alla fine del Neolitico?",
        options: [
          { label: "L'acciaio inossidabile", correct: false },
          { label: "Il rame", correct: true },
          { label: "L'alluminio", correct: false },
          { label: "Il titanio", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il rame fu il primo metallo lavorato grazie alla sua temperatura di fusione accessibile nei forni a legna."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-42",
        type: "quiz",
        prompt: "Cosa inventarono le donne e gli uomini del Neolitico per fabbricare tessuti per vestirsi?",
        options: [
          { label: "La macchina da cucire a motore", correct: false },
          { label: "La plastica sintetica", correct: false },
          { label: "Il telaio a pesi e la filatura delle fibre", correct: true },
          { label: "Il ferro da stiro", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Con la lana delle pecore e il lino coltivato, l'uomo neolitico usò fuso e telaio per creare abiti tessuti."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-43",
        type: "quiz",
        prompt: "Quale materiale morbido modellavano con le mani e poi cuocevano al forno per creare recipienti e vasi?",
        options: [
          { label: "Il marmo grezzo", correct: false },
          { label: "La ghisa", correct: false },
          { label: "Il sughero", correct: false },
          { label: "L'argilla (ceramica)", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'argilla cotta diede origine alla ceramica, fondamentale per conservare granaglie e liquidi."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-44",
        type: "quiz",
        prompt: "Quale grande evento storico segna convenzionalmente la fine della Preistoria e l'inizio della Storia?",
        options: [
          { label: "L'invenzione della scrittura", correct: true },
          { label: "La caduta di un meteorite", correct: false },
          { label: "L'estinzione dei mammut", correct: false },
          { label: "La scoperta dell'America", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Con la scrittura (circa 3200 a.C.) cominciano le prime fonti scritte, segnando il passaggio alla Storia."
      }
    },

    {
      years: ["P3", "P4"],
      round: {
        id: "qb-sto-exp-p3-45",
        type: "quiz",
        prompt: "Quale lega metallica molto resistente si ottiene unendo rame e stagno fusi insieme?",
        options: [
          { label: "L'ottone plastico", correct: false },
          { label: "Il bronzo", correct: true },
          { label: "L'argento puro", correct: false },
          { label: "Il piombo dolce", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Dall'unione di rame e stagno nacque il bronzo, che diede nome a un'intera età della civiltà umana."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-46",
        type: "quiz",
        prompt: "Tra quali due grandi fiumi sorgeva la fertile regione della Mesopotamia?",
        options: [
          { label: "Nilo e Giordano", correct: false },
          { label: "Indo e Gange", correct: false },
          { label: "Tigri ed Eufrate", correct: true },
          { label: "Danubio e Reno", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Mesopotamia significa 'terra tra due fiumi' e indicava la piana tra il Tigri e l'Eufrate."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-47",
        type: "quiz",
        prompt: "Quale popolo inventò la prima scrittura della storia, detta cuneiforme per i segni a forma di cuneo?",
        options: [
          { label: "Gli Egizi", correct: false },
          { label: "I Fenici", correct: false },
          { label: "I Romani", correct: false },
          { label: "I Sumeri", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I Sumeri svilupparono la scrittura cuneiforme incidendo tavolette d'argilla fresca con uno stilo."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-48",
        type: "quiz",
        prompt: "Come si chiamava l'imponente tempio a gradoni a terrazze sovrapposte tipico delle città sumere?",
        options: [
          { label: "Ziggurat", correct: true },
          { label: "Piramide a punta", correct: false },
          { label: "Colosseo", correct: false },
          { label: "Partenone", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La ziggurat era un tempio monumentale a gradoni che collegava idealmente la terra con il cielo."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-49",
        type: "quiz",
        prompt: "Quale re babilonese fece incidere su una stele di basalto il più celebre codice di leggi scritte dell'antichità?",
        options: [
          { label: "Nabucodonosor", correct: false },
          { label: "Hammurabi", correct: true },
          { label: "Gilgamesh", correct: false },
          { label: "Ramses II", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il Codice di Hammurabi (circa 1750 a.C.) raccoglieva 282 leggi basate sulla legge del taglione."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-50",
        type: "quiz",
        prompt: "Quale fiume sacro fertilizzava le terre dell'antico Egitto con le sue periodiche inondazioni di limo?",
        options: [
          { label: "Il Giordano", correct: false },
          { label: "Il Po", correct: false },
          { label: "Il Nilo", correct: true },
          { label: "L'Oronte", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Le piene estive del Nilo depositavano sui campi il limo, una fanghiglia scura e fertilissima."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-51",
        type: "quiz",
        prompt: "Come si chiamava il sovrano assoluto dell'Egitto, considerato dai sudditi una vera divinità in terra?",
        options: [
          { label: "Il Console", correct: false },
          { label: "Il Califfo", correct: false },
          { label: "Il Patrizio", correct: false },
          { label: "Il Faraone", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il Faraone era il sovrano politico e religioso supremo, considerato figlio del dio Sole Ra o di Osiride."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-52",
        type: "quiz",
        prompt: "Quale scrittura usavano gli Egizi, formata da piccoli disegni e simboli sacri?",
        options: [
          { label: "I geroglifici", correct: true },
          { label: "L'alfabeto fenicio", correct: false },
          { label: "I cunei sumerici", correct: false },
          { label: "L'alfabeto cirillico", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I geroglifici erano 'segni sacri incisi' dipinti su papiro o scolpiti sui muri di templi e tombe."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-53",
        type: "quiz",
        prompt: "A cosa servivano le gigantesche piramidi di Giza (Cheope, Chefren e Micerino)?",
        options: [
          { label: "Erano magazzini per conservare il grano della città", correct: false },
          { label: "Erano tombe monumentali destinate a conservare il corpo mummificato del faraone", correct: true },
          { label: "Erano fortezze militari difensive", correct: false },
          { label: "Erano osservatori solari aperti al pubblico", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Le piramidi furono erette nell'Antico Regno come tombe eterne per accogliere il corpo del faraone."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-54",
        type: "quiz",
        prompt: "Quale grande innovazione nella scrittura fu donata al mondo dai mercanti e marinai Fenici?",
        options: [
          { label: "I geroglifici su pietra dura", correct: false },
          { label: "La numerazione araba con lo zero", correct: false },
          { label: "L'alfabeto fonetico con circa 22 segni corrispondenti a suoni", correct: true },
          { label: "La scrittura ideografica a disegni", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I Fenici inventarono un alfabeto fonetico semplice in cui ogni segno rappresentava un suono consonantico."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-55",
        type: "quiz",
        prompt: "Quale preziosa tintura rossa ricavavano i Fenici da un piccolo mollusco marino chiamato murice?",
        options: [
          { label: "L'indaco", correct: false },
          { label: "L'oro liquido", correct: false },
          { label: "La pece nera", correct: false },
          { label: "La porpora", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Dalla lavorazione del murice i Fenici estraevano la porpora, colorante pregiato riservato a re e nobili."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-56",
        type: "quiz",
        prompt: "Quale antica città fenicia sul golfo di Tunisi divenne una potente metropoli del Mediterraneo?",
        options: [
          { label: "Cartagine", correct: true },
          { label: "Atene", correct: false },
          { label: "Babilonia", correct: false },
          { label: "Menfi", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Cartagine, fondata dai Fenici di Tiro nel IX secolo a.C., divenne regina del commercio marittimo."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-57",
        type: "quiz",
        prompt: "Quale civiltà fiorì sull'isola di Creta, nota per i suoi splendidi palazzi senza mura e la tauromachia?",
        options: [
          { label: "La civiltà Romana", correct: false },
          { label: "La civiltà Minoica (Cretese)", correct: true },
          { label: "La civiltà Assira", correct: false },
          { label: "La civiltà Ittita", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La civiltà minoica (dal re Minosse) era pacifica, mercantile e famosa per il palazzo di Cnosso."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-58",
        type: "quiz",
        prompt: "Quale popolo dell'antichità si distinse per essere monoteista, adorando un solo Dio unico (Jahvè)?",
        options: [
          { label: "I Sumeri", correct: false },
          { label: "Gli Assiri", correct: false },
          { label: "Gli Ebrei", correct: true },
          { label: "I Greci", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "A differenza delle popolazioni politeiste vicine, gli Ebrei credevano in un unico Dio creatore."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-59",
        type: "quiz",
        prompt: "Quale popolo bellicoso dell'alta Mesopotamia costruì un potente impero con capitale a Ninive?",
        options: [
          { label: "I Cretesi", correct: false },
          { label: "I Fenici", correct: false },
          { label: "Gli Etruschi", correct: false },
          { label: "Gli Assiri", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Gli Assiri avevano un esercito formidabile dotato di cavalleria, armi in ferro e macchine d'assedio."
      }
    },

    {
      years: ["P4", "P5"],
      round: {
        id: "qb-sto-exp-p4-60",
        type: "quiz",
        prompt: "Chi era lo scriba nell'antico Egitto e in Mesopotamia?",
        options: [
          { label: "Uno specialista istruito che sapeva leggere, scrivere e tenere i conti dello Stato", correct: true },
          { label: "Il comandante supremo delle navi da guerra", correct: false },
          { label: "Il sacerdote che curava le mummie", correct: false },
          { label: "Un contadino addetto ai canali di bonifica", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Gli scribi erano funzionari molto rispettati che annotavano raccolti, leggi e registri statali."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-61",
        type: "quiz",
        prompt: "Come venivano chiamate le città-stato indipendenti della Grecia antica?",
        options: [
          { label: "Contrade", correct: false },
          { label: "Poleis", correct: true },
          { label: "Feudi", correct: false },
          { label: "Province", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La polis era la città-stato greca autonoma, formata dal centro urbano e dalle campagne circostanti."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-62",
        type: "quiz",
        prompt: "In quale città greca nacque la 'democrazia', cioè il governo del popolo riunito nell'assemblea (ecclesìa)?",
        options: [
          { label: "Sparta", correct: false },
          { label: "Corinto", correct: false },
          { label: "Atene", correct: true },
          { label: "Tebe", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Ad Atene, grazie alle riforme di Solone, Clistene e Pericle, nacque la prima forma di democrazia diretta."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-63",
        type: "quiz",
        prompt: "Quale città greca era famosa per la sua rigida disciplina militare e il governo oligarchico?",
        options: [
          { label: "Atene", correct: false },
          { label: "Delfi", correct: false },
          { label: "Olimpia", correct: false },
          { label: "Sparta", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Sparta educava tutti i suoi cittadini (spartiati) all'arte della guerra e al sacrificio per la patria."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-64",
        type: "quiz",
        prompt: "In onore di quale dio greco venivano celebrate le prime Olimpiadi ogni quattro anni a Olimpia?",
        options: [
          { label: "Zeus", correct: true },
          { label: "Apollo", correct: false },
          { label: "Ares", correct: false },
          { label: "Poseidone", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I Giochi Olimpici antichi si svolgevano nel santuario di Olimpia in onore del padre degli dei, Zeus."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-65",
        type: "quiz",
        prompt: "Chi fu il giovane re macedone che conquistò l'immenso Impero Persiano e diffuse l'Ellenismo?",
        options: [
          { label: "Pericle", correct: false },
          { label: "Alessandro Magno", correct: true },
          { label: "Leonida", correct: false },
          { label: "Filippo II", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Alessandro Magno giunse fino all'Indo, fondando decine di città e unendo cultura greca e orientale."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-66",
        type: "quiz",
        prompt: "Secondo la tradizione, chi fu il primo leggendario re e fondatore di Roma nel 753 a.C.?",
        options: [
          { label: "Numa Pompilio", correct: false },
          { label: "Tarquinio il Superbo", correct: false },
          { label: "Romolo", correct: true },
          { label: "Giulio Cesare", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Secondo la leggenda Romolo fondò Roma sul colle Palatino il 21 aprile del 753 a.C."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-67",
        type: "quiz",
        prompt: "Dopo la fine della monarchia nel 509 a.C., quale forma di governo fu instaurata a Roma?",
        options: [
          { label: "L'Impero assoluto", correct: false },
          { label: "La Dittatura ereditaria", correct: false },
          { label: "Il Feudalesimo", correct: false },
          { label: "La Repubblica", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Cacciato Tarquinio il Superbo, Roma divenne una repubblica guidata da due consoli eletti annualmente."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-68",
        type: "quiz",
        prompt: "Chi erano i due gruppi sociali in contrasto nella Roma repubblicana?",
        options: [
          { label: "Patrizi (nobili) e Plebei (popolo)", correct: true },
          { label: "Sumeri e Babilonesi", correct: false },
          { label: "Cavalieri e Vassalli", correct: false },
          { label: "Gladiatori e Imperatori", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I patrizi detenevano terre e potere politico, mentre i plebei lottarono per conquistare diritti e tribuni."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-69",
        type: "quiz",
        prompt: "Contro quale potente città fenicia del Nord Africa Roma combatté le tre 'Guerre Puniche'?",
        options: [
          { label: "Alessandria d'Egitto", correct: false },
          { label: "Cartagine", correct: true },
          { label: "Bisanzio", correct: false },
          { label: "Tiro", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Le tre guerre puniche videro Roma scontrarsi con Cartagine per il controllo del Mar Mediterraneo."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-70",
        type: "quiz",
        prompt: "Quale celebre generale cartaginese attraversò le Alpi con elefanti da guerra durante la Seconda Guerra Punica?",
        options: [
          { label: "Amilcare", correct: false },
          { label: "Scipione", correct: false },
          { label: "Annibale", correct: true },
          { label: "Pirro", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Annibale Barca valicò i Pirenei e le Alpi infliggendo a Roma dure sconfitte prima di essere battuto a Zama."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-71",
        type: "quiz",
        prompt: "Quale generale e dittatore a vita romano fu assassinato in Senato alle Idi di Marzo del 44 a.C.?",
        options: [
          { label: "Pompeo Magno", correct: false },
          { label: "Cicerone", correct: false },
          { label: "Augusto", correct: false },
          { label: "Giulio Cesare", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Giulio Cesare fu pugnalato a morte da un gruppo di senatori guidati da Bruto e Cassio nel 44 a.C."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-72",
        type: "quiz",
        prompt: "Chi divenne il primo vero 'imperatore' di Roma assumendo il titolo di Augusto nel 27 a.C.?",
        options: [
          { label: "Ottaviano Augusto", correct: true },
          { label: "Nerone", correct: false },
          { label: "Traiano", correct: false },
          { label: "Costantino", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Ottaviano, figlio adottivo di Cesare, inaugurò il principato e l'epoca dell'Impero con il nome di Augusto."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-73",
        type: "quiz",
        prompt: "Quale popolo dell'Italia antica abitava in Etruria (Toscana, Umbria e Lazio) ed era abile nella metallurgia e nell'arte divinatoria?",
        options: [
          { label: "I Celti", correct: false },
          { label: "Gli Etruschi", correct: true },
          { label: "I Sanniti", correct: false },
          { label: "I Liguri", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Gli Etruschi edificarono floride città confederate e influenzarono profondamente la cultura romana arcaica."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-74",
        type: "quiz",
        prompt: "Come chiamavano i Romani il Mar Mediterraneo, circondato interamente dalle loro province?",
        options: [
          { label: "Oceano Atlantico", correct: false },
          { label: "Mare Magnum", correct: false },
          { label: "Mare Nostrum", correct: true },
          { label: "Pontus Euxinus", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "'Mare Nostrum' significava 'il nostro mare', poiché Roma controllava tutte le coste del Mediterraneo."
      }
    },

    {
      years: ["P5", "S1"],
      round: {
        id: "qb-sto-exp-p5-75",
        type: "quiz",
        prompt: "In quale anno avvenne convenzionalmente la caduta dell'Impero Romano d'Occidente sotto la spinta delle invasioni barbariche?",
        options: [
          { label: "753 a.C.", correct: false },
          { label: "1492 d.C.", correct: false },
          { label: "313 d.C.", correct: false },
          { label: "476 d.C.", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Nel 476 d.C. il re barbaro Odoacre depose l'ultimo imperatore d'Occidente Romolo Augustolo, chiudendo l'Età Antica."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-76",
        type: "quiz",
        prompt: "Quale regola istituì San Benedetto da Norcia nel suo celebre monastero di Montecassino nel 529?",
        options: [
          { label: "'Ora et labora' (Prega e lavora)", correct: true },
          { label: "'Mors tua vita mea'", correct: false },
          { label: "'Carpe diem'", correct: false },
          { label: "'Pacta sunt servanda'", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La regola benedettina alternava preghiera spirituale, meditazione e lavoro manuale o intellettuale."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-77",
        type: "quiz",
        prompt: "In quale anno e notte Carlo Magno fu incoronato dal Papa imperatore del Sacro Romano Impero a Roma?",
        options: [
          { label: "Anno 476", correct: false },
          { label: "Notte di Natale dell'anno 800", correct: true },
          { label: "Anno 1000", correct: false },
          { label: "Anno 1066", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Papa Leone III incoronò re Carlo Magno imperatore nella basilica di San Pietro la notte di Natale dell'800."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-78",
        type: "quiz",
        prompt: "Come si chiamava il legame di fedeltà e sottomissione con cui un sovrano concedeva un feudo a un nobile?",
        options: [
          { label: "Vendita all'incanto", correct: false },
          { label: "Plebiscite popolare", correct: false },
          { label: "Omaggio feudale (o vassallaggio)", correct: true },
          { label: "Arruolamento mercenario", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Nella cerimonia dell'omaggio il vassallo giurava fedeltà al signore in cambio di protezione e di un feudo."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-79",
        type: "quiz",
        prompt: "Quale profeta fondò la religione islamica nella penisola arabica all'inizio del VII secolo?",
        options: [
          { label: "Abramo", correct: false },
          { label: "Zoroastro", correct: false },
          { label: "Saladino", correct: false },
          { label: "Maometto (Muhammad)", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Maometto predicò l'Islam dopo aver ricevuto le rivelazioni raccolte nel testo sacro del Corano."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-80",
        type: "quiz",
        prompt: "Quale imperatore d'Oriente promulgò il 'Corpus Iuris Civilis' e riconquistò l'Italia con i generali Belisario e Narsete?",
        options: [
          { label: "Giustiniano I", correct: true },
          { label: "Costantino", correct: false },
          { label: "Teodosio", correct: false },
          { label: "Basilio II", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Giustiniano (527-565) riordinò l'intero diritto romano e costruì la cattedrale di Santa Sofia a Costantinopoli."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-81",
        type: "quiz",
        prompt: "Quali erano le quattro principali 'Repubbliche Marinare' italiane nel Basso Medioevo?",
        options: [
          { label: "Firenze, Siena, Lucca e Milano", correct: false },
          { label: "Amalfi, Genova, Pisa e Venezia", correct: true },
          { label: "Roma, Napoli, Palermo e Bari", correct: false },
          { label: "Torino, Verona, Mantova e Ferrara", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Le quattro repubbliche marinare dominarono le rotte commerciali del Mediterraneo tra Oriente e Occidente."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-82",
        type: "quiz",
        prompt: "Quale scontro armato vide i Comuni della Lega Lombarda sconfiggere l'imperatore Federico Barbarossa nel 1176?",
        options: [
          { label: "La disfatta di Canne", correct: false },
          { label: "La battaglia di Hastings", correct: false },
          { label: "La battaglia di Legnano", correct: true },
          { label: "La presa di Gerusalemme", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I fanti dei Comuni lombardi sconfissero la cavalleria del Barbarossa a Legnano con il carroccio simbolo civico."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-83",
        type: "quiz",
        prompt: "Chi erano i Guelfi e i Ghibellini nelle lotte politiche delle città italiane medievali?",
        options: [
          { label: "Commercianti e marinai", correct: false },
          { label: "Cristiani e musulmani", correct: false },
          { label: "Monaci e cavalieri erranti", correct: false },
          { label: "I sostenitori del Papa (Guelfi) e quelli dell'Imperatore (Ghibellini)", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La contesa tra papato e impero si rifletteva nelle fazioni cittadine dei guelfi (filopapali) e ghibellini (filoimperiali)."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-84",
        type: "quiz",
        prompt: "In quale anno Papa Urbano II bandì a Clermont la prima Crociata per liberare i Luoghi Santi a Gerusalemme?",
        options: [
          { label: "1095", correct: true },
          { label: "1215", correct: false },
          { label: "800", correct: false },
          { label: "1348", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Al concilio di Clermont (1095) il papa invitò i cavalieri cristiani a soccorrere i pellegrini in Terrasanta."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-85",
        type: "quiz",
        prompt: "Quale documento fondamentale per le libertà e i diritti dei sudditi fu concesso dal re inglese Giovanni Senzaterra nel 1215?",
        options: [
          { label: "L'Editto di Nantes", correct: false },
          { label: "La Magna Charta Libertatum", correct: true },
          { label: "Il Codice Giustinianeo", correct: false },
          { label: "La Dichiarazione d'Indipendenza", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La Magna Charta limitava per la prima volta i poteri del sovrano fissando garanzie per i cittadini e i baroni."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-86",
        type: "quiz",
        prompt: "Quale terribile epidemia devastò l'Europa tra il 1347 e il 1351 sterminando circa un terzo della popolazione?",
        options: [
          { label: "Il Colera asiatico", correct: false },
          { label: "L'influenza spagnola", correct: false },
          { label: "La Peste Nera", correct: true },
          { label: "La febbre gialla", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La peste nera, trasmessa dalle pulci dei ratti giunti su navi mercantili dal Mar Nero, decimò l'Europa."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-87",
        type: "quiz",
        prompt: "Chi era l'amanuense nei monasteri medievali?",
        options: [
          { label: "Il cuoco del convento", correct: false },
          { label: "Il custode delle stalle abbaziali", correct: false },
          { label: "Il medico delle erbe medicinali", correct: false },
          { label: "Un monaco specializzato nel copiare a mano libri e codici antichi nello scriptorium", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Grazie al paziente lavoro dei monaci amanuensi furono conservati e tramandati i testi della cultura classica."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-88",
        type: "quiz",
        prompt: "Quale grandioso imperatore svevo, detto 'Stupor Mundi', stabilì la sua corte a Palermo e promosse la Scuola Siciliana?",
        options: [
          { label: "Federico II di Svevia", correct: true },
          { label: "Ottone I", correct: false },
          { label: "Enrico IV", correct: false },
          { label: "Filippo il Bello", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Federico II (1194-1250) fu un sovrano colto e aperto alle scienze, alle arti e alla cultura araba ed ebraica."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-89",
        type: "quiz",
        prompt: "Come si chiamavano le associazioni medievali di mestiere che regolavano il lavoro di fabbri, tessitori o orafi?",
        options: [
          { label: "I Soviet", correct: false },
          { label: "Le Corporazioni (o Arti)", correct: true },
          { label: "I Sindacati moderni", correct: false },
          { label: "I Feudi chiusi", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Le corporazioni o arti disciplinavano prezzi, salari, qualità dei prodotti e tirocinio degli apprendisti."
      }
    },

    {
      years: ["S1", "S2"],
      round: {
        id: "qb-sto-exp-s1-90",
        type: "quiz",
        prompt: "Quale lungo conflitto tra Inghilterra e Francia durò a fasi alterne dal 1337 al 1453?",
        options: [
          { label: "La Guerra delle Due Rose", correct: false },
          { label: "La Guerra dei Trent'Anni", correct: false },
          { label: "La Guerra dei Cent'Anni", correct: true },
          { label: "La Crociata degli Albigesi", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La Guerra dei Cent'Anni oppose inglesi e francesi, vedendo emergere l'eroina nazionale Giovanna d'Arco."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-91",
        type: "quiz",
        prompt: "In quale anno Cristoforo Colombo approdò alle isole Bahamas credendo di aver raggiunto le Indie orientali?",
        options: [
          { label: "1453", correct: false },
          { label: "1517", correct: false },
          { label: "1789", correct: false },
          { label: "1492", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il 12 ottobre 1492 le caravelle di Colombo toccarono Guanahani, data simbolo dell'inizio dell'Età Moderna."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-92",
        type: "quiz",
        prompt: "Quale navigatore portoghese compì per primo la circumnavigazione del globo tra il 1519 e il 1522?",
        options: [
          { label: "Ferdinando Magellano", correct: true },
          { label: "Vasco da Gama", correct: false },
          { label: "Amerigo Vespucci", correct: false },
          { label: "James Cook", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La spedizione di Magellano oltrepassò l'omonimo stretto e provò sperimentalmente la sfericità della Terra."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-93",
        type: "quiz",
        prompt: "Chi inventò intorno al 1455 a Magonza la stampa a caratteri mobili in metallo, stampando la celebre Bibbia?",
        options: [
          { label: "Erasmo da Rotterdam", correct: false },
          { label: "Johannes Gutenberg", correct: true },
          { label: "Leonardo da Vinci", correct: false },
          { label: "Niccolò Machiavelli", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Gutenberg permise la diffusione rapida, economica e su vasta scala del libro e delle nuove idee in tutta Europa."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-94",
        type: "quiz",
        prompt: "Quale monaco tedesco diede avvio alla Riforma Protestante nel 1517 affiggendo 95 tesi contro le indulgenze?",
        options: [
          { label: "Giovanni Calvino", correct: false },
          { label: "Ignazio di Loyola", correct: false },
          { label: "Martin Lutero", correct: true },
          { label: "Tommaso Moro", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Martin Lutero contestò la vendita papale delle indulgenze e tradusse la Bibbia in tedesco."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-95",
        type: "quiz",
        prompt: "Quale importante concilio della Chiesa cattolica (1545-1563) organizzò la risposta della Controriforma?",
        options: [
          { label: "Il Concilio di Nicea", correct: false },
          { label: "Il Concilio Vaticano II", correct: false },
          { label: "Il Concilio di Costanza", correct: false },
          { label: "Il Concilio di Trento", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "A Trento la Chiesa confermò la dottrina tradizionale e riformò la disciplina e la formazione del clero."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-96",
        type: "quiz",
        prompt: "Quale re di Francia fu soprannominato il 'Re Sole' e fu il massimo esempio della monarchia assoluta?",
        options: [
          { label: "Luigi XIV", correct: true },
          { label: "Enrico IV", correct: false },
          { label: "Luigi XVI", correct: false },
          { label: "Francesco I", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Luigi XIV regnò accentrando ogni potere a Versailles pronunciando la celebre frase 'Lo Stato sono io'."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-97",
        type: "quiz",
        prompt: "Quale scienziato pisano perfezionò il cannocchiale e confermò la teoria eliocentrica di Copernico?",
        options: [
          { label: "Isaac Newton", correct: false },
          { label: "Galileo Galilei", correct: true },
          { label: "Giordano Bruno", correct: false },
          { label: "René Descartes", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Galileo scoprì i satelliti di Giove e le fasi di Venere, fondando il moderno metodo scientifico sperimentale."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-98",
        type: "quiz",
        prompt: "Quale movimento culturale del Settecento sosteneva l'uso del 'lume della ragione' per combattere ignoranza e pregiudizi?",
        options: [
          { label: "Il Romanticismo", correct: false },
          { label: "Il Decadentismo", correct: false },
          { label: "L'Illuminismo", correct: true },
          { label: "Il Barocco", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'Illuminismo diffuse idee di tolleranza, libertà e diritti universali attraverso pensatori come Voltaire e Rousseau."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-99",
        type: "quiz",
        prompt: "In quale Paese europeo ebbe inizio la Prima Rivoluzione Industriale grazie all'uso del carbone e della macchina a vapore?",
        options: [
          { label: "Spagna", correct: false },
          { label: "Italia", correct: false },
          { label: "Russia", correct: false },
          { label: "Gran Bretagna (Inghilterra)", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'Inghilterra della seconda metà del '700 unì capitali, miniere di carbone, ferrovie e la macchina di James Watt."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-100",
        type: "quiz",
        prompt: "In quale data storica fu firmata la Dichiarazione d'Indipendenza degli Stati Uniti d'America a Filadelfia?",
        options: [
          { label: "4 luglio 1776", correct: true },
          { label: "14 luglio 1789", correct: false },
          { label: "12 ottobre 1492", correct: false },
          { label: "25 aprile 1945", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il 4 luglio 1776 le tredici colonie britanniche proclamarono la nascita degli Stati Uniti d'America."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-101",
        type: "quiz",
        prompt: "Quale evento del 14 luglio 1789 segna simbolicamente l'inizio della Rivoluzione Francese?",
        options: [
          { label: "La decapitazione del Re", correct: false },
          { label: "La presa della fortezza della Bastiglia a Parigi", correct: true },
          { label: "La marcia su Versailles", correct: false },
          { label: "La proclamazione dell'Impero", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il popolo parigino assaltò la prigione-fortezza della Bastiglia, simbolo dell'assolutismo regio."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-102",
        type: "quiz",
        prompt: "Quale fu il celebre motto della Rivoluzione Francese che riassume i valori della nuova società?",
        options: [
          { label: "Dio, Patria e Famiglia", correct: false },
          { label: "Ora et labora", correct: false },
          { label: "Liberté, Égalité, Fraternité", correct: true },
          { label: "Veni, vidi, vici", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Libertà, Uguaglianza e Fratellanza fu la formula fondamentale dei rivoluzionari francesi del 1789."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-103",
        type: "quiz",
        prompt: "Quale generale francese si incoronò Imperatore dei Francesi nel 1804 e conquistò gran parte dell'Europa?",
        options: [
          { label: "Robespierre", correct: false },
          { label: "Luigi Bonaparte", correct: false },
          { label: "Talleyrand", correct: false },
          { label: "Napoleone Bonaparte", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Napoleone estese le conquiste francesi, promulgò il Codice Civile e fu infine sconfitto a Waterloo nel 1815."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-104",
        type: "quiz",
        prompt: "Come si chiama l'imponente opera enciclopedica in molti volumi diretta da Diderot e D'Alembert nel Settecento?",
        options: [
          { label: "L'Encyclopédie", correct: true },
          { label: "Il Principe", correct: false },
          { label: "I Promessi Sposi", correct: false },
          { label: "La Commedia", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'Encyclopédie raccolse tutto il sapere scientifico, tecnico e filosofico illuminista dell'epoca."
      }
    },

    {
      years: ["S2", "S3"],
      round: {
        id: "qb-sto-exp-s2-105",
        type: "quiz",
        prompt: "In quale celebre battaglia del 1815 Napoleone fu definitivamente sconfitto dalla coalizione anglo-prussiana?",
        options: [
          { label: "Austerlitz", correct: false },
          { label: "Waterloo", correct: true },
          { label: "Lipsia", correct: false },
          { label: "Marengo", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "A Waterloo, nell'odierno Belgio, il duca di Wellington e von Blücher sconfissero per sempre Napoleone."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-106",
        type: "quiz",
        prompt: "In quale storica data a Torino fu ufficialmente proclamata la nascita del Regno d'Italia?",
        options: [
          { label: "20 settembre 1870", correct: false },
          { label: "25 aprile 1945", correct: false },
          { label: "17 marzo 1861", correct: true },
          { label: "4 novembre 1918", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il parlamento di Torino proclamò Vittorio Emanuele II primo re d'Italia il 17 marzo 1861."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-107",
        type: "quiz",
        prompt: "Quale statista piemontese fu il principale architetto diplomatico del processo di unificazione risorgimentale?",
        options: [
          { label: "Giuseppe Mazzini", correct: false },
          { label: "Giuseppe Garibaldi", correct: false },
          { label: "Vincenzo Gioberti", correct: false },
          { label: "Camillo Benso conte di Cavour", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Cavour guidò la modernizzazione del Piemonte e strinse l'alleanza con Napoleone III contro l'Austria."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-108",
        type: "quiz",
        prompt: "Quale celebre spedizione guidata da Giuseppe Garibaldi nel 1860 portò alla liberazione della Sicilia e del Regno delle Due Sicilie?",
        options: [
          { label: "La Spedizione dei Mille", correct: true },
          { label: "La Breccia di Porta Pia", correct: false },
          { label: "La disfatta di Novara", correct: false },
          { label: "La Campagna di Russia", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I Mille volontari garibaldini salparono da Quarto (Genova) e sbarcarono a Marsala nel maggio 1860."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-109",
        type: "quiz",
        prompt: "Quale evento del 20 settembre 1870 permise all'Italia di annettere Roma e farne la propria capitale?",
        options: [
          { label: "I Patti Lateranensi", correct: false },
          { label: "La Breccia di Porta Pia", correct: true },
          { label: "Il Congresso di Vienna", correct: false },
          { label: "L'Insurrezione di Milano", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "I bersaglieri aprirono una breccia nelle mura di Porta Pia, ponendo fine al potere temporale dei papi a Roma."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-110",
        type: "quiz",
        prompt: "Quale attentato a Sarajevo il 28 giugno 1914 fu la scintilla che fece scoppiare la Prima Guerra Mondiale?",
        options: [
          { label: "La distruzione della corazzata Maine", correct: false },
          { label: "L'affondamento del Titanic", correct: false },
          { label: "L'assassinio dell'arciduca Francesco Ferdinando erede al trono d'Austria", correct: true },
          { label: "L'occupazione della Renania", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "L'attentato compiuto dal nazionalista serbo Gavrilo Princip fece scattare la catena delle alleanze europee."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-111",
        type: "quiz",
        prompt: "Che tipo di guerra caratterizzò i combattimenti della Prima Guerra Mondiale, con soldati asserragliati nel fango?",
        options: [
          { label: "Guerra lampo con carri armati", correct: false },
          { label: "Guerra esclusivamente navale", correct: false },
          { label: "Guerriglia partigiana nelle foreste", correct: false },
          { label: "Guerra di trincea (o di posizione)", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Lungo centinaia di chilometri i soldati vivevano in trincee sotto il fuoco di mitragliatrici, artiglieria e gas."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-112",
        type: "quiz",
        prompt: "In quale anno scoppiò la Rivoluzione Russa guidata da Lenin e dai bolscevichi, portando alla nascita dell'URSS?",
        options: [
          { label: "1917", correct: true },
          { label: "1905", correct: false },
          { label: "1929", correct: false },
          { label: "1939", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Nel 1917 la rivoluzione di febbraio rovesciò lo Zar e quella d'ottobre portò i bolscevichi di Lenin al potere."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-113",
        type: "quiz",
        prompt: "Quale grave crisi economica mondiale scoppiò negli Stati Uniti nell'ottobre del 1929 con il crollo della borsa di Wall Street?",
        options: [
          { label: "L'Inflazione tedesca del marco", correct: false },
          { label: "La Grande Depressione", correct: true },
          { label: "La Crisi petrolifera", correct: false },
          { label: "Il Piano Marshall", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il Giovedì Nero di Wall Street (ottobre 1929) causò fallimenti bancari e disoccupazione di massa nel mondo."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-114",
        type: "quiz",
        prompt: "Quale evento del 1° settembre 1939 segnò l'inizio della Seconda Guerra Mondiale in Europa?",
        options: [
          { label: "L'attacco a Pearl Harbor", correct: false },
          { label: "Lo sbarco in Normandia", correct: false },
          { label: "L'invasione della Polonia da parte della Germania nazista", correct: true },
          { label: "La battaglia di Stalingrado", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Hitler invase la Polonia, spingendo Gran Bretagna e Francia a dichiarare guerra alla Germania."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-115",
        type: "quiz",
        prompt: "Come viene ricordato lo sterminio sistematico di sei milioni di ebrei e di altre minoranze compiuto dal regime nazista?",
        options: [
          { label: "La Notte di San Bartolomeo", correct: false },
          { label: "Il Gulag siberiano", correct: false },
          { label: "La Diaspora antica", correct: false },
          { label: "La Shoah (o Olocausto)", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "La Shoah fu il genocidio pianificato nei campi di concentramento e sterminio come Auschwitz e Treblinka."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-116",
        type: "quiz",
        prompt: "In quale data storica si celebra in Italia la Festa della Liberazione dal nazifascismo?",
        options: [
          { label: "25 aprile", correct: true },
          { label: "2 giugno", correct: false },
          { label: "1° maggio", correct: false },
          { label: "4 novembre", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il 25 aprile 1945 il Comitato di Liberazione Nazionale proclamò l'insurrezione generale di tutti i partigiani."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-117",
        type: "quiz",
        prompt: "Cosa votarono per la prima volta a suffragio universale anche le donne italiane nel referendum del 2 giugno 1946?",
        options: [
          { label: "L'ingresso nell'Unione Europea", correct: false },
          { label: "La scelta tra Repubblica e Monarchia (e l'Assemblea Costituente)", correct: true },
          { label: "La dichiarazione di guerra", correct: false },
          { label: "L'approvazione dello Statuto Albertino", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il 2 giugno 1946 il popolo italiano scelse la Repubblica ed elesse l'Assemblea per scrivere la Costituzione."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-118",
        type: "quiz",
        prompt: "In quale anno entrò in vigore la Costituzione della Repubblica Italiana?",
        options: [
          { label: "25 aprile 1945", correct: false },
          { label: "17 marzo 1861", correct: false },
          { label: "1° gennaio 1948", correct: true },
          { label: "1° gennaio 2000", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Firmata dal capo provvisorio dello Stato Enrico De Nicola, la Costituzione entrò in vigore il 1° gennaio 1948."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-119",
        type: "quiz",
        prompt: "Come viene chiamato il periodo di tensione politica e militare tra gli Stati Uniti e l'Unione Sovietica dopo il 1945?",
        options: [
          { label: "La Guerra dei Cent'Anni", correct: false },
          { label: "La Belle Époque", correct: false },
          { label: "L'Era Napoleonica", correct: false },
          { label: "La Guerra Fredda", correct: true }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Fu definita 'Guerra Fredda' perché i due blocchi contrapposti non giunsero mai a un conflitto armato diretto."
      }
    },

    {
      years: ["S3"],
      round: {
        id: "qb-sto-exp-s3-120",
        type: "quiz",
        prompt: "Quale evento storico del 9 novembre 1989 divenne il simbolo della fine della divisione dell'Europa e del blocco comunista?",
        options: [
          { label: "La caduta del Muro di Berlino", correct: true },
          { label: "Lo sbarco sulla Luna", correct: false },
          { label: "Il Trattato di Maastricht", correct: false },
          { label: "La conferenza di Yalta", correct: false }
        ],
        hint: "Colloca l'evento nel suo contesto storico e cronologico.",
        explanation: "Il crollo del Muro di Berlino portò alla riunificazione della Germania e pose fine alla divisione dell'Europa."
      }
    },
  ]
};
