// A página de ecologia, com o estimador, e as ligações que levam até ela (#68).
import { expect, test, type Page } from '@playwright/test';
import { emCadaBuild, paginas } from './builds';
import { LINGUAS, PAGINA_DE_MARCACAO, type Lingua } from './esperado';

// Os textos em francês e em inglês são traduções que a estagiária valida antes do
// Lançamento comercial (#75). Os nomes dos países são os da língua da página.
const ECOLOGIA = {
	fr: {
		caminho: '/ecology/',
		ligacao: 'Écologie',
		kwh: 'kWh par mois',
		kg: 'kg CO2e par mois',
		franca: 'France',
		polonia: 'Pologne',
		selos: { publicado: 'Publié', hipotese: 'Hypothèse', calculado: 'Calculé' },
	},
	en: {
		caminho: '/en/ecology/',
		ligacao: 'Ecology',
		kwh: 'kWh per month',
		kg: 'kg CO2e per month',
		franca: 'France',
		polonia: 'Poland',
		selos: { publicado: 'Published', hipotese: 'Assumption', calculado: 'Calculated' },
	},
	pt: {
		caminho: '/pt/ecology/',
		ligacao: 'Ecologia',
		kwh: 'kWh por mês',
		kg: 'kg CO2e por mês',
		franca: 'França',
		polonia: 'Polónia',
		selos: { publicado: 'Publicado', hipotese: 'Hipótese', calculado: 'Calculado' },
	},
} satisfies Record<Lingua, unknown>;

// Os resultados da spec: com os valores por defeito (França, 8 vCPU, 50 %, 24 h, PUE 1,52),
// cerca de 18,8 kWh e 0,78 kg CO2e por mês. Com a fórmula e as intensidades da spec, a mesma
// carga na Polónia (590,8 g CO2e/kWh) dá 18,83 × 590,8 / 1000 ≈ 11,1 kg CO2e.
const POR_DEFEITO = { kwh: '18,8', kg: '0,78' };
const NA_POLONIA = { kg: '11,1' };
// Com 9 vCPU em vez de 8, a energia e as emissões crescem 9/8: 21,2 kWh e 0,87 kg CO2e.
const COM_9_VCPU = { kwh: '21,2', kg: '0,87' };

// A página não publica dados ambientais dos fornecedores nem dá nenhum como exemplo (#54).
const FORNECEDORES = [
	'AWS',
	'Google Cloud',
	'Azure',
	'Infomaniak',
	'OVHcloud',
	'Scaleway',
	'Clever Cloud',
];

// Os textos validados da #54, em português: o título e os 4 cartões de
// «O que a infraestrutura pode mudar», e o método e os limites, pelas ideias.
const INFRAESTRUTURA = {
	titulo: 'Mais eficiência, mais visibilidade.',
	cartoes: [
		[
			'Ajustar os recursos à carga',
			'Com a infraestrutura escalável (bloco 3), os recursos acompanham a carga da aplicação.',
		],
		[
			'Ver o que se consome',
			'A observabilidade (bloco 4) dá visibilidade sobre a utilização dos recursos e os custos.',
		],
		[
			'Escolher com informação',
			'A intensidade carbónica da eletricidade muda de país para país, e o estimador mostra quanto.',
		],
		[
			'Alojamento com menor impacto ambiental',
			'Quando as necessidades e o orçamento o permitem, é uma das opções que proponho.',
		],
	],
};
const PALAVRAS_PROIBIDAS = ['servidor ecológico', 'alojamento verde', 'alojamento responsável'];

/** Um número como a página o escreve: vírgula decimal em português e em francês, ponto em inglês. */
const naLingua = (lingua: Lingua, numero: string) =>
	lingua === 'en' ? numero.replace(',', '.') : numero;

