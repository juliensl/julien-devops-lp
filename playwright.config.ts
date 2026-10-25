import { defineConfig, devices } from '@playwright/test';
import { BUILDS } from './testes/builds';

// A suite corre sobre os builds já feitos (npm run build e npm run build:lancamento),
// cada um servido pelo astro preview na sua porta.
// A confirmação da Publicação (testes/publicacao/) tem a sua config: playwright.publicacao.config.ts.
export default defineConfig({
	testDir: 'testes',
	testIgnore: 'publicacao/**',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
	],
	webServer: BUILDS.map((build) => ({
		command: `npx astro preview --outDir ${build.dist} --port ${build.porta} --ignore-lock`,
		port: build.porta,
		reuseExistingServer: !process.env.CI,
	})),
});
