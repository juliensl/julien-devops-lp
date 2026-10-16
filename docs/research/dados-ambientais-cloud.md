# Que dados ambientais publicam os fornecedores cloud?

> Pesquisa do ticket [«Que dados ambientais publicam os fornecedores cloud?»](https://github.com/juliensl/julien-devops-lp/issues/44) (mapa [«Mapa: spec da landing page e da pipeline»](https://github.com/juliensl/julien-devops-lp/issues/4)). Fontes consultadas a **16/10/2026**.
> Este documento **não classifica** os fornecedores nem escolhe o «mais ecológico». Junta os valores publicados, com o ano, o âmbito e o método de cada um. A decisão de publicar estes dados na página é do Julien: hoje a página não repete afirmações sobre os centros de dados dos fornecedores (linha 20 de [«Que informações do Julien entram nas secções?»](https://github.com/juliensl/julien-devops-lp/issues/25)).
> **Marcas:** um valor sem marca foi publicado pela fonte citada. **[calc]** marca um valor calculado por mim a partir de valores publicados.
> **Unidades:** tCO2e = toneladas de CO2 equivalente; Mt = milhões de toneladas. gCO2e/kWh = gramas de CO2e por kWh de eletricidade. O PUE não tem unidade. O WUE está em litros por kWh de energia IT (L/kWh).

## Pergunta

Que dados ambientais verificáveis publicam AWS, Google Cloud, Microsoft Azure, Scaleway, OVHcloud, Clever Cloud e Infomaniak? Para cada fornecedor:

- eficiência dos centros de dados (PUE);
- eletricidade renovável e o método de contagem;
- emissões ou intensidade carbónica;
- consumo de água (WUE), se for publicado;
- ferramentas de cálculo da pegada para clientes;
- objetivos publicados.

Indicar sempre o ano, o âmbito e a metodologia de cada valor. Que dados públicos servem para um estimador de pegada (intensidade carbónica da eletricidade por país, consumo por vCPU)?

Contexto considerado:

- alimenta a página «Ecologia» do protótipo de [«Qual a direção visual?»](https://github.com/juliensl/julien-devops-lp/issues/8): uma comparação entre fornecedores e um estimador de pegada com cursores;
- só fontes verificáveis: relatórios e documentação oficiais dos fornecedores, bases de dados públicas (Ember, EEA) e a metodologia Cloud Carbon Footprint (CCF);
- glossário (`CONTEXT.md`): a expressão é «alojamento com menor impacto ambiental». Evitar «servidor ecológico», «alojamento verde» e «alojamento responsável».

## Resumo

- **Edições usadas** (as mais recentes a 16/10/2026):
  - AWS: «2025 Amazon Sustainability Report» e o resumo da AWS, julho de 2026, dados de 2025 [AWS1][AWS2];
  - Google: «2026 Environmental Report», junho de 2026, dados de 2025 [G1];
  - Microsoft: «2026 Environmental Sustainability Report» e «2026 Environmental Data Fact Sheet», julho de 2026, ano fiscal FY25 (julho de 2024 a junho de 2025) [M1][M2];
  - OVHcloud: documento de registo universal (URD) FY2025, novembro de 2025, dados de setembro de 2024 a agosto de 2025 [O1]. Os dados FY2026 ainda não saíram;
  - Scaleway: «Impact Report 2025», setembro de 2025, dados de 2024 [S2];
  - Infomaniak: «Impact Report 2024» e inventário de gases com efeito de estufa (GEE) de 2024, publicado em 2026 [I1][I3];
  - Clever Cloud: nenhum relatório. Só páginas do site, com valores sem ano nem método [C1]–[C3].
- **PUE.** Todos publicam um valor, mas o âmbito muda:
  - AWS 1,14 (2025, todos os centros da AWS);
  - Google 1,09 (2025, centros próprios);
  - Microsoft 1,17 (FY25, centros próprios);
  - OVHcloud 1,24 (FY2025, os 9 centros geridos pela OVHcloud);
  - Scaleway 1,375 (2024, todos os centros usados, incluindo os de terceiros);
  - Infomaniak 1,085 (2024, centros próprios em Genebra);
  - Clever Cloud: «<1,2 PUE for some of our DCs», sem dizer quais, sem ano nem método.
- **Eletricidade renovável.** Quase todos dizem 100 %, mas contam de maneiras diferentes:
  - AWS e Google: correspondência anual em volume, ao nível da empresa inteira;
  - Google: também mede o CFE horário (eletricidade sem carbono, hora a hora, em cada rede): 65 % em 2025;
  - Microsoft: 100 % de eletricidade renovável «direta» em FY25, correspondência anual ao nível da empresa, sem certificados comprados no mercado à vista;
  - OVHcloud: REF de 100 % (norma ISO/IEC 30134-3), com contratos de compra de energia (PPA) e certificados;
  - Scaleway: 100 % com garantias de origem;
  - Infomaniak: 100 % com produtos certificados do distribuidor de Genebra (SIG) e solar própria;
  - Clever Cloud: sem percentagem.
- **Emissões.**
  - AWS, Google e Microsoft só publicam totais da empresa inteira, não da cloud.
  - O scope 2 location-based (média da rede) e o market-based (com certificados) dão valores muito diferentes: AWS 21,82 contra 3,74 Mt; Google 15,15 contra 2,82 Mt; Microsoft 12,03 contra 2,71 Mt; OVHcloud 58 087 contra 9 981 t.
  - A Scaleway só publica location-based (18 284 t em 2024). A Infomaniak publica 2 124,8 t em 2024. Clever Cloud: não encontrado.
- **Água (WUE).** AWS 0,12 L/kWh (2025, água retirada); OVHcloud 0,34 (FY2025); Scaleway 0,222 (2024, média de 5 centros); Infomaniak 0,0145 (2023); Microsoft 0,27 (FY25, água de arrefecimento e humidificação). A Google não publica o WUE de 2025. Clever Cloud: não encontrado.
- **Ferramentas para clientes:**
  - AWS Sustainability console, que substituiu o Customer Carbon Footprint Tool a 30/06/2026;
  - Google Cloud Carbon Footprint;
  - Azure carbon optimization, no portal do Azure (o Emissions Impact Dashboard sai a 31/03/2027);
  - OVHcloud Environmental Impact Tracker;
  - Scaleway Environmental Footprint Calculator (carbono e água);
  - Infomaniak: CO2 anual na fatura, só para alojamento web e email;
  - Clever Cloud: nenhuma encontrada.
- **Por região europeia:** a Google publica o CFE e a intensidade da rede por região (2025); a AWS publica o PUE e o WUE por região (2025); a OVHcloud e a Scaleway publicam por centro de dados. A Microsoft só publica o PUE e o WUE da EMEA e a eletricidade e a água por cidade.
- **Estimador.**
  - Ember 2025, por país, em ciclo de vida: de 28 gCO2e/kWh (Noruega) a 591 (Polónia) [E2].
  - A EEA só conta emissões diretas e só cobre a UE-27 (2024) [E4].
  - Coeficientes do CCF: 0,74 a 3,5 W por vCPU (AWS), 0,392 W por GB de memória, PUE por defeito 1,135 (AWS), 1,1 (Google Cloud) e 1,185 (Azure), vida útil de 4 anos [CCF1][CCF3].
  - A página e o código do CCF não dão os mesmos valores para a Google Cloud e o Azure.
- **Não são comparáveis** porque mudam o ano (2023 a 2025, anos civis ou fiscais), o âmbito (empresa, centros de dados, cloud), o método (anual ou horário, location-based ou market-based) e a fonte dos fatores de emissão. A secção 3 explica.

## 1. Visão geral

Valores publicados. «—» quer dizer não publicado ou não encontrado (ver a secção de cada fornecedor).

| Fornecedor | Ano dos dados | PUE | Eletricidade renovável | Scope 2 location / market (tCO2e) | WUE (L/kWh) | Ferramenta para clientes |
|---|---|---|---|---|---|---|
| AWS | 2025 | 1,14 (AWS, global) | 100 % (Amazon, anual) | 21 820 000 / 3 740 000 (Amazon) | 0,12 (retirada) | AWS Sustainability console |
| Google Cloud | 2025 | 1,09 (centros próprios) | 100 % anual; 65 % CFE horário (Google) | 15 148 700 / 2 815 000 (Alphabet) | — | Cloud Carbon Footprint |
| Microsoft Azure | FY25 (jul. 2024–jun. 2025) | 1,17 (centros próprios) | 100 % «direta» (Microsoft, anual) | 12 030 556 / 2 707 428 (Microsoft) | 0,27 | Azure carbon optimization |
| Scaleway | 2024 | 1,375 (todos os centros usados) | 100 % (garantias de origem) | 3 155 / — | 0,222 (5 centros) | Environmental Footprint Calculator |
| OVHcloud | FY2025 (set. 2024–ago. 2025) | 1,24 (9 centros geridos) | REF 100 % | 58 087 / 9 981 | 0,34 | Environmental Impact Tracker |
| Clever Cloud | sem ano | «< 1,2» em alguns centros | — | — | — | — |
| Infomaniak | 2024 (água: 2023) | 1,085 (centros próprios) | 100 % (certificados SIG + solar) | — (total 2024: 2 124,8) | 0,0145 | CO2 na fatura (web e email) |

## 2. Por fornecedor

### 2.1 AWS

Fontes principais: «2025 Amazon Sustainability Report» e «Amazon Sustainability Report 2025 – AWS Summary», publicados em julho de 2026, dados de 1/1 a 31/12/2025 [AWS1][AWS2].

- **PUE.**
  - Global: 1,14 em 2025 (1,15 em 2022, 2023 e 2024). Âmbito: centros de dados da AWS no mundo [AWS2 p. 6][AWS3].
  - Europa: 1,11 em 2025 [AWS3][AWS4].
  - Método: energia total do edifício a dividir pela energia IT, segundo a ISO/IEC 30134-2 e a EN 50600-4-2, calculado de minuto a minuto. Só entram regiões com 12 meses de operação [AWS5 p. 2][AWS3].
- **Eletricidade renovável.**
  - 100 % em 2025, pelo terceiro ano seguido. Âmbito: **toda a Amazon**, não só a AWS [AWS2 p. 6]. Verificação limitada da EY [AWS7].
  - Método: correspondência anual em volume. Conta os projetos da Amazon (PPA, solar no local, tarifas verdes) e a parte renovável da rede local. Retira certificados por cada MWh (RECs nos EUA, garantias de origem na UE) [AWS6 p. 2–3].
  - A compra pode ser noutra rede: "In certain cases, we may procure renewable energy in other locations" [AWS6 p. 3].
  - Em 2026, a Amazon está a deixar os certificados avulsos (unbundled RECs). Por isso, as emissões market-based de algumas regiões da América do Norte e da Índia sobem [AWS11].
- **Emissões de toda a Amazon em 2025** (retalho, logística, dispositivos e AWS) [AWS1 p. 46][AWS8][AWS9]:
  - scope 1: 15,37 Mt;
  - scope 2 market-based: 3,74 Mt;
  - scope 2 location-based: 21,82 Mt (só na declaração de verificação da EY);
  - scope 3 market-based: 61,74 Mt; location-based: 66,20 Mt (declaração da Apex);
  - total market-based: 80,85 Mt, mais 16 % do que em 2024;
  - intensidade: 112,8 gCO2e por dólar de receita.
  - Não há valores só da AWS.
- **Água.**
  - WUE: 0,12 L/kWh em 2025 (0,15 em 2024). Mede a água **retirada** por kWh de carga IT, não a água consumida [AWS2 p. 8][AWS3].
  - Europa: 0,05 L/kWh em 2025 [AWS3].
  - Objetivo «water positive» (devolver mais água do que a retirada) dos centros da AWS até 2030: 75 % atingidos em 2025 [AWS2 p. 8].
- **Ferramenta para clientes: AWS Sustainability console** [AWS12]. Substituiu o Customer Carbon Footprint Tool (CCFT), descontinuado a 30/06/2026. Usa os mesmos dados e o mesmo método [AWS11].
  - Âmbitos: scope 1, scope 2 (location-based e market-based) e parte do scope 3: hardware e edifícios (incorporado), combustíveis e energia a montante, transporte a montante.
  - Detalhe: por região, por serviço (EC2, S3 e CloudFront à parte; o resto em «Other») e por conta. Mensal, desde janeiro de 2022. Cada mês sai até ao dia 21 do mês seguinte.
  - Também mostra a água retirada por cliente, só por ano.
  - Método (Model 3.0, outubro de 2025, com verificação limitada da Apex) [AWS10]:
    - conta só as emissões que suportam o serviço: centros da AWS e locais CloudFront;
    - scope 2 calculado por região e por mês;
    - emissões incorporadas repartidas ao longo da vida: 6 anos para os servidores, 50 anos para os edifícios;
    - repartição em cadeia: região → racks → serviços → contas de clientes;
    - os meses são recalculados depois da verificação anual.
- **Objetivos:**
  - net zero em 2040 (The Climate Pledge) [AWS2 p. 6];
  - 100 % de eletricidade renovável: atingido em 2023, 2024 e 2025 [AWS1 p. 5];
  - centros da AWS «water positive» em 2030.
- **Regiões europeias, 2025** [AWS3][AWS4]:

| Região | PUE | WUE (L/kWh) |
|---|---|---|
| Frankfurt (eu-central-1) | 1,24 | 0,17 |
| Irlanda (eu-west-1) | 1,10 | 0,02 |
| Londres (eu-west-2) | 1,23 | 0,14 |
| Paris (eu-west-3) | 1,35 | não publicado |
| Espanha (eu-south-2) | 1,06 | 0,12 |
| Estocolmo (eu-north-1) | 1,09 | 0,02 |
| Milão, Zurique | não publicado | não publicado |

- As 8 regiões europeias (Irlanda, Frankfurt, Londres, Paris, Estocolmo, Milão, Zurique, Espanha) estão na lista de regiões com eletricidade 100 % correspondida em 2025. A página diz 25 regiões, mas a lista tem 24 nomes [AWS3].
- A intensidade carbónica por região não é publicada. O guia da consola manda usar fatores de rede públicos [AWS12].

### 2.2 Google Cloud

Fonte principal: «Google 2026 Environmental Report», junho de 2026, dados de 1/1 a 31/12/2025, com verificação limitada por terceiros [G1][G2].

- **PUE.**
  - Frota: 1,09 em 2025 (1,10 de 2021 a 2023, 1,09 em 2024). Âmbito: campus de centros de dados da Google, geridos pela Google. Medido durante todo o ano, com todas as perdas [G2 p. 15, 87, 95].
  - Últimos 12 meses no 2.º trimestre de 2026: 1,09 [G3].
- **Eletricidade.**
  - CFE horário: cerca de 65 % em 2025, para centros de dados e escritórios (66 % em 2024) [G2 p. 72, 94].
  - Método do CFE: em cada hora e em cada rede, soma a eletricidade sem carbono dos contratos da Google (até ao consumo dessa hora) e a da rede. Dados horários da Electricity Maps [G2 p. 87][G4].
  - 100 % de correspondência anual com compras renováveis, pelo nono ano seguido. É anual e global: "by procuring larger amounts of wind energy in Europe, we compensate for our lack of renewable energy purchases in the Asia-Pacific region" [G2 p. 4–5, 87].
- **Emissões de toda a Alphabet em 2025** [G2 p. 90]:
  - scope 1: 86 100 t;
  - scope 2 location-based: 15 148 700 t; market-based: 2 815 000 t;
  - scope 3 (alinhado com o GHG Protocol): 15 946 000 t;
  - total alinhado com o GHG Protocol: 18 847 100 t;
  - total «ambition-based» (a métrica que a Google usa para o objetivo; tira algumas categorias do scope 3): 14 473 100 t, mais 18 % do que em 2024 e mais 81 % do que em 2019.
  - Eletricidade dos centros de dados em 2025: 42 415 800 MWh [G2 p. 93].
- **Água.**
  - O WUE de 2025 não é publicado no relatório.
  - Consumo de água em 2025: 10 869 milhões de galões (centros de dados: 10 523) [G2 p. 96].
  - Reposição: 78 % da água doce consumida, com o objetivo de 120 % em 2030 [G2 p. 78].
- **Ferramenta para clientes: Google Cloud Carbon Footprint** [G5].
  - Âmbitos: scope 1, scope 2 (location-based e market-based) e scope 3 (equipamento incorporado em 4 anos, edifícios em 20 anos, deslocações do pessoal, perdas na rede, combustíveis a montante).
  - Detalhe: por conta de faturação, projeto, serviço, região e mês. Exportação para BigQuery. Atraso até 21 dias.
  - Método:
    - repartição da energia de cada máquina, hora a hora, pelo uso de CPU, memória e disco, mais as perdas do PUE;
    - location-based: fatores horários da Electricity Maps; market-based: fatores anuais da IEA, ajustados à energia renovável da região;
    - "has not been third-party verified or assured" [G5].
- **Objetivos** [G2 p. 72–78]:
  - net zero em todas as operações e na cadeia de valor até 2030;
  - menos 50 % das emissões dos scopes 1, 2 (market-based) e 3 até 2030, face a 2019 (validado pela SBTi em 2025);
  - CFE 24/7 em todas as redes até 2030;
  - repor 120 % da água doce consumida até 2030.
- **Campus europeus (PUE anual de 2025)** [G2 p. 95]: St. Ghislain (Bélgica) 1,08; Eemshaven (Países Baixos) 1,07; Hamina (Finlândia) 1,10; Dublin (Irlanda) 1,08; Fredericia (Dinamarca) 1,07. Não há PUE publicado para os outros países.
- **CFE por rede europeia, 2025** [G2 p. 94]: Bélgica 79 %; Dinamarca 92 %; Finlândia 98 %; Alemanha 70 %; Irlanda 60 %; Países Baixos 82 %; Reino Unido 75 %.
- **Regiões europeias da Google Cloud, 2025** [G6][G7]:

| Região | Local | CFE da Google | Intensidade da rede (gCO2e/kWh) |
|---|---|---|---|
| europe-central2 | Varsóvia | 81 % | 498,57 |
| europe-north1 | Finlândia | 98 % | 29,84 |
| europe-north2 | Estocolmo | 100 % | 19,39 |
| europe-southwest1 | Madrid | 87 % | 95,75 |
| europe-west1 | Bélgica | 79 % | 126,43 |
| europe-west2 | Londres | 75 % | 109,39 |
| europe-west3 | Frankfurt | 70 % | 275,81 |
| europe-west4 | Eemshaven (Países Baixos) | 82 % | 194,35 |
| europe-west6 | Zurique | 97 % | 21,2 |
| europe-west8 | Milão | 79 % | 202,03 |
| europe-west9 | Paris | 96 % | 15,83 |
| europe-west10 | Berlim | 70 % | 275,81 |
| europe-west12 | Turim | 79 % | 202,03 |

- O CSV tem também `europe-west5`, com o local «N/A» (70 %, 275,81). A página da documentação não a mostra [G7].
- A intensidade é "the average operational gross emissions per unit of energy from the grid", com dados da Electricity Maps [G6]. A página não diz se é ciclo de vida ou só emissões diretas.
- O CFE da região inclui os contratos da Google. Por isso Varsóvia tem 81 % de CFE com uma rede a 499 g.

### 2.3 Microsoft Azure

Fontes principais: «2026 Environmental Sustainability Report» e «2026 Environmental Data Fact Sheet», publicados em julho de 2026 [M1][M2]. Os dados são do ano fiscal FY25, de 1/7/2024 a 30/6/2025. A Deloitte fez uma revisão limitada da secção 1 do fact sheet [M2].

- **PUE.**
  - Global: 1,17 em FY25 (1,16 em FY24) [M1 p. 23][M3].
  - Europa, Médio Oriente e África (EMEA): 1,16 em FY25 [M3].
  - Âmbito: "datacenters that Microsoft fully owns and controls and that were operational for 12 months at the time of calculation". Os centros alugados ficam fora [M3].
  - Método: energia total do centro a dividir pela energia usada para computação [M3].
  - Os novos centros sem água no arrefecimento vão ter um PUE mais alto: "Replacement of evaporative systems with mechanical cooling will increase our power usage effectiveness (PUE)" [M5].
- **Eletricidade.**
  - 100 % de eletricidade renovável «direta» em FY25 (78 % em FY24). Âmbito: toda a Microsoft, correspondência anual [M2 p. 6, tabela 6].
  - Método: produção no local, PPA, produtos de energia verde, outros contratos de longo prazo e a parte renovável da rede, a dividir pelo consumo total [M2 p. 6].
  - Não conta certificados comprados no mercado à vista ("spot"). A Microsoft deixou de os comprar em fevereiro de 2025 e deixou de publicar a antiga percentagem de eletricidade renovável [M2 p. 10].
  - Eletricidade correspondida por contratos e produção própria: 34 534 392 MWh, para 37 026 353 MWh consumidos [M2 p. 6, tabela 5]. São 93,3 % **[calc]**; o resto vem da parte renovável da rede.
  - Contratos: até 40 GW em 26 países, dos quais 19 GW já a funcionar [M1 p. 22].
  - O objetivo «100/100/0» para 2030 (100 % do consumo, 100 % do tempo, com compras sem carbono) aparece na página de eficiência [M3], mas não no relatório de 2026. Não há valor horário publicado.
- **Emissões de toda a Microsoft em FY25** [M2 p. 3–5]:
  - scope 1: 170 887 t;
  - scope 2 location-based: 12 030 556 t;
  - scope 2 market-based: 2 707 428 t (259 090 t em FY24). Subiu porque a Microsoft deixou os certificados spot;
  - scope 3: 18 243 000 t segundo o GHG Protocol; 17 412 000 t segundo os critérios da Microsoft (desconta certificados de combustíveis sustentáveis e de eletricidade renovável em algumas categorias);
  - total: 21 121 000 t segundo o GHG Protocol; 20 290 000 t segundo os critérios da Microsoft, o valor de destaque do relatório, mais 25 % do que em FY24 [M1 p. 30];
  - EMEA, scope 2: 2 535 347 t location-based e 623 832 t market-based [M2 p. 5].
  - Face à base de 2020 (12 881 000 t), o total segundo os critérios da Microsoft subiu 57,5 % **[calc]**. A Microsoft não publica esta percentagem.
- **Água.**
  - WUE: 0,27 L/kWh em FY25 (0,30 em FY24), centros próprios. Mede a água usada na humidificação e no arrefecimento, por kWh IT [M1 p. 24][M3].
  - EMEA: 0,03 L/kWh em FY25 [M3].
  - Centros sem água no arrefecimento: novo projeto desde agosto de 2024; os primeiros centros entram em funcionamento a partir do fim de 2027 [M5].
- **Ferramentas para clientes.**
  - **Azure carbon optimization**, no portal do Azure [M6]:
    - âmbitos: "Scope 1, Scope 2 Market, and Scope 3". Não encontrei a opção location-based;
    - detalhe: subscrição, grupo de recursos, recurso, tipo de recurso e região; mensal; últimos 12 meses; exportação em CSV e API REST.
  - **Emissions Impact Dashboard for Azure** (Power BI): scopes 1, 2 e 3. "Effective March 31, 2027, the Emissions Impact Dashboard for Azure hosted by Power BI will be retired" [M7].
  - Método [M8][M9]:
    - segue o GHG Protocol; o scope 3 conta só o hardware (servidores e rede), não o edifício;
    - os scopes 1 e 2 são modelados por centro de dados, com a eficiência, os fatores da rede e as compras de renovável (na prática, market-based);
    - o hardware é repartido por 6 anos;
    - a parte de cada cliente segue o uso, medido pelo custo normalizado ("the normalized cost metric");
    - os resultados "will differ from those reflected in Microsoft's corporate disclosure".
- **Objetivos** [M1 p. 8][M2 p. 9]:
  - carbon negative em 2030;
  - remover até 2050 todas as emissões históricas desde 1975;
  - water positive e zero resíduos em 2030;
  - WUE 40 % mais baixo em 2030, face a 2022 [M1 p. 24];
  - 100 % de eletricidade renovável direta em 2025: atingido em FY25.
- **Regiões europeias.**
  - Não há PUE, WUE nem percentagem renovável por região do Azure para FY25. As fichas por região de 2023 já não estão em linha [M4].
  - O fact sheet de 2026 dá a eletricidade e a água retirada por cidade, só para centros próprios [M2 p. 25, tabela 15]:

| Cidade (país) | Eletricidade FY25 (MWh) | Água retirada FY25 (milhões de litros) |
|---|---|---|
| Dublin (Irlanda) | 1 308 581 | 18 |
| Hollands Kroon (Países Baixos) | 1 291 170 | 46 |
| Gävle – Sandviken (Suécia) | 704 549 | 14 |
| Varsóvia (Polónia) | 82 613 | 2 |
| Milão (Itália) | 46 989 | 6 |
| Malmö (Suécia) | 41 681 | 1 |
| Copenhaga (Dinamarca) | 29 964 | 3 |
| Madrid (Espanha) | 22 588 | 15 |
| Viena (Áustria) | 13 849 | 4 |

- Paris, Frankfurt, Londres, Zurique e Oslo não aparecem nessa tabela.

### 2.4 Scaleway

Fonte principal: «Impact Report 2025», publicado a 16/09/2025, com dados de 2024 [S2]. Não encontrei um relatório com dados de 2025.

- **PUE.**
  - Média de 2024: 1,375, para todos os centros usados (os da Opcore em Paris e os de terceiros em Amesterdão e Varsóvia) [S2 p. 25]. A página do site arredonda para 1,37 [S1].
  - Histórico: 2019 1,434; 2020 1,415; 2021 1,398; 2022 1,403; 2023 1,367 [S2 p. 26].
  - Método: ISO/IEC 30134-2 [S2 p. 27]. O relatório não diz como faz a média: 1,375 não é a média simples (1,395) nem a média pesada pela eletricidade (1,297) **[calc]**.
  - Os centros DC2, DC3 e DC5 publicam o PUE em tempo real e o dos últimos 12 meses. A 16/10/2026: DC2 1,43; DC3 1,45; DC5 1,18. Quem publica é a Opcore, que gere esses centros (auditor: BSI) [S3].
- **Por centro de dados, 2024** [S2 p. 25][S1]:

| Centro (operador) | Zona | PUE | WUE (L/kWh) | Eletricidade (MWh) |
|---|---|---|---|---|
| DC2 (Opcore) | fr-par-1 | 1,45 | 0,009 | 7 368 |
| DC3 (Opcore) | fr-par-1 | 1,39 | 0,00009 | 14 845 |
| DC4 (Opcore) | fr-par-3 | 1,44 | 0,00002 | 8 241 |
| DC5 (Opcore) | fr-par-2 | 1,25 | 0,25 | 94 171 |
| AMS1 (Iron Mountain) | nl-ams-1 | 1,38 | 0,850 | 5 292 |
| AMS2 (Interxion) | nl-ams-2 | 1,40 | — | 696 |
| AMS3 (Equinix) | nl-ams-3 | 1,40 | — | 174 |
| WAW1 (Equinix) | pl-waw-1 | 1,50 | — | 434 |
| WAW2 (3S) | pl-waw-2 | 1,24 | — | 969 |
| WAW3 (Atman) | pl-waw-3 | 1,50 | — | 691 |

- A ligação de DC4 a fr-par-3 é dedução minha (o PUE coincide com a tabela da calculadora [S4]).
- **Eletricidade.** 100 % renovável com garantias de origem: eólica ou hídrica em Paris e Amesterdão, eólica em Varsóvia [S1][S2 p. 22]. A Scaleway tem PPA, mas não os conta, "in accordance with ADEME guidelines" [S5].
- **Emissões de 2024, location-based, GHG Protocol** [S2 p. 24]:
  - scope 1: 63 t;
  - scope 2: 3 155 t;
  - scope 3: 15 066 t, dos quais 13 387 t dos servidores;
  - total: 18 284 t, mais 46 % do que em 2023.
  - Na p. 22 aparece «118,284». A soma dos três scopes dá 18 284 **[calc]**: é provavelmente uma gralha.
  - O scope 2 market-based não é publicado.
- **Água.** WUE médio de 0,222 L/kWh em 2024, só para os 4 centros franceses e o AMS1. Os outros centros "do not provide us with this data" [S2 p. 25]. Método: ISO/IEC 30134-9 [S2 p. 28].
- **Ferramenta para clientes: Environmental Footprint Calculator**, na consola (Cost & Impact Management) [S5].
  - Dá carbono (kgCO2e) e água (m³). Não encontrei energia em kWh.
  - Detalhe: diário, por projeto, região ou zona, serviço e categoria. Relatórios mensais e anuais em PDF. Dados desde 01/10/2024.
  - Produtos: instâncias CPU e GPU, Elastic Metal, Apple silicon, Block Storage, Object Storage, Kubernetes, Load Balancers, bases de dados geridas, Generative APIs, Dedibox (só na consola). Serverless e VPC ainda não.
  - Método [S5][S4]:
    - segue o referencial da ADEME para centros de dados e cloud, feito com a consultora IJO; conta o fabrico e a utilização;
    - fabrico repartido pelo tempo de uso: 6 anos para o hardware, 25 para o edifício, 10 para a rede (dados da ADEME e da Boavizta);
    - utilização = potência × PUE × fator da rede, location-based, com fatores da Ember (kgCO2e/kWh): França 0,044; Países Baixos 0,253; Polónia 0,615; Itália 0,284;
    - água = energia × WUE, só em FR-PAR-1/2/3 e NL-AMS-1;
    - o fabrico das GPU não entra no Elastic Metal nem na Dedibox: os valores ficam "underestimated".
  - Há uma API autenticada e uma API pública do catálogo de produtos com uma estimativa de carbono e água por produto e por zona [S7].
- **Objetivos.** Os do grupo iliad, validados pela SBTi, base 2022, market-based: scope 1+2 menos 60 % até 2030 e menos 90 % até 2050; scope 3 menos 46 % até 2030 e menos 90 % até 2050 [S2 p. 21][S6]. A Scaleway não tem objetivo numérico próprio.
- **Por zona** (valores da calculadora) [S4]: fr-par-1 PUE 1,45 / WUE 0,009; fr-par-2 1,16 / 0,25; fr-par-3 1,44 / 0,001; nl-ams-1 1,38 / 0,85; nl-ams-2 1,4; nl-ams-3 1,2; pl-waw-1 1,50; pl-waw-2 1,24; pl-waw-3 1,5.
- **Valores que não batem certo entre fontes da própria Scaleway:**
  - PUE do DC5: 1,25 no relatório, 1,16 na calculadora, 1,18 nos últimos 12 meses da Opcore;
  - WUE do AMS1: 0,850 no relatório e na calculadora, 1,64 no site;
  - PUE do AMS3: 1,40 no relatório, 1,2 no site e na calculadora.

### 2.5 OVHcloud

Fonte principal: documento de registo universal (URD) FY2025, publicado a 14/11/2025. O ano fiscal vai de 1/9/2024 a 31/8/2025. A declaração de sustentabilidade (CSRD) tem verificação limitada da KPMG [O1]. Os dados FY2026 ainda não saíram (resultados anuais a 20/10/2026).

- **PUE.**
  - Grupo: 1,24 em FY2025 (1,26 em FY2024, 1,29 em FY2023). Âmbito: os 9 centros geridos pela OVHcloud, sem Beauharnois BHS1-7. A medição cobre 91 % da fatura de energia [O1 p. 73].
  - Método: ISO/IEC 30134-2, categoria 2 (categoria 1 em Roubaix 1–2, Hillsboro e Vint Hill).
  - A Apave reviu o PUE, o WUE, o REF e o CUE segundo a ISO/IEC 30134 [O2 p. 2].
- **Eletricidade.**
  - REF (fator de energia renovável): 100 % em FY2025 (92 % em FY2024). Âmbito: centros próprios geridos pela OVHcloud [O1 p. 73].
  - Método: ISO/IEC 30134-3, com PPA de longo prazo e certificados (garantias de origem, RECs nos EUA, REGOs no Reino Unido). O nuclear não conta [O1 p. 108].
  - PPA: França 40 GWh/ano e Alemanha 25 GWh/ano desde 1/1/2025; Polónia 5 GWh/ano a partir de 2026 [O1 p. 73].
  - O objetivo mudou: em FY2024 era «100 % low-carbon energy by 2025 (renewable, nuclear and hydroelectric)» [O6 p. 29]; em FY2025 é «100% renewable electricity supply by 2025» [O1 p. 73].
- **Emissões (GHG Protocol, controlo operacional, todo o grupo)** [O1 p. 78–79]:

| tCO2e | 2022 (base) | FY2024 | FY2025 |
|---|---|---|---|
| Scope 1 | 1 338 | 1 928 | 1 325 |
| Scope 2 location-based | 53 625 | 62 132 | 58 087 |
| Scope 2 market-based | 53 625 | 19 276 | 9 981 |
| Scope 3 (market-based) | 112 504 | 105 924 | 101 557 |
| Total location-based | 167 467 | 173 406 | 158 748 |
| Total market-based | 167 467 | 127 128 | 112 863 |

- Fatores de rede: Electricity Maps.
- CUE (intensidade carbónica por kWh IT) do grupo em FY2025: 0,13 kgCO2e/kWh location-based e 0,00 market-based [O1 p. 169].
- **Água.** WUE de 0,34 L/kWh em FY2025 (0,37 em FY2024). O objetivo de 0,32 não foi atingido. Método: ISO/IEC 30134-9, categoria 1; toda a água retirada conta como consumida [O1 p. 83, 112].
- **Ferramenta para clientes: Environmental Impact Tracker** (antes «Carbon Calculator») [O3][O4].
  - No painel de cliente («My carbon footprint») ou pela API (`/me/carbonCalculator`).
  - Produtos: servidores dedicados e Eco, VMware on OVHcloud, instâncias Public Cloud (desde 2025), Block Storage (desde 12/2025). Ainda não: 3-AZ, Local Zones e centros nos EUA.
  - Detalhe: mensal, por categoria, gama e centro de dados; CSV por servidor. Até 24 meses para trás.
  - Âmbitos: scopes 1, 2 e 3 («Manufacturing + Electricity + Operations»).
  - Método [O3]:
    - fabrico calculado por servidor a partir das peças (fatores da IJO, 2022), repartido em 5 anos;
    - eletricidade: potência do servidor a 100 % de carga, 24 h por dia, × PUE real do centro (1,6 se não for medido) × fator da rede; mostra location-based e market-based;
    - operações: o resto do balanço da empresa, repartido por igual pelos servidores dos clientes;
    - a IJO e a Cost House certificaram o método em 2024, só para Bare Metal e Hosted Private Cloud [O5].
- **Objetivos (SBTi, aprovados em novembro de 2024)** [O1 p. 70]:
  - scope 1+2: menos 73,4 % em valor absoluto até FY2030, face a 2022. Em FY2025 já estava em menos 79,4 %;
  - scope 3: menos 52 % por unidade de valor acrescentado até 2030;
  - nenhum ano de net zero encontrado.
- **Centros europeus, FY2025** [O2 p. 1][O1 p. 169]:

| Centro | PUE | WUE (L/kWh) | CUE location-based (kgCO2e/kWh IT) |
|---|---|---|---|
| Roubaix (FR) | 1,30 | 0,29 | 0,03 |
| Gravelines (FR) | 1,21 | 0,20 | 0,02 |
| Estrasburgo (FR) | 1,19 | 0,39 | 0,02 |
| Erith (UK) | 1,19 | 0,18 | 0,13 |
| Limburg (DE) | 1,19 | 0,21 | 0,33 |
| Varsóvia / Ożarów (PL) | 1,25 | 0,42 | 0,80 |

- Milão é uma «Local Zone» sem PUE publicado [O3 p. 11].

### 2.6 Clever Cloud

Não encontrei relatório ambiental, balanço de emissões nem objetivos. Os valores abaixo estão em páginas do site, **sem ano nem método**.

- **PUE.**
  - Página Green IT: «< 1,2 PUE for some of our DCs», sem dizer quais [C1].
  - Página de compromissos: «Our partner datacentres achieve PUE levels below 1.3» [C2]. Os dois valores não coincidem.
  - Por centro de dados [C3]: Greendata Nanterre «< 1.3»; nLighten Aubervilliers «1.6»; Scaleway DC5 «1.2»; OVHcloud Roubaix RBX-5 «1.2»; OVHcloud Gravelines GRA-1 «1.2»; OVHcloud Varsóvia WAW-1 «< 1.2». Telehouse TH2 e TH3, Etix Vélizy e Ionos Londres sem valor.
- **Eletricidade.** Sem percentagem. «most of it uses low-carbon energy» [C1]; «we prioritise low-carbon energy sources» [C2].
- **Emissões, WUE, objetivos:** não encontrados.
- **Ferramenta para clientes:** não encontrada. A documentação de métricas só tem CPU, memória, disco, rede e HTTP [C6].
- **Onde corre** (API oficial de zonas) [C4]:
  - Paris (`par`): servidores da Clever Cloud em centros de terceiros, entre eles o Greendata [C5][C3];
  - Paris (`scw`): na Scaleway;
  - Roubaix, Gravelines, Varsóvia, Montreal, Singapura, Sydney: na OVHcloud;
  - Londres: na Ionos.
- Muitas zonas correm nos centros da OVHcloud e da Scaleway. Os dados dessas zonas estão nas secções 2.4 e 2.5.

### 2.7 Infomaniak

Fontes principais: «Impact Report 2024» (versão web e PDF) e o inventário de GEE de 2024 feito pela myclimate/ecoLive, datado de 16/03/2026 [I1][I2][I3].

- **PUE.**
  - 1,085 em 2024, média anual medida, todos os centros da Infomaniak [I1][I2 p. 20].
  - Centro D4 (Genebra): PUE médio de 1,09, segundo o comunicado de 28/01/2025 [I5 p. 4].
  - Os centros ficam em Genebra e são próprios. A morada exata não é publicada [I10].
- **Eletricidade.** 100 % renovável em 2024 [I2 p. 17]:
  - 38 % de energia certificada Naturemade Star (pequena hídrica e solar);
  - 56 % de hídrica certificada TÜV SÜD EE01;
  - 6 % de solar própria.
  - Fator market-based usado: o do distribuidor SIG, 11,7 gCO2e/kWh [I3 p. 5].
  - A página de certificados, sem data, dá outra divisão: 60 % hídrica TÜV SÜD EE01 e 40 % Naturemade Star [I8].
- **Emissões.**
  - 2024: total de 2 124,8 tCO2e, menos 31,4 % do que em 2023 (sem a construção do D4) [I3 p. 5][I4].
  - Scopes 1 e 2 juntos: 43,5 t. O resto é scope 3 (97,95 %). O hardware pesa 1 820,0 t (85,7 %) [I3].
  - 2024 não tem scope 2 location-based e market-based separados.
  - 2023, como publicado no Impact Report: scope 1 39,6 t; scope 2 location-based 2,1 t; market-based 717,6 t; scope 3 3 081 t [I2 p. 11]. O total de 2023 foi recalculado depois: 3 099,4 t, ou 5 061,3 t com a construção do D4 [I3 p. 5].
  - Método: myclimate, Ecoinvent, ISO 14069 [I3 p. 20–21].
  - Compensação: a Infomaniak diz compensar 200 % das emissões desde 2018 [I9][I2 p. 12]. É compensação, não redução.
- **Água.** WUE de 0,0145 L/kWh IT em 2023, com 186,8 m³ de água [I2 p. 13]. A versão web arredonda para 0,015 [I1].
- **Calor do D4.**
  - Projeto a plena carga: 1,7 MW (14,9 GWh por ano) para a rede de aquecimento de Genebra [I5 p. 1].
  - Em 2024, 65 % da eletricidade do D4 foi convertida em calor; ERE médio de 0,231 [I1][I2 p. 21].
  - A API pública do D4 mostra o PUE e o calor entregue em tempo real [I6].
- **Ferramenta para clientes.** Desde 2024, a fatura anual mostra o CO2 do alojamento web e do email [I2 p. 8]. Método: impacto do hardware (ResilioDB) e eletricidade medida por sondas IPMI, convertida a 11,77 gCO2e/kWh; repartido por site ou por caixa de correio [I7]. Não encontrei API.
- **Objetivos.** Submeter a trajetória à SBTi até 2030; recuperar 100 % do calor de todos os centros (sem data) [I2 p. 8]. Não encontrei ano de net zero nem percentagem de redução.

## 3. Porque é que os valores não são comparáveis

- **Ano.**
  - AWS e Google: ano civil de 2025.
  - Microsoft: ano fiscal de julho de 2024 a junho de 2025.
  - OVHcloud: ano fiscal de setembro de 2024 a agosto de 2025.
  - Scaleway e Infomaniak: 2024 (a água da Infomaniak é de 2023).
  - Clever Cloud: sem ano.
- **Âmbito.**
  - As emissões e a eletricidade renovável da AWS, da Google e da Microsoft são da empresa inteira (retalho, logística, escritórios, dispositivos), não da cloud.
  - O PUE e o WUE são dos centros de dados, mas cada um conta centros diferentes: só os próprios (Google, Microsoft, Infomaniak), os geridos (OVHcloud), todos os usados incluindo os de terceiros (Scaleway).
  - A escala é muito diferente: 80,85 Mt da Amazon contra 2 124,8 t da Infomaniak. Um total maior não diz nada sobre a pegada de cada cliente.
- **Método da eletricidade renovável.**
  - Correspondência anual em volume (AWS, Google): o total do ano iguala o consumo, mas pode haver horas e redes sem renovável. A compra pode ser noutra região.
  - CFE horário por rede (Google): mede hora a hora e dá um valor mais baixo (65 %).
  - REF da ISO/IEC 30134-3 (OVHcloud), garantias de origem (Scaleway), produtos certificados do distribuidor (Infomaniak).
- **Scope 2 location-based ou market-based.** O location-based usa a média da rede; o market-based desconta os certificados e os contratos. A diferença chega a 5 ou 6 vezes (AWS, Google, OVHcloud). A Scaleway só publica location-based.
- **Fatores de emissão.** Electricity Maps (Google, OVHcloud), IEA e EPA (inventário da Google), Ember (calculadora da Scaleway), fator do distribuidor SIG (Infomaniak). Cada fonte dá valores diferentes para o mesmo país.
- **PUE.** Média anual (quase todos), últimos 12 meses (Google, Opcore), tempo real (Opcore, D4) ou valor de projeto. A ISO/IEC 30134-2 tem categorias de medição diferentes. Alguns centros novos ficam fora até terem 12 meses de dados (AWS, Google).
- **WUE.** A AWS conta a água **retirada**. A Microsoft conta a água de humidificação e de arrefecimento. A OVHcloud conta toda a água retirada como consumida. A Google publica o consumo total, sem WUE. Os denominadores também mudam (kWh IT ou kWh total).
- **Séries com quebras.** O scope 2 market-based da Microsoft multiplicou-se por 10 em FY25 porque deixou os certificados spot. A Amazon está a deixar os certificados avulsos em 2026. A Infomaniak recalculou o total de 2023. Só se pode comparar dentro da mesma edição.
- **Verificação.** A Amazon (EY, Apex), a Google, a Microsoft (Deloitte), a OVHcloud (KPMG, Apave) e a Infomaniak (myclimate/ecoLive) têm verificação ou revisão externa, com níveis diferentes. A Clever Cloud não publica nenhuma.

## 4. Dados para o estimador

### 4.1 Intensidade carbónica da eletricidade por país

**Ember** (ficheiro «Yearly electricity data – Global», modificado a 06/10/2026, linha «Total generation», coluna «Emissions intensity (gCO2e/kWh)») [E1][E2]:

- **ciclo de vida:** "These figures aim to include full lifecycle emissions including upstream methane, supply chain and manufacturing emissions, and include all gases, converted into CO2 equivalent over a 100-year timescale" [E3 p. 15–16];
- **produção, não consumo:** multiplica a produção de cada fonte por um fator de emissão. Não conta as importações [E3];
- 2025 é o último ano do ficheiro. Os anos recentes podem ser estimados a partir de dados mensais e o ficheiro é atualizado duas vezes por mês [E3].

**EEA** (indicador «Greenhouse gas emission intensity of electricity generation», publicado a 10/07/2026) [E4][E5]:

- **só emissões diretas:** "the ratio of CO2 emissions from electricity generation and gross electricity generation". O nuclear e as renováveis contam zero, e a biomassa não conta;
- só a UE-27 (não tem a Suíça, o Reino Unido nem a Noruega);
- 2024 é uma estimativa antecipada. Os valores por país são inteiros.

| País | Ember 2025 | Ember 2024 | EEA 2024 | EEA 2023 |
|---|---|---|---|---|
| França | 41,224 | 40,337 | 36 | 47 |
| Alemanha | 334,117 | 339,873 | 291 | 316 |
| Países Baixos | 253,664 | 250,768 | 245 | 255 |
| Irlanda | 263,289 | 270,750 | 237 | 255 |
| Bélgica | 151,262 | 126,931 | 155 | 150 |
| Polónia | 590,814 | 608,464 | 566 | 595 |
| Suécia | 35,400 | 34,908 | 6 | 7 |
| Finlândia | 57,242 | 66,905 | 27 | 33 |
| Suíça | 39,077 | 34,561 | — | — |
| Itália | 284,431 | 281,435 | 206 | 248 |
| Espanha | 153,459 | 146,258 | 125 | 140 |
| Reino Unido | 218,207 | 216,473 | — | — |
| Áustria | 116,605 | 103,457 | 53 | 59 |
| Dinamarca | 99,887 | 132,167 | 64 | 83 |
| Noruega | 28,050 | 29,643 | — | — |
| Portugal | 127,800 | 110,620 | 82 | 115 |
| UE-27 | 210,596 | 211,644 | 183,44 | 205,65 |

Em gCO2e/kWh (Ember) e gCO2/kWh (EEA). As duas colunas medem coisas diferentes e não se podem misturar. A diferença é maior onde há biomassa, nuclear ou hídrica (Suécia, Finlândia, Áustria).

Outras fontes de intensidade por região, já citadas:

- Google Cloud publica a intensidade de cada região (média anual de dados horários da Electricity Maps) [G6][G7];
- a calculadora da Scaleway usa fatores da Ember [S4].

### 4.2 Coeficientes do Cloud Carbon Footprint (CCF)

O CCF é uma ferramenta de código aberto (Thoughtworks). O repositório mudou para `cloud-carbon-footprint/cloud-carbon-footprint`, não está arquivado e a última versão («release-2026-04-23») saiu a 23/04/2026 [CCF3][CCF4]. Li o código no commit `f584c549ee`.

**Fórmula** [CCF1]:

- "Operational emissions = (Cloud provider service usage) x (Cloud energy conversion factors [kWh]) x (Cloud provider Power Usage Effectiveness (PUE)) x (grid emissions factors [metric tons CO2e])";
- "Average Watts = Min Watts + Avg vCPU Utilization * (Max Watts - Min Watts)";
- "Compute Watt-Hours = Average Watts * vCPU Hours".

| Coeficiente | AWS | Google Cloud | Azure | Unidade |
|---|---|---|---|---|
| Watts mínimos por vCPU (código) | 0,74 (média) | 0,68 (mediana) | 0,74 (média) | W |
| Watts máximos por vCPU (código) | 3,5 | 4,11 | 3,54 | W |
| Watts mínimos / máximos na página | 0,74 / 3,5 | 0,71 / 4,26 | 0,78 / 3,76 | W |
| Memória | 0,000392 | 0,000392 | 0,000392 | kWh por GB-hora (0,392 W/GB) |
| SSD | 1,2 | 1,2 | 1,2 | Wh por TB-hora |
| HDD | 0,65 | 0,65 | 0,65 | Wh por TB-hora |
| Rede (entre centros) | 0,001 | 0,001 | 0,001 | kWh por GB |
| PUE por defeito | 1,135 | 1,1 (europe-west1 1,09; europe-west4 1,07; europe-north1 1,09) | 1,185 | — |
| Utilização média de CPU por defeito | 50 | 50 | 50 | % |
| Vida útil de um servidor | 35 040 | 35 040 | 35 040 | horas (4 anos) |

- **Fontes no código:** `packages/aws/src/domain/AwsFootprintEstimationConstants.ts`, `packages/gcp/src/domain/GcpFootprintEstimationConstants.ts` e `packages/azure/src/domain/AzureFootprintEstimationConstants.ts` [CCF3].
- **Watts por vCPU.** Os valores acima servem quando não se conhece o processador. Para cada família de processador há valores próprios, tirados do SPECpower [CCF1].
- **Memória.** Na AWS e no Azure, só se aplica à memória acima da que os valores do SPECpower já incluem [CCF3].
- **PUE.** "In the case of AWS, we have made a conservative guess based on public information" [CCF1]. Para o Azure, a página cita uma declaração da Microsoft: 1,185 para a frota e 1,125 para os projetos mais recentes. O apêndice da página mostra 1,125; o código usa 1,185.
- **Utilização de 50 %:** "a projected estimate for the average server utilization of servers in hyperscale data centers in 2020 of 50%, from the 2016 U.S. Data Center Energy Usage Report" [CCF1].
- **Emissões incorporadas (fabrico)** [CCF2]:
  - fórmula da Green Software Foundation: "M = TE * (TR/EL) * (RR/TR)". Ou seja: emissões do servidor × (horas usadas ÷ vida útil) × (vCPU da instância ÷ vCPU da maior instância da família);
  - vida útil de 4 anos, "based on the Dell PowerEdge R740 Full Life Cycle Assessment";
  - valores por tipo de instância, em tCO2e por servidor, a partir dos dados da Teads e da Boavizta;
  - só para a computação.
- **Fatores de rede do CCF para a Europa** [CCF1][CCF3]:
  - são antigos: "averages over a given year that is pre-2023";
  - alguns são cópias: AWS Londres usa o valor da Irlanda e AWS Zurique o de Frankfurt;
  - para o estimador, a tabela da secção 4.1 é mais recente.

### 4.3 Exemplo de cálculo **[calc]**

Só para mostrar a ordem de grandeza. 1 vCPU da AWS, 730 horas (um mês), utilização de 50 %, sem memória nem fabrico:

- potência média: 0,74 + 0,5 × (3,5 − 0,74) = 2,12 W;
- energia: 2,12 W × 730 h = 1,548 kWh; com o PUE de 1,135: 1,757 kWh;
- emissões com a intensidade Ember 2025: França 72 g; Suécia 62 g; Irlanda 463 g; Alemanha 587 g; Polónia 1 038 g de CO2e.

O mesmo vCPU dá valores 14 vezes diferentes conforme o país. A intensidade da rede pesa mais do que o PUE neste cálculo.

## Limites

- **Data.** Fontes consultadas a 16/10/2026. Os relatórios mudam todos os anos e a Ember atualiza o ficheiro duas vezes por mês.
- **Cloud contra empresa.** A AWS, a Google e a Microsoft não publicam emissões só da cloud. Não fiz estimativas para as separar.
- **Leitura dos PDF.** Os relatórios foram lidos com extração de texto. O relatório da Infomaniak é feito de imagens e foi lido página a página. Pode haver erros de leitura nas tabelas.
- **Contradições nas próprias fontes.** Listadas em cada fornecedor (Scaleway, OVHcloud, Clever Cloud, AWS, Infomaniak). Indiquei sempre de onde vem cada valor.
- **Não verifiquei:** o painel da SBTi (usei o que os fornecedores dizem), o registo de balanços de GEE da ADEME, nem as afirmações contra medições independentes.
- **Intensidade da rede.** É uma média anual da produção do país. Não é marginal nem horária e não conta as importações.
- **CCF.** É uma estimativa por modelo, não uma medição. Alguns valores da página não coincidem com o código.
- **Microsoft.** As fichas por região do Azure (2023) já não estão em linha. Não usei cópias de arquivo nem valores que só apareciam em resumos de motores de pesquisa.

## Pontos em aberto para o Julien e para «Qual a direção visual?»

Nada disto está decidido.

- **Publicar ou não.** Hoje a página não repete afirmações sobre os centros de dados dos fornecedores (#25, linha 20). Mostrar estes valores na página «Ecologia» é uma decisão do Julien.
- **Fonte do estimador.** Ember (ciclo de vida, tem a Suíça, o Reino Unido e a Noruega) ou EEA (só emissões diretas, só a UE-27)?
- **Coeficientes.** Valores do código do CCF ou da página?
- **Scope 2.** Mostrar location-based, market-based, ou os dois?
- **Datas e fontes na página.** Como mostrar o ano, o âmbito e a fonte de cada número sem sobrecarregar a página?
- **Clever Cloud.** Sem dados próprios: mostrar os do centro onde corre (OVHcloud, Scaleway) ou «não publicado»?

## Como foi feita a pesquisa

- **Divisão.** Um agente de pesquisa por fornecedor (AWS, Google, Microsoft, Scaleway, OVHcloud, Clever Cloud com Infomaniak) e um para a intensidade da rede e o CCF.
- **Fontes.** Só relatórios, páginas e documentação oficiais, a API oficial de zonas da Clever Cloud, a API do D4 da Infomaniak, os ficheiros da Ember e da EEA e o código do CCF. As fontes secundárias (imprensa, agregadores) foram ignoradas, salvo onde está indicado.
- **Ficheiros.** Cada download ficou numa pasta própria e nada dele foi executado. Os PDF foram convertidos em texto com bibliotecas Python. O relatório da Infomaniak foi lido como imagens.
- **Ember.** O CSV foi lido com Python (`csv`), linha «Total generation» de cada país, coluna «Emissions intensity (gCO2e/kWh)». Confirmei que emissões ÷ produção dá a intensidade publicada **[calc]**.
- **Verificação.** Confirmei por amostragem os números principais nos ficheiros descarregados:
  - tabela de emissões da Google (p. 90) e CSV das regiões;
  - tabela de emissões da Amazon, declaração da EY e CSV de PUE e WUE da AWS;
  - tabelas 1A, 5, 6 e 15 do fact sheet da Microsoft e página de eficiência (PUE e WUE);
  - quadros do URD da OVHcloud;
  - emissões e PUE do relatório da Scaleway;
  - inventário de 2024 e página de impacto da Infomaniak;
  - CSV da Ember e constantes do código do CCF;
  - estado do repositório do CCF (API do GitHub).

## Fontes

Todas consultadas a 16/10/2026.

**AWS**

- [AWS1] Amazon, «2025 Amazon Sustainability Report» (julho de 2026): <https://sustainability.aboutamazon.com/2025-amazon-sustainability-report.pdf>
- [AWS2] Amazon, «Amazon Sustainability Report 2025 – AWS Summary»: <https://sustainability.aboutamazon.com/2025-aws-summary.pdf>
- [AWS3] Amazon Sustainability, «AWS Cloud» (PUE e WUE por região, regiões com eletricidade correspondida): <https://sustainability.aboutamazon.com/products-services/aws-cloud>
- [AWS4] CSV de PUE e WUE por região: <https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv>
- [AWS5] «PUE Methodology» (03/12/2024): <https://sustainability.aboutamazon.com/pue-methodology.pdf>
- [AWS6] «Renewable Energy Methodology» (julho de 2026): <https://sustainability.aboutamazon.com/renewable-energy-methodology.pdf>
- [AWS7] EY, verificação da eletricidade renovável de 2025: <https://sustainability.aboutamazon.com/2025-renewable-energy-assurance.pdf>
- [AWS8] EY, verificação dos scopes 1 e 2 de 2025: <https://sustainability.aboutamazon.com/2025-ghg-assurance-scope-1-2.pdf>
- [AWS9] Apex, verificação do scope 3 de 2025: <https://sustainability.aboutamazon.com/2025-ghg-assurance-scope-3.pdf>
- [AWS10] «AWS Customer Carbon Footprint Methodology», Model 3.0 (outubro de 2025): <https://sustainability.aboutamazon.com/aws-customer-carbon-footprint-tool-methodology.pdf>
- [AWS11] Notas de versão do Customer Carbon Footprint Tool: <https://docs.aws.amazon.com/ccft/latest/releasenotes/what-is-ccftrn.html>
- [AWS12] AWS Sustainability console, guia do utilizador: <https://docs.aws.amazon.com/sustainability/latest/userguide/>

**Google**

- [G1] Google, «2026 Environmental Report» (página): <https://sustainability.google/reports/google-2026-environmental-report/>
- [G2] Google, «2026 Environmental Report» (PDF, 117 páginas): <https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf>
- [G3] Google Data Centers, «Efficiency»: <https://datacenters.google/efficiency/>
- [G4] Google, metodologia do CFE 24/7: <https://www.gstatic.com/gumdrop/sustainability/247-carbon-free-energy.pdf>
- [G5] Google Cloud, «Carbon Footprint» e metodologia: <https://cloud.google.com/carbon-footprint/docs> e <https://cloud.google.com/carbon-footprint/docs/methodology>
- [G6] Google Cloud, «Carbon free energy for Google Cloud regions»: <https://cloud.google.com/sustainability/region-carbon>
- [G7] GitHub, `GoogleCloudPlatform/region-carbon-info`, dados de 2025: <https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv>

**Microsoft**

- [M1] Microsoft, «2026 Environmental Sustainability Report» (julho de 2026): <https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/2026-Microsoft-Environmental-Sustainability-Report-PDF.pdf> (ligação curta oficial: <https://aka.ms/SustainabilityReport2026>)
- [M2] Microsoft, «2026 Environmental Data Fact Sheet»: <https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/2026-Microsoft-Environmental-Data-Fact-Sheet-PDF.pdf> (ligação curta oficial: <https://aka.ms/SustainabilityFactsheet2026>)
- [M3] Microsoft Datacenters, «Efficiency» (PUE e WUE por macrorregião): <https://datacenters.microsoft.com/sustainability/efficiency/>
- [M4] Microsoft Datacenters, mapa das regiões (sem fichas de sustentabilidade europeias): <https://datacenters.microsoft.com/globe/>
- [M5] Microsoft, «Sustainable by design: Next-generation datacenters consume zero water for cooling» (09/12/2024): <https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/>
- [M6] Microsoft Learn, «Carbon optimization in Azure»: <https://learn.microsoft.com/en-us/azure/carbon-optimization/overview> e <https://learn.microsoft.com/en-us/azure/carbon-optimization/view-emissions>
- [M7] Microsoft Learn, «Connect to the Emissions Impact Dashboard for Azure»: <https://learn.microsoft.com/en-us/power-bi/connect-data/service-connect-to-emissions-impact-dashboard>
- [M8] Microsoft Learn, metodologia de cálculo das emissões do Azure: <https://learn.microsoft.com/en-us/power-bi/connect-data/azure-emissions-calculation-methodology>
- [M9] Microsoft, «A new approach for Scope 3 emissions transparency» (2021): <https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/microsoft-scope-3-emissions.pdf>

**Scaleway**

- [S1] Scaleway, «Environmental leadership»: <https://www.scaleway.com/en/environmental-leadership/> (FR: <https://www.scaleway.com/fr/leadership-environnemental/>)
- [S2] Scaleway, «Impact Report 2025» (dados de 2024): <https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf>
- [S3] Opcore, painéis de PUE: <https://pue.dc2.opcore.eu/en/>, <https://pue.dc3.opcore.eu/en/>, <https://pue.dc5.opcore.eu/en/>
- [S4] Scaleway Docs, «Calculation values reference»: <https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/>
- [S5] Scaleway Docs, «Environmental Footprint Calculator» (metodologia): <https://www.scaleway.com/en/docs/environmental-footprint/additional-content/environmental-footprint-calculator/>
- [S6] iliad, documento de registo universal de 2025: <https://www.iliad.fr/media/ILIAD_URD_30042026_ENG_834039a832.pdf>
- [S7] Scaleway, API «Environmental Footprint»: <https://www.scaleway.com/en/developers/api/environmental-footprint/>

**OVHcloud**

- [O1] OVHcloud, documento de registo universal FY2025 (EN): <https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf>
- [O2] OVHcloud, indicadores FY25 e revisão da Apave: <https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf>
- [O3] OVHcloud, metodologia do Environmental Impact Tracker v2.0 (04/06/2025): <https://corporate.ovhcloud.com/sites/default/files/2025-10/methodology_-_environmental_impact_tracker.pdf>
- [O4] OVHcloud Docs, «Carbon footprint»: <https://docs.ovhcloud.com/en/guides/account-and-service-management/managing-billing-payments-and-services/carbon-footprint>
- [O5] IJO e Cost House, certificação do método (26/02/2024): <https://www.ovhcloud.com/sites/default/files/external_files/signed-ovhcloud-certification-bare-metal-hpc-long-1.2_eng.pdf>
- [O6] OVHcloud, declaração de desempenho extrafinanceiro FY2024: <https://corporate.ovhcloud.com/sites/default/files/2024-12/dpef_en_2024.pdf>

**Clever Cloud**

- [C1] Clever Cloud, «Cloud and Green IT»: <https://www.clever.cloud/cloud-and-green-it/> (FR: <https://www.clever.cloud/fr/cloud-et-green-it-fr/>)
- [C2] Clever Cloud, «Commitments»: <https://www.clever.cloud/commitments/>
- [C3] Clever Cloud, «Infrastructure»: <https://www.clever.cloud/infrastructure/>
- [C4] Clever Cloud, API de zonas: <https://api.clever-cloud.com/v4/products/zones>
- [C5] Clever Cloud, blog de 16/06/2022 (centros em Paris): <https://www.clever.cloud/blog/company/2022/06/16/amd-epyc-7003-open-compute-datacenters-stuff-whats-up-clever-cloud/>
- [C6] Clever Cloud Docs, «Metrics»: <https://www.clever.cloud/developers/doc/develop/observability/metrics/>

**Infomaniak**

- [I1] Infomaniak, «Impact Report» (versão web): <https://www.infomaniak.com/en/impact-report>
- [I2] Infomaniak, «Impact Report 2024» (PDF): <https://www.infomaniak.com/documents/impact-report/impact_report_2024_en.pdf>
- [I3] myclimate/ecoLive, inventário de GEE de 2024 da Infomaniak (16/03/2026): <https://news.infomaniak.com/wp-content/uploads/2026/10/Bilan_gaz_a_effet_de_serre_2024.pdf>
- [I4] Infomaniak, «Rapport CO2 2024»: <https://news.infomaniak.com/rapport-co2-2024/>
- [I5] Infomaniak, comunicado sobre o centro D4 (28/01/2025, alojado no site da SIG): <https://rapport-annuel.sig-ge.ch/sites/default/files/2025-01/20250127_cp_nouveau_data_center_infomaniak.pdf>
- [I6] API do D4 (PUE e calor): <https://api.d4project.org/1/metrics/pue>
- [I7] Infomaniak, FAQ 1160 (CO2 na fatura): <https://www.infomaniak.com/en/support/faq/1160/discover-eco-design-to-reduce-your-carbon-footprint>
- [I8] Infomaniak, certificados: <https://www.infomaniak.com/en/ecology/certificates-rewards>
- [I9] Infomaniak, «Ecology»: <https://www.infomaniak.com/en/ecology>
- [I10] Infomaniak, «Datacenter housing»: <https://www.infomaniak.com/en/hosting/datacenter-housing>

**Intensidade da eletricidade**

- [E1] Ember, «Yearly electricity data»: <https://ember-energy.org/data/yearly-electricity-data/>
- [E2] Ember, CSV global (modificado a 06/10/2026): <https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv>
- [E3] Ember, metodologia v1.6: <https://files.ember-energy.org/public-downloads/ember_electricity_data_methodology.pdf>
- [E4] EEA, «Greenhouse gas emission intensity of electricity generation»: <https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1>
- [E5] EEA, dados do gráfico por país: <https://www.eea.europa.eu/++api++/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1/greenhouse-gas-emission-intensity-of-electricity-generation>

**Cloud Carbon Footprint**

- [CCF1] CCF, «Methodology»: <https://www.cloudcarbonfootprint.org/docs/methodology/>
- [CCF2] CCF, «Embodied Emissions»: <https://www.cloudcarbonfootprint.org/docs/embodied-emissions/>
- [CCF3] Código do CCF, commit `f584c549ee`: <https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/tree/f584c549ee/packages>
- [CCF4] CCF, versão «release-2026-04-23»: <https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/releases>

## Dados em JSON

Todos os valores publicados que encontrei, num formato que o protótipo pode ler (317 objetos, um por linha). Os valores **[calc]** não entram.

- `fornecedor`: `null` nas intensidades por país e nos coeficientes do CCF comuns aos três fornecedores.
- `pais`: só aparece nos valores ligados a um país, a uma região ou a um centro de dados.
- `metodo` e `nota`: versão curta. O método completo de cada fonte está nas secções 2 e 4.
- `metrica`: identificador estável (por exemplo `pue`, `wue`, `scope2_location`, `intensidade_eletricidade`, `ccf_watts_min_vcpu`).
- `valor`: número quando a fonte dá um número; texto quando a fonte dá um intervalo («<1.2») ou um nome (ferramentas).
- `ano`: texto, porque mistura anos civis («2025»), fiscais («FY2025») e períodos móveis.
- As entradas `ccf_*` com um fornecedor são coeficientes do CCF para esse fornecedor, não valores publicados por ele.

```json
[
{"fornecedor":"AWS","metrica":"pue","valor":1.14,"unidade":null,"ano":"2025","ambito":"Centros de dados da AWS, global","metodo":"ISO/IEC 30134-2 e EN 50600-4-2; média anual","fonte_url":"https://sustainability.aboutamazon.com/2025-aws-summary.pdf","nota":"1,15 em 2022, 2023 e 2024"},
{"fornecedor":"AWS","metrica":"pue","valor":1.11,"unidade":null,"ano":"2025","ambito":"Centros de dados da AWS na Europa","metodo":"Média anual; só regiões com 12 meses de operação","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Alemanha","metrica":"pue","valor":1.24,"unidade":null,"ano":"2025","ambito":"Região Frankfurt (eu-central-1)","metodo":"Média anual","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Alemanha","metrica":"wue","valor":0.17,"unidade":"L/kWh","ano":"2025","ambito":"Região Frankfurt (eu-central-1)","metodo":"Água retirada ÷ kWh IT","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Irlanda","metrica":"pue","valor":1.1,"unidade":null,"ano":"2025","ambito":"Região Irlanda (eu-west-1)","metodo":"Média anual","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Irlanda","metrica":"wue","valor":0.02,"unidade":"L/kWh","ano":"2025","ambito":"Região Irlanda (eu-west-1)","metodo":"Água retirada ÷ kWh IT","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Reino Unido","metrica":"pue","valor":1.23,"unidade":null,"ano":"2025","ambito":"Região Londres (eu-west-2)","metodo":"Média anual","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Reino Unido","metrica":"wue","valor":0.14,"unidade":"L/kWh","ano":"2025","ambito":"Região Londres (eu-west-2)","metodo":"Água retirada ÷ kWh IT","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"França","metrica":"pue","valor":1.35,"unidade":null,"ano":"2025","ambito":"Região Paris (eu-west-3)","metodo":"Média anual","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Espanha","metrica":"pue","valor":1.06,"unidade":null,"ano":"2025","ambito":"Região Espanha (eu-south-2)","metodo":"Média anual","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Espanha","metrica":"wue","valor":0.12,"unidade":"L/kWh","ano":"2025","ambito":"Região Espanha (eu-south-2)","metodo":"Água retirada ÷ kWh IT","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Suécia","metrica":"pue","valor":1.09,"unidade":null,"ano":"2025","ambito":"Região Estocolmo (eu-north-1)","metodo":"Média anual","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","pais":"Suécia","metrica":"wue","valor":0.02,"unidade":"L/kWh","ano":"2025","ambito":"Região Estocolmo (eu-north-1)","metodo":"Água retirada ÷ kWh IT","fonte_url":"https://sustainability.aboutamazon.com/content/dam/sustainability-marketing-site/12-the-cloud/aws-pue-wue.csv","nota":null},
{"fornecedor":"AWS","metrica":"wue","valor":0.12,"unidade":"L/kWh","ano":"2025","ambito":"Centros de dados da AWS, global","metodo":"Água retirada ÷ kWh IT","fonte_url":"https://sustainability.aboutamazon.com/2025-aws-summary.pdf","nota":"0,15 em 2024"},
{"fornecedor":"AWS","metrica":"wue","valor":0.05,"unidade":"L/kWh","ano":"2025","ambito":"Centros de dados da AWS na Europa","metodo":"Água retirada ÷ kWh IT","fonte_url":"https://sustainability.aboutamazon.com/products-services/aws-cloud","nota":null},
{"fornecedor":"AWS","metrica":"water_positive_progresso","valor":75,"unidade":"%","ano":"2025","ambito":"Centros de dados da AWS","metodo":"(água reutilizada + reposição) ÷ (água retirada − fontes sustentáveis)","fonte_url":"https://sustainability.aboutamazon.com/2025-aws-summary.pdf","nota":"Objetivo: 100 % em 2030"},
{"fornecedor":"AWS","metrica":"eletricidade_renovavel","valor":100,"unidade":"%","ano":"2025","ambito":"Toda a Amazon","metodo":"Correspondência anual em volume: projetos próprios (PPA, solar no local, tarifas verdes), parte renovável da rede e certificados","fonte_url":"https://sustainability.aboutamazon.com/2025-renewable-energy-assurance.pdf","nota":"Verificação limitada da EY; não é só a AWS"},
{"fornecedor":"AWS","metrica":"scope1","valor":15370000,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Amazon","metodo":"GHG Protocol, controlo operacional","fonte_url":"https://sustainability.aboutamazon.com/2025-amazon-sustainability-report.pdf","nota":"15,41 Mt antes de certificados de combustível (declaração da EY)"},
{"fornecedor":"AWS","metrica":"scope2_market","valor":3740000,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Amazon","metodo":"GHG Protocol, market-based","fonte_url":"https://sustainability.aboutamazon.com/2025-amazon-sustainability-report.pdf","nota":null},
{"fornecedor":"AWS","metrica":"scope2_location","valor":21820000,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Amazon","metodo":"GHG Protocol, location-based","fonte_url":"https://sustainability.aboutamazon.com/2025-ghg-assurance-scope-1-2.pdf","nota":"Só publicado na declaração de verificação da EY"},
{"fornecedor":"AWS","metrica":"scope3_market","valor":61740000,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Amazon","metodo":"GHG Protocol, market-based","fonte_url":"https://sustainability.aboutamazon.com/2025-amazon-sustainability-report.pdf","nota":null},
{"fornecedor":"AWS","metrica":"scope3_location","valor":66201920,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Amazon","metodo":"GHG Protocol, location-based","fonte_url":"https://sustainability.aboutamazon.com/2025-ghg-assurance-scope-3.pdf","nota":"Declaração da Apex"},
{"fornecedor":"AWS","metrica":"total_market","valor":80850000,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Amazon","metodo":"GHG Protocol, market-based, com certificados","fonte_url":"https://sustainability.aboutamazon.com/2025-amazon-sustainability-report.pdf","nota":"+16 % face a 2024"},
{"fornecedor":"AWS","metrica":"intensidade_carbono_receita","valor":112.8,"unidade":"gCO2e/USD","ano":"2025","ambito":"Toda a Amazon","metodo":"Emissões ÷ receita","fonte_url":"https://sustainability.aboutamazon.com/2025-amazon-sustainability-report.pdf","nota":null},
{"fornecedor":"AWS","metrica":"objetivo_net_zero","valor":2040,"unidade":"ano","ano":"2025","ambito":"Operações globais da Amazon","metodo":"The Climate Pledge","fonte_url":"https://sustainability.aboutamazon.com/2025-aws-summary.pdf","nota":null},
{"fornecedor":"AWS","metrica":"objetivo_water_positive","valor":2030,"unidade":"ano","ano":"2025","ambito":"Centros de dados da AWS","metodo":null,"fonte_url":"https://sustainability.aboutamazon.com/2025-aws-summary.pdf","nota":null},
{"fornecedor":"AWS","metrica":"ferramenta_clientes","valor":"AWS Sustainability console","unidade":null,"ano":"2026","ambito":"Contas AWS: por região, serviço (EC2, S3, CloudFront, outros) e conta; mensal desde 2022","metodo":"Scope 1, scope 2 location-based e market-based, scope 3 parcial (hardware e edifícios, energia a montante, transporte); método Model 3.0","fonte_url":"https://docs.aws.amazon.com/sustainability/latest/userguide/","nota":"Substituiu o Customer Carbon Footprint Tool a 30/06/2026; metodologia: https://sustainability.aboutamazon.com/aws-customer-carbon-footprint-tool-methodology.pdf"},
{"fornecedor":"Google Cloud","metrica":"pue","valor":1.09,"unidade":null,"ano":"2025","ambito":"Campus de centros de dados da Google, geridos pela Google","metodo":"Média anual, todas as perdas, medido todo o ano","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":"1,09 também nos últimos 12 meses do T2 2026 (https://datacenters.google/efficiency/)"},
{"fornecedor":"Google Cloud","pais":"Bélgica","metrica":"pue","valor":1.08,"unidade":null,"ano":"2025","ambito":"Campus de St. Ghislain","metodo":"Média anual","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Países Baixos","metrica":"pue","valor":1.07,"unidade":null,"ano":"2025","ambito":"Campus de Eemshaven","metodo":"Média anual","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Finlândia","metrica":"pue","valor":1.1,"unidade":null,"ano":"2025","ambito":"Campus de Hamina","metodo":"Média anual","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Irlanda","metrica":"pue","valor":1.08,"unidade":null,"ano":"2025","ambito":"Campus de Dublin","metodo":"Média anual","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Dinamarca","metrica":"pue","valor":1.07,"unidade":null,"ano":"2025","ambito":"Campus de Fredericia","metodo":"Média anual","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"cfe_horario","valor":65,"unidade":"%","ano":"2025","ambito":"Centros de dados e escritórios da Google, global","metodo":"CFE horário por rede (contratos + rede), dados da Electricity Maps","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":"66 % em 2024"},
{"fornecedor":"Google Cloud","metrica":"eletricidade_renovavel","valor":100,"unidade":"%","ano":"2025","ambito":"Toda a Google","metodo":"Correspondência anual e global com compras renováveis","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":"Nono ano seguido"},
{"fornecedor":"Google Cloud","pais":"Bélgica","metrica":"cfe_horario","valor":79,"unidade":"%","ano":"2025","ambito":"Rede Bélgica (Elia), centros próprios da Google","metodo":"CFE horário (contratos + rede)","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Dinamarca","metrica":"cfe_horario","valor":92,"unidade":"%","ano":"2025","ambito":"Rede Dinamarca (Energinet), centros próprios da Google","metodo":"CFE horário (contratos + rede)","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Finlândia","metrica":"cfe_horario","valor":98,"unidade":"%","ano":"2025","ambito":"Rede Finlândia (Fingrid), centros próprios da Google","metodo":"CFE horário (contratos + rede)","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Alemanha","metrica":"cfe_horario","valor":70,"unidade":"%","ano":"2025","ambito":"Rede Alemanha, centros próprios da Google","metodo":"CFE horário (contratos + rede)","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Irlanda","metrica":"cfe_horario","valor":60,"unidade":"%","ano":"2025","ambito":"Rede Irlanda (EirGrid), centros próprios da Google","metodo":"CFE horário (contratos + rede)","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Países Baixos","metrica":"cfe_horario","valor":82,"unidade":"%","ano":"2025","ambito":"Rede Países Baixos (Tennet), centros próprios da Google","metodo":"CFE horário (contratos + rede)","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","pais":"Reino Unido","metrica":"cfe_horario","valor":75,"unidade":"%","ano":"2025","ambito":"Rede Reino Unido (National Grid ESO), centros próprios da Google","metodo":"CFE horário (contratos + rede)","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"scope1","valor":86100,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Alphabet","metodo":"GHG Protocol, controlo operacional","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"scope2_location","valor":15148700,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Alphabet","metodo":"GHG Protocol, location-based","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"scope2_market","valor":2815000,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Alphabet","metodo":"GHG Protocol, market-based","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"scope3","valor":15946000,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Alphabet","metodo":"GHG Protocol","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"total","valor":18847100,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Alphabet","metodo":"GHG Protocol, scope 2 market-based","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"total_ambition_based","valor":14473100,"unidade":"tCO2e","ano":"2025","ambito":"Toda a Alphabet","metodo":"Métrica da Google para o objetivo (tira algumas categorias do scope 3)","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":"+18 % face a 2024; +81 % face a 2019"},
{"fornecedor":"Google Cloud","metrica":"eletricidade_centros","valor":42415800,"unidade":"MWh","ano":"2025","ambito":"Centros de dados da Google","metodo":null,"fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"consumo_agua","valor":10869,"unidade":"milhões de galões","ano":"2025","ambito":"Toda a Google","metodo":null,"fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":"Centros de dados: 10 523 milhões de galões; o WUE não é publicado"},
{"fornecedor":"Google Cloud","metrica":"reposicao_agua","valor":78,"unidade":"%","ano":"2025","ambito":"Água doce consumida pela Google","metodo":"VWBA 2.0","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":"Objetivo: 120 % em 2030"},
{"fornecedor":"Google Cloud","pais":"Polónia","metrica":"cfe_regiao","valor":81,"unidade":"%","ano":"2025","ambito":"Região europe-central2 (Varsóvia)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Polónia","metrica":"intensidade_rede_regiao","valor":498.57,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-central2 (Varsóvia)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Finlândia","metrica":"cfe_regiao","valor":98,"unidade":"%","ano":"2025","ambito":"Região europe-north1 (Finlândia)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Finlândia","metrica":"intensidade_rede_regiao","valor":29.84,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-north1 (Finlândia)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Suécia","metrica":"cfe_regiao","valor":100,"unidade":"%","ano":"2025","ambito":"Região europe-north2 (Estocolmo)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Suécia","metrica":"intensidade_rede_regiao","valor":19.39,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-north2 (Estocolmo)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Espanha","metrica":"cfe_regiao","valor":87,"unidade":"%","ano":"2025","ambito":"Região europe-southwest1 (Madrid)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Espanha","metrica":"intensidade_rede_regiao","valor":95.75,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-southwest1 (Madrid)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Bélgica","metrica":"cfe_regiao","valor":79,"unidade":"%","ano":"2025","ambito":"Região europe-west1 (Bélgica)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Bélgica","metrica":"intensidade_rede_regiao","valor":126.43,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west1 (Bélgica)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Reino Unido","metrica":"cfe_regiao","valor":75,"unidade":"%","ano":"2025","ambito":"Região europe-west2 (Londres)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Reino Unido","metrica":"intensidade_rede_regiao","valor":109.39,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west2 (Londres)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Alemanha","metrica":"cfe_regiao","valor":70,"unidade":"%","ano":"2025","ambito":"Região europe-west3 (Frankfurt)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Alemanha","metrica":"intensidade_rede_regiao","valor":275.81,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west3 (Frankfurt)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Países Baixos","metrica":"cfe_regiao","valor":82,"unidade":"%","ano":"2025","ambito":"Região europe-west4 (Eemshaven)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Países Baixos","metrica":"intensidade_rede_regiao","valor":194.35,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west4 (Eemshaven)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Suíça","metrica":"cfe_regiao","valor":97,"unidade":"%","ano":"2025","ambito":"Região europe-west6 (Zurique)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Suíça","metrica":"intensidade_rede_regiao","valor":21.2,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west6 (Zurique)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Itália","metrica":"cfe_regiao","valor":79,"unidade":"%","ano":"2025","ambito":"Região europe-west8 (Milão)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Itália","metrica":"intensidade_rede_regiao","valor":202.03,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west8 (Milão)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"França","metrica":"cfe_regiao","valor":96,"unidade":"%","ano":"2025","ambito":"Região europe-west9 (Paris)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"França","metrica":"intensidade_rede_regiao","valor":15.83,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west9 (Paris)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Alemanha","metrica":"cfe_regiao","valor":70,"unidade":"%","ano":"2025","ambito":"Região europe-west10 (Berlim)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Alemanha","metrica":"intensidade_rede_regiao","valor":275.81,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west10 (Berlim)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Itália","metrica":"cfe_regiao","valor":79,"unidade":"%","ano":"2025","ambito":"Região europe-west12 (Turim)","metodo":"CFE horário, média anual (inclui contratos da Google)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","pais":"Itália","metrica":"intensidade_rede_regiao","valor":202.03,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west12 (Turim)","metodo":"Média anual, Electricity Maps","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":null},
{"fornecedor":"Google Cloud","metrica":"cfe_regiao","valor":70,"unidade":"%","ano":"2025","ambito":"Região europe-west5 (local N/A no CSV)","metodo":"Média anual do CFE horário","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":"Não aparece na página da documentação"},
{"fornecedor":"Google Cloud","metrica":"intensidade_rede_regiao","valor":275.81,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Região europe-west5 (local N/A no CSV)","metodo":"Média anual (Electricity Maps)","fonte_url":"https://raw.githubusercontent.com/GoogleCloudPlatform/region-carbon-info/main/data/yearly/2025.csv","nota":"Não aparece na página da documentação"},
{"fornecedor":"Google Cloud","metrica":"objetivo_net_zero","valor":2030,"unidade":"ano","ano":"2025","ambito":"Operações e cadeia de valor","metodo":null,"fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"objetivo_reducao_emissoes","valor":50,"unidade":"%","ano":"2025","ambito":"Scopes 1, 2 (market-based) e 3, base 2019, até 2030","metodo":"Validado pela SBTi em 2025","fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"objetivo_cfe_24_7","valor":2030,"unidade":"ano","ano":"2025","ambito":"Todas as redes onde a Google opera","metodo":null,"fonte_url":"https://sustainability.google/files/1699a2e19277e478b38a659f00cb38398a836e8c/download-1699a2e1.pdf","nota":null},
{"fornecedor":"Google Cloud","metrica":"ferramenta_clientes","valor":"Google Cloud Carbon Footprint","unidade":null,"ano":"2026","ambito":"Por conta de faturação, projeto, serviço, região e mês; exportação BigQuery","metodo":"Scope 1, scope 2 location-based (fatores horários Electricity Maps) e market-based (fatores anuais IEA), scope 3; sem verificação externa","fonte_url":"https://cloud.google.com/carbon-footprint/docs/methodology","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"pue","valor":1.17,"unidade":null,"ano":"FY2025","ambito":"Centros de dados próprios da Microsoft, global","metodo":"Energia total ÷ energia de computação; centros com 12 meses de operação","fonte_url":"https://aka.ms/SustainabilityReport2026","nota":"1,16 em FY24; ano fiscal de julho a junho"},
{"fornecedor":"Microsoft Azure","metrica":"pue","valor":1.16,"unidade":null,"ano":"FY2025","ambito":"Centros de dados próprios da Microsoft na EMEA","metodo":"Energia total ÷ energia de computação","fonte_url":"https://datacenters.microsoft.com/sustainability/efficiency/","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"wue","valor":0.27,"unidade":"L/kWh","ano":"FY2025","ambito":"Centros de dados próprios da Microsoft, global","metodo":"Água de humidificação e arrefecimento ÷ kWh IT","fonte_url":"https://aka.ms/SustainabilityReport2026","nota":"0,30 em FY24"},
{"fornecedor":"Microsoft Azure","metrica":"wue","valor":0.03,"unidade":"L/kWh","ano":"FY2025","ambito":"Centros de dados próprios da Microsoft na EMEA","metodo":"Água de humidificação e arrefecimento ÷ kWh IT","fonte_url":"https://datacenters.microsoft.com/sustainability/efficiency/","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"eletricidade_renovavel","valor":100,"unidade":"%","ano":"FY2025","ambito":"Toda a Microsoft","metodo":"Renovável «direta»: produção no local, PPA, produtos verdes, contratos de longo prazo e parte renovável da rede ÷ consumo; anual; sem certificados spot","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":"78 % em FY24"},
{"fornecedor":"Microsoft Azure","metrica":"eletricidade_renovavel_correspondida","valor":34534392,"unidade":"MWh","ano":"FY2025","ambito":"Toda a Microsoft","metodo":"Contratos e produção própria, sem certificados spot","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"eletricidade_consumida","valor":37026353,"unidade":"MWh","ano":"FY2025","ambito":"Toda a Microsoft","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"contratos_renovaveis","valor":40,"unidade":"GW","ano":"FY2025","ambito":"Toda a Microsoft, 26 países","metodo":"Capacidade contratada; 19 GW em funcionamento","fonte_url":"https://aka.ms/SustainabilityReport2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"scope1","valor":170887,"unidade":"tCO2e","ano":"FY2025","ambito":"Toda a Microsoft","metodo":"GHG Protocol","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"scope2_location","valor":12030556,"unidade":"tCO2e","ano":"FY2025","ambito":"Toda a Microsoft","metodo":"GHG Protocol, location-based","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"scope2_market","valor":2707428,"unidade":"tCO2e","ano":"FY2025","ambito":"Toda a Microsoft","metodo":"GHG Protocol, market-based","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":"259 090 t em FY24; subiu com o fim dos certificados spot"},
{"fornecedor":"Microsoft Azure","metrica":"scope3","valor":18243000,"unidade":"tCO2e","ano":"FY2025","ambito":"Toda a Microsoft","metodo":"GHG Protocol","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"scope3_criterios_microsoft","valor":17412000,"unidade":"tCO2e","ano":"FY2025","ambito":"Toda a Microsoft","metodo":"Critérios da Microsoft (desconta certificados nas categorias 4, 6 e 11)","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"total","valor":21121000,"unidade":"tCO2e","ano":"FY2025","ambito":"Toda a Microsoft","metodo":"GHG Protocol, scope 2 market-based","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"total_criterios_microsoft","valor":20290000,"unidade":"tCO2e","ano":"FY2025","ambito":"Toda a Microsoft","metodo":"Critérios da Microsoft; valor de destaque do relatório","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":"+25 % face a FY24"},
{"fornecedor":"Microsoft Azure","metrica":"scope2_location","valor":2535347,"unidade":"tCO2e","ano":"FY2025","ambito":"Microsoft na EMEA","metodo":"GHG Protocol, location-based","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"scope2_market","valor":623832,"unidade":"tCO2e","ano":"FY2025","ambito":"Microsoft na EMEA","metodo":"GHG Protocol, market-based","fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Irlanda","metrica":"eletricidade_centros","valor":1308581,"unidade":"MWh","ano":"FY2025","ambito":"Centros próprios em Dublin","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Irlanda","metrica":"agua_retirada","valor":18,"unidade":"milhões de litros","ano":"FY2025","ambito":"Centros próprios em Dublin","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Países Baixos","metrica":"eletricidade_centros","valor":1291170,"unidade":"MWh","ano":"FY2025","ambito":"Centros próprios em Hollands Kroon","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Países Baixos","metrica":"agua_retirada","valor":46,"unidade":"milhões de litros","ano":"FY2025","ambito":"Centros próprios em Hollands Kroon","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Suécia","metrica":"eletricidade_centros","valor":704549,"unidade":"MWh","ano":"FY2025","ambito":"Centros próprios em Gävle – Sandviken","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Suécia","metrica":"agua_retirada","valor":14,"unidade":"milhões de litros","ano":"FY2025","ambito":"Centros próprios em Gävle – Sandviken","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Polónia","metrica":"eletricidade_centros","valor":82613,"unidade":"MWh","ano":"FY2025","ambito":"Centros próprios em Varsóvia","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Polónia","metrica":"agua_retirada","valor":2,"unidade":"milhões de litros","ano":"FY2025","ambito":"Centros próprios em Varsóvia","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Itália","metrica":"eletricidade_centros","valor":46989,"unidade":"MWh","ano":"FY2025","ambito":"Centros próprios em Milão","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Itália","metrica":"agua_retirada","valor":6,"unidade":"milhões de litros","ano":"FY2025","ambito":"Centros próprios em Milão","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Suécia","metrica":"eletricidade_centros","valor":41681,"unidade":"MWh","ano":"FY2025","ambito":"Centros próprios em Malmö","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Suécia","metrica":"agua_retirada","valor":1,"unidade":"milhões de litros","ano":"FY2025","ambito":"Centros próprios em Malmö","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Dinamarca","metrica":"eletricidade_centros","valor":29964,"unidade":"MWh","ano":"FY2025","ambito":"Centros próprios em Copenhaga","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Dinamarca","metrica":"agua_retirada","valor":3,"unidade":"milhões de litros","ano":"FY2025","ambito":"Centros próprios em Copenhaga","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Espanha","metrica":"eletricidade_centros","valor":22588,"unidade":"MWh","ano":"FY2025","ambito":"Centros próprios em Madrid","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Espanha","metrica":"agua_retirada","valor":15,"unidade":"milhões de litros","ano":"FY2025","ambito":"Centros próprios em Madrid","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Áustria","metrica":"eletricidade_centros","valor":13849,"unidade":"MWh","ano":"FY2025","ambito":"Centros próprios em Viena","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","pais":"Áustria","metrica":"agua_retirada","valor":4,"unidade":"milhões de litros","ano":"FY2025","ambito":"Centros próprios em Viena","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"objetivo_carbon_negative","valor":2030,"unidade":"ano","ano":"FY2025","ambito":"Toda a Microsoft","metodo":null,"fonte_url":"https://aka.ms/SustainabilityReport2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"objetivo_remover_emissoes_historicas","valor":2050,"unidade":"ano","ano":"FY2025","ambito":"Emissões da Microsoft desde 1975","metodo":null,"fonte_url":"https://aka.ms/SustainabilityFactsheet2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"objetivo_water_positive","valor":2030,"unidade":"ano","ano":"FY2025","ambito":"Toda a Microsoft","metodo":null,"fonte_url":"https://aka.ms/SustainabilityReport2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"objetivo_reducao_wue","valor":40,"unidade":"%","ano":"FY2025","ambito":"Centros próprios, até 2030, base 2022","metodo":null,"fonte_url":"https://aka.ms/SustainabilityReport2026","nota":null},
{"fornecedor":"Microsoft Azure","metrica":"ferramenta_clientes","valor":"Azure carbon optimization","unidade":null,"ano":"2026","ambito":"Subscrição, grupo de recursos, recurso, tipo de recurso e região; mensal; 12 meses","metodo":"Scope 1, scope 2 market-based e scope 3 (só hardware); repartição pelo custo normalizado","fonte_url":"https://learn.microsoft.com/en-us/azure/carbon-optimization/view-emissions","nota":"O Emissions Impact Dashboard for Azure (Power BI) é retirado a 31/03/2027"},
{"fornecedor":"Scaleway","metrica":"pue","valor":1.375,"unidade":null,"ano":"2024","ambito":"Todos os centros usados (Opcore em Paris, terceiros em Amesterdão e Varsóvia)","metodo":"ISO/IEC 30134-2; método de média não indicado","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"O site arredonda para 1,37"},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue","valor":1.45,"unidade":null,"ano":"2024","ambito":"Centro DC2 (Opcore), zona fr-par-1","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"wue","valor":0.009,"unidade":"L/kWh","ano":"2024","ambito":"Centro DC2 (Opcore), zona fr-par-1","metodo":"ISO/IEC 30134-9; litros ÷ kWh IT","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"eletricidade_centro","valor":7368,"unidade":"MWh","ano":"2024","ambito":"Centro DC2 (Opcore), zona fr-par-1","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue","valor":1.39,"unidade":null,"ano":"2024","ambito":"Centro DC3 (Opcore), zona fr-par-1","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"wue","valor":9e-05,"unidade":"L/kWh","ano":"2024","ambito":"Centro DC3 (Opcore), zona fr-par-1","metodo":"ISO/IEC 30134-9; litros ÷ kWh IT","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"eletricidade_centro","valor":14845,"unidade":"MWh","ano":"2024","ambito":"Centro DC3 (Opcore), zona fr-par-1","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue","valor":1.44,"unidade":null,"ano":"2024","ambito":"Centro DC4 (Opcore), zona fr-par-3","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"Ligação a fr-par-3 deduzida da tabela da calculadora"},
{"fornecedor":"Scaleway","pais":"França","metrica":"wue","valor":2e-05,"unidade":"L/kWh","ano":"2024","ambito":"Centro DC4 (Opcore), zona fr-par-3","metodo":"ISO/IEC 30134-9; litros ÷ kWh IT","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"eletricidade_centro","valor":8241,"unidade":"MWh","ano":"2024","ambito":"Centro DC4 (Opcore), zona fr-par-3","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue","valor":1.25,"unidade":null,"ano":"2024","ambito":"Centro DC5 (Opcore), zona fr-par-2","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"1,16 na calculadora; 1,18 nos últimos 12 meses da Opcore"},
{"fornecedor":"Scaleway","pais":"França","metrica":"wue","valor":0.25,"unidade":"L/kWh","ano":"2024","ambito":"Centro DC5 (Opcore), zona fr-par-2","metodo":"ISO/IEC 30134-9; litros ÷ kWh IT","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"eletricidade_centro","valor":94171,"unidade":"MWh","ano":"2024","ambito":"Centro DC5 (Opcore), zona fr-par-2","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"pue","valor":1.38,"unidade":null,"ano":"2024","ambito":"Centro AMS1 (Iron Mountain), zona nl-ams-1","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"wue","valor":0.85,"unidade":"L/kWh","ano":"2024","ambito":"Centro AMS1 (Iron Mountain), zona nl-ams-1","metodo":"ISO/IEC 30134-9; litros ÷ kWh IT","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"1,64 no site"},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"eletricidade_centro","valor":5292,"unidade":"MWh","ano":"2024","ambito":"Centro AMS1 (Iron Mountain), zona nl-ams-1","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"pue","valor":1.4,"unidade":null,"ano":"2024","ambito":"Centro AMS2 (Interxion), zona nl-ams-2","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"eletricidade_centro","valor":696,"unidade":"MWh","ano":"2024","ambito":"Centro AMS2 (Interxion), zona nl-ams-2","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"pue","valor":1.4,"unidade":null,"ano":"2024","ambito":"Centro AMS3 (Equinix), zona nl-ams-3","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"1,2 no site e na calculadora"},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"eletricidade_centro","valor":174,"unidade":"MWh","ano":"2024","ambito":"Centro AMS3 (Equinix), zona nl-ams-3","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"pue","valor":1.5,"unidade":null,"ano":"2024","ambito":"Centro WAW1 (Equinix), zona pl-waw-1","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"eletricidade_centro","valor":434,"unidade":"MWh","ano":"2024","ambito":"Centro WAW1 (Equinix), zona pl-waw-1","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"pue","valor":1.24,"unidade":null,"ano":"2024","ambito":"Centro WAW2 (3S), zona pl-waw-2","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"eletricidade_centro","valor":969,"unidade":"MWh","ano":"2024","ambito":"Centro WAW2 (3S), zona pl-waw-2","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"pue","valor":1.5,"unidade":null,"ano":"2024","ambito":"Centro WAW3 (Atman), zona pl-waw-3","metodo":"ISO/IEC 30134-2; média anual","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"eletricidade_centro","valor":691,"unidade":"MWh","ano":"2024","ambito":"Centro WAW3 (Atman), zona pl-waw-3","metodo":null,"fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue","valor":1.43,"unidade":null,"ano":"últimos 12 meses a 16/10/2026","ambito":"Centro DC2 (Opcore)","metodo":"PUE dos últimos 12 meses, ISO/IEC; auditor BSI","fonte_url":"https://pue.dc2.opcore.eu/en/","nota":"Publicado pela Opcore, não pela Scaleway"},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue","valor":1.45,"unidade":null,"ano":"últimos 12 meses a 16/10/2026","ambito":"Centro DC3 (Opcore)","metodo":"PUE dos últimos 12 meses, ISO/IEC; auditor BSI","fonte_url":"https://pue.dc3.opcore.eu/en/","nota":"Publicado pela Opcore, não pela Scaleway"},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue","valor":1.18,"unidade":null,"ano":"últimos 12 meses a 16/10/2026","ambito":"Centro DC5 (Opcore)","metodo":"PUE dos últimos 12 meses, ISO/IEC; auditor BSI","fonte_url":"https://pue.dc5.opcore.eu/en/","nota":"Publicado pela Opcore, não pela Scaleway"},
{"fornecedor":"Scaleway","pais":"França","metrica":"wue","valor":0.25,"unidade":"L/kWh","ano":"últimos 12 meses a 16/10/2026","ambito":"Centro DC5 (Opcore)","metodo":"WUE dos últimos 12 meses","fonte_url":"https://pue.dc5.opcore.eu/en/","nota":"Publicado pela Opcore"},
{"fornecedor":"Scaleway","metrica":"wue","valor":0.222,"unidade":"L/kWh","ano":"2024","ambito":"4 centros franceses e AMS1","metodo":"ISO/IEC 30134-9; média simples dos 5 centros","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","metrica":"eletricidade_renovavel","valor":100,"unidade":"%","ano":"2024","ambito":"Energia dos centros de dados","metodo":"Garantias de origem (eólica ou hídrica); PPA não contados (regras da ADEME)","fonte_url":"https://www.scaleway.com/en/environmental-leadership/","nota":null},
{"fornecedor":"Scaleway","metrica":"scope1","valor":63,"unidade":"tCO2e","ano":"2024","ambito":"Scaleway","metodo":"GHG Protocol","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":null},
{"fornecedor":"Scaleway","metrica":"scope2_location","valor":3155,"unidade":"tCO2e","ano":"2024","ambito":"Scaleway","metodo":"GHG Protocol, location-based","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"Market-based não publicado"},
{"fornecedor":"Scaleway","metrica":"scope3_location","valor":15066,"unidade":"tCO2e","ano":"2024","ambito":"Scaleway","metodo":"GHG Protocol, location-based","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"Dos quais 13 387 t dos servidores"},
{"fornecedor":"Scaleway","metrica":"total_location","valor":18284,"unidade":"tCO2e","ano":"2024","ambito":"Scaleway","metodo":"GHG Protocol, location-based","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"+46 % face a 2023; a p. 22 diz 118 284 (provável gralha)"},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue_calculadora","valor":1.45,"unidade":null,"ano":"2025","ambito":"Zona fr-par-1","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"wue_calculadora","valor":0.009,"unidade":"L/kWh","ano":"2025","ambito":"Zona fr-par-1","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue_calculadora","valor":1.16,"unidade":null,"ano":"2025","ambito":"Zona fr-par-2","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"wue_calculadora","valor":0.25,"unidade":"L/kWh","ano":"2025","ambito":"Zona fr-par-2","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"pue_calculadora","valor":1.44,"unidade":null,"ano":"2025","ambito":"Zona fr-par-3","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"wue_calculadora","valor":0.001,"unidade":"L/kWh","ano":"2025","ambito":"Zona fr-par-3","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"pue_calculadora","valor":1.38,"unidade":null,"ano":"2025","ambito":"Zona nl-ams-1","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"wue_calculadora","valor":0.85,"unidade":"L/kWh","ano":"2025","ambito":"Zona nl-ams-1","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"pue_calculadora","valor":1.4,"unidade":null,"ano":"2025","ambito":"Zona nl-ams-2","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"pue_calculadora","valor":1.2,"unidade":null,"ano":"2025","ambito":"Zona nl-ams-3","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"pue_calculadora","valor":1.5,"unidade":null,"ano":"2025","ambito":"Zona pl-waw-1","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"pue_calculadora","valor":1.24,"unidade":null,"ano":"2025","ambito":"Zona pl-waw-2","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"pue_calculadora","valor":1.5,"unidade":null,"ano":"2025","ambito":"Zona pl-waw-3","metodo":"Valor usado pela calculadora","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"França","metrica":"fator_rede_calculadora","valor":0.044,"unidade":"kgCO2e/kWh","ano":"2025","ambito":"Calculadora da Scaleway","metodo":"Location-based, fatores da Ember","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Países Baixos","metrica":"fator_rede_calculadora","valor":0.253,"unidade":"kgCO2e/kWh","ano":"2025","ambito":"Calculadora da Scaleway","metodo":"Location-based, fatores da Ember","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Polónia","metrica":"fator_rede_calculadora","valor":0.615,"unidade":"kgCO2e/kWh","ano":"2025","ambito":"Calculadora da Scaleway","metodo":"Location-based, fatores da Ember","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","pais":"Itália","metrica":"fator_rede_calculadora","valor":0.284,"unidade":"kgCO2e/kWh","ano":"2025","ambito":"Calculadora da Scaleway","metodo":"Location-based, fatores da Ember","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/calculation-values-reference/","nota":null},
{"fornecedor":"Scaleway","metrica":"objetivo_reducao_scope1_2","valor":60,"unidade":"%","ano":"2024","ambito":"Grupo iliad, até 2030, base 2022, market-based","metodo":"Validado pela SBTi","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"−90 % até 2050"},
{"fornecedor":"Scaleway","metrica":"objetivo_reducao_scope3","valor":46,"unidade":"%","ano":"2024","ambito":"Grupo iliad, até 2030, base 2022","metodo":"Validado pela SBTi","fonte_url":"https://www-uploads.scaleway.com/Impact_Report2025_22ee3a8232.pdf","nota":"−90 % até 2050"},
{"fornecedor":"Scaleway","metrica":"ferramenta_clientes","valor":"Environmental Footprint Calculator","unidade":null,"ano":"2026","ambito":"Por projeto, região ou zona, serviço e categoria; diário; desde 01/10/2024","metodo":"Carbono (fabrico e uso, location-based, fatores Ember) e água; referencial da ADEME","fonte_url":"https://www.scaleway.com/en/docs/environmental-footprint/additional-content/environmental-footprint-calculator/","nota":null},
{"fornecedor":"OVHcloud","metrica":"pue","valor":1.24,"unidade":null,"ano":"FY2025","ambito":"9 centros geridos pela OVHcloud (sem BHS1-7)","metodo":"ISO/IEC 30134-2, categoria 2; 91 % da fatura medida","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":"1,26 em FY2024; ano fiscal de setembro a agosto"},
{"fornecedor":"OVHcloud","metrica":"ref","valor":100,"unidade":"%","ano":"FY2025","ambito":"Centros próprios geridos pela OVHcloud","metodo":"ISO/IEC 30134-3: PPA e certificados (GO, REC, REGO); nuclear não conta","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":"92 % em FY2024"},
{"fornecedor":"OVHcloud","pais":"França","metrica":"ppa","valor":40,"unidade":"GWh/ano","ano":"FY2025","ambito":"França, desde 01/01/2025","metodo":null,"fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Alemanha","metrica":"ppa","valor":25,"unidade":"GWh/ano","ano":"FY2025","ambito":"Alemanha, desde 01/01/2025","metodo":null,"fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"scope1","valor":1325,"unidade":"tCO2e","ano":"FY2025","ambito":"Grupo OVHcloud","metodo":"GHG Protocol, controlo operacional","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"scope2_location","valor":58087,"unidade":"tCO2e","ano":"FY2025","ambito":"Grupo OVHcloud","metodo":"GHG Protocol, location-based (Electricity Maps)","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"scope2_market","valor":9981,"unidade":"tCO2e","ano":"FY2025","ambito":"Grupo OVHcloud","metodo":"GHG Protocol, market-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"scope3_market","valor":101557,"unidade":"tCO2e","ano":"FY2025","ambito":"Grupo OVHcloud","metodo":"GHG Protocol, market-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"scope3_location","valor":99336,"unidade":"tCO2e","ano":"FY2025","ambito":"Grupo OVHcloud","metodo":"GHG Protocol, location-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"total_location","valor":158748,"unidade":"tCO2e","ano":"FY2025","ambito":"Grupo OVHcloud","metodo":"GHG Protocol, location-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"total_market","valor":112863,"unidade":"tCO2e","ano":"FY2025","ambito":"Grupo OVHcloud","metodo":"GHG Protocol, market-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"cue_location","valor":0.13,"unidade":"kgCO2e/kWh IT","ano":"FY2025","ambito":"Grupo OVHcloud","metodo":"CUE (família ISO/IEC 30134), location-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"cue_market","valor":0.0,"unidade":"kgCO2e/kWh IT","ano":"FY2025","ambito":"Grupo OVHcloud","metodo":"CUE (família ISO/IEC 30134), market-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"wue","valor":0.34,"unidade":"L/kWh","ano":"FY2025","ambito":"Centros geridos pela OVHcloud (sem BHS1-7)","metodo":"ISO/IEC 30134-9, categoria 1; toda a água retirada conta como consumida","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":"0,37 em FY2024; objetivo de 0,32 não atingido"},
{"fornecedor":"OVHcloud","pais":"França","metrica":"pue","valor":1.3,"unidade":null,"ano":"FY2025","ambito":"Centro de Roubaix","metodo":"ISO/IEC 30134-2; revisto pela Apave","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"França","metrica":"wue","valor":0.29,"unidade":"L/kWh","ano":"FY2025","ambito":"Centro de Roubaix","metodo":"ISO/IEC 30134-9","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"França","metrica":"cue_location","valor":0.03,"unidade":"kgCO2e/kWh IT","ano":"FY2025","ambito":"Centro de Roubaix","metodo":"Location-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"França","metrica":"pue","valor":1.21,"unidade":null,"ano":"FY2025","ambito":"Centro de Gravelines","metodo":"ISO/IEC 30134-2; revisto pela Apave","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"França","metrica":"wue","valor":0.2,"unidade":"L/kWh","ano":"FY2025","ambito":"Centro de Gravelines","metodo":"ISO/IEC 30134-9","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"França","metrica":"cue_location","valor":0.02,"unidade":"kgCO2e/kWh IT","ano":"FY2025","ambito":"Centro de Gravelines","metodo":"Location-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"França","metrica":"pue","valor":1.19,"unidade":null,"ano":"FY2025","ambito":"Centro de Estrasburgo","metodo":"ISO/IEC 30134-2; revisto pela Apave","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"França","metrica":"wue","valor":0.39,"unidade":"L/kWh","ano":"FY2025","ambito":"Centro de Estrasburgo","metodo":"ISO/IEC 30134-9","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"França","metrica":"cue_location","valor":0.02,"unidade":"kgCO2e/kWh IT","ano":"FY2025","ambito":"Centro de Estrasburgo","metodo":"Location-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Reino Unido","metrica":"pue","valor":1.19,"unidade":null,"ano":"FY2025","ambito":"Centro de Erith","metodo":"ISO/IEC 30134-2; revisto pela Apave","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Reino Unido","metrica":"wue","valor":0.18,"unidade":"L/kWh","ano":"FY2025","ambito":"Centro de Erith","metodo":"ISO/IEC 30134-9","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Reino Unido","metrica":"cue_location","valor":0.13,"unidade":"kgCO2e/kWh IT","ano":"FY2025","ambito":"Centro de Erith","metodo":"Location-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Alemanha","metrica":"pue","valor":1.19,"unidade":null,"ano":"FY2025","ambito":"Centro de Limburg","metodo":"ISO/IEC 30134-2; revisto pela Apave","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Alemanha","metrica":"wue","valor":0.21,"unidade":"L/kWh","ano":"FY2025","ambito":"Centro de Limburg","metodo":"ISO/IEC 30134-9","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Alemanha","metrica":"cue_location","valor":0.33,"unidade":"kgCO2e/kWh IT","ano":"FY2025","ambito":"Centro de Limburg","metodo":"Location-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Polónia","metrica":"pue","valor":1.25,"unidade":null,"ano":"FY2025","ambito":"Centro de Varsóvia / Ożarów","metodo":"ISO/IEC 30134-2; revisto pela Apave","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Polónia","metrica":"wue","valor":0.42,"unidade":"L/kWh","ano":"FY2025","ambito":"Centro de Varsóvia / Ożarów","metodo":"ISO/IEC 30134-9","fonte_url":"https://www.ovhcloud.com/sites/default/files/external_files/kpis_fy25.pdf","nota":null},
{"fornecedor":"OVHcloud","pais":"Polónia","metrica":"cue_location","valor":0.8,"unidade":"kgCO2e/kWh IT","ano":"FY2025","ambito":"Centro de Varsóvia / Ożarów","metodo":"Location-based","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":null},
{"fornecedor":"OVHcloud","metrica":"objetivo_reducao_scope1_2","valor":73.4,"unidade":"%","ano":"FY2025","ambito":"Grupo, absoluto, até FY2030, base 2022","metodo":"Validado pela SBTi (novembro de 2024)","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":"Em FY2025 já estava em −79,4 %"},
{"fornecedor":"OVHcloud","metrica":"objetivo_reducao_scope3","valor":52,"unidade":"%","ano":"FY2025","ambito":"Grupo, por unidade de valor acrescentado, até 2030, base 2022","metodo":"Validado pela SBTi","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-11/ovh_urd_2025_en_mel_25_11_14.pdf","nota":"Em FY2025: −36 %"},
{"fornecedor":"OVHcloud","metrica":"ferramenta_clientes","valor":"Environmental Impact Tracker","unidade":null,"ano":"2026","ambito":"Mensal, por categoria, gama e centro; CSV por servidor; até 24 meses","metodo":"Scopes 1, 2 e 3: fabrico (5 anos), eletricidade (location-based e market-based) e operações","fonte_url":"https://corporate.ovhcloud.com/sites/default/files/2025-10/methodology_-_environmental_impact_tracker.pdf","nota":"Método certificado pela IJO e pela Cost House em 2024, só para Bare Metal e Hosted Private Cloud"},
{"fornecedor":"Clever Cloud","metrica":"pue","valor":"<1.2","unidade":null,"ano":null,"ambito":"«Alguns dos nossos centros», sem dizer quais","metodo":"Não indicado","fonte_url":"https://www.clever.cloud/cloud-and-green-it/","nota":"Sem ano nem método"},
{"fornecedor":"Clever Cloud","metrica":"pue","valor":"<1.3","unidade":null,"ano":null,"ambito":"Centros parceiros","metodo":"Não indicado","fonte_url":"https://www.clever.cloud/commitments/","nota":"Sem ano nem método; não coincide com o valor da página Green IT"},
{"fornecedor":"Clever Cloud","pais":"França","metrica":"pue","valor":"<1.3","unidade":null,"ano":null,"ambito":"Centro Greendata Nanterre (Paris)","metodo":"Não indicado","fonte_url":"https://www.clever.cloud/infrastructure/","nota":"Valor na página de infraestrutura, sem ano nem método"},
{"fornecedor":"Clever Cloud","pais":"França","metrica":"pue","valor":1.6,"unidade":null,"ano":null,"ambito":"Centro nLighten Gardinoux, Aubervilliers (Paris)","metodo":"Não indicado","fonte_url":"https://www.clever.cloud/infrastructure/","nota":"Valor na página de infraestrutura, sem ano nem método"},
{"fornecedor":"Clever Cloud","pais":"França","metrica":"pue","valor":1.2,"unidade":null,"ano":null,"ambito":"Centro Scaleway DC5, Saint-Ouen-l'Aumône","metodo":"Não indicado","fonte_url":"https://www.clever.cloud/infrastructure/","nota":"Valor na página de infraestrutura, sem ano nem método"},
{"fornecedor":"Clever Cloud","pais":"França","metrica":"pue","valor":1.2,"unidade":null,"ano":null,"ambito":"Centro OVHcloud Roubaix RBX-5","metodo":"Não indicado","fonte_url":"https://www.clever.cloud/infrastructure/","nota":"Valor na página de infraestrutura, sem ano nem método"},
{"fornecedor":"Clever Cloud","pais":"França","metrica":"pue","valor":1.2,"unidade":null,"ano":null,"ambito":"Centro OVHcloud Gravelines GRA-1","metodo":"Não indicado","fonte_url":"https://www.clever.cloud/infrastructure/","nota":"Valor na página de infraestrutura, sem ano nem método"},
{"fornecedor":"Clever Cloud","pais":"Polónia","metrica":"pue","valor":"<1.2","unidade":null,"ano":null,"ambito":"Centro OVHcloud Varsóvia WAW-1","metodo":"Não indicado","fonte_url":"https://www.clever.cloud/infrastructure/","nota":"Valor na página de infraestrutura, sem ano nem método"},
{"fornecedor":"Infomaniak","metrica":"pue","valor":1.085,"unidade":null,"ano":"2024","ambito":"Todos os centros da Infomaniak (Genebra, próprios)","metodo":"Média anual medida","fonte_url":"https://www.infomaniak.com/en/impact-report","nota":null},
{"fornecedor":"Infomaniak","pais":"Suíça","metrica":"pue","valor":1.09,"unidade":null,"ano":"2025","ambito":"Centro D4 (Genebra)","metodo":"PUE médio indicado no comunicado de 28/01/2025","fonte_url":"https://rapport-annuel.sig-ge.ch/sites/default/files/2025-01/20250127_cp_nouveau_data_center_infomaniak.pdf","nota":"Período de medição não indicado"},
{"fornecedor":"Infomaniak","pais":"Suíça","metrica":"eletricidade_renovavel","valor":100,"unidade":"%","ano":"2024","ambito":"Infomaniak","metodo":"Produtos certificados do distribuidor SIG e solar própria","fonte_url":"https://www.infomaniak.com/documents/impact-report/impact_report_2024_en.pdf","nota":"38 % Naturemade Star, 56 % hídrica TÜV SÜD EE01, 6 % solar própria"},
{"fornecedor":"Infomaniak","pais":"Suíça","metrica":"fator_eletricidade_market","valor":11.7,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Eletricidade comprada à SIG","metodo":"Fator do distribuidor (SIG, 2023)","fonte_url":"https://news.infomaniak.com/wp-content/uploads/2026/10/Bilan_gaz_a_effet_de_serre_2024.pdf","nota":null},
{"fornecedor":"Infomaniak","metrica":"total","valor":2124.8,"unidade":"tCO2e","ano":"2024","ambito":"Infomaniak","metodo":"myclimate, Ecoinvent, ISO 14069","fonte_url":"https://news.infomaniak.com/wp-content/uploads/2026/10/Bilan_gaz_a_effet_de_serre_2024.pdf","nota":"−31,4 % face a 2023 (sem a construção do D4)"},
{"fornecedor":"Infomaniak","metrica":"scope1_2","valor":43.5,"unidade":"tCO2e","ano":"2024","ambito":"Infomaniak","metodo":"myclimate, ISO 14069","fonte_url":"https://news.infomaniak.com/wp-content/uploads/2026/10/Bilan_gaz_a_effet_de_serre_2024.pdf","nota":"Scope 3: 97,95 % do total"},
{"fornecedor":"Infomaniak","metrica":"scope1","valor":39.6,"unidade":"tCO2e","ano":"2023","ambito":"Infomaniak","metodo":"Como publicado no Impact Report 2024","fonte_url":"https://www.infomaniak.com/documents/impact-report/impact_report_2024_en.pdf","nota":"O total de 2023 foi recalculado depois (3 099,4 t)"},
{"fornecedor":"Infomaniak","metrica":"scope2_location","valor":2.1,"unidade":"tCO2e","ano":"2023","ambito":"Infomaniak","metodo":"Location-based","fonte_url":"https://www.infomaniak.com/documents/impact-report/impact_report_2024_en.pdf","nota":null},
{"fornecedor":"Infomaniak","metrica":"scope2_market","valor":717.6,"unidade":"tCO2e","ano":"2023","ambito":"Infomaniak","metodo":"Market-based, mistura suíça de 2022 (108 g/kWh)","fonte_url":"https://www.infomaniak.com/documents/impact-report/impact_report_2024_en.pdf","nota":null},
{"fornecedor":"Infomaniak","metrica":"scope3","valor":3081,"unidade":"tCO2e","ano":"2023","ambito":"Infomaniak","metodo":"Como publicado no Impact Report 2024","fonte_url":"https://www.infomaniak.com/documents/impact-report/impact_report_2024_en.pdf","nota":"Dos quais 2 852 t dos servidores"},
{"fornecedor":"Infomaniak","pais":"Suíça","metrica":"wue","valor":0.0145,"unidade":"L/kWh","ano":"2023","ambito":"Infomaniak","metodo":"Litros ÷ kWh IT; 186,8 m³ de água","fonte_url":"https://www.infomaniak.com/documents/impact-report/impact_report_2024_en.pdf","nota":"A versão web arredonda para 0,015"},
{"fornecedor":"Infomaniak","pais":"Suíça","metrica":"ere","valor":0.231,"unidade":null,"ano":"2024","ambito":"Centro D4 (Genebra)","metodo":"Energy Reuse Effectiveness","fonte_url":"https://www.infomaniak.com/en/impact-report","nota":"Cerca de 65 % da energia reaproveitada para aquecimento urbano"},
{"fornecedor":"Infomaniak","pais":"Suíça","metrica":"calor_projeto","valor":14.9,"unidade":"GWh/ano","ano":"2025","ambito":"Centro D4 a plena carga (1,7 MW)","metodo":"Valor de projeto","fonte_url":"https://rapport-annuel.sig-ge.ch/sites/default/files/2025-01/20250127_cp_nouveau_data_center_infomaniak.pdf","nota":null},
{"fornecedor":"Infomaniak","metrica":"ferramenta_clientes","valor":"CO2 anual na fatura (alojamento web e email)","unidade":null,"ano":"2024","ambito":"Por site ou caixa de correio","metodo":"Hardware (ResilioDB) + eletricidade medida por IPMI a 11,77 gCO2e/kWh","fonte_url":"https://www.infomaniak.com/en/support/faq/1160/discover-eco-design-to-reduce-your-carbon-footprint","nota":null},
{"fornecedor":"Infomaniak","metrica":"objetivo_sbti","valor":2030,"unidade":"ano","ano":"2024","ambito":"Infomaniak","metodo":"Submeter a trajetória de descarbonização à SBTi até 2030","fonte_url":"https://www.infomaniak.com/documents/impact-report/impact_report_2024_en.pdf","nota":null},
{"fornecedor":null,"pais":"França","metrica":"intensidade_eletricidade","valor":41.224,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"França","metrica":"intensidade_eletricidade","valor":40.337,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"França","metrica":"intensidade_eletricidade","valor":36,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"França","metrica":"intensidade_eletricidade","valor":47,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Alemanha","metrica":"intensidade_eletricidade","valor":334.117,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Alemanha","metrica":"intensidade_eletricidade","valor":339.873,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Alemanha","metrica":"intensidade_eletricidade","valor":291,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Alemanha","metrica":"intensidade_eletricidade","valor":316,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Países Baixos","metrica":"intensidade_eletricidade","valor":253.664,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Países Baixos","metrica":"intensidade_eletricidade","valor":250.768,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Países Baixos","metrica":"intensidade_eletricidade","valor":245,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Países Baixos","metrica":"intensidade_eletricidade","valor":255,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Irlanda","metrica":"intensidade_eletricidade","valor":263.289,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Irlanda","metrica":"intensidade_eletricidade","valor":270.75,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Irlanda","metrica":"intensidade_eletricidade","valor":237,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Irlanda","metrica":"intensidade_eletricidade","valor":255,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Bélgica","metrica":"intensidade_eletricidade","valor":151.262,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Bélgica","metrica":"intensidade_eletricidade","valor":126.931,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Bélgica","metrica":"intensidade_eletricidade","valor":155,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Bélgica","metrica":"intensidade_eletricidade","valor":150,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Polónia","metrica":"intensidade_eletricidade","valor":590.814,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Polónia","metrica":"intensidade_eletricidade","valor":608.464,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Polónia","metrica":"intensidade_eletricidade","valor":566,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Polónia","metrica":"intensidade_eletricidade","valor":595,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Suécia","metrica":"intensidade_eletricidade","valor":35.4,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Suécia","metrica":"intensidade_eletricidade","valor":34.908,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Suécia","metrica":"intensidade_eletricidade","valor":6,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Suécia","metrica":"intensidade_eletricidade","valor":7,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Finlândia","metrica":"intensidade_eletricidade","valor":57.242,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Finlândia","metrica":"intensidade_eletricidade","valor":66.905,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Finlândia","metrica":"intensidade_eletricidade","valor":27,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Finlândia","metrica":"intensidade_eletricidade","valor":33,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Suíça","metrica":"intensidade_eletricidade","valor":39.077,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Suíça","metrica":"intensidade_eletricidade","valor":34.561,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Itália","metrica":"intensidade_eletricidade","valor":284.431,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Itália","metrica":"intensidade_eletricidade","valor":281.435,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Itália","metrica":"intensidade_eletricidade","valor":206,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Itália","metrica":"intensidade_eletricidade","valor":248,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Espanha","metrica":"intensidade_eletricidade","valor":153.459,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Espanha","metrica":"intensidade_eletricidade","valor":146.258,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Espanha","metrica":"intensidade_eletricidade","valor":125,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Espanha","metrica":"intensidade_eletricidade","valor":140,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Reino Unido","metrica":"intensidade_eletricidade","valor":218.207,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Reino Unido","metrica":"intensidade_eletricidade","valor":216.473,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Áustria","metrica":"intensidade_eletricidade","valor":116.605,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Áustria","metrica":"intensidade_eletricidade","valor":103.457,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Áustria","metrica":"intensidade_eletricidade","valor":53,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Áustria","metrica":"intensidade_eletricidade","valor":59,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Dinamarca","metrica":"intensidade_eletricidade","valor":99.887,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Dinamarca","metrica":"intensidade_eletricidade","valor":132.167,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Dinamarca","metrica":"intensidade_eletricidade","valor":64,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Dinamarca","metrica":"intensidade_eletricidade","valor":83,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Noruega","metrica":"intensidade_eletricidade","valor":28.05,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Noruega","metrica":"intensidade_eletricidade","valor":29.643,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Portugal","metrica":"intensidade_eletricidade","valor":127.8,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Portugal","metrica":"intensidade_eletricidade","valor":110.62,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"Portugal","metrica":"intensidade_eletricidade","valor":82,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"Portugal","metrica":"intensidade_eletricidade","valor":115,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"UE-27","metrica":"intensidade_eletricidade","valor":210.596,"unidade":"gCO2e/kWh","ano":"2025","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"UE-27","metrica":"intensidade_eletricidade","valor":211.644,"unidade":"gCO2e/kWh","ano":"2024","ambito":"Produção do país","metodo":"Ember: ciclo de vida, produção","fonte_url":"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv","nota":null},
{"fornecedor":null,"pais":"UE-27","metrica":"intensidade_eletricidade","valor":183.44,"unidade":"gCO2/kWh","ano":"2024","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":null,"pais":"UE-27","metrica":"intensidade_eletricidade","valor":205.65,"unidade":"gCO2/kWh","ano":"2023","ambito":"Produção bruta do país","metodo":"EEA: só CO2 direto","fonte_url":"https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1","nota":null},
{"fornecedor":"AWS","metrica":"ccf_watts_min_vcpu","valor":0.74,"unidade":"W","ano":"2026","ambito":"Processador desconhecido (média)","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/aws/src/domain/AwsFootprintEstimationConstants.ts","nota":"Página do CCF: 0,74"},
{"fornecedor":"AWS","metrica":"ccf_watts_max_vcpu","valor":3.5,"unidade":"W","ano":"2026","ambito":"Processador desconhecido (média)","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/aws/src/domain/AwsFootprintEstimationConstants.ts","nota":"Página do CCF: 3,5"},
{"fornecedor":"AWS","metrica":"ccf_pue","valor":1.135,"unidade":null,"ano":"2026","ambito":"PUE por defeito","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/aws/src/domain/AwsFootprintEstimationConstants.ts","nota":"Coeficiente do CCF; «conservative guess» para a AWS"},
{"fornecedor":"Google Cloud","metrica":"ccf_watts_min_vcpu","valor":0.68,"unidade":"W","ano":"2026","ambito":"Processador desconhecido (mediana)","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/gcp/src/domain/GcpFootprintEstimationConstants.ts","nota":"Página do CCF: 0,71"},
{"fornecedor":"Google Cloud","metrica":"ccf_watts_max_vcpu","valor":4.11,"unidade":"W","ano":"2026","ambito":"Processador desconhecido (mediana)","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/gcp/src/domain/GcpFootprintEstimationConstants.ts","nota":"Página do CCF: 4,26"},
{"fornecedor":"Google Cloud","metrica":"ccf_pue","valor":1.1,"unidade":null,"ano":"2026","ambito":"PUE por defeito","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/gcp/src/domain/GcpFootprintEstimationConstants.ts","nota":"Coeficiente do CCF"},
{"fornecedor":"Microsoft Azure","metrica":"ccf_watts_min_vcpu","valor":0.74,"unidade":"W","ano":"2026","ambito":"Processador desconhecido (média)","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/azure/src/domain/AzureFootprintEstimationConstants.ts","nota":"Página do CCF: 0,78"},
{"fornecedor":"Microsoft Azure","metrica":"ccf_watts_max_vcpu","valor":3.54,"unidade":"W","ano":"2026","ambito":"Processador desconhecido (média)","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/azure/src/domain/AzureFootprintEstimationConstants.ts","nota":"Página do CCF: 3,76"},
{"fornecedor":"Microsoft Azure","metrica":"ccf_pue","valor":1.185,"unidade":null,"ano":"2026","ambito":"PUE por defeito","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/azure/src/domain/AzureFootprintEstimationConstants.ts","nota":"Coeficiente do CCF; o apêndice da página mostra 1,125"},
{"fornecedor":"Google Cloud","pais":"Bélgica","metrica":"ccf_pue","valor":1.09,"unidade":null,"ano":"2026","ambito":"Região europe-west1","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/gcp/src/domain/GcpFootprintEstimationConstants.ts","nota":"PUE dos últimos 12 meses usado pelo CCF"},
{"fornecedor":"Google Cloud","pais":"Países Baixos","metrica":"ccf_pue","valor":1.07,"unidade":null,"ano":"2026","ambito":"Região europe-west4","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/gcp/src/domain/GcpFootprintEstimationConstants.ts","nota":"PUE dos últimos 12 meses usado pelo CCF"},
{"fornecedor":"Google Cloud","pais":"Finlândia","metrica":"ccf_pue","valor":1.09,"unidade":null,"ano":"2026","ambito":"Região europe-north1","metodo":"CCF, commit f584c549ee","fonte_url":"https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/blob/f584c549ee/packages/gcp/src/domain/GcpFootprintEstimationConstants.ts","nota":"PUE dos últimos 12 meses usado pelo CCF"},
{"fornecedor":null,"metrica":"ccf_memoria","valor":0.000392,"unidade":"kWh por GB-hora","ano":"2026","ambito":"AWS, Google Cloud e Azure","metodo":"CCF, commit f584c549ee","fonte_url":"https://www.cloudcarbonfootprint.org/docs/methodology/","nota":"0,392 W/GB; na AWS e no Azure só para a memória acima da incluída no SPECpower"},
{"fornecedor":null,"metrica":"ccf_ssd","valor":1.2,"unidade":"Wh por TB-hora","ano":"2026","ambito":"AWS, Google Cloud e Azure","metodo":"CCF, commit f584c549ee","fonte_url":"https://www.cloudcarbonfootprint.org/docs/methodology/","nota":null},
{"fornecedor":null,"metrica":"ccf_hdd","valor":0.65,"unidade":"Wh por TB-hora","ano":"2026","ambito":"AWS, Google Cloud e Azure","metodo":"CCF, commit f584c549ee","fonte_url":"https://www.cloudcarbonfootprint.org/docs/methodology/","nota":null},
{"fornecedor":null,"metrica":"ccf_rede","valor":0.001,"unidade":"kWh por GB","ano":"2026","ambito":"Tráfego entre centros de dados","metodo":"CCF, commit f584c549ee","fonte_url":"https://www.cloudcarbonfootprint.org/docs/methodology/","nota":null},
{"fornecedor":null,"metrica":"ccf_utilizacao_cpu_defeito","valor":50,"unidade":"%","ano":"2026","ambito":"Quando a utilização é desconhecida","metodo":"CCF, commit f584c549ee","fonte_url":"https://www.cloudcarbonfootprint.org/docs/methodology/","nota":"Projeção para 2020 do relatório de 2016 sobre os centros de dados dos EUA"},
{"fornecedor":null,"metrica":"ccf_vida_util_servidor","valor":35040,"unidade":"horas","ano":"2026","ambito":"Emissões incorporadas","metodo":"CCF, commit f584c549ee","fonte_url":"https://www.cloudcarbonfootprint.org/docs/embodied-emissions/","nota":"4 anos; fórmula M = TE × (TR/EL) × (RR/TR)"}
]
```
