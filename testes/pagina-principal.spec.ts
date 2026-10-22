import { expect, test } from '@playwright/test';
import { BUILDS } from './builds';

const PAGINA_DE_MARCACAO = 'https://calendly.com/contact-julienlaffont/appel-cadrage';

// Os textos validados da #54. O botão em francês e em inglês e a Promessa em inglês
// são traduções que a estagiária valida antes do Lançamento comercial (#75).
const ESPERADO = {
	fr: {
		inicio: '/',
		designacao: 'Consultant DevOps freelance pour SaaS',
		promessa:
			"En 30 jours, je te livre l'infrastructure devOps nécessaire pour que tu puisses scaler ton SaaS.",
		botao: 'Réserver un échange',
	},
	en: {
		inicio: '/en/',
		designacao: 'Freelance DevOps consultant for SaaS',
		promessa: 'In 30 days, I deliver the DevOps infrastructure you need to scale your SaaS.',
		botao: 'Book a conversation',
	},
	pt: {
		inicio: '/pt/',
		designacao: 'Consultor DevOps freelance para SaaS',
		promessa:
			'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.',
		botao: 'Marcar uma conversa',
	},
} as const;

for (const build of BUILDS) {
	test.describe(`build ${build.nome}`, () => {
		test.use({ baseURL: `http://localhost:${build.porta}` });

		for (const lingua of build.linguas) {
			const { inicio, designacao, promessa, botao } = ESPERADO[lingua];

			test(`${inicio}: o Hero mostra a Designação e a Promessa`, async ({ page }) => {
				await page.goto(inicio);
				await expect(page.getByText(designacao, { exact: true })).toBeVisible();
				await expect(page.getByRole('heading', { level: 1 })).toHaveText(promessa);
			});

			test(`${inicio}: o título tem a Designação e a descrição parte da Promessa`, async ({
				page,
			}) => {
				await page.goto(inicio);
				await expect(page).toHaveTitle(`Julien Laffont · ${designacao}`);
				const descricao = await page.locator('meta[name="description"]').getAttribute('content');
				expect(descricao).toMatch(new RegExp(`^${RegExp.escape(promessa)} \\S`));
			});

			test(`${inicio}: «${botao}» leva à página de marcação, no mesmo separador`, async ({
				page,
			}) => {
				await page.goto(inicio);
				const botoes = page.getByRole('link', { name: botao, exact: true });
				await expect(botoes.first()).toBeVisible();
				for (const botao of await botoes.all()) {
					await expect(botao).toHaveAttribute('href', PAGINA_DE_MARCACAO);
					await expect(botao).not.toHaveAttribute('target');
				}
			});
		}
	});
}
