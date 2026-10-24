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
  ]
};
