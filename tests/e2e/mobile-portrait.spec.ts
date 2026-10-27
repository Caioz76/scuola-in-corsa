import { test, expect } from '@playwright/test';

test.describe('Mobile portrait alignment and typography', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true
  });

  test('Title screen player card is aligned and does not overlap', async ({ page }) => {
    // Set 2 players in localStorage first
    await page.addInitScript(() => {
      localStorage.setItem(
        'sic.team_setup',
        JSON.stringify({
          numPlayers: 2,
          players: [
            {
              playerIndex: 1,
              token: { id: 'matita', name: 'Matita Magica', icon: '✏️', color: '#eab308', bg: '#fefce8', desc: 'Genio della fantasia' },
              profileId: 'discalculia'
            },
            {
              playerIndex: 2,
              token: { id: 'volpe', name: 'Volpina Sprint', icon: '🦊', color: '#ff6b35', bg: '#fff0eb', desc: 'Curiosa e scattante' },
              profileId: 'dislessia'
            }
          ]
        })
      );
    });

    await page.goto('/');
    const playerCard = page.locator('#mobile-deck .m-btn-player-select');
    await expect(playerCard).toBeVisible();

    const label = page.locator('#mobile-deck .m-player-sel-label');
    const name = page.locator('#mobile-deck .m-player-sel-name');
    const badge = page.locator('#mobile-deck .m-player-sel-badge');
    const icon = page.locator('#mobile-deck .m-player-sel-icon');

    await expect(label).toHaveText(/2 Giocatori in squadra/i);
    await expect(name).toContainText('G1 (Discalculia)');
    await expect(name).toContainText('G2 (Dislessia)');

    const labelBox = await label.boundingBox();
    const nameBox = await name.boundingBox();
    const cardBox = await playerCard.boundingBox();

    expect(labelBox).not.toBeNull();
    expect(nameBox).not.toBeNull();
    expect(cardBox).not.toBeNull();

    // Verify label and name do NOT overlap vertically: name should be below label
    expect(nameBox!.y).toBeGreaterThanOrEqual(labelBox!.y + labelBox!.height - 1);

    // Verify name is contained horizontally within the card
    expect(nameBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
    expect(nameBox!.x + nameBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 2);

    // Take a screenshot of the title screen in portrait
    await page.screenshot({ path: 'test-results/mobile-title.png' });
  });

  test('Player selection dialog spelling and tokens grid layout', async ({ page }) => {
    await page.goto('/');
    const playerCard = page.locator('#mobile-deck .m-btn-player-select');
    await playerCard.click();

    const dialog = page.locator('#sic-player-dialog');
    await expect(dialog).toBeVisible();

    // Check count buttons: 1 Giocatore, 2 Giocatori, 3 Giocatori, 4 Giocatori
    const countLabels = page.locator('#sic-player-dialog .sic-count-label');
    await expect(countLabels.nth(0)).toHaveText('1 Giocatore');
    await expect(countLabels.nth(1)).toHaveText('2 Giocatori');
    await expect(countLabels.nth(2)).toHaveText('3 Giocatori');
    await expect(countLabels.nth(3)).toHaveText('4 Giocatori');

    // Check that there is no "Giocatorei" anywhere in dialog
    const dialogText = await dialog.textContent();
    expect(dialogText).not.toContain('Giocatorei');

    // Check token choices
    const tokenChoices = page.locator('#sic-player-dialog .sic-token-choice');
    await expect(tokenChoices).toHaveCount(10);

    // Verify token info has title and desc
    const firstTitle = tokenChoices.first().locator('.sic-token-title');
    const firstDesc = tokenChoices.first().locator('.sic-token-desc');
    await expect(firstTitle).toBeVisible();
    await expect(firstDesc).toBeVisible();

    // Take a screenshot of the dialog in portrait
    await page.screenshot({ path: 'test-results/mobile-dialog.png' });
  });

  test('Settings BES custom toggles do not collide with navigation buttons', async ({ page }) => {
    await page.goto('/');

    await page.locator('#mobile-deck button:has-text("Impostazioni")').click();
    await page.locator('#mobile-deck button:has-text("Bisogni Educativi Speciali (BES)")').click();
    await page.locator('#mobile-deck button:has-text("Dislessia")').click();
    await page.locator('#mobile-deck button:has-text("Personalizza Caratteristiche")').click();

    // Check that toggle list has all toggles
    const toggles = page.locator('#mobile-deck .m-toggle-row');
    await expect(toggles).toHaveCount(22);

    // Verify last toggle is placed above the bottom navigation
    const lastToggle = toggles.last();
    const bottomNav = page.locator('#mobile-deck .m-card .m-grid-2').last();

    const lastToggleBox = await lastToggle.boundingBox();
    const bottomNavBox = await bottomNav.boundingBox();

    expect(lastToggleBox).not.toBeNull();
    expect(bottomNavBox).not.toBeNull();
    expect(bottomNavBox!.y).toBeGreaterThanOrEqual(lastToggleBox!.y + lastToggleBox!.height);
  });

  test('Title screen with Dislessia profile and 2 players maintains correct button and layout', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'sic.team_setup',
        JSON.stringify({
          numPlayers: 2,
          players: [
            {
              playerIndex: 1,
              token: { id: 'matita', name: 'Matita Magica', icon: '✏️', color: '#eab308', bg: '#fefce8', desc: 'Genio della fantasia' },
              profileId: 'dislessia'
            },
            {
              playerIndex: 2,
              token: { id: 'volpe', name: 'Volpina Sprint', icon: '🦊', color: '#ff6b35', bg: '#fff0eb', desc: 'Curiosa e scattante' },
              profileId: 'dislessia'
            }
          ]
        })
      );
      localStorage.setItem(
        'sic.settings',
        JSON.stringify({
          profileId: 'dislessia',
          schoolYear: 'P2',
          graphics: '3d'
        })
      );
    });

    await page.goto('/');
    const playerCard = page.locator('#mobile-deck .m-btn-player-select');
    await expect(playerCard).toBeVisible();

    const label = page.locator('#mobile-deck .m-player-sel-label');
    const name = page.locator('#mobile-deck .m-player-sel-name');
    const heroBtn = page.locator('#mobile-deck .m-btn-hero');

    // Hero button MUST be "Gioca", never "2 Giocatori"
    await expect(heroBtn).toHaveText(/gioca/i);
    await expect(heroBtn).not.toHaveText(/giocatori/i);

    const labelBox = await label.boundingBox();
    const nameBox = await name.boundingBox();
    const cardBox = await playerCard.boundingBox();

    expect(labelBox).not.toBeNull();
    expect(nameBox).not.toBeNull();
    expect(cardBox).not.toBeNull();

    // Verify name is below label and within card boundaries
    expect(nameBox!.y).toBeGreaterThanOrEqual(labelBox!.y + labelBox!.height - 1);
    expect(nameBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
    expect(nameBox!.x + nameBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 2);
  });
});
