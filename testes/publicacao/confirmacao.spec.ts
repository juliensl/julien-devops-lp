// A confirmação depois de cada Publicação: o site publicado é o deste build.
// Corre com `npm run confirmar`, contra devops.julienlaffont.com, depois de `npm run build`.
import { execSync } from 'node:child_process';
import { expect, test } from '@playwright/test';
import { BUILDS, paginas } from '../builds';
import { LINGUAS } from '../esperado';

const [publicado] = BUILDS;
const publicadas: readonly string[] = publicado.fase.linguasPublicadas;
const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();

for (const { caminho } of paginas(publicado)) {
	test(`${caminho} responde 200 com o commit deste build`, async ({ page }) => {
		const resposta = await page.goto(caminho);
		expect(resposta?.status()).toBe(200);
		await expect(page.locator('meta[name="commit"]')).toHaveAttribute('content', commit);
	});
}

// Antes do Lançamento comercial, `/` não tem index.html: sem o .htaccess,
// o Apache daria 403 ou a lista dos ficheiros.
test('as línguas não publicadas dão 404', async ({ request }) => {
	for (const [lingua, { inicio }] of Object.entries(LINGUAS)) {
		if (publicadas.includes(lingua)) continue;
		expect((await request.get(inicio, { maxRedirects: 0 })).status(), inicio).toBe(404);
	}
});

test('o HTTP redireciona para o HTTPS com 301', async ({ request, baseURL }) => {
	const url = new URL(LINGUAS[publicado.fase.linguasPublicadas[0]].inicio, baseURL);
	url.protocol = 'http:';
	const resposta = await request.get(url.href, { maxRedirects: 0 });
	url.protocol = 'https:';
	expect(resposta.status()).toBe(301);
	expect(resposta.headers()['location']).toBe(url.href);
});