emCadaBuild((build) => {
	for (const lingua of build.fase.linguasPublicadas) {
		const { caminho, ligacao, kwh, kg, franca, polonia, selos } = ECOLOGIA[lingua];
		const { inicio, codigoHtml, botao } = LINGUAS[lingua];
		const n = (numero: string) => naLingua(lingua, numero);

		test.describe(caminho, () => {
			test('existe na língua, com title e description próprios', async ({ page }) => {
				await page.goto(inicio);
				const tituloPrincipal = await page.title();
				const descricaoPrincipal = await page
					.locator('meta[name="description"]')
					.getAttribute('content');

				const resposta = await page.goto(caminho);
				expect(resposta?.status()).toBe(200);
				await expect(page.locator('html')).toHaveAttribute('lang', codigoHtml);
				await expect(page).toHaveTitle(/Julien Laffont/);
				expect(await page.title()).not.toBe(tituloPrincipal);
				const descricao = page.locator('meta[name="description"]');
				await expect(descricao).toHaveAttribute('content', /\S/);
				await expect(descricao).not.toHaveAttribute('content', descricaoPrincipal!);
			});

			test('com os valores por defeito, estima 18,8 kWh e 0,78 kg CO2e por mês', async ({
				page,
			}) => {
				await page.goto(caminho);
				const main = page.getByRole('main');
				await expect(main.getByText(kwh)).toBeVisible();
				await expect(main.locator('p', { hasText: kwh })).toContainText(
					`${n(POR_DEFEITO.kwh)} ${kwh}`,
				);
				await expect(main.locator('p', { hasText: kg })).toContainText(
					`${n(POR_DEFEITO.kg)} ${kg}`,
				);
			});

			test('mudar o país atualiza o resultado e anuncia-o aos leitores de ecrã', async ({
				page,
			}) => {
				await page.goto(caminho);
				const main = page.getByRole('main');
				await main.getByRole('combobox').selectOption({ label: polonia });
				await expect(main.locator('p', { hasText: kg })).toContainText(`${n(NA_POLONIA.kg)} ${kg}`);
				await expect(main.locator('p', { hasText: kwh })).toContainText(
					`${n(POR_DEFEITO.kwh)} ${kwh}`,
				);
				// Só os dois números, sem o cálculo nem a comparação.
				const anuncio = main.getByRole('status');
				await expect(anuncio).toHaveText(`${n(POR_DEFEITO.kwh)} kWh, ${n(NA_POLONIA.kg)} kg CO2e`);
			});

			test('mover um cursor com o teclado atualiza o resultado', async ({ page }) => {
				await page.goto(caminho);
				const main = page.getByRole('main');
				const vcpu = main.getByRole('slider', { name: /vCPU/ });
				await vcpu.focus();
				await page.keyboard.press('ArrowRight');
				await expect(vcpu).toHaveValue('9');
				await expect(main.locator('p', { hasText: kwh })).toContainText(
					`${n(COM_9_VCPU.kwh)} ${kwh}`,
				);
				await expect(main.locator('p', { hasText: kg })).toContainText(`${n(COM_9_VCPU.kg)} ${kg}`);
				await expect(main.getByRole('status')).toHaveText(
					`${n(COM_9_VCPU.kwh)} kWh, ${n(COM_9_VCPU.kg)} kg CO2e`,
				);
			});

			test('os cursores dizem o valor com a unidade aos leitores de ecrã', async ({ page }) => {
				await page.goto(caminho);
				const cursores = page.getByRole('main').getByRole('slider');
				const percentagem = { fr: '50\u202f%', en: '50%', pt: '50\u00a0%' }[lingua];
				await expect(cursores.nth(1)).toHaveAttribute('aria-valuetext', percentagem);
				await expect(cursores.nth(2)).toHaveAttribute('aria-valuetext', '24\u00a0h');
				await expect(cursores.nth(3)).toHaveAttribute('aria-valuetext', n('1,52'));
				await cursores.nth(1).focus();
				await page.keyboard.press('ArrowLeft');
				await expect(cursores.nth(1)).toHaveAttribute(
					'aria-valuetext',
					percentagem.replace('50', '45'),
				);
			});

			test('mostra o cálculo completo, com um selo em cada valor', async ({ page }) => {
				await page.goto(caminho);
				const main = page.getByRole('main');
				// W por vCPU = 0,74 + 50 % × (3,5 − 0,74): os watts do Cloud Carbon Footprint (Hipótese).
				const energia = main.getByText(/× PUE/);
				await expect(energia).toContainText(`8 vCPU × (${n('0,74')} W + ${n('50')}`);
				await expect(energia).toContainText(`(${n('3,5')} − ${n('0,74')}) W) ${selos.hipotese}`);
				await expect(energia).toContainText(
					`PUE ${n('1,52')} ${selos.publicado} = ${n(POR_DEFEITO.kwh)} kWh ${selos.calculado}`,
				);
				const emissoes = main.getByText(/kWh × /);
				await expect(emissoes).toContainText(`${n('41,2')} g CO2e/kWh (${franca}, Ember 2025`);
				await expect(emissoes).toContainText(
					`${selos.publicado} = ${n(POR_DEFEITO.kg)} kg CO2e ${selos.calculado}`,
				);

				await main.getByRole('combobox').selectOption({ label: polonia });
				await expect(emissoes).toContainText(`${n('590,8')} g CO2e/kWh (${polonia}, Ember 2025`);
			});

			test('compara o resultado nos 16 países, com o país escolhido marcado', async ({ page }) => {
				await page.goto(caminho);
				const main = page.getByRole('main');
				const paises = main.getByRole('listitem').filter({ hasText: 'g/kWh' });
				await expect(paises).toHaveCount(16);
				const pais = (nome: string) => paises.filter({ hasText: nome });
				await expect(pais(franca)).toContainText(`${n('41,2')} g/kWh`);
				await expect(pais(franca)).toContainText(`${n(POR_DEFEITO.kg)} kg`);
				await expect(pais(franca)).toHaveAttribute('aria-current', 'true');
				await expect(pais(polonia)).toContainText(`${n(NA_POLONIA.kg)} kg`);

				await main.getByRole('combobox').selectOption({ label: polonia });
				await expect(pais(polonia)).toHaveAttribute('aria-current', 'true');
				await expect(pais(franca)).not.toHaveAttribute('aria-current');

				await main.getByRole('slider', { name: /vCPU/ }).focus();
				await page.keyboard.press('ArrowRight');
				await expect(pais(franca)).toContainText(`${n(COM_9_VCPU.kg)} kg`);
			});

			test.describe('sem JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('mostra o resultado com os valores por defeito', async ({ page }) => {
					await page.goto(caminho);
					const main = page.getByRole('main');
					await expect(main.locator('p', { hasText: kwh })).toContainText(
						`${n(POR_DEFEITO.kwh)} ${kwh}`,
					);
					await expect(main.locator('p', { hasText: kg })).toContainText(
						`${n(POR_DEFEITO.kg)} ${kg}`,
					);
					await expect(main.getByRole('listitem').filter({ hasText: polonia })).toContainText(
						`${n(NA_POLONIA.kg)} kg`,
					);
				});
			});

			test('cita as fontes e os limites, e acaba com o botão de marcação', async ({ page }) => {
				await page.goto(caminho);
				const main = page.getByRole('main');
				for (const fonte of [
					'ember-energy.org',
					'cloudcarbonfootprint.org',
					'uptimeinstitute.com',
				]) {
					await expect(main.locator(`a[href*="${fonte}"]`)).toHaveCount(1);
				}
				// O PUE ponderado pela capacidade só aparece nos limites.
				await expect(main).toContainText(n('1,36'));
				const ultima = main.getByRole('link').last();
				await expect(ultima).toHaveText(botao);
				await expect(ultima).toHaveAttribute('href', PAGINA_DE_MARCACAO);
			});

			test('não mostra nenhum fornecedor cloud', async ({ page }) => {
				await page.goto(caminho);
				const main = page.getByRole('main');
				for (const fornecedor of FORNECEDORES) await expect(main).not.toContainText(fornecedor);
			});

			if (lingua === 'pt') {
				test('tem os textos validados da #54', async ({ page }) => {
					await page.goto(caminho);
					const main = page.getByRole('main');
					await expect(main.getByRole('heading', { name: INFRAESTRUTURA.titulo })).toBeVisible();
					const seccao = main.getByRole('region', { name: INFRAESTRUTURA.titulo });
					await expect(seccao.getByRole('listitem')).toHaveCount(4);
					for (const [titulo, texto] of INFRAESTRUTURA.cartoes) {
						const cartao = seccao.getByRole('listitem').filter({ hasText: titulo });
						await expect(cartao.getByRole('heading', { name: titulo })).toBeVisible();
						await expect(cartao).toContainText(texto);
					}
					// Como se calcula: emissões a montante e só os processadores.
					await expect(main).toContainText('A intensidade da Ember inclui as emissões a montante');
					await expect(main.getByRole('heading', { name: 'Só os processadores' })).toBeVisible();
					// Fontes e limites.
					await expect(main).toContainText('Estimativa ilustrativa, não uma medição');
					await expect(main).toContainText('Pesquisa «Que dados ambientais publicam');
					for (const palavras of PALAVRAS_PROIBIDAS) {
						await expect(main).not.toContainText(palavras, { ignoreCase: true });
					}
				});
			}

			test('o PUE é Publicado no valor por defeito e passa a Hipótese quando muda', async ({
				page,
			}) => {
				await page.goto(caminho);
				const main = page.getByRole('main');
				const energia = main.getByText(/× PUE/);
				const pue = main.getByRole('slider', { name: /PUE/ });
				await pue.focus();
				await page.keyboard.press('ArrowRight');
				await expect(energia).toContainText(`PUE ${n('1,53')} ${selos.hipotese} =`);
				await page.keyboard.press('ArrowLeft');
				await expect(energia).toContainText(`PUE ${n('1,52')} ${selos.publicado} =`);
			});
		});

		test(`${inicio}: a secção Ecologia leva à página de ecologia`, async ({ page }) => {
			await page.goto(inicio);
			const abrir = page.getByRole('main').getByRole('link', { name: new RegExp(ligacao, 'i') });
			await expect(abrir).toBeVisible();
			await expect(abrir).toHaveAttribute('href', caminho);
		});
	}

	// O cabeçalho e o rodapé estão em todas as páginas: em cada uma, levam à página de ecologia da
	// mesma língua.
	for (const { caminho: pagina, lingua } of paginas(build)) {
		if (!lingua) continue;
		const { caminho, ligacao } = ECOLOGIA[lingua];
		const botaoDoMenu = (page: Page) =>
			page.getByRole('banner').locator('summary').filter({ visible: true });

		test.describe(pagina, () => {
			test('🍃 no cabeçalho leva à página de ecologia da mesma língua', async ({ page }) => {
				await page.goto(pagina);
				const folha = page.getByRole('banner').getByRole('link', { name: ligacao, exact: true });
				await expect(folha).toBeVisible();
				await expect(folha).toHaveText(ligacao);
				await expect(folha.locator('svg')).toBeVisible();
				await folha.click();
				await expect(page).toHaveURL(caminho);
				await expect(page.locator('html')).toHaveAttribute('lang', LINGUAS[lingua].codigoHtml);
				await expect(
					page.getByRole('banner').getByRole('link', { name: ligacao, exact: true }),
				).toHaveAttribute('aria-current', 'page');
			});

			test('«Ecologia» no rodapé leva à página de ecologia da mesma língua', async ({ page }) => {
				await page.goto(pagina);
				await expect(
					page.getByRole('contentinfo').getByRole('link', { name: ligacao, exact: true }),
				).toHaveAttribute('href', caminho);
			});

			test('no telemóvel, 🍃 fica só com a folha; abaixo de 360 px, só no menu', async ({
				page,
			}) => {
				const naBarra = page
					.getByRole('banner')
					.getByRole('link', { name: ligacao, exact: true })
					.filter({ visible: true });

				await page.setViewportSize({ width: 375, height: 700 });
				await page.goto(pagina);
				await expect(naBarra).toHaveCount(1);
				await expect(naBarra).toHaveAttribute('href', caminho);
				// Só a folha: o texto fica para os leitores de ecrã, e a ligação é um alvo de 44 px.
				const caixa = (await naBarra.boundingBox())!;
				expect(caixa.width).toBeLessThanOrEqual(48);
				expect(caixa.height).toBeGreaterThanOrEqual(44);

				await page.setViewportSize({ width: 359, height: 700 });
				await expect(naBarra).toHaveCount(0);
				await botaoDoMenu(page).click();
				await expect(
					page.getByRole('banner').getByRole('link', { name: new RegExp(ligacao, 'i') }),
				).toHaveAttribute('href', caminho);
			});
		});
	}
});
