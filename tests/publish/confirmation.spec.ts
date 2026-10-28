// The confirmation after each Publishing run: the published site is this build.
// Runs with `npm run confirm`, against devops.julienlaffont.com, after `npm run build`.
import { execSync } from 'node:child_process';
import { expect, test } from '@playwright/test';
import { BUILDS, pagesOf } from '../builds';
import { LANGUAGES } from '../expected';

const [published] = BUILDS;
const publishedLanguages: readonly string[] = published.phase.publishedLanguages;
const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();

for (const { path } of pagesOf(published)) {
	test(`${path} answers 200 with this build's commit`, async ({ page }) => {
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		await expect(page.locator('meta[name="commit"]')).toHaveAttribute('content', commit);
	});
}

// Before the Commercial launch, `/` has no index.html: without the .htaccess,
// Apache would return 403 or the file listing.
test('unpublished languages return 404', async ({ request }) => {
	for (const [language, { prefix }] of Object.entries(LANGUAGES)) {
		if (publishedLanguages.includes(language)) continue;
		expect((await request.get(prefix, { maxRedirects: 0 })).status(), prefix).toBe(404);
	}
});

test('HTTP redirects to HTTPS with 301', async ({ request, baseURL }) => {
	const url = new URL(LANGUAGES[published.phase.publishedLanguages[0]].prefix, baseURL);
	url.protocol = 'http:';
	const response = await request.get(url.href, { maxRedirects: 0 });
	url.protocol = 'https:';
	expect(response.status()).toBe(301);
	expect(response.headers()['location']).toBe(url.href);
});
