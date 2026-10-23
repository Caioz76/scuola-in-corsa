import type {
  DragDropRound,
  ImageRound,
  Level,
  Pack,
  QuizRound,
  Round,
  SequenceRound
} from './types';

/**
 * Validatore dei pacchetti contenuti.
 *
 * Regole didattiche dure (se falliscono, il pacchetto NON carica):
 *  - struttura conforme ai tipi
 *  - quiz/image: almeno 2 opzioni, ESATTAMENTE una corretta
 *  - dragdrop: match con coppie coerenti, sort con >=2 elementi
 *  - sequence: almeno 2 elementi
 *  - prompt non vuoto, senza markdown residuo
 *  - ID unici dentro il pacchetto
 *
 * Ritorna l'elenco dei problemi (vuoto = pacchetto valido).
 */

export interface ValidationIssue {
  path: string;
  message: string;
  severity: 'error' | 'warning';
}

const MARKDOWN_RE = /(\*\*|__|`|\[.*\]\(.*\))/;

function clean(s: string | undefined): string {
  return (s ?? '').trim();
}

function checkText(v: string | undefined, path: string, out: ValidationIssue[]): void {
  const s = clean(v);
  if (!s) {
    out.push({ path, message: 'testo vuoto', severity: 'error' });
  } else if (MARKDOWN_RE.test(s)) {
    out.push({ path, message: `markdown residuo in "${s.slice(0, 40)}"`, severity: 'error' });
  }
}

function checkOptions(
  round: { options: { label: string; correct: boolean }[] },
  path: string,
  out: ValidationIssue[]
): void {
  const opts = round.options;
  if (!Array.isArray(opts) || opts.length < 2) {
    out.push({ path: `${path}.options`, message: 'servono almeno 2 opzioni', severity: 'error' });
    return;
  }
  if (opts.length > 4) {
    out.push({ path: `${path}.options`, message: 'massimo 4 opzioni', severity: 'warning' });
  }
  const nCorrect = opts.filter((o) => o.correct).length;
  if (nCorrect !== 1) {
    out.push({
      path: `${path}.options`,
      message: `risposta corretta = ${nCorrect} (dev'essere esattamente 1)`,
      severity: 'error'
    });
  }
  opts.forEach((o, i) => {
    checkText(o.label, `${path}.options[${i}].label`, out);
  });
  const labels = opts.map((o) => o.label.trim().toLowerCase());
  const dup = labels.find((l, i) => labels.indexOf(l) !== i);
  if (dup !== undefined) {
    out.push({ path: `${path}.options`, message: `opzioni duplicate: "${dup}"`, severity: 'error' });
  }
}

function checkQuiz(r: QuizRound, path: string, out: ValidationIssue[]): void {
  checkOptions(r, path, out);
}

function checkImage(r: ImageRound, path: string, out: ValidationIssue[]): void {
  if (!clean(r.icon)) {
    out.push({ path: `${path}.icon`, message: 'icona mancante', severity: 'error' });
  }
  checkOptions(r, path, out);
}

function checkDragDrop(r: DragDropRound, path: string, out: ValidationIssue[]): void {
  if (r.mode === 'sort') {
    const items = r.sortItems ?? [];
    if (items.length < 2) {
      out.push({ path: `${path}.sortItems`, message: 'sort: servono almeno 2 elementi', severity: 'error' });
    } else {
      const seen = new Set<string>();
      for (const it of items) {
        checkText(it, `${path}.sortItems`, out);
        const k = it.trim().toLowerCase();
        if (seen.has(k)) {
          out.push({ path: `${path}.sortItems`, message: `elementi duplicati: "${it}"`, severity: 'error' });
        }
        seen.add(k);
      }
    }
  } else if (r.mode === 'match') {
    const left = r.leftItems ?? [];
    const right = r.rightItems ?? [];
    const pairs = r.pairs ?? [];
    if (left.length < 2) {
      out.push({ path: `${path}.leftItems`, message: 'match: servono almeno 2 elementi a sinistra', severity: 'error' });
    }
    if (left.length !== right.length) {
      out.push({
        path: `${path}.rightItems`,
        message: `match: colonne diverse (${left.length} vs ${right.length})`,
        severity: 'error'
      });
    }
    if (pairs.length !== left.length) {
      out.push({
        path: `${path}.pairs`,
        message: `match: ${pairs.length} coppie per ${left.length} righe`,
        severity: 'error'
      });
    } else {
      const usedRight = new Set<number>();
      pairs.forEach((p, i) => {
        const [l, rt] = p;
        if (l !== i || l < 0 || l >= left.length || rt < 0 || rt >= right.length) {
          out.push({ path: `${path}.pairs[${i}]`, message: `coppia fuori range: [${l},${rt}]`, severity: 'error' });
          return;
        }
        if (usedRight.has(rt)) {
          out.push({ path: `${path}.pairs[${i}]`, message: `destra ${rt} usata più volte`, severity: 'error' });
        }
        usedRight.add(rt);
      });
    }
  } else {
    out.push({ path: `${path}.mode`, message: `mode sconosciuto: ${String((r as { mode?: unknown }).mode)}`, severity: 'error' });
  }
}

