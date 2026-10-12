# Que ferramentas de marcação servem para um site estático?

> Pesquisa do ticket [#9](https://github.com/juliensl/julien-devops-lp/issues/9) (mapa [#4](https://github.com/juliensl/julien-devops-lp/issues/4)).
> Fontes consultadas e preços verificados a **12/10/2026**. Preços sem IVA, salvo indicação.
> Este documento **não decide**: a escolha fica para o ticket [#10](https://github.com/juliensl/julien-devops-lp/issues/10) ("Que ferramenta e que forma de marcação?"), validado pelo Julien.

## Pergunta

Que ferramentas externas permitem a um CTO marcar uma Conversa com o Julien a partir da landing page (site estático em Astro, alojado na Infomaniak)? Como se comparam em ligação vs incorporação, peso de JavaScript no navegador, cookies e RGPD, línguas (francês, inglês, português), preço para um freelancer, criação automática da ligação Google Meet e outras limitações?

Ferramentas analisadas: **marcações do Google Calendar** ("appointment schedules"), **Calendly**, **Cal.com** e **Zoho Bookings**. O Zoho Bookings foi acrescentado por ser a alternativa credível que guarda os dados num centro de dados na UE.

## Resumo

- **As quatro servem um site estático.** São serviços alojados: o site só precisa de uma ligação ou de um iframe, sem servidor próprio. Todas criam automaticamente a ligação Google Meet: o Google Calendar de forma nativa, as outras através da ligação ao Google Calendar do Julien.
- **A forma de integração pesa mais do que a ferramenta.** Uma ligação simples não carrega nada de terceiros na landing page. A incorporação inline carrega a página de marcação logo na abertura (≈1,2 MB comprimidos no Cal.com, ≈2,9 MB no Calendly) e coloca cookies do fornecedor antes de qualquer clique. O pop-up adia isso até ao clique, mas carrega já um script do fornecedor: o do Google também vai buscar Google Fonts.
- **RGPD: EUA ou UE.** Calendly e Cal.com tratam os dados nos EUA (Data Privacy Framework e cláusulas contratuais-tipo). O Zoho Bookings (conta registada na UE) e o Google Workspace (com regiões de dados) permitem guardar os dados na UE. Para contas Google pessoais não encontrei acordo de subcontratação (DPA).
- **Línguas: só o Cal.com documenta português europeu.** Tem `pt` separado de `pt-BR` e segue por omissão a língua do navegador. O Calendly só traduz para português do Brasil, com uma língua por tipo de evento. O Zoho diz "Portuguese" sem indicar a variante. O Google não documenta a língua da página de marcação.
- **Preço para um freelancer.** Os planos gratuitos do Cal.com e do Zoho cobrem o essencial (Meet incluído). O Calendly gratuito fica limitado a 1 tipo de evento (logo, 1 língua) e não envia lembretes; o Standard custa 10 €/mês em faturação anual. O Google dá 1 página de marcação grátis; as funções premium exigem Google AI Pro (21,99 €/mês) ou Workspace Business Standard (13,60 €/utilizador/mês em faturação anual).

## Tabela comparativa

| Critério | Google Calendar (marcações) | Calendly | Cal.com | Zoho Bookings |
|---|---|---|---|---|
| **Ligação direta** | Sim, "Copy link" [G2] | Sim, `calendly.com/<ligação>` [C3] | Sim [K2] | Sim, links de marcação [Z3] |
| **Incorporação** | Botão com pop-up ou página inline [G2] | Inline, pop-up widget, pop-up text, todos os planos [C2]; iframe simples [C3] | Inline, botão flutuante, pop-up ao clicar num elemento [K2] | Iframe ("Embed As Widget") [Z6]; pop-up não documentado |
| **JS do fornecedor na landing page (pop-up)** | Script 4,8 KB + CSS 1 KB; injeta Google Fonts logo ao desenhar o botão [G7] | `widget.js` ≈4 KB comprimido (11,9 KB) + `widget.css` ≈0,8 KB [C10] | `embed.js` ≈24 KB comprimido (93 KB) [K3][K4] | Nenhum: só o iframe [Z6] |
| **Peso da página de marcação (iframe/ligação)** | Não medido | ≈2,9 MB comprimidos (3 ficheiros) [C10] | ≈1,2 MB comprimidos (70 ficheiros) [K4] | Não medido |
| **Cookies** | Não verificado | `_calendly_session` (≈3 semanas) + 2 cookies Cloudflare [C10]; banner próprio; usa cookies mesmo com o banner escondido [C5] | `__cf_bm` (Cloudflare) [K4][X1]; restantes não verificados | Não verificado |
| **Papel RGPD / DPA** | Workspace: Google subcontratante (DPA Cloud) [G8]; conta pessoal: DPA não encontrado | Subcontratante para as marcações; responsável independente pelos cookies dos embeds [C8] | Subcontratante para as marcações [K7]; DPA na app (Settings › Security › Compliance) [K8] | DPA assinável eletronicamente [Z8] |
| **Onde ficam os dados** | Workspace: regiões de dados (UE) desde Business Standard [G9][G10]; caso contrário, qualquer país com instalações Google [G8] | EUA; DPF + SCC [C8][C9] | EUA; DPF + SCC [K7]; UE só Organizations/Enterprise [K1] | UE (Amesterdão/Dublin) se a conta for registada na UE [Z7][Z8] |
| **FR / EN / PT** | Não documentado (ver detalhes) | FR, EN, **PT-BR**; 1 língua por tipo de evento [C6] | `fr`, `en`, **`pt`** e `pt-BR`; segue o navegador por omissão [K5] | FR, EN, "Portuguese" (variante não indicada); segue a localização [Z5] |
| **Plano grátis** | 1 página de marcação; sem lembretes automáticos [G3] | 1 tipo de evento, 1 calendário, sem lembretes, com marca Calendly [C1] | Tipos de evento ilimitados, notificações email/SMS, workflows só por modelo [K1] | 1 utilizador, 1 evento, lembretes incluídos [Z1][Z3] |
| **Plano pago mais barato útil** | Google AI Pro 21,99 €/mês [G3][G6] ou Workspace Business Standard 13,60 €/utilizador/mês (anual) / 16,20 € (mensal) [G4][G5] | Standard 10 €/mês (anual) / 12 € (mensal) [C1] | Teams 12 USD/utilizador/mês (anual), sem preço em EUR [K1] | Basic 6 €/utilizador/mês (anual) / 8 € (mensal) [Z2] |
| **Google Meet automático** | Sim, opção nativa [G1] | Sim, todos os planos; exige Google Calendar ligado [C7] | Sim, app gratuita; exige Google Calendar ligado [K6] | Sim, integração disponível no plano grátis [Z4] |
| **Redirecionar para o site após marcar** | Não documentado | Só planos pagos [C1] | Todos os planos [K1] | Não verificado |

## Ligação ou incorporação: o que cada forma carrega

Isto vale para qualquer ferramenta e explica a tabela.

- **Ligação simples** (`<a href>` para a página da ferramenta). A landing page não carrega nenhum ficheiro nem cookie do fornecedor. O Visitante sai para o domínio da ferramenta, ou abre um novo separador, e o eventual banner de cookies é o da própria ferramenta (o do Calendly, por exemplo, não pode ser escondido na página de marcação [C5]).
- **Pop-up do fornecedor.** A landing page carrega logo o script do fornecedor (4–24 KB comprimidos, conforme a tabela). A página de marcação só é carregada num iframe quando o Visitante clica. O script do Google é exceção: a função que desenha o botão acrescenta de imediato duas folhas de estilo de `fonts.googleapis.com` (Google Sans e Material Icons), o que envia o IP do Visitante à Google antes de qualquer clique [G7].
- **Inline.** O iframe é carregado com a landing page. Todo o peso da página de marcação (≈1,2–2,9 MB comprimidos, nas duas ferramentas medidas) e os seus cookies chegam ao Visitante mesmo que ele nunca queira marcar. A Calendly recomenda esperar pelo consentimento para cookies de desempenho antes de carregar o embed quando o banner está escondido [C5].

**Como medi.** Pedidos HTTP diretos com `curl` a 12/10/2026, sem navegador, como numa primeira visita sem cache. Contei só os ficheiros referenciados no HTML inicial. Os recursos carregados depois por JavaScript (outros ficheiros, chamadas à API, imagens, fontes) e os cookies criados por JavaScript não foram medidos, por isso os valores são um mínimo. Páginas públicas usadas como exemplo: `calendly.com/acmesales` e `cal.com/peer`.

## Detalhes por ferramenta

### Marcações do Google Calendar ("appointment schedules")

- **Conta.** Funciona com conta Google pessoal ou Workspace; cria-se num computador, não nas apps móveis [G1]. Não está disponível nas edições Workspace Frontline e Essentials [G3].
- **Grátis vs premium.** Com conta pessoal ou Workspace Business Starter tem-se **uma** página de marcação [G3]. São premium: mais de uma agenda de marcações, lembretes automáticos por email, disponibilidade em vários calendários, pagamentos e verificação de email contra marcações falsas [G3]. As funções premium estão em "Google One Premium, Google AI Pro & Google AI Ultra", Workspace Individual, Business Standard/Plus, Enterprise, Education e Nonprofits [G3].
- **Preços em Portugal.** Google AI Pro custa 21,99 €/mês [G6]. A página de planos Google One em Portugal já não mostra um plano "Premium": o plano de 2 TB chama-se "Google AI Plus" (9,99 €/mês) [G6]. **Não confirmei** se o AI Plus desbloqueia as funções premium, porque a tabela da Google não o nomeia [G3]. Workspace Business Standard custa 13,60 €/utilizador/mês com compromisso anual ou 16,20 € em faturação mensal, sem impostos [G4][G5]. A tabela da Workspace marca "Páginas de agendamento de compromissos" como não incluídas no Starter e incluídas a partir do Standard [G4].
- **Google Meet.** Em "Location and conferencing" escolhe-se "Google Meet video conferencing" [G1]. Na página de criação, a Google não diz expressamente que cada marcação recebe uma ligação única.
- **Formulário e emails.** Nome, apelido e email são obrigatórios e podem acrescentar-se campos [G1]. Até 5 lembretes, cujo texto não é editável [G1]. Por omissão, só se pode marcar com pelo menos 4 h de antecedência [G1].
- **Partilha e incorporação.** Pode copiar-se a ligação, gerar um "Button with popup" (texto e cor configuráveis) ou um "Inline booking page" (largura e altura editáveis) [G2]. A ajuda não mostra o código gerado [G2]. O script do botão tem 4,8 KB e o CSS 1 KB [G7]. Ao clicar, abre um iframe em sandbox com a página de marcação [G7].
- **Privacidade da página.** "Your booking page is always public": qualquer pessoa com a ligação vê a página, a foto de perfil e o nome da conta [G2]. Com conta pessoal, aparece o nome e a foto da conta Google pessoal do Julien.
- **Línguas.** A Google não documenta como é escolhida a língua da página de marcação. Observação minha (não documentada): o script do botão foi servido em francês com o parâmetro `hl=fr` ou com o navegador em francês, e em `pt_PT` com o navegador em inglês a partir de Portugal [G7]. O comportamento da própria página de marcação não foi testado.
- **RGPD.** Com Google Workspace aplica-se o Cloud Data Processing Addendum: "Google is a processor" (secção 4.1) [G8]. Os dados podem ser tratados em qualquer país com instalações da Google ou dos seus subcontratantes, salvo compromissos de localização (secção 10.1) [G8]. As regiões de dados (UE) existem a partir de Business Standard [G9], e o Calendar está coberto em repouso (títulos, datas, convidados, etc.) [G10]. As páginas não mencionam expressamente as marcações [G10]. **Não encontrei** um DPA para contas Google pessoais.

### Calendly

- **Preço.** Free: "One event type", "One calendar connection", sem lembretes automáticos e sem remover a marca Calendly [C1]. Standard: 10 €/lugar/mês em faturação anual ou 12 € mensal [C1]. Videoconferência (Zoom, Google Meet, Teams) incluída em todos os planos, Free incluído [C1].
- **Google Meet.** Cria automaticamente os dados Meet de cada reunião. Cada utilizador tem de ligar a própria conta Google, e o Google Calendar tem de estar selecionado como calendário onde se criam os eventos [C7].
- **Incorporação.** Inline, pop-up widget e pop-up text, em todos os planos [C2]. O código usa `https://assets.calendly.com/assets/external/widget.js` e `widget.css` [C3][C4]. Um iframe simples também funciona, mas sem redimensionamento automático nem eventos `postMessage` [C3]. Cores personalizadas no embed só nos planos pagos [C1][C4].
- **Peso.** `widget.js` tem 11,9 KB (≈4 KB comprimido) e `widget.css` 2,5 KB (≈0,8 KB) [C10]. A página de marcação carrega um JS principal de 6,4 MB (≈1,42 MB comprimido), um CSS de ≈1,31 MB comprimido e um script de telemetria de ≈152 KB, num total ≥2,9 MB comprimidos [C10].
- **Cookies.** O servidor define `_calendly_session` (expira em ≈3 semanas), `__cf_bm` e `_cfuvid` [C10]. A página de marcação mostra um banner de cookies que não pode ser escondido nem alterado [C5]. No embed, o banner pode ser escondido com `hide_gdpr_banner=1`, mas "Calendly uses cookies even if the banner is hidden". O site passa então a gerir as preferências, e a Calendly sugere esperar que o Visitante aceite cookies de desempenho [C5]. A Calendly usa cookies opcionais de desempenho, funcionais e de publicidade ("Targeting") [C9].
- **RGPD.** O cliente é responsável pelo tratamento e a Calendly subcontratante (secções 2.1 e 2.2) [C8]. O tratamento é feito nos EUA (2.3, 3.1), com base no Data Privacy Framework e, em alternativa, nas cláusulas contratuais-tipo [C8][C9]. Para os dados de cookies recolhidos nos embeds, a Calendly e o cliente são "separate and independent controllers" (Anexo D) [C8]. Cabe ao cliente obter os consentimentos necessários (2.1) [C8].
- **Línguas.** Traduções para francês, espanhol, alemão, neerlandês, **português (Brasil)**, italiano e ucraniano; não há português europeu [C6]. A língua define-se **por tipo de evento** e os textos personalizados (nome, descrição, perguntas) não são traduzidos [C6]. Com o plano Free (1 tipo de evento), só há uma língua.

### Cal.com

- **Preço.** Free: 1 utilizador, tipos de evento e calendários ilimitados, notificações por email e SMS [K1]. Workflows (lembretes) só a partir de modelos [K1]. Teams: 12 USD/utilizador/mês em faturação anual, e remove a marca Cal.com [K1]. A página não mostra preços em EUR.
- **Google Meet.** App gratuita; "requires a connected Google Calendar" [K6].
- **Incorporação.** Inline, botão flutuante e pop-up ao clicar num elemento; o código vem do gerador de snippets na app [K2]. O snippet acrescenta à página um `<script>` que carrega `embed.js` [K3]. `embed.js` tem 93 KB (≈24 KB comprimido) e a resposta define o cookie `__cf_bm` [K4].
- **Peso.** A página de marcação de exemplo carregou ≈1,24 MB comprimidos em 70 ficheiros JS/CSS a partir de `i.cal.com` [K4].
- **Cookies.** Só observei `__cf_bm` [K4]. A Cloudflare apresenta-o como estritamente necessário: expira após 30 min de inatividade e não corresponde a nenhum identificador do utilizador [X1]. Os cookies criados por JavaScript não foram verificados. A política de privacidade fala de cookies de sessão, preferências e segurança na app [K7].
- **RGPD.** "you are the controller and we are the processor" para as marcações [K7]. Os dados são tratados nos EUA, com base no Data Privacy Framework e nas cláusulas contratuais-tipo quando apropriado [K7]. O DPA está em Settings › Security › Compliance dentro da app [K8]; não li o conteúdo. O alojamento "US & EU" só existe nos planos Organizations e Enterprise [K1]. O cal.eu destina-se a empresas (mínimo de 50 utilizadores) [K9] e encerra a **01/11/2026** [K10].
- **Línguas.** Cada tipo de evento tem `interfaceLanguage`; vazio significa a língua do navegador do Visitante (omissão) [K5]. Os valores incluem `fr`, `en`, `pt` e `pt-BR` [K5]. A tradução do título e da descrição existe em todos os planos [K1].
- **Outros.** O redirecionamento após a marcação existe em todos os planos [K1]. O código é aberto, mas alojá-lo exige Node.js, yarn e PostgreSQL [K11], o que não cabe num alojamento estático.

### Zoho Bookings

- **Preço.** Forever Free: "One user | Online meetings | Notification emails and reminders", com sincronização com Google Calendar [Z1]. O plano grátis permite "a single event", e a marca personalizada exige plano pago [Z3]. Basic: 6 €/utilizador/mês anual ou 8 € mensal. Premium: 9 € ou 12 € [Z2]. **Não confirmei** em que plano se remove a marca Zoho, porque a tabela não veio no texto [Z1].
- **Google Meet.** Integração com Google Meet; as ligações de reunião são criadas automaticamente e a integração de videoconferência está no plano grátis [Z4]. A página não detalha requisitos específicos do Meet [Z4].
- **Incorporação.** Snippet iframe ("Embed As Widget") [Z6]. Não encontrei opção de pop-up nem script JS.
- **RGPD.** Centros de dados na UE: Amesterdão (principal) e Dublin (secundário), escolhidos conforme o país indicado na conta [Z7]. A Zoho diz ter "data localization in Europe for our EU clientele's service data processing" e usa as cláusulas contratuais-tipo, não o DPF, para transferências pontuais [Z8]. O DPA assina-se eletronicamente ou pede-se a legal@zohocorp.com [Z8].
- **Línguas.** 15 línguas, incluindo inglês, francês e "Portuguese" [Z5]. Por omissão, "Based on user location" segue a localização do navegador e recorre ao inglês se a língua não for suportada [Z5]. A variante do português não é indicada [Z5].
- **Não medido.** Peso da página de marcação e cookies (não havia página pública de exemplo).

## Implicações para a decisão

Não escolho aqui. Estes são os compromissos que o ticket #10 tem de resolver.

1. **Forma de integração vs JavaScript, cookies e fricção.**
   - Ligação: zero JavaScript e zero cookies de terceiros na landing page. Não exige consentimento por causa da marcação, mas o CTO sai da página.
   - Pop-up: script do fornecedor carregado com a página; a página de marcação só chega ao clique.
   - Inline: tudo carregado à cabeça, com cookies antes de qualquer interação. Isso obriga provavelmente a um banner de consentimento, o que mexe com o ticket das páginas legais.
   - Opção intermédia: um botão próprio que só cria o iframe no clique. São poucas linhas de JS nosso e nenhum script do fornecedor antes do clique.
2. **Usar o que o Julien já tem vs outra conta.** A marcação do Google evita mais um fornecedor, e o Meet é nativo. Mas o botão oficial puxa Google Fonts, uma conta pessoal mostra o nome e a foto pessoais, e só há uma página grátis. Ferramentas de terceiros acrescentam um subcontratante e uma conta a gerir.
3. **Dados na UE vs EUA.** Só o Zoho (conta UE) e o Google Workspace com regiões de dados ficam na UE. Calendly e Cal.com assentam no Data Privacy Framework.
4. **Línguas.** Para FR, EN e PT europeu, o Cal.com é o único que o documenta. Com Calendly há que aceitar PT-BR e pagar o Standard para ter um tipo de evento por língua. A landing page em `/fr`, `/en` e `/pt` pode apontar para uma página de marcação por língua, ou deixar a ferramenta seguir o navegador.
5. **Custo.** Cal.com Free e Zoho Free custam 0 €. Calendly Standard custa 120 €/ano. Google: 0 € com 1 página, ou 13,60–21,99 €/mês para as funções premium.
6. **Medir marcações.** Para levar o CTO de volta a uma página de agradecimento no site (útil para medir conversões), o Cal.com permite-o grátis e o Calendly só nos planos pagos.

### Perguntas para o Julien

1. A conta Google que usa para o Meet é pessoal (gmail.com) ou Google Workspace? Que plano?
2. Já usa, ou paga, alguma ferramenta de marcação?
3. Aceita que os dados das marcações (nome, email, respostas) fiquem nos EUA, ou prefere que fiquem na UE?
4. A Conversa tem um formato único (duração, perguntas prévias como empresa, stack ou problema)?
5. O CTO deve marcar sem sair da landing page, ou pode abrir a página da ferramenta?
6. Quer lembretes automáticos por email antes da Conversa?
7. Que orçamento mensal aceita para a ferramenta?
8. A página de marcação em português europeu é obrigatória, ou o português do Brasil serve?

## Não verificado

- A língua da página de marcação do Google e se aceita `hl=` (só testei o script do botão).
- O código exato do embed inline do Google e o que carrega.
- O peso e os cookies das páginas de marcação do Google e do Zoho.
- Cookies criados por JavaScript em todas as ferramentas (só vi os cabeçalhos HTTP).
- Se o Google AI Plus (9,99 €/mês) desbloqueia as funções premium das marcações.
- Existência de DPA para contas Google pessoais.
- O conteúdo do DPA do Cal.com (só acessível com sessão iniciada).
- A variante do português no Zoho e o plano que remove a marca Zoho.
- Preços do Cal.com em EUR e em faturação mensal.

## Fontes

Todas consultadas a 12/10/2026.

**Google**
- [G1] Create an appointment schedule: https://support.google.com/calendar/answer/10729749?hl=en
- [G2] Share your appointment schedule: https://support.google.com/calendar/answer/10733297?hl=en
- [G3] Compare premium features for appointment schedules: https://support.google.com/calendar/answer/16287038?hl=en
- [G4] Google Workspace, preços (pt-PT): https://workspace.google.com/intl/pt-PT/pricing
- [G5] Google Workspace Business Standard (pt-PT): https://workspace.google.com/intl/pt-PT/individual/
- [G6] Google One, planos e preços (pt-PT): https://one.google.com/about/plans?hl=pt-PT
- [G7] Código do botão de marcação, lido e medido com `curl`: https://calendar.google.com/calendar/scheduling-button-script.js e https://calendar.google.com/calendar/scheduling-button-script.css
- [G8] Cloud Data Processing Addendum: https://cloud.google.com/terms/data-processing-addendum
- [G9] Choose a geographic location for your data: https://knowledge.workspace.google.com/admin/compliance/choose-a-geographic-location-for-your-data
- [G10] Data covered by data regions: https://knowledge.workspace.google.com/admin/compliance/data-covered-by-data-regions

**Calendly**
- [C1] Pricing (incluindo os preços em EUR dos dados da página): https://calendly.com/pricing
- [C2] Embed options overview: https://calendly.com/help/embed-options-overview
- [C3] Advanced Calendly embed for developers: https://calendly.com/help/advanced-calendly-embed-for-developers
- [C4] How to customize your embed: https://calendly.com/help/how-to-customize-your-embed
- [C5] Calendly cookie management and banner: https://calendly.com/help/calendly-cookie-management-and-banner
- [C6] How to change your event type language: https://calendly.com/help/how-to-change-your-event-type-language
- [C7] Calendly + Google Meet: https://calendly.com/help/calendly-google-meet
- [C8] Data Processing Addendum: https://calendly.com/legal/data-processing-addendum
- [C9] Privacy Notice: https://calendly.com/legal/privacy-notice
- [C10] Medição com `curl`: https://assets.calendly.com/assets/external/widget.js, https://assets.calendly.com/assets/external/widget.css e a página pública https://calendly.com/acmesales

**Cal.com**
- [K1] Pricing e tabela de funcionalidades: https://cal.com/pricing
- [K2] Adding embed to your webpage: https://cal.com/help/embedding/adding-embed
- [K3] Código-fonte do snippet de incorporação: https://github.com/calcom/cal.com/blob/main/packages/embeds/embed-snippet/src/index.ts
- [K4] Medição com `curl`: https://app.cal.com/embed/embed.js e a página pública https://cal.com/peer
- [K5] API v2, create an event type (`interfaceLanguage`): https://cal.com/docs/api-reference/v2/event-types/create-an-event-type
- [K6] Google Meet app: https://cal.com/apps/google-meet
- [K7] Privacy Policy: https://cal.com/privacy
- [K8] Security (ligação para o DPA): https://cal.com/security
- [K9] Cal.eu: https://cal.eu
- [K10] Cal.eu to Cal.com migration: https://cal.com/blog/cal.eu-to-cal.com-migration
- [K11] Instalação em alojamento próprio (redireciona de cal.com/docs): https://cal.diy/installation

**Zoho Bookings**
- [Z1] Pricing: https://www.zoho.com/bookings/pricing.html
- [Z2] Dados de preços usados pela página de preços (moeda EUR): https://www.zohowebstatic.com/sites/zweb/json/pricing/bookings-pricing-val.json
- [Z3] Free appointment scheduling software: https://www.zoho.com/bookings/free-appointment-scheduling-software.html
- [Z4] Video conferencing integrations: https://www.zoho.com/bookings/integrations/video-conferencing.html
- [Z5] Policies and Preferences (línguas): https://help.zoho.com/portal/en/kb/bookings/workspace/articles/bookings-policies-and-preferences
- [Z6] Embed As Widget: https://help.zoho.com/portal/en/kb/bookings/resources/resource-properties/articles/embed-as-widget-14-12-2022-2
- [Z7] Know Your Datacenter: https://www.zoho.com/know-your-datacenter.html
- [Z8] Privacy FAQ (localização na UE, SCC, DPA): https://www.zoho.com/privacy/privacy-faq.html

**Outras**
- [X1] Cloudflare cookies: https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/
