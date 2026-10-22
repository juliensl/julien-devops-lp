import { expect, test } from '@playwright/test';
import { BUILDS, paginas } from './builds';

// O início de cada língua e o seu `<html lang>`, como foi decidido na #12.
const INICIOS = { fr: '/', en: '/en/', pt: '/pt/' } as const;
const CODIGOS_HTML = { fr: 'fr', en: 'en', pt: 'pt-PT' } as const;

/** A língua de uma página pelo início do caminho. O francês não tem prefixo. */
function linguaDe(caminho: string) {
	if (caminho.startsWith('/en/')) return 'en';
	if (caminho.startsWith('/pt/')) return 'pt';
	return 'fr';
}

for (const build of BUILDS) {
	test.describe(`build ${build.nome}`, () => {
		test.use({ baseURL: `http://localhost:${build.porta}` });

		test('só as línguas do build têm página principal', async ({ request }) => {
			for (const [lingua, inicio] of Object.entries(INICIOS)) {
				const resposta = await request.get(inicio);
				const esperado = (build.linguas as readonly string[]).includes(lingua) ? 200 : 404;
				expect(resposta.status(), `${inicio} (${lingua})`).toBe(esperado);
			}
		});

		for (const caminho of paginas(build)) {
			test(`${caminho} está numa língua do build, com o <html lang> dela`, async ({ page }) => {
				const lingua = linguaDe(caminho);
				expect(build.linguas).toContain(lingua);
				await page.goto(caminho);
				await expect(page.locator('html')).toHaveAttribute('lang', CODIGOS_HTML[lingua]);
			});
		}
	});
}
