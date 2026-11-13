// The home page sections that need no JavaScript (#63): "Para quem é", "Hoje, e depois",
// "Disponibilidade e fiabilidade", "Quem é o Julien" and the final CTA.
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
	availability: {
		label: 'Disponibilité & fiabilité',
		title: 'Une infrastructure fiable, conçue pour durer.',
		text: "Selon les besoins de ton SaaS, je conçois et teste une infrastructure visant un objectif de disponibilité défini ensemble : 99,5 %, 99,9 %, 99,95 % ou davantage lorsque l'architecture le justifie. Le bon niveau dépend de ton activité, des services utilisés et de ton budget.",
		guarantee:
			"Pour une intervention complète couvrant les quatre blocs, je propose une garantie de conformité technique de trois mois après la livraison : si un défaut de conception ou de configuration relevant de mon intervention est constaté, je prends en charge sa correction dans les conditions convenues au contrat. Il ne s'agit pas d'une astreinte 24 h/24 ni d'une garantie d'absence de panne applicative.",
		link: 'Comprendre les niveaux de disponibilité et consulter les conditions',
		/** The heading of the page the link leads to. */
		pageHeading: 'Quel niveau de disponibilité pour ton SaaS ?',
	},
	about: {
		title: 'Qui est Julien ?',
		wayOfWorking:
			"J'interviens sur ton projet en français, en anglais ou en portugais. J'utilise des technologies modernes et éprouvées, je limite autant que possible la dépendance à un fournisseur et je documente ce que je livre pour que ton équipe reste autonome. Mes solutions s'adaptent à tes contraintes techniques et métier, pas l'inverse.",
		linkedin: 'Voir mon profil LinkedIn',
	},
	finalCta: {
		title: 'Ton SaaS mérite mieux que des correctifs en urgence.',
		text: "Tu as déjà un projet en tête, ou simplement des questions sur ton code, ton infrastructure ou ton prochain déploiement ? Parlons-en. Un premier échange suffit pour identifier les priorités et voir comment je peux t'aider.",
		button: 'Réserver un échange gratuit',
		conversation: '45 minutes sur Google Meet. Sans engagement.',
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
		availability: {
			label: 'Disponibilidade e fiabilidade',
			title: 'Uma infraestrutura fiável, concebida para durar.',
			text: 'Consoante as necessidades do teu SaaS, concebo e testo uma infraestrutura que visa um objetivo de disponibilidade definido em conjunto: 99,5 %, 99,9 %, 99,95 % ou mais, quando a arquitetura o justifica. O nível certo depende do teu negócio, dos serviços utilizados e do teu orçamento.',
			guarantee:
				'Para uma intervenção completa que cubra os quatro blocos, proponho uma garantia de conformidade técnica de três meses após a entrega: se for detetado um defeito de conceção ou de configuração que caiba na minha intervenção, asseguro a sua correção nas condições acordadas no contrato. Não se trata de um serviço de piquete 24 h/24 nem de uma garantia de ausência de avarias da aplicação.',
			link: 'Perceber os níveis de disponibilidade e consultar as condições',
			pageHeading: 'Que nível de disponibilidade para o teu SaaS?',
		},
		about: {
			title: 'Quem é o Julien?',
			wayOfWorking:
				'Trabalho no teu projeto em francês, inglês ou português. Uso tecnologias modernas e comprovadas, limito tanto quanto possível a dependência de um fornecedor e documento o que entrego para que a tua equipa continue autónoma. As minhas soluções adaptam-se às tuas restrições técnicas e de negócio, e não o contrário.',
			linkedin: 'Ver o meu perfil no LinkedIn',
		},
		finalCta: {
			title: 'O teu SaaS merece mais do que correções de emergência.',
			text: 'Já tens um projeto em mente, ou simplesmente perguntas sobre o teu código, a tua infraestrutura ou o teu próximo deploy? Vamos falar disso. Uma primeira conversa chega para identificar as prioridades e ver como te posso ajudar.',
			button: 'Marcar uma conversa gratuita',
			conversation: '45 minutos por Google Meet. Sem compromisso.',
			bookingNotice:
				'A página de marcação está em francês, mas a Conversa pode ser em inglês ou em português.',
		},
	},
	fr: {
		whoItsFor: FRENCH.whoItsFor,
		todayAndAfter: FRENCH.todayAndAfter,
		availability: FRENCH.availability,
		about: FRENCH.about,
		finalCta: { ...FRENCH.finalCta, bookingNotice: undefined },
	},
	en: {
		whoItsFor: FRENCH.whoItsFor,
		todayAndAfter: FRENCH.todayAndAfter,
		availability: FRENCH.availability,
		about: { ...FRENCH.about, linkedin: 'See my LinkedIn profile' },
		finalCta: {
			...FRENCH.finalCta,
			bookingNotice:
				'The booking page is in French, but the conversation can be in English or Portuguese.',
		},
	},
} satisfies Record<Language, unknown>;

// The numbers in Julien's texts (#54, "Só se publica o que está validado"): the availability
// objectives, 24 h/24 and 45 min.
const APPROVED_NUMBERS = ['24', '45', '99,5', '99,9', '99,95'];

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const { prefix, promise, designation, button } = LANGUAGES[language];
		const { whoItsFor, todayAndAfter, availability, about, finalCta } = EXPECTED[language];
		const sections = [whoItsFor, todayAndAfter, availability, about, finalCta];

		test.describe(prefix, () => {
			test(`"${button}" is in the header and in the Hero, not in "${whoItsFor.title}"`, async ({
				page,
			}) => {
				await page.goto(prefix);
				const places = {
					header: page.getByRole('banner'),
					hero: page.getByRole('region', { name: promise }),
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

			test(`"${availability.label}": the title, the two paragraphs and the link to the availability page in the same language`, async ({
				page,
			}) => {
				await page.goto(prefix);
				const section = page.getByRole('region', { name: availability.title });
				for (const text of [availability.label, availability.text, availability.guarantee]) {
					await expect(section.getByText(text, { exact: true })).toBeVisible();
				}
				const link = section.getByRole('link');
				await expect(link).toHaveCount(1);
				await expect(link).toHaveAccessibleName(availability.link);
				await link.click();
				await expect(page).toHaveURL(`${prefix}availability/`);
				await expect(page.getByRole('heading', { level: 1 })).toHaveText(availability.pageHeading);
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

			test(`the final CTA: "${finalCta.title}", the paragraph and "${finalCta.button}", its only link, to the booking page`, async ({
				page,
			}) => {
				await page.goto(prefix);
				const section = page.getByRole('region', { name: finalCta.title });
				await expect(section.getByText(finalCta.text, { exact: true })).toBeVisible();
				const link = section.getByRole('link');
				await expect(link).toHaveCount(1);
				await expect(link).toHaveAccessibleName(finalCta.button);
				await expect(link).toHaveAttribute('href', BOOKING_PAGE);
				await expect(link).not.toHaveAttribute('target');
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

				test('the five sections appear in full', async ({ page }) => {
					await page.goto(prefix);
					for (const { title } of sections) {
						await expect(page.getByRole('region', { name: title })).toBeVisible();
					}
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
					const bookButton = section.getByRole('link', { name: finalCta.button, exact: true });
					const { y, height } = (await bookButton.boundingBox())!;
					expect((await line.boundingBox())!.y).toBeGreaterThanOrEqual(y + height);
				},
			);
		});
	}
});
