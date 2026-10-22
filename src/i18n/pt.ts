// Os textos em português, a Língua de referência.
// O francês e o inglês são tipados a partir deste ficheiro: um texto em falta faz falhar o astro check.
// Os textos não levam HTML: as ligações, os negritos e os espaços inseparáveis montam-se nos componentes.

const promessa =
	'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.';

export const pt = {
	designacao: 'Consultor DevOps freelance para SaaS',
	promessa,
	botaoMarcar: 'Marcar uma conversa',
	cabecalho: {
		/** Junta-se ao nome no logótipo, que leva à página principal. */
		paginaPrincipal: 'página principal',
		/** O nome do seletor de língua, para os leitores de ecrã. */
		linguas: 'Língua',
		/** O botão que abre o menu no telemóvel. */
		menu: 'Menu',
	},
	/** O botão fixo que pausa as animações automáticas: o nome diz o que um clique faz. */
	animacao: {
		pausar: 'Pausar animação',
		retomar: 'Retomar animação',
	},
	paginaPrincipal: {
		descricao: `${promessa} Para CTO de SaaS em crescimento.`,
		hero: {
			apoio:
				'Os bugs são apanhados no pull request, não pelo teu cliente. E os teus devs voltam a programar em vez de fazer suporte.',
			nota: 'Conversa de 45 min por Google Meet, gratuita.',
		},
	},
};

export type Dicionario = typeof pt;
