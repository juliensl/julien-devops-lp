// Tradução do português, a validar pela estagiária antes do Lançamento comercial (#75).
// A Designação é a validada pelo Julien.
import type { Dicionario } from './pt';

const promessa = 'In 30 days, I deliver the DevOps infrastructure you need to scale your SaaS.';

export const en: Dicionario = {
	designacao: 'Freelance DevOps consultant for SaaS',
	promessa,
	botaoMarcar: 'Book a conversation',
	cabecalho: {
		paginaPrincipal: 'home page',
		linguas: 'Language',
		menu: 'Menu',
	},
	paginaPrincipal: {
		descricao: `${promessa} For CTOs of growing SaaS companies.`,
		hero: {
			apoio:
				'Bugs get caught in the pull request, not by your customers. And your devs get back to coding instead of doing support.',
			nota: '45-min conversation on Google Meet, free of charge.',
		},
		paraQuem: {
			titulo: "Who it's for",
			perfil: [
				'A web or mobile SaaS, already launched.',
				'Growing from tens or hundreds to thousands of recurring users.',
				'A team of usually 5 to 20 people, with at least 3 devs.',
			],
			antesDoLancamento: "Haven't launched your SaaS yet? You can still book the conversation.",
			tituloDasExclusoes: 'Not for',
			exclusoes: [
				'Teams that already have a CI pipeline, a containerised application and auto-scaling infrastructure.',
				"Anything that isn't web or mobile.",
				'Teams that turn down €100 to €500 a month for services and infrastructure.',
				'The military sector.',
			],
		},
		hojeEDepois: {
			titulo: 'Today, and after.',
			tituloDeHoje: 'Today',
			hoje: [
				{
					titulo: 'One feature breaks another.',
					texto: "Regressions have become normal, and it's your customers who find them.",
				},
				{ titulo: 'Your devs do support.', texto: 'They answer tickets instead of coding.' },
				{
					titulo: 'Testing is done by hand.',
					texto: "Whole days of it, by people for whom it isn't the job.",
				},
				{
					titulo: 'Nobody knows if it will hold.',
					texto: "It works with today's customers. With many more, nobody can say.",
				},
			],
			tituloDoQueJaTentaste: "What you've already tried",
			jaTentaste: [
				'A DevOps freelancer who only executes, without bringing expertise.',
				'Testing by hand, or getting an intern to do it.',
				'Test tools that devs have to run locally, and never do.',
				'Asking a dev to learn DevOps: weeks lost, and a poor result.',
				'Freelancers who each code their own way: every departure takes the knowledge with it.',
			],
			tituloDeDepois: 'After',
			depois: [
				'Bugs get caught in the pull request, not by your customers.',
				'Your devs get back to coding instead of answering tickets.',
				'Your team grows without fear of a junior breaking production.',
				'You add features without breaking others.',
				'The infrastructure keeps up with the load, and you see problems before your customers do.',
			],
		},
		garantia: {
			etiqueta: 'The Guarantee',
			titulo: 'Available at least 99% of the time, every month.',
			texto:
				"In 30 days, I deliver the infrastructure. For the next 3 months, it is available at least 99% of the time every month. If it isn't, I keep working without billing until it is.",
			aplicaSe:
				"Applies when you take blocks 3 and 4 (and 2, if the application isn't containerised yet).",
			tituloDasCondicoes: 'Conditions',
			condicoes: [
				'A test written for every bug fixed.',
				'No dev pushes past a failing test.',
				'Read access to the repository.',
				'A technical contact who replies within 48 h.',
			],
			tituloDasExclusoes: 'Exclusions',
			exclusoes: ['Cloud provider outages.', "Changes that didn't go through the pipeline."],
			numero: '99%',
			porBaixoDoNumero: 'of the time, every month',
			comServico: 'in service',
			semServico: 'at most 1% out of service',
			nota: 'For the 3 months after delivery.',
		},
		quem: {
			titulo: 'Who is Julien',
			forma:
				'I work remotely, in Portuguese, French and English. I use standard technologies, with no lock-in, and document everything so your team can run on its own.',
		},
		ctaFinal: {
			titulo: 'You never lose the infrastructure.',
			texto:
				"Even if your team doesn't get to the tests right away, you keep a clean, documented pipeline built to market standards, ready for when you decide to go ahead.",
			conversa: '45-min conversation on Google Meet, free and with no commitment.',
			avisoDaMarcacao:
				'The booking page is in French, but the conversation can be in English or Portuguese.',
		},
	},
};
