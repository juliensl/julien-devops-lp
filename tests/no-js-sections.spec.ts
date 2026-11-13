// The home page sections that need no JavaScript (#63): "Para quem é", "Hoje, e depois", the
// Guarantee, "Quem é o Julien" and the final CTA.
import { expect, test } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, LINKEDIN, NAME, BOOKING_PAGE, type Language } from './expected';

// The expected values, taken from the spec (#54). In Portuguese, the approved texts are exactly as
// the spec gives them; French and English are translations the intern reviews before the Commercial
// launch (#75). The booking page is in French: the notice only appears in the other languages.
// The new offer's texts are Julien's, in French; English keeps them until it is translated.
const FRENCH = {
	whoItsFor: {
		title: 'Pour qui ?',
		intro:
			"Tu développes un SaaS ou une application web, seul ou avec une équipe ? Je m'adapte à ton stade de développement, à ton organisation et à tes contraintes techniques.",
		situations: [
			'Tu prépares un lancement et tu veux partir sur des bases solides.',
			'Ton produit est déjà en ligne et les bugs ou la maintenance ralentissent les nouveautés.',
			'Tu anticipes une montée en charge et tu veux éviter les mauvaises surprises.',
		],
		button: 'Parlons de ton projet',
	},
	todayAndAfter: {
		title: "Aujourd'hui… et après.",
		lists: ["Aujourd'hui", 'Après'],
		items: [
			[
				'Une nouvelle fonctionnalité en casse une autre, et les clients découvrent les régressions.',
				'Tes développeurs passent trop de temps sur les bugs, les correctifs et le support.',
				"Le code obsolète s'accumule, les dépendances vieillissent et les performances se dégradent.",
				'Les tests et les déploiements reposent encore sur des vérifications manuelles.',
				"Tu manques de visibilité sur l'état réel de ton application et sur sa capacité à monter en charge.",
			],
			[
				'Les régressions sont détectées plus tôt grâce aux contrôles automatisés.',
				'Les corrections et les optimisations prioritaires rendent ton code plus maintenable.',
				'Une partie de la maintenance répétitive est automatisée, pour libérer du temps de développement.',
				"Les déploiements sont plus prévisibles et l'infrastructure s'adapte à la charge prévue.",
				"Tu disposes d'indicateurs et d'alertes pour détecter les incidents au plus tôt.",
			],
		],
	},
	about: {
		title: 'Qui est Julien ?',
		wayOfWorking:
			"J'interviens sur ton projet en français, en anglais ou en portugais. J'utilise des technologies modernes et éprouvées, je limite autant que possible la dépendance à un fournisseur et je documente ce que je livre pour que ton équipe reste autonome. Mes solutions s'adaptent à tes contraintes techniques et métier, pas l'inverse.",
		linkedin: 'Voir mon profil LinkedIn',
	},
};

