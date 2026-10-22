// As secções da página principal que não precisam de JavaScript (#63): «Para quem é», «Hoje, e
// depois», a Garantia, «Quem é o Julien» e o CTA final.
import { expect, test } from '@playwright/test';
import { emCadaBuild } from './builds';
import { LINGUAS, NOME, PAGINA_DE_MARCACAO, type Lingua } from './esperado';

// Os valores esperados, tirados da spec (#54). Em português, os textos validados estão tal como
// a spec os dá; o francês e o inglês são traduções que a estagiária valida antes do Lançamento
// comercial (#75). A página de marcação está em francês: o aviso só aparece nas outras línguas.
const ESPERADO = {
	pt: {
		paraQuem: {
			titulo: 'Para quem é',
			perfil: [
				'Um SaaS web ou mobile, já lançado.',
				'A passar de dezenas ou centenas para milhares de utilizadores recorrentes.',
				'Uma equipa de normalmente 5 a 20 pessoas, com pelo menos 3 devs.',
			],
			antesDoLancamento: 'O teu SaaS ainda não foi lançado? Podes marcar a Conversa na mesma.',
			naoEPara: 'Não é para',
			exclusoes: [
				'Quem já tem pipeline de CI, aplicação contentorizada e infraestrutura com auto-scaling.',
				'O que não é web nem mobile.',
				'Quem recusa 100 a 500 €/mês de serviços e infraestrutura.',
				'O setor militar.',
			],
		},
		hoje: {
			titulo: 'Hoje, e depois.',
			listas: ['Hoje', 'O que já tentaste', 'Depois'],
		},
		garantia: {
			titulo: 'Disponível pelo menos 99 % do tempo, em cada mês.',
			texto:
				'Em 30 dias, entrego a infraestrutura. Nos 3 meses seguintes, ela está disponível pelo menos 99 % do tempo em cada mês. Se não estiver, continuo a trabalhar sem faturar até chegar lá.',
			aplicaSe:
				'Aplica-se quando contratas os blocos 3 e 4 (e o 2, se a aplicação ainda não estiver contentorizada).',
			listas: ['Condições', 'Exclusões'],
			condicoes: [
				'Um teste escrito para cada bug corrigido.',
				'Nenhum dev passa à frente de um teste a vermelho.',
				'Acesso de leitura ao repositório.',
				'Uma pessoa técnica que responde em 48 h.',
			],
			exclusoes: ['Falhas do fornecedor cloud.', 'Alterações que não passaram pela pipeline.'],
			numero: '99 %',
			legendas: ['com serviço', 'no máximo 1 % sem serviço'],
			nota: 'Nos 3 meses seguintes à entrega.',
		},
		quem: {
			titulo: 'Quem é o Julien',
			forma:
				'Trabalho à distância, em português, francês e inglês. Uso tecnologias standard, sem lock-in, e documento tudo para a tua equipa ficar autónoma.',
		},
		ctaFinal: {
			titulo: 'Nunca perdes a infraestrutura.',
			conversa: 'Conversa de 45 min por Google Meet, gratuita e sem compromisso.',
			aviso:
				'A página de marcação está em francês, mas a Conversa pode ser em inglês ou em português.',
		},
	},
	fr: {
		paraQuem: {
			titulo: 'Pour qui',
			perfil: [
				'Un SaaS web ou mobile, déjà lancé.',
				"Qui passe de quelques dizaines ou centaines à plusieurs milliers d'utilisateurs récurrents.",
				'Une équipe de 5 à 20 personnes en général, dont au moins 3 devs.',
			],
			antesDoLancamento: "Ton SaaS n'est pas encore lancé ? Tu peux réserver l'échange quand même.",
			naoEPara: "Ce n'est pas pour",
			exclusoes: [
				'Ceux qui ont déjà une pipeline CI, une application conteneurisée et une infrastructure avec auto-scaling.',
				"Ce qui n'est ni web ni mobile.",
				"Ceux qui refusent 100 à 500 €/mois de services et d'infrastructure.",
				'Le secteur militaire.',
			],
		},
		hoje: {
			titulo: "Aujourd'hui, et après.",
			listas: ["Aujourd'hui", 'Ce que tu as déjà essayé', 'Après'],
		},
		garantia: {
			titulo: 'Disponible au moins 99 % du temps, chaque mois.',
			texto:
				"En 30 jours, je livre l'infrastructure. Pendant les 3 mois suivants, elle est disponible au moins 99 % du temps chaque mois. Sinon, je continue à travailler sans facturer jusqu'à y arriver.",
			aplicaSe:
				"S'applique quand tu prends les blocs 3 et 4 (et le 2, si l'application n'est pas encore conteneurisée).",
			listas: ['Conditions', 'Exclusions'],
			condicoes: [
				'Un test écrit pour chaque bug corrigé.',
				'Aucun dev ne passe outre un test au rouge.',
				'Un accès en lecture au dépôt.',
				'Une personne technique qui répond sous 48 h.',
			],
			exclusoes: [
				'Les pannes du fournisseur cloud.',
				'Les modifications qui ne sont pas passées par la pipeline.',
			],
			numero: '99 %',
			legendas: ['avec service', 'au plus 1 % sans service'],
			nota: 'Pendant les 3 mois qui suivent la livraison.',
		},
		quem: {
			titulo: 'Qui est Julien',
			forma:
				"Je travaille à distance, en portugais, en français et en anglais. J'utilise des technologies standard, sans lock-in, et je documente tout pour que ton équipe soit autonome.",
		},
		ctaFinal: {
			titulo: "Tu ne perds jamais l'infrastructure.",
			conversa: 'Échange de 45 min sur Google Meet, gratuit et sans engagement.',
			aviso: undefined,
		},
	},
	en: {
		paraQuem: {
			titulo: "Who it's for",
			perfil: [
				'A web or mobile SaaS, already launched.',
				'Growing from tens or hundreds to thousands of recurring users.',
				'A team of usually 5 to 20 people, with at least 3 devs.',
			],
			antesDoLancamento: "Haven't launched your SaaS yet? You can still book the conversation.",
			naoEPara: 'Not for',
			exclusoes: [
				'Teams that already have a CI pipeline, a containerised application and auto-scaling infrastructure.',
				"Anything that isn't web or mobile.",
				'Teams that turn down €100 to €500 a month for services and infrastructure.',
				'The military sector.',
			],
		},
		hoje: {
			titulo: 'Today, and after.',
			listas: ['Today', "What you've already tried", 'After'],
		},
		garantia: {
			titulo: 'Available at least 99% of the time, every month.',
			texto:
				"In 30 days, I deliver the infrastructure. For the next 3 months, it is available at least 99% of the time every month. If it isn't, I keep working without billing until it is.",
			aplicaSe:
				"Applies when you take blocks 3 and 4 (and 2, if the application isn't containerised yet).",
			listas: ['Conditions', 'Exclusions'],
			condicoes: [
				'A test written for every bug fixed.',
				'No dev pushes past a failing test.',
				'Read access to the repository.',
				'A technical contact who replies within 48 h.',
			],
			exclusoes: ['Cloud provider outages.', "Changes that didn't go through the pipeline."],
			numero: '99%',
			legendas: ['in service', 'at most 1% out of service'],
			nota: 'For the 3 months after delivery.',
		},
		quem: {
			titulo: 'Who is Julien',
			forma:
				'I work remotely, in Portuguese, French and English. I use standard technologies, with no lock-in, and document everything so your team can run on its own.',
		},
		ctaFinal: {
			titulo: 'You never lose the infrastructure.',
			conversa: '45-min conversation on Google Meet, free and with no commitment.',
			aviso: 'The booking page is in French, but the conversation can be in English or Portuguese.',
		},
	},
} satisfies Record<Lingua, unknown>;

