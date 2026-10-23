/**
 * Pacchetti EMBEDDED nel gioco (funzionano anche via file://, zero rete).
 * Questo è il pack di partenza: in Fase 9 viene sostituito/esteso dai
 * 120 contenuti generati e revisionati dal Content Factory.
 * I pacchetti caricati dall'insegnante (editor / file JSON) vivono in
 * localStorage sotto 'packs.custom' e qui vengono uniti a questi.
 */
import type { Pack } from './types';
import { storage } from '../core/storage';

const K_CUSTOM = 'packs.custom';

const MAT: Pack = {
  packId: 'mat-7-9',
  version: 'starter',
  title: 'Matematica',
  subject: 'matematica',
  ageRange: '7-9',
  difficulty: 1,
  levels: [
    {
      id: 'mat-7-9-l1',
      title: 'Prima tappa: contare e operare',
      difficulty: 1,
      rounds: [
        {
          id: 'mat-1', type: 'quiz',
          prompt: 'Quanto fa 7 + 5?',
          options: [
            { label: '12', correct: true },
            { label: '11', correct: false },
            { label: '13', correct: false },
            { label: '10', correct: false }
          ],
          hint: 'Completa il 7 fino a 10, poi conta il resto.',
          explanation: '7 + 3 fa 10, e 2 in più fanno 12.'
        },
        {
          id: 'mat-2', type: 'quiz',
          prompt: 'Quale numero manca?  14, 15, __, 17',
          options: [
            { label: '16', correct: true },
            { label: '18', correct: false },
            { label: '13', correct: false }
          ],
          hint: 'Conta di uno in uno.',
          explanation: 'Dopo il 15 viene il 16, poi il 17.'
        },
        {
          id: 'mat-3', type: 'quiz',
          prompt: 'Marta ha 9 figurine e ne trova 4 in più. Quante figurine ha adesso?',
          options: [
            { label: '13', correct: true },
            { label: '12', correct: false },
            { label: '14', correct: false },
            { label: '11', correct: false }
          ],
          hint: 'Somma 9 + 4.',
          explanation: '9 + 4 = 13.'
        },
        {
          id: 'mat-4', type: 'quiz',
          prompt: 'Quanto fa 12 − 5?',
          options: [
            { label: '7', correct: true },
            { label: '6', correct: false },
            { label: '8', correct: false }
          ],
          hint: 'Conta indietro di 5 dal 12.',
          explanation: '12 − 5 = 7.'
        },
        {
          id: 'mat-5', type: 'dragdrop', mode: 'sort',
          prompt: 'Metti i numeri in ordine, dal più piccolo al più grande.',
          sortItems: ['3', '8', '12', '20'],
          hint: 'Il più piccolo va per primo.',
          explanation: "L'ordine crescente è 3, 8, 12, 20."
        },
        {
          id: 'mat-6', type: 'dragdrop', mode: 'match',
          prompt: 'Abbina ogni operazione al suo risultato.',
          leftItems: ['2 + 3', '9 − 2', '4 × 2'],
          rightItems: ['7', '5', '8'],
          pairs: [[0, 1], [1, 0], [2, 2]],
          hint: 'Fai ogni operazione e cerca il numero giusto.',
          explanation: '2 + 3 = 5, 9 − 2 = 7, 4 × 2 = 8.'
        }
      ]
    }
  ]
};

