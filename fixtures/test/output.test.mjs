import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
test('both compiled fixtures contain profile styles and required utilities', async () => {
  for (const fixture of ['tailwind-3','tailwind-4']) {
    const css = await readFile(`fixtures/${fixture}/dist/output.css`, 'utf8');
    for (const pattern of [/\.bg-background\b/,/\.text-muted-foreground\b/,/\.max-w-design\b/,/data-design-profile="bold-typography"/,/data-design-theme="dark"/,/prefers-reduced-motion/]) assert.match(css, pattern, `${fixture} ${pattern}`);
  }
});
