import { expect, test } from '@playwright/test';

/**
 * Pausa e progresso esplicito — regole BES che devono avere effetto.
 *
 * Col profilo ADHD il gioco mostra "Prova 1 di 6" e il bottone "Pausa".
 * La pausa mette davvero in pausa la scena di gioco (non è solo un velo):
 * "Continua" riprende dalla stessa prova. Senza profilo, né pausa né contatore.
 */

async function scena(page: import('@playwright/test').Page): Promise<string | null> {
  return page.evaluate(() => {
    const g = (window as unknown as { __GIOCO__?: { scena?: string } }).__GIOCO__;
    return g?.scena ?? null;
  });
}

async function testi(page: import('@playwright/test').Page): Promise<Array<{ text: string; x: number; y: number }>> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
    const s = g?.scenaAttiva;
    if (!s) return [];
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
        out.push({
          text: String(n.text).trim(),
          x: m ? m.tx : (n.x ?? 0),
          y: m ? m.ty : (n.y ?? 0)
        });
      }
      if (n.list) n.list.forEach(walk);
    };
    s.children.list.forEach(walk);
    return out;
  });
}

async function tocco(page: import('@playwright/test').Page, x: number, y: number, attesa = 600) {
  const box = await page.locator('#game canvas').boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box!.x + (box!.width * x) / 1024, box!.y + (box!.height * y) / 576);
  await page.waitForTimeout(attesa);
}

async function vaiAllaPrimaTappa(page: import('@playwright/test').Page) {
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');
  await tocco(page, 512, 358); // Gioca
  await expect.poll(() => scena(page)).toBe('Subject');
  await tocco(page, 872, 44); // Tutte le tappe
  await expect.poll(() => scena(page)).toBe('Levels');
  await tocco(page, 520, 150); // Matematica, tappa 1
  await expect.poll(() => scena(page)).toBe('Game');
}

async function primoPrompt(page: import('@playwright/test').Page): Promise<string> {
  return page.evaluate(async () => {
    const percorso = '/src/content/packs.ts';
    const m = (await import(/* @vite-ignore */ percorso)) as {
      allPacks: () => Array<{
        subject: string;
        levels: Array<{ rounds: Array<{ prompt: string }> }>;
      }>;
    };
    return m.allPacks().find((p) => p.subject === 'matematica')!.levels[0].rounds[0].prompt;
  });
}

test('ADHD: contatore di prova e pausa che riprende dallo stesso punto', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('sic.settings', JSON.stringify({ profileId: 'adhd', overrides: {} }));
  });
  await vaiAllaPrimaTappa(page);

  const etichette = (await testi(page)).map((t) => t.text);
  expect(etichette).toContain('Prova 1 di 6');
  expect(etichette).toContain('Pausa');
  const prompt = await primoPrompt(page);
  expect(etichette).toContain(prompt);

  await tocco(page, 72, 40); // Pausa
  await expect.poll(() => scena(page)).toBe('Pause');
  expect((await testi(page)).map((t) => t.text)).toContain('Continua');

  await tocco(page, 512, 336); // Continua
  await expect.poll(() => scena(page)).toBe('Game');

  // Riparte dalla stessa prova, non dall'inizio.
  const dopo = (await testi(page)).map((t) => t.text);
  expect(dopo).toContain(prompt);
  expect(dopo).toContain('Prova 1 di 6');
});

test('senza profilo: niente pausa e niente contatore', async ({ page }) => {
  await vaiAllaPrimaTappa(page);
  const etichette = (await testi(page)).map((t) => t.text);
  expect(etichette).not.toContain('Pausa');
  expect(etichette).not.toContain('Prova 1 di 6');
});
