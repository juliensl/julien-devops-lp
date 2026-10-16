# Que factos distinguem os fornecedores cloud para cada tipo de empresa?

> Pesquisa do ticket [«Que factos distinguem os fornecedores cloud para cada tipo de empresa?»](https://github.com/juliensl/julien-devops-lp/issues/45) (mapa [«Mapa: spec da landing page e da pipeline»](https://github.com/juliensl/julien-devops-lp/issues/4)). Fontes consultadas a **16/10/2026**.
> Este documento **não classifica** os fornecedores nem lhes dá notas. Os pesos de cada critério por cenário são uma opinião do Julien e ficam fora. Aqui ficam só factos com fonte oficial e data.
> **Preços:** sem IVA, na moeda e na região indicadas, tal como estavam a 16/10/2026. Os preços mudam.
> **Ordem:** os fornecedores aparecem sempre pela mesma ordem (a do ticket). A ordem não é uma classificação.

## Pergunta

Que factos verificáveis distinguem AWS, Google Cloud, Microsoft Azure, Scaleway, OVHcloud, Clever Cloud e Infomaniak para diferentes tipos de empresa?

Contexto considerado:

- a pesquisa alimenta o gráfico interativo de fornecedores cloud do protótipo de [«Qual a direção visual?»](https://github.com/juliensl/julien-devops-lp/issues/8);
- no gráfico, o Visitante escolhe um cenário de empresa e vê que fornecedores considerar. Cenários: startup antes do lançamento, SaaS em crescimento, dados que têm de ficar na UE ou setor regulado, carga muito variável, arquitetura com muitos serviços geridos, orçamento previsível;
- a lista dos 7 fornecedores foi validada em [«Que informações do Julien entram nas secções?»](https://github.com/juliensl/julien-devops-lp/issues/25);
- só factos com fonte oficial e data;
- sem análise jurídica (por exemplo, do CLOUD Act). Fica só a sede e as ofertas «soberanas» que o próprio fornecedor anuncia.

## Resumo

- **Sede.**
  - EUA: AWS (Seattle), Google Cloud (Mountain View), Microsoft Azure (Redmond).
  - França: Scaleway (Paris), OVHcloud (Roubaix), Clever Cloud (Nantes).
  - Suíça: Infomaniak (Genebra). A Suíça não faz parte da UE.
  - Ofertas «soberanas» que os três fornecedores dos EUA anunciam na Europa: AWS European Sovereign Cloud; S3NS (Thales) e Google Cloud Data Boundary; Microsoft Sovereign Cloud, com a Bleu (França) e a Delos Cloud (Alemanha).
- **Regiões na UE** (cada fornecedor conta à sua maneira): AWS 6, mais a European Sovereign Cloud; Google 11; Azure 13, das quais 2 de acesso restrito; Scaleway 4; OVHcloud 7, mais 3 regiões SNC e 15 Local Zones; Clever Cloud 8 zonas, 7 delas em França; Infomaniak 0 (as 2 regiões estão na Suíça).
- **SecNumCloud** (lista da ANSSI de 16/10/2026):
  - só a OVHcloud tem ofertas próprias qualificadas: 3, todas IaaS;
  - a oferta S3NS, da Thales com tecnologia Google Cloud, está qualificada em nome da Thales;
  - Scaleway e Bleu (serviços Azure) estão na lista pública «em qualificação»;
  - AWS, Clever Cloud e Infomaniak não aparecem. A Clever Cloud diz estar em qualificação e dá acesso a uma zona da Cloud Temple.
- **HDS** (lista da ANS): AWS, Google, Microsoft, Scaleway, OVHcloud e Clever Cloud. A Infomaniak não, e diz que não tem planos para isso. **ISO/IEC 27001:** os 7.
- **Serviços geridos:**
  - Kubernetes gerido: os 7. Na Clever Cloud está em beta pública.
  - Contentores serverless: AWS, Google, Azure e Scaleway. Contentores com escala automática na Clever Cloud e no Jelastic da Infomaniak. Na OVHcloud, «Coming soon».
  - PostgreSQL gerido: 6. Na Infomaniak, «Available soon».
  - PaaS «git push»: AWS (Elastic Beanstalk), Google (Cloud Run, App Engine), Azure (App Service), Clever Cloud e Infomaniak (Jelastic). Não encontrado na Scaleway nem na OVHcloud (o Web PaaS fechou em 2025). O App Runner da AWS fechou a novos clientes.
- **Tráfego de saída a partir da Europa:**
  - incluído nas instâncias da Scaleway, da OVHcloud e da Infomaniak; a Clever Cloud diz que só cobra no armazenamento Cellar;
  - faturado por GB na AWS (100 GB grátis, depois 0,09 USD/GB), no Google (Premium Tier sem volume grátis, 0,12 USD/GiB) e na Azure (100 GB grátis, depois 0,087 USD/GB).
- **Créditos para startups** (máximo): AWS 200 000 USD; Google 350 000 USD para IA, 200 000 USD para as outras; Microsoft 150 000 USD; Scaleway 36 000 €; OVHcloud 100 000 €; Clever Cloud 10 000 €; Infomaniak não encontrado.
- **Suporte, primeiro plano pago:** AWS 29 USD/mês ou 9 %; Google 29 USD/mês ou 3 %; Azure 29 USD/mês; Scaleway 50 €/mês ou 5 %; OVHcloud 50 €/mês (12 meses); Clever Cloud 490 €/mês mais 1,8 × o consumo (12 meses); Infomaniak CHF 50/mês.
- **Factos ligados à previsibilidade da fatura** (sem síntese):
  - preço fixo mensal: AWS (Lightsail), Scaleway (Dedibox), OVHcloud (VPS), Infomaniak (VPS Cloud e VPS Lite). Não encontrado no Google, na Azure nem na Clever Cloud;
  - descontos por compromisso: AWS e Azure até 72 %, Google até 70 %, Scaleway até 25 %, OVHcloud até 30 %. Não encontrados na Clever Cloud nem no Public Cloud da Infomaniak;
  - paragem automática ao atingir um valor: só os «spend cap budgets» do Google (alguns serviços) e as quotas por projeto da Infomaniak. Os outros só avisam.
- **Mudanças recentes:** App Runner fechado a 30/04/2026; planos Developer e Business da AWS fechados a 02/12/2025; SNC Cloud Platform da OVHcloud qualificada desde 31/07/2026; Milão na Scaleway desde 13/10/2026. A qualificação do Hosted Private Cloud (VMware) da OVHcloud termina a 29/12/2026.

## 1. Tabela por fornecedor

### 1.1 Sede, ofertas soberanas e regiões

| Fornecedor | Sede | Ofertas «soberanas» anunciadas pelo fornecedor | Regiões na UE | Na Europa, fora da UE | Anunciadas, ainda não abertas |
|---|---|---|---|---|---|
| AWS | Seattle, EUA (Amazon.com, Inc.) [AWS1]. Na EMEA, o contrato é com a Amazon Web Services EMEA SARL, Luxemburgo [AWS2]. | **AWS European Sovereign Cloud:** uma região em Brandenburg (Alemanha), numa partição separada, disponível desde janeiro de 2026 [AWS3][AWS4]. | **6:** Frankfurt, Irlanda, Milão, Paris, Espanha, Estocolmo [AWS5]. Mais a região da European Sovereign Cloud (Brandenburg). | **2:** Londres, Zurique [AWS5]. | Nenhuma região nova na Europa [AWS6]. Local Zones soberanas anunciadas em Bruxelas, Amesterdão e Lisboa [AWS7]. |
| Google Cloud | Mountain View, EUA (Google LLC, filial da Alphabet) [GCP1]. Em Portugal fatura a Google Cloud EMEA Limited (Dublin); em França, a Google Cloud France (Paris) [GCP1]. | **Google Cloud Data Boundary**; **Google Cloud Dedicated**, operado em França pela S3NS (filial da Thales), oferta PREMI3NS, disponível desde 16/10/2025; na Alemanha com a Thales, em pré-visualização desde 20/05/2026; **Google Distributed Cloud**, ligado ou isolado (air-gapped) [GCP2][GCP3][GCP4]. | **11:** Hamina (FI), Estocolmo (SE), Varsóvia (PL), Madrid (ES), St. Ghislain (BE), Frankfurt e Berlim (DE), Eemshaven (NL), Milão e Turim (IT), Paris (FR) [GCP5]. | **2:** Londres, Zurique [GCP5]. | Áustria, Atenas e Oslo (anunciadas em 2022 e 2023, sem estado mais recente); Turquia (anunciada a 20/11/2025) [GCP6]. |
| Microsoft Azure | Redmond, EUA (Microsoft Corporation) [AZ1]. Na EMEA fatura a Microsoft Ireland Operations Limited (Dublin) [AZ1]. | **Microsoft Sovereign Cloud** (anunciada a 16/06/2025): Sovereign Public Cloud, nas regiões europeias; Sovereign Private Cloud, no cliente ou em parceiros; «National Partner Clouds»: **Bleu** em França (Orange e Capgemini) e **Delos Cloud** na Alemanha (filial da SAP). **EU Data Boundary** [AZ2]. | **13:** Austria East (Viena), Belgium Central (Bruxelas), Denmark East (Copenhaga), France Central (Paris), France South (Marselha)\*, Germany West Central (Frankfurt), Germany North (Berlim)\*, Italy North (Milão), North Europe (Irlanda), Poland Central (Varsóvia), Spain Central (Madrid), Sweden Central (Gävle), West Europe (Países Baixos) [AZ3]. | **6:** Norway East, Norway West\*, Switzerland North (Zurique), Switzerland West (Genebra)\*, UK South (Londres), UK West (Cardiff) [AZ3]. | Grécia (2020), Finlândia (2022) e uma segunda região na Dinamarca (12/12/2025), todas sem data de abertura [AZ3]. |
| Scaleway | Paris, França (Scaleway SAS). O grupo iliad (Paris) tem 99,56 % do capital [SCW1]. | Apresenta toda a cloud como europeia e soberana. **SecNumCloud by Scaleway:** zona qualificada a abrir na região de Paris, em qualificação desde 2025 [SCW2]. | **4:** Paris, Amesterdão, Varsóvia, Milão, cada uma com 3 zonas [SCW3]. | Nenhuma. | Estocolmo e Frankfurt, para 2027 [SCW4]. |
| OVHcloud | Roubaix, França (OVH Groupe SA) [OVH1]. Em Portugal, o contrato é com a OVH Hosting – Sistemas Informáticos, Unipessoal Lda (Lisboa) [OVH2]. | **SNC Cloud Platform** (cloud pública SecNumCloud, em Gravelines, Roubaix e Strasbourg); **Managed VMware vSphere** (Hosted Private Cloud) e **Bare Metal Pod**, também SecNumCloud [OVH3][OVH4]. | **7 regiões:** Gravelines, Roubaix, Strasbourg, Paris (3 zonas), Frankfurt (Limburg), Milão (3 zonas), Varsóvia. Mais 3 regiões SNC em França e 15 Local Zones na UE [OVH5][OVH6]. | **1 região:** Londres (Erith). Local Zones em Oslo, Zurique e Manchester [OVH6]. | Berlim, com 3 zonas, no início de 2027 [OVH7]. SNC Cloud Platform em Itália, Alemanha e Polónia [OVH3]. |
| Clever Cloud | Nantes, França (Clever Cloud SAS) [CC1]. | A plataforma é apresentada como «Sovereign Cloud». Zona SecNumCloud a pedido, na infraestrutura da Cloud Temple. «Ultimate Sovereignty Clause» (contratual, junho de 2026). Clever Cloud AirGap, instalada no cliente [CC2]. | **8 zonas:** 7 em França (Paris: `par` própria, `parhds`, `scw` na Scaleway; Roubaix: `rbx`, `rbxhds` na OVHcloud; Gravelines: `grahds` na OVHcloud; `fr-north-hds` na OVHcloud) e Varsóvia (`wsw`, na OVHcloud) [CC3]. | **1 zona:** Londres (`ldn`, na IONOS) [CC3]. | Nenhuma encontrada [CC3]. |
| Infomaniak | Les Acacias (Genebra), Suíça (Infomaniak Network SA) [IK1]. Desde 13/05/2026, a Infomaniak Foundation tem a maioria dos votos da Infomaniak Group SA [IK2]. | Não há um produto à parte: toda a oferta é apresentada como cloud soberana, «100% controlled in Switzerland» [IK3]. | **0.** | **2:** dc3-a e dc4-a, na Suíça. Os datacenters estão em Genebra; a cidade da dc4-a não está publicada [IK4]. | Nenhuma encontrada [IK4]. |

### 1.2 Serviços geridos

| Fornecedor | Kubernetes gerido | Contentores serverless ou com escala automática | PostgreSQL gerido | PaaS «git push» |
|---|---|---|---|---|
| AWS | Amazon EKS [AWS8] | AWS Fargate (com ECS ou EKS); Amazon ECS Express Mode [AWS9] | Amazon RDS for PostgreSQL; Aurora PostgreSQL [AWS10] | AWS Elastic Beanstalk (envia-se o código) [AWS11]. O App Runner fechou a novos clientes a 30/04/2026 [AWS12]. O Amplify Hosting liga-se a Git, mas é para frontends [AWS11]. |
| Google Cloud | Google Kubernetes Engine (GKE), modos Standard e Autopilot [GCP7] | Cloud Run [GCP7] | Cloud SQL for PostgreSQL; AlloyDB for PostgreSQL [GCP8] | Cloud Run a partir do código-fonte, ou com deploy contínuo de um repositório Git; App Engine [GCP9] |
| Microsoft Azure | Azure Kubernetes Service (AKS), modos Automatic e Standard [AZ4] | Azure Container Apps (escala até zero); Azure Container Instances [AZ4] | Azure Database for PostgreSQL flexible server [AZ5] | Azure App Service: Local Git e deploy contínuo a partir de GitHub, Bitbucket ou Azure Repos [AZ6] |
| Scaleway | Kubernetes Kapsule (e Kubernetes Kosmos, multi-cloud) [SCW5] | Serverless Containers, de 0 a 200 instâncias [SCW5] | Managed Database for PostgreSQL and MySQL; Serverless SQL Database (só em Paris) [SCW5] | **Não encontrado.** O mais próximo: as Serverless Functions recebem código, e a CLI constrói a imagem a partir do código local [SCW6]. |
| OVHcloud | Managed Kubernetes Service (MKS) [OVH8] | **Não encontrado** como produto geral: «Serverless — Coming soon». O AI Deploy corre imagens Docker com escala automática, mas é para IA e, na Europa, só existe em Gravelines [OVH8]. | Public Cloud Databases for PostgreSQL [OVH8] | **Não encontrado.** O Web PaaS (Platform.sh) deixou de ser vendido a 01/10/2024 e fechou a 31/01/2025 [OVH9]. |
| Clever Cloud | Clever Kubernetes Engine (CKE), em **beta pública** [CC4] | Aplicações Docker com escala automática horizontal e vertical; cada contentor corre numa VM [CC4] | Add-on PostgreSQL (versões 14 a 18) [CC4] | Sim: é o produto principal («A single git push puts a new version live») [CC4] |
| Infomaniak | Kubernetes Service («Managed Kubernetes»), desde 03/04/2025 [IK5] | **Não encontrado** como serverless. O Jelastic Cloud corre contentores Docker com escala automática vertical e horizontal [IK6] | **Ainda não:** o Database Service só tem MySQL; PostgreSQL está «Available soon» [IK7] | Jelastic Cloud: deploy por Git ou SVN, com atualização automática [IK6] |

### 1.3 Certificações

SecNumCloud e HDS confirmados nas listas oficiais da ANSSI e da ANS (secção 2). ISO/IEC 27001 nas páginas de conformidade dos fornecedores.

| Fornecedor | SecNumCloud (lista da ANSSI, 16/10/2026) | HDS (lista da ANS) | ISO/IEC 27001 |
|---|---|---|---|
| AWS | **Não está na lista.** A AWS não anuncia nenhuma oferta [ANSSI1][AWS22]. | **Sim:** atividades 1 a 6 [ANS1]. A AWS indica HDS v2 desde 21/04/2026; as atividades 1, 2 e 6 só nas 6 regiões do EEE; a European Sovereign Cloud ainda fora do âmbito [AWS14]. | Sim, ISO/IEC 27001:2022 [AWS13] |
| Google Cloud | **Não em nome do Google.** A oferta «Cloud de confiance S3NS», da Thales Cloud Sécurisé, está qualificada (PaaS, CaaS, IaaS) de 17/12/2025 a 17/12/2028 [ANSSI1]. A S3NS descreve-se como filial da Thales «em parceria com a Google Cloud» [GCP3]. | **Sim:** «GOOGLE LLC GCP», atividades 1 a 5 [ANS1]. Certificado HDS v2.0 reemitido a 10/03/2026, válido até 14/05/2027; atividades 1 e 2 só no EEE [GCP10]. | Sim, ISO/IEC 27001:2022 [GCP10] |
| Microsoft Azure | **Não está na lista de qualificados.** A Bleu SAS (Orange e Capgemini) está na lista pública «em qualificação» com «Cloud de Confiance Bleu (IaaS, PaaS, CaaS)» [ANSSI2]. A Microsoft não anuncia oferta própria e diz que a Bleu foi «designed to meet SecNumCloud requirements» [AZ2]. | **Sim:** «MICROSOFT CORPORATION», atividades 1 a 6 [ANS1]. Certificado HDS v2.0 de outubro de 2025, para os centros de dados no EEE [AZ8]. | Sim: Azure, Dynamics 365, Power Platform e parte do Microsoft 365 [AZ9] |
| Scaleway | **Em qualificação:** «Scaleway SecNumCloud (IaaS, PaaS)» na lista pública da ANSSI; não está na lista de qualificados [ANSSI1][ANSSI2]. | **Sim:** atividades 1 a 4, certificador BSI [ANS1]. A Scaleway indica auditor SGS e o Kapsule nas atividades 1 a 5, só em datacenters em França [SCW7]. | Sim, ISO/IEC 27001:2022 (SGS) [SCW7] |
| OVHcloud | **Sim, 3 ofertas IaaS** [ANSSI1]: Hosted Private Cloud powered by VMware (28/12/2023 a 29/12/2026); Bare Metal Pod (24/03/2025 a 24/03/2028); SNC Cloud Platform (31/07/2026 a 31/07/2029). | **Sim:** «OVH GROUPE», atividades 1 a 6 [ANS1]. | Sim, em todos os datacentres exceto os dos EUA [OVH10] |
| Clever Cloud | **Não está em nenhuma das listas** [ANSSI1][ANSSI2]. A Clever Cloud diz que a qualificação própria está «em curso» e oferece uma zona na Cloud Temple (qualificada) a pedido [CC2]. | **Sim:** atividades 1 a 6, Bureau Veritas [ANS1]. Certificado de 20/12/2024, válido até 19/12/2027 [CC5]. | Sim, ISO/IEC 27001:2022, válido até 14/03/2027 [CC5] |
| Infomaniak | **Não está em nenhuma das listas** [ANSSI1][ANSSI2]. A Infomaniak não anuncia nenhuma oferta [IK8]. | **Não.** Não está na lista da ANS (pesquisa por «infomaniak» sem resultados) [ANS1]. A Infomaniak diz que «there are no plans to become a certified Health Data Host (HDS)» [IK9]. | Sim, ISO/IEC 27001:2022 (SGS, em nome da Infomaniak Group SA), válido até 29/03/2027 [IK10] |

### 1.4 Preços e faturação

| Fornecedor | Tráfego de saída para a internet, a partir da Europa | Créditos para startups | Suporte: primeiro plano pago |
|---|---|---|---|
| AWS | 100 GB/mês grátis, somados em todas as regiões e serviços; depois **0,09 USD/GB** nos primeiros 10 TB (Paris e Frankfurt). Tabela de 16/09/2026 [AWS15]. | AWS Activate: até **200 000 USD** (nível Portfolio, através de um investidor ou aceleradora parceira); antes da Série B [AWS16]. | **Business Support+:** 29 USD/mês por conta ou 9 % da fatura, o que for maior [AWS17]. Os planos Developer e Business fecharam a novas subscrições a 02/12/2025 [AWS18]. |
| Google Cloud | Premium Tier (o predefinido): **sem volume grátis** a partir da Europa; **0,12 USD/GiB** de 0 a 1 024 GiB. Standard Tier: 200 GiB/mês grátis por conta; depois 0,085 USD/GiB. Paris e Frankfurt [GCP11]. | Google for Startups Cloud Program: até **350 000 USD** em 2 anos para startups de IA; até 200 000 USD para as outras [GCP12]. | **Standard Support:** 29 USD/mês ou 3 % da fatura, o que for maior [GCP13]. |
| Microsoft Azure | 100 GB/mês grátis; depois **0,087 USD/GB** pela rede da Microsoft, ou 0,08 USD/GB com «routing preference: Internet», nos 10 TB seguintes. Na tabela em euros: 0,0766 €/GB em Paris e Frankfurt [AZ10]. | Microsoft for Startups: até **150 000 USD**, desbloqueados aos poucos; antes da Série C [AZ11]. | **Developer:** 29 USD/mês [AZ12]. |
| Scaleway | **Incluído** no preço das Instances («List prices include egress») [SCW8]. Object Storage: 75 GB/mês grátis; depois 0,01 €/GB (Paris) [SCW8]. | Scaleway Startup Program: até **36 000 €** [SCW9]. | **Advanced:** 50 €/mês ou 5 % do gasto, o que for maior [SCW10]. |
| OVHcloud | **Incluído** no preço das instâncias em todas as localizações, exceto Ásia-Pacífico. Object Storage sem custo de saída [OVH11]. | OVHcloud Startup Program: até **100 000 €** (nível Scale, Série A ou mais); 10 000 € no nível Start [OVH12]. | **Premium:** 50 €/mês, com subscrição de 12 meses [OVH13]. |
| Clever Cloud | Aplicações: sem taxa de saída, segundo a Clever Cloud; não há preço por GB publicado [CC6]. Cellar (armazenamento S3): 0,09 €/GB até 10 TB [CC6]. | Programa UP: até **10 000 €** no primeiro ano [CC7]. | **Premium:** 490 €/mês mais 1,8 × o consumo, com compromisso de 12 meses. O suporte base está incluído [CC8]. |
| Infomaniak | **Incluído** nas instâncias Public Cloud («incoming and outgoing traffic is free»). Armazenamento de objetos: 10 TB/mês grátis por organização; depois CHF 0,009/GB. Regiões suíças, preços em CHF [IK11]. | **Não encontrado.** Só há uma oferta de teste para qualquer cliente: CHF 300 de créditos durante 3 meses [IK12]. | **Support Plus:** desde CHF 50/mês [IK13]. |

| Fornecedor | Pay-as-you-go | Compromisso ou reservas | Preço fixo mensal | Alertas ou limites de gastos |
|---|---|---|---|---|
| AWS | EC2 ao segundo, mínimo 60 s [AWS19] | Savings Plans e Reserved Instances, até 72 % [AWS19] | **Amazon Lightsail**, desde 5 USD/mês, com tráfego incluído [AWS20] | AWS Budgets: alertas e ações automáticas [AWS21] |
| Google Cloud | Ao segundo, depois do 1.º minuto [GCP14] | Committed Use Discounts (1 ou 3 anos, até 70 %); descontos automáticos por uso contínuo, até 30 % [GCP14] | **Não encontrado** [GCP14] | Budgets com alertas; «spend cap budgets» que param alguns serviços (Cloud Run, Gemini API) [GCP15] |
| Microsoft Azure | VMs com preço à hora, faturadas ao minuto completo; Container Apps e Container Instances ao segundo [AZ13] | Azure Reservations (1 ou 3 anos, até 72 %); savings plan for compute (até 65 %) [AZ13] | **Não encontrado** [AZ13] | Budgets: só alertas, não param os recursos. O «spending limit» só existe em subscrições com créditos [AZ14] |
| Scaleway | Instances de CPU à hora (mínimo 60 min); GPU ao minuto [SCW11] | Savings Plans (Compute), 12 ou 36 meses, até 25 % [SCW11] | **Dedibox** (servidores dedicados com preço mensal) [SCW12] | Billing Alerts: só avisos [SCW11] |
| OVHcloud | Ao segundo, mínimo 1 minuto [OVH11] | Savings Plans de 12 a 36 meses, até 30 % [OVH14] | **VPS**, desde 3,81 €/mês [OVH14] | Alerta por email quando a previsão de consumo passa um limite [OVH14] |
| Clever Cloud | Ao segundo [CC9] | **Não encontrado.** Há créditos pré-pagos e o Premium exige 12 meses [CC9] | **Não encontrado** [CC9] | **Não encontrado.** O custo controla-se com o mínimo e o máximo da escala automática [CC9] |
| Infomaniak | À hora, com fatura mensal [IK11] | **Não encontrado** no Public Cloud. Os VPS Cloud têm desconto no pagamento anual (11 %) ou trimestral (7 %) [IK14] | **VPS Cloud** (desde CHF 38,41/mês, pagamento anual) e **VPS Lite** (desde CHF 2,70/mês, compromisso anual) [IK14] | «Quota packs»: limites de recursos por projeto, «to avoid ending up with an excessively high bill». Alertas de orçamento: não encontrados [IK14] |

## 2. As listas oficiais: SecNumCloud e HDS

### 2.1 SecNumCloud (ANSSI)

**Qualificados.** O catálogo oficial da ANSSI, «mis à jour le 16/10/2026 à 11:52:57», secção 3.3.1 [ANSSI1]. Linhas que dizem respeito aos 7 fornecedores:

| Prestador na lista | Serviço | Tipo | Início | Fim |
|---|---|---|---|---|
| OVH | Hosted Private Cloud powered by VMware | IaaS | 28/12/2023 | 29/12/2026 |
| OVH | Bare Metal Pod | IaaS | 24/03/2025 | 24/03/2028 |
| OVH | SNC Cloud Platform | IaaS | 31/07/2026 | 31/07/2029 |
| Thales Cloud Sécurisé | Cloud de confiance S3NS | PaaS, CaaS, IaaS | 17/12/2025 | 17/12/2028 |

- AWS, Google, Microsoft, Scaleway, Clever Cloud e Infomaniak não aparecem como prestadores qualificados.
- A S3NS é a oferta da Thales que usa tecnologia da Google Cloud [GCP3]. Na lista, o prestador é a Thales, não o Google.

**Em qualificação.** A página da ANSSI «Prestataires de services d'informatique en nuage (SecNumCloud)» [ANSSI2] lista, entre outros:

- **Scaleway:** «Scaleway SecNumCloud (IaaS, PaaS)»;
- **Bleu SAS:** «Cloud de Confiance Bleu (IaaS, PaaS, CaaS)».

A ANSSI avisa: «Seuls apparaissent les projets de qualification que les prestataires ont accepté de rendre publics». A Clever Cloud diz estar em qualificação, mas não aparece nesta lista [CC2].

### 2.2 HDS (ANS)

Lista oficial da Agência do Numérico em Saúde (ANS), pesquisa por nome [ANS1]. A página não mostra datas.

| Nome na lista | Atividades HDS | Versão | Certificador |
|---|---|---|---|
| AMAZON WEB SERVICES INC | 1, 2, 3, 4, 5, 6 | V2.0 | Bureau Veritas |
| GOOGLE LLC GCP | 1, 2, 3, 4, 5 | V2.0 | EY CertifyPoint |
| MICROSOFT CORPORATION | 1, 2, 3, 4, 5, 6 | V2.0 | Schellman |
| SCALEWAY | 1, 2, 3, 4 | V2.0 | BSI |
| OVH GROUPE | 1, 2, 3, 4, 5, 6 | V2.0 | BYCYB |
| CLEVER CLOUD | 1, 2, 3, 4, 5, 6 | V2.0 | Bureau Veritas |
| (Infomaniak) | sem resultados | — | — |

Atividades: 1 sites físicos; 2 infraestrutura material; 3 infraestrutura virtual; 4 plataforma de alojamento; 5 administração e exploração; 6 cópia de segurança dos dados de saúde [ANS1].

## 3. Notas por fornecedor

### AWS

- **App Runner:** «no longer open to new customers» desde 30/04/2026. A AWS recomenda o ECS Express Mode, que pede uma imagem de contentor [AWS12].
- **Suporte:** os planos Developer e Business fecharam a novas subscrições a 02/12/2025. O Developer termina a 01/01/2027 [AWS18].
- **Regiões:** a documentação conta 34 regiões no mundo; a página comercial fala de 39. A diferença deve incluir GovCloud, China e a European Sovereign Cloud (dedução, não confirmada) [AWS5][AWS6].
- **Tráfego:** o Lightsail traz tráfego incluído em cada plano [AWS20].

### Google Cloud

- **Tráfego:** a tabela visível por defeito na página de preços é a de Iowa, onde o primeiro GiB é grátis. A partir de Paris ou Frankfurt, o Premium Tier não tem volume grátis. Li os preços europeus nos dados do seletor de região da página oficial [GCP11].
- **SecNumCloud:** a página do Google diz que a S3NS foi «designed to meet» o SecNumCloud; a S3NS anuncia a qualificação a 17/12/2025, o que bate com a lista da ANSSI [GCP2][GCP3][ANSSI1].
- **App Engine:** na Europa só existe em Londres, Bélgica, Zurique, Frankfurt e Varsóvia [GCP9].

### Microsoft Azure

- **Regiões com \*:** acesso restrito, «to support specific customer scenarios, such as disaster recovery» [AZ3]. Sem elas, ficam 11 regiões na UE e 4 fora da UE.
- **HDS:** a página HDS da Microsoft inclui «Finland Central» e «Sweden South», que não aparecem como regiões abertas, e omite Austria East, Belgium Central e Denmark East [AZ8][AZ3].
- **Bleu:** anuncia certificação própria ISO 27001 e HDS V2, «délivrées en août 2026 par LSTI», e diz estar «en cours de qualification SecNumCloud 3.2» [AZ7].
- **Delos Cloud:** as notícias da própria Delos (maio e junho de 2026) ainda falam de programa piloto [AZ2].
- **PostgreSQL:** o Azure Cosmos DB for PostgreSQL está em retirada e não é recomendado para projetos novos [AZ5].

### Scaleway

- **Milão** é região completa desde o comunicado de 13/10/2026 [SCW4].
- **HDS:** a lista da ANS (BSI, atividades 1 a 4) não bate com o que a Scaleway publica (SGS, Kapsule com atividades 1 a 5). Pode ser um certificado mais recente ainda não atualizado na ANS. Não confirmado [ANS1][SCW7].
- **HDS e SecNumCloud** exigem um plano de suporte Business ou Enterprise [SCW2][SCW7].

### OVHcloud

- **SNC Cloud Platform:** a OVHcloud anunciou a qualificação a 01/09/2026; a ANSSI dá início a 31/07/2026. Kubernetes gerido e bases de dados nesta oferta estão «Coming soon» [OVH3].
- **Hosted Private Cloud (VMware):** a qualificação atual termina a 29/12/2026 [ANSSI1].
- **Web PaaS:** o fim de vida só foi publicado no fórum da comunidade, por um moderador da OVHcloud [OVH9].
- **Regiões:** a página de disponibilidade diz «London» e «Frankfurt»; a página de infraestrutura diz «Erith» e «Limburg» [OVH5][OVH6].

### Clever Cloud

- **Zonas:** muitas zonas correm em datacenters de outros operadores (OVHcloud, Scaleway, IONOS); a API pública indica o operador de cada zona [CC3].
- **HDS:** subscrição fixa de 200 €/mês, mais um multiplicador de 1,4 sobre o preço normal [CC5].
- **Kubernetes:** em beta pública; durante a beta só se pagam o plano de controlo e os nós [CC4].

### Infomaniak

- **Regiões:** a Infomaniak indica «6 zones and 2 regions». A cidade da região dc4-a não está publicada [IK4].
- **Moeda:** os preços estão em CHF. Não encontrei preços em EUR [IK11].
- **PostgreSQL:** a página do Public Cloud cita PostgreSQL entre os motores, mas a página do Database Service diz «Available soon» e os preços só mostram MySQL [IK4][IK7].
- **Faturação à hora:** a página de preços mostra o cálculo proporcional de uma hora incompleta; uma FAQ de 01/09/2026 diz «Any hour started is billable» [IK11].
- **ISO 27001:** o certificado está em nome da Infomaniak Group SA. A página de certificações diz «since June 2018»; o certificado diz «Certified since 30 April 2021» [IK10].

## 4. Critério → que facto o mede

Que factos desta pesquisa podiam alimentar cada critério do gráfico. O peso de cada critério por cenário é uma opinião do Julien e fica fora.

| Critério do gráfico | Factos que o medem | O que fica para opinião |
|---|---|---|
| Serviços geridos | Tem ou não Kubernetes gerido, contentores serverless, PostgreSQL gerido e PaaS «git push» (4 sim/não, secção 1.2). | A largura do catálogo além destes 4 serviços e a qualidade de cada serviço. Esta pesquisa não as mede. |
| Kubernetes gerido | Nome do produto ou «não tem»; estado (por exemplo, beta na Clever Cloud). | Facilidade de uso e maturidade. |
| Contentores serverless | Nome do produto ou «não encontrado». | Se escala a zero, limites e arranque a frio não foram comparados. |
| Sede europeia | País da sede da sociedade-mãe (UE, Suíça, EUA). Ofertas «soberanas» anunciadas pelo fornecedor. | O que a sede implica juridicamente (CLOUD Act, etc.) fica fora desta pesquisa. |
| SecNumCloud | Linha na lista oficial da ANSSI: qualificado (nome da oferta, datas), em qualificação, ou ausente. Qualificação através de parceiro (S3NS). | Se uma oferta de parceiro conta para o fornecedor. |
| Regiões na UE | Número e cidades das regiões em países da UE. | Se as Local Zones e as zonas em datacenters de terceiros contam como regiões. |
| PaaS simples | Tem ou não deploy a partir de código ou Git sem gerir contentores; produto descontinuado ou fechado a novos clientes. | **«Simples» é opinião:** nenhum facto mede a simplicidade. |
| Previsibilidade da fatura | Instâncias de preço fixo mensal; tráfego de saída incluído ou faturado por GB; compromisso com desconto; alertas ou limites de gastos; mínimo do suporte pago. | **Juntar estes factos numa só medida é opinião.** Nenhum facto mede a previsibilidade diretamente. |

**Critérios que nenhum facto mede por inteiro:** «PaaS simples» (a simplicidade) e «previsibilidade da fatura» (a síntese). Os factos só medem partes. Os outros seis têm factos diretos, embora o peso de cada um continue a ser opinião.

## Limites

- **Data.** Tudo foi consultado a 16/10/2026. Preços, regiões, programas e listas mudam. As datas «da página» são as que a página mostra; muitas páginas comerciais não têm data.
- **Preços.** São preços de tabela, sem IVA, sem descontos negociados nem promoções. Moedas diferentes (USD e EUR) não foram convertidas. O GiB do Google (1 073 741 824 B) não é o GB dos outros (10⁹ B).
- **Tráfego de saída.** Comparei só a saída para a internet a partir de computação, mais o armazenamento de objetos quando a regra é diferente. Não comparei tráfego entre regiões nem entre zonas.
- **Serviços geridos.** Só verifiquei 4 serviços (Kubernetes, contentores serverless, PostgreSQL e PaaS). Não comparei limites, desempenho nem preço desses serviços.
- **Regiões.** Contei as regiões tal como cada fornecedor as define. Uma «região» não tem o mesmo tamanho em todos (número de zonas, Local Zones, datacenters de terceiros).
- **Certificações.** SecNumCloud e HDS verificados nas listas oficiais da ANSSI e da ANS. A ISO/IEC 27001 vem das páginas dos fornecedores; não li todos os certificados. A lista da ANS não mostra datas nem âmbito por serviço.
- **Sem análise jurídica.** A coluna «sede» não diz nada sobre leis aplicáveis (CLOUD Act, etc.). As ofertas «soberanas» são as que cada fornecedor anuncia, com as palavras dele.
- **Sem classificação.** O documento não ordena os fornecedores nem diz qual escolher.

## Como foi feita a pesquisa

- **Fornecedores:** um agente por fornecedor leu as páginas oficiais (sites, documentação, páginas de preços e de conformidade, páginas legais, relatórios anuais). Cada facto tem citação literal e URL. Os números principais foram lidos duas vezes (WebFetch e `curl` + `grep`, ou a API pública de preços do fornecedor).
- **Verificação por amostragem:** voltei a ler à parte o fecho do App Runner, o preço do suporte e os créditos da AWS; o tráfego incluído da OVHcloud e da Scaleway; os créditos da OVHcloud, da Clever Cloud e da Microsoft; o tráfego de saída da Azure; o PostgreSQL, o HDS e o tráfego da Infomaniak.
- **SecNumCloud:** descarreguei o catálogo PDF da ANSSI de 16/10/2026 e li a secção 3.3.1 com `pypdf`, com as colunas SaaS, PaaS, CaaS e IaaS reconstruídas pela posição do texto. Li também a página pública dos projetos em qualificação.
- **HDS:** a página da ANS bloqueia pedidos automáticos simples. Abri-a no Chromium sem interface e pesquisei pelo nome de cada fornecedor. Para confirmar uma ausência, comparei com uma pesquisa sem sentido («zzqqxx»), que dá o mesmo resultado vazio.
- **Downloads:** cada um numa pasta própria, fora do repositório, e nada foi executado.

## Fontes

Todas consultadas a 16/10/2026. Entre parênteses, a data que a página mostra, quando mostra.

**Listas oficiais**

- [ANSSI1] ANSSI, catálogo «Produits, services, profils de protection, sites… certifiés, qualifiés, agréés», «mis à jour le 16/10/2026 à 11:52:57», secção 3.3.1 «Services d'informatique en nuage (SecNumCloud)», pp. 77–78: <https://messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf>
- [ANSSI2] ANSSI, «Prestataires de services d'informatique en nuage (SecNumCloud)», projetos em qualificação tornados públicos (sem data): <https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/services-de-securite-evalue/solutions-en-cours-de-qualification/prestataires-secnumcloud/>
- [ANS1] Agence du Numérique en Santé, «Liste des hébergeurs certifiés», pesquisa pelo campo «Nom de l'hébergeur» (sem data): <https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies>

**AWS**

- [AWS1] Amazon.com, Inc., relatório 10-K do exercício de 2025: <https://www.sec.gov/Archives/edgar/data/1018724/000101872426000004/amzn-20251231.htm>
- [AWS2] AWS Customer Agreement («Last Updated: August 14, 2026»): <https://aws.amazon.com/agreement/>
- [AWS3] AWS News Blog, «Opening the AWS European Sovereign Cloud» (14/01/2026): <https://aws.amazon.com/blogs/aws/opening-the-aws-european-sovereign-cloud/>
- [AWS4] Amazon, comunicado sobre a AWS European Sovereign Cloud (15/01/2026): <https://press.aboutamazon.com/aws/2026/1/aws-launches-aws-european-sovereign-cloud-and-announces-expansion-across-europe>
- [AWS5] AWS Docs, «AWS Regions»: <https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html>
- [AWS6] AWS, «Regions and Availability Zones»: <https://aws.amazon.com/about-aws/global-infrastructure/regions_az/>
- [AWS7] AWS, localizações das Local Zones: <https://aws.amazon.com/about-aws/global-infrastructure/localzones/locations/>
- [AWS8] Amazon EKS: <https://aws.amazon.com/eks/>
- [AWS9] AWS Fargate: <https://aws.amazon.com/fargate/>; Amazon ECS Express Mode: <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/express-service-overview.html>
- [AWS10] Amazon RDS for PostgreSQL: <https://aws.amazon.com/rds/postgresql/>; Aurora PostgreSQL: <https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraPostgreSQL.html>
- [AWS11] AWS Elastic Beanstalk: <https://aws.amazon.com/elasticbeanstalk/>; AWS Amplify Hosting: <https://aws.amazon.com/amplify/hosting/>
- [AWS12] AWS App Runner, guia: <https://docs.aws.amazon.com/apprunner/latest/dg/what-is-apprunner.html>; notas de lançamento: <https://docs.aws.amazon.com/apprunner/latest/relnotes/welcome.html>
- [AWS13] AWS, ISO 27001 FAQ: <https://aws.amazon.com/compliance/iso-27001-faqs/>; serviços certificados («Last updated: September 1, 2026»): <https://aws.amazon.com/compliance/iso-certified/>
- [AWS14] AWS, HDS: <https://aws.amazon.com/compliance/hds/>
- [AWS15] AWS Price List API, Data Transfer, eu-west-3 (publicationDate 2026-09-16): <https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSDataTransfer/current/eu-west-3/index.json>; anúncio dos 100 GB grátis (24/11/2021): <https://aws.amazon.com/blogs/aws/aws-free-tier-data-transfer-expansion-100-gb-from-regions-and-1-tb-from-amazon-cloudfront-per-month/>
- [AWS16] AWS Activate: <https://aws.amazon.com/startups/credits/>
- [AWS17] AWS Support, preços: <https://aws.amazon.com/premiumsupport/pricing/>
- [AWS18] AWS Support, fim dos planos antigos: <https://docs.aws.amazon.com/awssupport/latest/user/support-plans-eos.html>; FAQ: <https://aws.amazon.com/premiumsupport/faqs/>
- [AWS19] Amazon EC2 On-Demand: <https://aws.amazon.com/ec2/pricing/on-demand/>; Savings Plans: <https://aws.amazon.com/savingsplans/>; Reserved Instances: <https://aws.amazon.com/ec2/pricing/reserved-instances/>
- [AWS20] Amazon Lightsail, preços: <https://aws.amazon.com/lightsail/pricing/>
- [AWS21] AWS Budgets: <https://aws.amazon.com/aws-cost-management/aws-budgets/>
- [AWS22] SecNumCloud procurado sem resultado em: <https://aws.amazon.com/compliance/bsi-c5/> (a norma só aparece como referência), <https://aws.amazon.com/compliance/programs/>, <https://aws.amazon.com/compliance/europe-digital-sovereignty/faq/>, <https://www.aws.eu/faq/>

**Google Cloud**

- [GCP1] Google Cloud, entidade contratante («Last modified June 30, 2026»): <https://cloud.google.com/terms/google-entity>
- [GCP2] Google Cloud, Sovereign Cloud: <https://cloud.google.com/sovereign-cloud>; Google Distributed Cloud air-gapped: <https://cloud.google.com/distributed-cloud-air-gapped>
- [GCP3] S3NS, disponibilidade geral da PREMI3NS (16/10/2025): <https://www.s3ns.io/en/news/s3ns-cloud-de-confiance-enters-general-availability>; qualificação SecNumCloud (17/12/2025): <https://www.s3ns.io/en/news/premi3ns-secnumcloud-qualification>
- [GCP4] Thales e Google Cloud, nova cloud soberana na Alemanha (20/05/2026): <https://www.googlecloudpresscorner.com/2026-05-20-Thales-Announces-Strategic-Partnership-with-Google-Cloud-to-Launch-a-New-Sovereign-Cloud-in-Germany>
- [GCP5] Google Cloud, «Regions and zones» («Last updated 2026-10-15»): <https://cloud.google.com/compute/docs/regions-zones>; localizações («Last updated October 13, 2026»): <https://cloud.google.com/about/locations>
- [GCP6] Blogue Google Cloud, novas regiões (11/10/2022): <https://cloud.google.com/blog/products/infrastructure/introducing-new-google-cloud-regions>; (19/09/2023): <https://cloud.google.com/blog/products/infrastructure/expanding-cloud-infrastructure-around-the-world>; Turquia (20/11/2025): <https://cloud.google.com/blog/products/infrastructure/new-google-cloud-region-coming-to-turkiye/>
- [GCP7] GKE: <https://cloud.google.com/kubernetes-engine>; Cloud Run: <https://cloud.google.com/run>
- [GCP8] Cloud SQL for PostgreSQL: <https://cloud.google.com/sql/postgresql>; AlloyDB: <https://cloud.google.com/products/alloydb>
- [GCP9] Cloud Run a partir do código («Last updated 2026-10-13»): <https://cloud.google.com/run/docs/deploying-source-code>; deploy contínuo: <https://cloud.google.com/run/docs/continuous-deployment>; App Engine: <https://cloud.google.com/appengine/docs>
- [GCP10] ISO 27001: <https://cloud.google.com/security/compliance/iso-27001>; HDS: <https://cloud.google.com/security/compliance/hds>; certificado HDS (reemitido a 10/03/2026): <https://services.google.com/fh/files/misc/2026_google_cloud_platform_hdsv2_certificate_reissued_v2.pdf>
- [GCP11] Preços de rede (seletor de região Paris e Frankfurt): <https://cloud.google.com/vpc/network-pricing>; nível gratuito («Last updated 2026-10-13»): <https://cloud.google.com/free/docs/free-cloud-features>
- [GCP12] Google for Startups Cloud Program: <https://cloud.google.com/startup>
- [GCP13] Standard Support («Last updated 2026-10-13»): <https://cloud.google.com/support/docs/standard>
- [GCP14] Compute Engine, preços: <https://cloud.google.com/products/compute/pricing>
- [GCP15] Budgets: <https://cloud.google.com/billing/docs/how-to/budgets>; spend caps («Last updated 2026-10-13»): <https://cloud.google.com/billing/docs/how-to/budgets-spend-caps>

**Microsoft Azure**

- [AZ1] Microsoft, «Facts about Microsoft» («As of September 30, 2026»): <https://news.microsoft.com/facts-about-microsoft/>; entidade de faturação (2026-04-29): <https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/mca-understand-your-invoice>
- [AZ2] Microsoft Sovereign Cloud (2026-07-15): <https://learn.microsoft.com/en-us/azure/azure-sovereign-clouds/microsoft-sovereign-cloud>; National Partner Clouds (2026-03-31): <https://learn.microsoft.com/en-us/azure/azure-sovereign-clouds/partner/overview-national-partner-clouds>; anúncio (16/06/2025): <https://blogs.microsoft.com/blog/2025/06/16/announcing-comprehensive-sovereign-solutions-empowering-european-organizations/>; Delos Cloud, notícias: <https://www.deloscloud.de/about-us/news.html>
- [AZ3] Lista de regiões Azure («Last updated 2026-10-13»): <https://learn.microsoft.com/en-us/azure/reliability/regions-list>; segunda região na Dinamarca (12/12/2025): <https://news.microsoft.com/source/emea/features/accelerating-europes-digital-future-microsoft-announces-plans-for-a-new-datacenter-region-in-west-denmark/>
- [AZ4] AKS (2026-06-04): <https://learn.microsoft.com/en-us/azure/aks/what-is-aks>; Container Apps (2026-07-07): <https://learn.microsoft.com/en-us/azure/container-apps/overview>; Container Instances (2026-07-25): <https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview>
- [AZ5] Azure Database for PostgreSQL flexible server (2026-01-09): <https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/overview>; Cosmos DB for PostgreSQL (2026-04-27): <https://learn.microsoft.com/en-us/azure/cosmos-db/postgresql/introduction>
- [AZ6] App Service, Local Git (2025-06-27): <https://learn.microsoft.com/en-us/azure/app-service/deploy-local-git>; deploy contínuo (2025-06-16): <https://learn.microsoft.com/en-us/azure/app-service/deploy-continuous-deployment>
- [AZ7] Bleu, certificações ISO 27001 e HDS V2 (07/09/2026): <https://www.bleucloud.fr/bleu-obtient-les-certifications-iso-iec-27001-et-hebergeur-de-donnees-de-sante-hds-v2/>
- [AZ8] Microsoft, HDS (França) («Last updated 2026-08-17»): <https://learn.microsoft.com/en-us/compliance/regulatory/offering-hds-france>
- [AZ9] Azure, ISO/IEC 27001: <https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-iso-27001>
- [AZ10] Azure, preços de largura de banda: <https://azure.microsoft.com/en-us/pricing/details/bandwidth/>; Azure Retail Prices API (serviço «Bandwidth», regiões francecentral e germanywestcentral, EUR): <https://prices.azure.com/api/retail/prices>
- [AZ11] Microsoft for Startups (2026-05-29): <https://learn.microsoft.com/en-us/startups/overview>
- [AZ12] Azure, planos de suporte: <https://azure.microsoft.com/en-us/support/plans/>
- [AZ13] VMs Linux, preços: <https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/>; Container Apps, preços: <https://azure.microsoft.com/en-us/pricing/details/container-apps/>; Reservations (2026-07-17): <https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations>; savings plan for compute: <https://azure.microsoft.com/en-us/pricing/offers/savings-plan-compute/>
- [AZ14] Budgets (2025-06-26): <https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets>; spending limit (2026-04-29): <https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit>

**Scaleway**

- [SCW1] Scaleway, aviso legal: <https://www.scaleway.com/en/legal-notice/>; iliad, documento de registo universal (30/04/2026), pp. 346 e 364: <https://www.iliad.fr/media/ILIAD_URD_30042026_ENG_834039a832.pdf>
- [SCW2] Scaleway, SecNumCloud: <https://www.scaleway.com/en/security-and-compliance/secnumcloud/>; blogue (05/08/2026): <https://www.scaleway.com/en/blog/secnumcloud-qualification-trusted-cloud/>
- [SCW3] Scaleway, disponibilidade por região: <https://www.scaleway.com/en/product-availability-by-region/>
- [SCW4] Scaleway, comunicado (13/10/2026): <https://www.scaleway.com/en/news/scaleway-scales-up-to-power-europes-ai-ambitions/>
- [SCW5] Kubernetes Kapsule: <https://www.scaleway.com/en/kubernetes-kapsule/>; Serverless Containers: <https://www.scaleway.com/en/serverless-containers/>; Managed Database for PostgreSQL and MySQL: <https://www.scaleway.com/en/managed-postgresql-mysql/>; Serverless SQL Database: <https://www.scaleway.com/en/serverless-sql-database/>
- [SCW6] Scaleway Docs, Functions e contentores («Reviewed on November 25, 2025»): <https://www.scaleway.com/en/docs/serverless-functions/how-to/migrate-functions-to-containers/>; CLI `scw container deploy`: <https://github.com/scaleway/scaleway-cli/blob/master/docs/commands/container.md>
- [SCW7] Scaleway, segurança e conformidade: <https://www.scaleway.com/en/security-and-compliance/>; HDS: <https://www.scaleway.com/en/security-and-compliance/hds/>; Trust Center: <https://security.scaleway.com/>
- [SCW8] Scaleway, preços das Instances: <https://www.scaleway.com/en/pricing/virtual-instances/>; preços de armazenamento: <https://www.scaleway.com/en/pricing/storage/>
- [SCW9] Scaleway Startup Program: <https://www.scaleway.com/en/startup-program/>
- [SCW10] Scaleway, suporte: <https://www.scaleway.com/en/support/>
- [SCW11] Scaleway Docs: FAQ das Instances: <https://www.scaleway.com/en/docs/instances/faq/>; Savings Plans («Reviewed on» 24/09/2026): <https://www.scaleway.com/en/docs/billing/additional-content/understanding-savings-plans/>; Billing Alerts: <https://www.scaleway.com/en/docs/billing/how-to/use-billing-alerts/>
- [SCW12] Scaleway, Dedibox: <https://www.scaleway.com/en/dedibox/>

**OVHcloud**

- [OVH1] OVHcloud, menções legais: <https://www.ovhcloud.com/fr/terms-and-conditions/>
- [OVH2] OVHcloud, condições gerais em português («Versão de 17 de janeiro de 2025»): <https://contract.eu.ovhapis.com/1.0/pdf/contrat_genServices-pt.pdf>
- [OVH3] OVHcloud, qualificação SecNumCloud da SNC Cloud Platform (01/09/2026): <https://corporate.ovhcloud.com/en/newsroom/news/ovhcloud-obtains-secnumcloud-qualification-snc-cloud-platform/>; página da oferta: <https://www.ovhcloud.com/en/solutions/uc-secnumcloud-environment/>
- [OVH4] OVHcloud, SecNumCloud: <https://www.ovhcloud.com/en/compliance/secnumcloud/>; Bare Metal Pod (31/03/2025): <https://corporate.ovhcloud.com/en/newsroom/news/secnumcloud-qualification-bare-metal-pod/>
- [OVH5] OVHcloud, disponibilidade por região: <https://www.ovhcloud.com/en/public-cloud/regions-availability/>
- [OVH6] OVHcloud, regiões: <https://www.ovhcloud.com/en/about-us/global-infrastructure/regions/>; Local Zones: <https://www.ovhcloud.com/en/about-us/global-infrastructure/local-zone/>
- [OVH7] OVHcloud, Berlim 3-AZ (18/11/2025): <https://corporate.ovhcloud.com/en/newsroom/news/3az-berlin/>; resultados do 1.º trimestre FY26 (08/01/2026): <https://corporate.ovhcloud.com/en/newsroom/news/financial-results-q1-fy26/>
- [OVH8] Managed Kubernetes Service: <https://www.ovhcloud.com/en/public-cloud/kubernetes/>; AI Deploy: <https://www.ovhcloud.com/en/public-cloud/ai-deploy/>; PostgreSQL: <https://www.ovhcloud.com/en/public-cloud/postgresql/>
- [OVH9] Fórum da comunidade OVHcloud, fim de vida do Web PaaS (02/10/2024, moderador da OVHcloud): <https://community.ovhcloud.com/t/end-of-life-eol-web-paas/3526>; Git no alojamento web («Last updated: September 25, 2026»): <https://docs.ovhcloud.com/en/guides/web-cloud/web-hosting/git-integration-webhosting>
- [OVH10] OVHcloud, ISO 27001: <https://www.ovhcloud.com/en/compliance/iso-27001-27017-27018/>; HDS: <https://www.ovhcloud.com/en/compliance/hds/>
- [OVH11] OVHcloud, preços do Public Cloud (EUR): <https://www.ovhcloud.com/en-ie/public-cloud/prices/>; Object Storage: <https://www.ovhcloud.com/en-ie/public-cloud/object-storage/>
- [OVH12] OVHcloud Startup Program: <https://startup.ovhcloud.com/en/>
- [OVH13] OVHcloud, suporte Premium: <https://www.ovhcloud.com/en-ie/support-levels/premium/>
- [OVH14] OVHcloud, Savings Plan: <https://www.ovhcloud.com/en/public-cloud/savings-plan/>; VPS: <https://www.ovhcloud.com/fr/vps/>; gestão de projeto e alertas: <https://www.ovhcloud.com/en-ie/public-cloud/project-management/>

**Clever Cloud**

- [CC1] Clever Cloud, aviso legal: <https://www.clever.cloud/legal-notice/>
- [CC2] Clever Cloud, Sovereign Cloud: <https://www.clever.cloud/sovereign-cloud/>; SecNumCloud: <https://www.clever.cloud/secnumcloud-trusted-cloud/>; conformidade: <https://www.clever.cloud/compliance/>
- [CC3] Clever Cloud, referência da CLI (zonas): <https://www.clever.cloud/developers/doc/cli-reference/>; API pública de zonas: <https://api.clever-cloud.com/v4/products/zones>
- [CC4] Clever Kubernetes («September 3, 2026»): <https://www.clever.cloud/developers/doc/deploy/kubernetes/>; aplicações Docker: <https://www.clever.cloud/product/docker-applications/>; PostgreSQL: <https://www.clever.cloud/product/postgresql/>; HDS e «git push»: <https://www.clever.cloud/health-hds/>
- [CC5] Clever Cloud, ISO 27001: <https://www.clever.cloud/iso-27001-security-by-default-at-clever-cloud/>; HDS: <https://www.clever.cloud/health-data-hosting/>
- [CC6] Clever Cloud, blogue sobre tráfego de saída (31/01/2024): <https://www.clever.cloud/blog/company/2024/01/31/object-storage-data-free-of-charge/>; API de preços (Paris, EUR): <https://api.clever-cloud.com/v4/billing/price-system?zone_id=par&currency=EUR>
- [CC7] Clever Cloud, programa UP: <https://www.clever.cloud/up-program/>
- [CC8] Clever Cloud e Clever Cloud Premium: <https://www.clever.cloud/clever-cloud-vs-clever-cloud-premium/>; ajuda («September 11, 2026»): <https://www.clever.cloud/developers/doc/find-help/>
- [CC9] Clever Cloud, preços: <https://www.clever.cloud/pricing/>; consumo («2026-09-15»): <https://www.clever.cloud/developers/doc/account-billing/consumption/>

**Infomaniak**

- [IK1] Infomaniak, aviso legal: <https://www.infomaniak.com/en/legal/legal-notice>
- [IK2] Infomaniak, Infomaniak Foundation (20/05/2026, alterada a 24/08/2026): <https://news.infomaniak.com/en/infomaniak-foundation-sovereign-cloud/>
- [IK3] Infomaniak, Sovereign cloud: <https://www.infomaniak.com/en/sovereign-cloud>
- [IK4] Infomaniak, Public Cloud: <https://www.infomaniak.com/en/hosting/public-cloud>; documentação, regiões: <https://docs.infomaniak.cloud/getting_started/first_project/connect_project/>; datacenters: <https://www.infomaniak.com/en/hosting/datacenter-housing>
- [IK5] Infomaniak, Kubernetes Service: <https://www.infomaniak.com/en/hosting/public-cloud/kubernetes>; lançamento (03/04/2025): <https://news.infomaniak.com/en/launch-service-kubernetes-manage/>
- [IK6] Infomaniak, Jelastic Cloud: <https://www.infomaniak.com/en/hosting/dedicated-and-cloud-servers/jelastic-cloud>
- [IK7] Infomaniak, Database Service: <https://www.infomaniak.com/en/hosting/public-cloud/database>
- [IK8] SecNumCloud procurado sem resultado em: <https://www.infomaniak.com/en/certifications>, <https://www.infomaniak.com/en/trust-center>, <https://www.infomaniak.com/en/sovereign-cloud>; artigo explicativo (22/05/2026): <https://news.infomaniak.com/en/understanding-sovereign-cloud/>
- [IK9] Infomaniak, FAQ 71 («Update 10/13/2026»): <https://www.infomaniak.com/en/support/faq/71/discover-infomaniak>
- [IK10] Infomaniak, certificado ISO/IEC 27001 (SGS CH21/0527.00): <https://www.infomaniak.com/documents/iso/27001_1EN.pdf>; certificações: <https://www.infomaniak.com/en/certifications>
- [IK11] Infomaniak, preços do Public Cloud: <https://www.infomaniak.com/en/hosting/public-cloud/prices>; FAQ 2605 (01/09/2026): <https://www.infomaniak.com/en/support/faq/2605/understanding-public-cloud-billing>
- [IK12] Infomaniak, ofertas especiais: <https://www.infomaniak.com/en/special-offers>
- [IK13] Infomaniak, suporte Premium: <https://www.infomaniak.com/en/support/support-premium>
- [IK14] Infomaniak, VPS Cloud: <https://www.infomaniak.com/en/hosting/vps-cloud>; VPS Lite: <https://www.infomaniak.com/en/hosting/vps-lite>; quotas: <https://docs.infomaniak.cloud/quotas/>; FAQ 2602 (31/08/2026): <https://www.infomaniak.com/en/support/faq/2602/discover-infomaniak-public-cloud>

## Dados (JSON)

Um objeto por facto: `fornecedor`, `campo`, `valor`, `data` (data da página ou do documento oficial; quando a página não tem data, a data de consulta, 2026-10-16), `fonte_url` e `nota`. Os valores repetem as tabelas acima.

```json
[
  {
    "fornecedor": "AWS",
    "campo": "sede",
    "valor": "Seattle, EUA (Amazon.com, Inc.). Na EMEA, contrata a Amazon Web Services EMEA SARL (Luxemburgo).",
    "data": "2026-08-14",
    "fonte_url": "https://aws.amazon.com/agreement/",
    "nota": "Sede confirmada no relatório 10-K do exercício de 2025."
  },
  {
    "fornecedor": "AWS",
    "campo": "ofertas_soberanas",
    "valor": "AWS European Sovereign Cloud: região em Brandenburg (Alemanha), disponível desde janeiro de 2026, numa partição separada.",
    "data": "2026-01-14",
    "fonte_url": "https://aws.amazon.com/blogs/aws/opening-the-aws-european-sovereign-cloud/",
    "nota": "Local Zones soberanas anunciadas em Bruxelas, Amesterdão e Lisboa."
  },
  {
    "fornecedor": "AWS",
    "campo": "regioes_ue",
    "valor": "6: Frankfurt, Irlanda, Milão, Paris, Espanha, Estocolmo.",
    "data": "2026-10-16",
    "fonte_url": "https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html",
    "nota": "Mais a European Sovereign Cloud (Brandenburg). Página sem data; data de consulta."
  },
  {
    "fornecedor": "AWS",
    "campo": "regioes_europa_fora_ue",
    "valor": "2: Londres, Zurique.",
    "data": "2026-10-16",
    "fonte_url": "https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "AWS",
    "campo": "regioes_anunciadas",
    "valor": "Nenhuma região nova na Europa.",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
    "nota": "Local Zones soberanas anunciadas (Bruxelas, Amesterdão, Lisboa) não são regiões."
  },
  {
    "fornecedor": "AWS",
    "campo": "kubernetes_gerido",
    "valor": "Amazon EKS",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/eks/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "AWS",
    "campo": "contentores_serverless",
    "valor": "AWS Fargate (com ECS ou EKS); Amazon ECS Express Mode",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/fargate/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "AWS",
    "campo": "postgresql_gerido",
    "valor": "Amazon RDS for PostgreSQL; Amazon Aurora PostgreSQL",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/rds/postgresql/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "AWS",
    "campo": "paas_git_push",
    "valor": "AWS Elastic Beanstalk (envia-se o código)",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/elasticbeanstalk/",
    "nota": "O App Runner fechou a novos clientes a 30/04/2026. O Amplify Hosting liga-se a Git, mas é para frontends."
  },
  {
    "fornecedor": "AWS",
    "campo": "secnumcloud",
    "valor": "Não: não está na lista da ANSSI e a AWS não anuncia oferta.",
    "data": "2026-10-16",
    "fonte_url": "https://messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf",
    "nota": "Catálogo da ANSSI atualizado a 16/10/2026."
  },
  {
    "fornecedor": "AWS",
    "campo": "hds",
    "valor": "Sim: «AMAZON WEB SERVICES INC», atividades 1 a 6, V2.0, Bureau Veritas.",
    "data": "2026-10-16",
    "fonte_url": "https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies",
    "nota": "A AWS indica HDS v2 desde 21/04/2026; atividades 1, 2 e 6 só nas 6 regiões do EEE."
  },
  {
    "fornecedor": "AWS",
    "campo": "iso_27001",
    "valor": "Sim, ISO/IEC 27001:2022",
    "data": "2026-09-01",
    "fonte_url": "https://aws.amazon.com/compliance/iso-certified/",
    "nota": ""
  },
  {
    "fornecedor": "AWS",
    "campo": "trafego_saida_europa",
    "valor": "100 GB/mês grátis, somados em todas as regiões; depois 0,09 USD/GB nos primeiros 10 TB.",
    "data": "2026-09-16",
    "fonte_url": "https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSDataTransfer/current/eu-west-3/index.json",
    "nota": "Paris (eu-west-3) e Frankfurt (eu-central-1). Sem impostos."
  },
  {
    "fornecedor": "AWS",
    "campo": "creditos_startups",
    "valor": "AWS Activate: até 200 000 USD.",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/startups/credits/",
    "nota": "Nível Portfolio, através de um parceiro Activate; antes da Série B. Página sem data; data de consulta."
  },
  {
    "fornecedor": "AWS",
    "campo": "suporte_primeiro_plano_pago",
    "valor": "Business Support+: 29 USD/mês por conta ou 9 % da fatura, o que for maior.",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/premiumsupport/pricing/",
    "nota": "Developer e Business fechados a novas subscrições desde 02/12/2025."
  },
  {
    "fornecedor": "AWS",
    "campo": "faturacao_pay_as_you_go",
    "valor": "EC2 ao segundo, mínimo 60 s.",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/ec2/pricing/on-demand/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "AWS",
    "campo": "faturacao_compromisso",
    "valor": "Savings Plans e Reserved Instances, até 72 %.",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/savingsplans/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "AWS",
    "campo": "faturacao_preco_fixo_mensal",
    "valor": "Amazon Lightsail, desde 5 USD/mês (3,50 USD só com IPv6), com tráfego incluído.",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/lightsail/pricing/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "AWS",
    "campo": "alertas_gastos",
    "valor": "AWS Budgets: alertas e ações automáticas.",
    "data": "2026-10-16",
    "fonte_url": "https://aws.amazon.com/aws-cost-management/aws-budgets/",
    "nota": "Sem teto rígido documentado."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "sede",
    "valor": "Mountain View, EUA (Google LLC, filial da Alphabet). Em Portugal fatura a Google Cloud EMEA Limited (Dublin); em França, a Google Cloud France (Paris).",
    "data": "2026-06-30",
    "fonte_url": "https://cloud.google.com/terms/google-entity",
    "nota": ""
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "ofertas_soberanas",
    "valor": "Google Cloud Data Boundary; Google Cloud Dedicated (em França, S3NS/Thales, oferta PREMI3NS, disponível desde 16/10/2025; na Alemanha, com a Thales, em pré-visualização desde 20/05/2026); Google Distributed Cloud.",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/sovereign-cloud",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "regioes_ue",
    "valor": "11: Hamina, Estocolmo, Varsóvia, Madrid, St. Ghislain, Frankfurt, Berlim, Eemshaven, Milão, Turim, Paris.",
    "data": "2026-10-15",
    "fonte_url": "https://cloud.google.com/compute/docs/regions-zones",
    "nota": ""
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "regioes_europa_fora_ue",
    "valor": "2: Londres, Zurique.",
    "data": "2026-10-15",
    "fonte_url": "https://cloud.google.com/compute/docs/regions-zones",
    "nota": ""
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "regioes_anunciadas",
    "valor": "Áustria, Atenas e Oslo (anunciadas em 2022 e 2023); Turquia (anunciada a 20/11/2025).",
    "data": "2025-11-20",
    "fonte_url": "https://cloud.google.com/blog/products/infrastructure/new-google-cloud-region-coming-to-turkiye/",
    "nota": "Sem estado mais recente para Áustria, Grécia e Noruega."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "kubernetes_gerido",
    "valor": "Google Kubernetes Engine (GKE), modos Standard e Autopilot",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/kubernetes-engine",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "contentores_serverless",
    "valor": "Cloud Run",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/run",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "postgresql_gerido",
    "valor": "Cloud SQL for PostgreSQL; AlloyDB for PostgreSQL",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/sql/postgresql",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "paas_git_push",
    "valor": "Cloud Run a partir do código-fonte ou de um repositório Git; App Engine",
    "data": "2026-10-13",
    "fonte_url": "https://cloud.google.com/run/docs/deploying-source-code",
    "nota": "App Engine na Europa só em Londres, Bélgica, Zurique, Frankfurt e Varsóvia."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "secnumcloud",
    "valor": "Não em nome do Google. A oferta «Cloud de confiance S3NS», da Thales Cloud Sécurisé, está qualificada (PaaS, CaaS, IaaS) de 17/12/2025 a 17/12/2028.",
    "data": "2025-12-17",
    "fonte_url": "https://messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf",
    "nota": "A S3NS descreve-se como filial da Thales em parceria com a Google Cloud."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "hds",
    "valor": "Sim: «GOOGLE LLC GCP», atividades 1 a 5, V2.0, EY CertifyPoint.",
    "data": "2026-10-16",
    "fonte_url": "https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies",
    "nota": "Certificado reemitido a 10/03/2026, válido até 14/05/2027; atividades 1 e 2 só no EEE."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "iso_27001",
    "valor": "Sim, ISO/IEC 27001:2022",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/security/compliance/iso-27001",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "trafego_saida_europa",
    "valor": "Premium Tier (predefinido): sem volume grátis a partir da Europa, 0,12 USD/GiB de 0 a 1 024 GiB. Standard Tier: 200 GiB/mês grátis, depois 0,085 USD/GiB.",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/vpc/network-pricing",
    "nota": "Paris e Frankfurt, lidos no seletor de região da página. 1 GiB = 1 073 741 824 B. Página sem data; data de consulta."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "creditos_startups",
    "valor": "Google for Startups Cloud Program: até 350 000 USD em 2 anos para startups de IA; até 200 000 USD para as outras.",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/startup",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "suporte_primeiro_plano_pago",
    "valor": "Standard Support: 29 USD/mês ou 3 % da fatura, o que for maior.",
    "data": "2026-10-13",
    "fonte_url": "https://cloud.google.com/support/docs/standard",
    "nota": ""
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "faturacao_pay_as_you_go",
    "valor": "Ao segundo, depois do primeiro minuto.",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/products/compute/pricing",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "faturacao_compromisso",
    "valor": "Committed Use Discounts de 1 ou 3 anos (até 70 %); descontos automáticos por uso contínuo (até 30 %).",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/products/compute/pricing",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "faturacao_preco_fixo_mensal",
    "valor": "Não encontrado",
    "data": "2026-10-16",
    "fonte_url": "https://cloud.google.com/products/compute/pricing",
    "nota": "Procurado também em https://cloud.google.com/free/docs/free-cloud-features."
  },
  {
    "fornecedor": "Google Cloud",
    "campo": "alertas_gastos",
    "valor": "Budgets com alertas; spend cap budgets que param Cloud Run, Cloud Run functions, Gemini API e Agent Platform.",
    "data": "2026-10-13",
    "fonte_url": "https://cloud.google.com/billing/docs/how-to/budgets-spend-caps",
    "nota": ""
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "sede",
    "valor": "Redmond, EUA (Microsoft Corporation). Na EMEA fatura a Microsoft Ireland Operations Limited (Dublin).",
    "data": "2026-09-30",
    "fonte_url": "https://news.microsoft.com/facts-about-microsoft/",
    "nota": "Entidade de faturação em https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/mca-understand-your-invoice."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "ofertas_soberanas",
    "valor": "Microsoft Sovereign Cloud: Sovereign Public Cloud, Sovereign Private Cloud e National Partner Clouds (Bleu em França, Delos Cloud na Alemanha); EU Data Boundary.",
    "data": "2026-07-15",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/azure-sovereign-clouds/microsoft-sovereign-cloud",
    "nota": "Anunciada a 16/06/2025."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "regioes_ue",
    "valor": "13: Austria East, Belgium Central, Denmark East, France Central, France South*, Germany West Central, Germany North*, Italy North, North Europe, Poland Central, Spain Central, Sweden Central, West Europe.",
    "data": "2026-10-13",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/reliability/regions-list",
    "nota": "* acesso restrito a cenários específicos (ex.: recuperação de desastres)."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "regioes_europa_fora_ue",
    "valor": "6: Norway East, Norway West*, Switzerland North, Switzerland West*, UK South, UK West.",
    "data": "2026-10-13",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/reliability/regions-list",
    "nota": "* acesso restrito."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "regioes_anunciadas",
    "valor": "Grécia (2020), Finlândia (2022) e segunda região na Dinamarca (12/12/2025), sem data de abertura.",
    "data": "2025-12-12",
    "fonte_url": "https://news.microsoft.com/source/emea/features/accelerating-europes-digital-future-microsoft-announces-plans-for-a-new-datacenter-region-in-west-denmark/",
    "nota": ""
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "kubernetes_gerido",
    "valor": "Azure Kubernetes Service (AKS), modos Automatic e Standard",
    "data": "2026-06-04",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/aks/what-is-aks",
    "nota": ""
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "contentores_serverless",
    "valor": "Azure Container Apps; Azure Container Instances",
    "data": "2026-07-07",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/container-apps/overview",
    "nota": ""
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "postgresql_gerido",
    "valor": "Azure Database for PostgreSQL flexible server",
    "data": "2026-01-09",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/overview",
    "nota": "O Cosmos DB for PostgreSQL está em retirada."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "paas_git_push",
    "valor": "Azure App Service (Local Git; deploy contínuo a partir de GitHub, Bitbucket ou Azure Repos)",
    "data": "2025-06-27",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/app-service/deploy-local-git",
    "nota": ""
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "secnumcloud",
    "valor": "Não está na lista de qualificados. A Bleu (Orange e Capgemini, serviços Azure) está na lista pública em qualificação (IaaS, PaaS, CaaS).",
    "data": "2026-10-16",
    "fonte_url": "https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/services-de-securite-evalue/solutions-en-cours-de-qualification/prestataires-secnumcloud/",
    "nota": "A Microsoft diz que a Bleu foi «designed to meet SecNumCloud requirements»."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "hds",
    "valor": "Sim: «MICROSOFT CORPORATION», atividades 1 a 6, V2.0, Schellman.",
    "data": "2026-10-16",
    "fonte_url": "https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies",
    "nota": "Certificado HDS v2.0 de outubro de 2025, centros de dados no EEE (https://learn.microsoft.com/en-us/compliance/regulatory/offering-hds-france)."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "iso_27001",
    "valor": "Sim: Azure, Dynamics 365, Power Platform e parte do Microsoft 365.",
    "data": "2023-05-26",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-iso-27001",
    "nota": "Data visível na página: «Last updated 2023-05-26»."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "trafego_saida_europa",
    "valor": "100 GB/mês grátis; depois 0,087 USD/GB (rede da Microsoft) ou 0,08 USD/GB (routing preference Internet) nos 10 TB seguintes.",
    "data": "2026-10-16",
    "fonte_url": "https://azure.microsoft.com/en-us/pricing/details/bandwidth/",
    "nota": "Na Retail Prices API: 0,0766 €/GB em France Central e Germany West Central. Página sem data; data de consulta."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "creditos_startups",
    "valor": "Microsoft for Startups: até 150 000 USD.",
    "data": "2026-05-29",
    "fonte_url": "https://learn.microsoft.com/en-us/startups/overview",
    "nota": "Desbloqueados aos poucos; antes da Série C."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "suporte_primeiro_plano_pago",
    "valor": "Developer: 29 USD/mês.",
    "data": "2026-10-16",
    "fonte_url": "https://azure.microsoft.com/en-us/support/plans/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "faturacao_pay_as_you_go",
    "valor": "VMs com preço à hora, faturadas ao minuto completo; Container Apps e Container Instances ao segundo.",
    "data": "2026-10-16",
    "fonte_url": "https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "faturacao_compromisso",
    "valor": "Azure Reservations (1 ou 3 anos) até 72 %; savings plan for compute até 65 %.",
    "data": "2026-07-17",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations",
    "nota": ""
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "faturacao_preco_fixo_mensal",
    "valor": "Não encontrado",
    "data": "2026-10-16",
    "fonte_url": "https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/",
    "nota": "Procurado também nas páginas do savings plan e das reservas."
  },
  {
    "fornecedor": "Microsoft Azure",
    "campo": "alertas_gastos",
    "valor": "Budgets: só alertas, não param os recursos. O spending limit só existe em subscrições com créditos.",
    "data": "2026-04-29",
    "fonte_url": "https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit",
    "nota": ""
  },
  {
    "fornecedor": "Scaleway",
    "campo": "sede",
    "valor": "Paris, França (Scaleway SAS). O grupo iliad (Paris) tem 99,56 % do capital.",
    "data": "2026-04-30",
    "fonte_url": "https://www.scaleway.com/en/legal-notice/",
    "nota": "Participação do iliad no documento de registo universal de 30/04/2026."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "ofertas_soberanas",
    "valor": "SecNumCloud by Scaleway: zona qualificada a abrir na região de Paris, em qualificação desde 2025.",
    "data": "2026-08-05",
    "fonte_url": "https://www.scaleway.com/en/blog/secnumcloud-qualification-trusted-cloud/",
    "nota": "A Scaleway apresenta toda a cloud como europeia e soberana."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "regioes_ue",
    "valor": "4: Paris, Amesterdão, Varsóvia, Milão (3 zonas cada).",
    "data": "2026-10-13",
    "fonte_url": "https://www.scaleway.com/en/product-availability-by-region/",
    "nota": "Milão confirmada no comunicado de 13/10/2026."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "regioes_europa_fora_ue",
    "valor": "0",
    "data": "2026-10-16",
    "fonte_url": "https://www.scaleway.com/en/product-availability-by-region/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "regioes_anunciadas",
    "valor": "Estocolmo e Frankfurt, para 2027.",
    "data": "2026-10-13",
    "fonte_url": "https://www.scaleway.com/en/news/scaleway-scales-up-to-power-europes-ai-ambitions/",
    "nota": ""
  },
  {
    "fornecedor": "Scaleway",
    "campo": "kubernetes_gerido",
    "valor": "Kubernetes Kapsule (e Kubernetes Kosmos, multi-cloud)",
    "data": "2026-10-16",
    "fonte_url": "https://www.scaleway.com/en/kubernetes-kapsule/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "contentores_serverless",
    "valor": "Serverless Containers (de 0 a 200 instâncias)",
    "data": "2026-10-16",
    "fonte_url": "https://www.scaleway.com/en/serverless-containers/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "postgresql_gerido",
    "valor": "Managed Database for PostgreSQL and MySQL; Serverless SQL Database (só em Paris)",
    "data": "2026-10-16",
    "fonte_url": "https://www.scaleway.com/en/managed-postgresql-mysql/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "paas_git_push",
    "valor": "Não encontrado",
    "data": "2025-11-25",
    "fonte_url": "https://www.scaleway.com/en/docs/serverless-functions/how-to/migrate-functions-to-containers/",
    "nota": "O mais próximo: Serverless Functions (envia-se código) e a CLI que constrói a imagem a partir do código local."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "secnumcloud",
    "valor": "Em qualificação: «Scaleway SecNumCloud (IaaS, PaaS)»; não está na lista de qualificados.",
    "data": "2026-10-16",
    "fonte_url": "https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/services-de-securite-evalue/solutions-en-cours-de-qualification/prestataires-secnumcloud/",
    "nota": ""
  },
  {
    "fornecedor": "Scaleway",
    "campo": "hds",
    "valor": "Sim: «SCALEWAY», atividades 1 a 4, V2.0, BSI.",
    "data": "2026-10-16",
    "fonte_url": "https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies",
    "nota": "A Scaleway indica auditor SGS e o Kapsule nas atividades 1 a 5, só em datacenters em França."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "iso_27001",
    "valor": "Sim, ISO/IEC 27001:2022 (SGS)",
    "data": "2026-10-16",
    "fonte_url": "https://www.scaleway.com/en/security-and-compliance/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "trafego_saida_europa",
    "valor": "Incluído no preço das Instances. Object Storage: 75 GB/mês grátis, depois 0,01 €/GB (Paris).",
    "data": "2026-10-16",
    "fonte_url": "https://www.scaleway.com/en/pricing/virtual-instances/",
    "nota": "«List prices include egress». Preços do Object Storage em https://www.scaleway.com/en/pricing/storage/. Página sem data; data de consulta."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "creditos_startups",
    "valor": "Scaleway Startup Program: até 36 000 €.",
    "data": "2026-10-16",
    "fonte_url": "https://www.scaleway.com/en/startup-program/",
    "nota": "Empresa com menos de 5 anos e menos de 50 trabalhadores. Página sem data; data de consulta."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "suporte_primeiro_plano_pago",
    "valor": "Advanced: 50 €/mês ou 5 % do gasto, o que for maior.",
    "data": "2026-10-16",
    "fonte_url": "https://www.scaleway.com/en/support/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "faturacao_pay_as_you_go",
    "valor": "Instances de CPU à hora (mínimo 60 min); GPU ao minuto.",
    "data": "2025-12-19",
    "fonte_url": "https://www.scaleway.com/en/docs/instances/faq/",
    "nota": ""
  },
  {
    "fornecedor": "Scaleway",
    "campo": "faturacao_compromisso",
    "valor": "Savings Plans (Compute), 12 ou 36 meses, até 25 %.",
    "data": "2026-09-24",
    "fonte_url": "https://www.scaleway.com/en/docs/billing/additional-content/understanding-savings-plans/",
    "nota": ""
  },
  {
    "fornecedor": "Scaleway",
    "campo": "faturacao_preco_fixo_mensal",
    "valor": "Dedibox (servidores dedicados com preço mensal)",
    "data": "2026-10-16",
    "fonte_url": "https://www.scaleway.com/en/dedibox/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Scaleway",
    "campo": "alertas_gastos",
    "valor": "Billing Alerts: só avisos.",
    "data": "2025-09-03",
    "fonte_url": "https://www.scaleway.com/en/docs/billing/how-to/use-billing-alerts/",
    "nota": ""
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "sede",
    "valor": "Roubaix, França (OVH Groupe SA). Em Portugal, o contrato é com a OVH Hosting – Sistemas Informáticos, Unipessoal Lda (Lisboa).",
    "data": "2025-01-17",
    "fonte_url": "https://www.ovhcloud.com/fr/terms-and-conditions/",
    "nota": "Entidade portuguesa nas condições gerais de 17/01/2025."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "ofertas_soberanas",
    "valor": "SNC Cloud Platform (cloud pública SecNumCloud em Gravelines, Roubaix e Strasbourg); Managed VMware vSphere (Hosted Private Cloud); Bare Metal Pod.",
    "data": "2026-09-01",
    "fonte_url": "https://corporate.ovhcloud.com/en/newsroom/news/ovhcloud-obtains-secnumcloud-qualification-snc-cloud-platform/",
    "nota": "Kubernetes e bases de dados na SNC Cloud Platform: «Coming soon»."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "regioes_ue",
    "valor": "7: Gravelines, Roubaix, Strasbourg, Paris (3 zonas), Frankfurt (Limburg), Milão (3 zonas), Varsóvia.",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en/public-cloud/regions-availability/",
    "nota": "Mais 3 regiões SNC em França e 15 Local Zones na UE. Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "regioes_europa_fora_ue",
    "valor": "1: Londres (Erith).",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en/about-us/global-infrastructure/regions/",
    "nota": "Local Zones em Oslo, Zurique e Manchester. Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "regioes_anunciadas",
    "valor": "Berlim (3 zonas), no início de 2027; SNC Cloud Platform em Itália, Alemanha e Polónia.",
    "data": "2026-01-08",
    "fonte_url": "https://corporate.ovhcloud.com/en/newsroom/news/financial-results-q1-fy26/",
    "nota": ""
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "kubernetes_gerido",
    "valor": "Managed Kubernetes Service (MKS)",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en/public-cloud/kubernetes/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "contentores_serverless",
    "valor": "Não encontrado",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en/public-cloud/regions-availability/",
    "nota": "«Serverless — Coming soon» no menu. O AI Deploy corre imagens Docker com escala automática, mas é para IA e só em Gravelines na Europa."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "postgresql_gerido",
    "valor": "Public Cloud Databases for PostgreSQL",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en/public-cloud/postgresql/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "paas_git_push",
    "valor": "Não encontrado",
    "data": "2024-10-02",
    "fonte_url": "https://community.ovhcloud.com/t/end-of-life-eol-web-paas/3526",
    "nota": "O Web PaaS (Platform.sh) deixou de ser vendido a 01/10/2024 e fechou a 31/01/2025 (aviso de um moderador da OVHcloud no fórum)."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "secnumcloud",
    "valor": "Sim, 3 ofertas IaaS: Hosted Private Cloud powered by VMware (28/12/2023 a 29/12/2026); Bare Metal Pod (24/03/2025 a 24/03/2028); SNC Cloud Platform (31/07/2026 a 31/07/2029).",
    "data": "2026-10-16",
    "fonte_url": "https://messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf",
    "nota": "Catálogo da ANSSI atualizado a 16/10/2026."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "hds",
    "valor": "Sim: «OVH GROUPE», atividades 1 a 6, V2.0, BYCYB.",
    "data": "2026-10-16",
    "fonte_url": "https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies",
    "nota": ""
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "iso_27001",
    "valor": "Sim, em todos os datacentres exceto os dos EUA.",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en/compliance/iso-27001-27017-27018/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "trafego_saida_europa",
    "valor": "Incluído no preço das instâncias em todas as localizações, exceto Ásia-Pacífico. Object Storage sem custo de saída.",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en-ie/public-cloud/prices/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "creditos_startups",
    "valor": "OVHcloud Startup Program: até 100 000 € (nível Scale).",
    "data": "2026-10-16",
    "fonte_url": "https://startup.ovhcloud.com/en/",
    "nota": "Nível Scale para startups com Série A ou mais; 10 000 € no nível Start. Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "suporte_primeiro_plano_pago",
    "valor": "Premium: 50 €/mês, com subscrição de 12 meses.",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en-ie/support-levels/premium/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "faturacao_pay_as_you_go",
    "valor": "Ao segundo, mínimo 1 minuto.",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en-ie/public-cloud/prices/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "faturacao_compromisso",
    "valor": "Savings Plans de 12 a 36 meses, até 30 %.",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en/public-cloud/savings-plan/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "faturacao_preco_fixo_mensal",
    "valor": "VPS, desde 3,81 €/mês.",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/fr/vps/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "OVHcloud",
    "campo": "alertas_gastos",
    "valor": "Alerta por email quando a previsão de consumo passa um limite.",
    "data": "2026-10-16",
    "fonte_url": "https://www.ovhcloud.com/en-ie/public-cloud/project-management/",
    "nota": "Sem teto rígido encontrado. Página sem data; data de consulta."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "sede",
    "valor": "Nantes, França (Clever Cloud SAS).",
    "data": "2023-06-07",
    "fonte_url": "https://www.clever.cloud/legal-notice/",
    "nota": "Data visível na página: «Last updated on: 2023-06-07»."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "ofertas_soberanas",
    "valor": "Plataforma apresentada como «Sovereign Cloud»; zona SecNumCloud a pedido na Cloud Temple; Ultimate Sovereignty Clause (junho de 2026); Clever Cloud AirGap.",
    "data": "2026-10-16",
    "fonte_url": "https://www.clever.cloud/sovereign-cloud/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "regioes_ue",
    "valor": "8 zonas: 7 em França (par, parhds, scw, rbx, rbxhds, grahds, fr-north-hds) e Varsóvia (wsw).",
    "data": "2026-10-15",
    "fonte_url": "https://www.clever.cloud/developers/doc/cli-reference/",
    "nota": "Várias zonas estão em datacenters da OVHcloud ou da Scaleway (API https://api.clever-cloud.com/v4/products/zones)."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "regioes_europa_fora_ue",
    "valor": "1 zona: Londres (ldn, na IONOS).",
    "data": "2026-10-15",
    "fonte_url": "https://www.clever.cloud/developers/doc/cli-reference/",
    "nota": ""
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "regioes_anunciadas",
    "valor": "Nenhuma encontrada",
    "data": "2026-10-15",
    "fonte_url": "https://www.clever.cloud/developers/doc/cli-reference/",
    "nota": ""
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "kubernetes_gerido",
    "valor": "Clever Kubernetes Engine (CKE), em beta pública",
    "data": "2026-09-03",
    "fonte_url": "https://www.clever.cloud/developers/doc/deploy/kubernetes/",
    "nota": ""
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "contentores_serverless",
    "valor": "Aplicações Docker com escala automática horizontal e vertical (cada contentor numa VM)",
    "data": "2026-10-16",
    "fonte_url": "https://www.clever.cloud/product/docker-applications/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "postgresql_gerido",
    "valor": "Add-on PostgreSQL (versões 14 a 18)",
    "data": "2026-10-16",
    "fonte_url": "https://www.clever.cloud/product/postgresql/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "paas_git_push",
    "valor": "Sim: git push (produto principal)",
    "data": "2026-10-16",
    "fonte_url": "https://www.clever.cloud/clever-cloud-vs-clever-cloud-premium/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "secnumcloud",
    "valor": "Não está nas listas da ANSSI.",
    "data": "2026-10-16",
    "fonte_url": "https://messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf",
    "nota": "A Clever Cloud diz que a qualificação própria está «em curso» e oferece uma zona na Cloud Temple (qualificada) a pedido."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "hds",
    "valor": "Sim: «CLEVER CLOUD», atividades 1 a 6, V2.0, Bureau Veritas.",
    "data": "2026-10-16",
    "fonte_url": "https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies",
    "nota": "Certificado FR094504 de 20/12/2024, válido até 19/12/2027."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "iso_27001",
    "valor": "Sim, ISO/IEC 27001:2022, válido até 14/03/2027.",
    "data": "2024-03-15",
    "fonte_url": "https://www.clever.cloud/iso-27001-security-by-default-at-clever-cloud/",
    "nota": ""
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "trafego_saida_europa",
    "valor": "Aplicações: sem taxa de saída, segundo a Clever Cloud; sem preço por GB publicado. Cellar: 0,09 €/GB até 10 TB, depois 0,07 €/GB.",
    "data": "2026-10-16",
    "fonte_url": "https://api.clever-cloud.com/v4/billing/price-system?zone_id=par&currency=EUR",
    "nota": "Política descrita em https://www.clever.cloud/blog/company/2024/01/31/object-storage-data-free-of-charge/."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "creditos_startups",
    "valor": "Programa UP: até 10 000 € no primeiro ano.",
    "data": "2026-10-16",
    "fonte_url": "https://www.clever.cloud/up-program/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "suporte_primeiro_plano_pago",
    "valor": "Premium: 490 €/mês mais 1,8 × o consumo, com compromisso de 12 meses.",
    "data": "2026-10-16",
    "fonte_url": "https://www.clever.cloud/clever-cloud-vs-clever-cloud-premium/",
    "nota": "O suporte base está incluído. Página sem data; data de consulta."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "faturacao_pay_as_you_go",
    "valor": "Ao segundo.",
    "data": "2026-10-16",
    "fonte_url": "https://www.clever.cloud/pricing/",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "faturacao_compromisso",
    "valor": "Não encontrado",
    "data": "2026-10-16",
    "fonte_url": "https://www.clever.cloud/pricing/",
    "nota": "Há créditos pré-pagos; o Premium exige 12 meses."
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "faturacao_preco_fixo_mensal",
    "valor": "Não encontrado",
    "data": "2026-10-16",
    "fonte_url": "https://www.clever.cloud/pricing/",
    "nota": ""
  },
  {
    "fornecedor": "Clever Cloud",
    "campo": "alertas_gastos",
    "valor": "Não encontrado",
    "data": "2026-09-09",
    "fonte_url": "https://www.clever.cloud/developers/doc/account-billing/notifications/",
    "nota": "O custo controla-se com o mínimo e o máximo da escala automática; avisos de créditos anunciados para o futuro."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "sede",
    "valor": "Les Acacias (Genebra), Suíça (Infomaniak Network SA).",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/legal/legal-notice",
    "nota": "Desde 13/05/2026, a Infomaniak Foundation tem a maioria dos votos da Infomaniak Group SA. Página sem data; data de consulta."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "ofertas_soberanas",
    "valor": "Sem produto à parte: toda a oferta é apresentada como cloud soberana, controlada na Suíça.",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/sovereign-cloud",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "regioes_ue",
    "valor": "0",
    "data": "2026-10-16",
    "fonte_url": "https://docs.infomaniak.cloud/getting_started/first_project/connect_project/",
    "nota": ""
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "regioes_europa_fora_ue",
    "valor": "2: dc3-a e dc4-a, na Suíça.",
    "data": "2026-10-16",
    "fonte_url": "https://docs.infomaniak.cloud/getting_started/first_project/connect_project/",
    "nota": "Datacenters em Genebra; a cidade da dc4-a não está publicada."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "regioes_anunciadas",
    "valor": "Nenhuma encontrada",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/hosting/public-cloud",
    "nota": ""
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "kubernetes_gerido",
    "valor": "Kubernetes Service («Managed Kubernetes»)",
    "data": "2025-04-03",
    "fonte_url": "https://www.infomaniak.com/en/hosting/public-cloud/kubernetes",
    "nota": "Lançado em self-service a 03/04/2025."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "contentores_serverless",
    "valor": "Não encontrado",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/hosting/dedicated-and-cloud-servers/jelastic-cloud",
    "nota": "O Jelastic Cloud corre contentores Docker com escala automática vertical e horizontal."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "postgresql_gerido",
    "valor": "Ainda não: o Database Service só tem MySQL; PostgreSQL está «Available soon».",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/hosting/public-cloud/database",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "paas_git_push",
    "valor": "Jelastic Cloud (deploy por Git ou SVN)",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/hosting/dedicated-and-cloud-servers/jelastic-cloud",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "secnumcloud",
    "valor": "Não está nas listas da ANSSI e a Infomaniak não anuncia oferta.",
    "data": "2026-10-16",
    "fonte_url": "https://messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf",
    "nota": ""
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "hds",
    "valor": "Não: sem resultados na lista da ANS.",
    "data": "2026-10-13",
    "fonte_url": "https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies",
    "nota": "FAQ da Infomaniak de 13/10/2026: «there are no plans to become a certified Health Data Host (HDS)»."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "iso_27001",
    "valor": "Sim, ISO/IEC 27001:2022 (SGS, Infomaniak Group SA), válido até 29/03/2027.",
    "data": "2024-03-30",
    "fonte_url": "https://www.infomaniak.com/documents/iso/27001_1EN.pdf",
    "nota": ""
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "trafego_saida_europa",
    "valor": "Incluído nas instâncias Public Cloud. Armazenamento de objetos: 10 TB/mês grátis por organização, depois CHF 0,009/GB.",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/hosting/public-cloud/prices",
    "nota": "Regiões suíças; preços em CHF. Página sem data; data de consulta."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "creditos_startups",
    "valor": "Não encontrado",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/special-offers",
    "nota": "Só há uma oferta de teste para qualquer cliente: CHF 300 de créditos durante 3 meses."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "suporte_primeiro_plano_pago",
    "valor": "Support Plus: desde CHF 50/mês.",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/support/support-premium",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "faturacao_pay_as_you_go",
    "valor": "À hora, com fatura mensal.",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/hosting/public-cloud/prices",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "faturacao_compromisso",
    "valor": "Não encontrado no Public Cloud.",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/hosting/vps-cloud",
    "nota": "Os VPS Cloud têm desconto no pagamento anual (11 %) ou trimestral (7 %)."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "faturacao_preco_fixo_mensal",
    "valor": "VPS Cloud (desde CHF 38,41/mês, pagamento anual) e VPS Lite (desde CHF 2,70/mês, compromisso anual).",
    "data": "2026-10-16",
    "fonte_url": "https://www.infomaniak.com/en/hosting/vps-cloud",
    "nota": "Página sem data; data de consulta."
  },
  {
    "fornecedor": "Infomaniak",
    "campo": "alertas_gastos",
    "valor": "Quota packs: limites de recursos por projeto. Alertas de orçamento não encontrados.",
    "data": "2026-10-16",
    "fonte_url": "https://docs.infomaniak.cloud/quotas/",
    "nota": ""
  }
]
```
