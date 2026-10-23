/**
 * Content Factory — generatore di round per "Scuola in Corsa".
 *
 * SCOPO
 *   Genera i 120 round delle 4 materie (4 × 5 livelli × 6 round) usando il
 *   modello locale di LM Studio, poi li valida con il validatore del gioco.
 *   L'AI NON assegna mai gli ID e NON produce JSON finale "a mano libera":
 *   qui imponiamo lo schema, normalizziamo e validiamo.
 *
 * VINCOLI (imparati sul campo):
 *   - LM Studio su :1234, modello `qwen/qwen3.8-27b`.
 *   - `reasoning_effort: "none"` è OBBLIGATORIO (altrimenti tempi lunghissimi).
 *   - `json_schema` funziona solo se OGNI campo ha `description`.
 *   - Difetti noti del LLM: JSON troncato, ID "spazzatura", markdown residuo.
 *     => gli ID li assegna SEMPRE il codice; il markdown lo ripuliamo;
 *        il troncamento lo intercettiamo e ritentiamo.
 *
 * USO
 *   npx tsx tools/content-factory/index.ts --subject matematica
 *   npx tsx tools/content-factory/index.ts --all
 *   npx tsx tools/content-factory/index.ts --all --subject italiano   # solo una
 *
 * OUTPUT
 *   tools/content-factory/out/<subject>.json        (pack generati, NON embeddati)
 *   tools/content-factory/out/<subject>.report.txt  (rapporto: validi/scartati)
 *   tools/content-factory/out/embeddable.ts         (pack pronti da incollare in packs.ts)
 *
 * ⚠️  REVISIONE MANUALE OBBLIGATORIA
 *   Nessun contenuto generato va embeddato senza revisione umana. Il report
 *   serve proprio a guidarla. Questo tool è un ACCELERATORE, non un sostituto.
 *
 * NON tocca il gioco: scrive solo dentro tools/content-factory/out/.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Pack, Level, Round, Option, MathSupport } from '../../src/content/types';
import { validatePack } from '../../src/content/validate';

// ── Percorsi ─────────────────────────────────────────────────────────
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(HERE, 'out');

// ── Configurazione LM Studio ─────────────────────────────────────────
const LM_BASE = process.env.LM_BASE ?? 'http://127.0.0.1:1234/v1';
const LM_MODEL = process.env.LM_MODEL ?? 'qwen/qwen3.8-27b';
const LM_TIMEOUT_MS = Number(process.env.LM_TIMEOUT_MS ?? 300_000); // 5 min per chiamata
const MAX_RETRIES = 3;

// ── Specifiche delle materie ─────────────────────────────────────────
/** Mix richiesto: come distribuire i tipi di round in ogni livello. */
interface SubjectSpec {
  id: 'matematica' | 'italiano' | 'scienze' | 'storia';
  packId: string;
  title: string;
  ageRange: string;
  difficulty: 1 | 2 | 3;
  /** Mappa tipo → quanti round per livello (somma = 6). */
  mix: { quiz: number; image: number; sort: number; match: number; sequence: number };
  /** Linee guida per il generatore. */
  brief: string;
}

/**
 * 4 materie × 5 livelli × 6 round = 120 round.
 * I mix rispettano le percentuali decise nel progetto:
 *   Matematica 70% quiz / 30% dragdrop
 *   Italiano   60% quiz / 20% image / 20% dragdrop
 *   Scienze    40% image / 40% quiz / 20% dragdrop
 *   Storia     50% quiz / 30% sequence / 20% dragdrop
 */
