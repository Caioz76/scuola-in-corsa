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
  }
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
  }
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
  }
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
  }
  ]
};
