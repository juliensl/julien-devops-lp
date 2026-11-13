// The «Disponibilité & conditions» page: the four availability levels, the calculator of the longest
// downtime each one allows, what it means for the architecture, and the guarantee and its conditions.
import { expect, test, type Page } from '@playwright/test';
import { maxDowntime } from '../src/config/availability.ts';
import { inEachBuild } from './builds';
import { BOOKING_PAGE, LANGUAGES, NAME, type Language } from './expected';

const PATH = 'availability/';

/** A text with plain spaces, to compare with what the spec writes. */
const plain = (text: string) => text.replace(/\u00a0/g, ' ');

// The French texts are Julien's (§2); the description is made of his sentences. Portuguese is their
// translation. English shows the French until its translation.
const FRENCH = {
	title: 'Disponibilité & conditions',
	description:
		"Compare les niveaux de disponibilité, calcule ton temps d'indisponibilité théorique et consulte les conditions de la garantie de conformité.",
	heading: 'Quel niveau de disponibilité pour ton SaaS ?',
	intro:
		"Un objectif de disponibilité se choisit selon l'impact réel d'une interruption sur ton activité. Plus l'objectif est élevé, plus l'architecture, la redondance et l'exploitation peuvent devenir exigeantes et coûteuses. Compare les niveaux avant de décider.",
	calculator: {
		title: "Calcule ton temps d'indisponibilité théorique",
		text: "Choisis un objectif de disponibilité et découvre ce qu'il représente en minutes par mois et en heures par an. Ces valeurs sont indicatives : un objectif d'architecture ne garantit pas, à lui seul, la disponibilité de toute l'application.",
		objective: 'Objectif de disponibilité',
		month: 'Durée du mois',
		days: 'jours',
		result: 'Indisponibilité maximale théorique',
		perMonth: 'Par mois',
		perYear: 'Équivalent annuel',
		about: 'environ',
		formula:
			'Formule, pour une mesure 24 h/24 : (1 − objectif / 100) × durée de la période en secondes, sur le mois choisi ou sur une année de 365 jours.',
	},
	levels: [
		[
			'Disponibilité essentielle',
			'Pour une application qui peut tolérer des interruptions occasionnelles. Une infrastructure simple peut suffire selon les dépendances et les risques acceptés.',
		],
		[
			'Disponibilité renforcée',
			'Pour réduire les interruptions et mieux sécuriser les services critiques. La supervision et la limitation des points uniques de défaillance deviennent prioritaires.',
		],
		[
			'Haute disponibilité',
			'Pour des services où une interruption prolongée a un impact important. Une redondance adaptée, des mécanismes de bascule et des tests de reprise peuvent être nécessaires.',
		],
		[
			'Disponibilité très élevée',
			"Pour des usages particulièrement sensibles aux interruptions. L'architecture et les procédures d'exploitation doivent être étudiées au cas par cas.",
		],
	],
	// Not in Julien's document: written from the levels' texts.
	architecture: {
		title: "Ce que l'objectif demande à l'architecture",
		intro:
			"Plus l'objectif est élevé, plus l'architecture doit limiter les points uniques de défaillance et se remettre vite d'une panne. Les choix ci-dessous peuvent y contribuer selon le niveau retenu, mais aucune topologie ne garantit, à elle seule, un pourcentage de disponibilité.",
		cards: [
			[
				'Redondance',
				"Plusieurs instances de l'application, pour qu'une instance en panne n'arrête pas tout le service. Aux niveaux les moins exigeants, une infrastructure simple peut suffire.",
			],
			[
				'Sauvegardes',
				"Des sauvegardes régulières, avec des restaurations testées, quel que soit le niveau. Elles permettent de repartir après un incident, sans empêcher l'interruption.",
			],
			[
				'Base de données',
				"Souvent le point unique de défaillance le plus délicat. Quand l'objectif augmente, une réplique prête à prendre le relais peut devenir nécessaire.",
			],
			[
				'Multi-AZ',
				"Répartir les ressources sur plusieurs zones de disponibilité d'une même région, pour que la panne d'une zone n'arrête pas tout le service.",
			],
			[
				'Bascule (failover)',
				"Des mécanismes qui redirigent le trafic vers une ressource saine, et des tests de reprise pour vérifier qu'ils fonctionnent.",
			],
			[
				'Supervision',
				'Des alertes pour détecter une interruption et réagir vite. Elle devient prioritaire dès 99,9 %.',
			],
		],
	},
	commitment: [
		"Un objectif de disponibilité n'est pas une astreinte.",
		"Je conçois, configure et vérifie l'infrastructure pour répondre au niveau de disponibilité retenu dans la proposition d'intervention. Le fournisseur cloud reste responsable de ses propres engagements de service. Après livraison, la surveillance quotidienne et la réaction aux incidents relèvent de l'organisation prévue avec ton équipe ou ton prestataire d'exploitation. Une intervention humaine 24 h/24 n'est pas incluse.",
	],
	guarantee: [
		'Trois mois de garantie de conformité technique.',
		"Lorsque les quatre blocs sont réalisés dans le cadre d'une prestation complète, les défauts de conception ou de configuration de l'infrastructure qui me sont directement imputables peuvent être signalés pendant les trois mois suivant la livraison. Leur analyse et leur correction sont prises en charge selon le périmètre et les modalités définis au contrat. Cette garantie ne couvre pas automatiquement les bugs applicatifs, les pannes externes ou les modifications non validées.",
	],
	conditions: {
		title: 'Conditions et limites de la garantie de conformité',
		intro:
			"Les conditions contractuelles de la proposition d'intervention font foi. Les principes ci-dessous expliquent le fonctionnement de la garantie et ne remplacent pas le contrat signé.",
		items: [
			[
				'Ce qui est couvert',
				"Les défauts de conception, de paramétrage ou de déploiement de l'infrastructure directement liés aux travaux livrés et inclus dans le périmètre contractuel, signalés dans les trois mois suivant la livraison de la prestation complète couvrant les quatre blocs.",
			],
			[
				"Ce qui n'est pas couvert",
				"Les indisponibilités propres aux fournisseurs cloud ou à des services tiers, sauf lorsqu'elles révèlent une faute de conception ou de configuration relevant de ma prestation ; les bugs et évolutions applicatives hors du périmètre corrigé ; les changements de code, de configuration ou d'infrastructure effectués sans validation et à l'origine du dysfonctionnement ; l'utilisation en dehors des hypothèses de dimensionnement convenues ; le non-respect des prérequis ou recommandations critiques documentés ; les incidents dus à des accès, autorisations ou informations indisponibles du côté client.",
			],
			[
				'Responsabilités',
				"Le client conserve la responsabilité de l'exploitation courante, de la validation des changements et de l'organisation de la réponse aux incidents, sauf prestation supplémentaire explicitement prévue. La garantie n'inclut pas d'astreinte 24 h/24, de délai de réaction immédiat ni de compensation financière automatique.",
			],
			[
				'Comment signaler un défaut',
				'Pendant la période couverte, le client transmet une description du problème et les informations utiles au diagnostic. Lorsque la non-conformité entre dans le périmètre de la prestation, les modalités de correction sont convenues en fonction de sa nature et de son impact.',
			],
		],
	},
	button: "Définissons l'objectif de disponibilité adapté à ton projet",
};
type Texts = typeof FRENCH;
const EXPECTED: Record<Language, Texts> = {
	fr: FRENCH,
	en: FRENCH,
	pt: {
		title: 'Disponibilidade e condições',
		description:
			'Compara os níveis de disponibilidade, calcula o teu tempo de indisponibilidade teórico e consulta as condições da garantia de conformidade.',
		heading: 'Que nível de disponibilidade para o teu SaaS?',
		intro:
			'Um objetivo de disponibilidade escolhe-se de acordo com o impacto real de uma interrupção no teu negócio. Quanto mais alto for o objetivo, mais exigentes e dispendiosas se podem tornar a arquitetura, a redundância e a operação. Compara os níveis antes de decidir.',
		calculator: {
			title: 'Calcula o teu tempo de indisponibilidade teórico',
			text: 'Escolhe um objetivo de disponibilidade e descobre o que representa em minutos por mês e em horas por ano. Estes valores são indicativos: um objetivo de arquitetura não garante, por si só, a disponibilidade de toda a aplicação.',
			objective: 'Objetivo de disponibilidade',
			month: 'Duração do mês',
			days: 'dias',
			result: 'Indisponibilidade máxima teórica',
			perMonth: 'Por mês',
			perYear: 'Equivalente anual',
			about: 'cerca de',
			formula:
				'Fórmula, para uma medição 24 h/24: (1 − objetivo / 100) × duração do período em segundos, no mês escolhido ou num ano de 365 dias.',
		},
		levels: [
			[
				'Disponibilidade essencial',
				'Para uma aplicação que pode tolerar interrupções ocasionais. Uma infraestrutura simples pode bastar, consoante as dependências e os riscos aceites.',
			],
			[
				'Disponibilidade reforçada',
				'Para reduzir as interrupções e proteger melhor os serviços críticos. A monitorização e a limitação dos pontos únicos de falha passam a ser prioritárias.',
			],
			[
				'Alta disponibilidade',
				'Para serviços em que uma interrupção prolongada tem um impacto importante. Uma redundância adequada, mecanismos de comutação e testes de recuperação podem ser necessários.',
			],
			[
				'Disponibilidade muito elevada',
				'Para utilizações particularmente sensíveis a interrupções. A arquitetura e os procedimentos de operação devem ser estudados caso a caso.',
			],
		],
		architecture: {
			title: 'O que o objetivo exige da arquitetura',
			intro:
				'Quanto mais alto for o objetivo, mais a arquitetura tem de limitar os pontos únicos de falha e recuperar depressa de uma avaria. As escolhas abaixo podem contribuir para isso, consoante o nível escolhido, mas nenhuma topologia garante, por si só, uma percentagem de disponibilidade.',
			cards: [
				[
					'Redundância',
					'Várias instâncias da aplicação, para que uma instância avariada não pare todo o serviço. Nos níveis menos exigentes, uma infraestrutura simples pode bastar.',
				],
				[
					'Backups',
					'Backups regulares, com restauros testados, seja qual for o nível. Permitem recomeçar depois de um incidente, sem impedir a interrupção.',
				],
				[
					'Base de dados',
					'Muitas vezes, o ponto único de falha mais delicado. Quando o objetivo sobe, uma réplica pronta a assumir o lugar pode tornar-se necessária.',
				],
				[
					'Multi-AZ',
					'Distribuir os recursos por várias zonas de disponibilidade da mesma região, para que a avaria de uma zona não pare todo o serviço.',
				],
				[
					'Comutação (failover)',
					'Mecanismos que redirecionam o tráfego para um recurso saudável, e testes de recuperação para verificar que funcionam.',
				],
				[
					'Monitorização',
					'Alertas para detetar uma interrupção e reagir depressa. Passa a ser prioritária a partir de 99,9 %.',
				],
			],
		},
		commitment: [
			'Um objetivo de disponibilidade não é um serviço de piquete.',
			'Concebo, configuro e verifico a infraestrutura para responder ao nível de disponibilidade escolhido na proposta de intervenção. O fornecedor cloud continua responsável pelos seus próprios compromissos de serviço. Depois da entrega, a monitorização diária e a resposta a incidentes cabem à organização prevista com a tua equipa ou com o teu prestador de operação. Não está incluída uma intervenção humana 24 h/24.',
		],
		guarantee: [
			'Três meses de garantia de conformidade técnica.',
			'Quando os quatro blocos são realizados no âmbito de uma prestação completa, os defeitos de conceção ou de configuração da infraestrutura que me sejam diretamente imputáveis podem ser comunicados durante os três meses seguintes à entrega. A sua análise e correção são asseguradas de acordo com o âmbito e as modalidades definidos no contrato. Esta garantia não cobre automaticamente os bugs da aplicação, as avarias externas nem as alterações não validadas.',
		],
		conditions: {
			title: 'Condições e limites da garantia de conformidade',
			intro:
				'As condições contratuais da proposta de intervenção fazem fé. Os princípios abaixo explicam o funcionamento da garantia e não substituem o contrato assinado.',
			items: [
				[
					'O que está coberto',
					'Os defeitos de conceção, de parametrização ou de implementação da infraestrutura diretamente ligados aos trabalhos entregues e incluídos no âmbito contratual, comunicados nos três meses seguintes à entrega da prestação completa que cobre os quatro blocos.',
				],
				[
					'O que não está coberto',
					'As indisponibilidades próprias dos fornecedores cloud ou de serviços de terceiros, exceto quando revelam uma falha de conceção ou de configuração que caiba na minha prestação; os bugs e as evoluções da aplicação fora do âmbito corrigido; as alterações de código, de configuração ou de infraestrutura feitas sem validação e que estejam na origem do mau funcionamento; a utilização fora dos pressupostos de dimensionamento acordados; o incumprimento dos pré-requisitos ou das recomendações críticas documentados; os incidentes devidos a acessos, autorizações ou informações indisponíveis do lado do cliente.',
				],
				[
					'Responsabilidades',
					'O cliente mantém a responsabilidade pela operação corrente, pela validação das alterações e pela organização da resposta a incidentes, salvo prestação adicional explicitamente prevista. A garantia não inclui serviço de piquete 24 h/24, prazo de reação imediato nem compensação financeira automática.',
				],
				[
					'Como comunicar um defeito',
					'Durante o período coberto, o cliente envia uma descrição do problema e as informações úteis para o diagnóstico. Quando a não conformidade entra no âmbito da prestação, as modalidades de correção são acordadas de acordo com a sua natureza e o seu impacto.',
				],
			],
		},
		button: 'Vamos definir o objetivo de disponibilidade adequado ao teu projeto',
	},
};