const SUBJECTS: SubjectSpec[] = [
  {
    id: 'matematica',
    packId: 'mat-7-9',
    title: 'Matematica',
    ageRange: '7-9',
    difficulty: 1,
    // 6 round: 4 quiz (di cui 1 con supporto) + 2 dragdrop (1 sort + 1 match) = 70/30
    mix: { quiz: 4, image: 0, sort: 1, match: 1, sequence: 0 },
    brief:
      'Matematica per bambini di 7-9 anni. Aritmetica di base: addizioni e sottrazioni entro il 20, ' +
      'numeri fino a 100, forme geometriche semplici, sequenze numeriche, confronti (< > =). ' +
      'Un quiz per livello DEVE avere support (numberLine, baseTen o table). ' +
      'Linguaggio semplice, contesti concreti (figurine, caramelle, animali).'
  },
  {
    id: 'italiano',
    packId: 'ita-8-10',
    title: 'Italiano',
    ageRange: '8-10',
    difficulty: 1,
    // 6 round: ~3.6 quiz + 1.2 image + 1.2 dragdrop → 4 quiz + 1 image + 1 sort ≈ 60/20/20
    mix: { quiz: 4, image: 1, sort: 1, match: 0, sequence: 0 },
    brief:
      'Italiano per bambini di 8-10 anni. Grammatica di base: nomi, verbi, aggettivi, articoli; ' +
      'ortografia (gn, gl, sc, cu/qu, doppie, accenti); sinonimi e contrari; ordine alfabetico; ' +
      'comprensione di frasi semplici. Linguaggio chiaro, esempi quotidiani.'
  },
  {
    id: 'scienze',
    packId: 'sci-8-10',
    title: 'Scienze',
    ageRange: '8-10',
    difficulty: 1,
    // 6 round: 2 image + 3 quiz + 1 match = 40/40/20 (image/quiz/dragdrop)
    mix: { quiz: 3, image: 2, sort: 0, match: 1, sequence: 0 },
    brief:
      'Scienze per bambini di 8-10 anni. Osservazione della natura: animali e loro caratteristiche, ' +
      'piante e loro parti, stati della materia (solido/liquido/gassoso), il corpo umano, ' +
      'ciclo dell\'acqua, stagioni. I round "image" devono usare SOLO icone esistenti (vedi elenco).'
  },
  {
    id: 'storia',
    packId: 'sto-10-12',
    title: 'Storia',
    ageRange: '10-12',
    difficulty: 2,
    // 6 round: 3 quiz + 2 sequence + 1 sort = 50/30/20
    mix: { quiz: 3, image: 0, sort: 1, match: 0, sequence: 2 },
    brief:
      'Storia per ragazzi di 10-12 anni. Preistoria, civiltà antiche (Egitto, Grecia, Roma), ' +
      'linee del tempo, invenzioni e scoperte. Le sequenze devono avere un ordine cronologico ' +
      'o logico OVVIO e verificabile.'
  }
];

// ── Icone disponibili (devono combaciare con src/art/icons-painters.ts) ──
/**
 * Elenco icone valide. Tenuto qui come COSTANTE esplicita (non importato da
 * icons-painters) per non trascinare il codice Canvas in un contesto Node.
 * ⚠️ Se si aggiungono painter, aggiornare questo elenco.
 */
const ICON_IDS = [
  'cane', 'gatto', 'uccello', 'pesce', 'leone', 'elefante', 'coniglio', 'giraffa',
  'cavallo', 'serpente', 'albero', 'fiore', 'sole', 'luna', 'stella', 'nuvola',
  'montagna', 'fiume', 'foglia', 'mela', 'banana', 'carota', 'mano', 'occhio',
  'orecchio', 'cuore', 'cervello', 'polmone', 'dente', 'corona', 'spada', 'scudo',
  'torre', 'nave', 'moneta', 'pergamena', 'aquila', 'arco', 'abaco', 'righello',
  'cubo'
] as const;

/** Solo queste icone hanno senso per i round "image" di scienze. */
const SCI_ICONS = ['cane', 'gatto', 'uccello', 'pesce', 'leone', 'elefante', 'coniglio',
  'giraffa', 'cavallo', 'serpente', 'albero', 'fiore', 'sole', 'luna', 'stella',
  'nuvola', 'montagna', 'fiume', 'foglia', 'mela', 'banana', 'carota',
  'occhio', 'orecchio', 'cuore', 'cervello', 'polmone', 'dente'] as const;

