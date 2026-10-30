import { test, expect } from '@playwright/test';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

test.skip(!process.env.REGISTRY_FIXTURES, 'Run pnpm test:registry after creating clean installed fixtures');
for (const [index, fixture] of ['tailwind-3-root', 'tailwind-3-src', 'tailwind-4-root', 'tailwind-4-src'].entries()) {
  test.describe(fixture, () => {
    let server;
    const url = `http://127.0.0.1:${43840 + index}`;
    test.beforeAll(async () => {
      server = spawn(resolve(`test-results/installed/${fixture}/node_modules/.bin/vite`), ['preview', '--host', '127.0.0.1', '--port', String(43840 + index), '--strictPort'], { cwd: resolve(`test-results/installed/${fixture}`), stdio: 'ignore' });
      for (let i = 0; i < 100; i++) { try { if ((await fetch(url)).ok) return; } catch {} await delay(100); }
      throw new Error(`Fixture server failed: ${fixture}`);
    });
    test.afterAll(() => server?.kill());
    for (const profile of ['application', 'bold-typography']) for (const theme of ['light', 'dark']) for (const width of [375, 1440]) {
      test(`${profile} ${theme} ${width}`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`${url}?profile=${profile}&theme=${theme}`);
        await expect(page.getByRole('heading', { name: 'Design examples' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Disabled' })).toBeDisabled();
        await expect(page.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        const unrelated = page.getByTestId('unrelated');
        await expect(unrelated).toHaveCSS('border-radius', '13px');
        await expect(unrelated).toHaveCSS('box-shadow', 'none');
        await expect(page.locator('html')).toHaveAttribute('data-design-profile', profile);
        const expected = profile === 'application' ? (theme === 'light' ? 'rgb(250, 250, 250)' : 'rgb(17, 17, 17)') : (theme === 'light' ? 'rgb(250, 250, 250)' : 'rgb(10, 10, 10)');
        await expect(page.locator('#root > div')).toHaveCSS('background-color', expected);
        await expect(page.getByRole('table')).toHaveCSS('color', theme === 'dark' ? 'rgb(250, 250, 250)' : (profile === 'application' ? 'rgb(23, 23, 23)' : 'rgb(10, 10, 10)'));
        await page.screenshot({ path: testInfo.outputPath(`${fixture}-${profile}-${theme}-${width}.png`), fullPage: true });
      });
    }
    test('keyboard and interactive states', async ({ page }) => {
      await page.goto(url);
      const name = page.getByLabel('Name'); await name.focus(); await expect(name).toBeFocused();
      await expect(name).toHaveCSS('outline-style', 'solid');
      const checkbox = page.getByRole('checkbox', { name: 'Agree' }); await checkbox.focus(); await page.keyboard.press('Space'); await expect(checkbox).toBeChecked();
      const select = page.getByRole('combobox', { name: 'Choose an option' }); await select.focus(); await expect(select).toBeFocused(); await select.selectOption('one'); await expect(select).toHaveValue('one'); await select.selectOption('two'); await expect(select).toHaveValue('two'); await expect(select).toBeFocused();
      const first = page.getByRole('tab', { name: 'First' }); await first.focus(); await expect(first).toBeFocused(); await page.keyboard.press('ArrowRight'); await expect(page.getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'true'); await expect(page.getByText('Second panel')).toBeVisible();
      const trigger = page.getByRole('button', { name: 'Open dialog' }); await trigger.focus(); await page.keyboard.press('Enter'); await expect(page.getByRole('dialog')).toBeVisible(); await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toBeHidden(); await expect(trigger).toBeFocused();
    });
  });
}
