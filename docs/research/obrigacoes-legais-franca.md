# Que obrigações legais tem o site de um auto-entrepreneur francês?

> Pesquisa do ticket [#28](https://github.com/juliensl/julien-devops-lp/issues/28) (mapa [#4](https://github.com/juliensl/julien-devops-lp/issues/4)). Substitui a premissa de [#13](https://github.com/juliensl/julien-devops-lp/issues/13), que partia de um freelancer estabelecido em Portugal. Fontes consultadas a **13/10/2026**.
> **Isto é pesquisa, não aconselhamento jurídico.** Resume o que dizem as fontes oficiais e assinala o que ficou por confirmar. Em caso de dúvida, o Julien deve confirmar com o contabilista ou com um advogado.
> Este documento **não decide**. As decisões ficam para os tickets seguintes, sobretudo "Que páginas legais criamos e com que conteúdo?" ([#23](https://github.com/juliensl/julien-devops-lp/issues/23)), validados pelo Julien. As estatísticas já foram decididas em [#14](https://github.com/juliensl/julien-devops-lp/issues/14).

## Pergunta

Que obrigações legais e de privacidade tem a landing page de Julien Laffont, auto-entrepreneur com a atividade registada em França, que vive em Portugal e só trabalha com empresas?

Contexto considerado:

- **Estatuto:** entrepreneur individuel (EI) em regime de micro-entrepreneur, com SIRET e um estabelecimento em Montpellier. No registo público francês, a sede ("siège") é **outro** estabelecimento, diferente do de Montpellier.
- **Residência:** vive em Portugal.
- **Clientes:** só empresas (CTO de SaaS). Mercado principal França; também Portugal e mercados de língua inglesa.
- **Página:** estática, em julienlaffont.com (francês, inglês e português), alojada no Hébergement Web da Infomaniak (Suíça). Não tem contas, loja, pagamentos nem formulários próprios.
- **Marcação da Conversa:** ligação simples para a Página de marcação do Calendly, sem incorporação nem JavaScript de terceiros.
- **Estatísticas:** decididas em [#14](https://github.com/juliensl/julien-devops-lp/issues/14) e validadas pelo Julien: só o painel "Statistiques" da Infomaniak, feito a partir dos logs do servidor, sem script nem cookies [R2]. Aqui só se confirma se isso dispensa consentimento e quais são as condições da CNIL para uma futura ferramenta no navegador.

**Fora do âmbito:** as consequências fiscais e de segurança social de viver em Portugal com uma micro-entreprise francesa (incluindo saber se o Julien precisa de número de IVA intracomunitário). Ficam para o contabilista. Os códigos NAF também não foram pesquisados.

## Resumo

- **Informação legal: obrigatória.** Desde 23/05/2024, a regra está no **art. 1-1 da LCEN**: a lei SREN tirou-a do antigo art. 6, III, sem mudar o essencial da lista [F1][F2]. Para uma pessoa singular: nome e apelido, "domicile", telefone, o diretor da publicação (o próprio Julien) e o nome, a morada e o telefone do alojamento [F1][F3]. Como a página promove serviços à distância, o **art. 19** soma o email, a morada onde está estabelecido e o número de IVA, se existir [F1]. Pena: até 1 ano de prisão e 75 000 € de multa [F1 art. 1-2].
- **Número de registo e menção "EI": dependem do registo.** Se a micro-entreprise estiver no **RCS** (atividade comercial), o site tem de mostrar o SIREN, "RCS" com a cidade do greffe, o lugar da sede e o nome com "EI" [F4 art. R123-237]. Se estiver só no **RNE** como atividade liberal, a LCEN não exige o número, mas mostrá-lo é boa prática. A menção "EI" continua exigida nos documentos profissionais [F4 art. R526-27][F15].
- **Morada: zona cinzenta.** Três textos usam três palavras: "domicile" (LCEN), "l'adresse où elle est établie" (art. 19) e "lieu de son siège social" (RCS). Lido à letra, o "domicile" de quem vive em Portugal é a casa em Portugal [F17]. Com a sede registada noutro estabelecimento, o mais simples é pôr o registo de acordo com a realidade. Não encontrei fonte oficial que diga se um endereço de domiciliação substitui o "domicile".
- **Política de privacidade: obrigatória na prática.** O que #13 concluiu sobre o RGPD mantém-se. Mudam a autoridade (CNIL) e a via de reclamação. A lei francesa acrescenta uma informação: o direito de deixar diretivas sobre os dados para depois da morte [F6 art. 48].
- **Estatísticas a partir dos logs (a decisão de #14): muito provavelmente sem consentimento.** Nada é lido nem escrito no navegador, e as diretrizes da CNIL tratam dessas operações [F7 § 9]. Mesmo na leitura mais exigente do EDPB, estatísticas agregadas só para o Julien devem caber na isenção da medição de audiência, se cumprirem as condições da secção 4 [F7][U3]. Continuam a exigir informação na política de privacidade [F10].
- **Para uma futura ferramenta no navegador, a CNIL dispensa o consentimento com condições estritas.** A ferramenta só pode servir o Julien, produzir estatísticas anónimas, não seguir a pessoa noutros sites e não cruzar nem passar dados a terceiros [F7][F8]. A CNIL **já não publica uma lista** de ferramentas: substituiu-a por uma auto-avaliação feita pelo fornecedor, com uma ferramenta de julho de 2025 [F9][F10]. O Google Analytics não cumpre [F11].
- **Obrigações só para consumidores não se aplicam a um B2B puro:** mediador de consumo, CGV no site, ligação à plataforma europeia de litígios [F5][F13][F14][U4]. Dizer na página que os serviços são só para profissionais é boa prática, mas não tem base legal.
- **Viver em Portugal: zona cinzenta real.** Para a Diretiva 2000/31, conta onde a atividade é **efetivamente exercida** numa instalação fixa, não onde está o registo [U1][F1 art. 14][P1 art. 4.º]. Se o Julien trabalha todos os dias a partir de casa em Portugal, pode estar estabelecido em Portugal. Então aplica-se o DL 7/2004 (com NIF) e volta a dúvida do Livro de Reclamações Eletrónico. Uma só Informação legal pode cumprir as duas leis, porque as listas não se contradizem.

## Tabela de obrigações

Legenda: **Obrigatório** · **Obrigatório se…** · **Zona cinzenta** (as fontes não respondem com clareza) · **Boa prática** · **Não se aplica**.

As linhas partem do princípio de que o Julien está estabelecido **em França**. As duas últimas linhas mostram o que muda se for considerado estabelecido em Portugal (ver secção 6).

| Obrigação | Aplica-se? | Condição | Fonte |
|---|---|---|---|
| Nome e apelido, "domicile" e telefone do editor | **Obrigatório** | Sempre: o Julien edita um serviço de comunicação em linha a título profissional | [F1] art. 1-1, I, 1.º |
| Nome do diretor da publicação (o próprio Julien) | **Obrigatório** | Sempre; numa pessoa singular, o diretor é ela própria | [F1] art. 1-1, I, 3.º; [F3] art. 93-2 |
| Nome, morada e telefone do alojamento (Infomaniak) | **Obrigatório** | Sempre | [F1] art. 1-1, I, 4.º; [V1][V2] |
| Email, morada onde está estabelecido e telefone, de acesso "facile, direct et permanent" | **Obrigatório** | A página promove serviços à distância ("communications commerciales") | [F1] arts. 14 e 19 |
| SIREN, "RCS" + cidade do greffe, lugar da sede e nome com "EI", no site | **Obrigatório se…** | Se a micro-entreprise estiver inscrita no RCS (atividade comercial) | [F4] art. R123-237; [F1] arts. 1-1 e 19 |
| SIREN ou SIRET | **Boa prática** | Se estiver só no RNE como atividade liberal: nem a LCEN nem o art. R123-237 o exigem | [F1] art. 1-1, I, 1.º; [F13] |
| Menção "EI" ou "entrepreneur individuel" junto ao nome | **Obrigatório** (no site: muito provável) | Exigida nos documentos e correspondências profissionais; o service-public inclui a publicidade | [F4] art. R526-27; [F15] |
| Número de IVA intracomunitário | **Obrigatório se…** | Só se o Julien tiver um. Saber se precisa é uma questão fiscal, fora do âmbito | [F1] art. 19, 4.º; [U1] art. 5.º, n.º 1, al. g) |
| Indicar se os preços incluem impostos | **Obrigatório se…** | Só se a página mostrar preços | [F1] art. 19 |
| Política de privacidade (art. 13.º do RGPD e diretivas para depois da morte) | **Obrigatório** (na prática) | Há dados pessoais: logs com IP, emails, marcações | [U2] art. 13.º; [F6] art. 48; [R1] |
| Contrato de subcontratação (DPA) com a Infomaniak e o Calendly | **Obrigatório** | Sempre que um fornecedor trata dados por conta do Julien | [U2] art. 28.º; [R1] |
| Registo das atividades de tratamento | **Obrigatório se…** | Se o tratamento não for ocasional | [U2] art. 30.º, n.º 5; [R1] |
| Consentimento prévio para cookies e outros rastreadores | **Obrigatório se…** | Só para rastreadores que não sejam estritamente necessários nem estejam isentos | [F6] art. 82; [F7] |
| Consentimento para estatísticas de visitas | **Obrigatório se…** | Se a ferramenta não cumprir as condições da CNIL (por exemplo, Google Analytics) | [F7] §§ 50–51; [F8][F9][F11] |
| Estatísticas a partir dos logs do servidor: precisam de consentimento? | **Zona cinzenta** (muito provavelmente não) | É a opção decidida em #14. Nada é lido nem escrito no navegador; se o EDPB as considerar abrangidas, a isenção da CNIL pode aplicar-se | [F7] § 9; [U3] §§ 42–43 e 54–56 |
| Informar sobre as estatísticas e permitir a oposição | **Obrigatório se…** | Se houver estatísticas que tratem dados pessoais, mesmo isentas de consentimento | [F8]; [F9] critério "opposition"; [F10] pergunta 10 |
| Mediador de consumo (contactos e ligação) | **Não se aplica** | Só para litígios com consumidores | [F5] arts. L611-1, L612-1 e L616-1; [F14] |
| CGV publicadas no site | **Não se aplica** | Obrigatórias no site só para clientes particulares; entre profissionais, basta enviá-las a pedido | [F13] |
| Ligação para a plataforma europeia de litígios em linha | **Não se aplica** | Revogada desde 20/07/2025; já era só para consumidores | [U4]; [R1] |
| Ato Europeu da Acessibilidade | **Não se aplica** | Só serviços a consumidores; microempresas que prestam serviços estão isentas | [U5]; [R1] |
| Textos em francês (lei Toubon) | **Não se aplica** | Não é obrigatório entre profissionais (a página tem francês de qualquer forma) | [F16] |
| Dizer que os serviços são só para empresas | **Boa prática** | Sugestão desta pesquisa: mostra a natureza B2B de que dependem as linhas acima | (sem fonte legal) |
| Identificação do DL 7/2004, com NIF | **Zona cinzenta** | Só se o Julien for considerado estabelecido em Portugal | [P1] arts. 4.º, 5.º e 10.º |
| Livro de Reclamações Eletrónico | **Zona cinzenta** | Só se for considerado estabelecido em Portugal; e mesmo aí fica a dúvida B2B de #13 | [P2][P3]; [R1] |

## Detalhes

### 1. Informação legal (LCEN, depois da lei SREN)

- **Que texto li.** O Légifrance recusou todos os pedidos automáticos (erro 403, página de verificação da Cloudflare), tanto com `curl` como com o WebFetch. Li a LCEN em versão consolidada nos **dados abertos LEGI da DILA**, a base oficial que alimenta o Légifrance: extração completa de 13/07/2025 mais as atualizações diárias até 12/10/2026 [F0]. Li também o texto definitivo da lei SREN adotado pela Assembleia Nacional [F2].
- **Os artigos mudaram de número.** A lei n.º 2024-449 (SREN), no art. 48, inseriu na LCEN os **arts. 1-1 e 1-2** [F1][F2]. Estão em vigor desde **23/05/2024** [F1]:
  - o antigo **art. 6, III, 1** (identificação do editor) passou a ser o **art. 1-1, I**;
  - a antiga pena do **art. 6, VI, 2** passou a ser o **art. 1-2**;
  - o art. 6 trata agora só dos fornecedores de serviços intermediários (acesso, alojamento…).
  - A lista de dados ficou igual. A única novidade é um 5.º sobre quem armazena dados tratados diretamente na edição do serviço.
  - Fontes que ainda citam o "art. 6, III" (por exemplo, a página do service-public, verificada em 2023 [F13]) estão desatualizadas na referência, não no conteúdo.
- **O que o art. 1-1, I, exige** a "Les personnes dont l'activité est d'éditer un service de communication au public en ligne", "dans un standard ouvert" (HTML serve) [F1]:
  - 1.º pessoa singular: "leurs nom, prénoms, domicile et numéro de téléphone". Só se estiverem inscritas no RCS, ou no RNE como empresa do setor dos ofícios e do artesanato, também "le numéro de leur inscription";
  - 3.º "Le nom du directeur ou du codirecteur de la publication". Pela lei de 1982, "Lorsque le service est fourni par une personne physique, le directeur de la publication est cette personne physique" [F3 art. 93-2]. Ou seja, o próprio Julien;
  - 4.º "Le nom, la dénomination ou la raison sociale, l'adresse et le numéro de téléphone du fournisseur de services d'hébergement";
  - 5.º "le cas échéant", quem armazena dados tratados diretamente na edição do serviço. Numa página estática, deve ser só a Infomaniak. Com uma ligação simples, o Calendly não parece fazer parte da edição da página, mas não encontrei orientação oficial sobre este ponto novo.
  - O anonimato do n.º II é só para quem edita "à titre non professionnel". Não é o caso do Julien.
- **Dados do alojamento** (a confirmar pelo Julien quando contratar):
  - Infomaniak Network SA, Rue Eugène Marziano 25, 1227 Les Acacias (GE), Suíça [V1];
  - telefone +41 22 820 35 41 (escrito "+41 228 20 35 41"): só o encontrei nos dados estruturados da página inicial da Infomaniak [V2]. A página de informação legal da Infomaniak não mostra telefone [V1].
- **Pena** (art. 1-2): "un an d'emprisonnement et 75 000 euros d'amende" para a pessoa singular que não cumpra os n.os I e II do art. 1-1 [F1]. A France Num fala em até 375 000 € [F16]. Esse valor deve corresponder às pessoas coletivas, para as quais o art. 1-2 remete para o art. 131-38 do Código Penal, que não li.
- **Comércio eletrónico (arts. 14 e 19).**
  - Âmbito: o art. 14 inclui serviços que consistem em "fournir des informations en ligne, des communications commerciales", "y compris lorsqu'ils ne sont pas rémunérés par ceux qui les reçoivent" [F1]. Uma landing page que promove serviços entra aqui.
  - O art. 19 exige um "accès facile, direct et permanent utilisant un standard ouvert" a [F1]:
    - 1.º nome e apelido;
    - 2.º "L'adresse où elle est établie, son adresse de courrier électronique, ainsi que des coordonnées téléphoniques permettant d'entrer effectivement en contact avec elle";
    - 3.º se inscrita no RCS ou no "répertoire des métiers": número de inscrição, capital social e morada da sede;
    - 4.º número individual de IVA, se o tiver;
    - 5.º e 6.º autorização administrativa ou profissão regulamentada (à partida, não é o caso da consultoria DevOps);
    - se mostrar um preço, "notamment si les taxes et les frais de livraison sont inclus".
  - O art. 19 não tem pena própria. As infrações são investigadas pelos agentes da DGCCRF [F1].
  - **Versão em vigor.** A versão de 2016 continua em vigor a 13/10/2026. A ordonnance n.º 2025-1247 muda só a referência do 4.º: o número de IVA passa a ser o atribuído "en application de l'article L. 215-27 du code des impositions sur les biens et services", em vez do art. 286 ter do Código Geral dos Impostos. Nos dados LEGI, a entrada em vigor desta alteração passou de 1/09/2026 para **1/01/2027**. O conteúdo para o Julien não muda [F0][F1].
- **Código de Comércio, se a inscrição for no RCS.** O art. R123-237 diz: "Toute personne immatriculée indique en outre sur son site internet la mention RCS suivie du nom de la ville où se trouve le greffe" [F4]. Também o SIREN (1.º), o "lieu de son siège social" (3.º) e, para um EI, o nome "précédé ou suivi immédiatement des mots : « entrepreneur individuel » ou des initiales : « EI »" (9.º, acrescentado pelo decreto 2022-725). A infração é uma contravenção de 4.ª classe [F4].
- **Menção "EI" (lei 2022-172).** O estatuto único do EI está no art. L526-22 do Código de Comércio, criado pela lei 2022-172 e alterado em 2024 [F4]. O art. R526-27, criado pelo decreto 2022-725, obriga o EI a usar uma denominação com o seu nome "précédé ou suivi immédiatement des mots : « entrepreneur individuel » ou des initiales : « EI »", e essa denominação "figure sur les documents et correspondances à usage professionnel" [F4]. O service-public resume: "La dénomination doit être indiquée sur tous vos documents professionnels : facture, commande, publicité, correspondance" [F15]. Na página: "Julien Laffont EI" ou "Julien Laffont, entrepreneur individuel".
- **Guias oficiais.**
  - Service-public (verificado a 31/07/2023, antes da SREN): nome, apelido e morada, com "EI"; número RCS; email e telefone; número de IVA; dados do alojamento; pena "d'1 an d'emprisonnement et 75 000 € d'amende" [F13]. Não menciona o diretor da publicação.
  - France Num (atualizada a 25/07/2025): para um EI, "Nom et prénom", "Adresse du domicile", "Numéro de téléphone et adresse mail" e os dados do alojamento [F16]. Só pede o diretor da publicação a sites com "activités éditoriales". O art. 1-1 não faz essa distinção, por isso o mais seguro é indicá-lo.
  - A página da DGCCRF em economie.gouv.fr também bloqueia pedidos automáticos (Cloudflare). Não a li.

### 2. Que morada mostrar?

- **Cada texto usa uma palavra diferente:**
  - LCEN, art. 1-1: "domicile" da pessoa singular [F1];
  - LCEN, art. 19: "l'adresse où elle est établie" [F1];
  - Código de Comércio, art. R123-237 (só se RCS): "le lieu de son siège social" [F4];
  - Diretiva 2000/31: "Endereço geográfico em que o prestador se encontra estabelecido" [U1 art. 5.º, n.º 1, al. b)].
- **"Domicile" no direito civil francês.** "Le domicile de tout Français, quant à l'exercice de ses droits civils, est au lieu où il a son principal établissement" [F17 art. 102]. Para quem vive em Portugal, o "domicile" assim entendido é a casa em Portugal. A LCEN não define a palavra, por isso não é certo que remeta para este sentido civil. Mas uma leitura à letra do art. 1-1 aponta para a morada onde o Julien vive, não para a morada da empresa.
- **Sede registada ≠ Montpellier.** O registo mostra a sede noutro estabelecimento. Consequências:
  - se a inscrição for no RCS, o site tem de mostrar o lugar da sede **registada** [F4 art. R123-237, 3.º]. Mostrar só Montpellier não cumpre;
  - para o art. 19, Montpellier serve se for mesmo o sítio onde o Julien está estabelecido [F1];
  - a página e o registo não se devem contradizer. A forma mais simples é atualizar o registo com o contabilista, para que a sede e os estabelecimentos correspondam à realidade. Esta pesquisa não verificou o procedimento.
- **Domiciliação em vez da morada de casa.**
  - O Código de Comércio permite a quem se inscreve no RCS (ou no RNE como artesão) declarar como morada da empresa a casa ou "des locaux occupés en commun par plusieurs entreprises", ou seja, uma empresa de domiciliação [F4 art. L123-10]. Não confirmei a regra equivalente para atividades liberais inscritas só no RNE.
  - Para o art. 19, conta a morada onde está estabelecido. Para o art. R123-237, conta a sede registada, que pode ser uma morada de domiciliação [F4 art. L123-10].
  - Para o "domicile" do art. 1-1, não encontrei nenhuma fonte oficial que aceite uma morada de domiciliação. A France Num escreve "Adresse du domicile" [F16]; o service-public escreve só "adresse" [F13]. Fica como **zona cinzenta**.

### 3. Política de privacidade (com a CNIL)

- **O que se mantém de #13** [R1]: há dados pessoais mesmo numa página estática (logs com IP, emails, marcações); o Julien é responsável pelo tratamento; a Infomaniak e o Calendly são subcontratantes e precisam de DPA; a informação do art. 13.º do RGPD tem de estar na política de privacidade; a Suíça tem decisão de adequação e o Calendly declara a certificação no Data Privacy Framework; o caso Fashion ID torna o Julien corresponsável por conteúdos de terceiros incorporados (com uma ligação simples, não há).
- **O que muda face à versão portuguesa:**
  - **Autoridade.** Com estabelecimento em França, a autoridade é a CNIL. A lei francesa aplica-se aos tratamentos "effectués dans le cadre des activités d'un établissement d'un responsable du traitement […] sur le territoire français" [F6 art. 3]. Atenção à secção 6: se o Julien for considerado estabelecido em Portugal, a autoridade principal pode ser a CNPD.
  - **Reclamação.** A CNIL recebe queixas em linha em <https://www.cnil.fr/fr/plaintes> [F12]. O RGPD deixa qualquer pessoa reclamar "en particulier dans l'État membre dans lequel se trouve sa résidence habituelle, son lieu de travail ou le lieu où la violation aurait été commise" [U2 art. 77.º]. Por isso, a política pode nomear a CNIL e lembrar esse direito.
  - **Menção francesa a mais.** A pessoa tem de ser informada "du droit de définir des directives relatives au sort de ses données à caractère personnel après sa mort" [F6 art. 48; art. 85]. Não existe na versão portuguesa de #13.
- **O que o service-public lista** [F13]: identidade e contactos do responsável; finalidade; base legal; caráter obrigatório ou facultativo; destinatários; prazo de conservação; direitos; "Droit de l'internaute d'introduire une réclamation auprès de la Cnil"; transferências para fora da UE. Acrescenta que "L'absence de l'une de ces informations est punie d'une amende de 1 500 €", sem citar o artigo exato.
- **Sanções da CNIL.** Advertência, ordem de conformidade e multa até 10 milhões de euros ou 2 % do volume de negócios; 20 milhões ou 4 % nos casos do art. 83.º, n.os 5 e 6, do RGPD [F6 art. 20, IV].

### 4. Cookies e estatísticas: a isenção da CNIL

- **Regra** (Lei "Informatique et Libertés", art. 82). Ler ou escrever informação no equipamento do Visitante exige consentimento. Exceções: quando a operação "a pour finalité exclusive de permettre ou faciliter la communication par voie électronique", ou "est strictement nécessaire à la fourniture d'un service de communication en ligne à la demande expresse de l'utilisateur" [F6]. Vale mesmo que a informação não seja dado pessoal [F7 § 14][F10 pergunta 8].
- **A medição de audiência pode caber na segunda exceção.** A CNIL considera estes rastreadores "strictement nécessaires au fonctionnement et aux opérations d'administration courante d'un site web ou d'une application" [F7 § 50]. Condições [F7 § 51][F8][F10 pergunta 9]:
  - finalidade "strictement limitée à la seule mesure de l'audience du site […] pour le compte exclusif de l'éditeur" (desempenho, problemas de navegação, ergonomia, capacidade dos servidores, conteúdos consultados);
  - "servir à produire des données statistiques anonymes uniquement";
  - não permitir "le suivi global de la navigation de la personne" noutros sites ou aplicações. Fica excluído qualquer identificador comum a vários sites;
  - não "conduire à un recoupement des données avec d'autres traitements" nem passar dados não anónimos a terceiros.
- **Recomendações** (não condições) [F8]: informar os Visitantes, por exemplo na política de privacidade; cookies com vida máxima de 13 meses, sem prolongamento automático; dados guardados no máximo 25 meses; rever estes prazos periodicamente.
- **Critérios práticos** da ferramenta de auto-avaliação da CNIL (julho de 2025) [F9]. As medidas técnicas são recomendações; o fornecedor pode provar alternativas:
  - só finalidades de medição de audiência; tudo o que for marketing ou coortes desativado por defeito;
  - no máximo três tipos de eventos: presença numa página, uso de uma funcionalidade (clique), tempos de carregamento, deslocação ou permanência;
  - cabeçalhos HTTP minimizados (por exemplo, só a versão principal do navegador);
  - o fornecedor é subcontratante, com DPA; não junta dados de vários clientes; não reutiliza dados para si "quelle que soit la finalité";
  - sem importação de dados externos: nada de identificadores de cliente, UTM ou identificadores de campanha nos URL; o "referrer" fica só pelo domínio;
  - cookie, se houver, "first-party";
  - IP usado só para localizar à escala da cidade e depois truncado, "en enlevant au moins le dernier octet";
  - "fingerprinting" só com uma componente própria do site e uma componente temporal;
  - relatórios só com estatísticas anónimas, por exemplo arredondadas à dezena; sem "session replay";
  - oposição possível através de um botão ou ligação na política de privacidade, guardada com um cookie de oposição.
- **Já não há lista oficial de ferramentas.** "La CNIL a remplacé son programme d'évaluation des solutions de mesure d'audience, qui conduisait au recensement des solutions retenues sur son site web, par la mise à disposition d'un outil d'auto-évaluation" [F10 pergunta 12]. O fornecedor pode dizer "D'après notre auto-évaluation, la solution XXX est conforme aux critères établis par la CNIL", mas não pode apresentá-la como "certifiée" ou "validée par la CNIL" [F8]. Quem escolhe deve pedir ao fornecedor esse documento e as instruções de configuração [F8]. A responsabilidade continua a ser do Julien em caso de controlo [F8].
- **Google Analytics fica de fora.** A CNIL lembra que as ofertas cujos fornecedores reutilizam os dados para si não cabem na isenção, e cita o Google Analytics [F11].
- **Estatísticas "sem cookies" (JavaScript).** Um script que manda o navegador enviar informação está abrangido pelo art. 82, com ou sem cookies [U3 § 33]. Não precisa de consentimento se cumprir as condições acima [F9].
- **Estatísticas a partir dos logs do servidor (sem nada no navegador).** É a opção decidida em #14: o painel "Statistiques" da Infomaniak conta visitas, páginas, países e domínios de origem a partir dos logs [R2].
  - As diretrizes da CNIL aplicam-se a operações de leitura ou escrita no equipamento do Visitante [F7 § 9]. Um log regista o pedido que o navegador faz de qualquer forma para ver a página.
  - O EDPB admite que usar o IP ou os cabeçalhos HTTP para seguir a navegação pode cair no art. 5.º, n.º 3, da Diretiva ePrivacy [U3 §§ 42–43 e 54–55]. Também lembra que estar abrangido "does not systematically mean that consent needs to be collected" [U3 § 56].
  - Conclusão: mesmo na leitura mais exigente, estatísticas de logs que cumpram as condições da CNIL ficam isentas. Não encontrei uma posição expressa da CNIL sobre logs.
  - Em qualquer caso, os logs são dados pessoais: aplica-se o RGPD (informação e direito de oposição) [F10 pergunta 10]. A Infomaniak guarda os logs "for at least 7 days" [R1].
- **Ligação simples para o Calendly.** A página não lê nem escreve nada no navegador. Os cookies que o Calendly use ficam no domínio dele.
- **Pode mudar.** O "Digital Omnibus" da UE, que propõe mexer nas regras dos cookies, estava a 13/10/2026 em "Awaiting committee decision" no Parlamento Europeu [U6].

### 5. Obrigações só para consumidores

- **Quem é consumidor.** "Consommateur : toute personne physique qui agit à des fins qui n'entrent pas dans le cadre de son activité commerciale, industrielle, artisanale, libérale ou agricole" [F5 art. liminaire]. Um "professionnel" inclui quem age "au nom ou pour le compte d'un autre professionnel" [F5]. Um CTO que contrata para o seu SaaS não é consumidor.
- **Mediador de consumo: não se aplica.**
  - Os litígios abrangidos são sempre "entre un consommateur et un professionnel" [F5 art. L611-1]. O dever de informar sobre o mediador é para com o consumidor: "Tout professionnel communique au consommateur […] les coordonnées du ou des médiateurs compétents" [F5 art. L616-1].
  - O service-public lista expressamente "Litige entre professionnels" entre os casos fora da mediação [F14].
  - Para comparação: a falta desta informação, quando se aplica, dá multa até 3 000 € a uma pessoa singular [F5 art. L641-1].
- **CGV:** são obrigatórias no site só para clientes particulares. "Entre professionnels, les CGV sont facultatives mais doivent pouvoir être communiquées sur simple demande" [F13]. Não é uma obrigação da página.
- **Uma armadilha pequena** (fora da página): o art. L221-3 estende algumas regras de consumo a contratos "hors établissement" com profissionais de até 5 trabalhadores, quando o contrato está fora da atividade principal do cliente [F5]. "Hors établissement" quer dizer, em resumo, contratos fechados com as duas partes fisicamente presentes fora do local habitual do Julien, ou logo a seguir a esse encontro [F5 art. L221-1]. Um contrato fechado à distância, depois de uma Conversa por vídeo, não parece abrangido. Fica para o contabilista ou advogado, se o Julien fechar contratos presencialmente com startups muito pequenas.
- **Plataforma europeia de litígios e Ato Europeu da Acessibilidade:** não se aplicam, pelas razões de #13 [R1][U4][U5].
- **"Services réservés aux professionnels".** Não encontrei nenhuma obrigação de o dizer. É útil como prova de que a oferta se dirige a empresas. Mas a proteção de consumidor depende de quem contrata, não do aviso: se o Julien aceitar um particular, as regras de consumo aplicam-se a esse contrato.
- **Língua.** O francês não é obrigatório entre profissionais (lei Toubon e circular de 1996, segundo a France Num) [F16].

### 6. Viver em Portugal: onde está estabelecido?

- **O critério é factual, não o registo.**
  - Diretiva 2000/31: "Prestador de serviços estabelecido": "o prestador que efectivamente exerça uma actividade económica através de uma instalação fixa, por um período indefinido" [U1 art. 2.º, al. c)]. O local de estabelecimento é "o local em que essa sociedade desenvolve a sua actividade económica", não onde está a tecnologia; se houver vários, conta "o centro das suas actividades relacionadas com esse serviço específico" [U1 cons. 19].
  - LCEN: uma pessoa está estabelecida em França "lorsqu'elle s'y est installée d'une manière stable et durable pour exercer effectivement son activité" [F1 art. 14].
  - DL 7/2004: considera-se estabelecido em Portugal quem "exerça uma actividade económica no país mediante um estabelecimento efectivo […] seja qual for a localização da sua sede"; com vários locais, conta o "centro das suas actividades" [P1 art. 4.º, n.os 2 e 3].
  - O RGPD usa um critério parecido: "L'établissement suppose l'exercice effectif et réel d'une activité au moyen d'un dispositif stable" [U2 cons. 22].
- **Aplicado ao Julien.** O registo francês é um indício, não a resposta. Se ele trabalha de forma estável a partir de casa em Portugal e não usa o estabelecimento de Montpellier, os critérios apontam para Portugal. Se trabalha mesmo em Montpellier parte do tempo, pode ter dois estabelecimentos, e conta o centro da atividade. Não encontrei jurisprudência sobre um empresário individual registado num país que trabalha a partir de casa noutro. É uma **zona cinzenta real**.
- **Se estiver estabelecido em França** (o pressuposto da tabela):
  - aplica-se a lei francesa a todo o serviço, também para os CTO portugueses [U1 art. 3.º][F1 art. 17];
  - Portugal aplica a um prestador estabelecido noutro Estado-Membro a lei desse Estado "à identificação" [P1 art. 5.º, n.º 1, al. a)]. O art. 10.º do DL 7/2004 não se aplica;
  - Livro de Reclamações Eletrónico: a Relação de Coimbra decidiu em 2025 que uma empresa neerlandesa "sem qualquer presença física ou jurídica em Portugal" não tem de o disponibilizar [P3]. O Julien tem presença física em Portugal, por isso o acórdão não resolve o caso dele.
- **Se estiver estabelecido em Portugal:**
  - aplica-se o art. 10.º do DL 7/2004: nome, endereço geográfico do estabelecimento, email, registos públicos (aqui, o registo francês) e NIF, com coima de 2 500 € a 50 000 € [P1][R1];
  - volta a dúvida do Livro de Reclamações Eletrónico (a lei não exclui os prestadores B2B) [P2][R1];
  - a autoridade de proteção de dados principal pode ser a CNPD. Para um responsável estabelecido em vários Estados-Membros, o estabelecimento principal é, em regra, "le lieu de son administration centrale dans l'Union" [U2 art. 4.º, ponto 16, al. a); cons. 36]. A CNPD exige consentimento para analítica [R1], por isso a isenção da CNIL deixa de proteger.