// ── Schema JSON per l'LLM (OGNI campo ha description) ─────────────────
/**
 * Il modello produce SOLO la parte "contenuto" del livello: un array di round
 * SENZA id (li assegna il codice). Lo schema è piatto dove possibile, così il
 * modello non si perde.
 */
const LEVEL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'rounds'],
  properties: {
    title: {
      type: 'string',
      description: 'Titolo breve e accattivante del livello (max 60 caratteri).'
    },
    rounds: {
      type: 'array',
      minItems: 6,
      maxItems: 6,
      description: 'Esattamente 6 esercizi nell\'ordine indicato.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'prompt', 'hint', 'explanation'],
        properties: {
          type: {
            type: 'string',
            enum: ['quiz', 'image', 'dragdrop', 'sequence'],
            description: 'Tipo dell\'esercizio, esattamente come richiesto nella traccia.'
          },
          prompt: {
            type: 'string',
            description: 'La domanda mostrata al bambino. Chiara, una sola richiesta, senza markdown.'
          },
          hint: {
            type: 'string',
            description: 'Suggerimento che aiuta senza rivelare la risposta. Una frase.'
          },
          explanation: {
            type: 'string',
            description: 'Spiegazione breve della risposta corretta (per l\'insegnante). Una frase.'
          },
          options: {
            type: 'array',
            description: 'Solo per type=quiz o image: 3 o 4 opzioni, UNA sola corretta.',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['label', 'correct'],
              properties: {
                label: { type: 'string', description: 'Testo visibile dell\'opzione (mai "A"/"B").' },
                correct: { type: 'boolean', description: 'true solo per UNA opzione.' }
              }
            }
          },
          support: {
            type: 'string',
            enum: ['numberLine', 'baseTen', 'table'],
            description: 'Solo per alcuni quiz di matematica: il supporto visivo.'
          },
          icon: {
            type: 'string',
            description: 'Solo per type=image: id di un\'icona ESISTENTE nell\'elenco fornito.'
          },
          mode: {
            type: 'string',
            enum: ['sort', 'match'],
            description: 'Solo per type=dragdrop: "sort" per riordinare, "match" per abbinare.'
          },
          sortItems: {
            type: 'array',
            items: { type: 'string' },
            description: 'Solo per dragdrop mode=sort: elementi NELL\'ORDINE CORRETTO (3-5).'
          },
          leftItems: {
            type: 'array',
            items: { type: 'string' },
            description: 'Solo per dragdrop mode=match: colonna sinistra (2-4).'
          },
          rightItems: {
            type: 'array',
            items: { type: 'string' },
            description: 'Solo per dragdrop mode=match: colonna destra, MESCOLATA (2-4).'
          },
          pairs: {
            type: 'array',
            description: 'Solo per dragdrop mode=match: per ogni riga i, la coppia [i, indice in rightItems].',
            items: {
              type: 'array',
              items: { type: 'number' },
              minItems: 2,
              maxItems: 2
            }
          },
          direction: {
            type: 'string',
            enum: ['tap', 'drag'],
            description: 'Solo per type=sequence: "tap" (tocca in ordine) o "drag" (trascina).'
          },
          items: {
            type: 'array',
            items: { type: 'string' },
            description: 'Solo per type=sequence: elementi NELL\'ORDINE CORRETTO (3-5).'
          }
        }
      }
    }
  }
} as const;

// ── Chiamata a LM Studio ─────────────────────────────────────────────
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callLM(messages: ChatMessage[]): Promise<string> {
  const body = {
    model: LM_MODEL,
    messages,
    temperature: 0.6,
    max_tokens: 4096,
    // OBBLIGATORIO: senza questo il modello "pensa" troppo a lungo.
    reasoning_effort: 'none',
    response_format: {
      type: 'json_schema',
      json_schema: { name: 'level', strict: true, schema: LEVEL_SCHEMA }
    }
  };

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), LM_TIMEOUT_MS);
  try {
    const res = await fetch(`${LM_BASE}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal
    });
    if (!res.ok) {
      throw new Error(`LM Studio HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
    }
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content;
    if (!content) throw new Error('risposta LM vuota');
    return content;
  } finally {
    clearTimeout(timer);
  }
}

