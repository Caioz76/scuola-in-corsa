import { expect, test, type Page } from '@playwright/test';

/**
 * Modalità Runner: le prove a scelta non sono bottoni ma **cartelli** piantati
 * sulla pista. Questi test verificano fatti osservabili, non promesse:
 *  - la modalità si sceglie dalle Impostazioni e resta salvata (anche cambiando
 *    profilo, che è il punto in cui si perdeva);
 *  - in partita i cartelli sostituiscono i bottoni;
 *  - toccare il cartello giusto fa saltare Pico e porta alla prova dopo;
 *  - con "meno opzioni" i cartelli sono due;
 *  - dopo 3 errori la prova si sblocca lo stesso (mai bloccarsi).
 *
 * La modalità Quiz resta coperta da `tappa.spec.ts`, che gioca una tappa intera.
 */

interface Testo {
  text: string;
  x: number;
  y: number;
}

interface Pico {
  texture: string | null;
  x: number | null;
  y: number | null;
}

interface Mondo {
  segni: number;
  bottoni: number;
  pico: Pico;
  pista: number;
}

async function scena(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    const g = (window as unknown as { __GIOCO__?: { scena?: string } }).__GIOCO__;
    return g?.scena ?? null;
  });
}

/** Testi della scena attiva, con coordinate di mondo (dentro i container). */
async function testi(page: Page): Promise<Testo[]> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
    const out: Testo[] = [];
    const walk = (o: unknown): void => {
      const n = o as {
        type?: string;
        text?: string;
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
          y: m ? m.ty : (n.y ?? 0)
        });
      }
      if (n.list) n.list.forEach(walk);
    };
    g?.scenaAttiva?.children.list.forEach(walk);
    return out;
  });
}

/** Stato osservabile del mondo: cartelli, bottoni, Pico, scorrimento. */
async function mondo(page: Page): Promise<Mondo> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
    const out: Mondo = {
      segni: 0,
      bottoni: 0,
      pico: { texture: null, x: null, y: null },
      pista: 0
    };
    for (const o of g?.scenaAttiva?.children.list ?? []) {
      const n = o as {
        type?: string;
        name?: string;
        texture?: { key?: string };
        x?: number;
        y?: number;
        tilePositionX?: number;
      };
      const key = n.texture?.key ?? '';
      if (n.type === 'Container' && n.name === 'segno') out.segni++;
      if (n.type === 'Sprite' && key.startsWith('btn-')) out.bottoni++;
      if (n.type === 'Image' && n.name === 'pico') {
        out.pico = { texture: key, x: n.x ?? null, y: n.y ?? null };
      }
      if (n.type === 'TileSprite' && n.name === 'pista') out.pista = n.tilePositionX ?? 0;
    }
    return out;
  });
}

/** Texture del bottone che contiene l'etichetta (verde = scelto). */
async function evidenza(page: Page, label: string): Promise<string | null> {
  return page.evaluate((testo) => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
    for (const o of g?.scenaAttiva?.children.list ?? []) {
      const c = o as {
        type?: string;
        list?: Array<{ type?: string; text?: string; texture?: { key?: string } }>;
      };
      if (c.type !== 'Container' || !c.list) continue;
      const has = c.list.some((n) => n.type === 'Text' && String(n.text).trim() === testo);
      if (!has) continue;
      const sprite = c.list.find((n) => n.type === 'Sprite');
      return sprite?.texture?.key ?? null;
    }
    return null;
  }, label);
}

async function tocco(page: Page, x: number, y: number, attesa = 650): Promise<void> {
  const box = await page.locator('canvas').boundingBox();
  expect(box, 'il canvas deve essere visibile').not.toBeNull();
  await page.mouse.click(box!.x + (box!.width * x) / 1024, box!.y + (box!.height * y) / 576);
  await page.waitForTimeout(attesa);
}

async function attendi(page: Page, pred: () => Promise<boolean>, ms = 9000): Promise<boolean> {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (await pred()) return true;
    await page.waitForTimeout(150);
  }
  return false;
}