- **Uma só Informação legal pode servir as duas leis.** As listas francesa e portuguesa somam-se sem se contradizer. Mostrar mais dados do que uma lei pede não é proibido. Uma versão que cobre os dois cenários teria:
  - nome com "EI"; telefone; email; diretor da publicação; dados do alojamento;
  - SIREN ou SIRET (e "RCS" + cidade, se for o caso) e número de IVA, se existir;
  - NIF português;
  - morada: a registada em França e, se ele quiser cobrir o "domicile" e o "endereço geográfico" à letra, também a morada em Portugal.
  - O ponto sensível é a morada de casa. As duas leis, lidas à letra, podem pedi-la. É uma decisão do Julien, depois de falar com o contabilista.
- **Fora do âmbito:** as consequências fiscais e de segurança social de viver em Portugal com uma micro-entreprise francesa. São provavelmente mais importantes do que a página, mas não foram pesquisadas.

### 7. Fora do âmbito (não investigado)

- **Mercados de língua inglesa** (Reino Unido, EUA): não investigados. A Irlanda é UE e fica coberta pelo princípio do país de origem.
- **Promessas e garantias do pitch:** podem estar sujeitas às regras sobre práticas comerciais enganosas. O mapa já prevê que o Julien as valide.
- **Contratos com clientes** (CGV B2B, cláusulas): não são obrigações da página.

