import { expect, test, type Page } from '@playwright/test';

/**
 * Navigazione e pausa.
 *
 * Fatti verificati qui (non promesse):
 *  - in partita c'è SEMPRE una barra con "Pausa" ed "Esci", anche senza
 *    profilo BES: fermarsi non è un bisogno speciale;
 *  - "Pausa" ferma davvero la scena e "Continua" riprende dalla stessa prova;
 *  - "Esci" chiede conferma: "No" torna al gioco, "Sì" torna al titolo;
 *  - col profilo ADHD resta il contatore "Prova 1 di 6";
 *  - con "Pausa quando serve" il gioco si mette in pausa da solo se la pagina
 *    diventa nascosta; senza la regola resta in gioco.
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

async function tocco(page: Page, x: number, y: number, attesa = 600): Promise<void> {
  const box = await page.locator('#game canvas').boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box!.x + (box!.width * x) / 1024, box!.y + (box!.height * y) / 576);
  await page.waitForTimeout(attesa);
}

async function vaiAllaPrimaTappa(page: Page): Promise<void> {
  await page.goto('/');
  await expect.poll(() => scena(page)).toBe('Title');
  await tocco(page, 512, 358); // Gioca
  await expect.poll(() => scena(page)).toBe('Subject');
  await tocco(page, 872, 44); // Tutte le tappe
  await expect.poll(() => scena(page)).toBe('Levels');
  await tocco(page, 520, 150); // Matematica, tappa 1
  await expect.poll(() => scena(page)).toBe('Game');
}

async function primoPrompt(page: Page): Promise<string> {
  return page.evaluate(async () => {
    const g = (window as unknown as { __GIOCO__?: { rounds?: Array<{ prompt: string }> } }).__GIOCO__;
    if (g?.rounds && g.rounds.length > 0) return g.rounds[0].prompt;
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

/** La barra HTML sopra il canvas: deve esserci in ogni momento della partita. */
function bottoneNav(page: Page, azione: 'pausa' | 'esci') {
  return page.locator(`#nav-gioco button[data-azione="${azione}"]`);
}

/** Simula il passaggio ad un'altra app/scheda (visibilitychange). */
async function nascondiPagina(page: Page): Promise<void> {
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
}

test('ADHD: contatore di prova e pausa che riprende dallo stesso punto', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('sic.settings', JSON.stringify({ profileId: 'adhd', overrides: {} }));
  });
  await vaiAllaPrimaTappa(page);

  const etichette = (await testi(page)).map((t) => t.text);
  expect(etichette).toContain('Prova 1 di 6');
  const prompt = await primoPrompt(page);
  expect(etichette).toContain(prompt);

  // La barra di navigazione è presente e grande abbastanza da essere toccata.
  const pausa = bottoneNav(page, 'pausa');
  await expect(pausa).toBeVisible();
  const box = await pausa.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);

  await pausa.click();
  await expect.poll(() => scena(page)).toBe('Pause');
  const inPausa = (await testi(page)).map((t) => t.text);
  expect(inPausa).toContain('Continua');
  expect(inPausa).toContain('Fai un respiro: inspira piano, poi espira.');

  await tocco(page, 512, 332); // Continua
  await expect.poll(() => scena(page)).toBe('Game');

  // Riparte dalla stessa prova, non dall'inizio.
  const dopo = (await testi(page)).map((t) => t.text);
  expect(dopo).toContain(prompt);
  expect(dopo).toContain('Prova 1 di 6');
});

test('senza profilo: pausa sempre disponibile, contatore no', async ({ page }) => {
  await vaiAllaPrimaTappa(page);
  const etichette = (await testi(page)).map((t) => t.text);
  expect(etichette).not.toContain('Prova 1 di 6');

  await expect(bottoneNav(page, 'pausa')).toBeVisible();
  await expect(bottoneNav(page, 'esci')).toBeVisible();
  await bottoneNav(page, 'pausa').click();
  await expect.poll(() => scena(page)).toBe('Pause');

  // Senza la regola BES la pausa è semplice: niente suggerimento sul respiro.
  expect((await testi(page)).map((t) => t.text)).not.toContain(
    'Fai un respiro: inspira piano, poi espira.'
  );

  // Esc riprende: nessuno resta bloccato nella pausa.
  await page.keyboard.press('Escape');
  await expect.poll(() => scena(page)).toBe('Game');
});

test('Esci chiede conferma: "No" torna al gioco, "Sì" torna al titolo', async ({ page }) => {
  await vaiAllaPrimaTappa(page);

  await bottoneNav(page, 'esci').click();
  await expect.poll(() => scena(page)).toBe('Pause');
  const conferma = (await testi(page)).map((t) => t.text);
  expect(conferma).toContain('Vuoi uscire?');
  expect(conferma.some((t) => t.includes('non vengono salvati'))).toBe(true);

  await tocco(page, 512, 420); // No, torna al gioco
  await expect.poll(() => scena(page)).toBe('Game');
  await expect(bottoneNav(page, 'pausa')).toBeVisible();

  await bottoneNav(page, 'esci').click();
  await expect.poll(() => scena(page)).toBe('Pause');
  await tocco(page, 512, 332); // Sì, esci
  await expect.poll(() => scena(page)).toBe('Title');
  await expect(page.locator('#nav-gioco')).toHaveCount(0);
});

test('con "Pausa quando serve" la pagina nascosta mette in pausa da sola', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('sic.settings', JSON.stringify({ profileId: 'adhd', overrides: {} }));
  });
  await vaiAllaPrimaTappa(page);

  await nascondiPagina(page);
  await expect.poll(() => scena(page)).toBe('Pause');
});

test('senza la regola, la pagina nascosta non ferma la partita', async ({ page }) => {
  await vaiAllaPrimaTappa(page);
  await nascondiPagina(page);
  await page.waitForTimeout(400);
  expect(await scena(page)).toBe('Game');
});