/** Dal titolo alla prima prova di Matematica. */
async function avviaMatematica(page: Page): Promise<void> {
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');
  await tocco(page, 512, 358); // Gioca
  await expect.poll(() => scena(page)).toBe('Subject');
  await tocco(page, 322, 248); // Matematica
  await expect.poll(() => scena(page)).toBe('Game');
}

/** Le prime due prove della tappa 1 di Matematica, lette dal pack vero. */
async function prove(page: Page): Promise<
  Array<{
    prompt: string;
    type: string;
    options?: Array<{ label: string; correct: boolean }>;
  }>
> {
  return page.evaluate(async () => {
    const percorso = '/src/content/packs.ts';
    const m = (await import(/* @vite-ignore */ percorso)) as {
      allPacks: () => Array<{
        subject: string;
        levels: Array<{ rounds: Array<{ prompt: string; type: string; options?: Array<{ label: string; correct: boolean }> }> }>;
      }>;
    };
    const pack = m.allPacks().find((p) => p.subject === 'matematica')!;
    return pack.levels[0].rounds;
  });
}

async function impostaModalita(page: Page, mode: 'quiz' | 'runner', overrides = {}): Promise<void> {
  await page.addInitScript(
    ([m, o]) => {
      localStorage.setItem('sic.settings', JSON.stringify({ profileId: null, overrides: o, mode: m }));
    },
    [mode, overrides] as const
  );
}

