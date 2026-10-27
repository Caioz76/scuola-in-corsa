import { expect, test } from '@playwright/test';

/**
 * Schermata Progressi: le stelle salvate devono comparire senza dover
 * rigiocare. I dati sono seminati in localStorage, così il test controlla la
 * lettura e la resa, non la partita (già coperta da tappa.spec).
 */

async function scena(page: import('@playwright/test').Page): Promise<string | null> {
  return page.evaluate(() => {
    const g = (window as unknown as { __GIOCO__?: { scena?: string } }).__GIOCO__;
    return g?.scena ?? null;
  });
}

async function testi(page: import('@playwright/test').Page): Promise<string[]> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
    }).__GIOCO__;
    const s = g?.scenaAttiva;
    if (!s) return [];
    const out: string[] = [];
    const walk = (o: unknown): void => {
      const n = o as { type?: string; text?: string; list?: unknown[] };
      if (!n) return;
      if (n.type === 'Text' && n.text) out.push(String(n.text).trim());
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

test('le stelle salvate compaiono nella schermata Progressi', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'sic.progress',
      JSON.stringify({ 'mat-7-9': { 'mat-7-9-l1': 3, 'mat-7-9-l2': 1 } })
    );
    localStorage.setItem(
      'sic.history',
      JSON.stringify([
        {
          packId: 'mat-7-9',
          levelId: 'mat-7-9-l2',
          total: 6,
          correct: 5,
          scorePct: 83,
          durationMs: 60000,
          profileId: null,
          outcomes: [],
          finishedAt: new Date('2026-10-24T09:00:00').getTime()
        }
      ])
    );
  });
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');

  await tocco(page, 640, 282); // Progressi e Stelle
  await expect.poll(() => scena(page)).toBe('Progress');

  const etichette = await testi(page);
  expect(etichette.some((t) => t.includes('Progressi'))).toBe(true);
  expect(etichette).toContain('Matematica — Prima tappa: contare e operare');
  expect(etichette).toContain('★ 3 / 3');
  expect(etichette).toContain('★ 1 / 3');
  expect(etichette.some((t) => t.includes('4 stelle'))).toBe(true);
  expect(etichette.some((t) => t.includes('Ultima partita: 5/6'))).toBe(true);
});