const ITA: Pack = {
  packId: 'ita-8-10',
  version: 'starter',
  title: 'Italiano',
  subject: 'italiano',
  ageRange: '8-10',
  difficulty: 1,
  levels: [
    {
      id: 'ita-8-10-l1',
      title: 'Prima tappa: parole e suoni',
      difficulty: 1,
      rounds: [
        {
          id: 'ita-1', type: 'quiz',
          prompt: 'Quale di queste parole è un nome?',
          options: [
            { label: 'cane', correct: true },
            { label: 'corre', correct: false },
            { label: 'rosso', correct: false },
            { label: 'bene', correct: false }
          ],
          hint: 'Il nome indica una persona, un animale o una cosa.',
          explanation: '"Cane" è un nome: indica un animale. Le altre sono verbo, aggettivo e avverbio.'
        },
        {
          id: 'ita-2', type: 'image', icon: 'mela',
          prompt: 'Che cosa vedi nell\'immagine?',
          options: [
            { label: 'Una mela', correct: true },
            { label: 'Una banana', correct: false },
            { label: 'Una carota', correct: false }
          ],
          hint: 'È rossa e rotonda.',
          explanation: "L'icona mostra una mela rossa."
        },
        {
          id: 'ita-3', type: 'quiz',
          prompt: 'Qual è il plurale di "cavallo"?',
          options: [
            { label: 'cavalli', correct: true },
            { label: 'cavallo', correct: false },
            { label: 'cavallini', correct: false }
          ],
          hint: 'Molti cavalli al pascolo.',
          explanation: 'Il plurale di "cavallo" è "cavalli".'
        },
        {
          id: 'ita-4', type: 'quiz',
          prompt: 'Quale parola ha la sillaba iniziale "co"?',
          options: [
            { label: 'cozza', correct: true },
            { label: 'gatto', correct: false },
            { label: 'lago', correct: false },
            { label: 'nido', correct: false }
          ],
          hint: 'Si mangia al mare.',
          explanation: '"Cozza" inizia con la sillaba "co".'
        },
        {
          id: 'ita-5', type: 'image', icon: 'nave',
          prompt: 'Con quale parola completa la frase? "La ___ attraversa il mare."',
          options: [
            { label: 'nave', correct: true },
            { label: 'luna', correct: false },
            { label: 'moneta', correct: false }
          ],
          hint: 'Ha una prua e una poppa.',
          explanation: 'La nave è il mezzo che attraversa il mare.'
        },
        {
          id: 'ita-6', type: 'sequence', direction: 'tap',
          prompt: 'Metti in ordine le tappe della giornata, dalla mattina alla sera.',
          items: ['Sveglio', 'Colazione', 'Scuola', 'Merenda', 'Sonno'],
          hint: 'Prima ci si sveglia, poi si fa colazione.',
          explanation: 'L\'ordine è: sveglio, colazione, scuola, merenda, sonno.'
        }
      ]
    }
  ]
};

const SCI: Pack = {
  packId: 'sci-8-10',
  version: 'starter',
  title: 'Scienze',
  subject: 'scienze',
  ageRange: '8-10',
  difficulty: 1,
  levels: [
    {
      id: 'sci-8-10-l1',
      title: 'Prima tappa: il mondo naturale',
      difficulty: 1,
      rounds: [
        {
          id: 'sci-1', type: 'image', icon: 'albero',
          prompt: 'Che cosa vedi nell\'immagine?',
          options: [
            { label: 'Un albero', correct: true },
            { label: 'Un fiore', correct: false },
            { label: 'Una foglia', correct: false }
          ],
          hint: 'Ha un tronco e una chioma.',
          explanation: "L'icona mostra un albero."
        },
        {
          id: 'sci-2', type: 'image', icon: 'sole',
          prompt: 'Quale corpo celeste riscalda la Terra?',
          options: [
            { label: 'Il Sole', correct: true },
            { label: 'La Luna', correct: false },
            { label: 'Una stella', correct: false }
          ],
          hint: 'È una stella, la più vicina a noi.',
          explanation: 'Il Sole è la stella che riscalda la Terra.'
        },
        {
          id: 'sci-3', type: 'quiz',
          prompt: 'Come si chiama il processo con cui le piante producono il proprio cibo?',
          options: [
            { label: 'Fotosintesi', correct: true },
            { label: 'Digestione', correct: false },
            { label: 'Respirazione', correct: false }
          ],
          hint: 'Usa luce, acqua e anidride carbonica.',
          explanation: 'La fotosintesi trasforma luce, acqua e CO₂ in nutrimento per la pianta.'
        },
        {
          id: 'sci-4', type: 'quiz',
          prompt: 'Quale di questi è un vertebrato?',
          options: [
            { label: 'Pesce', correct: true },
            { label: 'Lumaca', correct: false },
            { label: 'Ragno', correct: false },
            { label: 'Verme', correct: false }
          ],
          hint: 'Ha una colonna vertebrale.',
          explanation: 'Il pesce ha la colonna vertebrale; lumaca, ragno e verme no.'
        },
        {
          id: 'sci-5', type: 'dragdrop', mode: 'match',
          prompt: 'Abbina l\'organo alla sua funzione.',
          leftItems: ['Cuore', 'Polmoni', 'Cervello'],
          rightItems: ['Pensa', 'Batta il sangue', 'Respira'],
          pairs: [[0, 1], [1, 2], [2, 0]],
          hint: 'Ogni organo ha un compito speciale.',
          explanation: 'Il cuore pompa il sangue, i polmoni respirano, il cervello pensa.'
        },
        {
          id: 'sci-6', type: 'quiz',
          prompt: 'In quale stato si trova l\'acqua di un ghiacciolo?',
          options: [
            { label: 'Solido', correct: true },
            { label: 'Liquido', correct: false },
            { label: 'Gassoso', correct: false }
          ],
          hint: 'Puoi tenerlo in mano.',
          explanation: "L'acqua del ghiacciolo è allo stato solido."
        }
      ]
    }
  ]
};

