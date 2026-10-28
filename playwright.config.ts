import { defineConfig, devices } from '@playwright/test';
import { BUILDS } from './tests/builds';

// A suite corre sobre os builds já feitos (npm run build e npm run build:lancamento),
// cada um servido pelo astro preview na sua porta.
// A confirmação da Publicação (tests/publish/) tem a sua config: playwright.publish.config.ts.
// Os testes do verificador do Lighthouse (tests/lighthouse/) correm uma só vez, no seu projeto.
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
