import { test, expect } from '@playwright/test';

test('Crear tarea', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByPlaceholder('Add a new task...').type('Comprar leche', { delay: 100 });
  const button=page.getByRole('button', {name:'Add'})
  await expect(button).toBeEnabled();
  await button.click()
  await expect(page.getByText('Comprar leche')).toBeVisible();
});


