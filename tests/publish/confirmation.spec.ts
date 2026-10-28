// A confirmação depois de cada Publicação: o site publicado é o deste build.
// Corre com `npm run confirmar`, contra devops.julienlaffont.com, depois de `npm run build`.
import { execSync } from 'node:child_process';
import { expect, test } from '@playwright/test';
import { BUILDS, pagesOf } from '../builds';
import { LANGUAGES } from '../expected';

const [published] = BUILDS;
const publishedLanguages: readonly string[] = published.phase.publishedLanguages;
const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();

for (const { path } of pagesOf(published)) {
	test(`${path} responde 200 com o commit deste build`, async ({ page }) => {
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		await expect(page.locator('meta[name="commit"]')).toHaveAttribute('content', commit);
	});
}

// Antes do Lançamento comercial, `/` não tem index.html: sem o .htaccess,
// o Apache daria 403 ou a lista dos ficheiros.
test('as línguas não publicadas dão 404', async ({ request }) => {
	for (const [language, { prefix }] of Object.entries(LANGUAGES)) {
		if (publishedLanguages.includes(language)) continue;
		expect((await request.get(prefix, { maxRedirects: 0 })).status(), prefix).toBe(404);
	}
});

test('o HTTP redireciona para o HTTPS com 301', async ({ request, baseURL }) => {
	const url = new URL(LANGUAGES[published.phase.publishedLanguages[0]].prefix, baseURL);
	url.protocol = 'http:';
	const response = await request.get(url.href, { maxRedirects: 0 });
	url.protocol = 'https:';
	expect(response.status()).toBe(301);
	expect(response.headers()['location']).toBe(url.href);
});
