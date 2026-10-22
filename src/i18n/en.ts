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
		ecologia: {
			etiqueta: 'Ecology',
			titulo: 'Infrastructure has a footprint too.',
			texto:
				'Where the application runs, how long and how efficiently change its environmental impact. The ecology page lets you estimate a workload depending on the country where it runs, keeping published data, assumptions and calculations apart.',
			ligacao: 'Open the ecology page',
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
	ecologia: {
		ligacao: 'Ecology',
		etiqueta: 'Ecology and infrastructure',
		descricao:
			'Estimate the energy and emissions of a workload depending on the country where it runs, with the method, sources and limits in plain sight.',
		titulo: 'Infrastructure choices have environmental consequences too.',
		introducao:
			'Where the application runs, how long it runs and how efficiently change the energy it uses and the emissions of the electricity behind it. Here you estimate a workload depending on the country where it runs, with the method and sources in plain sight.',
		selos: { publicado: 'Published', hipotese: 'Assumption', calculado: 'Calculated' },
		legenda: {
			nome: 'How to read the data on this page',
			publicado: 'value from a public database or study, with year and source',
			hipotese: 'assumption of the calculation, which you can change',
			calculado: 'result of the two above',
		},
		estimar: {
			etiqueta: '1 · Estimate a workload',
			titulo: 'The same application, in different places.',
			introducao:
				'Choose the country, the workload and the data centre efficiency. The calculation follows the open Cloud Carbon Footprint method: processor energy × data centre efficiency × carbon intensity of the electricity.',
			pais: 'Country where the infrastructure runs',
			vcpu: 'Virtual processors (vCPU)',
			utilizacao: 'Average utilisation',
			dicaUtilizacao: (valor: string) =>
				`${valor} is the Cloud Carbon Footprint value when utilisation is unknown`,
			horas: 'Hours per day',
			pue: 'Data centre efficiency (PUE)',
			dicaPue: (valor: string) =>
				`${valor} is the industry average in 2026 (Uptime Institute); your provider may give the one for the data centre you use`,
			kwh: 'kWh per month',
			kg: 'kg CO2e per month, location-based',
			pontos: { antes: 'Each dot is worth about', depois: 'kg CO2e.' },
			calculo: {
				resumo: 'See the calculation',
				dias: 'days',
				notaWatts: 'Cloud Carbon Footprint, unknown processor',
				cicloDeVida: 'life cycle',
			},
			paises: 'The same workload in each country',
		},
		metodo: {
			etiqueta: '2 · How it is calculated',
			titulo: 'One method, explained.',
			cartoes: [
				{
					titulo: 'Location-based',
					texto:
						'Uses the annual average of the electricity produced in the country. It does not count renewable energy contracts: that would be the market-based method, which is not shown here because it needs contract data we do not have.',
				},
				{
					titulo: 'Life cycle',
					texto:
						'The Ember intensity includes upstream emissions (building the power plants, extracting and transporting the fuel). That is why it is higher than counting only the direct emissions from combustion. The two types are never mixed on this page.',
				},
				{
					titulo: 'Processors only',
					texto:
						'The estimator counts the energy of the vCPUs and the data centre efficiency. Memory, storage, network and server manufacturing are left out, so the real value is higher.',
				},
			],
		},
		infraestrutura: {
			etiqueta: '3 · What infrastructure can change',
			titulo: 'More efficiency, more visibility.',
			cartoes: [
				{
					titulo: 'Match resources to the load',
					texto:
						'With scalable infrastructure (block 3), resources follow the load of the application.',
				},
				{
					titulo: 'See what is consumed',
					texto: 'Observability (block 4) gives visibility into resource usage and costs.',
				},
				{
					titulo: 'Choose with information',
					texto:
						'The carbon intensity of electricity changes from country to country, and the estimator shows by how much.',
				},
				{
					titulo: 'Hosting with a lower environmental impact',
					texto: 'When the needs and the budget allow it, it is one of the options I propose.',
				},
			],
		},
		fontes: {
			titulo: 'Sources and limits',
			ember: 'Ember, yearly electricity generation by country (carbon intensity, 2025), CSV file',
			ccf: 'Cloud Carbon Footprint, methodology',
			uptime: 'Uptime Institute, industry average PUE (2026 survey)',
			pesquisa: 'Research “What environmental data do cloud providers publish?” (16/10/2026)',
			limites: [
				'An illustrative estimate, not a measurement of your infrastructure.',
				'The watts per vCPU are the Cloud Carbon Footprint values for an unknown processor; the real server may use more or less.',
				'The intensity is an annual average for the country; the time of day changes the real value.',
			],
			limitePue: (pue: string, ponderado: string) =>
				`The PUE of ${pue} is the average per data centre; weighted by capacity, it is ${ponderado}. Large data centres, such as those of the cloud, usually have lower values.`,
			voltar: 'Back to the home page',
		},
	},
};
