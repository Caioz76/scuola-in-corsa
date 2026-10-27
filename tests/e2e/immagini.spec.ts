import { expect, test, type Page } from '@playwright/test';

/**
 * Prova "riconosci l'immagine": l'icona (es. l'albero) appartiene alla domanda.
 * Quando la domanda cambia, l'icona vecchia deve sparire: se resta, il bambino
 * vede l'albero mentre gli si chiede del Sole. Questo test gioca la prima
 * tappa di Scienze e controlla le texture presenti nella scena.
 */

async function scena(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    const g = (window as unknown as { __GIOCO__?: { scena?: string } }).__GIOCO__;
    return g?.scena ?? null;
  });
}

async function testi(page: Page): Promise<Array<{ text: string; x: number; y: number }>> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
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
    g?.scenaAttiva?.children.list.forEach(walk);
    return out;
  });
}

/** Texture delle icone di prova presenti nella scena. */
async function icone(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
    const out: string[] = [];
    const walk = (o: unknown): void => {
      const n = o as { type?: string; texture?: { key?: string }; list?: unknown[] };
      if (!n) return;
      const key = n.texture?.key ?? '';
      if (n.type === 'Image' && key.startsWith('icon-')) out.push(key);
      if (n.list) n.list.forEach(walk);
    };
    g?.scenaAttiva?.children.list.forEach(walk);
    return out;
  });
}

async function tocco(page: Page, x: number, y: number, attesa = 650): Promise<void> {
  const box = await page.locator('#game canvas').boundingBox();
  expect(box, 'il canvas deve essere visibile').not.toBeNull();
  await page.mouse.click(box!.x + (box!.width * x) / 1024, box!.y + (box!.height * y) / 576);
  await page.waitForTimeout(attesa);
}

async function toccaTesto(page: Page, label: string): Promise<boolean> {
  const cand = (await testi(page)).filter((t) => t.text === label && t.y > 250);
  if (cand.length === 0) return false;
  const scelto = cand.reduce((a, c) => (c.y > a.y ? c : a));
  await tocco(page, scelto.x, scelto.y, 300);
  return true;
}

async function attendi(page: Page, pred: () => Promise<boolean>, ms = 12_000): Promise<boolean> {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (await pred()) return true;
    await page.waitForTimeout(150);
  }
  return false;
}

test('prova immagine: l\'icona vecchia sparisce quando cambia la domanda', async ({ page }) => {
  test.setTimeout(60_000);
  await page.addInitScript(() => {
    localStorage.setItem(
      'sic.settings',
      JSON.stringify({
        profileId: null,
        overrides: {},
        mode: 'quiz',
        graphics: '2d',
        randomQuestions: false
      })
    );
  });
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');
  await tocco(page, 640, 368); // Gioca
  await expect.poll(() => scena(page)).toBe('Subject');
  await tocco(page, 322, 368, 200); // Scienze
  await expect.poll(() => scena(page)).toBe('Game');

  // Prima prova: l'albero.
  const prima = await attendi(page, async () =>
    (await testi(page)).some((t) => t.text === 'Che cosa vedi nell\'immagine?')
  );
  expect(prima, 'la prima prova di Scienze deve essere quella dell\'albero').toBe(true);
  expect(await icone(page)).toContain('icon-albero');

  expect(await toccaTesto(page, 'Un albero'), 'la risposta "Un albero" deve essere toccabile').toBe(
    true
  );

  // Seconda prova: il Sole. L'albero non deve restare dietro.
  const seconda = await attendi(page, async () =>
    (await testi(page)).some((t) => t.text === 'Quale corpo celeste riscalda la Terra?')
  );
  expect(seconda, 'dopo la risposta deve arrivare la domanda sul Sole').toBe(true);

  const dopo = await icone(page);
  expect(dopo, 'l\'icona della domanda precedente non deve restare visibile').not.toContain(
    'icon-albero'
  );
  expect(dopo, 'la nuova domanda deve mostrare la sua icona').toContain('icon-sole');
});
