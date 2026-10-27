// O que o Google e o LinkedIn leem das páginas (#54, «SEO»).
// O noindex de cada fase e o canonical verificam-se em todas as páginas, em all-pages.spec.ts.
import { expect, test, type Page } from '@playwright/test';
import { emCadaBuild, paginas } from './builds';
import { equivalente, LINGUAS, NOME, SITE, type Lingua } from './expected';

/** Abre a página e devolve as etiquetas `hreflang` dela, como { código: URL }. Um código repetido falha. */
async function hreflang(page: Page, caminho: string): Promise<Record<string, string>> {
	await page.goto(caminho);
	const etiquetas = await page
		.locator('link[rel="alternate"][hreflang]')
		.evaluateAll((ligacoes) =>
			ligacoes.map((l) => [l.getAttribute('hreflang')!, l.getAttribute('href')!] as const),
		);
	expect(new Set(etiquetas.map(([codigo]) => codigo)).size, 'códigos repetidos').toBe(
		etiquetas.length,
	);
	return Object.fromEntries(etiquetas);
}

emCadaBuild((build) => {
	const publicadas: readonly Lingua[] = build.fase.linguasPublicadas;
	const comLingua = paginas(build).filter((p) => p.lingua);

	for (const { caminho, lingua } of comLingua) {
		test(`${caminho}: o hreflang tem a página em cada língua publicada e o x-default em inglês`, async ({
			page,
		}) => {
			// Os códigos do hreflang são fr, en e pt, sem região.
			const esperado: Record<string, string> = {};
			for (const l of publicadas) esperado[l] = `${SITE}${equivalente(caminho, lingua!, l)}`;
			// Sem o inglês publicado, o x-default apontaria para uma página que não existe.
			if (publicadas.includes('en')) {
				esperado['x-default'] = `${SITE}${equivalente(caminho, lingua!, 'en')}`;
			}
			expect(await hreflang(page, caminho)).toEqual(esperado);
		});
	}

	test('os hreflang são recíprocos', async ({ page }) => {
		let verificados = 0;
		for (const { caminho, lingua } of comLingua) {
			for (const [codigo, url] of Object.entries(await hreflang(page, caminho))) {
				if (codigo === 'x-default') continue;
				const daOutra = await hreflang(page, new URL(url).pathname);
				expect(daOutra[lingua!], `${url} aponta de volta para ${caminho}`).toBe(
					`${SITE}${caminho}`,
				);
				verificados++;
			}
		}
		expect(verificados).toBe(comLingua.length * publicadas.length);
	});

	for (const { caminho } of comLingua) {
		test(`${caminho}: o Open Graph tem o título e a descrição da página e a imagem em inglês`, async ({
			page,
			request,
		}) => {
			await page.goto(caminho);
			const og = (propriedade: string) => page.locator(`meta[property="og:${propriedade}"]`);
			await expect(og('type')).toHaveAttribute('content', 'website');
			await expect(og('url')).toHaveAttribute('content', `${SITE}${caminho}`);
			await expect(og('title')).toHaveAttribute('content', await page.title());
			const descricao = await page.locator('meta[name="description"]').getAttribute('content');
			await expect(og('description')).toHaveAttribute('content', descricao!);

			// Uma só imagem, em inglês, para as três línguas: o logótipo e a Designação.
			await expect(og('image')).toHaveCount(1);
			const imagem = new URL((await og('image').getAttribute('content'))!);
			expect(imagem.origin).toBe(SITE);
			await expect(og('image:alt')).toHaveAttribute('content', `${NOME}, ${LINGUAS.en.designacao}`);
			await expect(og('image:width')).toHaveAttribute('content', '1200');
			await expect(og('image:height')).toHaveAttribute('content', '630');

			const resposta = await request.get(imagem.pathname);
			expect(resposta.status()).toBe(200);
			expect(resposta.headers()['content-type']).toBe('image/png');
			// A largura e a altura estão no cabeçalho IHDR do PNG, a seguir à assinatura.
			const png = await resposta.body();
			expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
		});
	}

	for (const { caminho } of paginas(build).filter((p) => !p.lingua)) {
		test(`${caminho}: uma página sem língua não tem canonical, hreflang nem Open Graph`, async ({
			page,
		}) => {
			await page.goto(caminho);
			await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
			await expect(page.locator('link[hreflang]')).toHaveCount(0);
			await expect(page.locator('meta[property^="og:"]')).toHaveCount(0);
		});
	}

	test('o sitemap.xml só lista as páginas indexáveis, sem a 404', async ({ page, request }) => {
		const resposta = await request.get('/sitemap.xml');
		expect(resposta.status()).toBe(200);
		// O astro preview diz text/xml, e o Apache application/xml: os dois valem para um sitemap.
		expect(resposta.headers()['content-type']).toMatch(/^(application|text)\/xml\b/);
		const xml = await resposta.text();
		const urls = await page.evaluate((xml) => {
			const documento = new DOMParser().parseFromString(xml, 'application/xml');
			if (documento.querySelector('parsererror')) throw new Error(`XML inválido:\n${xml}`);
			const raiz = documento.documentElement;
			if (
				raiz.localName !== 'urlset' ||
				raiz.namespaceURI !== 'http://www.sitemaps.org/schemas/sitemap/0.9'
			) {
				throw new Error(`Não é um sitemap: ${raiz.outerHTML.slice(0, 120)}`);
			}
			return [...raiz.querySelectorAll('url > loc')].map((loc) => loc.textContent);
		}, xml);

		// Com o noindex da fase, nenhuma página é indexável: o sitemap fica vazio.
		const indexaveis = build.fase.noindex ? [] : comLingua.map((p) => `${SITE}${p.caminho}`);
		expect(urls.toSorted()).toEqual(indexaveis.toSorted());
		for (const url of urls) {
			await page.goto(new URL(url!).pathname);
			await expect(page.locator('meta[name="robots"][content*="noindex"]'), url!).toHaveCount(0);
		}
		expect(urls).not.toContain(`${SITE}/404.html`);
	});

	test('o robots.txt aponta para o sitemap e não bloqueia o rastreio', async ({ request }) => {
		const resposta = await request.get('/robots.txt');
		expect(resposta.status()).toBe(200);
		expect(resposta.headers()['content-type']).toMatch(/^text\/plain\b/);
		const linhas = (await resposta.text()).split('\n').map((linha) => linha.trim());
		expect(linhas).toContain(`Sitemap: ${SITE}/sitemap.xml`);
		expect(linhas).toContain('User-agent: *');
		expect(linhas.filter((linha) => /^Disallow:\s*\S/i.test(linha))).toEqual([]);
	});

	for (const { caminho } of paginas(build)) {
		test(`${caminho}: não tem dados estruturados schema.org`, async ({ page }) => {
			await page.goto(caminho);
			await expect(
				page.locator('script[type="application/ld+json"], [itemscope], [itemtype], [typeof]'),
			).toHaveCount(0);
		});
	}
});
