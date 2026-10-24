import { expect, test } from '@playwright/test';

/**
 * Test dell'audio — non "c'è un modulo audio", ma "l'audio reagisce davvero".
 *
 * Due fatti verificati qui:
 *  1. prima di un gesto vero l'AudioContext non è attivo; dopo il tocco sì e
 *     la musica parte (le regole autoplay dei browser non vengono aggirate);
 *  2. col profilo Sordità gli effetti e la musica sono spenti e non viene
 *     nemmeno creato un AudioContext: niente suoni, non solo volume a zero.
 */

type AudioStato = { sfx: boolean; music: boolean; running: boolean; musicPlaying: boolean };

async function audio(page: import('@playwright/test').Page): Promise<AudioStato> {
  return page.evaluate(() => {
    const g = (window as unknown as { __GIOCO__?: { audio?: AudioStato } }).__GIOCO__;
    return g?.audio ?? { sfx: false, music: false, running: false, musicPlaying: false };
  });
}

async function attendiTitolo(page: import('@playwright/test').Page) {
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const g = (window as unknown as { __GIOCO__?: { scena?: string } }).__GIOCO__;
          return g?.scena ?? null;
        }),
      { timeout: 10_000 }
    )
    .toBe('Title');
}

async function tocco(page: import('@playwright/test').Page) {
  const box = await page.locator('canvas').boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
}

test('il primo tocco sblocca il contesto audio e fa partire la musica', async ({ page }) => {
  await page.goto('/');
  await attendiTitolo(page);

  // Nessun gesto: il contesto non deve esistere/essere attivo.
  expect(await audio(page)).toMatchObject({ sfx: true, music: true, running: false, musicPlaying: false });

  await tocco(page);

  await expect
    .poll(async () => (await audio(page)).running, { timeout: 5_000 })
    .toBe(true);
  await expect
    .poll(async () => (await audio(page)).musicPlaying, { timeout: 5_000 })
    .toBe(true);
});

test('profilo Sordità: suoni e musica spenti, nessun AudioContext creato', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('sic.settings', JSON.stringify({ profileId: 'sordita', overrides: {} }));
  });
  await page.goto('/');
  await attendiTitolo(page);

  expect(await audio(page)).toMatchObject({ sfx: false, music: false });
  expect(await audio(page)).toMatchObject({ running: false, musicPlaying: false });

  await tocco(page);
  await page.waitForTimeout(400);

  // Anche dopo il gesto: nessun suono e nessun contesto audio.
  expect(await audio(page)).toMatchObject({
    sfx: false,
    music: false,
    running: false,
    musicPlaying: false
  });
});
