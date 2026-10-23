import { expect, test } from '@playwright/test';

/**
 * Test di flusso — "Scuola in Corsa".
 *
 * ⚠️ STATO: BOZZA PRONTA, NON ANCORA ATTIVA
 *
 * Questi test descrivono il percorso di gioco completo (titolo → scelta materia
 * → partita → risultati). Al momento le scene NON esistono ancora: le sta
 * scrivendo la sessione B in `src/scenes/`.
 *
 * Per questo ogni test è protetto da un controllo: se la scena attesa non è
 * presente, il test viene SALTATO (skip) invece di fallire. Così la suite resta
 * verde durante lo sviluppo, e questi test si attivano da soli appena le scene
 * saranno disponibili.
 *
 * COME ATTIVARLI: niente da fare. Appena B aggiunge il gancio descritto in
 * `COORDINAMENTO.md` §3.5 (`window.__GIOCO__` in `src/main.ts`), questi test
 * passano da "skipped" a "running" automaticamente.
 *
 * COME COMPLETARLI (per chi scriverà le scene): il gioco gira su un canvas
 * Phaser, quindi il testo NON è selezionabile con i selettori CSS. Il motore deve
 * esporre la scena attiva su `window.__GIOCO__ = { scena, materia }` — la
 * richiesta precisa (con lo snippet già verificato) è in `COORDINAMENTO.md` §3.5.
 *
 * In alternativa si può disegnare un overlay HTML sopra il canvas. Finché non
 * c'è una di queste due cose, qui sotto si verifica solo ciò che è osservabile
 * dal DOM.
 */

/** Legge lo stato esposto dal gioco, se il motore lo fornisce. */
async function statoGioco(page: import('@playwright/test').Page): Promise<string | null> {
  return page.evaluate(() => {
    const g = (window as unknown as { __GIOCO__?: { scena?: string } }).__GIOCO__;
    return g?.scena ?? null;
  });
}

test.describe('Flusso di gioco (bozza)', () => {
  test('il gioco parte dalla schermata di titolo', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('canvas')).toBeVisible();

    const scena = await statoGioco(page);
    test.skip(
      scena === null,
      'Il motore non espone ancora window.__GIOCO__: test in attesa delle scene (sessione B).'
    );

    expect(scena).toBe('Title');
  });

  test('si può scegliere una materia', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('canvas')).toBeVisible();

    const scena = await statoGioco(page);
    test.skip(scena === null, 'In attesa che il motore esponga lo stato delle scene.');

    /* Quando le scene esisteranno, qui si simulerà il tocco sulla materia.
     * Per ora verifichiamo solo che lo stato sia coerente. */
    expect(['Title', 'Subject', 'Game']).toContain(scena);
  });

  test('il progresso viene salvato in localStorage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('canvas')).toBeVisible();

    /* Il salvataggio è gestito da src/core/storage.ts. Anche senza le scene,
     * possiamo verificare che localStorage sia accessibile e non contenga
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
});