const STO: Pack = {
  packId: 'sto-10-12',
  version: 'starter',
  title: 'Storia',
  subject: 'storia',
  ageRange: '10-12',
  difficulty: 2,
  levels: [
    {
      id: 'sto-10-12-l1',
      title: 'Prima tappa: antichi popoli',
      difficulty: 2,
      rounds: [
        {
          id: 'sto-1', type: 'quiz',
          prompt: 'In quale civiltà sono stati costruiti i Faraoni?',
          options: [
            { label: 'Egitto', correct: true },
            { label: 'Grecia', correct: false },
            { label: 'Roma', correct: false }
          ],
          hint: 'È famosa per le piramidi e i geroglifici.',
          explanation: 'I faraoni erano i re dell\'antico Egitto.'
        },
        {
          id: 'sto-2', type: 'sequence', direction: 'tap',
          prompt: 'Metti in ordine questi periodi storici, dal più antico al più recente.',
          items: ['Paleolitico', 'Neolitico', 'Età del Bronzo', 'Età del Ferro'],
          hint: 'La pietra arriva prima dei metalli.',
          explanation: "L'ordine è: Paleolitico, Neolitico, Età del Bronzo, Età del Ferro."
        },
        {
          id: 'sto-3', type: 'quiz',
          prompt: 'Quale popolo ha fondato la città di Roma secondo la leggenda?',
          options: [
            { label: 'I Latini (Romolo e Remo)', correct: true },
            { label: 'I Greci', correct: false },
            { label: 'I Galli', correct: false },
            { label: 'I Cartaginesi', correct: false }
          ],
          hint: 'Due fratelli gemelli.',
          explanation: 'Secondo la leggenda, Roma fu fondata da Romolo e Remo.'
        },
        {
          id: 'sto-4', type: 'sequence', direction: 'tap',
          prompt: 'Metti in ordine: come arrivava la notizia nell\'antichità?',
          items: ['Cade una moneta', 'Si scrive un messaggio', 'Un araldo lo porta', 'Si annuncia a voce'],
          hint: 'Prima si deve sapere la notizia.',
          explanation: "L'ordine è: cade la moneta (accade l'evento), si scrive, l'araldo lo porta, si annuncia."
        },
        {
          id: 'sto-5', type: 'dragdrop', mode: 'sort',
          prompt: 'Metti in ordine le tappe della costruzione di una città romana.',
          sortItems: ['Si sceglie il luogo', 'Si costruiscono le mura', 'Si alzano le case', 'Si apre il foro'],
          hint: 'Prima si sceglie dove costruire.',
          explanation: "L'ordine è: luogo, mura, case, foro."
        },
        {
          id: 'sto-6', type: 'quiz',
          prompt: 'Che cos\'era il Foro a Roma?',
          options: [
            { label: 'Il centro della vita pubblica e commerciale', correct: true },
            { label: 'Una prigione', correct: false },
            { label: 'Un teatro segreto', correct: false }
          ],
          hint: 'Lì si vendeva, si parlava e si faceva politica.',
          explanation: 'Il Foro era la piazza principale della città, centro della vita pubblica.'
        }
      ]
    }
  ]
};

// ── Caricamento ──────────────────────────────────────────────────────

export const EMBEDDED_PACKS: Pack[] = [MAT, ITA, SCI, STO];

export function loadCustomPacks(): Pack[] {
  return storage.get<Pack[]>(K_CUSTOM, []);
}

export function saveCustomPacks(packs: Pack[]): void {
  storage.set(K_CUSTOM, packs);
}

/** Tutti i pacchetti: embedded + personalizzati (deduplicati per packId, i custom vincono). */
export function allPacks(): Pack[] {
  const map = new Map<string, Pack>();
  for (const p of EMBEDDED_PACKS) map.set(p.packId, p);
  for (const p of loadCustomPacks()) map.set(p.packId, p);
  return Array.from(map.values());
}
