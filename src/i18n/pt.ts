// Os textos em português, a Língua de referência.
// O francês e o inglês são tipados a partir deste ficheiro: um texto em falta faz falhar o astro check.
// Os textos não levam HTML: as ligações, os negritos e os espaços inseparáveis montam-se nos componentes.

const promessa =
	'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.';

export const pt = {
	designacao: 'Consultor DevOps freelance para SaaS',
	promessa,
	botaoMarcar: 'Marcar uma conversa',
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
