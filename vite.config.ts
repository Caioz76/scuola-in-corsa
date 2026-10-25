import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Build "single file": tutto (JS + CSS) viene inlizzato dentro index.html,
// così il gioco funziona con doppio clic anche da file:// (nessuna fetch di asset).
export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
  build: {
    outDir: 'dist/ScuolaInCorsa',
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 6000,
    cssCodeSplit: false,
    target: 'es2020'
  },
  server: {
    // 0.0.0.0 permette l'accesso sia da questo Mac (127.0.0.1) sia da smartphone
    // e altri dispositivi collegati alla rete Wi-Fi locale.
    host: '0.0.0.0',
    port: 5173,
    watch: {
      ignored: [
        '**/dashboard.html',
        '**/dashboard.sh',
        '**/tools/**',
        '**/test-results/**',
        '**/*.md',
        '**/*.log',
        '**/dist/**'
      ]
    }
  }
});