function checkSequence(r: SequenceRound, path: string, out: ValidationIssue[]): void {
  if (r.direction !== 'tap' && r.direction !== 'drag') {
    out.push({ path: `${path}.direction`, message: `direction: ${String(r.direction)}`, severity: 'error' });
  }
  const items = r.items ?? [];
  if (items.length < 2) {
    out.push({ path: `${path}.items`, message: 'sequence: servono almeno 2 elementi', severity: 'error' });
  }
  items.forEach((it) => checkText(it, `${path}.items`, out));
}

function checkRound(r: Round, path: string, out: ValidationIssue[]): void {
  if (!clean(r.id)) {
    out.push({ path: `${path}.id`, message: 'id mancante', severity: 'error' });
  }
  checkText(r.prompt, `${path}.prompt`, out);
  if (clean(r.hint) && r.hint!.length > 300) {
    out.push({ path: `${path}.hint`, message: 'hint troppo lungo', severity: 'warning' });
  }
  switch (r.type) {
    case 'quiz':
      checkQuiz(r, path, out);
      break;
    case 'image':
      checkImage(r, path, out);
      break;
    case 'dragdrop':
      checkDragDrop(r, path, out);
      break;
    case 'sequence':
      checkSequence(r, path, out);
      break;
    default:
      out.push({ path, message: `tipo round sconosciuto: ${String((r as Round).type)}`, severity: 'error' });
  }
}

export function validatePack(pack: Pack): ValidationIssue[] {
  const out: ValidationIssue[] = [];
  if (!pack.packId) out.push({ path: 'packId', message: 'packId mancante', severity: 'error' });
  if (!pack.title) out.push({ path: 'title', message: 'titolo mancante', severity: 'error' });
  if (!pack.subject) out.push({ path: 'subject', message: 'materia mancante', severity: 'error' });
  if (!Array.isArray(pack.levels) || pack.levels.length === 0) {
    out.push({ path: 'levels', message: 'nessun livello', severity: 'error' });
    return out;
  }

  const ids = new Set<string>();
  pack.levels.forEach((lv: Level, li) => {
    const lp = `levels[${li}]`;
    if (!lv.id) out.push({ path: `${lp}.id`, message: 'id livello mancante', severity: 'error' });
    if (!lv.title) out.push({ path: `${lp}.title`, message: 'titolo livello mancante', severity: 'error' });
    if (lv.difficulty !== 1 && lv.difficulty !== 2 && lv.difficulty !== 3) {
      out.push({ path: `${lp}.difficulty`, message: `difficoltà: ${String(lv.difficulty)}`, severity: 'error' });
    }
    if (!Array.isArray(lv.rounds) || lv.rounds.length === 0) {
      out.push({ path: `${lp}.rounds`, message: 'livello vuoto', severity: 'error' });
      return;
    }
    lv.rounds.forEach((r, ri) => {
      const rp = `${lp}.rounds[${ri}]`;
      if (ids.has(r.id)) {
        out.push({ path: `${rp}.id`, message: `ID duplicato "${r.id}"`, severity: 'error' });
      }
      ids.add(r.id);
      checkRound(r, rp, out);
    });
  });
  return out;
}

export function isValid(pack: Pack): boolean {
  return validatePack(pack).every((i) => i.severity !== 'error');
}