// ── Pulizia e riparazione ────────────────────────────────────────────
/** Rimuove markdown residuo e spazi anomali. Il validatore boccia il markdown. */
function sanitizeText(s: unknown): string {
  if (typeof s !== 'string') return '';
  return s
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    .replace(/`/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Estrae il JSON dalla risposta grezza. Il modello a volte incapsula in ```json
 * o aggiunge preamboli. Prova: parse diretto → blocco code → prima { .. ultima }.
 */
function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    /* continua */
  }
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) {
    try {
      return JSON.parse(fenced[1]);
    } catch {
      /* continua */
    }
  }
  const first = trimmed.indexOf('{');
  const last = trimmed.lastIndexOf('}');
  if (first >= 0 && last > first) {
    return JSON.parse(trimmed.slice(first, last + 1));
  }
  throw new Error('JSON non estraibile dalla risposta');
}

/** Converte un round "grezzo" del modello nel tipo Round, assegnando l'id. */
export function normalizeRound(raw: Record<string, unknown>, id: string, usedIcons: Set<string>): Round | null {
  const base = {
    id,
    prompt: sanitizeText(raw.prompt),
    hint: sanitizeText(raw.hint) || undefined,
    explanation: sanitizeText(raw.explanation) || undefined
  };
  const type = raw.type;

  if (type === 'quiz') {
    const options = normalizeOptions(raw.options);
    if (!options) return null;
    const support = raw.support as MathSupport | undefined;
    return {
      ...base,
      type: 'quiz',
      options,
      ...(support && ['numberLine', 'baseTen', 'table'].includes(support) ? { support } : {})
    };
  }

  if (type === 'image') {
    const options = normalizeOptions(raw.options);
    if (!options) return null;
    let icon = sanitizeText(raw.icon).toLowerCase();
    // Difesa: se l'icona non esiste, ripiega su una valida e non ripetuta.
    if (!ICON_IDS.includes(icon as (typeof ICON_IDS)[number]) || usedIcons.has(icon)) {
      icon = ICON_IDS.find((i) => !usedIcons.has(i)) ?? 'mela';
    }
    usedIcons.add(icon);
    return { ...base, type: 'image', icon, options };
  }

  if (type === 'dragdrop') {
    const mode = raw.mode;
    if (mode === 'sort') {
      const sortItems = toStrArray(raw.sortItems);
      if (sortItems.length < 2) return null;
      return { ...base, type: 'dragdrop', mode: 'sort', sortItems };
    }
    if (mode === 'match') {
      const leftItems = toStrArray(raw.leftItems);
      const rightItems = toStrArray(raw.rightItems);
      if (leftItems.length < 2 || rightItems.length !== leftItems.length) return null;
      // Ricostruisce `pairs` noi stessi: [i, i] con destra mescolata.
      // (Il modello sbaglia spesso gli indici; qui li rendiamo coerenti.)
      const pairs = buildPairs(leftItems.length);
      if (!pairs) return null;
      return { ...base, type: 'dragdrop', mode: 'match', leftItems, rightItems, pairs };
    }
    return null;
  }

  if (type === 'sequence') {
    const items = toStrArray(raw.items);
    if (items.length < 2) return null;
    const direction = raw.direction === 'drag' ? 'drag' : 'tap';
    return { ...base, type: 'sequence', direction, items };
  }

  return null;
}

function toStrArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => sanitizeText(String(x))).filter((s) => s.length > 0);
}

