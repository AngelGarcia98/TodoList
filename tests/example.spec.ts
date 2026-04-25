import { test, expect } from '@playwright/test';

test('Crear tarea', async ({ page }) => {
  // Entramos al puerto 3000
  await page.goto('http://localhost:3000/');
  
  // Tu test de la ToDo List
  await page.getByPlaceholder('Agregar nueva tarea...').fill('Comprar leche');
  const button = page.getByRole('button', { name: 'Agregar' });
  
  await expect(button).toBeEnabled();
  await button.click();
});


