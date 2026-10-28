// Os textos em português, a Língua de referência.
// O francês e o inglês são tipados a partir deste ficheiro: um texto em falta faz falhar o astro check.
// Os textos não levam HTML: as ligações, os negritos e os espaços inseparáveis montam-se nos componentes.

const promessa =
	'Em 30 dias, entrego-te a infraestrutura DevOps de que precisas para escalar o teu SaaS.';

type Etapa = { nome: string; frase: string };

export const pt = {
	designacao: 'Consultor DevOps freelance para SaaS',
	promessa,
	botaoMarcar: 'Marcar uma conversa',
	cabecalho: {
		/** Junta-se ao nome no logótipo, que leva à página principal. */
		destinoDoLogotipo: 'página principal',
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
		/** As 5 Etapas, pela ordem do glossário, cada uma com uma frase. Uma língua com menos de 5
		 * faz falhar o astro check. */
		etapas: {
			titulo: 'Cinco etapas, sempre pela mesma ordem.',
			etapas: [
				{ nome: 'Conversa', frase: '45 min por Google Meet, gratuita.' },
				{
					nome: 'Diagnóstico',
					frase:
						'Gratuito. 2 a 3 dias úteis depois de receber os acessos, ou 3 a 5 se incluir a cloud.',
				},
				{
					nome: 'Proposta de intervenção',
					frase: 'Que blocos, em que prazo e por que preço fixo.',
				},
				{ nome: 'Implementação', frase: 'No máximo 30 dias de calendário.' },
				{
					nome: 'Entrega e transferência',
					frase: 'Documentação e transferência para a equipa ficar autónoma.',
				},
			] satisfies [Etapa, Etapa, Etapa, Etapa, Etapa],
		},
	},
};

export type Dicionario = typeof pt;