/** The four levels, as the spec writes them, with the longest downtime over 30 days and 365 days. */
const LEVELS = [
	{ objective: '99.5', month: '3 h 36 min', year: '43 h 48 min' },
	{ objective: '99.9', month: '43 min 12 s', year: '8 h 45 min 36 s' },
	{ objective: '99.95', month: '21 min 36 s', year: '4 h 22 min 48 s' },
	{ objective: '99.99', month: '≈ 4 min 19 s', year: '≈ 52 min 34 s' },
];

inEachBuild((build) => {
	for (const language of build.phase.publishedLanguages) {
		const t = EXPECTED[language];
		const path = `${LANGUAGES[language].prefix}${PATH}`;
		const c = t.calculator;
		/** An objective as the page writes it: "99,9 %" in French and Portuguese, "99.9%" in English. */
		const percent = (objective: string) =>
			language === 'en' ? `${objective}%` : `${objective.replace('.', ',')} %`;
		/** A downtime as the page writes it: the font has no "≈", so the page says it in words. */
		const downtime = (text: string) => text.replace('≈', c.about);
		const calculator = (page: Page) => page.getByRole('region', { name: c.title });
		const result = (page: Page) => calculator(page).getByRole('group', { name: c.result });
		const radio = (page: Page, name: string) =>
			calculator(page).getByRole('radio', { name, exact: true });
		const month = (days: number) => `${days} ${c.days}`;
		const perMonth = (days: number, text: string) =>
			`${c.perMonth} (${month(days)}) ${downtime(text)}`;
		const perYear = (text: string) => `${c.perYear} (${month(365)}) ${downtime(text)}`;

		test.describe(`${path} calculator`, () => {
			test('opens on 99.9 % over a 30-day month, with the formula and the values said to be indicative', async ({
				page,
			}) => {
				await page.goto(path);
				await expect(radio(page, percent('99.9'))).toBeChecked();
				await expect(radio(page, month(30))).toBeChecked();
				await expect(result(page)).toContainText(`${c.objective} ${percent('99.9')}`);
				await expect(result(page)).toContainText(perMonth(30, '43 min 12 s'));
				await expect(result(page)).toContainText(perYear('8 h 45 min 36 s'));
				await expect(calculator(page).getByRole('table')).toHaveCount(0);
				await expect(calculator(page)).toContainText(c.text);
				await expect(calculator(page)).toContainText(c.formula);
			});

			test('each level gives the longest downtime over 30 days and over a year of 365 days', async ({
				page,
			}) => {
				await page.goto(path);
				for (const level of LEVELS) {
					await radio(page, percent(level.objective)).check();
					await expect(result(page)).toContainText(`${c.objective} ${percent(level.objective)}`);
					await expect(result(page)).toContainText(perMonth(30, level.month));
					await expect(result(page)).toContainText(perYear(level.year));
				}
			});

			// 99.9 % over 28 days: 2,419.2 s; over 31 days: 2,678.4 s.
			test("changing the month updates the month's result, not the year's, and screen readers hear it", async ({
				page,
			}) => {
				await page.goto(path);
				const status = calculator(page).getByRole('status');
				await radio(page, month(28)).check();
				await expect(result(page)).toContainText(perMonth(28, '≈ 40 min 19 s'));
				await expect(result(page)).toContainText(perYear('8 h 45 min 36 s'));
				await expect(status).toHaveText(
					`${c.objective}, ${percent('99.9')}. ${c.perMonth} (${month(28)}), ${downtime('≈ 40 min 19 s')}. ${c.perYear} (${month(365)}), 8 h 45 min 36 s.`,
				);

				await radio(page, month(31)).check();
				await expect(result(page)).toContainText(perMonth(31, '≈ 44 min 38 s'));
				await expect(status).toContainText(downtime('≈ 44 min 38 s'));
			});

			// 99.95 % over 31 days: 1,339.2 s.
			test('works with the keyboard, and screen readers hear the new level', async ({ page }) => {
				await page.goto(path);
				await radio(page, percent('99.9')).focus();
				await page.keyboard.press('ArrowRight');
				await expect(radio(page, percent('99.95'))).toBeChecked();
				await expect(result(page)).toContainText(perMonth(30, '21 min 36 s'));
				await expect(calculator(page).getByRole('status')).toContainText(
					`${c.objective}, ${percent('99.95')}`,
				);

				await page.keyboard.press('Tab');
				await expect(radio(page, month(30))).toBeFocused();
				await page.keyboard.press('ArrowRight');
				await expect(radio(page, month(31))).toBeChecked();
				await expect(result(page)).toContainText(perMonth(31, '≈ 22 min 19 s'));
				await expect(result(page)).toContainText(perYear('4 h 22 min 48 s'));
			});
		});

		test.describe(`${path} calculator without JS`, () => {
			test.use({ javaScriptEnabled: false });

			test('shows every level over a 30-day month and over a year, without the choices', async ({
				page,
			}) => {
				await page.goto(path);
				await expect(calculator(page).getByRole('radio')).toHaveCount(0);
				await expect(result(page)).toBeHidden();
				const table = calculator(page).getByRole('table', { name: c.result });
				await expect(table.getByRole('columnheader')).toHaveText([
					c.objective,
					`${c.perMonth} (${month(30)})`,
					`${c.perYear} (${month(365)})`,
				]);
				const rows = table.getByRole('row');
				await expect(rows).toHaveCount(LEVELS.length + 1);
				for (const [k, level] of LEVELS.entries()) {
					const row = rows.nth(k + 1);
					await expect(row.getByRole('rowheader')).toHaveText(percent(level.objective));
					await expect(row.getByRole('cell')).toHaveText([
						downtime(level.month),
						downtime(level.year),
					]);
				}
				await expect(calculator(page)).toContainText(c.formula);
			});

			test('on a 320 px phone, the table fits the screen', async ({ page }) => {
				await page.setViewportSize({ width: 320, height: 640 });
				await page.goto(path);
				const overflow = await page.evaluate(
					() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
				);
				expect(overflow).toBe(0);
			});
		});

		test(`${path}: shows the four levels, each with its objective, its name and its text`, async ({
			page,
		}) => {
			await page.goto(path);
			const levels = calculator(page).getByRole('listitem');
			await expect(levels).toHaveCount(4);
			for (const [k, [name, text]] of t.levels.entries()) {
				await expect(levels.nth(k).getByRole('heading', { level: 3 })).toHaveText(
					`${percent(LEVELS[k].objective)} ${name}`,
				);
				await expect(levels.nth(k)).toContainText(text);
			}
		});

		test(`${path}: explains what the objective asks of the architecture`, async ({ page }) => {
			await page.goto(path);
			const section = page.getByRole('region', { name: t.architecture.title });
			await expect(section).toContainText(t.architecture.intro);
			const cards = section.getByRole('listitem');
			await expect(cards).toHaveCount(t.architecture.cards.length);
			for (const [k, [title, text]] of t.architecture.cards.entries()) {
				await expect(cards.nth(k).getByRole('heading', { level: 3 })).toHaveText(title);
				await expect(cards.nth(k)).toContainText(text);
			}
		});

		test(`${path}: says an objective is not on-call duty, and what the three-month guarantee covers`, async ({
			page,
		}) => {
			await page.goto(path);
			for (const [title, text] of [t.commitment, t.guarantee]) {
				await expect(page.getByRole('region', { name: title })).toContainText(text);
			}
		});

		test(`${path}: shows the guarantee's conditions, which the signed contract overrides`, async ({
			page,
		}) => {
			await page.goto(path);
			const section = page.getByRole('region', { name: t.conditions.title });
			await expect(section).toContainText(t.conditions.intro);
			await expect(section.getByRole('heading', { level: 3 })).toHaveText(
				t.conditions.items.map(([title]) => title),
			);
			for (const [, text] of t.conditions.items) await expect(section).toContainText(text);
		});

		test(`${path}: ends with the button to the booking page`, async ({ page }) => {
			await page.goto(path);
			const last = page.getByRole('main').getByRole('link').last();
			await expect(last).toHaveText(t.button);
			await expect(last).toHaveAttribute('href', BOOKING_PAGE);
		});

		test(`${path}: shows no price`, async ({ page }) => {
			await page.goto(path);
			expect(await page.getByRole('main').innerText()).not.toMatch(/[€$£]|\b(EUR|USD)\b/);
		});

		test(`${path}: has its title, its description, its heading and the introduction`, async ({
			page,
		}) => {
			await page.goto(path);
			await expect(page).toHaveTitle(`${t.title} · ${NAME}`);
			await expect(page.locator('meta[name="description"]')).toHaveAttribute(
				'content',
				t.description,
			);
			const main = page.getByRole('main');
			await expect(main.getByRole('heading', { level: 1 })).toHaveText(t.heading);
			await expect(main).toContainText(t.intro);
		});
	}
});