const EXPECTED = {
	pt: {
		whoItsFor: {
			title: 'Para quem é?',
			intro:
				'Desenvolves um SaaS ou uma aplicação web, sozinho ou com uma equipa? Adapto-me à tua fase de desenvolvimento, à tua organização e às tuas restrições técnicas.',
			situations: [
				'Estás a preparar um lançamento e queres começar com bases sólidas.',
				'O teu produto já está online e os bugs ou a manutenção atrasam as novidades.',
				'Prevês um aumento de carga e queres evitar surpresas desagradáveis.',
			],
			button: 'Vamos falar do teu projeto',
		},
		todayAndAfter: {
			title: 'Hoje… e depois.',
			lists: ['Hoje', 'Depois'],
			items: [
				[
					'Uma nova funcionalidade parte outra, e os clientes descobrem as regressões.',
					'Os teus programadores passam demasiado tempo com bugs, correções e suporte.',
					'O código obsoleto acumula-se, as dependências envelhecem e o desempenho degrada-se.',
					'Os testes e os deploys ainda dependem de verificações manuais.',
					'Falta-te visibilidade sobre o estado real da tua aplicação e sobre a sua capacidade de suportar mais carga.',
				],
				[
					'As regressões são detetadas mais cedo graças às verificações automáticas.',
					'As correções e as otimizações prioritárias tornam o teu código mais fácil de manter.',
					'Uma parte da manutenção repetitiva é automatizada, para libertar tempo de desenvolvimento.',
					'Os deploys são mais previsíveis e a infraestrutura adapta-se à carga prevista.',
					'Tens indicadores e alertas para detetar os incidentes o mais cedo possível.',
				],
			],
		},
		guarantee: {
			title: 'Disponível pelo menos 99 % do tempo, em cada mês.',
			text: 'Em 30 dias, entrego a infraestrutura. Nos 3 meses seguintes, ela está disponível pelo menos 99 % do tempo em cada mês. Se não estiver, continuo a trabalhar sem faturar até chegar lá.',
			appliesWhen:
				'Aplica-se quando contratas a Infraestrutura escalável e a Observabilidade (e a Contentorização, se a aplicação ainda não estiver contentorizada).',
			lists: ['Condições', 'Exclusões'],
			conditions: [
				'Um teste escrito para cada bug corrigido.',
				'Nenhum dev passa à frente de um teste a vermelho.',
				'Acesso de leitura ao repositório.',
				'Uma pessoa técnica que responde em 48 h.',
			],
			exclusions: ['Falhas do fornecedor cloud.', 'Alterações que não passaram pela pipeline.'],
			number: '99 %',
			captions: ['com serviço', 'no máximo 1 % sem serviço'],
			note: 'Nos 3 meses seguintes à entrega.',
		},
		about: {
			title: 'Quem é o Julien?',
			wayOfWorking:
				'Trabalho no teu projeto em francês, inglês ou português. Uso tecnologias modernas e comprovadas, limito tanto quanto possível a dependência de um fornecedor e documento o que entrego para que a tua equipa continue autónoma. As minhas soluções adaptam-se às tuas restrições técnicas e de negócio, e não o contrário.',
			linkedin: 'Ver o meu perfil no LinkedIn',
		},
		finalCta: {
			title: 'Nunca perdes a infraestrutura.',
			conversation: 'Conversa de 45 min por Google Meet, gratuita e sem compromisso.',
			bookingNotice:
				'A página de marcação está em francês, mas a Conversa pode ser em inglês ou em português.',
		},
	},
	fr: {
		whoItsFor: FRENCH.whoItsFor,
		todayAndAfter: FRENCH.todayAndAfter,
		guarantee: {
			title: 'Disponible au moins 99 % du temps, chaque mois.',
			text: "En 30 jours, je livre l'infrastructure. Pendant les 3 mois suivants, elle est disponible au moins 99 % du temps chaque mois. Sinon, je continue à travailler sans facturer jusqu'à y arriver.",
			appliesWhen:
				"La Garantie s'applique quand tu prends l'Infrastructure scalable et l'Observabilité (et la Conteneurisation, si l'application n'est pas encore conteneurisée).",
			lists: ['Conditions', 'Exclusions'],
			conditions: [
				'Un test écrit pour chaque bug corrigé.',
				'Aucun dev ne passe outre un test au rouge.',
				'Un accès en lecture au dépôt.',
				'Un interlocuteur technique qui répond sous 48 h.',
			],
			exclusions: [
				'Les pannes du fournisseur cloud.',
				'Les modifications qui ne sont pas passées par la pipeline.',
			],
			number: '99 %',
			captions: ['en service', 'au plus 1 % hors service'],
			note: 'Pendant les 3 mois qui suivent la livraison.',
		},
		about: FRENCH.about,
		finalCta: {
			title: "Tu ne perds jamais l'infrastructure.",
			conversation: 'Échange de 45 min sur Google Meet, gratuit et sans engagement.',
			bookingNotice: undefined,
		},
	},
	en: {
		whoItsFor: FRENCH.whoItsFor,
		todayAndAfter: FRENCH.todayAndAfter,
		guarantee: {
			title: 'Available at least 99% of the time, every month.',
			text: "In 30 days, I deliver the infrastructure. For the next 3 months, it is available at least 99% of the time every month. If it isn't, I keep working without billing until it is.",
			appliesWhen:
				"Applies when you take Scalable infrastructure and Observability (and Containerisation, if the application isn't containerised yet).",
			lists: ['Conditions', 'Exclusions'],
			conditions: [
				'A test written for every bug fixed.',
				'No dev pushes past a failing test.',
				'Read access to the repository.',
				'A technical contact who replies within 48 h.',
			],
			exclusions: ['Cloud provider outages.', "Changes that didn't go through the pipeline."],
			number: '99%',
			captions: ['in service', 'at most 1% out of service'],
			note: 'For the 3 months after delivery.',
		},
		about: { ...FRENCH.about, linkedin: 'See my LinkedIn profile' },
		finalCta: {
			title: 'You never lose the infrastructure.',
			conversation: '45-min conversation on Google Meet, free and with no commitment.',
			bookingNotice:
				'The booking page is in French, but the conversation can be in English or Portuguese.',
		},
	},
} satisfies Record<Language, unknown>;