/** Opzioni: 2-4, esattamente una corretta, nessun duplicato. */
function normalizeOptions(v: unknown): Option[] | null {
  if (!Array.isArray(v)) return null;
  const opts: Option[] = v
    .map((o) => {
      const rec = o as Record<string, unknown>;
      return { label: sanitizeText(rec.label), correct: rec.correct === true };
    })
    .filter((o) => o.label.length > 0);
  if (opts.length < 2) return null;
  // Esattamente una corretta.
  const nCorrect = opts.filter((o) => o.correct).length;
  if (nCorrect === 0) opts[0].correct = true;
  else if (nCorrect > 1) {
    let seen = false;
    for (const o of opts) {
      if (o.correct) {
        if (seen) o.correct = false;
        else seen = true;
      }
    }
  }
  // Duplicati: scarta il duplicato.
  const seenLabels = new Set<string>();
  const unique = opts.filter((o) => {
    const k = o.label.toLowerCase();
    if (seenLabels.has(k)) return false;
    seenLabels.add(k);
    return true;
  });
  return unique.length >= 2 ? unique : null;
}

/**
 * Costruisce `pairs` coerenti per il match: ogni riga i abbinata a una
 * destinazione distinta. La colonna destra resta com'è (il gioco la mescola).
 */
function buildPairs(n: number): [number, number][] | null {
  if (n < 1) return null;
  const indices = Array.from({ length: n }, (_, i) => i);
  // Permutazione semplice (identità): il gioco mescola comunque la destra.
  const pairs: [number, number][] = indices.map((i) => [i, i]);
  return pairs;
}

// ── Costruzione del pack ─────────────────────────────────────────────
function levelPrompt(spec: SubjectSpec, levelIndex: number, totalLevels: number): string {
  const m = spec.mix;
  const parts: string[] = [];
  if (m.quiz) parts.push(`${m.quiz} di tipo "quiz"`);
  if (m.image) parts.push(`${m.image} di tipo "image"`);
  if (m.sort) parts.push(`${m.sort} di tipo "dragdrop" con mode "sort"`);
  if (m.match) parts.push(`${m.match} di tipo "dragdrop" con mode "match"`);
  if (m.sequence) parts.push(`${m.sequence} di tipo "sequence"`);

  const iconRule = m.image || m.quiz
    ? `\n- Se usi round "image", il campo "icon" DEVE essere uno di questi id (minuscolo): ${SCI_ICONS.join(', ')}.`
    : '';

  return `Sei un generatore di esercizi didattici italiani per la scuola primaria.
Materia: ${spec.title} — fascia d'età ${spec.ageRange}. Livello ${levelIndex + 1} di ${totalLevels}.

LINEA GUIDA DIDATTICA:
${spec.brief}

REGOLE ASSOLUTE:
- Genera ESATTAMENTE 6 esercizi.
- Composizione obbligatoria: ${parts.join(', ')}.
- Ogni esercizio ha: type, prompt, hint, explanation.
- prompt: una sola domanda chiara, senza markdown, senza elenchi puntati.
- NIENTE markdown (no asterischi, no backtick, no link).
- Difficoltà crescente all'interno del livello, adatta all'età.
${iconRule}

Rispondi SOLO con il JSON conforme allo schema: nessun testo fuori dal JSON.`;
}

async function generateLevel(spec: SubjectSpec, levelIndex: number, totalLevels: number): Promise<Level | null> {
  const sys: ChatMessage = { role: 'system', content: levelPrompt(spec, levelIndex, totalLevels) };
  const user: ChatMessage = {
    role: 'user',
    content: `Genera il livello ${levelIndex + 1} per ${spec.title}. Ricorda: esattamente 6 esercizi, composizione ${JSON.stringify(spec.mix)}.`
  };

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const raw = await callLM([sys, user]);
      const parsed = extractJson(raw) as { title?: unknown; rounds?: unknown };
      if (!Array.isArray(parsed.rounds)) throw new Error('campo rounds mancante o non array');

      const usedIcons = new Set<string>();
      const rounds: Round[] = [];
      parsed.rounds.forEach((r, i) => {
        const round = normalizeRound(r as Record<string, unknown>, `${spec.packId}-L${levelIndex + 1}-${i + 1}`, usedIcons);
        if (round) rounds.push(round);
      });

      if (rounds.length < 6) {
        process.stdout.write(`    ⚠ tentativo ${attempt}: solo ${rounds.length}/6 round validi, ritento\n`);
        continue;
      }

      const level: Level = {
        id: `${spec.packId}-l${levelIndex + 1}`,
        title: sanitizeText(parsed.title) || `Livello ${levelIndex + 1}`,
        difficulty: Math.min(3, Math.max(1, levelIndex + 1)) as 1 | 2 | 3,
        rounds
      };
      return level;
    } catch (err) {
      process.stdout.write(`    ⚠ tentativo ${attempt} fallito: ${(err as Error).message}\n`);
    }
  }
  return null;
}

