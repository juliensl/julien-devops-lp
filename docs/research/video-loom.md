# Como entra o vídeo Loom na página?

> Pesquisa do ticket [«Como entra o vídeo Loom na página?»](https://github.com/juliensl/julien-devops-lp/issues/50) (mapa [«Mapa: spec da landing page e da pipeline»](https://github.com/juliensl/julien-devops-lp/issues/4)). Fontes consultadas e medições feitas a **19/10/2026**.
> Este documento **não decide**. Compara três formas (ligação simples, incorporação direta, carregar ao clicar) com factos medidos e fontes primárias. A escolha fica para o ticket, com validação do Julien.
> **Não é um parecer jurídico.** A secção 7 cita a CNIL e a Atlassian; a leitura jurídica final fica para quem a fizer.
> **Unidades:** 1 KB = 1000 bytes; 1 MB = 1 000 000 bytes. «Transferido» é o que passou pela rede (comprimido, quando o servidor comprime), com cabeçalhos. «Descomprimido» é o tamanho depois de o navegador descomprimir.

## Pergunta

Como entra o vídeo Loom do Julien na página: ligação, incorporação direta ou um cartão que só carrega o leitor do Loom depois de um clique? O que carrega e guarda cada forma, o que diz o vídeo, que legendas tem, e o que pedem a CNIL e a WCAG 2.2?

Contexto considerado (já decidido noutros tickets, aqui só serve para saber o que medir):

- 0 pedidos a terceiros antes de um clique; página ≤ 400 KB; JS no navegador ≤ 75 KB; Lighthouse mobile ≥ 90 em desempenho; WCAG 2.2 AA verificada pelo axe (Playwright) na CI, com 0 violações ([#15](https://github.com/juliensl/julien-devops-lp/issues/15));
- sem Aviso de cookies; Política de privacidade segundo a lei francesa (CNIL); estatísticas só a partir dos logs do servidor ([#14](https://github.com/juliensl/julien-devops-lp/issues/14));
- a fotografia do Julien é a única imagem da página ([#49](https://github.com/juliensl/julien-devops-lp/issues/49));
- a Página de marcação (Calendly) é uma ligação simples, no mesmo separador, só em francês, com uma nota «em francês» nas páginas EN e PT ([#10](https://github.com/juliensl/julien-devops-lp/issues/10)).

## Resumo

- **O vídeo.** «Scalez votre SaaS sans tout casser», 119,65 s, público, criado a 08/09/2026, dono Julien Laffont [M1][M8]. Imagem 1920×1080 (16:9), embora o oEmbed declare 1920×1440 [M1][M2]. Velocidade por defeito 1,2× (os 2 min passam a 1 min 39 s) [M8][L9]. Comentários e descargas desligados. Tem uma ligação fixada «Prendre RDV» para `calendly.com/contact-julienlaffont/appel-cadrage` [M8].
- **O que o Julien diz: não consegui verificar.** A transcrição existe (`hasTranscriptRecord: true`), mas está escondida aos Visitantes (`show_transcript_to_viewer: false`). O próprio Loom responde «Viewer does not have permission» [M8]. Não há legendas no leitor. Não transcrevi o áudio. O que é verificável é o **texto que aparece no ecrã**: os diapositivos, em francês, com «vous». Incluem «En 30 jours, votre SaaS scale sans rien casser, avec 99% de SLA garanti.» e «Parlons-en 30 minutes. … Sans engagement.» (secção 2) [M7].
- **Legendas: neste momento, nenhuma.** Não há botão de legendas, nem faixas de texto, nem separador de transcrição, nem na página de partilha nem na incorporação [M2][M4][M8]. As legendas traduzidas existem segundo uma página de ajuda do Loom e não existem segundo outra [L4][L5]. Pedidos públicos em aberto indicam que um Visitante sem conta pode não conseguir escolher a língua, sobretudo na incorporação [J2].
- **Incorporação direta: muito acima das metas, antes de qualquer clique** [M2]:
  - 64 pedidos a 11 domínios de terceiros, num total de **34,3 MB**;
  - **27,3 MB de JavaScript** em 24 ficheiros (62,9 MB descomprimidos). Um só ficheiro tem 13,4 MB e vem sem compressão;
  - 5,0 MB de vídeo pré-carregado e um vídeo de pré-visualização de 1,6 MB, que roda sem som em ciclo;
  - 2 cookies do Loom de 1 ano (particionados), mais localStorage, sessionStorage e IndexedDB;
  - eventos de analítica para domínios do Loom e da Atlassian (incluindo registos do SDK Statsig) e para a Sentry;
  - um pedido ao serviço de ícones do DuckDuckGo;
  - uma sondagem à extensão do Loom para o Chrome.

  Mesmo assim, o Lighthouse mobile dá-lhe 91 [M6]. O LCP é o título da página de teste (0,6 s) e o TBT é 0 ms: o peso do iframe quase não entra na nota.
- **Carregar ao clicar (fachada):**
  - **Antes do clique:** 0 pedidos a terceiros, 0 cookies, Lighthouse 100 e axe sem violações. O código são 299 bytes de JS [M3][M5][M6].
  - **Depois do clique:** carrega tudo o que a incorporação direta carrega (os mesmos 27,3 MB de JS).
  - **Som:** com `?autoplay=1` e `allow="autoplay; fullscreen"`, o vídeo começou com som no Chromium de computador, 9 a 12 s (ou mais) depois do clique nesta ligação [M3]. Na emulação de telemóvel (Pixel 7), o Loom ignorou o `autoplay`: é preciso um segundo toque [M3].
  - **Sem miniatura:** funciona com um cartão só de texto. As miniaturas do Loom vêm com URLs assinados que expiram em 600 s (verificado: 403 depois). Para usar uma, seria preciso guardar uma cópia no site, e essa seria uma segunda imagem [M1].
- **Ligação simples:** 0 pedidos e 0 cookies na página (Lighthouse 100) [M6]. A página de partilha do Loom, ao abrir [M4]:
  - faz 243 a 249 pedidos a 19 a 22 domínios, num total de 37,6 a 39,2 MB em cerca de 8 s;
  - começa o vídeo **sem som** (é preciso um clique para ligar o som);
  - mostra um **aviso de cookies próprio (OneTrust, em francês)**;
  - mesmo antes de qualquer escolha, grava 14 cookies e envia um evento de visualização.
- **CNIL:**
  - Quem publica a página e o terceiro que deposita os rastreadores «sont réputés être responsables conjoints», na medida em que determinam em conjunto as finalidades e os meios [C1 § 38].
  - Para vídeos de terceiros que depositam rastreadores ao serem ativados, o editor tem de obter o consentimento **antes** [C3 Q23]. Pode fazê-lo no aviso de cookies ou «de manière contextuelle, préalablement à l'activation du contenu, … au sein d'une fenêtre dédiée» [C3 Q23].
  - Antes de ativar o conteúdo, a informação tem de incluir: as finalidades, uma ligação para a política de privacidade do fornecedor **em francês**, as consequências de recusar e a forma de retirar o consentimento [C3 Q23].
  - Não encontrei nenhum texto da CNIL que dê um simples clique em «play» como consentimento válido, nem nenhum que isente os rastreadores de um leitor de terceiros.
- **WCAG 2.2:**
  - Aplicam-se 1.2.2 Legendas (A), 1.2.3 (A) e 1.2.5 Audiodescrição (AA) [W1].
  - O vídeo não é só uma cabeça a falar: cerca de 63 % da largura da imagem são diapositivos com texto. A audiodescrição só é dispensada se a informação importante já estiver no áudio [W3][W4]. Não pude verificar se o Julien lê os diapositivos em voz alta.
  - A W3C diz que legendas automáticas não chegam, a menos que tenham sido confirmadas como exatas [W7].
  - O axe nunca dá a falta de legendas como violação: marca `video-caption` como «a rever» [M5]. Uma CI com 0 violações não apanha este problema.
  - Uma página só ligada é outra «web page» (outro URI), o que a deixa fora da conformidade da página do Julien [W1]. É uma inferência: a W3C não o diz explicitamente.

## 1. O vídeo: oEmbed e metadados

Pedido a `https://www.loom.com/v1/oembed?url=https://www.loom.com/share/ee0df0498124402c9136fdead5629ef9` [M1]. O endpoint não está documentado no centro de ajuda; o SDK de incorporação documenta um método `oembed()` com os mesmos campos [L11].

| Campo | Valor |
|---|---|
| `title` | «Scalez votre SaaS sans tout casser» |
| `duration` | 119,65 s |
| `type` / `provider_name` | `video` / Loom |
| `width` × `height` | 1920 × 1440 (4:3) |
| `html` | `<iframe src="https://www.loom.com/embed/ee0df0498124402c9136fdead5629ef9" frameborder="0" width="1920" height="1440" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>` |
| `thumbnail_url` | `cdn.loom.com/os/loom-media-content/…/sessions-thumbnails-…gif/binary?authToken=…&Expires=…&Signature=…` |
| `thumbnail_width` × `thumbnail_height` | declarado 1920 × 1440 |

**O que medi sobre estes valores** [M1][M2][M8]:

- **Proporção real: 16:9.** O vídeo principal tem 1920×1080 no leitor (`videoWidth`/`videoHeight`), e os metadados da página de partilha também dizem 1920×1080. O 1920×1440 do oEmbed não corresponde à imagem.
- **HTML do oEmbed.** O `iframe` não tem `title` nem `allow="autoplay"`. Copiado tal como está, o axe dá uma violação séria `frame-title` na página (secção 8).
- **Miniatura do oEmbed.** É um **GIF animado** de 1024×576, 25 imagens e 5 s em ciclo, com **924 180 B (924 KB)**. Fica acima dos 400 KB da página inteira. Servido por `cdn.loom.com` (AtlassianEdge, CloudFront).
- **URL assinado.** O token do URL da miniatura vale **600 s** (`exp − iat = 600`). Pedido de novo 30 min depois, o mesmo URL respondeu **403**. Todos os URLs de miniaturas da página de partilha têm o mesmo prazo de 600 s.
- **Miniaturas disponíveis**, todas com URL assinado:
  - JPEG 640×360: 21 789 B;
  - JPEG 1280×720: 55 353 B;
  - JPEG 1280×960: 88 826 B;
  - GIF 640×360: 378 292 B;
  - GIF 1024×576: 924 180 B.

  A primeira imagem mostra o Julien à esquerda e o diapositivo «Votre SaaS grossit… mais est-ce que votre infra tient ?» à direita, com um botão de play por cima.
- **Outros metadados** (estado da página `/share` e `/embed`):
  - `privacy: "public"`;
  - `comments_enabled: false`;
  - `download_enabled: false` (`downloadableBy: "editors"`);
  - `suggested_playback_rate: "x120"`;
  - `use_gif: true`;
  - `show_analytics_to_viewer: false`: o número de visualizações não aparece;
  - `loom_branded_player: true`;
  - `organization: null`.
- **Capítulos gerados automaticamente** (`auto_chapter_status: "success"`):
  - 00:00 Introduction
  - 00:15 La réalité des SaaS en plein croissance
  - 00:58 Plan DevOps en 30 jours
  - 01:10 Le plan
  - 01:47 Prochaines étapes
- **Ligação fixada no leitor:** «Prendre RDV» → `https://calendly.com/contact-julienlaffont/appel-cadrage` (`pinned: true`). Aparece na barra de cima da incorporação e na secção «Links» da página de partilha.
- **Plano do Loom do Julien:** não é visível. O `loom_branded_player: true` é compatível com o plano Starter, porque tirar a marca Loom do leitor incorporado só existe nos planos Business, Business+AI e Enterprise [L12]. É uma inferência.

## 2. O que o Julien diz

### 2.1 Transcrição e legendas: não estão acessíveis

- **A transcrição existe e está fechada.** O estado que o próprio Loom inclui nas páginas `/share` e `/embed` contém `hasTranscriptRecord: true` e `show_transcript_to_viewer: false`. A consulta interna `fetchVideoTranscript` devolve `{"__typename":"InvalidRequestWarning","message":"Viewer does not have permission"}` a um Visitante sem conta [M8].
- **Não há legendas.** Não aparecem legendas nem botão de legendas no leitor. O `<video>` não tem faixas de texto (`textTracks` vazio), na página de partilha e na incorporação, antes e durante a reprodução. O menu «Settings» só tem «Quality» [M2][M4].
- **O que diz o Loom:**
  - o dono escolhe se os Visitantes veem a transcrição: «Transcripts: Choose if your viewers can see your transcript.» [L6];
  - quando a transcrição está desligada, «your viewer will not see the option to watch your Loom with closed captions» [L4];
  - a ligação entre esta definição e a falta de legendas aqui é inferência minha.
- **Não transcrevi o áudio.** As descargas estão desligadas pelo dono. Fazer uma transcrição própria seria tirar o áudio do fluxo de vídeo, e não o fiz. Por isso, **não sei o que o Julien diz**, nem se trata o Visitante por «tu» ou por «vous» na fala.
- **Língua:**
  - o título, os capítulos (gerados a partir da fala) e os diapositivos estão em francês;
  - que a fala é em francês é uma inferência forte, mas não verificada.

### 2.2 O texto que aparece no ecrã

O que medi: percorri o vídeo de 2 em 2 s e guardei uma imagem sempre que a zona dos diapositivos mudava, mais 4 imagens em tempos escolhidos [M7]. Os tempos são do vídeo e têm uma margem de cerca de 2 s. Transcrevi o texto a partir das imagens.

**Composição:** o Julien filmado à esquerda (cerca de 37 % da largura) e um diapositivo à direita. O rodapé dos diapositivos diz «Julien Laffont», com «Scaling SaaS · 2026» no início e «30 jours · SLA 99%» no fim.

| Tempo | Texto no ecrã (exato; os destaques estão indicados entre parênteses) |
|---|---|
| 0:00–0:14 | «Votre SaaS grossit… mais est-ce que votre infra tient ?» |
| 0:15–0:22 | «La réalité de la plupart des CTO de SaaS en pleine croissance…» («CTO de SaaS» sublinhado) |
| 0:22–0:52 | «Le Constat — Quatre symptômes qui coûtent cher», com 4 pontos que aparecem um a um:<br>01 «Une feature part. Elle en casse une autre.»<br>02 «Une régression est découverte par le client, en production.» («par le client» a amarelo)<br>03 «2 à 3 jours / semaine de tests manuels.»<br>04 «Un salaire de dév pour un résultat de support.» |
| 0:52–0:58 | «Vous savez que ça va casser. La question c'est de savoir QUAND et SI votre projet va y survivre…» |
| 0:58–1:12 | **«En 30 jours, votre SaaS scale sans rien casser, avec 99% de SLA garanti.»** («30 jours» e «99% de SLA» a azul, «sans rien casser» a amarelo) |
| 1:12–1:38 | «Comment ? Quatre blocs, 30 jours», com 4 cartões que aparecem um a um:<br>«Bloc 01 — Pipeline CI. Chaque pull request auditée. Lint, tests, qualité, sécurité.»<br>«Bloc 02 — Conteneurisation. Une application réplicable. Même comportement partout.»<br>«Bloc 03 — Auto-scaling. Une infra qui suit la charge. Sans intervention manuelle.»<br>«Bloc 04 — Observabilité. Temps réel, et de quoi agir. Vous voyez avant le client.» |
| 1:38–1:47 | «Résultat — Ce que ça change»:<br>«Les bugs sont bloqués à la pull request. Plus jamais découverts par le client.»<br>«Vos devs sortent du support. Ils se remettent à produire de la valeur.»<br>«L'infra scale avec vos clients. Zéro intervention manuelle.» |
| 1:47–2:00 | **«Parlons-en 30 minutes. On regarde ce qui est faisable et ce qui ne l'est pas pour votre activité. Sans engagement.»** («Sans engagement.» a amarelo), com um botão desenhado «Le lien est ici ↗» |

**Promessas, números, prazos e garantias no ecrã** (citações exatas):

- «En 30 jours» e «Quatre blocs, 30 jours»;
- «sans rien casser» (o título diz «sans tout casser»);
- «99% de SLA garanti» e «SLA 99%»;
- «2 à 3 jours / semaine de tests manuels»;
- «Plus jamais découverts par le client»;
- «Zéro intervention manuelle» e «Sans intervention manuelle»;
- «Vous voyez avant le client»;
- «Parlons-en 30 minutes»;
- «Sans engagement».

Ferramentas e técnicas nomeadas: «Pipeline CI», «pull request», «Lint, tests, qualité, sécurité», «Conteneurisation», «Auto-scaling», «Observabilité». **Não aparece nenhum preço.**

**Tratamento:** sempre «vous» no ecrã («Votre SaaS», «Vous savez», «Vos devs», «votre activité»).

**Comparação com o [glossário](../../CONTEXT.md)** (só factos, sem decidir):

- O ecrã usa «SLA». O glossário diz Disponibilidade e manda evitar «SLA».
- A Garantia do glossário inclui condições e o que o Julien faz se falhar. No ecrã, «99% de SLA garanti» aparece sem condições.
- Os quatro «blocs» correspondem aos quatro Blocos do glossário.
- «Parlons-en 30 minutes» é a Conversa.
- A ligação «Prendre RDV» do leitor aponta para `calendly.com/contact-julienlaffont/appel-cadrage`. Não verifiquei se é a mesma Página de marcação da página: o URL não está no repositório.

## 3. Legendas e línguas

**Neste vídeo, hoje** [M2][M4][M8]:

- **Sem legendas, sem transcrição visível e sem escolha de língua**, na página de partilha e na incorporação (secção 2.1).
- O espaço de trabalho do dono permite legendas traduzidas: `workspaceAllowsTranslatedCaptions: true` (consulta `GetVideoWorkspaceAiSettingForCaptionsLanguage`, feita pela própria página de partilha). Mas não há legendas para traduzir.
- **Interface do leitor em inglês:** `<html lang="en">` e botões «Play the video», «Settings», mesmo com o navegador em `fr-FR`. O aviso de cookies da página de partilha apareceu em francês.

**O que dizem as fontes do Loom:**

- **Transcrição automática** em todos os planos, em mais de 50 línguas, incluindo francês e português: «Transcripts are available on all Loom plans (50+ distinct languages are supported).» [L4][L5]
- **Limite para o francês:** «we currently don't support corrections to words containing special characters or diacritics - ü, ß, ñ, á, ç, ô, è» [L5]. As legendas seguem a transcrição: «correcting the transcript will automatically correct the captions.» [L4]
- **Legendas traduzidas, com fontes contraditórias:**
  - «Viewers can translate captions into the language of their choice. Note that translations are auto-generated by AI based on the video's transcript. If the creator's workspace doesn't allow AI, this feature will be unavailable to viewers of that video.» [L4]
  - «No, Loom currently does not support transcript translation. You can only generate transcripts in the language spoken in the video.» [L5]
- **Planos:** nenhuma página dá a lista de planos que incluem a tradução das legendas. A página de preços não a menciona [L12].
- **Pedidos em aberto no Jira público da Atlassian:**
  - LOOM-442, «Allow Viewers to Change Caption Language Without Logging In», pede também «Enable change the caption language option for embeded videos» [J2];
  - LOOM-712: «Looms that autoplay are muted with captions on by default.» [J3]
  - Os dois indicam que, hoje, um Visitante sem conta pode não ter a escolha da língua, sobretudo na incorporação. Não testei, porque este vídeo não tem legendas.
- **Transcrição visível:** a página de partilha pode ter um painel de transcrição, se o dono o permitir [L6]. A incorporação só mostra o leitor (LOOM-1027, em aberto).
- **Descarregar legendas:** só criadores e administradores dos planos Business e Enterprise: «Downloadable captions are only available to creators and admins on a Business/Business + AI plan, and members and admins on an Enterprise plan.» [L4]

## 4. Incorporação direta, medida

**Como medi** [M2]:

- **Página de teste:** HTML local mínimo com `<html lang="fr">`, um `<title>`, um `<h1>` e só o `iframe` `https://www.loom.com/embed/<id>`, com `title` e `allow="autoplay; fullscreen"`.
- **Navegador e perfil:** Playwright 1.64.1 com Chromium 156, sem extensões, perfil novo em cada execução, `fr-FR`, Europe/Paris, a partir de Portugal (a geolocalização da OneTrust respondeu `PT`, `EU`).
- **(a)** Carregar e esperar 12 s sem tocar em nada.
- **(b)** Clicar no botão «Play the video» do leitor e esperar 11 a 20 s.
- Computador (1366×900) e emulação de telemóvel (Pixel 7). Repeti em computador: os números da fase (a) coincidiram (65 pedidos com a página, 34,3 MB).

### 4.1 Antes de qualquer interação

| | Computador | Telemóvel (Pixel 7) |
|---|---|---|
| Pedidos (sem contar a página) | 64, todos a terceiros | 62 |
| Domínios de terceiros | 11, mais uma sondagem `chrome-extension://` | 11 |
| Transferido | **34,3 MB** | 34,3 MB |
| JavaScript | **24 ficheiros, 27,3 MB transferidos, 62,9 MB descomprimidos** | igual |
| Vídeo pré-carregado | 5,0 MB (segmentos HLS de `luna.loom.com`) + 1,64 MB (pré-visualização MP4 1280×720, sem som, em ciclo) | igual |
| WebSockets | 2 × `wss://www.loom.com/graphql` | igual |

**Por domínio (computador)** [M2]:

| Domínio | Pedidos | Transferido | O quê |
|---|---|---|---|
| cdn.loom.com | 30 | 29,2 MB | JS (24), CSS (4), miniatura JPEG (56,6 KB), pré-visualização MP4 |
| luna.loom.com | 8 | 5,0 MB | lista HLS e segmentos de vídeo (caminho `/euc1/…`) |
| ds-cdn.prod-east.frontend.public.atl-paas.net | 2 | 75,8 KB | CSS e fonte Atlassian Sans (73,6 KB) |
| www.loom.com | 11 | 29,0 KB | página `/embed` (15,4 KB), GraphQL, `insights-api` (`PlayIntervals`), `metrics/graphql` |
| api.atlassian.com | 2 | 23,5 KB | configuração de funcionalidades |
| icons.duckduckgo.com | 1 | 4,1 KB | `i/calendly.com.ico` (o ícone da ligação «Prendre RDV») |
| as.atlassian.com | 3 | 1,3 KB | eventos de analítica (`interactionSession started`, `ui taskStart`, `ui taskSuccess`) |
| xp.atlassian.com | 2 | 1,0 KB | registo Statsig (corpo comprimido) |
| api-private.atlassian.com | 1 | 1,2 KB | metadados de analítica (`gasv3`) |
| bad-builds.loom.com | 1 | 1,2 KB | lista de versões com erros |
| o398470.ingest.sentry.io | 1 | 0,3 KB | relatório de erros (Sentry) |

**Detalhes:**

- **JavaScript sem compressão.** O maior ficheiro, `vendor-15-…js`, tem 13 382 821 B e vem sem compressão. Confirmei com `curl` e `Accept-Encoding: br, gzip`: a resposta não tem `content-encoding`. Os outros vêm em Brotli (ex.: `vendor-9`: 2,07 MB transferidos, 7,6 MB descomprimidos). O Jira tem um problema fechado a 09/10/2026, LOOM-1005, que falava de «752 … `<script src>` tags totalling 16.1 MB … per iframe» [J4]. A 19/10/2026, a incorporação continua com 27,3 MB.
- **Extensão do Loom.** O leitor tenta carregar `chrome-extension://liecbddmkiiihnedobmlmillhodjkdmb/img/installed.jpg`. É o identificador da extensão «Loom – Screen Recorder & Screen Capture» na Chrome Web Store [X1]. Serve para saber se a extensão está instalada.
- **Eventos enviados sem clique:**
  - `PlayIntervals` (com tudo a `false`);
  - eventos Atlassian com `anonymousId`, user agent, tamanho do ecrã e `pageLoadId`;
  - registo Statsig e Sentry.
- **Cookies gravados**, os dois de `.loom.com`, `SameSite=None`, `Secure`, `Partitioned`, válidos 365 dias:
  - `loom_anon_comment`;
  - `ajs_anonymous_id`.

  São cookies de terceiros na página do Julien, particionados (chave de partição = o site da página). Na página, por si, não há cookies.
- **Cookies pedidos e não gravados:**
  - `__Host-psifi.analyticsTrace` e `__Host-psifi.analyticsTraceV2` (6 h, `SameSite=Strict`): o navegador recusa-os num iframe de outro site;
  - `GCLB` de xp.atlassian.com (1 s).
- **Armazenamento** de `https://www.loom.com`, particionado pelo navegador:
  - localStorage: `statsig.session_id.*`, `statsig.stable_id.*`, `awc.session.id`, `awc.session.expiry`, `ajs_anonymous_id`, `viewer_session_data`;
  - sessionStorage: `awc.*` e `sentryReplaySession`;
  - IndexedDB: `analytics-web-client`.

  O armazenamento da página em si ficou vazio.

### 4.2 Depois de clicar em play (cerca de 10 s de vídeo)

| | Computador | Telemóvel (Pixel 7) |
|---|---|---|
| Pedidos novos | 46, todos a terceiros | 52 |
| Transferido de novo | 12,1 MB (31 pedidos de vídeo a `luna.loom.com`, 12,0 MB) | 12,5 MB |
| JS novo | 0 | 0 |
| Cookies novos | 0 | 0 |
| Som | sim (`muted: false`, `volume: 1`) | sim |

**Eventos novos:**

- `VideoView` com `isEmbedPlayer: true`, `parentLocation` e `embeddedOn`, `resolution`, `speed: "1.2"`, `segmentAnonId` e `viewerSessionId`;
- `PlaySegment` e `PlayIntervals` a cada 5 s de vídeo;
- um evento Atlassian `video viewed` (`videoViewedFor2Seconds`).

**O que o Loom fica a saber da página do Julien.** Testei com a página aberta em `/en/?utm_source=linkedin&utm_content=hero#video`. O `parentLocation` e o `embeddedOn` chegaram só com a origem (`http://localhost:<porta>/`), sem caminho nem parâmetros [M3]. É o comportamento esperado da política de referrer por defeito do navegador. Não testei outra política.

**Fonte dos números.** Contados com os eventos de rede do Playwright: corpo codificado mais cabeçalhos (`request.sizes()`). O JS descomprimido vem do tamanho do corpo recebido. Os WebSockets estão contados à parte. Os service workers ficaram vazios.

## 5. Carregar ao clicar (fachada)

### 5.1 Parâmetros do URL de incorporação documentados

Fonte: [L1], com exceção da linha de aviso sobre o autoplay, que vem de [L2]:

| Parâmetro | Texto do Loom |
|---|---|
| `autoplay=1` ou `autoplay=true` | «Autoplay: Immediately autoplays the embedded video» |
| `muted=1` ou `muted=true` | «Mute: Starts the video muted.» |
| `t=80s` ou `t=1m20s` | «Timestamps: Start the video at a specified timestamp.» |
| `hide_owner=true` | «Owner: Hides the video creator's avatar before the video plays.» |
| `hide_share=true` | «Video Share Link: Hides the button that links out to the video URL.» |
| `hide_title=true` | «Title: Hides the video title.» |
| `hideEmbedTopBar=true` | «Embed Top Bar: Hides the top bar of the embedded video which includes the title, owner, and share link.» |
| `hide_speed=true` | «Speed: Hides the speed of the video.» |
| Aviso sobre o autoplay [L2] | «Embedded Loom videos with autoplay may not work on all sites or browsers. Some web browsers and sites have policies and restrictions around Autoplay which Loom cannot always bypass.» |

- **Planos:** a página dos parâmetros não fala de planos.
- **Problemas conhecidos no Jira:**
  - o `t=` era ignorado, e o problema ficou resolvido a 03/08/2026 (LOOM-930);
  - LOOM-481, ainda em aberto, pede um modo `privacy_mode` que «does *not* fire cookies or analytics events until the user clicks 'Play'». A justificação: «EU customers cannot use standard Loom embeds because the player fires analytics/cookies immediately on page load» [J1].
- **Não encontrei** nenhuma orientação oficial do Loom sobre incorporação «lite», carregamento diferido ou fachada.

**Efeito medido dos parâmetros** `hide_owner`, `hide_share`, `hide_title`, `hideEmbedTopBar` e `hide_speed` [M3]:

- desaparecem do leitor a ligação do título, a ligação «Prendre RDV» (Calendly), «Copy link» e «Open video in Loom»;
- desaparece também o pedido a icons.duckduckgo.com;
- os controlos de reprodução ficam iguais.

### 5.2 O que medi

- **Página de teste:** um cartão só com texto e um `<button>` «Regarder la vidéo (2 min, sur Loom)».
- **No clique:** um script de 299 bytes cria o `iframe` `…/embed/<id>?autoplay=1` com `title` e `allow="autoplay; fullscreen"`.
- Para saber o que o leitor faz com o som, registei as chamadas a `play()` e a `muted` dentro do iframe com um script de arranque do Playwright [M3].

| Situação | Resultado |
|---|---|
| Antes do clique | 1 pedido (a própria página, 1,2 KB), **0 a terceiros, 0 cookies** |
| Clique, computador, `autoplay=1` | O Loom chama `play()` sem `muted` e o navegador aceita: **vídeo com som**, iniciado 9,1 a 12,4 s depois do clique em 4 execuções, incluindo os 27,3 MB de JS. Numa quinta, o leitor ainda não tinha vídeo aos 12 s |
| Clique, computador, sem `autoplay` | O leitor carrega e espera: é preciso **um segundo clique** no play do Loom |
| Iframe criado por um temporizador, sem clique (controlo) | O Loom tenta `play()` com som, recebe `NotAllowedError`, põe `muted = true` e começa **sem som** |
| Toque, emulação Pixel 7, `autoplay=1` | O Loom **não chama `play()`** em 60 s (só roda a pré-visualização): é preciso **um segundo toque** |
| Depois do clique, computador (cerca de 20 s) | 105 a 109 pedidos, todos a terceiros; 47 a 61 MB transferidos (conforme o vídeo descarregado); JS igual à incorporação direta (24 ficheiros, 27,3 MB); os mesmos 2 cookies e o mesmo armazenamento da secção 4.1 |
| Depois do toque, telemóvel (sem reprodução) | 65 pedidos, 31,3 MB |

- **Controlo do navegador:** confirmei com uma página própria que este Chromium aplica a política de autoplay. Um `<audio>` sem gesto foi bloqueado. Num iframe de outro site com `allow="autoplay"`, foi aceite só depois de um clique na página de cima.
- **Primeira tentativa do controlo, descartada:** sem o script de registo, o controlo parecia tocar com som. A causa provável é que o `evaluate` do Playwright, usado para ler o estado do vídeo, conta como gesto do utilizador (inferência). Esse resultado foi deitado fora.
- **Não testados:** Safari, iOS, Firefox e um Android real.

**O que a fachada precisa** (factos, sem escolher):

- **Elemento:** um botão com texto claro. A WCAG conta como «intentional activation» o clique num botão «with clear labelling» (secção 8).
- **Iframe:** `src` com `autoplay=1` (e, se se quiser, os `hide_*`), `title`, `allow="autoplay; fullscreen"` e `allowfullscreen`. O `allow` não é opcional para o som: sem a delegação, o iframe de outro site não herda a ativação do clique.
- **Em telemóvel:** contar com dois toques, porque o Loom ignorou o `autoplay` na emulação.
- **Sem miniatura do Loom:** funciona. O cartão de texto deu 0 pedidos, Lighthouse 100 e axe sem violações [M5][M6].
- **Com miniatura do Loom:**
  - os URLs de [M1] expiram em 600 s e depois dão 403, por isso não podem ser usados diretamente numa página estática;
  - seria preciso guardar uma cópia no site (JPEG 640×360: 21,8 KB; 1280×720: 55,4 KB);
  - seria uma segunda imagem, além da fotografia do Julien;
  - o Embed SDK do Loom também mostra miniaturas («The embedSDK also allows you to display thumbnail versions of any Loom share URL» [L11]), mas vai buscá-las ao Loom, e isso conta como pedido a terceiros.
- **Consentimento:** depois do clique, o leitor faz tudo o que a secção 4 descreve (cookies, armazenamento, eventos). A secção 7 diz o que a CNIL pede antes desse clique.

## 6. Ligação simples

- Na página do Julien: 0 pedidos a terceiros, 0 JS e 0 cookies. A página de teste com uma só ligação pesou 1,0 KB e teve Lighthouse 100 [M6].
- Abrir no mesmo separador ou noutro é uma escolha da página. Não muda o que a página do Loom carrega.

**O que a página de partilha `https://www.loom.com/share/<id>` carrega ao abrir** (Chromium, perfil novo, 8 s sem tocar em nada) [M4]:

| | Computador | Telemóvel (Pixel 7) |
|---|---|---|
| Pedidos | 249 | 243 |
| Domínios | 19 | 22 |
| Transferido | 39,2 MB (33,6 MB de vídeo) | 37,6 MB |
| JavaScript | 107 ficheiros, 3,4 MB transferidos, 12,3 MB descomprimidos | 104 ficheiros, 3,4 MB |
| Vídeo | começa sozinho **sem som** (botões «Unmute» e «Tap to unmute») | igual |

- **Domínios incluídos:**
  - cdn.cookielaw.org e geolocation.onetrust.com (aviso de cookies);
  - accounts.google.com e google.com (início de sessão com a Google);
  - browser-intake-datadoghq.com, o398470.ingest.sentry.io, as.atlassian.com, xp.atlassian.com e atl-global.atlassian.com;
  - icons.duckduckgo.com;
  - em telemóvel, também secure.gravatar.com e i1.wp.com.
- **Aviso de cookies próprio.** É da OneTrust, aparece em francês para um Visitante em Portugal e tem o título «Confidentialité». O texto:

  > «Ce site utilise des cookies pour améliorer votre expérience de navigation, effectuer des analyses et des recherches, et cibler la publicité. Pour modifier vos préférences, cliquez sur Gérer les préférences. Sinon, cliquez sur Accepter tous les cookies pour indiquer que vous consentez à leur utilisation sur votre appareil. Cliquez sur Rejeter tous les cookies signifie que vous n'acceptez pas que nous utilisions des cookies qui ne sont pas strictement nécessaires sur votre appareil.»

  Os botões são «Gérer les préférences», «Rejeter tous les cookies», «Accepter tous les cookies» e «Fermer». O aviso liga para `https://www.atlassian.com/fr/legal/cookies`.
- **Antes de qualquer escolha:**
  - o cookie `OptanonConsent` diz `groups=1:1,2:0,3:0,4:0` e `interactionCount=0`: só o grupo 1 está ativo;
  - mesmo assim, já há **14 cookies**: `loom_anon_comment`, `ajs_anonymous_id` (×2), `__Host-psifi.analyticsTrace`, `__Host-psifi.analyticsTraceV2`, `OptanonConsent`, `_otPreferencesSynced`, `atlCohort` (400 dias), `sn_id` (1 dia), `atl_session` (30 min), `atl_xid.ts`, `atl_xid.current` (365 dias), `g_state` (180 dias) e `_dd_s` (15 min);
  - em que grupo da OneTrust está cada cookie: não verificado;
  - foram enviados `VideoView` (`isEmbedPlayer: false`), `PlaySegment` e `PlayIntervals`, porque o vídeo começou sozinho sem som.
- **O que a página mostra além do vídeo:**
  - oferta do Loom: «Get Loom free», «Pricing», «Log in», «Record a Loom»;
  - título, nome do Julien e capítulos;
  - «Links: Prendre RDV»;
  - «Comments disabled».

  A interface está em inglês (`<html lang="en">`).
- **Para ouvir o Julien:** um clique na ligação da página e depois um clique em «Unmute».

## 7. Privacidade e lei (CNIL)

### 7.1 O que dizem a Loom e a Atlassian

- **Responsáveis.** «Your information is controlled by Atlassian Pty Ltd and Atlassian, Inc.» [A1] (política em vigor desde 17/08/2026).
  - A política só cobre a Atlassian como responsável: «does not apply to the extent that we process personal information in the role of a processor … on behalf of our customers» [A1].
  - Para o Loom, a entidade contratante é «Loom, Inc.» [A4].
  - **Lacuna:** nenhum documento diz se a Atlassian é responsável ou subcontratante para a analítica dos Visitantes anónimos.
- **O que recolhe** [A1]:
  - «…the type of Loom videos created and the number of views…»;
  - «…your operating system, browser type, IP address, URLs of referring/exit pages, device identifiers, and diagnostic and crash data».
- **Cookies** [A1][A2]:
  - «Atlassian and our third-party partners, such as our advertising and analytics partners, use cookies…» [A1];
  - o aviso de cookies da Atlassian (em vigor desde 23/07/2024) divide-os em estritamente necessários, funcionais, desempenho e analítica, investigação, publicidade e redes sociais [A2];
  - não traz a lista dos cookies;
  - `www.loom.com/cookie-policy` só liga para esse aviso.
- **Visualizações** [L7]:
  - uma visualização conta com «at least 5 seconds»;
  - «Views will not be counted if the viewer is blocking cookies.»;
  - quem não tem conta aparece como «Anonymous».
- **Transferências e localização:**
  - «Atlassian, Inc. and its U.S. subsidiaries (… Loom, Inc. …) adhere to the Data Privacy Framework Principles» [A1];
  - subcontratante Twilio (Segment), «Data analytics service», nos EUA [A3];
  - residência de dados: «Launched in May 2026: Germany (Frankfurt) and United States (Oregon)». Escolhe-se ao criar o espaço de trabalho, e «Only limited account, configuration, and telemetry data may be processed globally» [L8];
  - os segmentos deste vídeo vêm de `luna.loom.com/euc1/…` [M2]. Que `euc1` quer dizer Frankfurt é inferência minha, pelo nome das regiões da AWS.
- **O que medi** (secções 4 e 6), em resumo:
  - antes de qualquer clique, na incorporação: 2 cookies de 1 ano, identificadores no localStorage e IndexedDB, eventos para domínios do Loom e da Atlassian e para a Sentry, e um pedido ao DuckDuckGo;
  - o Loom recebe a origem da página que incorpora o vídeo.

### 7.2 O que diz a CNIL

**Corresponsabilidade.**

- Lignes directrices (délibération n.º 2020-091), § 38, que cita o acórdão Fashion ID (TJUE C-40/17): «l'éditeur du site … et le tiers déposant des traceurs sont réputés être responsables conjoints du traitement» [C1].
- § 36: quem autoriza traceurs de terceiros no seu site «doit s'assurer de la présence effective d'un mécanisme permettant de recueillir le consentement» [C1].
- A pesquisa [«Obrigações legais em França»](https://github.com/juliensl/julien-devops-lp/blob/research/obrigacoes-legais-franca/docs/research/obrigacoes-legais-franca.md) já registava a mesma regra: com uma ligação simples, não há corresponsabilidade.

**Vídeos de terceiros, FAQ da CNIL, pergunta 23** [C3]:

> «Certains éditeurs intègrent des contenus multimédias externes (par exemple, des vidéos hébergées par des fournisseurs tiers) […] dont l'accès ou l'activation (par exemple, la lecture de la vidéo) entraîne le dépôt et la lecture de traceurs […]. Conformément à la règlementation applicable en matière de traceurs, l'éditeur devra s'assurer du recueil préalable du consentement de l'internaute qui souhaite accéder au contenu. Aucun traceur soumis au consentement ne pourra être déposé sur le terminal de l'internaute tant que ce dernier n'y aura pas valablement consenti.»

O editor pode recolher o consentimento de duas maneiras:

- no aviso de cookies ou no gestor de cookies, para todo o site;
- «De manière contextuelle, préalablement à l'activation du contenu, en demandant le consentement de l'utilisateur au sein d'une fenêtre dédiée.»

A informação tem de ser clara sobre:

- «le fait que l'activation du contenu externe […] requiert de consentir au dépôt de traceurs en précisant la ou les finalité(s) des traceurs utilisés ainsi qu'un lien vers la politique de confidentialité, en français, du fournisseur du contenu externe»;
- «les conséquences attachées à un refus»;
- «la possibilité de retirer, aisément et à tout moment, son consentement».

Recusar não pode bloquear o acesso ao resto do site.

**Botões de partilha.** A recomendação (délibération n.º 2020-092, consolidada a 16/01/2026), § 2.1, admite para funcionalidades que só criam traceurs quando o Visitante as usa que «l'information et le recueil du consentement pourraient apparaitre lorsque les utilisateurs décident de déclencher ladite fonctionnalité» [C2].

**Isenção do art. 82.**

- Não é preciso consentimento quando a operação é «strictement nécessaire à la fourniture d'un service de communication en ligne à la demande expresse de l'utilisateur» [C5].
- Um traceur com várias finalidades precisa de consentimento se uma delas estiver fora da isenção [C1 § 48].
- A medição de audiência isenta tem de ser «pour le compte exclusif de l'éditeur», sem passar os dados a terceiros [C1 § 51][C3 Q9].
- **Não encontrei** nenhum texto da CNIL que isente os traceurs de um leitor de vídeo de terceiros.

**O clique em play como consentimento.**

- A CNIL fala de uma «fenêtre dédiée» onde se pede o consentimento [C3 Q23]. O consentimento tem de ser dado «par une déclaration ou par un acte positif clair» [C1 § 16].
- Antes de escolher, o Visitante tem de poder identificar «le ou les responsables ainsi que l'ensemble des responsables conjoints» [C1 § 25].
- **Não encontrei** nenhum texto da CNIL que diga se um só clique num botão que informa e lê ao mesmo tempo (por exemplo, «Accepter et lire la vidéo») chega, ou se é preciso um passo de consentimento à parte. Esta é a pergunta em aberto mais importante deste ponto.

**O que a Política de privacidade tem de dizer.**

- A lista dos responsáveis, com «identité, lien vers leur politique de traitement des données à caractère personnel», «mise à la disposition des utilisateurs de manière permanente» [C2 § 2.2][C3 Q26].
- Mesmo os traceurs isentos devem ser mencionados, por exemplo «une mention les concernant dans la politique de confidentialité» [C2 § 5].
- A informação geral do RGPD [C6]: identidade, finalidades, base legal, destinatários, prazo de conservação, direitos e «l'existence d'un transfert des données vers un pays hors Union européenne … les garanties associées», além do direito de retirar o consentimento.
- No caso do Loom, a política para onde ligar em francês seria a da Atlassian. Existe em francês, pelo menos para o aviso de cookies (`atlassian.com/fr/legal/cookies`, a ligação que o próprio aviso do Loom usa) [M4].

**EDPB.** As orientações 2/2023 (v2.0), § 50–51, incluem pixels e ligações de rastreio no art. 5.º, n.º 3, da Diretiva ePrivacy, «even if this storage is not permanent» [E1].

**Sanções.** Não encontrei nenhuma sanção da CNIL especificamente sobre um leitor de vídeo incorporado. É um resultado negativo da pesquisa, não uma confirmação.

## 8. Acessibilidade (WCAG 2.2)

### 8.1 Critérios que se aplicam a um vídeo gravado com som

| Critério | Nível | Texto normativo [W1] | Neste vídeo |
|---|---|---|---|
| 1.2.1 Áudio ou vídeo apenas | A | «For prerecorded audio-only and prerecorded video-only media…» | Não se aplica: tem imagem e som |
| 1.2.2 Legendas (gravado) | A | «Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.» | Hoje não há legendas no leitor [M2] |
| 1.2.3 Audiodescrição ou alternativa (gravado) | A | «An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.» | Depende do que é dito (secção 2) |
| 1.2.5 Audiodescrição (gravado) | AA | «Audio description is provided for all prerecorded video content in synchronized media.» (sem exceção) | Depende do que é dito |
| 1.4.2 Controlo do áudio | A | «If any audio on a web page plays automatically for more than 3 seconds…» | Ver abaixo |
| 2.2.2 Pausar, parar, ocultar | A | «For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it…» | A incorporação direta põe a pré-visualização a rodar sozinha em ciclo [M2]. Não avaliei se cumpre |
| 2.1.1 e 2.1.2 Teclado, sem armadilha | A | — | Depende do leitor do Loom |
| 4.1.2 Nome, função, valor | A | — | O `iframe` precisa de nome. A técnica H64 usa o `title`: «This provides a label for the frame» [W9] |

**Uma cabeça a falar?**

- «For 1.2.3, 1.2.5, and 1.2.7, if all of the important information in the video track is already conveyed in the audio track, no additional audio description is necessary.» [W3][W4]
- Segundo o guia de multimédia da W3C, para um vídeo que é «only a person talking», «Description is not needed. Consider informing users.» [W8]
- O Understanding do 1.2.5 nomeia expressamente «on-screen text that are important and are not described or spoken in the main sound track» [W4].
- **Este vídeo** tem diapositivos com texto em cerca de 63 % da largura da imagem (secção 2.2). Se o Julien disser em voz alta tudo o que está nos diapositivos, conta como cabeça a falar para estes critérios. Se não disser, falta descrever esse texto. **Não verificado.**

**Exceção «alternativa a texto».**

- A definição: «media that presents no more information than is already presented in text (directly or via text alternatives)» [W1].
- Se a página já disser em texto tudo o que o vídeo diz, e o vídeo estiver «clearly labeled» como alternativa, as exceções do 1.2.2 e do 1.2.3 aplicam-se [W1][W2].
- O 1.2.5 não tem esta exceção no texto normativo.

**Legendas automáticas.**

- «Automatically-generated captions do not meet user needs or accessibility requirements, unless they are confirmed to be fully accurate.» [W7]
- No Loom, a correção da transcrição não aceita palavras com acentos ou ç [L5]: é um limite para corrigir legendas em francês.

**Língua das legendas.**

- Nem a WCAG nem o documento Understanding do 1.2.2 pedem legendas na língua da página [W2].
- O guia da W3C distingue «Captions for the same language as the spoken audio» de «Subtitles … translated into another language». Também diz: «subtitles in other languages are not directly an accessibility accommodation» [W7].

**Som automático (1.4.2).**

- Um vídeo que começa por um clique do Visitante num botão claramente identificado não conta como «plays automatically» [W5].
- O Loom começa sem som quando não há ativação [M3]. A página de partilha também começa sem som [M4].

**Teclado.**

- O relatório VPAT 2.5 do Loom (21/08/2025) cobre a «Share page» e o «Share modal», mas não nomeia o leitor incorporado [L13]. Classificações:
  - 1.2.1, 1.2.2, 1.2.3 e 1.2.5: «Supports»;
  - 2.1.1: «Supports With Exceptions»;
  - 2.1.2: exceção «On 'Share page | Activity' page, the keyboard focus is getting trapped»;
  - 4.1.2: «Supports With Exceptions».
- O leitor tem atalhos (K ou espaço, J/L, F, setas) [L10]. Não testei a navegação por teclado dentro do iframe.

### 8.2 Ligação para outra página e âmbito da conformidade

- «Conformance … is for full web page(s) only, and cannot be achieved if part of a web page is excluded.» [W1 § 5.2.2]
- **Definição de web page:** «a non-embedded resource obtained from a single URI using HTTP plus any other resources that are used in the rendering or intended to be rendered together with it» [W1]. O iframe é desenhado com a página e entra na conformidade dela. A página do Loom aberta por uma ligação tem outro URI e não é desenhada com a página. Isto é inferência a partir da definição: **não encontrei nenhum texto da W3C que diga expressamente que uma página ligada fica fora**.
- **Conteúdo de terceiros incorporado:**
  - «When an author makes a decision to use a third party implementation, they should choose products that meet WCAG requirements.» [W6]
  - Se não cumprir, a W3C prevê uma declaração de conformidade parcial: «This page does not conform, but would conform to WCAG 2.2 at level X if the following parts from uncontrolled sources were removed.» [W1 § 5.4]
- **Não-interferência:** 1.4.2, 2.1.2, 2.3.1 e 2.2.2 «apply to all content on the page», incluindo o que não conta para a conformidade [W1].
- **WCAG-EM 2.0** (W3C Group Note, 23/07/2026): «This includes 3rd party content used within the site.» [W10]

### 8.3 axe-core no iframe do Loom

axe-core 4.14.0 com `@axe-core/playwright`, que analisa também o conteúdo dos iframes. Etiquetas `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22a`, `wcag22aa`, e uma passagem com todas as regras [M5].

| Página e momento | Execuções | Violações WCAG | Notas |
|---|---|---|---|
| Iframe com `title`, carregado | 4 (3 computador, 1 telemóvel) | **0** | «A rever»: `video-caption`, `no-autoplay-audio` (pré-visualização), `color-contrast` |
| Iframe com `title`, a tocar | 4 | **0** | «A rever»: `video-caption`, `color-contrast` |
| HTML do oEmbed tal como vem | 1 | **`frame-title` (séria)**, no `<iframe>` da página | Falta o `title` (é a nossa página, não o Loom) |
| Fachada, antes do clique | 4 | **0** | |
| Fachada, depois do clique, a tocar | 4 | **1 em 4: `color-contrast` (séria) dentro do iframe** | O texto «Prendre RDV» do leitor deu 1,04:1 (#090909 sobre #010101). Nas outras 3 execuções não apareceu |

- **Melhores práticas** (fora das etiquetas WCAG): `aria-allowed-role` (menor) nos `<section role="slider">` «Seek» e «Volume» do leitor, em todas as execuções.
- **Legendas:** o axe nunca marcou `video-caption` como violação, só como «a rever». Uma CI com 0 violações passa sem legendas.
- **CI instável:** a violação de contraste só apareceu numa de 4 execuções. Com o leitor do Loom na página analisada, a CI pode falhar de forma intermitente. A causa provável é o momento em que o axe apanha a barra a aparecer ou a desaparecer sobre o vídeo, mas é inferência minha.

## 9. Comparação das três formas

Valores medidos nas páginas de teste [M2]–[M6]. A página real terá mais conteúdo.

| | Ligação simples | Carregar ao clicar | Incorporação direta |
|---|---|---|---|
| Pedidos a terceiros antes de um clique | 0 | 0 | 64 (11 domínios) |
| Peso antes de um clique (página de teste) | 1,0 KB | 1,4 KB | 34,3 MB |
| JS de terceiros antes de um clique | 0 | 0 (299 B próprios) | 27,3 MB transferidos, 62,9 MB descomprimidos |
| Cookies e armazenamento antes de um clique | nenhum | nenhum | 2 cookies Loom (1 ano) + localStorage, sessionStorage e IndexedDB |
| Lighthouse mobile, desempenho (2 execuções) | 100 / 100 | 100 / 100 | 91 / 91 (Speed Index 10,7 a 11,0 s) |
| axe, violações WCAG antes de um clique | 0 | 0 | 0 com `title`; 1 com o HTML do oEmbed |
| O que acontece no clique | abre o Loom: 243 a 249 pedidos, 37,6 a 39,2 MB em ~8 s, aviso de cookies OneTrust, vídeo sem som | o leitor carrega (27,3 MB de JS) e toca com som (computador) | o vídeo toca; mais 12 MB em ~10 s |
| Gestos até ouvir o Julien | 2 (ligação + «Unmute») | computador 1; telemóvel 2 (emulação) | 1 |
| Imagens além da fotografia | 0 | 0 com cartão de texto; 1 com miniatura própria | a miniatura vem do Loom, dentro do iframe |
| Legendas e transcrição | as do Loom (hoje nenhuma) | as do Loom (hoje nenhuma) | as do Loom (hoje nenhuma) |

**Detalhes do Lighthouse** [M6]:

- Lighthouse 13.5.0, configuração mobile por defeito (emulação e limitação simuladas), Chromium 156.
- Na incorporação direta, a nota fica em 91 porque o LCP é o título da página (0,6 s) e o TBT é 0 ms. O Lighthouse mediu 31,2 a 34,3 MB de peso total.
- Um `iframe` com `loading="lazy"` 1600 px abaixo do topo deu 100, mas carregou na mesma 60 a 64 pedidos a terceiros e 31,1 a 32,5 MB.

## Limites

- **Data e versões:** medições a 19/10/2026, com o leitor do Loom da versão `88d1e3e` (o campo `version` dos eventos). O Loom muda com frequência: o LOOM-1005 foi fechado 10 dias antes e os números continuam altos.
- **Navegador:** só Chromium 156 (Playwright, sem interface), em Linux/WSL, a partir de Portugal, com perfil novo.
  - O Loom marcou estas sessões como robô (`isBotSession: true`). Um Visitante real pode receber outros eventos ou outra quantidade de vídeo.
  - Não testei Safari, iOS, Firefox nem um Android real. O telemóvel foi emulado (Pixel 7).
  - O comportamento dos cookies de terceiros é o do Chromium por defeito, que aceita cookies particionados. Noutros navegadores pode ser diferente.
- **Rede:** os tempos (9 a 12 s até ao som) dependem da ligação usada. O volume de vídeo descarregado varia entre execuções (47 a 61 MB depois do clique na fachada).
- **Fala:** não sei o que o Julien diz (secção 2.1). As citações da secção 2.2 são texto no ecrã, não fala.
- **Legendas traduzidas:** não as pude testar, porque este vídeo não mostra legendas. As fontes do Loom contradizem-se [L4][L5].
- **Lei:** não é um parecer jurídico. Não encontrei texto da CNIL sobre um clique único que informa e lê ao mesmo tempo. A pesquisa de sanções foi negativa.
- **Acessibilidade:** não testei o leitor com leitor de ecrã nem com teclado. O VPAT do Loom não cobre o leitor incorporado.
- **Categoria dos cookies** da página de partilha na OneTrust: não verificada.

## Pontos em aberto para «Como entra o vídeo Loom na página?»

Nada disto está decidido.

- **Forma:** ligação simples, carregar ao clicar ou incorporação direta? A incorporação direta passa a meta do Lighthouse (91), mas não passa as metas de pedidos a terceiros, peso, JS nem do Aviso de cookies.
- **Consentimento com a fachada:**
  - um clique que informa e lê chega, ou é preciso um passo de consentimento à parte?
  - que texto vai no cartão (finalidades, ligação para a política da Atlassian em francês, consequências de recusar, como retirar)?
  - que parágrafo entra na Política de privacidade?
- **Legendas e transcrição:** o Julien liga a transcrição e as legendas para os Visitantes? Corrige as legendas em francês, apesar do limite dos acentos?
  - Ou a página põe o texto equivalente ao lado do vídeo, para usar a exceção «media alternative for text»?
- **Diapositivos:** o Julien lê em voz alta o texto dos diapositivos? Isto decide se é precisa audiodescrição (1.2.3 e 1.2.5).
- **Conteúdo do vídeo e glossário:** «99% de SLA garanti» sem condições, «sans rien casser» e «SLA» batem com a Promessa, a Garantia e a Disponibilidade da página? O Julien grava de novo, ou a página não mostra o vídeo como prova?
- **Versões EN e PT:** que nota acompanha um vídeo só em francês? Pode ser igual à da Página de marcação.
- **Ligação «Prendre RDV» do leitor:** fica ou sai? Com a incorporação, os parâmetros `hide_*` tiram-na [M3]. É a mesma Página de marcação da página?
- **Telemóvel:** com a fachada, aceita-se um segundo toque para tocar o vídeo?
- **Miniatura:** cartão só de texto, ou uma cópia própria de uma miniatura (uma segunda imagem)?
- **Velocidade:** o vídeo toca a 1,2× por defeito. Fica assim?

## Como foi feita a pesquisa

- **[M1] oEmbed e miniaturas.** Usei `curl` no endpoint oEmbed e nos URLs das miniaturas. Medi o tamanho e as dimensões a partir dos cabeçalhos GIF e JPEG, e o prazo dos URLs a partir do token. Repeti o pedido ao URL expirado.
- **[M2] Incorporação direta.** Script Playwright 1.64.1 com Chromium 156 (`chromium-1248`):
  - página local mínima;
  - eventos de rede do contexto, com tamanhos e corpos dos scripts;
  - `context.cookies()` (com a chave de partição) e cabeçalhos `Set-Cookie`;
  - `localStorage`, `sessionStorage`, `indexedDB.databases()`, `caches.keys()` e service workers, lidos dentro do iframe;
  - estado dos `<video>`.
- **[M3] Carregar ao clicar.** A mesma recolha com um botão que cria o iframe.
  - As chamadas a `HTMLMediaElement.play()` e a `muted` foram registadas por um script de arranque (`addInitScript`) dentro do iframe.
  - Variantes: com e sem `autoplay=1`, com os parâmetros `hide_*`, sem clique (temporizador), em telemóvel, e com caminho e parâmetros no URL da página.
- **[M4] Página de partilha.** A mesma recolha em `loom.com/share/<id>`, em computador e em telemóvel:
  - procurei os elementos da OneTrust e li o cookie `OptanonConsent`;
  - guardei as respostas JSON (GraphQL) numa pasta à parte e li-as como dados.
- **[M5] axe-core** 4.14.0 com `@axe-core/playwright` 4.14.0, iframes incluídos: 9 execuções, com 27 análises (18 com as etiquetas WCAG e 9 com todas as regras).
- **[M6] Lighthouse** 13.5.0 (API Node, `chrome-launcher`), só a categoria de desempenho. Duas execuções por página: ligação, fachada, incorporação, e incorporação com `loading="lazy"`.
- **[M7] Texto no ecrã.**
  - Dentro do iframe, avancei o vídeo de 2 em 2 s.
  - Em cada ponto, comparei uma impressão digital de 48×27 da zona dos diapositivos, desenhada num `canvas`.
  - Quando a zona mudava, tirei uma captura (11 imagens), mais 4 em tempos escolhidos.
  - Transcrevi o texto a partir das imagens.
- **[M8] Estado das páginas.** Usei `curl` em `/share/<id>` e `/embed/<id>` e li o estado Apollo que vem no HTML: campos do vídeo, `fetchVideoTranscript`, capítulos e ligações.
- **Documentação:** Loom (support.atlassian.com/loom, dev.loom.com, loom.com/pricing), Jira público da Atlassian (projeto LOOM), textos legais da Atlassian, CNIL (orientações, recomendação, FAQ, lei), EDPB e W3C (WCAG 2.2, Understanding, técnicas, guia de multimédia, WCAG-EM).
  - As páginas foram descarregadas com `curl` e lidas em texto; os PDF da CNIL foram convertidos para texto.
  - Os URLs da secção Fontes responderam 200 a 19/10/2026.
- **Ficheiros e repositório:** nada descarregado foi executado. Os scripts ficaram numa pasta separada das descargas. Não alterei `package.json`, o lockfile nem `node_modules` do repositório.

## Fontes

Todas consultadas a 19/10/2026.

**Medições próprias**

- [M1]–[M8]: ver «Como foi feita a pesquisa». Vídeo: <https://www.loom.com/share/ee0df0498124402c9136fdead5629ef9>; oEmbed: <https://www.loom.com/v1/oembed?url=https%3A%2F%2Fwww.loom.com%2Fshare%2Fee0df0498124402c9136fdead5629ef9>; incorporação: <https://www.loom.com/embed/ee0df0498124402c9136fdead5629ef9>

**Loom**

- [L1] "Embed your video into a webpage": <https://support.atlassian.com/loom/docs/embed-your-video-into-a-webpage/>
- [L2] "Make embedded videos autoplay or play at a specific time": <https://support.atlassian.com/loom/docs/make-embedded-videos-autoplay-or-play-at-a-specific-time/>
- [L3] "Understand embedding videos, GIFs and thumbnails": <https://support.atlassian.com/loom/docs/understand-embedding-videos-gifs-and-thumbnails/>
- [L4] "Loom video transcription and closed captions": <https://support.atlassian.com/loom/docs/loom-video-transcription-and-closed-captions/>
- [L5] "Multi-language transcriptions": <https://support.atlassian.com/loom/docs/multi-language-transcriptions/>
- [L6] "Edit your video settings": <https://support.atlassian.com/loom/docs/edit-your-video-settings-disable-comments-emoji-reactions-downloads-and-more/>
- [L7] "Understand your video's views and analytics": <https://support.atlassian.com/loom/docs/understand-your-videos-views-and-analytics/>
- [L8] "Understand Loom data residency": <https://support.atlassian.com/loom/docs/understand-loom-data-residency/>
- [L9] "Can I control the playback speed for my viewer?" ("Loom's default playback speed is set to 1.2x for all viewers"): <https://support.atlassian.com/loom/docs/can-i-control-the-playback-speed-for-my-viewer/>
- [L10] "Use Loom's keyboard shortcuts": <https://support.atlassian.com/loom/docs/use-looms-keyboard-shortcuts/>
- [L11] Loom embedSDK, API (`oembed()`) e apresentação: <https://dev.loom.com/docs/embed-sdk/api>, <https://dev.loom.com/docs/embed-sdk/about>
- [L12] Loom, preços e planos: <https://www.loom.com/pricing>
- [L13] Atlassian, Accessibility Conformance Reports (Loom, VPAT 2.5, 21/08/2025): <https://www.atlassian.com/accessibility-conformance-reports>

**Jira público da Atlassian (projeto LOOM)**

- [J1] LOOM-481, `privacy_mode` sem cookies nem analítica até ao play (em aberto): <https://jira.atlassian.com/browse/LOOM-481>
- [J2] LOOM-442, escolher a língua das legendas sem sessão iniciada, também em incorporações (em aberto): <https://jira.atlassian.com/browse/LOOM-442>
- [J3] LOOM-712, autoplay sem som e com legendas por defeito (em aberto): <https://jira.atlassian.com/browse/LOOM-712>
- [J4] LOOM-1005, peso do JS por iframe (fechado a 09/10/2026): <https://jira.atlassian.com/browse/LOOM-1005>
- Também citados: LOOM-930 (`t=` ignorado, resolvido), LOOM-1027 (incorporação só com o leitor) e LOOM-976 (URL do GIF expira), em `https://jira.atlassian.com/browse/<id>`

**Atlassian (textos legais)**

- [A1] Privacy Policy (em vigor desde 17/08/2026): <https://www.atlassian.com/legal/privacy-policy>
- [A2] Cookies & Tracking Notice (em vigor desde 23/07/2024): <https://www.atlassian.com/legal/cookies> (em francês: <https://www.atlassian.com/fr/legal/cookies>)
- [A3] Sub-processors: <https://www.atlassian.com/legal/sub-processors>
- [A4] Product-specific terms (entidade contratante do Loom): <https://www.atlassian.com/legal/product-terms>

**CNIL e EDPB**

- [C1] Lignes directrices, délibération n.º 2020-091 (§ 16, 25, 36, 38, 48, 51): <https://www.cnil.fr/sites/cnil/files/atoms/files/lignes_directrices_de_la_cnil_sur_les_cookies_et_autres_traceurs.pdf>
- [C2] Recommandation, délibération n.º 2020-092, versão consolidada de 16/01/2026 (§ 2.1, 2.2, 5): <https://cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf>
- [C3] FAQ «Cookies et autres traceurs» (perguntas 9, 22, 23, 26): <https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ>
- [C4] «Que dit la loi ?»: <https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi>
- [C5] Loi Informatique et Libertés, art. 82: <https://www.cnil.fr/fr/le-cadre-national/la-loi-informatique-et-libertes>
- [C6] «Conformité RGPD : information des personnes et transparence»: <https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence>
- [E1] EDPB, Guidelines 2/2023 on Technical Scope of Art. 5(3) of ePrivacy Directive, v2.0 (§ 50–51): <https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf>

**W3C**

- [W1] WCAG 2.2 (Recomendação de 12/12/2024): critérios 1.2.1–1.2.5, 1.4.2, 2.2.2, 4.1.2; § 5.2.2, § 5.4; definições «web page» e «media alternative for text»: <https://www.w3.org/TR/WCAG22/>
- [W2] Understanding 1.2.2 Captions (Prerecorded): <https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded>
- [W3] Understanding 1.2.3 Audio Description or Media Alternative (Prerecorded): <https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded>
- [W4] Understanding 1.2.5 Audio Description (Prerecorded): <https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded>
- [W5] Understanding 1.4.2 Audio Control: <https://www.w3.org/WAI/WCAG22/Understanding/audio-control>
- [W6] Understanding Conformance: <https://www.w3.org/WAI/WCAG22/Understanding/conformance>
- [W7] WAI, «Captions/Subtitles»: <https://www.w3.org/WAI/media/av/captions/>
- [W8] WAI, «Description of Visual Information»: <https://www.w3.org/WAI/media/av/description/>
- [W9] Técnica H64, `title` em `iframe`: <https://www.w3.org/WAI/WCAG22/Techniques/html/H64>
- [W10] WCAG-EM 2.0 (W3C Group Note, 23/07/2026): <https://www.w3.org/TR/wcag-em-2/>
- Também consultados: Understanding 2.2.2 (<https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide>) e 2.1.2 (<https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap>)

**Outros**

- [X1] Chrome Web Store, extensão «Loom – Screen Recorder & Screen Capture» (`liecbddmkiiihnedobmlmillhodjkdmb`): <https://chromewebstore.google.com/detail/liecbddmkiiihnedobmlmillhodjkdmb>
