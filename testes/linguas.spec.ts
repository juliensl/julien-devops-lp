import { expect, test } from '@playwright/test';
import { emCadaBuild, paginas } from './builds';
import { LINGUAS } from './esperado';

emCadaBuild((build) => {
	const publicadas: readonly string[] = build.fase.linguasPublicadas;

	test('só as línguas publicadas têm página principal', async ({ request }) => {
		for (const [lingua, { inicio }] of Object.entries(LINGUAS)) {
			const resposta = await request.get(inicio);
			const esperado = publicadas.includes(lingua) ? 200 : 404;
			expect(resposta.status(), `${inicio} (${lingua})`).toBe(esperado);
		}
	});

	for (const { caminho, lingua } of paginas(build)) {
		if (!lingua) continue;
		test(`${caminho} está numa língua publicada, com o <html lang> dela`, async ({ page }) => {
			expect(publicadas).toContain(lingua);
			await page.goto(caminho);
			await expect(page.locator('html')).toHaveAttribute('lang', LINGUAS[lingua].codigoHtml);
		});
	}
});
