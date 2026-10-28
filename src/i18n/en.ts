// Translated from Portuguese, to be reviewed by the intern before the Commercial launch (#75).
// The Designation is the one Julien approved.
import type { Dictionary } from './pt';

const promise = 'In 30 days, I deliver the DevOps infrastructure you need to scale your SaaS.';

export const en: Dictionary = {
	designation: 'Freelance DevOps consultant for SaaS',
	promise,
	bookButton: 'Book a conversation',
	header: {
		logoTarget: 'home page',
		languages: 'Language',
		menu: 'Menu',
	},
	animation: {
		pause: 'Pause animation',
		resume: 'Resume animation',
	},
	homePage: {
		description: `${promise} For CTOs of growing SaaS companies.`,
		hero: {
			support:
				'Bugs get caught in the pull request, not by your customers. And your devs get back to coding instead of doing support.',
			note: '45-min conversation on Google Meet, free of charge.',
		},
		whoItsFor: {
			title: "Who it's for",
			profile: [
				'A web or mobile SaaS, already launched.',
				'Growing from tens or hundreds to thousands of recurring users.',
				'A team of usually 5 to 20 people, with at least 3 devs.',
			],
			notLaunchedYet: "Haven't launched your SaaS yet? You can still book the conversation.",
			exclusionsTitle: 'Not for',
			exclusions: [
				'Teams that already have a CI pipeline, a containerised application and auto-scaling infrastructure.',
				"Anything that isn't web or mobile.",
				'Teams that turn down €100 to €500 a month for services and infrastructure.',
				'The military sector.',
			],
		},
		todayAndAfter: {
			title: 'Today, and after.',
			todayTitle: 'Today',
			today: [
				{
					title: 'One feature breaks another.',
					text: "Regressions have become normal, and it's your customers who find them.",
				},
				{ title: 'Your devs do support.', text: 'They answer tickets instead of coding.' },
				{
					title: 'Testing is done by hand.',
					text: "Whole days of it, by people for whom it isn't the job.",
				},
				{
					title: 'Nobody knows if it will hold.',
					text: "It works with today's customers. With many more, nobody can say.",
				},
			],
			alreadyTriedTitle: "What you've already tried",
			alreadyTried: [
				'A DevOps freelancer who only executes, without bringing expertise.',
				'Testing by hand, or getting an intern to do it.',
				'Test tools that devs have to run locally, and never do.',
				'Asking a dev to learn DevOps: weeks lost, and a poor result.',
				'Freelancers who each code their own way: every departure takes the knowledge with it.',
			],
			afterTitle: 'After',
			after: [
				'Bugs get caught in the pull request, not by your customers.',
				'Your devs get back the days they spent on support.',
				'Your team grows without fear of a junior breaking production.',
				'You add features without breaking others.',
				'The infrastructure keeps up with the load, and you see problems before your customers do.',
			],
		},
		steps: {
			title: 'Five steps, always in the same order.',
			steps: [
				{ name: 'Conversation', sentence: '45 min on Google Meet, free of charge.' },
				{
					name: 'Diagnosis',
					sentence:
						'Free. 2 to 3 business days once access is granted, or 3 to 5 if it includes the cloud.',
				},
				{
					name: 'Intervention proposal',
					sentence: 'Which blocks, in what timeframe and at what fixed price.',
				},
				{ name: 'Implementation', sentence: 'At most 30 calendar days.' },
				{
					name: 'Delivery and handover',
					sentence: 'Documentation and handover, so the team can be self-sufficient.',
				},
			],
		},
		guarantee: {
			label: 'The Guarantee',
			title: 'Available at least 99% of the time, every month.',
			text: "In 30 days, I deliver the infrastructure. For the next 3 months, it is available at least 99% of the time every month. If it isn't, I keep working without billing until it is.",
			appliesWhen:
				"Applies when you take blocks 3 and 4 (and 2, if the application isn't containerised yet).",
			conditionsTitle: 'Conditions',
			conditions: [
				'A test written for every bug fixed.',
				'No dev pushes past a failing test.',
				'Read access to the repository.',
				'A technical contact who replies within 48 h.',
			],
			exclusionsTitle: 'Exclusions',
			exclusions: ['Cloud provider outages.', "Changes that didn't go through the pipeline."],
			number: '99%',
			belowNumber: 'of the time, every month',
			inService: 'in service',
			outOfService: 'at most 1% out of service',
			note: 'For the 3 months after delivery.',
		},
		about: {
			title: 'Who is Julien',
			wayOfWorking:
				'I work remotely, in Portuguese, French and English. I use standard technologies, with no lock-in, and document everything so your team can run on its own.',
		},
		finalCta: {
			title: 'You never lose the infrastructure.',
			text: "Even if your team doesn't get to the tests right away, you keep a clean, documented pipeline built to market standards, ready for when you decide to go ahead.",
			conversation: '45-min conversation on Google Meet, free and with no commitment.',
			bookingNotice:
				'The booking page is in French, but the conversation can be in English or Portuguese.',
		},
	},
};
