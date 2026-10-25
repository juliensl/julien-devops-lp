import { defineConfig, devices } from '@playwright/test';
import { SITE } from './tests/expected';

// A confirmação depois de cada Publicação (npm run confirmar): pede ao site publicado
// as páginas do dist, sem servidor local. URL_PUBLICADO aponta-a para outro endereço.
export default defineConfig({
	testDir: 'tests/publish',
	forbidOnly: !!process.env.CI,
	retries: 2,
	reporter: process.env.CI ? [['github'], ['list']] : 'list',
	use: { baseURL: process.env.URL_PUBLICADO ?? SITE },
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
