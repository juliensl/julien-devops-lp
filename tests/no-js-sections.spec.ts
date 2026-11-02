// The home page sections that need no JavaScript (#63): "Para quem é", "Hoje, e depois", the
// Guarantee, "Quem é o Julien" and the final CTA.
import { expect, test } from '@playwright/test';
import { inEachBuild } from './builds';
import { LANGUAGES, LINKEDIN, NAME, BOOKING_PAGE, type Language } from './expected';

// The expected values, taken from the spec (#54). In Portuguese, the approved texts are exactly as
// the spec gives them; French and English are translations the intern reviews before the Commercial
// launch (#75). The booking page is in French: the notice only appears in the other languages.
const EXPECTED = {
	pt: {
		whoItsFor: {
			title: 'Para quem é',
			profile: [
				'Um SaaS web ou mobile, já lançado.',
				'A passar de dezenas ou centenas para milhares de utilizadores recorrentes.',
				'Uma equipa de normalmente 5 a 20 pessoas, com pelo menos 3 devs.',
			],
			notLaunchedYet: 'O teu SaaS ainda não foi lançado? Podes marcar a Conversa na mesma.',
			notFor: 'Não é para',
			exclusions: [
				'Quem já tem pipeline de CI, aplicação contentorizada e infraestrutura com auto-scaling.',
				'O que não é web nem mobile.',
				'Quem recusa 100 a 500 €/mês de serviços e infraestrutura.',
				'O setor militar.',
			],
		},
		todayAndAfter: {
			title: 'Hoje, e depois.',
			lists: ['Hoje', 'O que já tentaste', 'Depois'],
		},
		guarantee: {
			title: 'Disponível pelo menos 99 % do tempo, em cada mês.',
			text: 'Em 30 dias, entrego a infraestrutura. Nos 3 meses seguintes, ela está disponível pelo menos 99 % do tempo em cada mês. Se não estiver, continuo a trabalhar sem faturar até chegar lá.',
			appliesWhen:
				'Aplica-se quando contratas os blocos 3 e 4 (e o 2, se a aplicação ainda não estiver contentorizada).',
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
			title: 'Quem é o Julien',
			wayOfWorking:
				'Trabalho à distância, em português, francês e inglês. Uso tecnologias standard, sem lock-in, e documento tudo para a tua equipa ficar autónoma.',
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
		whoItsFor: {
			title: 'Pour qui',
			profile: [
				'Un SaaS web ou mobile, déjà lancé.',
				"Qui passe de quelques dizaines ou centaines à plusieurs milliers d'utilisateurs récurrents.",
				'Une équipe de 5 à 20 personnes en général, dont au moins 3 devs.',
			],
			notLaunchedYet: "Ton SaaS n'est pas encore lancé ? Tu peux réserver l'échange quand même.",
			notFor: "Ce n'est pas pour",
			exclusions: [
				'Ceux qui ont déjà une pipeline CI, une application conteneurisée et une infrastructure avec auto-scaling.',
				"Ce qui n'est ni web ni mobile.",
				"Ceux qui refusent 100 à 500 €/mois de services et d'infrastructure.",
				'Le secteur militaire.',
			],
		},
		todayAndAfter: {
			title: "Aujourd'hui, et après.",
			lists: ["Aujourd'hui", 'Ce que tu as déjà essayé', 'Après'],
		},
		guarantee: {
			title: 'Disponible au moins 99 % du temps, chaque mois.',
			text: "En 30 jours, je livre l'infrastructure. Pendant les 3 mois suivants, elle est disponible au moins 99 % du temps chaque mois. Sinon, je continue à travailler sans facturer jusqu'à y arriver.",
			appliesWhen:
				"S'applique quand tu prends les blocs 3 et 4 (et le 2, si l'application n'est pas encore conteneurisée).",
			lists: ['Conditions', 'Exclusions'],
			conditions: [
				'Un test écrit pour chaque bug corrigé.',
				'Aucun dev ne passe outre un test au rouge.',
				'Un accès en lecture au dépôt.',
				'Une personne technique qui répond sous 48 h.',
			],
			exclusions: [
				'Les pannes du fournisseur cloud.',
				'Les modifications qui ne sont pas passées par la pipeline.',
			],
			number: '99 %',
			captions: ['avec service', 'au plus 1 % sans service'],
			note: 'Pendant les 3 mois qui suivent la livraison.',
		},
		about: {
			title: 'Qui est Julien',
			wayOfWorking:
				"Je travaille à distance, en portugais, en français et en anglais. J'utilise des technologies standard, sans lock-in, et je documente tout pour que ton équipe soit autonome.",
			linkedin: 'Voir mon profil LinkedIn',
		},
		finalCta: {
			title: "Tu ne perds jamais l'infrastructure.",
			conversation: 'Échange de 45 min sur Google Meet, gratuit et sans engagement.',
			bookingNotice: undefined,
		},
	},
	en: {
		whoItsFor: {
			title: "Who it's for",
			profile: [
				'A web or mobile SaaS, already launched.',
				'Growing from tens or hundreds to thousands of recurring users.',
				'A team of usually 5 to 20 people, with at least 3 devs.',
			],
			notLaunchedYet: "Haven't launched your SaaS yet? You can still book the conversation.",
			notFor: 'Not for',
			exclusions: [
				'Teams that already have a CI pipeline, a containerised application and auto-scaling infrastructure.',
				"Anything that isn't web or mobile.",
				'Teams that turn down €100 to €500 a month for services and infrastructure.',
				'The military sector.',
			],
		},
		todayAndAfter: {
			title: 'Today, and after.',
			lists: ['Today', "What you've already tried", 'After'],
		},
		guarantee: {
			title: 'Available at least 99% of the time, every month.',
			text: "In 30 days, I deliver the infrastructure. For the next 3 months, it is available at least 99% of the time every month. If it isn't, I keep working without billing until it is.",
			appliesWhen:
				"Applies when you take blocks 3 and 4 (and 2, if the application isn't containerised yet).",
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
		about: {
			title: 'Who is Julien',
			wayOfWorking:
				'I work remotely, in Portuguese, French and English. I use standard technologies, with no lock-in, and document everything so your team can run on its own.',
			linkedin: 'See my LinkedIn profile',
		},
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
			test(`"${button}" is in the header, in the Hero, at the end of "${whoItsFor.title}" and in the final CTA`, async ({
				page,
			}) => {
				await page.goto(prefix);
				const places = {
					header: page.getByRole('banner'),
					hero: page.getByRole('region', { name: promise }),
					whoItsFor: page.getByRole('region', { name: whoItsFor.title }),
					finalCta: page.getByRole('region', { name: finalCta.title }),
				};
				for (const [place, region] of Object.entries(places)) {
					const bookButton = region.getByRole('link', { name: button, exact: true });
					await expect(bookButton, place).toHaveCount(1);
					await expect(bookButton, place).toHaveAttribute('href', BOOKING_PAGE);
					await expect(bookButton, place).not.toHaveAttribute('target');
				}
				// The button closes "Para quem é": it sits below the exclusions.
				const exclusions = places.whoItsFor.getByRole('list', { name: whoItsFor.notFor });
				const { y, height } = (await exclusions.boundingBox())!;
				const bookButton = places.whoItsFor.getByRole('link', { name: button, exact: true });
				expect((await bookButton.boundingBox())!.y).toBeGreaterThanOrEqual(y + height);
			});

			test(`"${whoItsFor.title}" shows the profile, the sentence for those not launched yet and the 4 exclusions`, async ({
				page,
			}) => {
				await page.goto(prefix);
				const section = page.getByRole('region', { name: whoItsFor.title });
				for (const sentence of [...whoItsFor.profile, whoItsFor.notLaunchedYet]) {
					await expect(section.getByText(sentence, { exact: true })).toBeVisible();
				}
				const exclusions = section.getByRole('list', { name: whoItsFor.notFor });
				await expect(exclusions.getByRole('listitem')).toHaveText(whoItsFor.exclusions);
			});

			test(`"${todayAndAfter.title}": what the CTO lives with, what they already tried and the change, with no numbers`, async ({
				page,
			}) => {
				await page.goto(prefix);
				const section = page.getByRole('region', { name: todayAndAfter.title });
				for (const list of todayAndAfter.lists) {
					const items = section.getByRole('list', { name: list }).getByRole('listitem');
					await expect(items.first(), list).toBeVisible();
				}
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
