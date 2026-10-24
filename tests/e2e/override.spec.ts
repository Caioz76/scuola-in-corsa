import { expect, test } from '@playwright/test';

/**
 * Regole BES una per una (override).
 *
 * Senza profilo, "Pausa quando serve" è spenta. Il test la accende dal pannello
 * e verifica due cose: che l'override sia salvato e che il gioco mostri DAVVERO
 * il bottone "Pausa". Non basta che la riga diventi verde.
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

async function toccaTesto(page: import('@playwright/test').Page, label: string): Promise<boolean> {
  const t = (await testi(page)).find((o) => o.text === label);
  if (!t) return false;
  await tocco(page, t.x + 4, t.y);
  return true;
}

test('alto contrasto: i testi diventano neri (prima e dopo il profilo)', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');

  const leggi = async (): Promise<Record<string, string>> =>
    page.evaluate(() => {
      const g = (window as unknown as {
        __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
      }).__GIOCO__;
      const s = g?.scenaAttiva;
      const out: Record<string, string> = {};
      const walk = (o: unknown): void => {
        const n = o as {
          type?: string;
          text?: string;
          style?: { color?: string };
          list?: unknown[];
        };
        if (!n) return;
        if (n.type === 'Text' && n.text) out[String(n.text).trim()] = n.style?.color ?? '';
        if (n.list) n.list.forEach(walk);
      };
      s?.children.list.forEach(walk);
      return out;
    });

  // Senza profilo il sottotitolo è grigio ardesia su fondo chiaro.
  expect((await leggi())['Scegli la materia e corri!']).toBe('#5f7186');

  await page.evaluate(() => {
    localStorage.setItem('sic.settings', JSON.stringify({ profileId: 'dislessia', overrides: {} }));
  });
  await page.reload();
  await expect.poll(() => scena(page)).toBe('Title');

  // Con Dislessia (highContrast) lo stesso testo diventa nero pieno.
  expect((await leggi())['Scegli la materia e corri!']).toBe('#000000');
});

test('accendo "Pausa quando serve" senza profilo e il gioco la mostra', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');

  await tocco(page, 512, 458); // Impostazioni
  await expect.poll(() => scena(page)).toBe('Settings');

  expect(await toccaTesto(page, 'Regole una per una')).toBe(true);
  await expect.poll(() => scena(page)).toBe('Settings');
  expect((await testi(page)).map((t) => t.text)).toContain('Pausa quando serve');

  // La regola è spenta: nessun override salvato.
  expect(
    await page.evaluate(() => {
      const raw = localStorage.getItem('sic.settings');
      return raw ? (JSON.parse(raw) as { overrides?: Record<string, boolean> }).overrides?.pauseAllowed : undefined;
    })
  ).toBeUndefined();

  expect(await toccaTesto(page, 'Pausa quando serve')).toBe(true);
  await page.waitForTimeout(500);

  // L'override è salvato...
  await expect
    .poll(() =>
      page.evaluate(() => {
        const raw = localStorage.getItem('sic.settings');
        return raw ? (JSON.parse(raw) as { overrides?: Record<string, boolean> }).overrides?.pauseAllowed : undefined;
      })
    )
    .toBe(true);

  // ...e arriva fino al gioco: "Pausa" compare davvero.
  expect(await toccaTesto(page, 'Torna ai profili')).toBe(true);
  expect(await toccaTesto(page, 'Torna al titolo')).toBe(true);
  await expect.poll(() => scena(page)).toBe('Title');
  await tocco(page, 512, 358); // Gioca
  await expect.poll(() => scena(page)).toBe('Subject');
  await tocco(page, 322, 248); // Matematica
  await expect.poll(() => scena(page)).toBe('Game');
  expect((await testi(page)).map((t) => t.text)).toContain('Pausa');
});
