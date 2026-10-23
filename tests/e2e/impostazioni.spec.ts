import { expect, test } from '@playwright/test';

/**
 * Test delle impostazioni BES — dal pannello al comportamento del gioco.
 *
 * Non basta salvare un profilo: qui si verifica che una regola abbia EFFETTO.
 * Il profilo "Discalculia" attiva `fewerOptions`, quindi una domanda con 4
 * opzioni deve mostrarne solo 2, mantenendo quella corretta.
 */

async function stato(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const g = (window as unknown as { __GIOCO__?: { scena?: string } }).__GIOCO__;
    return { scena: g?.scena ?? null };
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

async function tocco(page: import('@playwright/test').Page, x: number, y: number, attesa = 650) {
  const box = await page.locator('canvas').boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box!.x + (box!.width * x) / 1024, box!.y + (box!.height * y) / 576);
  await page.waitForTimeout(attesa);
}

async function toccaTesto(page: import('@playwright/test').Page, label: string, attesa = 650): Promise<boolean> {
  const t = (await testi(page)).find((o) => o.text === label);
  if (!t) return false;
  await tocco(page, t.x, t.y, attesa);
  return true;
}

test.describe('Impostazioni BES', () => {
  test('scelgo un profilo, viene salvato e cambia davvero il gioco', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/');
    await expect(page.locator('canvas')).toBeVisible();

    test.skip(
      !(await page.evaluate(() => Boolean((window as unknown as { __GIOCO__?: { scenaAttiva?: unknown } }).__GIOCO__?.scenaAttiva))),
      'Serve il getter scenaAttiva.'
    );

    // ── Dal titolo alle impostazioni
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');
    expect(await toccaTesto(page, 'Impostazioni')).toBe(true);
    await expect.poll(async () => (await stato(page)).scena).toBe('Settings');

    // ── I nove profili sono presenti
    const etichette = (await testi(page)).map((t) => t.text);
    for (const atteso of ['ADHD', 'Autismo', 'Dislessia', 'Discalculia', 'Disgrafia', 'Disprassia', 'Sordità', 'DSA / Ansia']) {
      expect(etichette, `profilo "${atteso}" mancante`).toContain(atteso);
    }

    // ── Scelgo Discalculia (seconda riga, prima colonna)
    expect(await toccaTesto(page, 'Discalculia')).toBe(true);
    await page.waitForTimeout(400);

    const salvato = await page.evaluate(() => localStorage.getItem('sic.settings'));
    expect(salvato, 'il profilo deve essere salvato in sic.settings').not.toBeNull();
    expect((JSON.parse(salvato!) as { profileId?: string }).profileId).toBe('discalculia');

    // ── Torno al titolo e gioco: `fewerOptions` deve mostrare 2 opzioni
    expect(await toccaTesto(page, 'Torna al titolo')).toBe(true);
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');
    await tocco(page, 512, 358); // Gioca
    await expect.poll(async () => (await stato(page)).scena).toBe('Subject');
    await tocco(page, 322, 248); // Matematica
    await expect.poll(async () => (await stato(page)).scena).toBe('Game');

    const livello = await page.evaluate(async () => {
      const percorso = '/src/content/packs.ts';
      const m = (await import(/* @vite-ignore */ percorso)) as {
        allPacks: () => Array<{
          subject: string;
          levels: Array<{ rounds: Array<{ options?: Array<{ label: string; correct: boolean }> }> }>;
        }>;
      };
      return m.allPacks().find((p) => p.subject === 'matematica')!.levels[0].rounds[0];
    });

    const risposte = livello.options!.map((o) => o.label);
    const visibili = (await testi(page)).filter((t) => risposte.includes(t.text));
    expect(visibili.length, 'con fewerOptions devono restare 2 opzioni').toBe(2);
    expect(visibili.map((v) => v.text)).toContain(livello.options!.find((o) => o.correct)!.label);
  });
});
