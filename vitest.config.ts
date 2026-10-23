import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

/**
 * Configurazione di Vitest (test unitari) per "Scuola in Corsa".
 *
 * Perché un file separato da `vite.config.ts`:
 *  - `vite.config.ts` appartiene alla build (sessione B) e non va toccato;
 *  - qui si dichiara cosa Vitest deve e NON deve raccogliere.
 *
 * ⚠️ IMPORTANTE: i test end-to-end (`tests/e2e/*.spec.ts`) usano Playwright,
 * NON Vitest. Se Vitest provasse a eseguirli fallirebbe ("test.describe is
 * not defined"). Per questo sono esclusi esplicitamente.
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['tests/**/*.test.ts'],
      exclude: ['node_modules/**', 'dist/**', 'tests/e2e/**']
    }
  })
);
