import { test, expect } from '@playwright/test';

test('Crear tarea', async ({ page }) => {
  await page.goto('http://localhost:3004/');
  await page.getByPlaceholder('Agregar nueva tarea...').type('Comprar leche', { delay: 100 });
  const button=page.getByRole('button', {name:'Agregar'})
  await expect(button).toBeEnabled();
  await button.click()
  await expect(page.getByText('Comprar leche')).toBeVisible();
});


