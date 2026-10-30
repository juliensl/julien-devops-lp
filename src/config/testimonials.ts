// The Testimonials: Julien's three Malt reviews (#51), with what each author allowed.
// A Testimonial shows in a language only with its author's written authorisation for it and, in
// English and Portuguese, the author's approval of that translation. Julien keeps the authorisation
// emails; a translation is marked approved only once the intern brings the author's approval.
import type { Language } from './site';

/** The languages that show a translation: the authors wrote in French. */
type TranslatedLanguage = Exclude<Language, 'fr'>;

interface Testimonial {
	firstName: string;
	/** The company at the time of the work with Julien. Never translated. */
	company: string;
	/** The role at the time of the work with Julien, in each language. */
	role: Record<Language, string>;
	/** The author's own text, as on Malt: one string per paragraph. */
	text: string[];
	authorised: Record<Language, boolean>;
	translations: Record<TranslatedLanguage, { text: string[]; approved: boolean }>;
}

/** The authorisations cover every language (#51). The English translations are drafts. */
const TESTIMONIALS: Testimonial[] = [
	{
		firstName: 'Thibaud',
		company: 'Vasco',
		role: { fr: 'Founder', en: 'Founder', pt: 'Fundador' },
		text: [
			"Julien a été très pro dans l'approche. Il est intervenu sur un périmètre précis, il a aidé notre équipe technique sénior qui avait déjà de bonnes notions, mais le DevOps est une discipline à part entière et c'est en collaborant avec Julien qu'on en devient convaincus. Un profil à recommander à 100%",
		],
		authorised: { fr: true, en: true, pt: true },
		translations: {
			en: {
				text: [
					'Julien was very professional in his approach. He worked on a well-defined scope and helped our senior technical team, who already had a good grounding, but DevOps is a discipline in its own right, and it is by working with Julien that you become convinced of it. A profile I recommend 100%.',
				],
				approved: false,
			},
			pt: {
				text: [
					'O Julien foi muito profissional na abordagem. Interveio num âmbito preciso e ajudou a nossa equipa técnica sénior, que já tinha boas noções, mas o DevOps é uma disciplina por direito próprio e é a trabalhar com o Julien que ficamos convencidos disso. Um perfil a recomendar a 100 %.',
				],
				approved: true,
			},
		},
	},
	{
		firstName: 'Adam',
		company: 'Venus consulting',
		role: { fr: 'Expert devops', en: 'DevOps expert', pt: 'Especialista DevOps' },
		text: [
			"J'ai fait appel à Julien dans le cadre d'un projet de formation en DevOps, et son intervention a été une totale réussite. Julien s'est montré parfaitement à la hauteur de la mission.",
			"Grâce à sa double expertise de développeur et de spécialiste DevOps, il a su transmettre des compétences pointues avec beaucoup de pédagogie et de clarté. Son professionnalisme, sa maîtrise technique et sa capacité à s'adapter aux besoins du projet ont été des atouts majeurs. Je recommande vivement Julien à quiconque cherche un expert DevOps fiable, compétent et excellent pédagogue. Un grand merci pour ton travail !",
		],
		authorised: { fr: true, en: true, pt: true },
		translations: {
			en: {
				text: [
					'I brought Julien in for a DevOps training project, and his work was a complete success. Julien proved fully up to the task.',
					"Thanks to his dual expertise as a developer and a DevOps specialist, he passed on advanced skills with great teaching ability and clarity. His professionalism, his technical mastery and his ability to adapt to the project's needs were major assets. I highly recommend Julien to anyone looking for a reliable, skilled DevOps expert who is an excellent teacher. Many thanks for your work!",
				],
				approved: false,
			},
			pt: {
				text: [
					'Recorri ao Julien para um projeto de formação em DevOps, e a intervenção dele foi um êxito total. O Julien esteve perfeitamente à altura da missão.',
					'Graças à dupla experiência de programador e de especialista DevOps, soube transmitir competências avançadas com muita pedagogia e clareza. O profissionalismo, o domínio técnico e a capacidade de se adaptar às necessidades do projeto foram trunfos importantes. Recomendo vivamente o Julien a quem procure um especialista DevOps fiável, competente e excelente pedagogo. Muito obrigado pelo teu trabalho!',
				],
				approved: true,
			},
		},
	},
	{
		firstName: 'Guillaume',
		company: 'DADOUN PERE ET FILS',
		role: { fr: 'Lead développeur', en: 'Lead developer', pt: 'Programador principal' },
		text: [
			'Julien nous a beaucoup aidés sur nos sujets DevOps avec sérieux, efficacité et beaucoup de pédagogie.',
			'Il a tout de suite compris notre contexte, proposé des solutions adaptées, et nous a permis d’améliorer la stabilité et la fiabilité de notre plateforme. Les échanges ont toujours été simples, clairs et agréables.',
			'C’est quelqu’un de fiable, disponible et très compétent. Nous recommandons Julien sans hésitation, et retravaillerons avec lui avec plaisir.',
		],
		authorised: { fr: true, en: true, pt: true },
		translations: {
			en: {
				text: [
					'Julien helped us a great deal with our DevOps topics, with rigour, efficiency and a lot of teaching.',
					'He understood our context straight away, proposed suitable solutions, and enabled us to improve the stability and reliability of our platform. Our exchanges were always simple, clear and pleasant.',
					'He is reliable, available and highly skilled. We recommend Julien without hesitation, and will gladly work with him again.',
				],
				approved: false,
			},
			pt: {
				text: [
					'O Julien ajudou-nos muito nos nossos temas de DevOps, com seriedade, eficácia e muita pedagogia.',
					'Percebeu logo o nosso contexto, propôs soluções adaptadas e permitiu-nos melhorar a estabilidade e a fiabilidade da nossa plataforma. A comunicação foi sempre simples, clara e agradável.',
					'É alguém fiável, disponível e muito competente. Recomendamos o Julien sem hesitar e voltaremos a trabalhar com ele com todo o gosto.',
				],
				approved: true,
			},
		},
	},
];

/** A Testimonial as one language shows it. */
export interface ShownTestimonial {
	firstName: string;
	role: string;
	company: string;
	text: string[];
	/** Whether the text is a translation, which the page marks as such. */
	translated: boolean;
}

/** The Testimonials a language can show, in order. With none, the page leaves out the section. */
export function testimonialsIn(language: Language): ShownTestimonial[] {
	return TESTIMONIALS.flatMap(
		({ firstName, company, role, text, authorised, translations }): ShownTestimonial[] => {
			if (!authorised[language]) return [];
			const shown = { firstName, company, role: role[language] };
			if (language === 'fr') return [{ ...shown, text, translated: false }];
			const translation = translations[language];
			return translation.approved ? [{ ...shown, text: translation.text, translated: true }] : [];
		},
	);
}
