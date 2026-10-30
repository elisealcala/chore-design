import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  outputDir: 'test-results/browser',
  reporter: 'list',
  workers: process.env.CI ? 1 : undefined,
  globalTimeout: 10 * 60 * 1000,
  use: { browserName: 'chromium', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
});