test.describe('the longest downtime of an objective', () => {
	// The spec's control values for a 30-day month (#129, «Decisões de teste»).
	for (const [objective, expected] of [
		[99.5, '3 h 36 min'],
		[99.9, '43 min 12 s'],
		[99.95, '21 min 36 s'],
		[99.99, 'about 4 min 19 s'],
	] as const) {
		test(`${objective} % over a 30-day month: ${expected}`, () => {
			expect(plain(maxDowntime(objective, 30, 'about'))).toBe(expected);
		});
	}

	// Worked out by hand over 365 days (31,536,000 s): 0.5 % = 157,680 s; 0.1 % = 31,536 s;
	// 0.05 % = 15,768 s; 0.01 % = 3,153.6 s.
	for (const [objective, expected] of [
		[99.5, '43 h 48 min'],
		[99.9, '8 h 45 min 36 s'],
		[99.95, '4 h 22 min 48 s'],
		[99.99, 'about 52 min 34 s'],
	] as const) {
		test(`${objective} % over a year of 365 days: ${expected}`, () => {
			expect(plain(maxDowntime(objective, 365, 'about'))).toBe(expected);
		});
	}

	test('a number never ends a line away from its unit', () => {
		expect(maxDowntime(99.9, 365, 'about')).toBe('8\u00a0h 45\u00a0min 36\u00a0s');
		expect(maxDowntime(99.99, 30, 'about')).toBe('about\u00a04\u00a0min 19\u00a0s');
	});
});