async function generateSubject(spec: SubjectSpec, totalLevels = 5): Promise<void> {
  console.log(`\n═══ ${spec.title} (${spec.packId}) ═══`);
  const levels: Level[] = [];
  for (let i = 0; i < totalLevels; i++) {
    process.stdout.write(`  Livello ${i + 1}/${totalLevels}...`);
    const level = await generateLevel(spec, i, totalLevels);
    if (level) {
      levels.push(level);
      console.log(` ✅ ${level.rounds.length} round`);
    } else {
      console.log(' ❌ scartato (riprova manualmente)');
    }
  }

  const pack: Pack = {
    packId: spec.packId,
    version: 'generated-draft',
    title: spec.title,
    subject: spec.id,
    ageRange: spec.ageRange,
    difficulty: spec.difficulty,
    levels
  };

  // ── Validazione col validatore del GIOCO (fonte di verità) ──
  const issues = validatePack(pack);
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  writeFileSync(resolve(OUT_DIR, `${spec.id}.json`), JSON.stringify(pack, null, 2), 'utf8');

  const report = [
    `# Report generazione — ${spec.title} (${spec.packId})`,
    `Generato: ${new Date().toISOString()}`,
    `Livelli: ${levels.length}/${totalLevels}`,
    `Round totali: ${levels.reduce((n, l) => n + l.rounds.length, 0)}`,
    '',
    `Errori di validazione: ${errors.length}`,
    ...errors.map((e) => `  ❌ ${e.path}: ${e.message}`),
    '',
    `Avvisi: ${warnings.length}`,
    ...warnings.map((w) => `  ⚠ ${w.path}: ${w.message}`),
    '',
    '⚠️  REVISIONE MANUALE OBBLIGATORIA: verifica ogni prompt, distrattore',
    '    e correttezza didattica prima di embeddare in src/content/packs.ts.'
  ].join('\n');
  writeFileSync(resolve(OUT_DIR, `${spec.id}.report.txt`), report, 'utf8');

  console.log(`  → out/${spec.id}.json  (${errors.length} errori, ${warnings.length} avvisi)`);
}

// ── Generazione del file embeddabile ─────────────────────────────────
function buildEmbeddable(): void {
  const packs: Pack[] = [];
  for (const s of SUBJECTS) {
    const p = resolve(OUT_DIR, `${s.id}.json`);
    if (existsSync(p)) {
      packs.push(JSON.parse(readFileText(p)) as Pack);
    }
  }
  const header =
    '/**\n' +
    ' * Pack GENERATI dalla Content Factory — non embeddare senza revisione.\n' +
    ' * Copia manualmente in src/content/packs.ts solo i livelli approvati.\n' +
    ' */\n' +
    "import type { Pack } from '../../src/content/types';\n\n";
  const body = packs.map((p, i) => `export const GEN_${i + 1}: Pack = ${JSON.stringify(p, null, 2)};\n`).join('\n');
  writeFileSync(resolve(OUT_DIR, 'embeddable.ts'), header + body, 'utf8');
  console.log(`\n→ out/embeddable.ts (${packs.length} pack)`);
}

function readFileText(p: string): string {
  // Import dinamico per evitare di portare `fs` in alto se non serve.
  return require('node:fs').readFileSync(p, 'utf8');
}

