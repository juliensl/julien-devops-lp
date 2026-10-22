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
			antesDoLancamento: 'O teu SaaS ainda não foi lançado? Podes marcar a Conversa na mesma.',
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
				'Os devs voltam a programar, em vez de responder a tickets.',
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
			forma:
				'Trabalho à distância, em português, francês e inglês. Uso tecnologias standard, sem lock-in, e documento tudo para a tua equipa ficar autónoma.',
		},
		ecologia: {
			etiqueta: 'Ecologia',
			titulo: 'A infraestrutura também tem pegada.',
			texto:
				'Onde a aplicação corre, quanto corre e com que eficiência mudam o impacto ambiental. A página de ecologia deixa-te estimar uma carga conforme o país onde corre, separando dados publicados, hipóteses e cálculos.',
			ligacao: 'Abrir a página de ecologia',
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
	ecologia: {
		/** A ligação 🍃 do cabeçalho, também no menu do telemóvel, e a do rodapé. */
		ligacao: 'Ecologia',
		/** O nome da página, na etiqueta por cima do título e no <title>. */
		etiqueta: 'Ecologia e infraestrutura',
		descricao:
			'Estima a energia e as emissões de uma carga conforme o país onde corre, com o método, as fontes e os limites à vista.',
		titulo: 'As escolhas de infraestrutura também têm consequências ambientais.',
		introducao:
			'Onde a aplicação corre, quanto tempo corre e com que eficiência mudam a energia que consome e as emissões da eletricidade que usa. Aqui estimas uma carga, conforme o país onde corre, com o método e as fontes à vista.',
		/** Os únicos selos da página, um em cada valor. */
		selos: { publicado: 'Publicado', hipotese: 'Hipótese', calculado: 'Calculado' },
		legenda: {
			nome: 'Como ler os dados desta página',
			publicado: 'valor de uma base de dados ou de um estudo públicos, com ano e fonte',
			hipotese: 'pressuposto do cálculo, que podes mudar',
			calculado: 'resultado dos dois anteriores',
		},
		estimar: {
			etiqueta: '1 · Estimar uma carga',
			titulo: 'A mesma aplicação, em sítios diferentes.',
			introducao:
				'Escolhe o país, a carga e a eficiência do centro de dados. O cálculo segue o método aberto do Cloud Carbon Footprint: energia dos processadores × eficiência do centro de dados × intensidade carbónica da eletricidade.',
			pais: 'País onde corre a infraestrutura',
			vcpu: 'Processadores virtuais (vCPU)',
			utilizacao: 'Utilização média',
			dicaUtilizacao: (valor: string) =>
				`${valor} é o valor do Cloud Carbon Footprint quando não se conhece a utilização`,
			horas: 'Horas por dia',
			pue: 'Eficiência do centro de dados (PUE)',
			dicaPue: (valor: string) =>
				`${valor} é a média do setor em 2026 (Uptime Institute); o fornecedor pode indicar o do centro que usas`,
			kwh: 'kWh por mês',
			kg: 'kg CO2e por mês, location-based',
			/** À volta do valor de cada ponto: «Cada ponto vale cerca de 0,1 kg CO2e.» */
			pontos: { antes: 'Cada ponto vale cerca de', depois: 'kg CO2e.' },
			calculo: {
				resumo: 'Ver o cálculo',
				dias: 'dias',
				notaWatts: 'Cloud Carbon Footprint, processador desconhecido',
				cicloDeVida: 'ciclo de vida',
			},
			paises: 'A mesma carga em cada país',
		},
		metodo: {
			etiqueta: '2 · Como se calcula',
			titulo: 'Um só método, explicado.',
			cartoes: [
				{
					titulo: 'Location-based',
					texto:
						'Usa a média anual da eletricidade produzida no país. Não conta contratos de energia renovável: isso seria o método market-based, que aqui não aparece porque precisa de dados contratuais que não temos.',
				},
				{
					titulo: 'Ciclo de vida',
					texto:
						'A intensidade da Ember inclui as emissões a montante (construção das centrais, extração e transporte do combustível). Por isso é mais alta do que contar só as emissões diretas da queima. Os dois tipos nunca se misturam nesta página.',
				},
				{
					titulo: 'Só os processadores',
					texto:
						'O estimador conta a energia dos vCPU e a eficiência do centro de dados. Memória, armazenamento, rede e fabrico dos servidores ficam de fora, por isso o valor real é maior.',
				},
			],
		},
		/** O título e os 4 cartões são os validados na #54. */
		infraestrutura: {
			etiqueta: '3 · O que a infraestrutura pode mudar',
			titulo: 'Mais eficiência, mais visibilidade.',
			cartoes: [
				{
					titulo: 'Ajustar os recursos à carga',
					texto:
						'Com a infraestrutura escalável (bloco 3), os recursos acompanham a carga da aplicação.',
				},
				{
					titulo: 'Ver o que se consome',
					texto:
						'A observabilidade (bloco 4) dá visibilidade sobre a utilização dos recursos e os custos.',
				},
				{
					titulo: 'Escolher com informação',
					texto:
						'A intensidade carbónica da eletricidade muda de país para país, e o estimador mostra quanto.',
				},
				{
					titulo: 'Alojamento com menor impacto ambiental',
					texto: 'Quando as necessidades e o orçamento o permitem, é uma das opções que proponho.',
				},
			],
		},
		fontes: {
			titulo: 'Fontes e limites',
			ember:
				'Ember, produção de eletricidade anual por país (intensidade carbónica, 2025), ficheiro CSV',
			ccf: 'Cloud Carbon Footprint, metodologia',
			uptime: 'Uptime Institute, PUE médio do setor (inquérito de 2026)',
			pesquisa: 'Pesquisa «Que dados ambientais publicam os fornecedores cloud?» (16/10/2026)',
			limites: [
				'Estimativa ilustrativa, não uma medição da tua infraestrutura.',
				'Os watts por vCPU são os do Cloud Carbon Footprint para um processador desconhecido; o servidor real pode consumir mais ou menos.',
				'A intensidade é uma média anual do país; a hora do dia muda o valor real.',
			],
			limitePue: (pue: string, ponderado: string) =>
				`O PUE de ${pue} é a média por centro de dados; ponderada pela capacidade, é ${ponderado}. Os centros grandes, como os da cloud, costumam ter valores mais baixos.`,
			voltar: 'Voltar à página principal',
		},
	},
};

export type Dicionario = typeof pt;
