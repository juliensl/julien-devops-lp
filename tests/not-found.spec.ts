// A página 404: só em inglês, com o aspeto do site e um caminho de volta (#54, «Página 404»).
// Serve qualquer endereço inexistente, e também `/` enquanto o francês não estiver publicado.
import { expect, test } from '@playwright/test';
import { emCadaBuild } from './builds';
import { LINGUAS, NOME, type Lingua } from './expected';

const TITULO = "This page doesn't exist";

emCadaBuild((build) => {
	const publicadas: readonly Lingua[] = build.fase.linguasPublicadas;
	const naoPublicadas = (Object.keys(LINGUAS) as Lingua[]).filter((l) => !publicadas.includes(l));
	const inexistentes = ['/does-not-exist/', '/pt/does-not-exist/'];
	if (!publicadas.includes('fr')) inexistentes.push('/');

	for (const caminho of inexistentes) {
		test(`${caminho} responde 404 e mostra a 404, em inglês`, async ({ page }) => {
			const resposta = await page.goto(caminho);
			expect(resposta?.status()).toBe(404);
			await expect(page.locator('html')).toHaveAttribute('lang', 'en');
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(TITULO);
		});
	}

	test('a 404 leva à página principal de cada língua publicada', async ({ page }) => {
		await page.goto(inexistentes[0]);
		const conteudo = page.getByRole('main');
		for (const lingua of publicadas) {
			const { nome, inicio, codigoHtml } = LINGUAS[lingua];
			const ligacao = conteudo.getByRole('link', { name: nome, exact: true });
			await expect(ligacao).toHaveAttribute('href', inicio);
			await expect(ligacao).toHaveAttribute('lang', codigoHtml);
		}
		for (const lingua of naoPublicadas) {
			await expect(page.getByText(LINGUAS[lingua].nome)).toHaveCount(0);
		}
	});

	test('o cabeçalho da 404 tem o logótipo e não tem seletor de língua nem menu', async ({
		page,
	}) => {
		await page.goto(inexistentes[0]);
		const cabecalho = page.getByRole('banner');
		// A primeira língua publicada: o francês, Língua por defeito, quando está publicado.
		await expect(cabecalho.getByRole('link', { name: NOME })).toHaveAttribute(
			'href',
			LINGUAS[publicadas[0]].inicio,
		);
		for (const { nome } of Object.values(LINGUAS)) {
			await expect(cabecalho.getByText(nome)).toHaveCount(0);
		}
		// O menu do telemóvel só teria as línguas: o botão que o abre (o <summary>) não existe.
		await expect(cabecalho.locator('summary')).toHaveCount(0);
	});
});
