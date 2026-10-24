import { expect, test } from '@playwright/test';

/**
 * Il "mondo" della corsa: scenografia, Pico e pista.
 *
 * Questi test esistono perché il gioco deve sembrare una corsa, non un quiz
 * su fondo nero. Verificano fatti osservabili: la scenografia c'è, il terreno
 * scorre, Pico c'è e salta quando la risposta è giusta. Inoltre coprono due
 * regole BES che prima erano solo dichiarate:
 *  - `reduceMotion` → scenografia ferma;
 *  - `noDecoration` → niente scenografia, ma la pista resta.
 */

interface Mondo {
  pico: string | null;
  picoX: number | null;
  picoY: number | null;
  sfondi: string[];
  terreno: number;
}

async function scena(page: import('@playwright/test').Page): Promise<string | null> {
  return page.evaluate(() => {
    const g = (window as unknown as { __GIOCO__?: { scena?: string } }).__GIOCO__;
    return g?.scena ?? null;
  });
}

async function mondo(page: import('@playwright/test').Page): Promise<Mondo> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
    const s = g?.scenaAttiva;
    const out: Mondo = { pico: null, picoX: null, picoY: null, sfondi: [], terreno: 0 };
    for (const o of s?.children.list ?? []) {
      const n = o as {
        type?: string;
        name?: string;
        texture?: { key?: string };
        tilePositionX?: number;
        x?: number;
        y?: number;
      };
      const key = n.texture?.key ?? '';
      if (n.type === 'Image' && n.name === 'pico') {
        out.pico = key;
        out.picoX = n.x ?? null;
        out.picoY = n.y ?? null;
      }
      if (n.type === 'TileSprite') {
        if (n.name === 'bg-far' || n.name === 'bg-mid') out.sfondi.push(n.name);
        if (n.name === 'pista') out.terreno = n.tilePositionX ?? 0;
      }
    }
    return out;
  });
}

async function testi(page: import('@playwright/test').Page): Promise<Array<{ text: string; x: number; y: number }>> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
    const s = g?.scenaAttiva;
    const out: Array<{ text: string; x: number; y: number }> = [];
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
        out.push({ text: String(n.text).trim(), x: m ? m.tx : (n.x ?? 0), y: m ? m.ty : (n.y ?? 0) });
      }
      if (n.list) n.list.forEach(walk);
    };
    s?.children.list.forEach(walk);
    return out;
  });
}

async function tocco(page: import('@playwright/test').Page, x: number, y: number, attesa = 650) {
  const box = await page.locator('canvas').boundingBox();
  expect(box, 'il canvas deve essere visibile').not.toBeNull();
  await page.mouse.click(box!.x + (box!.width * x) / 1024, box!.y + (box!.height * y) / 576);
  await page.waitForTimeout(attesa);
}

test('il titolo è un mondo che scorre: scenografia, Pico e terreno in movimento', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');

  const prima = await mondo(page);
  expect(prima.pico, 'Pico deve essere in scena').toMatch(/^pico-/);
  expect(prima.sfondi).toEqual(['bg-far', 'bg-mid']);

  await page.waitForTimeout(700);
  const dopo = await mondo(page);
  expect(dopo.terreno, 'la pista deve scorrere').toBeGreaterThan(prima.terreno);
});

test('con "riduci i movimenti" la scenografia resta ferma', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('sic.settings', JSON.stringify({ profileId: null, overrides: { reduceMotion: true } }));
  });
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');

  const prima = await mondo(page);
  expect(prima.sfondi.length, 'la scenografia c’è, ma ferma').toBeGreaterThan(0);
  await page.waitForTimeout(700);
  const dopo = await mondo(page);
  expect(dopo.terreno).toBe(prima.terreno);
});

test('con "schermata pulita" niente scenografia, ma la pista resta', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('sic.settings', JSON.stringify({ profileId: null, overrides: { noDecoration: true } }));
  });
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');

  const prima = await mondo(page);
  expect(prima.sfondi, 'nessuno sfondo decorativo').toHaveLength(0);
  expect(prima.pico).toMatch(/^pico-/);
  await page.waitForTimeout(700);
  const dopo = await mondo(page);
  // Schermata calma: niente scorrimento, ma il terreno c'è.
  expect(dopo.terreno).toBe(prima.terreno);
});

test('risposta giusta: Pico salta (il mondo reagisce alla prova)', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');
  await tocco(page, 512, 358); // Gioca
  await expect.poll(() => scena(page)).toBe('Subject');
  await tocco(page, 322, 248); // Matematica
  await expect.poll(() => scena(page)).toBe('Game');

  const giusta = await page.evaluate(async () => {
    const percorso = '/src/content/packs.ts';
    const m = (await import(/* @vite-ignore */ percorso)) as {
      allPacks: () => Array<{ subject: string; levels: Array<{ rounds: Array<{ options?: Array<{ label: string; correct: boolean }> }> }> }>;
    };
    const pack = m.allPacks().find((p) => p.subject === 'matematica')!;
    return pack.levels[0].rounds[0].options!.find((o) => o.correct)!.label;
  });

  const bottone = (await testi(page)).find((t) => t.text === giusta);
  expect(bottone, `l'opzione "${giusta}" deve essere visibile`).toBeTruthy();

  const prima = await mondo(page);
  expect(prima.pico).toMatch(/^pico-run[12]$/);

  await page.mouse.click(
    (await page.locator('canvas').boundingBox())!.x + ((await page.locator('canvas').boundingBox())!.width * bottone!.x) / 1024,
    (await page.locator('canvas').boundingBox())!.y + ((await page.locator('canvas').boundingBox())!.height * bottone!.y) / 576
  );
  await page.waitForTimeout(140);

  const dopo = await mondo(page);
  expect(dopo.pico, 'durante lo scatto Pico salta').toBe('pico-jump');
  expect(dopo.picoY!).toBeLessThan(prima.picoY!);

  // Il salto non basta: la corsa deve avanzare. Dopo il primo checkpoint
  // Pico si è spostato lungo la pista, verso il traguardo.
  await page.waitForTimeout(700);
  const avanzato = await mondo(page);
  expect(avanzato.picoX!, 'Pico deve avanzare al checkpoint').toBeGreaterThan(prima.picoX! + 80);
});
