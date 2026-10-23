import { defineConfig, devices } from '@playwright/test';

/**
 * Configurazione Playwright per "Scuola in Corsa".
 *
 * I test end-to-end vivono in `tests/e2e/` e girano sul server di sviluppo Vite
 * che viene avviato automaticamente (vedi `webServer`).
 *
 * Comandi:
 *   npx playwright test                    → esegue tutti i test e2e
 *   npx playwright test --ui               → modalità interattiva
 *   npx playwright test --headed           → mostra il browser
 *   npx playwright show-report             → apre l'ultimo report HTML
 *
 * Prerequisito (una volta sola):
 *   npx playwright install chromium
 */
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',

  /* Fallisce la build CI se qualcuno dimentica un test.only */
  forbidOnly: !!process.env.CI,

  /* Ritenta solo su CI: in locale un fallimento è un fallimento vero. */
  retries: process.env.CI ? 1 : 0,

  /* Un solo worker: il gioco usa canvas + audio, meglio non sovrapporre. */
  workers: 1,

  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],

  timeout: 30_000,
  expect: { timeout: 5_000 },

  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],

  /* Avvia Vite prima dei test; lo riusa se è già attivo in locale. */
  webServer: {
    command: 'npm run dev -- --port 5173 --strictPort',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: 'ignore',
    stderr: 'pipe'
  }
});
