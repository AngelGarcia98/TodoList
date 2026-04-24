import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    /* Configuramos la URL base para no tener que escribirla en cada test */
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        /* En CI el slowMo suele estorbar, lo dejamos opcional */
        launchOptions: { slowMo: process.env.CI ? 0 : 800 } 
      },
    },
  ],

  /* AQUÍ ESTÁ LA MAGIA: Esto levantará tu App automáticamente en Jenkins */
  webServer: {
    command: 'npm run dev', // El comando que usas para iniciar ToDoList
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // Damos 2 minutos por si el agente de Jenkins es lento
  },
});
