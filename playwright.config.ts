import { defineConfig, devices } from '@playwright/test';
import { BUILDS } from './tests/builds';

// The suite runs against the builds already made (npm run build and npm run build:launch),
// each served by astro preview on its own port.
// The Publishing confirmation (tests/publish/) has its own config: playwright.publish.config.ts.
// The tests of the Lighthouse checker (tests/lighthouse/) run only once, in their own project.
export default defineConfig({
	testDir: 'tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			testIgnore: ['publish/**', 'lighthouse/**'],
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
			testIgnore: ['publish/**', 'lighthouse/**'],
		},
		{ name: 'lighthouse', testMatch: 'lighthouse/**/*.spec.ts' },
	],
	webServer: BUILDS.map((build) => ({
		command: `npx astro preview --outDir ${build.dist} --port ${build.port} --ignore-lock`,
		port: build.port,
		reuseExistingServer: !process.env.CI,
	})),
});
