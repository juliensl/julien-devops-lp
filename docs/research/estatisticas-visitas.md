# Medimos as visitas? Com que ferramenta?

> Pesquisa do ticket [«Medimos as visitas? Com que ferramenta?» (#14)](https://github.com/juliensl/julien-devops-lp/issues/14) (mapa [#4](https://github.com/juliensl/julien-devops-lp/issues/4)). Fontes consultadas a **13/10/2026**.
> **Isto é pesquisa, não aconselhamento jurídico.** Resume o que dizem as fontes oficiais e as medições feitas, e assinala o que ficou por confirmar.
> Este documento **não decide**. A escolha da ferramenta, e de usar ou não um banner de consentimento, fica para o Julien, com as restrições do ticket [#15](https://github.com/juliensl/julien-devops-lp/issues/15).

## Pergunta

Como medir as visitas à página e os cliques nos quatro botões que levam à Página de marcação, por posição e por língua? O Julien pediu Google Analytics e disse que prefere uma solução sem cookies. As duas coisas são compatíveis? Que alternativas existem, e o que custam em privacidade, em peso da página e em dinheiro?

Contexto considerado:

- página estática em Astro, em francês (Língua por defeito), inglês e português;
- público só de empresas (CTO de SaaS em crescimento);
- alojamento "Hébergement Web" da Infomaniak (Suíça), publicado por SFTP, sem PHP, sem base de dados e sem código de servidor próprio;
- a Conversa é marcada por uma ligação simples para o Calendly, com uma Página de marcação por língua;
- tráfego esperado: dezenas a poucas centenas de visitas por mês.

Restrições já decididas no ticket #15:

- antes de qualquer clique, a página não faz nenhum pedido a outros domínios; um script de estatísticas de terceiros só entra com uma exceção explícita;
- página inteira ≤ 400 KB comprimidos; JS ≤ 75 KB comprimidos (normalmente 0).

## Resumo

- **GA4 "sem cookies" existe, mas num site pequeno quase não mostra nada.** Com o modo de consentimento e `analytics_storage: 'denied'`, o GA4 não lê nem escreve cookies de analítica e envia "pings sem cookies" [G2][G3]. Esses pings servem para a modelação. Se não houver tráfego consentido suficiente, "events triggered by users who decline consent aren't reported" [G4]. A modelação exige pelo menos 1 000 eventos por dia com consentimento recusado durante 7 dias e pelo menos 1 000 utilizadores diários com consentimento dado em 7 dos últimos 28 dias [G4]. Uma página com 1 a 10 visitas por dia fica 100 a 1 000 vezes abaixo. Os eventos em bruto só se veem na exportação para o BigQuery [G5].
- **GA4 sem cookies continua, muito provavelmente, a precisar de consentimento.** O EDPB diz que um JavaScript que manda o navegador enviar informação cai no art. 5.º, n.º 3, da Diretiva ePrivacy [U1 § 33]. A CNPD diz que a analítica precisa de consentimento [P2]. A CNIL dá o Google Analytics como exemplo de oferta fora da isenção, porque o fornecedor reutiliza os dados [F4]. Não encontrei nenhuma fonte oficial que isente o GA4.
- **O gtag.js não cabe no orçamento do ticket #15.** Medi entre **152 KB e 190 KB comprimidos** (440 KB a 575 KB descomprimidos), contra um limite de 75 KB de JS [M1]. Vem de www.googletagmanager.com e envia dados para \*.google-analytics.com [M1][G11]. Servi-lo no próprio domínio (Google tag gateway) exige um CDN, um balanceador ou um servidor que reencaminhe pedidos [G10]. Um alojamento estático sem proxy não o faz.
- **As ferramentas sem cookies pesam 2 KB a 4 KB**, contra 152 KB a 190 KB do gtag.js [M2]. As que cumprem mais critérios do ticket são:
  - **Pirsch** (Alemanha): 6 US$/mês. Mede os cliques por atributos HTML, com posição e língua. Painel em francês e português. Com o plano Plus (12 US$/mês), pode servir-se num subdomínio próprio só com DNS [E4].
  - **Plausible** (Estónia, dados na Alemanha): 9 €/mês. A posição e a língua como propriedades só no plano Business, a 19 €/mês [E1].
  - **Matomo Cloud**: é a única ferramenta deste lote que publica uma auto-avaliação CNIL. Mas custa 22 €/mês, o script medido é de 63 KB a 67 KB e, no modo CNIL, perde as UTM [E5].
- **A CNIL deixou de ter lista de ferramentas isentas.** Desde julho de 2025, cada fornecedor faz uma auto-avaliação [F1][F2][F3]. Os critérios mandam desligar a recolha de UTM, limitar o referrer ao domínio e arredondar os números à dezena [F2]. Só a Matomo publica uma auto-avaliação [E5]. A Plausible, a Simple Analytics, a Fathom, a Pirsch, a Umami, o GoatCounter e o Cloudflare não publicam.
- **Os logs da Infomaniak não custam nada à página.** O painel "Statistiques" do Manager conta visitas, páginas, países e domínios de origem a partir dos logs do servidor, sem JavaScript [I1]. Os logs em bruto ficam "at least 7 days" na pasta `ik-logs`, acessível por SFTP [I2]. Dá para os descarregar e analisar com o GoAccess. Não veem os cliques para o Calendly nem separam pessoas de robôs [I1].
- **O Calendly mede as marcações sem nada na página.** Regista as UTM da ligação (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) em todos os planos [C1]. Basta um `utm_content` diferente em cada botão; a língua já vem da Página de marcação. A integração GA4 do Calendly e o redirecionamento para uma página de agradecimento exigem um plano pago, a partir de 10 €/mês por utilizador com faturação anual [C3][C7][C9]. O GA4 do Calendly corre sob o banner de cookies do próprio Calendly [C5][C6].
- **A lei portuguesa não mudou.** A CNPD não publicou a diretriz sobre cookies anunciada em 2021. O relatório de 2023 diz que ficou "por concretizar", à espera do EDPB [P4]. Não encontrei nenhuma isenção portuguesa para a medição de audiência.
- **O Digital Omnibus não está em vigor e ainda não tem texto final.**
  - **Proposta da Comissão (19/11/2025):** isenta de consentimento a criação de "aggregated information about the usage of an online service to measure the audience", feita pelo responsável "solely for its own use" [U2].
  - **Compromisso da Presidência do Conselho (22/06/2026):** mantém uma isenção parecida, mas dentro da Diretiva ePrivacy, com 24 meses para a transpor [U4].
  - **Parlamento Europeu:** a 13/10/2026 estava em "Awaiting committee decision" [U3].

## Tabela de opções

Legenda do banner: **Sim** (obrigatório), **Provavelmente sim**, **Zona cinzenta** (as fontes não respondem com clareza), **Não**.

| Opção | Banner de consentimento? | Pedidos a outros domínios antes do clique | JS na página (comprimido) | O que mostra num site com 1 a 10 visitas por dia | Cliques nos 4 botões (posição + língua) | Custo | Fontes |
|---|---|---|---|---|---|---|---|
| GA4 com banner (modo básico ou avançado) | **Sim** | Sim: googletagmanager.com, google-analytics.com | 152 KB a 190 KB | Só os Visitantes que aceitam | Sim, com eventos | Grátis | [G2][G4][M1][P2] |
| GA4 sem banner, consentimento recusado por defeito ("sem cookies") | **Provavelmente sim** (ver § 1.5) | Sim | 152 KB a 190 KB | Nada nos relatórios; só eventos em bruto no BigQuery | Só no BigQuery | Grátis (BigQuery sandbox: tabelas apagadas aos 60 dias) | [G4][G5][G6][U1] |
| Ferramenta sem cookies (Plausible, Pirsch, Umami…) | **Zona cinzenta** em Portugal | Sim, ou um subdomínio próprio por DNS em alguns planos | 2 KB a 4 KB | Visitas, páginas, origens e UTM | Sim, por atributos HTML ou classes CSS | 0 a 20 €/mês | [E1]–[E7][M2] |
| Matomo Cloud em modo CNIL | **Zona cinzenta** em Portugal; em França, a Matomo declara que pode ser isenta se bem configurada | Sim (\*.matomo.cloud) | 63 KB a 67 KB (medido); 19 KB a 22 KB só com o núcleo | Visitas arredondadas à dezena, sem UTM, referrer só com o domínio | Sim (ligações externas; atributos de conteúdo) | 22 €/mês | [E5][F2] |
| Logs do servidor da Infomaniak | **Zona cinzenta**, mas é o menor risco | Não | 0 | Pedidos, visitas por IP, páginas, países e domínios de origem, sem separar robôs | Não, salvo com uma ligação de redirecionamento no próprio domínio (§ 3) | Incluído no alojamento | [I1][I2][I3] |
| UTM nas ligações para o Calendly | Não na página (o banner é o do Calendly) | Não | 0 | Só as marcações, não as visitas | Sim: `utm_content` por botão; língua pela Página de marcação | Incluído em todos os planos | [C1][C2] |

## Comparação das ferramentas sem cookies

Tamanhos medidos com `curl` a 13/10/2026, em bytes comprimidos com gzip [M2]. Preços para menos de 10 000 páginas vistas por mês, sem IVA salvo indicação.

**Empresa, dados e técnica**

| Ferramenta | Empresa e dados | Como conta os Visitantes | Script (gzip) | Domínios contactados; domínio próprio num alojamento estático |
|---|---|---|---|---|
| Plausible | Plausible Insights OÜ (Estónia). Hetzner (Alemanha) e Bunny CDN (Eslovénia) [E1] | Hash de IP + user agent + domínio + sal apagado a cada 24 h. Sem cookies nem localStorage; o script só lê uma chave de exclusão do dono [E1][M2] | 2,5 KB (script `pa-…`); 1,3 KB (script antigo) | plausible.io. O proxy próprio precisa de servidor ou edge; o CNAME gerido é só Enterprise. **Não** [E1] |
| Simple Analytics | Simple Analytics B.V. (Países Baixos). Servidores nos Países Baixos e bunny.net [E2] | Sem cookies, sem armazenamento, sem fingerprinting. Visita única deduzida do referrer [E2] | 3,9 KB + 1,4 KB (cliques em ligações externas) | scripts e queue.simpleanalyticscdn.com. CNAME por DNS existe, mas não no plano "Simple" [E2] |
| Fathom | Conva Ventures Inc. (Canadá). Visitantes da UE passam por servidores Bunny na UE; base de analítica na ClickHouse Cloud e outros subcontratantes dos EUA [E3] | Hash diário com sal rotativo [E3] | 2,1 KB | cdn.usefathom.com. Domínios próprios descontinuados em 2023. **Não** [E3] |
| Pirsch | Emvi Software GmbH (Alemanha). Hetzner (Alemanha) [E4] | Hash de IP + user agent + data + sal, válido no máximo 24 h. Sem cookies; o script só lê uma chave de exclusão [E4][M2] | 3,6 KB (sem brotli) | api.pirsch.io. Domínio próprio por registos DNS A/AAAA no plano Plus. **Sim**, sem código de servidor [E4] |
| Matomo Cloud | InnoCraft Ltd (Nova Zelândia). AWS em Frankfurt, cópias em Dublin [E5] | Cookies por defeito, desativáveis (`disableCookies`). Sem cookies: hash `config_id` rodado a cada 24 h; únicos "inaccurate" [E5] | 67 KB (pacote da conta de demonstração); 19 KB a 22 KB só com o núcleo | `<conta>`.matomo.cloud (e cdn.matomo.cloud). Domínio próprio só como extra pago do plano Enterprise. **Não** [E5] |
| Umami Cloud | Umami Software, Inc. (EUA). Região UE ou EUA à escolha; muitos subcontratantes nos EUA [E6] | Sem cookies. Hash de IP + user agent + sal mensal [E6] | 2,3 KB | cloud.umami.is e gateway.umami.is. Domínio próprio só com proxy. **Não** [E6] |
| GoatCounter | Martin Tournoij, pessoa singular na Irlanda. Hetzner (Finlândia e Alemanha) [E7] | Sem cookies nem localStorage. IP + user agent só em memória, até 8 h [E7] | 3,4 KB | gc.zgo.at e `<código>`.goatcounter.com. Domínio próprio por CNAME, e o script pode ser alojado no site. **Sim** [E7] |
| Cloudflare Web Analytics | Cloudflare, Inc. (EUA). Local de armazenamento não confirmado [E8] | Sem cookies, sem localStorage, sem fingerprinting [E8] | 10,2 KB (sem brotli) | static.cloudflareinsights.com e cloudflareinsights.com. Sem domínio próprio. **Não** [E8] |

**Funções, contrato e preço**

| Ferramenta | CNIL (auto-avaliação de 2025) | Cliques nos 4 botões, por posição e língua | UTM e referrer | DPA | Preço (< 10 000 páginas/mês) | Línguas do painel |
|---|---|---|---|---|---|---|
| Plausible | Nenhuma publicada | Cliques em ligações externas automáticos; eventos por classes CSS, sem JS. Propriedades (posição, língua) só no Business [E1] | Fontes, canais e as 5 UTM. Desligar as UTM exige JS próprio no snippet [E1] | Automático, aceite com o uso [E1] | Starter 9 €/mês; Business 19 €/mês. Anual = 10 meses. 30 dias grátis [E1] | Inglês (não confirmado) |
| Simple Analytics | Nenhuma | Cliques em ligações externas com `auto-events.js` (nome pelo `title`); metadados exigem JS auxiliar. Sem eventos no plano grátis [E2] | Referrer e 5 UTM; desligáveis com `data-ignore-metrics` [E2] | Diz que não é responsável nem subcontratante, e que não é preciso DPA [E2] | 20 €/mês (escalão de 15 € não confirmado); plano grátis sem eventos [E2] | Inglês (não confirmado) |
| Fathom | Nenhuma. Diz: "Cookie-free does not automatically mean outside device-access rules" [E3] | Só com JS próprio (`fathom.trackEvent`); sem propriedades [E3] | Referrer completo e UTM; sem opção documentada para desligar [E3] | PDF a assinar e enviar [E3] | 15 US$/mês; sem plano grátis [E3] | Inglês (não confirmado) |
| Pirsch | Nenhuma | `data-pirsch-event` e `data-pirsch-meta-*`, sem JS, no plano Standard; ligações externas automáticas [E4] | Referrer e 5 UTM; desligáveis com `data-disable-query` e `data-disable-referrer` [E4] | PDF a assinar [E4] | Standard 6 US$/mês (60 US$/ano); Plus 12 US$/mês (domínio próprio) [E4] | Inclui francês e português, segundo a documentação de incorporação [E4] |
| Matomo Cloud | **Sim**: declara cumprir os critérios da CNIL se bem configurada [E5] | Ligações externas automáticas ("Outlinks"); "Content Tracking" por atributos, mais uma linha no snippet [E5] | Completo; no modo CNIL, UTM removidas e referrer só com o domínio [E5] | Incluído nos termos [E5] | 22 €/mês (50 000 hits); sem plano grátis [E5] | Inclui francês e português [E5] |
| Umami Cloud | Nenhuma | `data-umami-event` e `data-umami-event-*`, sem JS [E6] | UTM; `data-exclude-search` remove a query [E6] | Automático, com cláusulas-tipo (SCC) [E6] | Hobby grátis (uso comercial não confirmado); Pro 20 US$/mês [E6] | Inclui francês e português de Portugal [E6] |
| GoatCounter | Nenhuma. O autor diz que "probably doesn't require a GDPR consent notice" [E7] | `data-goatcounter-click`, sem JS; sem propriedades (posição e língua no nome) [E7] | Campanhas de `utm_campaign` e `utm_source`; referrer completo [E7] | Nenhum encontrado | Grátis (donativos); pequenas empresas aceites [E7] | Francês e português no código; escolha no painel não confirmada [E7] |
| Cloudflare Web Analytics | Nenhuma | **Não tem eventos** [E8] | Não ("Not yet"); query strings não registadas [E8] | DPA geral; cobertura do plano grátis não confirmada [E8] | Grátis [E8] | Francês confirmado; português não |

## Detalhes

### 1. Google Analytics 4 sem cookies

#### 1.1 Modo de consentimento: básico e avançado

- **Básico:** as tags da Google não carregam antes de o Visitante responder ao banner. Sem consentimento, não disparam [G1].
- **Avançado:** as tags carregam logo ao abrir a página. Por defeito, o consentimento está recusado. As tags ajustam-se quando o Visitante escolhe [G1].
- **Com `analytics_storage: 'denied'`**, o GA4 "Will not read or write first-party analytics cookies" e envia "cookieless pings" [G3]. A Google diz: "No Analytics cookies are set, accessed, or read from the device" [G3].
- **O que vai nesses pings** [G2][G3]:
  - data e hora, user agent, referrer;
  - um número aleatório gerado em cada carregamento da página;
  - o estado do consentimento;
  - "user agent, screen resolution, IP address", como parte normal da comunicação HTTP.
- **O IP.** Segundo a Google, para Visitantes da UE o IP só serve para deduzir a localização e é apagado logo a seguir, em servidores na UE [G11].
- **Para que servem.** "The data collected in the cookieless ping is used for behavioral and conversion modeling, to fill the gaps in your data" [G2]. No modo básico não há pings, e por isso não há modelação [G2].

#### 1.2 O que aparece nos relatórios, e os limiares da modelação

- **Regra geral.** Sem modelação, os relatórios "only include data available from users who consented to the use of identifiers" [G4].
- **Se não houver tráfego consentido suficiente**: "if there isn't enough consented traffic to inform the model, then events triggered by users who decline consent aren't reported" [G4].
- **Condições para a modelação** (todas cumulativas) [G4]:
  - modo de consentimento em todas as páginas, na implementação avançada;
  - "at least 1,000 events per day with analytics_storage='denied' for at least 7 days";
  - "at least 1,000 daily users sending events with analytics_storage='granted' for at least 7 of the previous 28 days";
  - mesmo assim, não é garantido: o modelo também olha para a proporção de novos e recorrentes e para a relação entre utilizadores e sessões.
- **O que isto dá nesta página.** Dezenas a poucas centenas de visitas por mês são 1 a 10 visitas por dia.
  - **Com banner:** os relatórios mostram só quem aceita. Os outros não aparecem, e a modelação nunca fica disponível.
  - **Sem banner, com tudo recusado por defeito:** zero utilizadores com consentimento, logo zero modelação. Os relatórios normais não mostram estas visitas [G4].
- **Única forma de ver os pings sem cookies:** a exportação para o BigQuery. A Google diz que "cookieless pings collected by Analytics will be present in the BigQuery export" [G5].
  - O BigQuery sandbox é grátis, mas "all tables, views, and partitions automatically expire after 60 days" [G6].
  - Fontes secundárias indicam que estes eventos chegam sem identificador de utilizador nem de sessão. Dá para contar páginas vistas e cliques, mas não Visitantes (não confirmado em fonte oficial).
- **Conservação.** Os dados ao nível do utilizador e dos eventos ficam 2 ou 14 meses, à escolha [G12].

#### 1.3 Outras vias para usar o GA4 sem cookies

- **Configuração do gtag.** A referência de configuração do GA4 só permite mudar o domínio, o prazo e o nome dos cookies. Por exemplo, `cookie_expires: 0` torna o cookie de sessão [G7]. Não encontrei nenhuma opção que desligue o armazenamento no navegador além do modo de consentimento.
- **Server-side tagging.** O contentor "runs on a server that you control", no Google Cloud ou noutro ambiente [G8]. O navegador continua a carregar o gtag.js e a enviar eventos, agora para esse servidor [G8]. Precisa de um servidor, que este alojamento não tem.
- **Measurement Protocol** [G9]:
  - é feito "to augment automatic collection through gtag, Tag Manager, and Google Analytics for Firebase, not to replace it";
  - "You must use tagging (gTag, Tag Manager, or Google Analytics for Firebase) to use this protocol";
  - sozinho, "only partial reporting may be available";
  - o `api_secret` "is private. Don't expose it in the client-side code of your website or app".
  - Logo, não serve a partir de uma página estática sem servidor.
- **Servir o gtag no próprio domínio (Google tag gateway).** O CDN, o balanceador ou o servidor web tem de reencaminhar um caminho reservado (por exemplo `/metrics/`) para `<ID>.fps.goog` [G10]. Também tem de reescrever o cabeçalho Host e acrescentar cabeçalhos de geolocalização [G10]. Isto é um proxy reverso. Na Infomaniak, o `mod_rewrite` está ativo [I3], mas não encontrei confirmação de `mod_proxy`. Copiar o ficheiro gtag.js para o site não muda o destino dos dados, que continuam a ir para \*.google-analytics.com. Além disso, a Google serve-o com `cache-control: private, max-age=900` [M1]. A Google não documenta esta cópia.

#### 1.4 Tamanho do gtag.js e domínios contactados

Medição a 13/10/2026 [M1], em bytes transferidos (`curl` com o cabeçalho `Accept-Encoding` indicado):

| Contentor | gzip | br | zstd (cabeçalho do Chrome) | Descomprimido |
|---|---|---|---|---|
| ID inexistente (contentor genérico) | 155 487 | 151 850 | 155 012 | 439 662 |
| Propriedade GA4 real (tailwindcss.com) | 179 689 | não servido¹ | 179 653 | 533 870 |
| Propriedade GA4 real (kubernetes.io) | 190 227 | não servido¹ | 190 140 | 574 573 |

¹ Só com `Accept-Encoding: br`, a Google devolveu o ficheiro sem compressão.

- **Peso:** entre 152 KB e 190 KB comprimidos, ou seja, 2 a 2,5 vezes o limite de 75 KB de JS do ticket #15. É também 38 % a 48 % do limite de 400 KB da página inteira.
- **Domínios:**
  - o script vem de www.googletagmanager.com;
  - a recolha vai para \*.google-analytics.com e \*.analytics.google.com (para a UE, "region1") [G11][M1];
  - o código também contém endereços de stats.g.doubleclick.net, google.com e googleadservices.com. Não testei num navegador quais são contactados com a configuração por defeito.
- **Cache:** `cache-control: private, max-age=900`. Um Visitante que volte passados 15 minutos pode ter de descarregar o script outra vez [M1].

#### 1.5 O GA4 sem cookies precisa de consentimento?

- **Diretiva ePrivacy (EDPB).**
  - "JavaScript code, where the accessing entity instructs the browser of the user to send asynchronous requests with the targeted information" cai "clearly" no art. 5.º, n.º 3 [U1 § 33].
  - O mesmo vale para os pixels construídos por JavaScript: "it is the distribution of the applicative logic (usually a JavaScript code) that constitutes the instruction" [U1 § 51].
  - O rastreio só pelo IP também pode cair no art. 5.º, n.º 3 [U1 §§ 54–55].
  - Estar abrangido "does not systematically mean that consent needs to be collected": é preciso ver se há uma exceção [U1 § 56].
- **Portugal.**
  - A Lei 41/2004 só dispensa o consentimento quando o armazenamento ou o acesso são "estritamente necessário[s]" para um serviço "solicitado expressamente" pelo Visitante [P1 art. 5.º, n.º 2].
  - A CNPD exige consentimento "quando tal se impõe, como é o caso de cookies para fins de analítica" [P2].
  - Não encontrei nenhuma posição da CNPD que trate a analítica sem cookies de outra forma (§ 5.1).
- **França (CNIL).**
  - A isenção não se aplica "notamment lorsque les fournisseurs indiquent réutiliser les données pour leur propre compte". A CNIL dá como exemplo as políticas do Google Analytics. Lembra também a decisão SAN-2020-008, segundo a qual os cookies do Google Analytics "n'ont pas pour finalité exclusive de permettre ou de faciliter la communication par voie électronique et ne sont pas strictement nécessaires à la fourniture du service" [F4].
  - Os critérios de 2025 excluem qualquer "réutilisation des données pour le propre compte du prestataire et quelle que soit la finalité (amélioration de son service, lutte contre la fraude, etc.)" [F2].
  - A Google diz que, mesmo com toda a partilha desligada, os dados "may also be used only insofar as necessary to Maintain and protect the Analytics service" [G13]. Há aqui uma tensão com os critérios da CNIL (leitura minha).
  - Por defeito, o GA4 também recolhe as UTM e o referrer completo, que os critérios de 2025 mandam desligar [F2].
  - Em 2021, a Google escreveu que "Il appartient à nos clients d'évaluer la configuration de l'outil Google Analytics" e que estava a ponderar entrar no programa de avaliação da CNIL [G16]. Não encontrei nenhuma auto-avaliação CNIL publicada pela Google.
- **Termos da Google.** O cliente deve garantir que o Visitante "consents to, the storing and accessing of cookies or other information on the User's device […] where providing such information and obtaining such consent is required by law" [G14].
- **Conclusão desta pesquisa.** Não encontrei nenhuma fonte oficial que dispense de consentimento o GA4 sem cookies, em Portugal ou em França. As fontes apontam no sentido contrário. Fica marcado como **Provavelmente sim** (precisa de banner).

#### 1.6 Transferências para os EUA: DPF e recurso Latombe

- **Certificação da Google.** "Google LLC (and its wholly-owned US subsidiaries unless explicitly excluded) has certified that it adheres to the DPF Principles" [G15]. Não consegui confirmar na lista oficial do DPF, que é uma aplicação JavaScript.
- **Posição da CNIL.** Desde a decisão de adequação de 10/07/2023, as transferências para entidades certificadas fazem-se livremente [F5][F6]. A antiga página da CNIL sobre as notificações relativas ao Google Analytics redireciona hoje para a notícia dessa decisão [F6].
- **Recurso Latombe.**
  - O Tribunal Geral rejeitou o pedido de anulação do DPF a 3/09/2025 (T-553/23) [U6].
  - Philippe Latombe recorreu para o Tribunal de Justiça a 31/10/2025 (processo C-703/25 P, publicado no JO C/2025/6610 de 22/12/2025). Pede a anulação da Decisão de Execução (UE) 2023/1795, com quatro fundamentos [U6].
  - A 13/10/2026 não encontrei acórdão nem conclusões do advogado-geral. O site do Tribunal é uma aplicação JavaScript que não consegui ler.
  - Uma fonte secundária refere que a Microsoft foi admitida como interveniente em junho de 2026 [S1].
  - Até haver acórdão, a decisão de adequação continua válida [U7].

### 2. Ferramentas sem cookies

#### 2.1 O que a CNIL exige desde julho de 2025

- **Já não há lista oficial.** A CNIL "a remplacé son programme d'évaluation des solutions de mesure d'audience, qui conduisait au recensement des solutions retenues sur son site web, par la mise à disposition d'un outil d'auto-évaluation" [F3 Q12]. Recomenda que o fornecedor escreva: « D'après notre auto-évaluation, la solution XXX est conforme aux critères établis par la CNIL… ». Proíbe que se apresente como "certifiée" ou "validée par la CNIL" [F1].
- **Condições gerais** [F1][F3 Q9]:
  - finalidade limitada à medição de audiência, "pour le compte exclusif de l'éditeur";
  - só estatísticas anónimas;
  - sem cruzamento com outros dados nem seguimento entre sites.
- **Recomendações** [F1]:
  - informar na política de privacidade;
  - cookies até 13 meses, sem prolongamento automático;
  - dados conservados até 25 meses.
- **Critérios do outil d'auto-évaluation que pesam nesta escolha** [F2]:
  - no máximo três tipos de eventos: presença numa página; "clic bouton, clic lien" com destino e etiqueta; tempos de carregamento, deslocamento ou permanência. **Os cliques nos 4 botões estão dentro do permitido.**
  - "Désactivation de toute collecte ou import […] d'UTM ou d'identifiant de campagne dans les URLs". **As UTM ficam de fora.**
  - O referrer, se recolhido, "se limite au domaine".
  - "Toute intégration avec des outils tiers est exclue".
  - Uma impressão digital ("fingerprint") tem de incluir uma componente própria do site e uma componente temporal.
  - O IP só pode localizar até à cidade e perde pelo menos o último octeto.
  - Relatórios com "Agrégation et la présentation à la dizaine la plus proche" (ou uma análise de anonimato).
  - Sem reprodução de sessões ("session replay").
  - DPA de subcontratante; nenhuma reutilização pelo fornecedor.
  - Oposição possível por uma ligação na política de privacidade, guardada com um cookie de oposição ou uma lista negra de impressões digitais.
  - Medir os "canaux d'acquisition" é finalidade de marketing, desligada por defeito.
- **Consequência para esta página.** Uma configuração isenta em França mede visitas e cliques, mas não mede de onde vêm as visitas por UTM. A origem das marcações pode, em vez disso, ser medida no Calendly (§ 4), que é outro tratamento, não analisado juridicamente aqui.

#### 2.2 Notas por ferramenta

- **Plausible** [E1]:
  - "We do not use cookies, browser cache or local storage". O hash usa um sal "rotated and deleted every 24 hours".
  - Os cliques em ligações externas são contados sem código e mostram a página de onde partiram.
  - As propriedades personalizadas (posição, língua) são só do plano Business. No Starter, a posição pode ir no nome do evento, e a língua pode vir do caminho da página ou do URL do Calendly.
  - O DPA aplica-se automaticamente: "No separate signature is required".
  - Um artigo de um advogado no blogue da Plausible diz que a posição "aligns with the views of… CNIL". Não é um documento da CNIL.
- **Simple Analytics** [E2]: é a única que diz não usar nenhum identificador nem hash de IP ("IP replaced with 0.0.0.0"). Mas diz também que não é responsável nem subcontratante e que não é preciso DPA. Isto não encaixa no critério da CNIL que exige um DPA [F2].
- **Fathom** [E3]: tem servidores na UE para Visitantes da UE, mas a base de analítica está na ClickHouse Cloud e os outros subcontratantes são dos EUA. Os cliques exigem JavaScript próprio. A própria Fathom avisa que "not a universal exemption from consent".
- **Pirsch** [E4]:
  - Chama "fingerprinting" ao seu hash diário.
  - É a única deste lote que junta três coisas:
    - eventos com metadados por atributos HTML, no plano mais barato;
    - opção para desligar as UTM e o referrer por atributo;
    - domínio próprio só por DNS (registos A/AAAA), no plano Plus.
  - Com domínio próprio, os pedidos vão para um subdomínio de julienlaffont.com, mas o servidor continua a ser da Pirsch.
- **Matomo Cloud** [E5]:
  - O interruptor "Enforce compliance where possible" aplica a configuração CNIL: IP mascarado em 2 bytes, conservação de 759 dias, UTM removidas, referrer só com o domínio, contagens arredondadas à dezena, sem Visits Log.
  - "CNIL compliance cannot be confirmed until the opt-out is set up".
  - Sem cookies, os Visitantes únicos ficam "inaccurate".
  - O script da conta de demonstração inclui plugins pagos e pesa 63 KB a 67 KB. A Matomo indica "around 19Kb gzipped by default". Não consegui medir o de uma conta pequena.
- **Umami Cloud** [E6]: a empresa é americana, mas a região dos dados pode ser a UE. Os eventos com propriedades fazem-se por atributos HTML. O DPA usa cláusulas-tipo e não menciona o DPF.
- **GoatCounter** [E7]:
  - É grátis e gerido por uma só pessoa na Irlanda.
  - Aceita domínio próprio por CNAME e alojar o script no site.
  - Os cliques fazem-se por atributo, mas sem propriedades. Teria de haver 12 nomes de evento: 4 posições × 3 línguas.
  - Não encontrei DPA, o que é um problema face ao art. 28.º do RGPD.
- **Cloudflare Web Analytics** [E8]: não tem eventos nem UTM. Não responde à pergunta dos cliques.

### 3. Estatísticas a partir dos logs da Infomaniak

- **Painel "Statistiques" do Manager** [I1]:
  - Existe no alojamento Web pago; não existe no plano Starter nem no "Site Creator standalone".
  - Mostra pedidos ("Hits"), ficheiros, páginas vistas, visitas, IP distintos, URL e domínios de origem únicos, países e volume de dados. Há vistas por dia e por mês e uma exportação em CSV.
  - Uma "visita" começa com um pedido de um IP; se o mesmo IP voltar em 30 minutos, conta como a mesma visita.
  - A Infomaniak avisa: "There is no distinction between humans and robots".
  - Os dados vêm dos logs do servidor, sem JavaScript. A Infomaniak não diz que motor usa; os nomes das métricas são os do Webalizer (leitura minha).
  - Está incluído no preço do alojamento [I4].
- **Logs em bruto** [I2]:
  - "Access and error logs are kept for at least 7 days. Once the retention period has elapsed, older entries cannot be restored, even upon request."
  - Estão na pasta `ik-logs`, na raiz do alojamento, acessível por SSH ou FTP. Também se exportam no Manager, em formato `.log` ou por email.
  - Dá para os descarregar todos os dias por SFTP e analisá-los localmente com o GoAccess, guardando-os mais tempo.
  - O formato exato não está documentado; o exemplo da Infomaniak sugere que o IP é o segundo campo.
  - Os IP aparecem por inteiro; não encontrei opção de anonimização.
- **Custo para a página:** nenhum. Não há script, pedido a terceiros nem cookie.
- **O que não medem:**
  - cliques nas ligações para o Calendly, porque o navegador vai diretamente para calendly.com;
  - que botão foi clicado;
  - deslocamento e tempo na página;
  - páginas servidas pela cache do navegador.
  - Também misturam robôs com pessoas, e a "visita" por IP junta colegas atrás do mesmo router e separa telemóveis que mudam de IP.
- **Contar os cliques sem JavaScript (possibilidade técnica, não testada).**
  - Cada botão aponta para uma ligação no próprio domínio, por exemplo `/go/fr-hero`.
  - Um `.htaccess` redireciona-a (302) para a Página de marcação com as UTM.
  - O `mod_rewrite` "is enabled by default on all Infomaniak infrastructures" e as personalizações fazem-se "via an .htaccess file" [I3].
  - Cada clique fica no log com a posição e a língua.
  - Custa um salto de redirecionamento, e os robôs e o pré-carregamento podem inflacionar a contagem.
- **Consentimento.** Os logs existem de qualquer forma, para o servidor funcionar. Usá-los para estatísticas é a opção de menor risco. Não encontrei nenhuma fonte que confirme que dispensa consentimento, e o EDPB admite que o rastreio só pelo IP pode cair no art. 5.º, n.º 3 [U1 § 55].

### 4. Medir as marcações no Calendly

- **UTM na ligação** [C1][C2]:
  - **Plano:** todos ("All plans").
  - **Parâmetros:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` e `utm_term`. O próprio artigo dá o exemplo "utm_content=header or utm_content=footer".
  - **Onde aparecem:** na página Calendar, com o filtro "Tracking IDs". Também na exportação CSV, que inclui "UTM parameters", e nos webhooks e no Zapier (objeto `tracking`).
  - **Limite:** "UTM values must be 255 characters or less".
  - **Para esta página:** quatro botões com `utm_content` diferentes (por exemplo `hero`, `blocos`, `garantia`, `rodape`) e uma Página de marcação por língua dão as marcações por posição e por língua, sem nada na página.
- **Integração GA4 do Calendly** [C3]:
  - **Planos:** "Professional, Standard, Standard Plus, Teams, Teams Plus, and Enterprise". Não existe no plano grátis.
  - **Configuração:** uma Measurement ID GA4 por organização Calendly. Não há integração direta com o Google Tag Manager.
  - **Eventos:** `invitee_scheduling_page`, `invitee_event_type_page`, `invitee_select_day`, `invitee_select_time`, `invitee_meeting_scheduled` (e dois de formulários de encaminhamento).
  - **Funciona na Página de marcação ligada**, sem incorporação. "Without UTM tags, GA will show the source as (direct)".
- **Consentimento no calendly.com** [C5][C6]:
  - "Calendly asks for cookie consent from all EU visitors".
  - "Calendly won't store non-session (persistent) cookies unless you allow them".
  - "You can't hide or change the cookie banner on your booking page".
  - Ou seja, o GA4 da Página de marcação corre sob o banner do Calendly, e não sob um banner da landing page.
  - Não confirmei se o GA4 do Calendly envia algo antes do consentimento ou depois de uma recusa.
- **Página de agradecimento própria** [C7]:
  - **Planos:** os mesmos planos pagos; não existe no grátis.
  - **Configuração:** "Redirect to an external site", com a opção "Pass event details to your redirected page".
  - **Dados transmitidos:** essa opção acrescenta ao URL o nome e o email do convidado e as UTM.
  - **Leitura minha:** nesse caso, o nome e o email ficariam escritos nos logs da Infomaniak. Sem a opção, uma página de agradecimento estática contaria as marcações nos logs, sem JavaScript.
- **Incorporação (só para referência)** [C4]: os eventos `calendly.event_scheduled` e afins só existem com a Página de marcação incorporada. A incorporação é um caso que a pesquisa legal já tratou à parte.
- **Dados e contrato** [C8]: "Processing of Personal Data will occur in the United States and other jurisdictions". O Calendly diz estar "self-certified under the Data Privacy Frameworks".
- **Preços por utilizador e por mês** [C9]:

| Plano | Faturação mensal | Faturação anual |
|---|---|---|
| Free | 0 € | 0 € |
| Standard | 12 € | 10 € |
| Standard Plus | 24 € | 18 € |
| Teams | 20 € | 16 € |
| Teams Plus | 32 € | 24 € |
| Enterprise | a partir de 15 000 US$/ano | |

### 5. Atualização legal

#### 5.1 CNPD depois de 2021

- **A diretriz anunciada não saiu.** Em 2021, a CNPD anunciou diretrizes gerais sobre cookies para esse ano [P2]. O relatório de atividades de 2023 diz que ficou "por concretizar" "a aprovação da Diretriz sobre cookies", porque o EDPB estava a preparar as Guidelines 2/2023, cuja consulta pública só terminou em janeiro de 2024 [P4].
- **A lista oficial não a inclui.** A lista de diretrizes da CNPD tem 5 registos: 1/2023, 1/2022, 2/2019, 1/2019 e 1/2018. Nenhum é sobre cookies [P3].
- **Os relatórios e planos seguintes não a retomam.** Não encontrei nenhuma referência à diretriz nos relatórios de 2024 e de 2025 [P5] nem nos planos de atividades de 2026 e de 2027 [P6].
- **Nenhuma isenção para a medição de audiência.** Numa conferência a 28/10/2025, a CNPD lembrou que o consentimento tem de ser "inequívoco" e "específico e diferenciado". Não referiu nenhuma isenção para a medição de audiência [P7].
- **Conclusão.** Vale a nota de 2021 (analítica precisa de consentimento) e o art. 5.º da Lei 41/2004 [P1][P2]. Não encontrei nada equivalente à isenção da CNIL.

#### 5.2 Digital Omnibus (procedimento 2025/0360(COD))

- **Proposta da Comissão, COM(2025) 837, de 19/11/2025** [U2]:
  - **Novo art. 88.º-A do RGPD.** Dispensa o consentimento quando o armazenamento ou o acesso no terminal são necessários para "creating aggregated information about the usage of an online service to measure the audience of such a service, where it is carried out by the controller of that online service solely for its own use" (n.º 3, al. c)).
  - **Recusa.** Quem recusar não pode voltar a ser questionado durante pelo menos seis meses.
  - **Diretiva ePrivacy.** O art. 5.º, n.º 3, deixaria de se aplicar quando o utilizador é uma pessoa singular e a informação é ou leva a dados pessoais.
  - **Aplicação:** 6 meses depois da entrada em vigor.
- **Parlamento Europeu** [U3]:
  - **Comissões:** ITRE e LIBE em conjunto, com as relatoras Aura Salla (PPE) e Marina Kaljurand (S&D).
  - **Andamento:** projeto de relatório a 22/06/2026; alterações apresentadas a 27/07/2026.
  - **Estado a 13/10/2026:** "Awaiting committee decision".
  - Não consegui ler o projeto de relatório (página protegida contra pedidos automáticos).
- **Conselho, nota da Presidência de 22/06/2026 (ST 10729/26), com o texto proposto como mandato de negociação** [U4]:
  - **Art. 88.º-A apagado.** Diz expressamente "full deletion of Article 88a GDPR". As regras de cookies voltam ao art. 5.º, n.º 3, da Diretiva ePrivacy.
  - **Nova isenção na ePrivacy (al. c)).** Cobre "Measuring the audience of an online service by creating anonymous aggregated information about the usage of that online service, where it is carried out by the provider of that online service, including jointly with others, or on behalf of that provider". A condição geral é que seja "solely related to and strictly necessary".
  - **Prazo:** os Estados-Membros teriam 24 meses para transpor.
  - **Mandato não confirmado.** Não encontrei confirmação oficial de que o Coreper tenha aprovado este mandato. Uma nota da Presidência de 10/09/2026 só anuncia um ponto de situação dos pacotes Omnibus [U5]. Uma fonte secundária diz que, a 12/10/2026, o mandato ainda não estava aprovado [S2].
- **O que isto significa.**
  - Nada disto está em vigor, e os dois textos diferem.
  - Mesmo com acordo, a isenção só se aplicaria 6 meses depois da entrada em vigor (texto da Comissão) ou depois da transposição nacional, até 24 meses (texto do Conselho).
  - Os dois textos limitam a isenção a medições feitas pelo próprio responsável ou por conta dele. Isso parece excluir um fornecedor que reutilize os dados para si (leitura minha, não confirmada).
  - Para o Lançamento comercial, vale o regime atual.

## Implicações para a decisão

Esta secção não decide. Mostra o que cada caminho implica.

- **GA4, como pedido pelo Julien.**
  - Obriga a um banner de consentimento em Portugal (§ 1.5).
  - Quebra as duas restrições do ticket #15: pedidos a domínios da Google antes de qualquer clique e 152 KB a 190 KB de JS, contra 75 KB.
  - Precisa de uma exceção explícita registada no ticket #14.
  - Num site com 1 a 10 visitas por dia, só mostra quem aceita.
- **GA4 "sem cookies" sem banner.**
  - Não resolve a questão legal (§ 1.5).
  - Não mostra nada nos relatórios do GA4 (§ 1.2).
  - Na prática, junta o pior dos dois lados para este site.
- **Ferramenta sem cookies (Pirsch, Plausible, Umami…).**
  - Cumpre o orçamento de JS (2 KB a 4 KB).
  - Continua a ser um pedido a terceiros, a não ser que o plano permita um subdomínio próprio por DNS (Pirsch Plus, GoatCounter, Simple Analytics nos planos superiores). Fica por decidir se um subdomínio de julienlaffont.com conta como "outro domínio" para o ticket #15.
  - Em Portugal, continua em zona cinzenta.
  - Em França, a isenção só é defensável com uma configuração conforme aos critérios da CNIL. Isso implica, entre outras coisas, desligar as UTM e reduzir o referrer ao domínio. Só a Matomo publica essa auto-avaliação.
- **Logs da Infomaniak (e GoAccess).**
  - Não acrescentam nada à página e cumprem o ticket #15 sem exceção.
  - Mostram tendências grosseiras, misturadas com robôs.
  - Os cliques só se contam com ligações de redirecionamento no próprio domínio.
- **UTM nas ligações para o Calendly.**
  - Medem o que mais interessa: marcações por botão e por língua.
  - Não acrescentam nada à página e funcionam no plano grátis.
  - Juntam-se a qualquer das opções acima.
- **Combinação sem banner e sem pedidos a terceiros, segundo as fontes:**
  - logs da Infomaniak para as visitas;
  - redirecionamentos `/go/…` para os cliques;
  - UTM no Calendly para as marcações.
  - Esta combinação não dá dados por Visitante nem a origem das visitas por campanha.

**Informação que o Julien tem de fornecer ou confirmar:**

- se aceita um banner de consentimento na página (condição para o GA4);
- se o GA4 é um requisito, ou se o objetivo é saber "quantas visitas e de onde vêm as marcações";
- o plano Calendly que tem ou vai ter (integração GA4 e redirecionamento só nos planos pagos);
- se quer pagar uma ferramenta (0 a 22 € por mês) e em que língua quer o painel;
- se considera um subdomínio de julienlaffont.com aceitável face à regra "0 pedidos a outros domínios".

## O que não consegui confirmar

- **Comportamento do gtag.js com o consentimento recusado.** Não testei num navegador:
  - se usa localStorage ou sessionStorage nesse estado (o código contém chamadas a `localStorage`);
  - que domínios contacta com a configuração por defeito.
- Se os pings sem cookies aparecem no relatório **Tempo real** do GA4. Também não confirmei, em fonte oficial, que chegam ao BigQuery sem identificador de utilizador e de sessão.
- **Google Analytics na antiga lista da CNIL.** Não confirmei se alguma vez constou. A lista já não está no site da CNIL e o arquivo web recusou os pedidos.
- **Certificação DPF da Google.** Não confirmei o estado ativo da Google LLC na lista oficial do DPF; li apenas a declaração da própria Google.
- **Recurso Latombe (C-703/25 P).** Não confirmei o estado no site do Tribunal de Justiça; a intervenção da Microsoft vem de uma fonte secundária.
- **Digital Omnibus.** Ficou por confirmar:
  - se o Coreper aprovou o mandato do Conselho, e com que texto;
  - o conteúdo do projeto de relatório do Parlamento sobre a medição de audiência.
- **Infomaniak.** Ficou por confirmar:
  - o motor e a conservação das estatísticas do Manager;
  - o formato exato do `access.log`;
  - se o `mod_proxy` está disponível.
- **Calendly.** Ficou por confirmar:
  - se o GA4 do Calendly envia algo antes do consentimento ou depois de uma recusa;
  - se o plano grátis exporta o CSV com as UTM;
  - se as UTM aparecem nas notificações por email.
- **Fornecedores.** Ficou por confirmar:
  - as línguas do painel da Plausible, da Simple Analytics e da Fathom;
  - o escalão de 15 € da Simple Analytics;
  - o uso comercial no plano grátis da Umami;
  - o DPA do GoatCounter;
  - o tamanho do script da Matomo numa conta pequena;
  - os preços com IVA.
- A ausência de auto-avaliação CNIL na Plausible, na Simple Analytics, na Fathom, na Pirsch, na Umami, no GoatCounter e no Cloudflare foi verificada na documentação de cada um e por pesquisa. Não ter encontrado não prova que não exista.
- Se as UTM que o Calendly regista exigem alguma informação ou base legal própria. Não foi analisado.

## Como foi feita a pesquisa

- **Documentação oficial.** Li a da Google (Analytics Help, Tag Platform, BigQuery), a da CNIL (páginas, FAQ de 29/04/2026 e outil d'auto-évaluation de julho de 2025), a da CNPD (lista de diretrizes, relatórios de atividades de 2023 a 2025, planos de 2026 e 2027) e a de cada fornecedor (documentação, preços, DPA, termos).
- **Textos da UE.** As Guidelines 2/2023 do EDPB, a proposta COM(2025) 837 e o anúncio do recurso C-703/25 P foram lidos através do serviço Cellar do Serviço das Publicações da UE (mesmo conteúdo do EUR-Lex). O estado do procedimento veio do Observatório Legislativo. A nota do Conselho ST 10729/26 veio do registo público do Conselho.
- **Medições.** Medi os tamanhos com `curl -s -H 'Accept-Encoding: …' -o /dev/null -w '%{size_download}'`, para gzip, br e o cabeçalho do Chrome (`gzip, deflate, br, zstd`), e confirmei o cabeçalho `content-encoding`. O gtag.js foi medido com um ID inexistente e com duas propriedades GA4 reais de sites públicos. Os scripts foram descarregados e inspecionados como texto; nenhum foi executado.
- **Pesquisa em paralelo.** Parte da pesquisa sobre os fornecedores, a Infomaniak e o Calendly foi feita em paralelo por subagentes, com as mesmas regras de fontes e de datas.
- **Fontes secundárias.** Usei duas, só onde as primárias não estavam acessíveis, e estão marcadas [S].

## Fontes

Todas consultadas a 13/10/2026.

**Google**

- [G1] Google Tag Platform, "Consent mode overview": <https://developers.google.com/tag-platform/security/concepts/consent-mode>
- [G2] Analytics Help, "Consent mode on websites and mobile apps": <https://support.google.com/analytics/answer/9976101>
- [G3] Analytics Help, "Consent mode reference": <https://support.google.com/analytics/answer/13802165>
- [G4] Analytics Help, "[GA4] Behavioral modeling for consent mode" (secções "Maintain rigorous reporting" e "Prerequisites"): <https://support.google.com/analytics/answer/11161109>
- [G5] Analytics Help, "[GA4] BigQuery Export" (secção "Cookieless pings and customer-provided data"): <https://support.google.com/analytics/answer/9358801>
- [G6] Google Cloud, "BigQuery sandbox": <https://cloud.google.com/bigquery/docs/sandbox>
- [G7] Google Analytics, referência de configuração do GA4 (`cookie_expires`, `cookie_update`…): <https://developers.google.com/analytics/devguides/collection/ga4/reference/config>
- [G8] Google Tag Platform, "An introduction to server-side tagging": <https://developers.google.com/tag-platform/tag-manager/server-side/intro>
- [G9] Google Analytics, "Measurement Protocol": <https://developers.google.com/analytics/devguides/collection/protocol/ga4> e "Send Measurement Protocol events": <https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events>
- [G10] Google Tag Platform, "Google tag gateway for advertisers": <https://developers.google.com/tag-platform/tag-manager/gateway> e configuração manual: <https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide?setup=manual>
- [G11] Analytics Help, "EU, Switzerland, or UK-focused data and privacy": <https://support.google.com/analytics/answer/12017362>
- [G12] Analytics Help, "Data retention": <https://support.google.com/analytics/answer/7667196>
- [G13] Analytics Help, "Data sharing settings": <https://support.google.com/analytics/answer/1011397>
- [G14] Google Analytics Terms of Service, secção 7: <https://marketingplatform.google.com/about/analytics/terms/us/>
- [G15] Google, "Data transfer frameworks": <https://policies.google.com/privacy/frameworks>
- [G16] Google, "Google Analytics & Protection de la vie privée des utilisateurs", 8/04/2021: <https://services.google.com/fh/files/misc/ga_user_privacy_fr_french.pdf>

**França**

- [F1] CNIL, "Cookies : solutions pour les outils de mesure d'audience", 04/07/2025: <https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience>
- [F2] CNIL, "Outil d'auto-évaluation relatif à la mise en œuvre d'une solution de mesure d'audience exemptée de consentement", julho de 2025: <https://www.cnil.fr/sites/default/files/2025-07/outil_d_auto-evaluation_mesure_d_audience.pdf>
- [F3] CNIL, "Questions-réponses sur les lignes directrices modificatives et la recommandation « cookies et autres traceurs »", 29/04/2026, perguntas 9 a 12: <https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ>
- [F4] CNIL, "Mesurer la fréquentation de vos sites web et de vos applications" (guia para programadores; página datada de 27/01/2020): <https://www.cnil.fr/fr/mesurer-la-frequentation-de-vos-sites-web-et-de-vos-applications>
- [F5] CNIL, "Mesure d'audience et transferts de données : comment mettre son outil de mesure d'audience en conformité avec le RGPD ?", 15/11/2023: <https://www.cnil.fr/fr/mesure-daudience-et-transferts-de-donnees-comment-mettre-son-outil-de-mesure-daudience-en-conformite>
- [F6] CNIL, "Transferts de données vers les États-Unis : la Commission européenne adopte une nouvelle décision d'adéquation", 10/07/2023 (destino atual do antigo endereço das perguntas e respostas sobre o Google Analytics): <https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/questions-reponses-sur-les-mises-en-demeure-de-la-cnil-concernant-lutilisation-de-google-analytics>

**Portugal**

- [P1] Lei n.º 41/2004, art. 5.º, na redação da Lei 46/2012. ANACOM: <https://www.anacom.pt/render.jsp?contentId=944401>
- [P2] CNPD, Nota informativa relativa à utilização de cookies, 25/06/2021: <https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf> e notícia: <https://www.cnpd.pt/comunicacao-publica/noticias/nota-da-cnpd-sobre-cookies/>
- [P3] CNPD, lista de diretrizes: <https://www.cnpd.pt/decisoes/diretrizes/>
- [P4] CNPD, Relatório de atividades de 2023 (aprovado a 4/06/2024): <https://www.cnpd.pt/media/rxvfiafs/cndp_relatorioatividades_2023.pdf>
- [P5] CNPD, Relatórios de atividades de 2024 e de 2025: <https://www.cnpd.pt/media/l2vkfwc4/cndp_relatorioatividades_2024.pdf> e <https://www.cnpd.pt/media/v50frkwy/relatorio-atividades-de-2025.pdf> (índice: <https://www.cnpd.pt/cnpd/relatorios-de-atividades/>)
- [P6] CNPD, Planos anuais de atividades de 2026 e de 2027: <https://www.cnpd.pt/media/hvoac3wj/cndp_paa_2026_versao_digital.pdf> e <https://www.cnpd.pt/media/v41ddl43/cnpd_plano-anual-de-atividades-2027.pdf> (índice: <https://www.cnpd.pt/cnpd/planos-de-atividades/>)
- [P7] CNPD, "Comunicações promocionais não solicitadas e cookies destacados em conferência de marketing direto", 13/11/2025: <https://www.cnpd.pt/comunicacao-publica/noticias/comunicacoes-promocionais-nao-solicitadas-e-cookies-destacados-em-conferencia-de-marketing-direto/>

**União Europeia**

- [U1] EDPB, Guidelines 2/2023 on Technical Scope of Art. 5(3) of ePrivacy Directive, versão 2.0 de 7/10/2024, §§ 32–33, 51 e 54–56: <https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf>
- [U2] Comissão Europeia, proposta COM(2025) 837 ("Digital Omnibus"), art. 3.º (novos arts. 88.º-A e 88.º-B do RGPD) e art. 5.º (Diretiva 2002/58/CE): <https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0837>
- [U3] Parlamento Europeu, Observatório Legislativo, procedimento 2025/0360(COD): <https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025/0360(COD)>
- [U4] Conselho da UE, nota ST 10729/26 de 22/06/2026, "Mandate for negotiations with the European Parliament" (§ 11 e art. 5.º do anexo): <https://data.consilium.europa.eu/doc/document/ST-10729-2026-INIT/en/pdf>
- [U5] Conselho da UE, nota ST 12955/26 de 10/09/2026, "Omnibus simplification packages: state of play": <https://data.consilium.europa.eu/doc/document/ST-12955-2026-INIT/en/pdf>
- [U6] Recurso interposto em 31/10/2025 por Philippe Latombe do acórdão do Tribunal Geral de 3/09/2025 no processo T-553/23 (processo C-703/25 P), JO C/2025/6610 de 22/12/2025: <https://eur-lex.europa.eu/eli/C/2025/6610/oj/eng>
- [U7] Decisão de Execução (UE) 2023/1795 da Comissão (adequação do EU-US Data Privacy Framework): <https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj>

**Fornecedores de estatísticas**

- [E1] Plausible: <https://plausible.io/data-policy>, <https://plausible.io/dpa>, <https://plausible.io/imprint>, <https://plausible.io/privacy-focused-web-analytics>, <https://plausible.io/docs/proxy/introduction>, <https://plausible.io/docs/outbound-link-click-tracking>, <https://plausible.io/docs/custom-event-goals>, <https://plausible.io/docs/custom-props/introduction>, <https://plausible.io/docs/stop-tracking-utm-tags>, preços: <https://plausible.io/#pricing>
- [E2] Simple Analytics: <https://docs.simpleanalytics.com/compliance-faq>, <https://docs.simpleanalytics.com/explained/unique-visits>, <https://docs.simpleanalytics.com/bypass-ad-blockers>, <https://docs.simpleanalytics.com/automated-events>, <https://docs.simpleanalytics.com/ignore-metrics>, preços: <https://www.simpleanalytics.com/pricing>
- [E3] Fathom: <https://usefathom.com/legal/compliance/eprivacy-compliant-website-analytics>, <https://usefathom.com/changelog/mar2023-firewall-settings>, <https://usefathom.com/legal/dpa>, <https://usefathom.com/legal/security>, <https://usefathom.com/docs/events/overview>, preços: <https://usefathom.com/pricing>
- [E4] Pirsch: <https://pirsch.io/legal>, <https://docs.pirsch.io/privacy>, <https://docs.pirsch.io/get-started/frontend-integration>, <https://docs.pirsch.io/advanced/events>, <https://docs.pirsch.io/advanced/custom-domains>, <https://docs.pirsch.io/advanced/proxy>, <https://docs.pirsch.io/advanced/embedding>, preços: <https://pirsch.io/pricing>
- [E5] Matomo: <https://matomo.org/matomo-cloud-dpa/>, <https://matomo.org/matomo-cloud-dpa/subprocessors/>, <https://matomo.org/faq/general/faq_157/>, <https://matomo.org/faq/general/faq_156/>, <https://matomo.org/faq/how-to/how-do-i-configure-matomo-without-tracking-consent-for-french-visitors-cnil-exemption/>, <https://matomo.org/faq/cloud/how-to-use-a-custom-domain-for-matomo-cloud/>, <https://matomo.org/faq/general/will-the-matomo-analytics-js-tracker-slow-down-my-site/>, <https://developer.matomo.org/guides/tracking-javascript-guide>, <https://developer.matomo.org/guides/content-tracking>, línguas: <https://github.com/matomo-org/matomo/tree/5.x-dev/lang>, preços: <https://matomo.org/pricing/>
- [E6] Umami: <https://umami.is/dpa>, <https://umami.is/terms>, <https://umami.is/subprocessors>, <https://docs.umami.is/docs/faq>, <https://docs.umami.is/docs/track-events>, <https://docs.umami.is/docs/bypass-ad-blockers>, código: <https://github.com/umami-software/umami>, preços: <https://umami.is/pricing>
- [E7] GoatCounter: <https://www.goatcounter.com/help/privacy>, <https://www.goatcounter.com/help/sessions>, <https://www.goatcounter.com/help/faq>, <https://www.goatcounter.com/help/countjs-host>, <https://www.goatcounter.com/help/events>, <https://www.goatcounter.com/help/campaigns>, <https://www.goatcounter.com/help/gdpr>, <https://www.goatcounter.com/help/terms>
- [E8] Cloudflare: <https://www.cloudflare.com/web-analytics/>, <https://developers.cloudflare.com/web-analytics/faq/>, <https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/>, DPA: <https://www.cloudflare.com/cloudflare-customer-dpa/>

**Infomaniak**

- [I1] FAQ 83, "Show website statistics": <https://www.infomaniak.com/en/support/faq/83/show-website-statistics>
- [I2] FAQ 1926, "Display web access and error logs": <https://www.infomaniak.com/en/support/faq/1926/display-web-access-and-error-logs>
- [I3] FAQ 456, "Using mod_rewrite": <https://www.infomaniak.com/en/support/faq/456/using-mod-rewrite>
- [I4] Alojamento Web (página do produto): <https://www.infomaniak.com/en/hosting/web-hosting>

**Calendly**

- [C1] "How to track conversions with UTM parameters": <https://calendly.com/help/how-to-track-conversions-with-utm-parameters>
- [C2] "Tracking and reporting": <https://calendly.com/help/tracking-and-reporting>
- [C3] "Calendly + Google Analytics": <https://calendly.com/help/calendly-google-analytics>
- [C4] "How to track embed activity in Google Analytics": <https://calendly.com/help/how-to-track-embed-activity-in-google-analytics>
- [C5] "Calendly cookie management and banner": <https://calendly.com/help/calendly-cookie-management-and-banner>
- [C6] "Cookies and your Calendly experience": <https://calendly.com/help/cookies-and-your-calendly-experience>
- [C7] "How to redirect invitees to another site after booking": <https://calendly.com/help/how-to-redirect-invitees-to-another-site-after-booking>
- [C8] Calendly, Data Processing Addendum: <https://calendly.com/dpa>
- [C9] Calendly, preços: <https://calendly.com/pricing>

**Medições próprias**

- [M1] gtag.js, 13/10/2026: `https://www.googletagmanager.com/gtag/js?id=<ID>` para um ID inexistente (G-XXXXXXXXXX) e para G-TMR96VNVMT (tailwindcss.com) e G-JPP6RFM2BP (kubernetes.io). Medido com `curl -s -H 'Accept-Encoding: <gzip|br|gzip, deflate, br, zstd>' -o /dev/null -w '%{size_download}'`. Domínios lidos no código descarregado.
- [M2] Scripts das ferramentas sem cookies, 13/10/2026, medidos da mesma forma:
  - plausible.io/js/pa-…;
  - scripts.simpleanalyticscdn.com/latest.js e auto-events.js;
  - cdn.usefathom.com/script.js;
  - api.pirsch.io/pa.js;
  - cdn.matomo.cloud/`<conta de demonstração>`.matomo.cloud/matomo.js;
  - cloud.umami.is/script.js;
  - gc.zgo.at/count.js;
  - static.cloudflareinsights.com/beacon.min.js.

**Fontes secundárias** (usadas só onde a fonte primária não estava acessível)

- [S1] DataGuidance, "EU: CJEU admits Microsoft as intervener in appeal concerning EU–US Data Privacy Framework": <https://www.dataguidance.com/news/eu-cjeu-admits-microsoft-intervener-appeal-concerning>
- [S2] Acompli, "Digital Omnibus GDPR and Cookie Reforms Stall Without a Council Mandate": <https://acompli.ie/news/digital-omnibus-gdpr-cookies-status-september-2026/>
