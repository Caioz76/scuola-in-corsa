import { expect, test } from '@playwright/test';

/**
 * Test della TAPPA COMPLETA — dal titolo alla schermata risultati.
 *
 * Perché è diverso dagli altri test: qui il bot GIOCA, non guarda. Legge i
 * testi dei GameObject della scena (i contenuti sono già nel bundle: non c'è
 * nulla di segreto) e tocca la risposta giusta del pack vero.
 *
 * Se questo test passa, il ciclo `Title → Subject → Game → Results` è chiuso
 * per davvero, con le stelle salvate. Se il gioco si blocca (per esempio dopo
 * 3 errori, come il difetto trovato il 23/10), questo test FALLISCE.
 */

type Testo = { text: string; x: number; y: number; alpha: number };

async function stato(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const g = (window as unknown as { __GIOCO__?: { scena?: string; materia?: string | null } }).__GIOCO__;
    return { scena: g?.scena ?? null, materia: g?.materia ?? null };
  });
}

/** Testi visibili della scena attiva, con coordinate di mondo. */
async function testi(page: import('@playwright/test').Page): Promise<Testo[]> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
    const s = g?.scenaAttiva;
    if (!s) return [];
    const out: Array<{ text: string; x: number; y: number; alpha: number }> = [];
    const walk = (o: unknown): void => {
      const n = o as {
        type?: string;
        text?: string;
        alpha?: number;
        x?: number;
        y?: number;
        list?: unknown[];
        getWorldTransformMatrix?: () => { tx: number; ty: number };
      };
      if (!n) return;
      if (n.type === 'Text' && n.text) {
        const m = n.getWorldTransformMatrix?.();
        out.push({
          text: String(n.text).trim(),
          x: m ? m.tx : (n.x ?? 0),
          y: m ? m.ty : (n.y ?? 0),
          alpha: n.alpha ?? 1
        });
      }
      if (n.list) n.list.forEach(walk);
    };
    s.children.list.forEach(walk);
    return out;
  });
}

async function tocco(page: import('@playwright/test').Page, x: number, y: number, attesa = 650) {
  const box = await page.locator('#game canvas').boundingBox();
  expect(box, 'il canvas deve essere visibile').not.toBeNull();
  await page.mouse.click(box!.x + (box!.width * x) / 1024, box!.y + (box!.height * y) / 576);
  await page.waitForTimeout(attesa);
}

async function toccaTesto(
  page: import('@playwright/test').Page,
  label: string,
  zona: 'auto' | 'left' | 'right' = 'auto'
): Promise<boolean> {
  const cand = (await testi(page)).filter((o) => o.text === String(label).trim() && o.alpha > 0.25);
  if (cand.length === 0) return false;
  const scelta =
    zona === 'left'
      ? cand.reduce((a, c) => (Math.abs(c.x - 276) < Math.abs(a.x - 276) ? c : a))
      : zona === 'right'
        ? cand.reduce((a, c) => (Math.abs(c.x - 748) < Math.abs(a.x - 748) ? c : a))
        : cand.reduce((a, c) => (c.y > a.y ? c : a)); // pozza/opzioni: più in basso
  await tocco(page, scelta.x, scelta.y);
  return true;
}

async function attendi(
  page: import('@playwright/test').Page,
  pred: () => Promise<boolean>,
  ms = 9000
): Promise<boolean> {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (await pred()) return true;
    await page.waitForTimeout(150);
  }
  return false;
}

