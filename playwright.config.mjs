import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  outputDir: 'test-results/browser',
  reporter: 'list',
  workers: process.env.CI ? 1 : undefined,
  globalTimeout: 10 * 60 * 1000,
  webServer: { command: 'pnpm exec vite --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173/tests/browser/components/', reuseExistingServer: !process.env.CI },
  use: { browserName: 'chromium', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
});
