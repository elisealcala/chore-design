import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const colors = {
  'bold-typography': { light: 'rgb(250, 250, 250)', dark: 'rgb(10, 10, 10)' },
  application: { light: 'rgb(250, 250, 250)', dark: 'rgb(17, 17, 17)' },
};

for (const adapter of ['3', '4']) {
  for (const profile of ['bold-typography', 'application']) {
    for (const theme of ['light', 'dark']) {
      for (const width of [375, 1440]) {
        test(`Tailwind ${adapter} ${profile} ${theme} ${width}px`, async ({ page }, testInfo) => {
          await page.setViewportSize({ width, height: 900 });
          const url = pathToFileURL(resolve(`fixtures/tailwind-${adapter}/index.html`));
          url.search = new URLSearchParams({ profile, theme }).toString();
          await page.goto(url.href);
          await page.evaluate(() => document.fonts.ready);
          await expect(page.locator('body')).toHaveCSS('background-color', colors[profile][theme]);
          expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
          expect((await page.locator('main').boundingBox()).width).toBeLessThanOrEqual(1200);
          const button = page.getByRole('button', { name: 'Continue' });
          const input = page.getByRole('textbox', { name: 'Example' });
          expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(48);
          expect((await input.boundingBox()).height).toBeGreaterThanOrEqual(48);
          await page.keyboard.press('Tab');
          await expect(button).toBeFocused();
          await expect(button).toHaveCSS('outline-width', '2px');
          expect(await button.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
          await page.keyboard.press('Tab');
          await expect(input).toBeFocused();
          await expect(input).toHaveCSS('outline-width', '2px');
          expect(await input.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
          await input.blur();
          await page.screenshot({ path: testInfo.outputPath(`tailwind-${adapter}-${profile}-${theme}-${width}.png`), fullPage: true });
        });
      }
    }
  }
}

for (const adapter of ['3', '4']) {
  test(`Tailwind ${adapter} respects reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(pathToFileURL(resolve(`fixtures/tailwind-${adapter}/index.html`)).href);
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
    for (const token of ['--duration-fast', '--duration-normal']) {
      expect(await page.evaluate((name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim(), token)).toBe('0ms');
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(false);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--duration-normal').trim())).not.toBe('0ms');
  });
}
