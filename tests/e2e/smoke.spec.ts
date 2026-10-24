import { expect, test } from '@playwright/test';

/**
 * Test di avvio (smoke test) — "Scuola in Corsa".
 *
 * Questi test verificano che il gioco si carichi davvero nel browser:
 * la pagina risponde, il canvas Phaser esiste, non ci sono errori JavaScript.
 *
 * Sono volutamente BASIC: restano validi man mano che le scene crescono.
 * I test di flusso (title → materia → partita → risultati) andranno aggiunti
 * quando la sessione B avrà scritto `src/scenes/`.
 */
test.describe('Avvio del gioco', () => {
  test('la pagina si carica senza errori JavaScript', async ({ page }) => {
    const errori: string[] = [];
    page.on('pageerror', (err) => errori.push(err.message));

    await page.goto('/');

    /* Aspetta che il canvas sia creato da Phaser. */
    await expect(page.locator('#game canvas')).toBeVisible();

    expect(errori, `Errori JS alla pagina:\n${errori.join('\n')}`).toEqual([]);
  });

  test('il titolo della pagina è corretto', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Scuola in Corsa/i);
  });

  test('il contenitore del gioco esiste', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#game')).toBeAttached();
  });

  test('il canvas viene creato da Phaser con dimensioni non nulle', async ({ page }) => {
    await page.goto('/');

    const canvas = page.locator('#game canvas');
    await expect(canvas).toBeVisible();

    const box = await canvas.boundingBox();
    expect(box, 'il canvas deve avere un riquadro').not.toBeNull();
    expect(box!.width).toBeGreaterThan(0);
    expect(box!.height).toBeGreaterThan(0);
  });
});