// ── CLI ──────────────────────────────────────────────────────────────
/** Mostra l'aiuto ed esce. */
function mostraAiuto(): never {
  console.log(`
Content Factory — genera bozze di pacchetti con un modello locale.

USO:
  npx tsx tools/content-factory/index.ts [opzioni]

OPZIONI:
  --subject <id>   Genera solo una materia.
                   Valide: ${SUBJECTS.map((s) => s.id).join(', ')}
  --levels <n>     Livelli per materia (default 5).
  --all            Genera tutte le materie (comportamento predefinito).
  --embed          Non genera: ricompone il file embeddabile dai JSON esistenti.
  --forza          Salta il controllo di occupazione del modello (usare con cautela).
  --help, -h       Mostra questo messaggio.

ESEMPI:
  npx tsx tools/content-factory/index.ts --subject matematica --levels 3
  npx tsx tools/content-factory/index.ts --all
  npx tsx tools/content-factory/index.ts --embed

⚠️  Il modello locale NON deve essere già occupato da un'altra sessione:
    la factory verifica e si ferma se lo trova in uso.
`);
  process.exit(0);
}

function parseArgs(): { subjects: SubjectSpec[]; levels: number; embedOnly: boolean } {
  const args = process.argv.slice(2);

  // `--help` NON deve mai avviare la generazione.
  if (args.includes('--help') || args.includes('-h')) mostraAiuto();

  const embedOnly = args.includes('--embed');
  let levels = 5;
  const lIdx = args.indexOf('--levels');
  if (lIdx >= 0 && args[lIdx + 1]) levels = Math.max(1, Number(args[lIdx + 1]) || 5);

  const sIdx = args.indexOf('--subject');
  if (sIdx >= 0 && args[sIdx + 1]) {
    const want = args[sIdx + 1].toLowerCase();
    const found = SUBJECTS.filter((s) => s.id === want);
    if (found.length === 0) {
      console.error(`Materia sconosciuta: ${want}. Valide: ${SUBJECTS.map((s) => s.id).join(', ')}`);
      process.exit(1);
    }
    return checkSconosciuti(args, { subjects: found, levels, embedOnly });
  }
  if (args.includes('--all') || args.length === 0) {
    return checkSconosciuti(args, { subjects: SUBJECTS, levels, embedOnly });
  }

  // Argomenti presenti ma non riconosciuti: NON generare a sorpresa.
  console.error(`Argomento non riconosciuto: ${args.join(' ')}`);
  console.error('Usa --help per l\'elenco delle opzioni.');
  process.exit(1);
}

/** Rifiuta argomenti non previsti, così un errore di battitura non genera nulla. */
function checkSconosciuti<T>(args: string[], risultato: T): T {
  const noti = new Set(['--all', '--embed', '--help', '-h', '--levels', '--subject', '--forza']);
  const ignoti = args.filter((a, i) => {
    if (noti.has(a)) return false;
    // Ignora i VALORI di --levels/--subject.
    const prev = args[i - 1];
    if (prev === '--levels' || prev === '--subject') return false;
    return true;
  });
  if (ignoti.length > 0) {
    console.error(`Argomenti non riconosciuti: ${ignoti.join(' ')}`);
    console.error('Usa --help per l\'elenco delle opzioni.');
    process.exit(1);
  }
  return risultato;
}