// The numbers Julien approved (#54, "Só se publica o que está validado"): 30 days, 99 % (and the
// remaining 1 %), 100 to 500 €/month, 5 to 20 people, 3 devs, 45 min, 48 h, 3 months and the Block numbers.
const APPROVED_NUMBERS = ['1', '2', '3', '4', '5', '20', '30', '45', '48', '99', '100', '500'];

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, promise, designation, button } = LANGUAGES[language];
		const { whoItsFor, todayAndAfter, guarantee, about, finalCta } = EXPECTED[language];
		const sections = [whoItsFor, todayAndAfter, guarantee, about, finalCta];

		test.describe(prefix, () => {
			test(`"${button}" is in the header, in the Hero and in the final CTA, not in "${whoItsFor.title}"`, async ({
				page,
			}) => {
				await page.goto(prefix);
				const places = {
					header: page.getByRole('banner'),
					hero: page.getByRole('region', { name: promise }),
					finalCta: page.getByRole('region', { name: finalCta.title }),
				};
				for (const [place, region] of Object.entries(places)) {
					const bookButton = region.getByRole('link', { name: button, exact: true });
					await expect(bookButton, place).toHaveCount(1);
					await expect(bookButton, place).toHaveAttribute('href', BOOKING_PAGE);
					await expect(bookButton, place).not.toHaveAttribute('target');
				}
				const whoItsForSection = page.getByRole('region', { name: whoItsFor.title });
				await expect(whoItsForSection.getByRole('link', { name: button })).toHaveCount(0);
			});

			test(`"${whoItsFor.title}": the introduction, the three situations and "${whoItsFor.button}", which leads to the booking page`, async ({
				page,
			}) => {
				await page.goto(prefix);
				const section = page.getByRole('region', { name: whoItsFor.title });
				await expect(section.getByRole('heading')).toHaveCount(1);
				await expect(section.getByText(whoItsFor.intro, { exact: true })).toBeVisible();
				await expect(section.getByRole('list')).toHaveCount(1);
				await expect(section.getByRole('listitem')).toHaveText(whoItsFor.situations);

				// One button, below the situations, to the booking page in the same tab.
				const link = section.getByRole('link');
				await expect(link).toHaveCount(1);
				await expect(link).toHaveAccessibleName(whoItsFor.button);
				await expect(link).toHaveAttribute('href', BOOKING_PAGE);
				await expect(link).not.toHaveAttribute('target');
				const list = (await section.getByRole('list').boundingBox())!;
				expect((await link.boundingBox())!.y).toBeGreaterThanOrEqual(list.y + list.height);
			});

			test(`"${todayAndAfter.title}": five sentences on each side, with no titles and no numbers`, async ({
				page,
			}) => {
				await page.goto(prefix);
				const section = page.getByRole('region', { name: todayAndAfter.title });
				await expect(section.getByRole('list')).toHaveCount(todayAndAfter.lists.length);
				for (const [k, list] of todayAndAfter.lists.entries()) {
					const items = section.getByRole('list', { name: list }).getByRole('listitem');
					await expect(items, list).toHaveText(todayAndAfter.items[k]);
				}
				await expect(section.locator('strong, b')).toHaveCount(0);
				expect(await section.textContent()).not.toMatch(/\d/);
			});

			test('the Guarantee: the commitment, when it applies, the 4 conditions and the 2 exclusions', async ({
				page,
			}) => {
				await page.goto(prefix);
				const section = page.getByRole('region', { name: guarantee.title });
				for (const sentence of [guarantee.text, guarantee.appliesWhen]) {
					await expect(section.getByText(sentence, { exact: true })).toBeVisible();
				}
				const [conditions, exclusions] = guarantee.lists.map((name) =>
					section.getByRole('list', { name }).getByRole('listitem'),
				);
				await expect(conditions).toHaveText(guarantee.conditions);
				await expect(exclusions).toHaveText(guarantee.exclusions);
			});

			test('the Guarantee shows the 99 % large and a section-wide bar where only 1 % changes colour', async ({
				page,
			}) => {
				await page.goto(prefix);
				const section = page.getByRole('region', { name: guarantee.title });
				const figure = section.getByRole('figure');
				const percentage = figure.getByText(guarantee.number, { exact: true });
				await expect(percentage).toBeVisible();
				const fontSize = await percentage.evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
				expect(fontSize).toBeGreaterThanOrEqual(80);
				for (const text of guarantee.captions) {
					await expect(figure.getByText(text, { exact: true })).toBeVisible();
				}
				await expect(figure).toHaveAccessibleName(guarantee.note);

				// The bar is decorative: the captions say the same in text, and it is only measured by its shape.
				// It runs from the edge of the title to that of the exclusions, the full width of the content.
				const bar = (await figure.locator('[aria-hidden="true"]').boundingBox())!;
				const heading = (await section.getByRole('heading', { level: 2 }).boundingBox())!;
				const exclusions = section.getByRole('list', { name: guarantee.lists[1] });
				const { x, width } = (await exclusions.boundingBox())!;
				expect(bar.x).toBeCloseTo(heading.x, 0);
				expect(bar.x + bar.width).toBeCloseTo(x + width, 0);
				const barWidth = bar.width;
				const tip = (await figure.locator('[aria-hidden="true"] > *').last().boundingBox())!;
				expect(tip.width / barWidth).toBeGreaterThan(0.005);
				expect(tip.width / barWidth).toBeLessThan(0.02);
			});

			test(`"${about.title}": the photo, the name, the Designation, the way of working and LinkedIn`, async ({
				page,
			}) => {
				const images = new Map<string, string>();
				page.on('response', (response) => {
					if (response.request().resourceType() === 'image') {
						images.set(response.url(), response.headers()['content-type'] ?? '');
					}
				});
				await page.goto(prefix, { waitUntil: 'networkidle' });
				const section = page.getByRole('region', { name: about.title });
				await expect(section.getByText(NAME, { exact: true })).toBeVisible();
				await expect(section.getByText(designation, { exact: true })).toBeVisible();
				await expect(section.getByText(about.wayOfWorking, { exact: true })).toBeVisible();
				await expect(
					section.getByRole('link', { name: about.linkedin, exact: true }),
				).toHaveAttribute('href', LINKEDIN);

				// Far from the top: the photo is only requested when it is reached.
				const photo = section.getByRole('img', { name: NAME, exact: true });
				const photoUrl = new URL((await photo.getAttribute('src'))!, page.url()).href;
				expect([...images.keys()]).not.toContain(photoUrl);
				await photo.scrollIntoViewIfNeeded();
				await expect(photo).toBeVisible();
				// The only image in the content (the logo is in the header), in AVIF.
				await expect(page.getByRole('main').locator('img')).toHaveCount(1);
				await expect.poll(() => images.get(photoUrl)).toBe('image/avif');
			});

			test('the sections are where #54 puts them, from "Para quem é", right after the Hero, to the final CTA, at the end', async ({
				page,
			}) => {
				await page.goto(prefix);
				const titles = (
					await page.getByRole('main').getByRole('heading', { level: 2 }).allTextContents()
				).map((title) => title.replace(/\s+/g, ' '));
				const positions = sections.map(({ title }) => titles.indexOf(title));
				expect(positions[0]).toBe(0);
				expect(positions).toEqual([...positions].sort((a, b) => a - b));
				expect(positions.at(-1)).toBe(titles.length - 1);
			});

			test('only the numbers approved by Julien appear', async ({ page }) => {
				await page.goto(prefix);
				for (const { title } of sections) {
					const text = (await page.getByRole('region', { name: title }).textContent())!;
					const numbers = text.match(/\d+(?:[.,]\d+)?/g) ?? [];
					for (const value of numbers) expect(APPROVED_NUMBERS, title).toContain(value);
				}
			});

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('the five sections appear in full, with the Guarantee bar full', async ({ page }) => {
					await page.goto(prefix);
					for (const { title } of sections) {
						await expect(page.getByRole('region', { name: title })).toBeVisible();
					}
					const figure = page.getByRole('region', { name: guarantee.title }).getByRole('figure');
					await expect(figure.getByText(guarantee.number, { exact: true })).toBeVisible();
					const bar = figure.locator('[aria-hidden="true"]');
					const inService = (await bar.locator(':scope > *').first().boundingBox())!;
					expect(inService.width / (await bar.boundingBox())!.width).toBeGreaterThan(0.95);
				});
			});

			// Only a normal space allows a line break.
			test('a number never sits apart from what it measures, a range never breaks, and ? ! : ; » never start a line', async ({
				page,
			}) => {
				await page.goto(prefix);
				for (const { title } of sections) {
					const text = await page.getByRole('region', { name: title }).textContent();
					expect(text, title).not.toMatch(/\d /);
					expect(text, title).not.toMatch(/\d\s(a|à|e|et|to|and) [\d€]/);
					expect(text, title).not.toMatch(/ [?!:;»]/);
				}
			});

			test(
				finalCta.bookingNotice
					? 'below the final CTA button: the Conversation and the notice that booking is in French'
					: 'below the final CTA button: the Conversation, with no notice about the booking language',
				async ({ page }) => {
					await page.goto(prefix);
					const section = page.getByRole('region', { name: finalCta.title });
					const line = section.getByText(finalCta.conversation);
					await expect(line).toHaveText(
						finalCta.bookingNotice
							? `${finalCta.conversation} ${finalCta.bookingNotice}`
							: finalCta.conversation,
					);
					const bookButton = section.getByRole('link', { name: button, exact: true });
					const { y, height } = (await bookButton.boundingBox())!;
					expect((await line.boundingBox())!.y).toBeGreaterThanOrEqual(y + height);
				},
			);
		});
	}
});