test.describe('Tappa completa', () => {
  test('si gioca una tappa intera e si arriva ai risultati con le stelle', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/');
    await expect(page.locator('#game canvas')).toBeVisible();

    const iniziale = await stato(page);
    test.skip(iniziale.scena === null, 'Il motore non espone window.__GIOCO__.');
    test.skip(
      !(await page.evaluate(() => {
        const g = window as unknown as { __GIOCO__?: { scenaAttiva?: unknown } };
        return Boolean(g.__GIOCO__?.scenaAttiva);
      })),
      'Serve il getter scenaAttiva per giocare come un bambino.'
    );

    // ── Titolo → materia
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');
    await tocco(page, 512, 358);
    await expect.poll(async () => (await stato(page)).scena).toBe('Subject');
    await tocco(page, 322, 248);
    await expect.poll(async () => (await stato(page)).scena).toBe('Game');

    // ── La tappa reale, con le prove estratte per la partita in corso
    const livello = await page.evaluate(async () => {
      const g = (window as unknown as { __GIOCO__?: { rounds?: Array<Record<string, unknown>> } }).__GIOCO__;
      const percorso = '/src/content/packs.ts';
      const m = (await import(/* @vite-ignore */ percorso)) as {
        allPacks: () => Array<{
          subject: string;
          levels: Array<{
            id: string;
            rounds: Array<Record<string, unknown>>;
          }>;
        }>;
      };
      const pack = m.allPacks().find((x) => x.subject === 'matematica');
      const lv = pack!.levels[0];
      return {
        id: lv.id,
        rounds: (g?.rounds && g.rounds.length > 0 ? g.rounds : lv.rounds) as unknown as Array<{
          prompt: string;
          type: string;
          mode?: string;
          options?: Array<{ label: string; correct: boolean }>;
          sortItems?: string[];
          leftItems?: string[];
          rightItems?: string[];
          pairs?: Array<[number, number]>;
          items?: string[];
        }>
      };
    });
    expect(livello.rounds.length).toBeGreaterThan(0);

    // ── Gioca ogni prova
    for (const round of livello.rounds) {
      if ((await stato(page)).scena !== 'Game') break;

      if (round.type === 'quiz') {
        const giusta = round.options!.find((o) => o.correct)!.label;
        expect(await toccaTesto(page, giusta), `opzione "${giusta}" non trovata`).toBe(true);
      } else if (round.type === 'dragdrop' && round.mode === 'sort') {
        for (const label of round.sortItems!) {
          expect(await toccaTesto(page, label), `tessera "${label}" non trovata`).toBe(true);
        }
      } else if (round.type === 'dragdrop' && round.mode === 'match') {
        for (const [l, r] of round.pairs!) {
          expect(await toccaTesto(page, round.leftItems![l], 'left')).toBe(true);
          expect(await toccaTesto(page, round.rightItems![r], 'right')).toBe(true);
        }
      } else if (round.type === 'sequence') {
        for (const label of round.items!) {
          expect(await toccaTesto(page, label), `passo "${label}" non trovato`).toBe(true);
        }
      } else {
        throw new Error(`tipo di prova non gestito dal test: ${round.type}/${round.mode}`);
      }

      if ((await stato(page)).scena === 'Game') {
        await attendi(page, async () => {
          if ((await stato(page)).scena !== 'Game') return true;
          return !(await testi(page)).some((o) => o.text === round.prompt);
        });
      }
    }

    // ── Risultati
    await expect.poll(async () => (await stato(page)).scena, { timeout: 12_000 }).toBe('Results');

    const finale = await testi(page);
    expect(
      finale.map((t) => t.text).some((txt) => txt.includes('Tappa completata') || txt.includes('Bravissimo'))
    ).toBe(true);
    expect(finale.map((t) => t.text)).toContain(`${livello.rounds.length} su ${livello.rounds.length}`);

    // 3 stelle: gioco perfetto, tutte le prove al primo colpo
    const stellePiene = await page.evaluate(() => {
      const g = (window as unknown as {
        __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
      }).__GIOCO__;
      const s = g?.scenaAttiva;
      if (!s) return 0;
      let n = 0;
      for (const o of s.children.list as Array<{ texture?: { key?: string }; alpha?: number }>) {
        if (o.texture?.key === 'star' && (o.alpha ?? 1) > 0.5) n++;
      }
      return n;
    });
    expect(stellePiene).toBe(3);

    // ── Il progresso è salvato davvero
    const salvato = await page.evaluate(() => localStorage.getItem('sic.progress'));
    expect(salvato, 'il progresso deve finire in localStorage').not.toBeNull();
    const p = JSON.parse(salvato!) as Record<string, Record<string, number>>;
    expect(p['mat-7-9'][livello.id]).toBe(3);

    // ── Lo storico per l'insegnante è salvato davvero (non solo le stelle)
    const storiaRaw = await page.evaluate(() => localStorage.getItem('sic.history'));
    expect(storiaRaw, 'lo storico deve finire in localStorage').not.toBeNull();
    const storia = JSON.parse(storiaRaw!) as Array<{
      correct: number;
      total: number;
      scorePct: number;
      durationMs: number;
      outcomes: Array<{ correct: boolean }>;
    }>;
    expect(storia).toHaveLength(1);
    expect(storia[0].correct).toBe(livello.rounds.length);
    expect(storia[0].scorePct).toBe(100);
    expect(storia[0].outcomes).toHaveLength(livello.rounds.length);
    expect(storia[0].outcomes.every((o) => o.correct)).toBe(true);
    expect(storia[0].durationMs).toBeGreaterThan(0);

    // ── La seconda tappa si raggiunge dai risultati
    expect(finale.map((t) => t.text)).toContain('Tappa successiva');
    expect(await toccaTesto(page, 'Tappa successiva')).toBe(true);
    await expect.poll(async () => (await stato(page)).scena).toBe('Game');

    const secondoPrompt = await page.evaluate(async () => {
      const g = (window as unknown as { __GIOCO__?: { rounds?: Array<{ prompt: string }> } }).__GIOCO__;
      if (g?.rounds && g.rounds.length > 0) return g.rounds[0].prompt;
      const percorso = '/src/content/packs.ts';
      const m = (await import(/* @vite-ignore */ percorso)) as {
        allPacks: () => Array<{
          subject: string;
          levels: Array<{ rounds: Array<{ prompt: string }> }>;
        }>;
      };
      const pack = m.allPacks().find((x) => x.subject === 'matematica');
      return pack!.levels[1].rounds[0].prompt;
    });
    expect((await testi(page)).map((t) => t.text)).toContain(secondoPrompt);

    // ── Le stelle sopravvivono al ritorno alla scelta materia
    await page.goto('/');
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');
    await tocco(page, 512, 358); // "Gioca"
    await expect.poll(async () => (await stato(page)).scena).toBe('Subject');
    expect((await testi(page)).map((t) => t.text)).toContain('★ 3 / 3');
  });
});