## Implicações para a decisão

Esta secção não decide. Mostra o que cada decisão futura implica.

- **"Que páginas legais criamos e com que conteúdo?" ([#23](https://github.com/juliensl/julien-devops-lp/issues/23)).**
  - A **Informação legal** precisa de, no mínimo (cenário França): nome com "EI", morada (ver secção 2), telefone, email, diretor da publicação (Julien Laffont) e nome, morada e telefone da Infomaniak. Se a inscrição for no RCS: SIREN, "RCS" + cidade do greffe e lugar da sede. Número de IVA, se existir.
  - Acesso "facile, direct et permanent": uma ligação no rodapé de todas as páginas cumpre.
  - A **Política de privacidade** muda face a #13: CNIL como autoridade, ligação para a queixa em linha e a frase sobre as diretivas para depois da morte. Pode mencionar também o direito de reclamar no país de residência.
  - Para cobrir o cenário Portugal, somam-se o NIF e, se o Julien quiser, a ligação ao Livro de Reclamações Eletrónico.
  - Tudo nas três línguas do Lançamento comercial. O francês não é obrigatório entre profissionais, mas o site já o tem.
- **Estatísticas ([#14](https://github.com/juliensl/julien-devops-lp/issues/14), já decidido: painel da Infomaniak a partir dos logs).**
  - **Com a decisão tomada:** sem aviso de cookies na leitura da CNIL; continua a ser a opção de menor risco também no cenário Portugal. A Política de privacidade deve falar dos logs e das estatísticas (finalidade, prazo, Infomaniak como subcontratante) e dizer como se opor, por exemplo por email.
  - **Se mais tarde se passar a uma ferramenta no navegador, sem cookies ou com cookie próprio, configurada segundo a CNIL** (IP truncado, sem UTM, referrer só com o domínio, sem partilha, DPA): sem aviso de cookies em França. É preciso pedir ao fornecedor a auto-avaliação da CNIL; segundo [R2], só a Matomo a publica. No cenário Portugal, a CNPD pede consentimento [R1].
  - **Google Analytics ou equivalente:** aviso de cookies e consentimento obrigatórios.
- **Marcação (ticket #10):** a ligação simples para o Calendly continua a ser a opção sem cookies na página. O DPA do Calendly continua necessário [R1].

**Informação que o Julien tem de fornecer ou confirmar:**

- **Registo:**
  - se a micro-entreprise está no RCS (atividade comercial) ou só no RNE (atividade liberal) e, se RCS, a cidade do greffe;
  - SIREN, SIRET e qual é o estabelecimento "siège";
  - se quer atualizar o registo para que a sede corresponda à morada real.
- **Morada:** que morada aceita publicar, sabendo que a LCEN fala em "domicile".
- **Onde trabalha de facto:** Portugal, Montpellier ou os dois, e desde quando. É a base da questão do estabelecimento; deve ser vista com o contabilista ou um advogado.
- **Identificadores:** NIF português; número de IVA intracomunitário, se tiver.
- **Contactos:** telefone profissional e email de contacto.
- **Clientes:** confirmação de que só contrata com empresas e de que aceita dizê-lo na página.
- **Alojamento:** confirmação dos dados da Infomaniak (sobretudo o telefone) quando contratar.

## O que não consegui confirmar

- **Se um endereço de domiciliação satisfaz o "domicile"** do art. 1-1 da LCEN. Não há texto oficial que o diga.
- **Se a inscrição do Julien é no RCS ou só no RNE.** Muda a lista de dados (ver tabela). É um facto a pedir ao Julien.
- **Onde o Julien está estabelecido** para efeitos da Diretiva 2000/31 e do RGPD. Não encontrei decisão sobre um empresário individual registado num Estado que trabalha a partir de casa noutro.
- **Se a CNIL aceita expressamente estatísticas de logs sem consentimento.** A conclusão "muito provavelmente sim" é um raciocínio a partir das diretrizes da CNIL e do EDPB.
- **Se o painel "Statistiques" da Infomaniak cumpre todas as condições da CNIL** (por exemplo, se a Infomaniak não reutiliza os dados para si). Não foi verificado aqui.
- **Se o Livro de Reclamações Eletrónico se aplica** a um EI registado em França que vive em Portugal. O acórdão de 2025 trata de uma empresa sem presença em Portugal.
- **Montantes exatos** da contravenção de 4.ª classe do art. R123-237 e da multa de 1 500 € citada pelo service-public: não li o Código Penal francês.
- **Telefone da Infomaniak:** só nos dados estruturados da página inicial.
- **A página da DGCCRF** (economie.gouv.fr) e o **Légifrance**: bloqueados a pedidos automáticos. O conteúdo legal foi lido nos dados abertos LEGI.
- **Regra de domiciliação** para atividades liberais inscritas só no RNE.

## Como foi feita a pesquisa

- **Légifrance:** tentei `curl` e WebFetch; ambos receberam 403 (verificação da Cloudflare).
- **Texto legal francês:** li-o nos dados abertos LEGI da DILA [F0], que é o mesmo conteúdo do Légifrance:
  - extração completa de 13/07/2025;
  - atualizações diárias de 13/07/2025 a 12/10/2026, verificadas para a LCEN, a Lei "Informatique et Libertés", o Código de Comércio e o Código do Consumo;
  - o Código Civil e a lei de 1982 foram lidos só na extração de 13/07/2025 (são artigos estáveis, mas não verifiquei alterações posteriores).
- **Lei SREN:** texto definitivo da Assembleia Nacional (n.º 286, 10/04/2024), em PDF [F2].
- **Service-public:** o domínio passou de entreprendre.service-public.fr para entreprendre.service-public.gouv.fr; li as páginas no novo domínio.
- **CNIL:** páginas e PDF lidos diretamente.
- **economie.gouv.fr (DGCCRF):** bloqueado; não lido.
- **EUR-Lex:** bloqueado. A Diretiva 2000/31 foi lida em português através do serviço Cellar do Serviço das Publicações da UE. Os considerandos 22 e 36 e os arts. 4.º e 77.º do RGPD foram lidos em francês na cópia da CNIL. As outras fontes europeias vêm de #13 e não foram relidas.
- **curia.europa.eu:** aplicação JavaScript; não lida.
- **Portugal:** DL 7/2004 no PDF oficial do Diário da República; acórdão da Relação de Coimbra na base oficial dgsi.pt.

## Fontes

**França**

- [F0] DILA, dados abertos LEGI (base do Légifrance): extração completa `Freemium_legi_global_20250713-140000` e atualizações diárias até `LEGI_20261012-212534`: <https://echanges.dila.gouv.fr/OPENDATA/LEGI/>
- [F1] Loi n.º 2004-575 (LCEN), arts. 1-1 e 1-2 (em vigor desde 23/05/2024), 14, 17, 19 (versão de 2016, em vigor; nova versão da ordonnance n.º 2025-1247, art. 43, prevista para 1/01/2027) e 20, versões consolidadas lidas em [F0]. Légifrance (**não lido**: bloqueado): <https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164>
- [F2] Loi n.º 2024-449 (SREN), texto definitivo da Assembleia Nacional n.º 286 de 10/04/2024, art. 48 (pp. 75–77): <https://www.assemblee-nationale.fr/dyn/16/textes/l16t0286_texte-adopte-provisoire.pdf>
- [F3] Loi n.º 82-652 (comunicação audiovisual), art. 93-2, lido em [F0] (extração de 13/07/2025)
- [F4] Código de Comércio, arts. L123-10, L526-22, R123-237 e R526-27, lidos em [F0]
- [F5] Código do Consumo, art. liminaire e arts. L221-1, L221-3, L611-1, L612-1, L616-1 e L641-1, lidos em [F0]
- [F6] Loi n.º 78-17 ("Informatique et Libertés"), arts. 3, 20, 48, 82 e 85, lidos em [F0]
- [F7] CNIL, Délibération n.º 2020-091 de 17/09/2020 (lignes directrices "cookies et autres traceurs"), §§ 9, 14 e 47–52: <https://www.cnil.fr/sites/default/files/atoms/files/lignes_directrices_de_la_cnil_sur_les_cookies_et_autres_traceurs.pdf>
- [F8] CNIL, "Cookies : solutions pour les outils de mesure d'audience" (4/07/2025): <https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience>
- [F9] CNIL, "Outil d'auto-évaluation relatif à la mise en œuvre d'une solution de mesure d'audience exemptée de consentement" (julho de 2025): <https://www.cnil.fr/sites/default/files/2025-07/outil_d_auto-evaluation_mesure_d_audience.pdf>
- [F10] CNIL, "Questions-réponses sur les lignes directrices modificatives et la recommandation « cookies et autres traceurs »" (29/04/2026), perguntas 8 a 12: <https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ>
- [F11] CNIL, "Mesurer la fréquentation de vos sites web et de vos applications" (27/01/2020): <https://www.cnil.fr/fr/mesurer-la-frequentation-de-vos-sites-web-et-de-vos-applications>
- [F12] CNIL, "Plaintes en ligne": <https://www.cnil.fr/fr/plaintes>
- [F13] Service-public Entreprendre, "Mentions obligatoires sur le site internet d'un entrepreneur individuel" (verificado a 31/07/2023): <https://entreprendre.service-public.gouv.fr/vosdroits/F31228>
- [F14] Service-public Entreprendre, "Médiation des litiges de la consommation" (verificado a 27/10/2023): <https://entreprendre.service-public.gouv.fr/vosdroits/F33338>
- [F15] Service-public Entreprendre, "Choisir et protéger la dénomination de votre entreprise individuelle (dont micro-entreprise)" (verificado a 7/09/2023): <https://entreprendre.service-public.gouv.fr/vosdroits/F23283>
- [F16] France Num (Ministério da Economia), "Quelles sont les mentions légales pour un site internet professionnel ?" (atualizada a 25/07/2025): <https://www.francenum.gouv.fr/guides-et-conseils/developpement-commercial/site-web/quelles-sont-les-mentions-legales-pour-un-site>
- [F17] Código Civil francês, art. 102, lido em [F0] (extração de 13/07/2025)

**Portugal**

- [P1] Decreto-Lei n.º 7/2004 (comércio eletrónico), arts. 4.º, 5.º e 10.º. Texto original, DR I-A n.º 5, 7/01/2004: <https://files.dre.pt/1s/2004/01/005a00/00700078.pdf>
- [P2] Decreto-Lei n.º 156/2005 (livro de reclamações), na redação do DL 74/2017. Analisado em [R1]; não relido.
- [P3] Tribunal da Relação de Coimbra, acórdão de 25/02/2025, processo 1939/22.8T8CBR.C1: <https://www.dgsi.pt/jtrc.nsf/8fe0e606d8f56b22802576c0005637dc/f9fdddee720221f480258c4a00339075?OpenDocument>

**União Europeia**

- [U1] Diretiva 2000/31/CE (comércio eletrónico), considerandos 19 e 22; arts. 2.º, als. c) e h), 3.º e 5.º. Lida através do Cellar: <http://publications.europa.eu/resource/cellar/b244164f-dd29-48e9-9063-a86ef4ea7ad9.0009.01/DOC_1>. EUR-Lex: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32000L0031>
- [U2] Regulamento (UE) 2016/679 (RGPD), considerandos 22 e 36 e arts. 4.º (ponto 16), 13.º, 28.º, 30.º e 77.º: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679>. Os considerandos 22 e 36 e os arts. 4.º, ponto 16, e 77.º foram lidos em francês na cópia da CNIL: <https://www.cnil.fr/fr/reglement-europeen-protection-donnees>. Os outros artigos vêm de #13 e não foram relidos.
- [U3] EDPB, Guidelines 2/2023 on Technical Scope of Art. 5(3) of ePrivacy Directive, versão 2.0 de 7/10/2024, §§ 32–34, 42–43 e 54–56: <https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf>
- [U4] Regulamento (UE) 2024/3228 (fim da plataforma europeia de resolução de litígios em linha). Analisado em [R1]: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32024R3228>
- [U5] Diretiva (UE) 2019/882 (Ato Europeu da Acessibilidade). Analisada em [R1]: <https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32019L0882>
- [U6] Parlamento Europeu, Observatório Legislativo, procedimento 2025/0360(COD) ("Digital Omnibus"): <https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025/0360(COD)>

**Fornecedores**

- [V1] Infomaniak, "Legal information": <https://www.infomaniak.com/en/legal/legal-notice>
- [V2] Infomaniak, página inicial (dados estruturados com o telefone): <https://www.infomaniak.com/en>

**Pesquisas anteriores**

- [R1] Pesquisa de #13, "Que obrigações legais e de privacidade tem o site?" (premissa de estabelecimento em Portugal). Reaproveitada para o RGPD, os DPA, as transferências, o caso Fashion ID, os logs da Infomaniak, o Livro de Reclamações, a plataforma ODR, o Ato Europeu da Acessibilidade e a posição da CNPD: <https://github.com/juliensl/julien-devops-lp/blob/research/obrigacoes-legais/docs/research/obrigacoes-legais.md>
- [R2] Pesquisa de #14, "Medimos as visitas? Com que ferramenta?" (ferramentas, painel "Statistiques" da Infomaniak, auto-avaliações CNIL publicadas): <https://github.com/juliensl/julien-devops-lp/blob/research/estatisticas-visitas/docs/research/estatisticas-visitas.md>
