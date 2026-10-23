import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { Pack } from '../src/content/types';
import { validatePack } from '../src/content/validate';

/**
 * Ogni bozza in `content/drafts/*.json` deve essere un pacchetto VALIDO.
 *
 * Le bozze sono fuori da `src/` di proposito: non entrano nel gioco finché un
 * umano non le ha revisionate e spostate in `src/content/`. Questo test è il
 * cancello automatico: se il generatore produce un pacchetto rotto, lo dice
 * subito, prima che qualcuno lo apra.
 */

const DIR = join(process.cwd(), 'content', 'drafts');
const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith('.json')).sort() : [];

describe('bozze di contenuto (content/drafts)', () => {
  if (files.length === 0) {
    it.skip('nessuna bozza presente', () => {});
    return;
  }

  for (const file of files) {
    it(`${file} è un pacchetto valido`, () => {
      const pack = JSON.parse(readFileSync(join(DIR, file), 'utf8')) as Pack;
      const errori = validatePack(pack).filter((i) => i.severity === 'error');
      expect(errori, `\n${JSON.stringify(errori, null, 2)}\n`).toEqual([]);
    });
  }
});