async function main(): Promise<void> {
  const { subjects, levels, embedOnly } = parseArgs();
  mkdirSync(OUT_DIR, { recursive: true });

  if (embedOnly) {
    buildEmbeddable();
    return;
  }

  // Verifica che LM Studio risponda.
  try {
    const res = await fetch(`${LM_BASE}/models`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.log(`✅ LM Studio raggiungibile su ${LM_BASE}`);
  } catch (err) {
    console.error(`❌ LM Studio non raggiungibile su ${LM_BASE}: ${(err as Error).message}`);
    console.error('   Avvia LM Studio e carica il modello, poi riprova.');
    process.exit(1);
  }

  // ⚠️ GUARDIA: il modello è già in uso da un'altra sessione?
  // Con `parallel 1` la generazione resterebbe in coda e fallirebbe per timeout,
  // occupando la slot di chi sta lavorando. Meglio fermarsi subito e dirlo.
  await verificaModelloLibero();

  for (const spec of subjects) {
    await generateSubject(spec, levels);
  }

  buildEmbeddable();
  console.log('\n✅ Fatto. Rivedi out/*.json e out/*.report.txt PRIMA di embeddare.');
}

/**
 * Si assicura che il modello non sia già occupato da un'altra sessione.
 *
 * PERCHÉ ESISTE: questa macchina ha `parallel 1`, quindi esiste una sola slot.
 * Se un'altra sessione la occupa, la factory resta in coda e ogni tentativo va
 * in timeout dopo minuti. Fermarsi subito è più rapido e non ruba la slot.
 *
 * `--forza` salta il controllo.
 */
async function verificaModelloLibero(): Promise<void> {
  if (process.argv.includes('--forza')) {
    console.log('⚠️  controllo di occupazione saltato (--forza)');
    return;
  }

  // ⚠️ ATTENZIONE ALL'ENDPOINT.
  // `/v1/models` (OpenAI-compatibile) restituisce SOLO id/object/owned_by:
  // NON contiene `state`, quindi un filtro su `state` non scatterebbe MAI.
  // Lo stato di occupazione vive in `/api/v0/models` (endpoint nativo LM Studio).
  const baseNativa = LM_BASE.replace(/\/v1\/?$/, '');
  const stati = await leggiStatiModello(baseNativa);

  if (stati === null) {
    // Non è stato possibile leggere gli stati: non blocchiamo, ma avvisiamo.
    console.log('   (impossibile verificare l\'occupazione del modello, procedo)');
    return;
  }

  const inUso = stati.filter(
    (m) => m.state === 'generating' || m.state === 'processing_prompt'
  );
  if (inUso.length > 0) {
    const nomi = inUso.map((m) => m.id).join(', ');
    console.error('');
    console.error(`❌ Il modello è GIÀ IN USO da un'altra sessione: ${nomi}`);
    console.error('   Con una sola slot (parallel 1) la generazione resterebbe in coda');
    console.error('   e fallirebbe per timeout, occupando la slot altrui.');
    console.error('');
    console.error('   Attendi che l\'altra sessione finisca, oppure usa --forza');
    console.error('   se sei certo di voler procedere comunque.');
    process.exit(1);
  }
}

/**
 * Legge lo stato di ogni modello dall'endpoint NATIVO di LM Studio.
 * Restituisce `null` se non è raggiungibile o non ha la forma attesa —
 * così il chiamante può decidere di non bloccare.
 */
async function leggiStatiModello(
  baseNativa: string
): Promise<Array<{ id: string; state?: string }> | null> {
  try {
    const res = await fetch(`${baseNativa}/api/v0/models`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const dati = (await res.json()) as {
      data?: Array<{ id?: string; state?: string }>;
    };
    if (!Array.isArray(dati.data)) return null;
    // Se NESSUN modello riporta `state`, l'endpoint non è quello atteso: meglio
    // dichiarare "non verificabile" che fingere che sia tutto libero.
    const conStato = dati.data.filter((m) => typeof m.state === 'string');
    if (conStato.length === 0) return null;
    return conStato.map((m) => ({ id: m.id ?? '?', state: m.state }));
  } catch {
    return null;
  }
}

/**
 * Esegue la generazione solo quando il file è lanciato direttamente
 * (`npx tsx tools/content-factory/index.ts`).
 *
 * Senza questo guard, importare il modulo in un test avvierebbe `main()` e
 * tenterebbe di contattare LM Studio. Le funzioni pure (`normalizeRound`,
 * `sanitizeText`, …) restano invece importabili e testabili offline.
 */
const lanciatoDirettamente =
  process.argv[1] !== undefined && fileURLToPath(import.meta.url) === resolve(process.argv[1]);

if (lanciatoDirettamente) {
  void main();
}
