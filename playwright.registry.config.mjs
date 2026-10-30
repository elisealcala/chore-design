import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests/browser', outputDir: 'test-results/registry-browser', reporter: 'list', workers: 1, globalTimeout: 600000, use: { browserName: 'chromium', screenshot: 'only-on-failure', trace: 'retain-on-failure' } });
