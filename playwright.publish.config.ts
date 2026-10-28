import { defineConfig, devices } from '@playwright/test';
import { SITE } from './tests/expected';

// The confirmation after each Publishing run (npm run confirm): requests the dist pages from the
// published site, with no local server. PUBLISHED_URL points it at another address.
export default defineConfig({
	testDir: 'tests/publish',
	forbidOnly: !!process.env.CI,
	retries: 2,
	reporter: process.env.CI ? [['github'], ['list']] : 'list',
	use: { baseURL: process.env.PUBLISHED_URL ?? SITE },
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
