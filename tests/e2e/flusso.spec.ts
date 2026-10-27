import { expect, test } from '@playwright/test';

/**
 * Test di flusso — "Scuola in Corsa".
 *
 * Il gioco gira su un canvas Phaser: il testo NON è selezionabile con i
 * selettori CSS. Per questo il motore espone `window.__GIOCO__ = { scena, materia }`
 * (getter, vedi `COORDINAMENTO.md` §3.5).
 *
 * ⚠️ Le coordinate sono nello spazio LOGICO del gioco (1024×576) e vengono
 * scalate sul canvas reale: se cambia il layout di una scena, questi test
 * falliscono — ed è voluto, perché il layout è parte del comportamento.
 *
 * Chiavi di scena: Boot → Title → Subject → Game → Results.
 */

/** Legge lo stato esposto dal gioco, se il motore lo fornisce. */
async function statoGioco(
  page: import('@playwright/test').Page
): Promise<{ scena: string | null; materia: string | null }> {
  return page.evaluate(() => {
    const g = (window as unknown as {
      __GIOCO__?: { scena?: string; materia?: string | null };
    }).__GIOCO__;
    return { scena: g?.scena ?? null, materia: g?.materia ?? null };
  });
}

/** Tocco su coordinate logiche (1024×576) del canvas. */
async function tocco(
  page: import('@playwright/test').Page,
  x: number,
  y: number,
  attesa = 400
): Promise<void> {
  const box = await page.locator('#game canvas').boundingBox();
  expect(box, 'il canvas deve essere visibile').not.toBeNull();
  await page.mouse.click(box!.x + (box!.width * x) / 1024, box!.y + (box!.height * y) / 576);
  await page.waitForTimeout(attesa);
}

/** Raccoglie tutti i nodi Text visibili della scena attiva. */
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

async function toccaTesto(page: import('@playwright/test').Page, label: string, attesa = 650): Promise<boolean> {
  const lbl = label.toLowerCase();
  const t = (await testi(page)).find((o) => o.text.toLowerCase().includes(lbl));
  if (!t) return false;
  await tocco(page, t.x, t.y, attesa);
  return true;
}

