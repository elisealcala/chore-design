import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const url = (adapter, profile, theme) => `http://127.0.0.1:4173/tests/browser/components/?${new URLSearchParams({ adapter, profile, theme })}`;
async function audit(page, selector) {
  let builder = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']);
  if (selector) builder = builder.include(selector);
  const results = await builder.analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
}
for (const adapter of ['3', '4']) for (const profile of ['bold-typography', 'application']) for (const theme of ['light', 'dark']) {
  test(`component accessibility: Tailwind ${adapter}, ${profile}, ${theme}`, async ({ page }) => {
    await page.goto(url(adapter, profile, theme));
    await expect(page.getByRole('heading', { name: 'Component examples' })).toBeVisible();
    await audit(page);
    await page.getByRole('button', { name: 'Open dialog' }).click();
    await expect(page.getByRole('dialog', { name: 'Example dialog' })).toBeVisible();
    await audit(page);
    await page.keyboard.press('Escape');
    await page.getByRole('combobox', { name: 'Choice' }).focus();
    await audit(page);
  });
}
test('interactive controls work with the keyboard', async ({ page }) => {
  await page.goto(url('4', 'application', 'light'));
  const checkbox = page.getByRole('checkbox', { name: 'Consent' });
  await checkbox.focus(); await page.keyboard.press('Space'); await expect(checkbox).toBeChecked();
  const select = page.getByRole('combobox', { name: 'Choice' });
  await select.focus(); await expect(select).toBeFocused(); await select.selectOption('one'); await expect(select).toHaveValue('one');
  await select.selectOption('two'); await expect(select).toHaveValue('two');
  const first = page.getByRole('tab', { name: 'First' }); await first.focus(); await expect(first).toBeFocused(); await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Second' })).toBeFocused(); await expect(page.getByRole('tabpanel')).toHaveText('Second panel');
  const trigger = page.getByRole('button', { name: 'Open dialog' }); await trigger.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible(); await expect(page.getByRole('button', { name: 'Close dialog' })).toBeFocused();
  await page.keyboard.press('Escape'); await expect(trigger).toBeFocused();
  await expect(page.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
});