test.describe('Modalità Runner', () => {
  test('si sceglie dalle Impostazioni e resta salvata anche cambiando profilo', async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
    await page.goto('/');
    await expect.poll(() => scena(page)).toBe('Title');

    await tocco(page, 512, 458); // Impostazioni
    await expect.poll(() => scena(page)).toBe('Settings');

    // Il default è Quiz: il bottone verde è quello del quiz.
    expect(await evidenza(page, 'Quiz (bottoni)')).toBe('btn-green');
    expect(await evidenza(page, 'Runner (cartelli)')).toBe('btn-blue');

    await tocco(page, 664, 148); // Runner
    const salvata = await page.evaluate(() => localStorage.getItem('sic.settings'));
    expect(salvata).not.toBeNull();
    expect(JSON.parse(salvata!).mode).toBe('runner');
    expect(await evidenza(page, 'Runner (cartelli)')).toBe('btn-green');

    // Cambiare profilo non deve perdere la modalità scelta.
    await tocco(page, 200, 218); // ADHD
    expect(await evidenza(page, 'Runner (cartelli)')).toBe('btn-green');
    expect(JSON.parse((await page.evaluate(() => localStorage.getItem('sic.settings')))!).mode).toBe(
      'runner'
    );

    await tocco(page, 250, 500); // Nessun profilo
    expect(JSON.parse((await page.evaluate(() => localStorage.getItem('sic.settings')))!).mode).toBe(
      'runner'
    );

    // E tornando al Quiz la scelta si inverte.
    await tocco(page, 448, 148);
    expect(JSON.parse((await page.evaluate(() => localStorage.getItem('sic.settings')))!).mode).toBe(
      'quiz'
    );
  });

  test('in partita i cartelli sostituiscono i bottoni del quiz', async ({ page }) => {
    await impostaModalita(page, 'runner');
    await avviaMatematica(page);
    const rounds = await prove(page);
    const primo = rounds[0];
    expect(primo.type, 'la prima prova deve essere a scelta').toBe('quiz');

    // I cartelli entrano da destra: diamo loro il tempo di fermarsi.
    expect(await attendi(page, async () => (await mondo(page)).segni > 0)).toBe(true);
    const stato = await mondo(page);
    expect(stato.segni, 'un cartello per ogni opzione').toBe(primo.options!.length);
    expect(stato.bottoni, 'nessun bottone di risposta in modalità Runner').toBe(0);

    // Le etichette delle opzioni stanno sui cartelli, in basso (sulla pista).
    const etichette = (await testi(page)).filter((t) => t.y > 300).map((t) => t.text);
    for (const opt of primo.options!) {
      expect(etichette, `il cartello "${opt.label}" deve essere sulla pista`).toContain(opt.label);
    }

    // E il mondo continua a scorrere: è una corsa, non una schermata ferma.
    const prima = await mondo(page);
    await page.waitForTimeout(600);
    expect((await mondo(page)).pista, 'la pista deve scorrere').toBeGreaterThan(prima.pista);
  });

  test('toccare il cartello giusto fa saltare Pico e passa alla prova dopo', async ({ page }) => {
    await impostaModalita(page, 'runner');
    await avviaMatematica(page);
    const rounds = await prove(page);
    const primo = rounds[0];
    const giusta = primo.options!.find((o) => o.correct)!.label;

    expect(await attendi(page, async () => (await mondo(page)).segni > 0)).toBe(true);
    await page.waitForTimeout(700); // fine dell'ingresso dei cartelli
    const cartello = (await testi(page)).find((t) => t.text === giusta && t.y > 300);
    expect(cartello, `il cartello "${giusta}" deve essere toccabile`).toBeTruthy();

    const prima = await mondo(page);
    expect(prima.pico.texture).toMatch(/^pico-run[12]$/);
    expect(prima.pico.x).toBeLessThan(200);

    await tocco(page, cartello!.x, cartello!.y, 150);
    const durante = await mondo(page);
    expect(durante.pico.texture, 'Pico salta verso il cartello').toBe('pico-jump');
    expect(durante.pico.y!, 'Pico si stacca da terra').toBeLessThan(prima.pico.y! - 40);
    expect(durante.pico.x!, 'Pico va verso il cartello scelto').toBeGreaterThan(prima.pico.x! + 80);

    // La corsa avanza: compare la domanda della prova successiva.
    const dopo = await attendi(
      page,
      async () => (await testi(page)).some((t) => t.text === rounds[1].prompt),
      8000
    );
    expect(dopo, 'dopo la risposta giusta deve arrivare la prova successiva').toBe(true);

    // Pico è tornato al suo posto, pronto per il prossimo salto.
    const riposo = await mondo(page);
    expect(riposo.pico.x).toBeLessThan(200);
    expect(riposo.pico.texture).toMatch(/^pico-run[12]$/);
  });

  test('con "meno opzioni" restano due cartelli', async ({ page }) => {
    await impostaModalita(page, 'runner', { fewerOptions: true });
    await avviaMatematica(page);
    expect(await attendi(page, async () => (await mondo(page)).segni > 0)).toBe(true);
    expect((await mondo(page)).segni).toBe(2);
  });

  test('dopo 3 errori la prova si sblocca lo stesso', async ({ page }) => {
    test.setTimeout(45_000);
    await impostaModalita(page, 'runner');
    await avviaMatematica(page);
    const rounds = await prove(page);
    const primo = rounds[0];
    const sbagliata = primo.options!.find((o) => !o.correct)!.label;

    expect(await attendi(page, async () => (await mondo(page)).segni > 0)).toBe(true);
    await page.waitForTimeout(700); // fine dell'ingresso dei cartelli

    // Tocca il cartello sbagliato e verifica che il tocco sia arrivato: Pico
    // salta. Se il primo tocco cade nel vuoto (cartello ancora in movimento) si
    // riprova una volta, ma un tocco che il gioco ignora fa fallire il test.
    const toccaSbagliata = async (tentativo: number): Promise<boolean> => {
      for (let prova = 0; prova < 2; prova++) {
        const cartello = (await testi(page)).find((t) => t.text === sbagliata && t.y > 300);
        expect(cartello, `tentativo ${tentativo}: cartello sbagliato non trovato`).toBeTruthy();
        await tocco(page, cartello!.x, cartello!.y, 200);
        if ((await mondo(page)).pico.texture === 'pico-jump') return true;
      }
      return false;
    };

    for (let tentativo = 1; tentativo <= 3; tentativo++) {
      expect(await toccaSbagliata(tentativo), `tentativo ${tentativo} non registrato`).toBe(true);
      await page.waitForTimeout(1100);
    }

    const avanti = await attendi(
      page,
      async () => (await testi(page)).some((t) => t.text === rounds[1].prompt),
      10_000
    );
    expect(avanti, 'tre errori non devono bloccare la corsa').toBe(true);
  });
});