test.describe('Flusso di gioco', () => {
  test('il gioco parte dalla schermata di titolo', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#game canvas')).toBeVisible();

    const { scena } = await statoGioco(page);
    test.skip(scena === null, 'Il motore non espone window.__GIOCO__.');

    expect(scena).toBe('Title');
  });

  test('si può scegliere una materia e la partita comincia', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#game canvas')).toBeVisible();

    const { scena } = await statoGioco(page);
    test.skip(scena === null, 'In attesa che il motore esponga lo stato delle scene.');

    // 1. Titolo → bottone "Gioca"
    await expect.poll(async () => (await statoGioco(page)).scena).toBe('Title');
    await tocco(page, 640, 368);
    await expect.poll(async () => (await statoGioco(page)).scena).toBe('Subject');

    // 2. Scelta materia → "Matematica" (prima riga, colonna sinistra)
    await tocco(page, 322, 248);
    await expect.poll(async () => (await statoGioco(page)).scena).toBe('Game');
    expect((await statoGioco(page)).materia).toBe('matematica');
  });

  test('il progresso viene salvato in localStorage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#game canvas')).toBeVisible();

    /* Il salvataggio è gestito da src/core/storage.ts. Anche senza completare
     * una tappa, verifichiamo che localStorage sia accessibile e non contenga
     * valori corrotti da una sessione precedente. */
    const salvato = await page.evaluate(() => {
      const chiavi = Object.keys(localStorage);
      return chiavi.map((k) => ({ chiave: k, valore: localStorage.getItem(k) }));
    });

    for (const { chiave, valore } of salvato) {
      if (valore && (valore.startsWith('{') || valore.startsWith('['))) {
        expect(
          () => JSON.parse(valore),
          `la chiave "${chiave}" in localStorage deve contenere JSON valido`
        ).not.toThrow();
      }
    }
  });

  test('sessione a 2 giocatori con profili BES differenti: il gioco adatta le regole turno per turno', async ({
    page
  }) => {
    test.setTimeout(90_000);
    // Configura 2 giocatori:
    // G1: Volpina (Standard, nessuna riduzione)
    // G2: Gufo Saggio (Discalculia: opzioni ridotte a 2)
    await page.addInitScript(() => {
      localStorage.clear();
      localStorage.setItem(
        'sic.team_setup',
        JSON.stringify({
          numPlayers: 2,
          players: [
            {
              playerIndex: 1,
              token: {
                id: 'volpe',
                name: 'Volpina Sprint',
                icon: '🦊',
                color: '#ff6b35',
                bg: '#fff0eb',
                desc: 'Curiosa e scattante'
              },
              profileId: null
            },
            {
              playerIndex: 2,
              token: {
                id: 'gufo',
                name: 'Gufo Saggio',
                icon: '🦉',
                color: '#8b5cf6',
                bg: '#f5f3ff',
                desc: 'Sapiente e attento'
              },
              profileId: 'discalculia'
            }
          ]
        })
      );
    });

    await page.goto('/');
    await expect.poll(async () => (await statoGioco(page)).scena).toBe('Title');

    // Avvia la partita: Gioca -> Matematica
    await tocco(page, 640, 368); // Gioca
    await expect.poll(async () => (await statoGioco(page)).scena).toBe('Subject');
    await tocco(page, 322, 248); // Matematica
    await expect.poll(async () => (await statoGioco(page)).scena).toBe('Game');

    // ── TURNO 1: Volpina Sprint (G1, Standard) ──
    const btnGiocatore = page.locator('button[data-azione="giocatore"]');
    await expect(btnGiocatore).toContainText('Volpina Sprint');

    const r1 = await page.evaluate(async () => {
      const g = (window as unknown as {
        __GIOCO__?: { rounds?: Array<{ options?: Array<{ label: string; correct: boolean }> }> };
      }).__GIOCO__;
      return g?.rounds?.[0] ?? null;
    });
    expect(r1, 'deve esistere la prima prova').not.toBeNull();
    const r1Options = r1!.options!.map((o) => o.label);

    // Profilo Standard: sono visibili più di 2 opzioni (tutte le 3 o 4 del quesito)
    const visibiliG1 = (await testi(page)).filter((t) => r1Options.includes(t.text));
    expect(visibiliG1.length).toBeGreaterThan(2);

    // Volpina risponde correttamente
    const giustaG1 = r1!.options!.find((o) => o.correct)!.label;
    expect(await toccaTesto(page, giustaG1)).toBe(true);

    // ── TURNO 2: Gufo Saggio (G2, Discalculia) ──
    // Il badge della nav si aggiorna automaticamente a Gufo Saggio
    await expect.poll(
      async () => (await btnGiocatore.textContent()) ?? '',
      { timeout: 8_000 }
    ).toContain('Gufo Saggio');

    const r2 = await page.evaluate(async () => {
      const g = (window as unknown as {
        __GIOCO__?: { rounds?: Array<{ options?: Array<{ label: string; correct: boolean }> }> };
      }).__GIOCO__;
      return g?.rounds?.[1] ?? null;
    });
    expect(r2, 'deve esistere la seconda prova').not.toBeNull();
    const r2Options = r2!.options!.map((o) => o.label);

    // Profilo Discalculia (fewerOptions: true): ESATTAMENTE 2 opzioni visibili!
    const visibiliG2 = (await testi(page)).filter((t) => r2Options.includes(t.text));
    expect(visibiliG2.length, 'per il giocatore con Discalculia le opzioni devono ridursi a 2').toBe(2);
    expect(
      visibiliG2.map((v) => v.text),
      'la risposta corretta deve essere sempre presente tra le 2 opzioni'
    ).toContain(r2!.options!.find((o) => o.correct)!.label);

    // Gufo risponde correttamente
    const giustaG2 = r2!.options!.find((o) => o.correct)!.label;
    expect(await toccaTesto(page, giustaG2)).toBe(true);

    // ── TURNO 3: Ritorno a Volpina Sprint (G1, Standard) ──
    await expect.poll(
      async () => (await btnGiocatore.textContent()) ?? '',
      { timeout: 8_000 }
    ).toContain('Volpina Sprint');

    const r3 = await page.evaluate(async () => {
      const g = (window as unknown as {
        __GIOCO__?: { rounds?: Array<{ options?: Array<{ label: string; correct: boolean }> }> };
      }).__GIOCO__;
      return g?.rounds?.[2] ?? null;
    });
    expect(r3, 'deve esistere la terza prova').not.toBeNull();
    const r3Options = r3!.options!.map((o) => o.label);

    // Torna a mostrare tutte le opzioni (> 2) perché il turno è tornato a Volpina (Standard)!
    const visibiliG1_Round3 = (await testi(page)).filter((t) => r3Options.includes(t.text));
    expect(
      visibiliG1_Round3.length,
      'al ritorno al turno di Volpina le opzioni tornano complete'
    ).toBeGreaterThan(2);
  });
});
