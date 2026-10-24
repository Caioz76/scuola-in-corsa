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
  const box = await page.locator('#game canvas').boundingBox();
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
    await expect(page.locator('#game canvas')).toBeVisible();

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
      const g = (window as unknown as {
        __GIOCO__?: { rounds?: Array<{ options?: Array<{ label: string; correct: boolean }> }> };
      }).__GIOCO__;
      if (g?.rounds && g.rounds.length > 0) return g.rounds[0];
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

  test('selezione per anno scolastico (Primaria 1ª–5ª e Secondaria I grado 1ª–3ª) modella la difficoltà', async ({ page }) => {
    test.setTimeout(90_000);
    await page.addInitScript(() => localStorage.clear());
    await page.goto('/');
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');

    expect(await toccaTesto(page, 'Impostazioni')).toBe(true);
    await expect.poll(async () => (await stato(page)).scena).toBe('Settings');

    // Apro la scheda Anno scolastico
    expect(await toccaTesto(page, 'Anno scolastico')).toBe(true);
    const etichette = (await testi(page)).map((t) => t.text);
    for (const atteso of [
      '1ª Primaria',
      '2ª Primaria',
      '3ª Primaria',
      '4ª Primaria',
      '5ª Primaria',
      '1ª Secondaria',
      '2ª Secondaria',
      '3ª Secondaria'
    ]) {
      expect(etichette, `anno "${atteso}" mancante`).toContain(atteso);
    }

    // Scelgo 2ª Secondaria (Secondaria di I grado)
    expect(await toccaTesto(page, '2ª Secondaria')).toBe(true);
    await page.waitForTimeout(300);

    const salvato = JSON.parse((await page.evaluate(() => localStorage.getItem('sic.settings')))!);
    expect(salvato.schoolYear).toBe('S2');

    // Torno ai profili e poi al titolo → avvio Matematica e verifico che parta col livello/quesiti di 2ª Media
    expect(await toccaTesto(page, 'Torna ai profili')).toBe(true);
    expect(await toccaTesto(page, 'Torna al titolo')).toBe(true);
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');
    await tocco(page, 512, 358); // Gioca
    await expect.poll(async () => (await stato(page)).scena).toBe('Subject');
    expect((await testi(page)).some((t) => t.text.includes('2ª Secondaria'))).toBe(true);
  });

  test('con carattere ingrandito (Ipovisione + Dislessia) titoli, domande e opzioni non si sovrappongono', async ({ page }) => {
    test.setTimeout(90_000);
    await page.addInitScript(() => {
      localStorage.setItem(
        'sic.settings',
        JSON.stringify({
          profileId: 'ipovisione',
          schoolYear: 'S3',
          overrides: {
            dyslexiaFont: true,
            hintFirst: true,
            repeatPrompt: true,
            clearProgress: true,
            mascotGuide: true
          }
        })
      );
    });
    await page.goto('/');
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');

    const verificaNessunaSovrapposizione = async (nomeScena: string): Promise<void> => {
      const collisioni = await page.evaluate(() => {
        const g = (window as unknown as {
          __GIOCO__?: { scenaAttiva?: { children: { list: unknown[] } } | null };
        }).__GIOCO__;
        const s = g?.scenaAttiva;
        if (!s) return [];
        const boxes: Array<{ text: string; x: number; y: number; w: number; h: number }> = [];
        const walk = (o: unknown): void => {
          const n = o as {
            type?: string;
            text?: string;
            visible?: boolean;
            alpha?: number;
            getBounds?: () => { x: number; y: number; width: number; height: number };
            list?: unknown[];
          };
          if (!n || n.visible === false || (typeof n.alpha === 'number' && n.alpha <= 0.05)) return;
          if (n.type === 'Text' && n.text && String(n.text).trim().length > 0 && n.getBounds) {
            const b = n.getBounds();
            // Margine interno di 3px per ignorare il padding naturale del line-height
            boxes.push({
              text: String(n.text).trim(),
              x: b.x + 3,
              y: b.y + 3,
              w: Math.max(0, b.width - 6),
              h: Math.max(0, b.height - 6)
            });
          }
          if (n.list) n.list.forEach(walk);
        };
        s.children.list.forEach(walk);
        const urti: string[] = [];
        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i];
            const b = boxes[j];
            const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
            const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
            if (overlapX > 2 && overlapY > 2) {
              urti.push(`"${a.text}" <-> "${b.text}" (${Math.round(overlapX)}x${Math.round(overlapY)}px)`);
            }
          }
        }
        return urti;
      });
      expect(collisioni, `Sovrapposizioni trovate in ${nomeScena}`).toEqual([]);
    };

    await verificaNessunaSovrapposizione('Title');

    await tocco(page, 872, 44); // Progressi
    await expect.poll(async () => (await stato(page)).scena).toBe('Progress');
    await verificaNessunaSovrapposizione('Progress');

    expect(await toccaTesto(page, 'Torna al titolo')).toBe(true);
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');

    await tocco(page, 512, 458); // Impostazioni
    await expect.poll(async () => (await stato(page)).scena).toBe('Settings');
    await verificaNessunaSovrapposizione('Settings (profili)');

    expect(await toccaTesto(page, 'Anno scolastico')).toBe(true);
    await verificaNessunaSovrapposizione('Settings (classe)');
    expect(await toccaTesto(page, 'Torna ai profili')).toBe(true);

    expect(await toccaTesto(page, 'Regole una per una')).toBe(true);
    await verificaNessunaSovrapposizione('Settings (regole)');
    expect(await toccaTesto(page, 'Torna ai profili')).toBe(true);

    expect(await toccaTesto(page, 'Torna al titolo')).toBe(true);
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');

    await tocco(page, 512, 358); // Gioca
    await expect.poll(async () => (await stato(page)).scena).toBe('Subject');
    await verificaNessunaSovrapposizione('Subject');

    await tocco(page, 872, 44); // Tutte le tappe
    await expect.poll(async () => (await stato(page)).scena).toBe('Levels');
    await verificaNessunaSovrapposizione('Levels');

    await tocco(page, 520, 150); // Matematica, tappa 1
    await expect.poll(async () => (await stato(page)).scena).toBe('Game');
    await verificaNessunaSovrapposizione('Game');
  });

  test('interfaccia mobile: in verticale mostra la schermata di rotazione e in orizzontale permette di giocare a tutto schermo', async ({
    page
  }) => {
    test.setTimeout(90_000);
    // 1. In verticale (portrait 390×844) appare la schermata #ruota
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => localStorage.clear());
    await page.goto('/');
    await expect(page.locator('#ruota')).toBeVisible();
    await expect(page.locator('#ruota')).toContainText('Ruota lo schermo');

    // 2. Ruotando il dispositivo in orizzontale (landscape 844×390) l'avviso sparisce e il gioco è pronto a tutto schermo
    await page.setViewportSize({ width: 844, height: 390 });
    await expect(page.locator('#ruota')).toBeHidden();
    await expect.poll(async () => (await stato(page)).scena).toBe('Title');

    // Il canvas di gioco copre l'area attiva
    await expect(page.locator('#game canvas')).toBeVisible();
  });

  test('mobile: navigazione impostazioni, selezione anno scolastico e ritorno senza blocchi o schermate errate', async ({
    page
  }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => localStorage.clear());
    await page.goto('/');

    await expect.poll(async () => (await stato(page)).scena).toBe('Title');

    // Dalla schermata iniziale tocca Impostazioni
    const btnImp = page.locator('#mobile-deck button').filter({ hasText: 'Impostazioni' }).first();
    await expect(btnImp).toBeVisible();
    await btnImp.click();
    await expect.poll(async () => (await stato(page)).scena).toBe('Settings');

    // Verifica schermata principale impostazioni
    await expect(page.locator('#mobile-deck .m-header')).toHaveText('Impostazioni');
    await expect(page.locator('#mobile-deck')).toContainText('Profilo BES');

    // Apre Anno scolastico
    const btnAnno = page.locator('#mobile-deck button').filter({ hasText: 'Anno scolastico' }).first();
    await expect(btnAnno).toBeVisible();
    await btnAnno.click();

    // La schermata deve essere "Anno scolastico e difficoltà", NON deve mostrare "Profilo BES"
    await expect(page.locator('#mobile-deck .m-header')).toHaveText('Anno scolastico e difficoltà');
    await expect(page.locator('#mobile-deck')).not.toContainText('Profilo BES');

    // Seleziona un anno scolastico (es. 2ª Secondaria)
    const btnS2 = page.locator('#mobile-deck button').filter({ hasText: '2ª Secondaria' }).first();
    await expect(btnS2).toBeVisible();
    await btnS2.click();

    // Resta nella schermata Anno scolastico con 2ª Secondaria evidenziata come selezionata
    await expect(page.locator('#mobile-deck .m-header')).toHaveText('Anno scolastico e difficoltà');
    await expect(btnS2).toHaveClass(/m-state-selected/);

    // Torna ai profili
    const btnTornaProfili = page.locator('#mobile-deck button').filter({ hasText: 'Torna ai profili' }).first();
    await expect(btnTornaProfili).toBeVisible();
    await btnTornaProfili.click();

    // Torna alla schermata principale Impostazioni: ora Profilo BES è presente e la classe aggiornata
    await expect(page.locator('#mobile-deck .m-header')).toHaveText('Impostazioni');
    await expect(page.locator('#mobile-deck')).toContainText('Profilo BES');

    // Torna al titolo
    const btnTitolo = page.locator('#mobile-deck button').filter({ hasText: 'Torna al titolo' }).first();
    await expect(btnTitolo).toBeVisible();
    await btnTitolo.click();

    await expect.poll(async () => (await stato(page)).scena).toBe('Title');
  });
});
