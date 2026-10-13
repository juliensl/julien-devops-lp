# Que pesquisas fazem os CTO no Google quando têm estes problemas?

> Pesquisa do ticket [«Que pesquisas fazem os CTO no Google quando têm estes problemas?»](https://github.com/juliensl/julien-devops-lp/issues/31) (mapa [«Mapa: spec da landing page e da pipeline»](https://github.com/juliensl/julien-devops-lp/issues/4)). Fontes consultadas a **13/10/2026**.
> **Este documento não tem volumes de pesquisa.** Nenhuma fonte grátis e sem conta dá números absolutos. Os sinais usados são indiretos: as sugestões do Google, os índices relativos do Google Trends e os sites que aparecem nos resultados.
> Este documento **não decide**. A escolha dos termos, e de onde entram na página, fica para [«Para que pesquisas otimizamos a página?»](https://github.com/juliensl/julien-devops-lp/issues/32).

## Pergunta

Que termos escrevem no Google, em francês, inglês e português, os CTO de SaaS em crescimento quando procuram ajuda externa para regressões, instabilidade, manutenção difícil ou limites de desempenho e escala? Para quais deles uma única landing page pode realisticamente aparecer?

Contexto considerado:

- uma landing page com três URLs: francês em `/` (Língua por defeito), inglês em `/en/` e português em `/pt/`;
- objetivo: levar um CTO a marcar uma Conversa;
- o Julien espera que os CTO cheguem pelo Google;
- a página fica com `noindex` até ao Lançamento comercial (decidido em [«Que metas de acessibilidade, desempenho e SEO definimos?»](https://github.com/juliensl/julien-devops-lp/issues/15));
- temas do pitch: estabilização, CI/CD, cloud, IaC, fiabilidade, desempenho, observabilidade, segurança, custos e escalabilidade;
- conteúdo extra para SEO (artigos, páginas por serviço) está fora do âmbito do mapa.

## Resumo

- **Não há volumes.** As sugestões do Google provam que uma pesquisa existe, mas não dizem quantas vezes é feita [G1]. O Google Trends dá índices relativos de 0 a 100, e os termos com pouco volume aparecem como 0 [G2]. Números reais só com o Keyword Planner, que exige uma conta Google Ads com dados de faturação [G3], ou com o Search Console depois do Lançamento comercial [G5].
- **Os termos de serviço com procura visível são, sobretudo, de quem procura trabalho.**
  - "freelance devops", "consultant devops", "devops consultant" e "engenheiro devops" completam-se com "salaire", "TJM", "job", "salary" e "vagas" [A1].
  - Nos resultados aparecem Indeed, LinkedIn Jobs, Free-Work, Malt, Upwork, Toptal e ESN a recrutar [B1].
  - Em França, "ingénieur devops" tem 7 a 8 vezes o interesse de "freelance devops" [T1].
- **As frases de quem compra quase não têm procura mensurável.**
  - "prestataire devops", "trouver un freelance devops", "contratar devops" e "consultoria devops" dão 0 a 4 sugestões, muitas só com um país acrescentado [A1].
  - No Trends, em Portugal, "consultor devops", "consultoria devops", "freelance devops" e "devops freelancer" ficam a 0 nos 93 meses de 2019 a 2026 [T1].
  - Em França, "consultant devops" fica a 0 em 89 dos 93 meses [T1].
- **Os termos de problema têm mais procura, mas são informativos.**
  - "scalabilité", "dette technique", "pipeline ci/cd", "regression testing" e "testes de regressão" completam-se com "définition", "c'est quoi", "meaning", "o que é" e "outils" [A1].
  - Os resultados são guias de fornecedores (GitLab, Red Hat, AWS), a Wikipédia e blogues [B1].
  - As dores do pitch, escritas como um CTO as diria ("comment éviter les régressions", "scaler son saas", "application instable", "preciso de devops"), não têm sugestões ou só têm sugestões fora do tema [A1].
- **O inglês tem a procura de compra mais clara, mas também a concorrência mais forte.** Nos EUA, "devops consulting" tem dados em 86 dos 93 meses. As pesquisas relacionadas são "devops consulting services" e "devops consulting company" [T1]. Os resultados são agências, listas "top 10 companies" e plataformas (Upwork, Toptal, Arc) [B1][B2].
- **Para uma página nova e sem links, o realista é pouco:**
  - o nome do Julien (há homónimos; o LinkedIn dele já aparece) [B2];
  - combinações de nicho, com pouca procura e menos concorrência: "freelance devops SaaS", "devops pour startup", "devops for SaaS", "fractional devops" [A1][B1][B2].
  - Os termos genéricos de serviço e de problema estão ocupados por sites de emprego, plataformas, agências e guias.

## Como ler os dados

- **Sugestões do Google** [A1].
  - A Google diz que as previsões "reflect real searches that have been done on Google" e que dependem da língua e do local de onde vem a pesquisa [G1].
  - Diz também que o autocomplete "doesn't simply display the most common queries on a given topic" [G1].
  - Leitura usada aqui: uma sugestão prova que a pesquisa existe. Zero sugestões indica pouca procura, mas não o prova. O número de sugestões (0 a 10) **não é um volume**.
- **Google Trends** [T1][T2].
  - "Each data point is divided by the total searches of the geography and time range it represents"; depois, a escala vai de 0 a 100 [G2].
  - "search terms with low volume appear as "0"" [G2].
  - Os valores só se comparam **dentro da mesma comparação**. Numa comparação entre países, o índice mede a parte das pesquisas de cada país, não o tamanho absoluto.
  - Nas tabelas abaixo: média mensal de janeiro de 2019 a setembro de 2026 (93 meses), e quantos meses ficaram a 0.
- **Quem aparece** [B1][B2].
  - A página de resultados do Google não abre sem JavaScript.
  - Usei o Brave Search, que tem índice próprio, com o país definido por cookie.
  - Mostra que tipo de sites competem em cada termo. **Não** mostra a posição no Google.

## Termos por língua

### Francês

Sugestões com `hl=fr&gl=fr` [A1]; Trends em França [T1]; resultados do Brave com país França [B1][B2].

**Das dores do pitch às pesquisas**

O pitch descreve o que o CTO vive. Testei como essas dores se escrevem no Google.

| O que o CTO vive (pitch) | Pesquisa testada | O que o Google sugere [A1] |
|---|---|---|
| "Une fonctionnalité en casse une autre" | régression; tests de non régression; comment éviter les régressions | "régression": sono dos bebés, regressão linear. "tests de non régression": "automatisés", "définition", "outil". "comment éviter les régressions": só "sur excel" |
| "Le testing se fait à la main" | automatiser les tests; tests automatisés | 0 sugestões; "tests automatisés": "outils", "selenium", "playwright", "ia" |
| "L'application n'est pas stable" | application instable; instabilité | nenhuma sugestão nova; "instabilité": emocional, rótula, ombro |
| "je suis incapable de dire si ça tient à 5 000" | montée en charge; test de montée en charge; tenir la charge; scaler son saas | definições; "jmeter", "outils"; "tenir la charge batterie"; 0 sugestões |
| Infraestrutura e custos | réduire facture cloud; réduire coût aws | "cloudflare", "free", "cloud gaming"; "iam" |
| Sem pipeline | pipeline ci/cd; mise en place ci cd | "c'est quoi", "gitlab", "exemple"; "mise en place de pipelines ci/cd" |

**Termos por intenção**

| Grupo | Termos testados | O que o Google completa [A1] | Quem aparece (Brave, França) | Intenção dominante |
|---|---|---|---|---|
| Serviço, genérico | freelance devops; devops freelance; consultant devops; expert devops; mission devops; tjm devops | 10 sugestões cada: "job", "full remote", "junior", "salaire", "tjm", "mission", "c'est quoi", "openclassroom" | Free-Work, Indeed, LinkedIn Jobs, Malt, Freelance-Informatique, Reddit. Para "consultant devops": Indeed, Alten, escolas e ESN a recrutar | Trabalho e missões |
| Serviço, compra | prestataire devops; agence devops; accompagnement devops; devops externalisé; infogérance devops; audit devops | 1 a 4 sugestões, várias só com um país ou cidade acrescentados. "audit devops" tem 10, mas sobre o Azure DevOps ("azure devops audit logs") | Diretórios (Sortlist, La Fabrique du Net) e agências (Bearstech, Eleven Labs, Axopen, Webnet, Synapsys) | Compra, mas de agência |
| Contratação | trouver un freelance devops; recruter un devops freelance; embaucher un devops; besoin d'un devops; consultant devops pour; prix freelance devops; combien coûte un devops | 0 a 4 sugestões, quase todas "en france", "au portugal" ou "en suisse" | Não testado | Compra; procura quase invisível |
| Nicho SaaS, startup, CTO | devops startup; devops saas; devops pour startup; freelance devops saas; cto freelance; cto à temps partagé | "devops startup" e "devops saas" completam em inglês ("companies in bangalore", "ideas", "tools"). "devops pour startup": 2 sugestões. "cto à temps partagé": só "en france" | "freelance devops saas": LeHibou, Codeur, Freelance-Informatique e um freelancer de desenvolvimento SaaS. "cto à temps partagé": pequenas empresas e independentes (Now Code, Hones, AquilApp, Etayage) | Compra; pouca procura |
| Problema | tests de non régression; pipeline ci/cd; dette technique; scalabilité; montée en charge; observabilité; haute disponibilité; conteneurisation | 10 sugestões: "définition", "c'est quoi", "exemple", "outils", "en anglais" | Guias: GitLab, Red Hat, Splunk, AWS, Wikipédia, blogues. Empresas de testes: All4Test, Mr Suricate, Stardust | Informativa |
| Termos ambíguos | régression; instabilité; monitoring; supervision; scaler; application lente; site lent | sono dos bebés, medicina, gravidez, peixe, lentes de contacto | Não testado | Fora do tema |
| Tecnologia | consultant kubernetes; freelance kubernetes; terraform freelance; consultant terraform; freelance docker; consultant gitlab; consultant aws; consultant cloud | 3 a 10 sugestões: "jobs", "salaire", "mission". "consultant terraform" completa com "terraforming mars" | Free-Work, Upwork, Toptal, Malt, Indeed. Para Kubernetes, também especialistas (Enix, Sokube, Kiowy) | Trabalho e especialistas |
| Local | freelance devops paris / lyon / bordeaux / nantes / toulouse; consultant devops paris; freelance devops portugal | 1 a 3 sugestões, sobretudo "+ france". "freelance devops portugal": 0 | "freelance devops lyon": página de cidade da Malt em 1.º, depois sites de emprego. "freelance devops portugal": Freelancer, Truelancer, Upwork, Malt | Mista |

**Google Trends em França** (janeiro de 2019 a setembro de 2026) [T1]

| Comparação | Termo: média (meses a 0, em 93) |
|---|---|
| Serviço | ingénieur devops: 45 (9) · freelance devops: 6 (74) · devops freelance: 6 (73) · consultant devops: 1 (89) · expert devops: 1 (89) |
| Serviço e tecnologia | consultant cloud: 22 (27) · freelance devops: 5 (74) · freelance aws: 2 (87) · consultant kubernetes: 0 (92) · cto freelance: 0 (92) |
| Problema | scalabilité: 54 (0) · dette technique: 16 (13) · pipeline ci/cd: 10 (39) · observabilité: 7 (52) · tests de non régression: 1 (89) |
| Problema e serviço | conteneurisation: 42 (10) · intégration continue: 21 (32) · pipeline ci/cd: 18 (39) · montée en charge: 13 (47) · freelance devops: 5 (74) |

- "conteneurisation" e "montée en charge" também cobrem sentidos fora da informática (transporte marítimo, desporto). "scalabilité" é geral.
- O Trends não devolve pesquisas relacionadas para "freelance devops" nem para "consultant devops": não há dados suficientes [T1].
- Para "devops" sozinho, as pesquisas relacionadas são quase todas sobre o produto Azure DevOps, da Microsoft ("devops azure", "azure devops pipeline") [T1]. A palavra sozinha é ambígua.
- Na passagem semanal de 5 anos, "freelance devops", "consultant devops" e "expert devops" ficaram a 0 em 259 das 262 semanas [T2].

### Inglês

Sugestões com `hl=en&gl=us` e `hl=en&gl=gb` (quase iguais entre si) [A1]; Trends nos EUA e no Reino Unido [T1]; resultados do Brave com país EUA e Reino Unido [B1][B2].

**Termos por intenção**

| Grupo | Termos testados | O que o Google completa [A1] | Quem aparece (Brave, EUA ou RU) | Intenção dominante |
|---|---|---|---|---|
| Serviço, genérico | devops consultant; devops freelancer; freelance devops; devops contractor | 10 sugestões: "salary", "jobs", "job description", "vs devops engineer", "hourly rate", "reddit", "india" | EUA: Indeed, ZipRecruiter, LinkedIn Jobs, Reddit, BCG, MeteorOps. RU: Reddit, Indeed, CWJobs, CGI, consultoras britânicas e um freelancer (ver «Concorrência») | Trabalho, com alguma compra |
| Serviço, compra | devops consulting; devops consulting services; devops consultancy; hire devops; hire devops freelancer; outsource devops; devops as a service; devops services | 5 a 10 sugestões: "services in india / usa", "company", "companies", "near me", "pricing" | Upwork, Toptal, Arc, Freelancer, Codementor; agências (Devico, Vention, Chilliapple, Intersys); diretórios (Sortlist, GoodFirms) | Compra; muito disputada |
| Contratação | how to hire a devops engineer; hire devops consultant; devops consultant rates / cost / hourly rate; need devops help; devops consultant for small business; ci/cd consultant | 3 a 10 sugestões: "devops consultant for hire", "devops support for startups", "ci cd consulting services". Muitas acabam num país | "hire devops freelancer": Upwork, Toptal, Arc, Freelancer, Codementor | Compra |
| Nicho SaaS, startup, CTO | devops for startups; devops for saas; fractional devops; fractional cto; part time devops; devops retainer | "devops services for startups", "devops for saas applications", "fractional cto services / rates / hourly rate", "part time devops jobs" | "fractional devops": fractionaldevops.io, OPS23, Centroid, AWS Marketplace, LinkedIn, Reddit. "devops consulting for startups" e "devops consultant for saas": agências e listas "top 10" | Compra (fractional) e mista |
| Problema | ci/cd pipeline; regression testing; flaky tests; slow ci pipeline; technical debt; scaling saas; load testing; observability; reduce aws costs; reduce aws bill; cloud cost optimization | "meaning", "example", "tools", "vs". Também "why is my aws bill so high" e "cloud cost optimization services / companies" | "how to set up ci/cd for a startup": Medium, dev.to, JetBrains, blogues de agências. "reduce aws costs startup": AWS e blogues | Informativa |
| Termos ambíguos | how to prevent regressions; app keeps crashing; downtime; monitoring; how to scale | sono, LASIK, iPhone, um filme, peixe | Não testado | Fora do tema |
| Tecnologia | kubernetes consultant; kubernetes consulting; terraform consultant; docker consultant; gitlab ci consultant; github actions consultant; aws devops consultant | "jobs", "salary", "certification", "services", "companies" | Consultoras especializadas (MeteorOps, InfraCloud, CloudRaft, Softjourn), ZipRecruiter, LinkedIn Jobs | Compra e trabalho |
| Local | devops consultant london / uk / europe / portugal / lisbon / near me; devops contractor london | 2 a 7 sugestões, quase só "salary" e "jobs". "near me" completa com cidades portuguesas (efeito do IP) | "portugal" e "lisbon": GoodFirms, Bell Integration, sites de emprego | Trabalho |

**Google Trends** (janeiro de 2019 a setembro de 2026) [T1]

| Comparação | Termo: média (meses a 0, em 93) |
|---|---|
| EUA, serviço | devops consulting: 19 (7) · fractional cto: 15 (44) · devops consultant: 5 (45) · freelance devops: 2 (78) · devops freelancer: 0 (92) |
| EUA, serviço e tecnologia | aws consultant: 19 (0) · devops consultant: 4 (46) · devops as a service: 4 (38) · kubernetes consultant: 2 (82) · fractional devops: 0 (90) |
| EUA, problema | observability: 12 (0) · regression testing: 6 (0) · technical debt: 4 (0) · ci/cd pipeline: 2 (0) · cloud cost optimization: 1 (65) |
| Reino Unido, serviço | fractional cto: 15 (67) · devops consultant: 5 (82) · freelance devops: 1 (90) · devops contractor: 1 (91) · devops consultancy: 0 (92) |

- Pesquisas relacionadas com "devops consulting" (EUA): "devops consulting services" (100), "devops consulting company" (48), "cloud devops consulting" (37), "devops consulting companies" (36), "azure devops consulting" (36) [T1].
- Pesquisas relacionadas com "devops consultant" (EUA e Reino Unido): "devops consultant jobs" (100) e "devops consultant certification" (17 a 18) [T1].

### Português

Sugestões com `hl=pt-PT&gl=pt` e, para contraste, `hl=pt-BR&gl=br` [A1]; Trends em Portugal [T1]; resultados do Brave com país Portugal [B1][B2].

**Termos por intenção**

| Grupo | Termos testados | O que o Google completa [A1] | Quem aparece (Brave, Portugal) | Intenção dominante |
|---|---|---|---|---|
| Serviço, genérico | consultor devops; engenheiro devops; freelancer devops; devops freelancer; freelance devops | "consultor devops": só "salario", "portugal" e "emprego". "freelancer devops" e "devops freelancer": 10 sugestões, todas em inglês ("jobs", "india", "stundensatz"). "engenheiro devops": "salário", "o que faz", "vagas", "curso" | "consultor devops": Innowise (página em português de uma grande empresa), Syone (empresa portuguesa), Reddit traduzido, Tokio School, ofertas de emprego. "devops freelancer": Reddit, Freelancer.pt, Workana, Upwork, Toptal | Trabalho |
| Serviço, compra | consultoria devops; empresa devops; serviços devops; outsourcing devops; consultoria aws; consultoria kubernetes | 1 a 4 sugestões, várias só com "portugal" ou uma cidade acrescentados. "outsourcing devops" completa em inglês | Innowise, Syone, Knowmad mood, Softtek, ITDS, GoodFirms. Para AWS: Darede, Deloitte, AWS | Compra; pouca procura |
| Contratação | contratar devops; contratar engenheiro devops; como contratar devops; encontrar devops; preciso de devops; preço consultor devops | 0 a 3 sugestões, quase só "em portugal" | Não testado | Compra; procura quase invisível |
| Nicho | devops para startups; cto part time; cto freelancer; escalar saas | "devops para startups portugal"; "cto part time portugal"; "escalar saas em portugal" | "cto part time portugal": ofertas de emprego e salários | Mista |
| Problema | testes de regressão; testes automatizados; pipeline ci/cd; integração contínua; dívida técnica; escalabilidade; testes de carga; observabilidade; alta disponibilidade | 8 a 10 sugestões: "o que é", "significado", "ferramentas", "exemplos"; muitas em português do Brasil | Guias: Wikipédia, IBM, AWS, GitLab, DevMedia; muitos do Brasil | Informativa |
| Problema dito por um CTO | como evitar regressões; aplicação lenta; bugs em produção; reduzir custos cloud; reduzir custos aws; como escalar | 0 a 3 sugestões, fora do tema. "como escalar" completa com peixe e cabelo | Não testado | Fora do tema |
| Local | devops portugal; devops lisboa; devops porto; devops remoto | "salário", "jobs", "meetup", "porto alegre", "vagas … remoto" | Indeed, LinkedIn Jobs, Glassdoor, ITJobs, Teamlyzer, Meetup | Trabalho e comunidade |

**Português de Portugal e do Brasil.** O vocabulário diverge [A1]:

- "monitorização" (PT) completa com pressão arterial; "monitoramento" é a forma do Brasil.
- "contentorização" (PT) dá 3 sugestões; "conteinerização" (BR) dá 9.
- Para "consultor devops" e "consultoria devops", o Brasil também só dá 2 sugestões cada, e uma delas acaba em "portugal".

**Google Trends em Portugal** (janeiro de 2019 a setembro de 2026) [T1]

| Comparação | Termo: média (meses a 0, em 93) |
|---|---|
| Serviço | devops: 36 (0) · freelance devops: 0 (93) · consultor devops: 0 (93) · devops freelancer: 0 (93) · consultoria devops: 0 (93) |
| Língua e tecnologia | kubernetes: 50 (0) · devops portugal: 1 (79) · devops consultant: 0 (93) · freelance devops: 0 (93) · consultor devops: 0 (93) |
| Problema | escalabilidade: 4 (86) · pipeline ci/cd: 2 (90) · testes de regressão: 1 (91) · dívida técnica: 0 (93) · observabilidade: 0 (93) |

- Como em França, as pesquisas relacionadas com "devops" são sobretudo sobre o Azure DevOps [T1].
- Nenhum termo de serviço, em português ou em inglês, sai do 0 em Portugal.

### Comparação entre países

Mesmo termo, ou equivalente, em países diferentes [T1]. O índice mede a parte das pesquisas de cada país, não o volume absoluto [G2].

| Termo e país | Média (meses a 0, em 93) |
|---|---|
| "freelance devops" | França: 14 (74) · EUA: 3 (78) · Reino Unido: 2 (90) · Portugal: 0 (93) |
| "devops consultant" e equivalentes | "devops consultant", EUA: 10 (45) · "devops consultant", Reino Unido: 8 (82) · "consultant devops", França: 3 (89) · "consultor devops", Portugal: 0 (93) · "devops consultant", Portugal: 0 (93) |

- Em França, o termo inglês "freelance devops" é proporcionalmente mais pesquisado do que nos EUA e no Reino Unido. As sugestões e os resultados mostram que é, sobretudo, procura de missões [A1][B1].
- Em Portugal, nenhuma forma tem dados.

## Concorrência: quem aparece hoje

Resultados do Brave, não do Google [B1][B2]. Para "freelance devops" em França, o DuckDuckGo deu o mesmo padrão antes de bloquear: Free-Work, Freelance-Informatique, Upwork, Malt, LinkedIn, Freelancer.com e um agregador de missões [D1].

| Tipo de site | Exemplos | Onde domina |
|---|---|---|
| Sites de emprego e de missões | Indeed, LinkedIn Jobs, Free-Work, Freelance-Informatique, Glassdoor, ZipRecruiter, CWJobs, ITJobs | serviço genérico, tecnologia, local |
| Plataformas de freelancers | Malt, Upwork, Toptal, Arc, Freelancer, Codementor, Workana, LeHibou | "freelance devops", "hire devops freelancer", "freelance terraform", cidades francesas (Malt) |
| Agências, ESN e consultoras | FR: Eleven Labs, Bearstech, Axopen, Webnet, Synapsys. EN: MeteorOps, InfraCloud, Devico, Vention, Chilliapple. PT: Innowise, Syone, Knowmad mood | "prestataire / agence / audit devops", "devops consulting", "kubernetes / terraform consultant", "consultoria devops" |
| Diretórios e listas | Sortlist, La Fabrique du Net, GoodFirms, Techreviewer, DesignRush | "agence devops", "devops consultant europe / portugal", "devops consultant for saas" |
| Guias e conteúdo | GitLab, Red Hat, AWS, Splunk, Wikipédia, Medium, dev.to, Reddit | termos de problema |
| Independentes | freelancedevopsconsultant.co.uk, scalastic.io, now-code.fr, hones.fr | frases exatas e nichos |

**Os independentes que aparecem** [B1][B2][W1]:

- **freelancedevopsconsultant.co.uk** (freelancer britânico) é o 1.º para "freelance devops consultant" no Reino Unido. O domínio é igual à frase e o sitemap tem 4 URLs. A Google tem um sistema que evita "give too much credit for content hosted under domains designed to exactly match particular queries" [G8]. Este resultado diz pouco sobre o Google.
- **scalastic.io** (consultor freelance francês) é o 4.º para "expert ci/cd freelance". O sitemap tem 160 URLs, quase todos artigos. É o caminho do conteúdo, que o mapa deixa fora do âmbito.
- Para **"cto à temps partagé"**, os 10 primeiros resultados são quase todos pequenas empresas e independentes. É outro serviço, mas mostra que um nicho de compra pode ter concorrência mais leve.

**O nome do Julien** [B2][W1]:

- "julien laffont" tem vários homónimos nos resultados (perfis LinkedIn, uma empresa de energia, listas telefónicas).
- O LinkedIn do Julien ("Freelance DevOps | ESS | CI/CD") aparece em 3.º em França. Com "julien laffont devops", aparece em 1.º.
- Hoje, julienlaffont.com devolve uma página de erro da Wix (404). Não há nada indexado a preservar.

## Realismo para uma única landing page

Factos que enquadram a avaliação:

- **Uma página por língua.** A Google determina a língua pelo conteúdo visível e recomenda "different URLs for each language version"; o `hreflang` ajuda a mostrar a versão certa [G7]. A página francesa disputa termos franceses, e assim por diante.
- **Links.** A Google usa sistemas que analisam os links entre páginas, entre eles o PageRank, que "continues to be part of our core ranking systems" [G8]. Uma página nova num domínio sem conteúdo começa sem links.
- **Secções.** A Google identifica "individual sections or "passages" of a web page" para avaliar a relevância [G8]. Uma secção (Problema, FAQ) pode corresponder a uma pesquisa mais específica, mas continua a ser uma só página.
- **Tempo.** "Some changes might take effect in a few hours, others could take several months" [G9]. Com `noindex` até ao Lançamento comercial, nada aparece antes disso.
- **Perfil de empresa no Google** (o mapa das pesquisas locais). Exige um local que os clientes possam visitar, ou deslocações aos clientes [G10]. Um serviço só remoto não cumpre esta regra.

| Grupo | Sinal de procura | Concorrência | É o público da página? | Realismo |
|---|---|---|---|---|
| Nome ("Julien Laffont", "Julien Laffont DevOps") | Só quem já o conhece (LinkedIn, recomendações) | Homónimos; o LinkedIn dele já aparece | Sim: CTO que ouviu falar dele | **Alto** |
| Nicho SaaS, startup, CTO ("freelance devops saas", "devops pour startup", "devops for saas", "fractional devops", "devops para startups") | Muito baixo em FR e PT (0 a 2 sugestões); algum em EN | Menor: plataformas e alguns especialistas; em EN, agências | Sim | **Médio**, com pouco tráfego |
| Serviço com intenção de compra ("prestataire devops", "audit devops", "devops consulting services", "hire devops consultant", "consultoria devops") | Baixo em FR e PT; existe em EN | Agências, diretórios e plataformas com muita autoridade | Sim | **Baixo** |
| Serviço genérico ("freelance devops", "consultant devops", "devops consultant", "consultor devops") | O maior do lado do serviço, mas de quem procura trabalho | Sites de emprego e plataformas | Na maioria, não | **Baixo** |
| Problema ("tests de non régression", "pipeline ci/cd", "scalabilité", "technical debt", "testes de regressão") | O maior de todos | Guias de fornecedores, Wikipédia, blogues | Em parte: um CTO a informar-se, não a comprar | **Baixo** para uma landing page; pediria artigos (fora do âmbito) |
| Tecnologia ("consultant kubernetes", "terraform consultant", "consultoria kubernetes") | Baixo; 0 no Trends em França | Sites de emprego e consultoras especializadas | Em parte | **Baixo** |
| Local ("freelance devops lyon", "devops lisboa", "devops consultant portugal") | Baixo | Malt, sites de emprego, diretórios | Não: o Julien não trabalha nessas cidades | **Baixo** |

Por língua:

- **Francês.** É onde "freelance devops" é proporcionalmente mais pesquisado [T1], mas com intenção de missões. Os termos de compra estão com agências e diretórios.
- **Inglês.** Tem a procura de compra mais visível ("devops consulting", "fractional cto"), e também a concorrência mais forte: agências de vários países, plataformas globais e listas.
- **Português.** O Trends não mede nenhum termo de serviço em Portugal [T1]. A concorrência é mais leve (Innowise, Syone), mas o público que pesquisa em português parece mínimo. Em Portugal, as formas inglesas ("devops freelancer") completam-se em inglês [A1].

## Limitações

- **Sem volumes.** Nenhum número absoluto. As sugestões não medem volume [G1]; o Trends é relativo, por amostragem, e põe a 0 o que tem pouco volume [G2].
- **IP em Portugal.** Todos os pedidos saíram de um IP português (a página de bloqueio do Startpage indicava o país "PT").
  - Com `hl=en&gl=us`, as sugestões incluíram cidades portuguesas ("fractional devops jobs lisbon", "devops consultant near me lisbon"). Com `hl=pt-BR&gl=br`, "consultor devops" completou com "portugal".
  - O parâmetro `gl` não neutraliza a localização. As sugestões terminadas em "portugal", "lisbonne" ou numa cidade portuguesa são, provavelmente, efeito do IP, não procura real de França ou dos EUA.
  - Um CTO em Paris, Londres ou Nova Iorque pode ver outras sugestões.
- **Sufixos de país.** Muitas sugestões de compra só existem com um país acrescentado ("en france", "au portugal", "en suisse", "in usa"). O padrão repete-se em vários termos. São sinais fracos.
- **Página de resultados do Google inacessível.** Pede JavaScript. Ficaram por ver as posições no Google, as "Pesquisas relacionadas" e as perguntas "Outras perguntas".
- **Resultados do Brave, não do Google.** O Brave tem índice próprio. O DuckDuckGo deu resultados para "freelance devops" e depois bloqueou ("botnet"); o Bing devolveu a página sem resultados orgânicos; o Startpage pediu captcha. O padrão (sites de emprego, plataformas, agências) coincidiu entre Brave e DuckDuckGo na única pesquisa comparável. O Brave traduz automaticamente alguns títulos do Reddit.
- **Google Trends.**
  - Usei o endpoint não documentado da página "Explorar", com cookie de sessão; muitos pedidos deram erro 429. A comparação semanal do Reino Unido falhou; a mensal correu.
  - Todas as categorias, pesquisa na Web.
  - Alguns termos são ambíguos ("devops" com o Azure DevOps, "conteneurisation" com o transporte marítimo).
- **Fotografia de um dia.** Sugestões e resultados mudam com o tempo e com a pessoa.
- **Fora desta pesquisa:** pesquisa dentro do LinkedIn e da Malt, outros motores, e respostas de assistentes de IA.

## Pontos em aberto para «Para que pesquisas otimizamos a página?»

Opções e compromissos para o ticket [«Para que pesquisas otimizamos a página?»](https://github.com/juliensl/julien-devops-lp/issues/32). Nada disto está decidido.

- **Público ou volume.** Otimizar só para quem compra (pouca procura, público certo) ou também para termos genéricos (mais procura, sobretudo de quem procura trabalho)?
- **Nome do serviço em cada língua.**
  - Francês: "freelance DevOps" (a forma mais pesquisada, com intenção de missões), "consultant DevOps" ou "expert DevOps".
  - Inglês: "DevOps consultant", "freelance DevOps" ou "fractional DevOps".
  - Português: "consultor DevOps" ou "freelancer DevOps" (em Portugal, as pesquisas desta área parecem fazer-se em inglês).
- **Nicho.** Juntar SaaS, startup ou CTO ao título e ao cabeçalho principal: menos procura, menos concorrência, público mais certo.
- **Termos de problema.** Entram nas secções Problema e FAQ, sabendo que, para esses termos, o Google mostra guias?
- **Volumes reais.** O Julien quer abrir uma conta Google Ads para usar o Keyword Planner? Dá a média mensal de pesquisas de um termo e das suas variantes próximas [G4]. Exige dados de faturação [G3]. Termos com muito pouco volume não aparecem [G3]. Segundo uma fonte secundária, contas com pouco gasto veem intervalos em vez de números [S1]. Decisão do Julien.
- **Palavras dos CTO reais.** Que palavras usaram os CTO com quem o Julien já falou? É a fonte mais direta e não custa nada. Pergunta para o Julien.
- **Nome e homónimos.** Como o Julien quer aparecer ("Julien Laffont", "Julien Laffont DevOps"), sabendo que há homónimos e que o LinkedIn dele já aparece.
- **Local.** Mencionar França, Portugal ou Lisboa? As pesquisas locais têm pouco interesse e o perfil de empresa no Google exige presença física ou deslocações [G10].
- **Search Console no Lançamento comercial.** Mostra as pesquisas reais que trouxeram Visitantes [G5]. Atenção: as pesquisas "that aren't issued by more than a few dozen users over a two-to-three month period" ficam anónimas e fora das tabelas [G6]. Numa página de nicho, podem ser muitas.

## Como foi feita a pesquisa

- **Sugestões do Google** [A1]: 333 pedidos a `suggestqueries.google.com/complete/search?client=firefox`, com `hl`/`gl` em fr/fr, en/us, en/gb, pt-PT/pt e pt-BR/br (este só para contraste). Termos de partida agrupados por intenção: serviço, compra, contratação, nicho, problema, tecnologia e local.
- **Google Trends** [T1][T2]: endpoint da página "Explorar" (`trends.google.com/trends/api/explore` e `widgetdata/multiline`, `relatedsearches`, `comparedgeo`), com cookie de sessão.
  - Passagem mensal: janeiro de 2019 a setembro de 2026 (93 meses), 13 comparações de até 5 termos e 7 pedidos de pesquisas relacionadas.
  - Passagem semanal: 13/10/2021 a 13/10/2026, as mesmas comparações.
- **Quem aparece** [B1][B2][D1]: 70 pesquisas no Brave Search (`search.brave.com`), com o cookie `country` em fr, us, gb ou pt e o cabeçalho `Accept-Language` correspondente. Contei os resultados orgânicos ("web"). Uma pesquisa no DuckDuckGo HTML (`kl=fr-fr`) antes do bloqueio.
- **Sites independentes** [W1]: título, descrição e número de URLs no `sitemap.xml`, com `curl`.
- **Documentação oficial** da Google: Search Help, Trends Help, Google Ads Help, Search Central e Business Profile Help.

## Fontes

Todas consultadas a 13/10/2026.

**Google**

- [G1] Google Search Help, "How Google autocomplete predictions work": <https://support.google.com/websearch/answer/7368877>
- [G2] Google Trends Help, "FAQ about Google Trends data": <https://support.google.com/trends/answer/4365533>
- [G3] Google Ads Help, "Use Keyword Planner": <https://support.google.com/google-ads/answer/7337243>
- [G4] Google Ads Help, "About Keyword Planner forecasts" (definição de "average monthly searches"): <https://support.google.com/google-ads/answer/3022575>
- [G5] Search Console Help, "Performance report (Search results)": <https://support.google.com/webmasters/answer/7576553>
- [G6] Google Search Central Blog, "A deep dive into Search Console performance data filtering and limits", outubro de 2022: <https://developers.google.com/search/blog/2022/10/performance-data-deep-dive>
- [G7] Google Search Central, "Managing multi-regional and multilingual sites": <https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites>
- [G8] Google Search Central, "A guide to Google Search ranking systems" (secções "Exact match domain system", "Link analysis systems and PageRank" e "Passage ranking system"): <https://developers.google.com/search/docs/appearance/ranking-systems-guide>
- [G9] Google Search Central, "SEO Starter Guide": <https://developers.google.com/search/docs/fundamentals/seo-starter-guide>
- [G10] Google Business Profile Help, "Guidelines for representing your business on Google": <https://support.google.com/business/answer/3038177>

**Recolhas próprias** (13/10/2026, IP em Portugal)

- [A1] Sugestões do Google: `https://suggestqueries.google.com/complete/search?client=firefox&hl=<hl>&gl=<gl>&q=<termo>`, 333 termos de partida.
- [T1] Google Trends, comparações mensais de 01/2019 a 09/2026 e pesquisas relacionadas: `https://trends.google.com/trends/api/explore` (página pública: <https://trends.google.com/trends/explore>).
- [T2] Google Trends, comparações semanais de 13/10/2021 a 13/10/2026, mesmo endpoint.
- [B1] Brave Search, primeira série (48 pesquisas): `https://search.brave.com/search?q=<termo>&source=web`, cookie `country=fr|us|gb|pt`.
- [B2] Brave Search, segunda série (22 pesquisas: nichos, contratação, nome do Julien), mesmo método.
- [D1] DuckDuckGo HTML, "freelance devops" com `kl=fr-fr`: <https://html.duckduckgo.com/html/?q=freelance+devops&kl=fr-fr>
- [W1] Sites verificados com `curl` (título, descrição, `sitemap.xml`): <https://www.freelancedevopsconsultant.co.uk/>, <https://scalastic.io/>, <https://www.freelancerdevops.com/>, <https://fractionaldevops.io/>, <https://julienlaffont.com/>

**Fontes secundárias** (usadas só onde a fonte primária não responde)

- [S1] Search Engine Land, "Google officially throttling Keyword Planner data for low spending AdWords accounts", 2016: <https://searchengineland.com/google-officially-throttling-keyword-planner-data-low-spending-adwords-accounts-255795>
