import { expect, test } from '@playwright/test';

/**
 * Scelta diretta della tappa (schermata "Tutte le tappe").
 *
 * Per l'insegnante la seconda tappa non deve dipendere dal completamento della
 * prima: questa schermata la rende raggiungibile in due tocchi dal titolo.
 * Il test tocca davvero la tappa 2 di matematica e verifica che il gioco mostri
 * la prima domanda di QUELLA tappa, non della prima.
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

test('dalla schermata tappe si gioca direttamente la seconda', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');

  await tocco(page, 640, 368); // Gioca
  await expect.poll(() => scena(page)).toBe('Subject');
  expect((await testi(page)).map((t) => t.text)).toContain('Tutte le tappe');

  await tocco(page, 872, 44); // Tutte le tappe
  await expect.poll(() => scena(page)).toBe('Levels');

  const etichette = (await testi(page)).map((t) => t.text);
  expect(etichette).toContain('Matematica');
  expect(etichette).toContain('Tappa 2 · ★ 0');

  // Riga di matematica (la prima), colonna della tappa 2.
  await tocco(page, 612, 145);
  await expect.poll(() => scena(page)).toBe('Game');

  const primoPrompt = await page.evaluate(async () => {
    const g = (window as unknown as { __GIOCO__?: { rounds?: Array<{ prompt: string }> } }).__GIOCO__;
    if (g?.rounds && g.rounds.length > 0) return g.rounds[0].prompt;
    const percorso = '/src/content/packs.ts';
    const m = (await import(/* @vite-ignore */ percorso)) as {
      allPacks: () => Array<{
        subject: string;
        levels: Array<{ id: string; rounds: Array<{ prompt: string }> }>;
      }>;
    };
    const pack = m.allPacks().find((p) => p.subject === 'matematica');
    return pack!.levels[1].rounds[0].prompt;
  });
  expect((await testi(page)).map((t) => t.text)).toContain(primoPrompt);
  expect((await testi(page)).some((t) => t.text.includes('Seconda tappa'))).toBe(true);
});
