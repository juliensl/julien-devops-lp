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
		paraQuem: {
			titulo: 'Para quem é',
			perfil: [
				'Um SaaS web ou mobile, já lançado.',
				'A passar de dezenas ou centenas para milhares de utilizadores recorrentes.',
				'Uma equipa de normalmente 5 a 20 pessoas, com pelo menos 3 devs.',
			],
			aindaNaoLancado: 'O teu SaaS ainda não foi lançado? Podes marcar a Conversa na mesma.',
			tituloDasExclusoes: 'Não é para',
			exclusoes: [
				'Quem já tem pipeline de CI, aplicação contentorizada e infraestrutura com auto-scaling.',
				'O que não é web nem mobile.',
				'Quem recusa 100 a 500 €/mês de serviços e infraestrutura.',
				'O setor militar.',
			],
		},
		hojeEDepois: {
			titulo: 'Hoje, e depois.',
			tituloDeHoje: 'Hoje',
			hoje: [
				{
					titulo: 'Uma funcionalidade parte outra.',
					texto: 'A regressão passou a ser normal, e é o cliente que a descobre.',
				},
				{ titulo: 'Os devs fazem suporte.', texto: 'Respondem a tickets em vez de programar.' },
				{
					titulo: 'Os testes fazem-se à mão.',
					texto: 'Dias inteiros, por quem não tem essa função.',
				},
				{
					titulo: 'Ninguém sabe se aguenta.',
					texto: 'Funciona com os clientes de hoje. Com muitos mais, ninguém sabe dizer.',
				},
			],
			tituloDoQueJaTentaste: 'O que já tentaste',
			jaTentaste: [
				'Um DevOps freelance que só executa, sem trazer experiência.',
				'Testar à mão, ou pôr um estagiário a testar.',
				'Ferramentas de teste que os devs têm de correr no portátil, e que nunca correm.',
				'Pôr um dev a aprender DevOps: semanas perdidas, e um resultado fraco.',
				'Freelancers que programam cada um à sua maneira: cada saída leva o conhecimento.',
			],
			tituloDeDepois: 'Depois',
			depois: [
				'Os bugs são apanhados no pull request, não pelo cliente.',
				'Os devs recuperam os dias que passavam em suporte.',
				'A equipa cresce sem medo de que um júnior parta a produção.',
				'Acrescentas funcionalidades sem partir outras.',
				'A infraestrutura acompanha a carga, e vês os problemas antes dos clientes.',
			],
		},
		garantia: {
			etiqueta: 'A Garantia',
			titulo: 'Disponível pelo menos 99 % do tempo, em cada mês.',
			texto:
				'Em 30 dias, entrego a infraestrutura. Nos 3 meses seguintes, ela está disponível pelo menos 99 % do tempo em cada mês. Se não estiver, continuo a trabalhar sem faturar até chegar lá.',
			aplicaSe:
				'Aplica-se quando contratas os blocos 3 e 4 (e o 2, se a aplicação ainda não estiver contentorizada).',
			tituloDasCondicoes: 'Condições',
			condicoes: [
				'Um teste escrito para cada bug corrigido.',
				'Nenhum dev passa à frente de um teste a vermelho.',
				'Acesso de leitura ao repositório.',
				'Uma pessoa técnica que responde em 48 h.',
			],
			tituloDasExclusoes: 'Exclusões',
			exclusoes: ['Falhas do fornecedor cloud.', 'Alterações que não passaram pela pipeline.'],
			numero: '99 %',
			porBaixoDoNumero: 'do tempo, em cada mês',
			comServico: 'com serviço',
			semServico: 'no máximo 1 % sem serviço',
			nota: 'Nos 3 meses seguintes à entrega.',
		},
		quem: {
			titulo: 'Quem é o Julien',
			formaDeTrabalhar:
				'Trabalho à distância, em português, francês e inglês. Uso tecnologias standard, sem lock-in, e documento tudo para a tua equipa ficar autónoma.',
		},
		ctaFinal: {
			titulo: 'Nunca perdes a infraestrutura.',
			texto:
				'Mesmo que a tua equipa não avance logo com os testes, ficas com uma pipeline limpa, documentada e com os standards do mercado, pronta para quando decidires.',
			conversa: 'Conversa de 45 min por Google Meet, gratuita e sem compromisso.',
			avisoDaMarcacao:
				'A página de marcação está em francês, mas a Conversa pode ser em inglês ou em português.',
		},
	},
};

export type Dicionario = typeof pt;