// Os números que o Julien validou (#54, «Só se publica o que está validado»): 30 dias, 99 % (e o 1 %
// que falta), 100 a 500 €/mês, 5 a 20 pessoas, 3 devs, 45 min, 48 h, 3 meses e os números dos Blocos.
const NUMEROS_VALIDADOS = ['1', '2', '3', '4', '5', '20', '30', '45', '48', '99', '100', '500'];

emCadaBuild((build) => {
	for (const lingua of build.fase.linguasPublicadas) {
		const { inicio, promessa, designacao, botao } = LINGUAS[lingua];
		const { paraQuem, hoje, garantia, quem, ctaFinal } = ESPERADO[lingua];

		test.describe(inicio, () => {
			test(`«${botao}» está no cabeçalho, no Hero, no fim de «${paraQuem.titulo}» e no CTA final`, async ({
				page,
			}) => {
				await page.goto(inicio);
				const sitios = {
					cabecalho: page.getByRole('banner'),
					hero: page.getByRole('region', { name: promessa }),
					paraQuem: page.getByRole('region', { name: paraQuem.titulo }),
					ctaFinal: page.getByRole('region', { name: ctaFinal.titulo }),
				};
				for (const [sitio, regiao] of Object.entries(sitios)) {
					const marcar = regiao.getByRole('link', { name: botao, exact: true });
					await expect(marcar, sitio).toHaveCount(1);
					await expect(marcar, sitio).toHaveAttribute('href', PAGINA_DE_MARCACAO);
					await expect(marcar, sitio).not.toHaveAttribute('target');
				}
				// O botão fecha «Para quem é»: vem depois do resto da secção.
				const ultimoDeParaQuem = sitios.paraQuem.locator(':scope > *').last();
				await expect(ultimoDeParaQuem.getByRole('link', { name: botao, exact: true })).toHaveCount(
					1,
				);
			});

			test(`«${paraQuem.titulo}» mostra o perfil, a frase para quem ainda não lançou e as 4 exclusões`, async ({
				page,
			}) => {
				await page.goto(inicio);
				const seccao = page.getByRole('region', { name: paraQuem.titulo });
				for (const frase of [...paraQuem.perfil, paraQuem.antesDoLancamento]) {
					await expect(seccao.getByText(frase, { exact: true })).toBeVisible();
				}
				const exclusoes = seccao.getByRole('list', { name: paraQuem.naoEPara });
				await expect(exclusoes.getByRole('listitem')).toHaveText(paraQuem.exclusoes);
			});

			test(`«${hoje.titulo}»: o que o CTO vive, o que já tentou e a transformação, sem números`, async ({
				page,
			}) => {
				await page.goto(inicio);
				const seccao = page.getByRole('region', { name: hoje.titulo });
				for (const lista of hoje.listas) {
					const itens = seccao.getByRole('list', { name: lista }).getByRole('listitem');
					await expect(itens.first(), lista).toBeVisible();
				}
				expect(await seccao.textContent()).not.toMatch(/\d/);
			});

			test('a Garantia: o compromisso, quando se aplica, as 4 condições e as 2 exclusões', async ({
				page,
			}) => {
				await page.goto(inicio);
				const seccao = page.getByRole('region', { name: garantia.titulo });
				for (const frase of [garantia.texto, garantia.aplicaSe]) {
					await expect(seccao.getByText(frase, { exact: true })).toBeVisible();
				}
				const [condicoes, exclusoes] = garantia.listas.map((nome) =>
					seccao.getByRole('list', { name: nome }).getByRole('listitem'),
				);
				await expect(condicoes).toHaveText(garantia.condicoes);
				await expect(exclusoes).toHaveText(garantia.exclusoes);
			});

			test('a Garantia mostra os 99 % em grande e uma barra da largura da secção em que só 1 % muda de cor', async ({
				page,
			}) => {
				await page.goto(inicio);
				const seccao = page.getByRole('region', { name: garantia.titulo });
				const figura = seccao.getByRole('figure');
				const numero = figura.getByText(garantia.numero, { exact: true });
				await expect(numero).toBeVisible();
				const tamanho = await numero.evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
				expect(tamanho).toBeGreaterThanOrEqual(80);
				for (const texto of garantia.legendas) {
					await expect(figura.getByText(texto, { exact: true })).toBeVisible();
				}
				await expect(figura).toHaveAccessibleName(garantia.nota);

				// A barra é decorativa: as legendas dizem o mesmo em texto.
				const barra = figura.locator('[aria-hidden="true"]');
				const larguraDaSeccao = await seccao.evaluate((e) => {
					const estilo = getComputedStyle(e);
					return e.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
				});
				const larguraDaBarra = (await barra.boundingBox())!.width;
				expect(larguraDaBarra).toBeCloseTo(larguraDaSeccao, 0);
				const ponta = (await barra.locator(':scope > *').last().boundingBox())!;
				expect(ponta.width / larguraDaBarra).toBeGreaterThan(0.005);
				expect(ponta.width / larguraDaBarra).toBeLessThan(0.02);
			});

			test(`«${quem.titulo}»: a fotografia, o nome, a Designação e a forma de trabalhar`, async ({
				page,
			}) => {
				await page.goto(inicio);
				const seccao = page.getByRole('region', { name: quem.titulo });
				await expect(seccao.getByText(NOME, { exact: true })).toBeVisible();
				await expect(seccao.getByText(designacao, { exact: true })).toBeVisible();
				await expect(seccao.getByText(quem.forma, { exact: true })).toBeVisible();

				// A única imagem da página, longe do topo: só carrega quando lá se chega.
				await expect(page.locator('img')).toHaveCount(1);
				const foto = seccao.getByRole('img', { name: NOME, exact: true });
				await expect(foto).toHaveAttribute('alt', NOME);
				await expect(foto).toHaveAttribute('loading', 'lazy');
				await expect(foto).toHaveAttribute('src', /\.avif$/);
				await foto.scrollIntoViewIfNeeded();
				await expect
					.poll(() => foto.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth))
					.toBeGreaterThan(0);
			});

			test('as secções ficam nos lugares da #54, de «Para quem é», logo a seguir ao Hero, ao CTA final, no fim', async ({
				page,
			}) => {
				await page.goto(inicio);
				const titulos = (
					await page.getByRole('main').getByRole('heading', { level: 2 }).allTextContents()
				).map((titulo) => titulo.replace(/\s+/g, ' '));
				const lugares = [paraQuem, hoje, garantia, quem, ctaFinal].map(({ titulo }) =>
					titulos.indexOf(titulo),
				);
				expect(lugares[0]).toBe(0);
				expect(lugares).toEqual([...lugares].sort((a, b) => a - b));
				expect(lugares.at(-1)).toBe(titulos.length - 1);
			});

			test('só aparecem os números validados pelo Julien', async ({ page }) => {
				await page.goto(inicio);
				for (const { titulo } of [paraQuem, hoje, garantia, quem, ctaFinal]) {
					const texto = (await page.getByRole('region', { name: titulo }).textContent())!;
					const numeros = texto.match(/\d+(?:[.,]\d+)?/g) ?? [];
					for (const numero of numeros) expect(NUMEROS_VALIDADOS, titulo).toContain(numero);
				}
			});

			test.describe('sem JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('as cinco secções aparecem completas', async ({ page }) => {
					await page.goto(inicio);
					for (const { titulo } of [paraQuem, hoje, garantia, quem, ctaFinal]) {
						await expect(page.getByRole('region', { name: titulo })).toBeVisible();
					}
					const garantiaVisivel = page.getByRole('region', { name: garantia.titulo });
					await expect(garantiaVisivel.getByText(garantia.numero, { exact: true })).toBeVisible();
					const barra = garantiaVisivel.getByRole('figure').locator('[aria-hidden="true"] > *');
					expect((await barra.first().boundingBox())!.width).toBeGreaterThan(100);
				});
			});

			// Só um espaço normal deixa partir a linha.
			test('um número nunca fica longe do que mede, um intervalo nunca se parte, e « ? : » nunca começam uma linha', async ({
				page,
			}) => {
				await page.goto(inicio);
				for (const { titulo } of [paraQuem, hoje, garantia, quem, ctaFinal]) {
					const texto = await page.getByRole('region', { name: titulo }).textContent();
					expect(texto, titulo).not.toMatch(/\d /);
					expect(texto, titulo).not.toMatch(/\d\s(a|à|e|et|to|and) [\d€]/);
					expect(texto, titulo).not.toMatch(/ [?!:;»]/);
				}
			});

			test(
				ctaFinal.aviso
					? 'por baixo do botão do CTA final: a Conversa e o aviso de que a marcação é em francês'
					: 'por baixo do botão do CTA final: a Conversa, sem aviso sobre a língua da marcação',
				async ({ page }) => {
					await page.goto(inicio);
					const seccao = page.getByRole('region', { name: ctaFinal.titulo });
					const linha = seccao.getByText(ctaFinal.conversa);
					await expect(linha).toHaveText(
						ctaFinal.aviso ? `${ctaFinal.conversa} ${ctaFinal.aviso}` : ctaFinal.conversa,
					);
					const marcar = seccao.getByRole('link', { name: botao, exact: true });
					const { y, height } = (await marcar.boundingBox())!;
					expect((await linha.boundingBox())!.y).toBeGreaterThanOrEqual(y + height);
				},
			);
		});
	}
});
