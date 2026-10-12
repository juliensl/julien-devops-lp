# Como organizar as traduções e os conteúdos no Astro?

Investigação da issue #11. Data: 2026-10-12.

**Versões analisadas:** Astro **7.3.7** (a versão instalada em `node_modules`) e `@astrojs/sitemap` **3.7.4** (a última publicada no npm). A documentação em docs.astro.build corresponde ao Astro 7: tem o guia de atualização para a v7 [A8] e etiquetas "Added in astro@7.0.0" [A5]. Nos pontos abaixo, a documentação e o código instalado estão de acordo, exceto onde está indicado.

**"Verificado em build"** quer dizer que fiz um build de teste com o Astro 7.3.7 instalado, num projeto descartável fora do repositório [T]. O `@astrojs/react` e o `@astrojs/sitemap` não estão instalados, por isso o comportamento deles vem da documentação e da leitura do código, não de testes.

## Pergunta

Que opções dá o Astro (com React e TSX) para ter a página em francês, inglês e português, com os conteúdos e as traduções separados dos componentes? E quais as consequências de cada uma?

Restrições: build estático, alojamento estático no Infomaniak (sem Node em produção) e um esquema que sirva também o futuro site institucional de 5 a 6 páginas.

## Resumo

- **Routing nativo, sem servidor.** O routing de i18n do Astro funciona em build estático e gera uma pasta por língua (`/pt/`, `/en/`, `/fr/`). `Astro.currentLocale` dá a língua de cada página no build, por isso o `lang` e a escolha dos textos não precisam de JS no browser [A1, T].
- **Redirecionamentos lentos.** Em build estático, todos os redirecionamentos do Astro são páginas HTML com `meta refresh` de **2 segundos** e `noindex`: o de `/` para a língua por defeito e o de `fallback`. Não há redirect HTTP [C4, C5, T], e o Google trata um `meta refresh` com atraso como temporário [G3]. Para um redirect real em `/` é preciso um `.htaccess`, que o Infomaniak aceita [I1]. A alternativa é uma estratégia em que `/` já é uma página.
- **Textos separados dos componentes, sem JS.** Os textos curtos de interface podem ficar em dicionários TS/JSON e os textos longos em content collections (`glob()` com pastas `pt/`, `en/`, `fr/`). Ambos são lidos no build e entregues aos componentes React como props. Sem diretiva `client:*`, os componentes não enviam JS para o browser [A4, A5, A6, T].
- **SEO e seletor ficam do nosso lado.** O Astro não gera `hreflang` nem seletor de língua [C7]. Os helpers de `astro:i18n` só trocam o prefixo da língua no mesmo caminho e não conhecem slugs traduzidos [A3, C7]. O `@astrojs/sitemap` tem a sua própria configuração `i18n`, não gera `x-default` e inclui as páginas de redirecionamento se não forem filtradas [A9, C9, T].
- **Bibliotecas da comunidade.** Para um site estático de 1 a 6 páginas, não resolvem nada que a solução nativa mais um dicionário próprio não resolva. As duas integrações específicas para Astro mais conhecidas estão paradas desde 2023–2024 [N1].

## 1. Routing de i18n nativo

### Opções de configuração e o que produzem num build estático

Os valores por defeito vêm do esquema de configuração [C1]. Internamente, cada combinação de opções corresponde a uma "estratégia" de routing [C3].

| Opção | Por defeito | O que faz | Resultado no build estático |
|---|---|---|---|
| `defaultLocale` | obrigatória | Língua por defeito. Tem de estar em `locales`, senão a configuração dá erro [A2, C2]. | — |
| `locales` | obrigatória | Lista de códigos (`'pt'`) ou objetos `{ path, codes }`. Os nomes das pastas em `src/pages/` têm de coincidir com os códigos [A2]. | Uma pasta por língua em `dist/`. |
| `routing.prefixDefaultLocale` | `false` | `false`: a língua por defeito fica sem prefixo (`/`, `/sobre/`) e as outras com prefixo (`/en/`). `true`: todas as línguas com prefixo [A2]. | Verificado em build: `/` é a página da língua por defeito (`false`) ou não tem conteúdo próprio (`true`) [T]. |
| `routing.redirectToDefaultLocale` | `false` | Com `prefixDefaultLocale: true`, faz `/` redirecionar para `/[defaultLocale]/` [A2]. Só é aceite com `prefixDefaultLocale: true` [C2]. Exige `src/pages/index.astro`, senão o build falha com `MissingIndexForInternationalization` [C6, T]. | `dist/index.html` passa a ser uma página com `<meta http-equiv="refresh" content="2;url=/pt/">`, `noindex` e `canonical`, e o conteúdo de `index.astro` é descartado [T]. |
| `fallback` | — | Para cada língua, indica de que língua vem uma página que lá não existe. A língua por defeito não pode ser chave [A2, C2]. | Gera as páginas em falta (ex.: `/en/sobre/`) [T]. |
| `routing.fallbackType` | `"redirect"` | `"redirect"`: a página em falta redireciona. `"rewrite"`: a página em falta mostra o conteúdo da outra língua no URL pedido [A2]. | `redirect`: `meta refresh` de 2 s com `noindex`. `rewrite`: o texto fica na outra língua, mas `lang` e `Astro.currentLocale` ficam com a língua do URL (ex.: texto em EN com `lang="fr"`) [T]. |
| `routing: "manual"` | — | Desliga o middleware de i18n; o routing passa a ser escrito pelo projeto [A1, A2]. | Pouco útil aqui, porque num site estático o middleware só corre durante o build. |
| `domains` | — | Uma língua por domínio ou subdomínio. | **Não serve:** exige `output: "server"` e não permite páginas pré-renderizadas [A1, C2]. |

**Porquê 2 segundos.** O redirect da raiz é criado com o estado 302 [C4]. O template estático de redirecionamento usa `delay = status === 302 ? 2 : 0` [C5], e o redirect de `fallback` também usa 302 [C4]. Durante esses 2 segundos o visitante vê uma página branca com o texto "Redirecting from `/` to `/pt/`" [T]. O Google trata um `meta refresh` com atraso como redirecionamento temporário e recomenda redirects do lado do servidor sempre que possível [G3].

### Duas formas de organizar os ficheiros de página

| | Uma pasta por língua (`src/pages/pt/index.astro`, `src/pages/en/index.astro`, …) | Uma rota dinâmica (`src/pages/[lang]/index.astro` com `getStaticPaths()`) |
|---|---|---|
| Documentação | É a estrutura descrita no guia [A1]. | Usada na receita para o blogue [A4]. |
| Funciona com o routing nativo | Sim [T]. | Sim: `Astro.currentLocale` é calculado corretamente em cada língua [T]. |
| Número de ficheiros | Páginas × línguas (6 × 3 = 18 ficheiros finos no site futuro). | Um ficheiro por página (6 no site futuro). |
| `fallback` | Gera as páginas em falta [T]. | Não gera nada para línguas que o `getStaticPaths()` não devolve (`/fr/` simplesmente não existe) [T]. As línguas são controladas no próprio `getStaticPaths()`. |
| Slugs traduzidos (`/pt/servicos/` vs `/en/services/`) | Basta dar outro nome ao ficheiro. | É preciso devolvê-los no `getStaticPaths()` (`[lang]/[slug].astro`). |

### Armadilha encontrada nos testes

Um caso perdeu páginas reais: `prefixDefaultLocale: true` **sem** `redirectToDefaultLocale`, com um `src/pages/index.astro` próprio e um `fallback` que aponta para a língua por defeito. Nesse caso, as páginas `/fr/` e `/pt/` (que existiam em `src/pages/fr/` e `src/pages/pt/`) **não foram geradas**. O build terminou só com avisos `Could not render /fr … conflicts with higher priority route /fr` [T].

- Com `redirectToDefaultLocale: true` o problema não aconteceu [T].
- Avisos iguais aparecem também em configurações que geram tudo corretamente [T], por isso o aviso não serve como sinal de erro.
- Parece um bug do 7.3.7. Não procurei se já existe uma issue aberta no repositório do Astro.

Se usarmos `fallback`, convém confirmar a lista de ficheiros em `dist/` depois do build.

### A raiz `/` num alojamento estático

`Astro.preferredLocale`, que lê o cabeçalho `Accept-Language` do browser, não serve num site estático. O guia apresenta-o para páginas renderizadas a pedido [A1]. No build, o pedido é criado sem cabeçalhos e o valor fica `undefined` [C8]. Opções para `/`:

1. **`prefixDefaultLocale: false`.** `/` é a página na língua por defeito, sem redirect [A2, T]. Os URLs da língua por defeito não têm prefixo. Se a língua por defeito mudar mais tarde, mudam os URLs (por exemplo, `/` deixa de ser PT e o PT passa para `/pt/`).
2. **`prefixDefaultLocale: true` + `redirectToDefaultLocale: true`.** `/` é um `meta refresh` de 2 s com `noindex` [T]. Google: redirect temporário [G3].
3. **`prefixDefaultLocale: true` sem redirect.** `/` mostra o conteúdo de `src/pages/index.astro` [T]. Pode ser uma página de escolha de língua, que o Google indica como caso típico para `x-default` [G1]. Também pode ser uma cópia da língua por defeito, mas então duplica conteúdo.
4. **`prefixDefaultLocale: true` + `.htaccess`.** O Infomaniak aceita `.htaccess` e `mod_rewrite`, e toda a personalização do servidor passa por esse ficheiro [I1]. Sem adapter, o Astro não gera ficheiros de redirect para o alojamento [A7]. Um `.htaccess` em `public/` é copiado tal como está para `dist/` [A10, T]. Permite um redirect 301 ou 302 real.
5. **Deteção da língua no browser (JS) ou no `.htaccess` (`Accept-Language`).** O Google recomenda **evitar** redirecionar automaticamente pela língua presumida do visitante, porque impede utilizadores e motores de busca de ver todas as versões [G2]. O Googlebot rastreia normalmente a partir dos EUA e sem `Accept-Language` [G2].

## 2. Conteúdos e traduções separados dos componentes

### A. Dicionários TS ou JSON para os textos de interface

- **Padrão da receita oficial:** `src/i18n/ui.ts` com um objeto por língua e chave (`'nav.home'`), mais um `useTranslations(lang)` que devolve `t()` [A4]. Quando uma chave falta numa língua, o `t()` usa o texto da língua por defeito [A4].
- **Sugestão minha (não vem da documentação):** em TS, tipar as outras línguas a partir da língua de referência (`satisfies Record<Lang, typeof pt>`). Assim, uma chave em falta é erro de compilação em vez de um texto noutra língua.
- **Consequências:** é simples, não tem dependências e fica tudo em TS. Serve bem para textos curtos (menus, botões, rótulos). Serve mal para parágrafos longos com formatação, e quem editar um ficheiro TS tem de respeitar a sintaxe.

### B. Content collections (Content Layer)

- **Definição:** em `src/content.config.ts`, com `defineCollection()` e um loader de `astro/loaders` [A5]:
  - `glob()` lê Markdown, MDX, Markdoc, JSON, YAML e TOML, um ficheiro por entrada.
  - `file()` lê um único ficheiro com várias entradas.
- **Uma pasta por língua:** `src/content/sections/pt/hero.md` dá o id `pt/hero`. Filtra-se com `getCollection('sections', ({ id }) => id.startsWith('pt/'))` [A5, T].
- **Validação no build:** o schema Zod (`import { z } from 'astro/zod'`, Zod 4) valida cada entrada durante o build. Um campo obrigatório em falta faz o build falhar [A5].
- **Só no build:** as collections de build são as recomendadas e as usadas em sites estáticos. As "live collections" precisam de adapter e de renderização a pedido, por isso não servem aqui [A5].
- **Quando usar, segundo a documentação:** para "muitos ficheiros com a mesma estrutura". Não aconselha collections para meia dúzia de páginas avulsas [A5].
  - Numa landing page, o ganho está sobretudo na validação e no Markdown para textos longos.
  - No site de 5 a 6 páginas, uma collection com uma entrada por página e por língua já se justifica.
- **Sem ligação automática às línguas:** o guia de collections não fala de i18n [A5], e o routing não sabe nada das collections. A ligação é uma convenção nossa: o nome da pasta igual ao código da língua.

### C. Misto

Dicionário para a interface e collection para os textos longos. A receita oficial faz exatamente isto: `ui.ts` mais uma collection `blog/en/`, `blog/fr/` [A4].

### Como os componentes React recebem os textos

1. **Props vindas do Astro.**
   - A página `.astro` lê o dicionário ou a collection da língua `Astro.currentLocale` e passa as strings ao componente React.
   - Sem `client:*`, o componente é renderizado só no servidor, como HTML estático e sem JS [A6].
   - Com `client:*`, as props têm de ser serializáveis (objetos simples, strings, arrays, …) e **não** podem ser funções [A6]. Passam-se os textos já traduzidos, não a função `t()`, e só os textos passados vão para a página.
   - O corpo Markdown renderizado (`<Content />`) pode entrar como `children`. No React, os slots com nome viram props [A6].
   - Um componente React não pode importar componentes `.astro` [A6].
2. **Carregar as traduções no browser** (ex.: `react-i18next`).
   - Obriga a inicializar a biblioteca no cliente e a enviar a biblioteca e o dicionário em JS.
   - Só faz sentido se a língua mudar sem mudar de página. O Google recomenda um URL diferente por língua [G2], e com isso a mudança de língua é sempre uma navegação.
   - Vai contra o briefing (componentes informativos renderizados no build).

## 3. SEO: `lang`, `hreflang` e sitemap

- **`lang`.**
  - No layout, `<html lang={Astro.currentLocale}>` dá o valor certo em cada página pré-renderizada [A1, T]. O W3C recomenda declarar sempre a língua no `<html>` [W1].
  - O Google **não** usa o `lang` nem o `hreflang` para detetar a língua [G1], mas o browser pode usar o `lang` [W1].
  - Com `fallbackType: "rewrite"`, o `lang` fica errado se vier do URL [T].
- **`hreflang`.**
  - O Astro não gera estas tags: a palavra `hreflang` não aparece no código do Astro instalado [C7]. Têm de ser escritas no layout.
  - Regras do Google: cada versão lista-se a si própria e a todas as outras, as ligações têm de ser recíprocas e os URLs têm de ser absolutos (`https://…`). `x-default` é recomendado para a página de recurso [G1].
  - `getAbsoluteLocaleUrlList(path)` dá o URL de todas as línguas para o mesmo caminho e precisa de `site` configurado para dar URLs absolutos [A3]. Só troca o prefixo [C7]: não sabe se a página existe nessa língua nem conhece slugs traduzidos. Nesses casos é preciso um mapa próprio de páginas equivalentes.
- **Sitemap (`@astrojs/sitemap` 3.7.4).**
  - Exige `site` [A9].
  - Tem a sua própria opção `i18n: { defaultLocale, locales: { pt: 'pt-PT', … } }`. Não lê a configuração `i18n` do Astro, por isso a configuração fica duplicada [A9, C9].
  - Junta como alternativas só os URLs com o mesmo caminho depois do prefixo da língua [C9]: slugs traduzidos ficam sem ligação.
  - Não gera `x-default` [C9].
  - Inclui todas as páginas do build e as rotas de `fallback` [C9]. A lista que o Astro entrega à integração inclui a página de redirect de `/` [T]. Sem a opção `filter`, o sitemap passa a listar páginas `noindex`.
  - Para o Google, usar `hreflang` no HTML e no sitemap ao mesmo tempo não traz benefício [G1]. Basta um dos dois.

## 4. Seletor de língua

- Pode ser uma lista de `<a href>` gerada no build, sem JS. Se for um menu React com `client:*`, recebe a lista de URLs e de nomes por props [A6].
- **Ir para a página equivalente** (e não para a página inicial):
  - `getRelativeLocaleUrl(lang, path)` funciona quando o caminho é igual em todas as línguas [A3, C7].
  - Com slugs traduzidos é preciso um mapa próprio. A receita mostra um mapa `routes` em `ui.ts` para isso [A4].
- **Sem servidor, não há deteção automática da língua no build** [C8]. O Google recomenda pôr ligações para as outras versões em vez de redirecionar automaticamente [G2].
- O seletor só deve mostrar as línguas que existem. Se a primeira validação for só em PT, há duas formas:
  - Configurar `locales: ['pt']` e acrescentar as outras depois.
  - Usar `fallback`, mas isso gera páginas de redirect `noindex` de 2 s ou páginas com o texto noutra língua (ver secção 1).

## 5. Bibliotecas da comunidade (só referência)

| Biblioteca | Estado (npm/GitHub, 2026-10-12) | Prós e contras |
|---|---|---|
| Paraglide JS (`@inlang/paraglide-js` 2.27.0) | Ativa. O adaptador `@inlang/paraglide-astro` está *deprecated*: "use the paraglide-js package directly" [N1]. | Compila as mensagens em funções tipadas e *tree-shakable*. O exemplo para Astro usa `output: "server"` e middleware, e o caminho estático (SSG) está documentado à parte [N2]. Acrescenta ferramentas (projeto inlang, passo de compilação). Só compensa se houver muitas traduções em ilhas React no cliente. |
| `i18next` 26.x + `react-i18next` 17.x | Ativas [N1]. | Traduções em runtime, sobretudo no cliente: mais JS, sem ganho num site renderizado no build. |
| `astro-i18next` | Última publicação: 2023-03 (`1.0.0-beta.21`) [N1]. | Parada. |
| `astro-i18n` (alexandre-fernandez) | Última publicação: 2024-01 [N1]. | Parada. |
| `astro-loader-i18n` (openscript) | 1.0.2, aceita `astro ^5.5 ‖ ^6 ‖ ^7`, ativa [N1]. | Loader construído sobre o `glob()`: deteta línguas, associa as traduções e ajuda o `getStaticPaths` [N3]. Pode ajudar com slugs traduzidos em collections. É um projeto pequeno. |

A receita oficial remete para o diretório de integrações (`astro.build/integrations/?search=i18n`) [A4].

## Implicações para a decisão

Isto não decide nada: a decisão é da issue "Língua por defeito, URLs e seletor de língua", que o Julien valida. Questões a fechar:

1. **Língua por defeito:** decide o Julien.
2. **Prefixo na língua por defeito e o que acontece em `/`:**

   | Opção | A favor | Contra |
   |---|---|---|
   | (1) Sem prefixo | `/` é logo uma página real, sem redirect. | Mudar a língua por defeito muda os URLs. |
   | (2) Prefixo + redirect do Astro | Configuração simples. | 2 s de página branca, redirect temporário para o Google. |
   | (3) Prefixo + `/` próprio | Página de escolha de língua, boa para `x-default`. | Mais um clique para o visitante. Cuidado com a armadilha do `fallback` (secção 1). |
   | (4) Prefixo + `.htaccess` | Redirect HTTP real. | Configuração fora do Astro, que tem de ser testada no Infomaniak. |
3. **Slugs:**
   - Iguais em todas as línguas: os helpers do Astro e o sitemap funcionam sem código extra.
   - Traduzidos: são precisos um mapa próprio (para `hreflang`, seletor e sitemap) e o `filter` ou `serialize` do sitemap.
4. **Primeira validação só em PT:** `locales: ['pt']` e acrescentar as línguas depois, ou já as três línguas com `fallback`, com as consequências de SEO da secção 1.
5. **Onde vivem os textos:**
   - Dicionário TS, JSON, collections (Markdown/YAML) ou misto.
   - Quem vai editar no repositório? Para quem não programa, Markdown e YAML são mais fáceis do que TS.
6. **Organização das páginas:** uma pasta por língua ou uma rota `[lang]`. Pesa sobretudo no site de 5 a 6 páginas (18 contra 6 ficheiros).
7. **Seletor:**
   - Ligações simples ou ilha React.
   - Para a página equivalente ou para a página inicial.
8. **`hreflang`:** no HTML, no sitemap ou em ambos, e para onde aponta o `x-default`.

## Fontes

**Documentação do Astro (corresponde à v7)**

- [A1] Guia de internacionalização: https://docs.astro.build/en/guides/internationalization/
- [A2] Referência de configuração `i18n`: https://docs.astro.build/en/reference/configuration-reference/#i18n (o mesmo texto está no JSDoc de `node_modules/astro/dist/types/public/config.d.ts`, 7.3.7)
- [A3] Referência do módulo `astro:i18n`: https://docs.astro.build/en/reference/modules/astro-i18n/
- [A4] Receita "Add i18n features": https://docs.astro.build/en/recipes/i18n/
- [A5] Content collections: https://docs.astro.build/en/guides/content-collections/
- [A6] Framework components (props, serialização, children): https://docs.astro.build/en/guides/framework-components/
- [A7] Routing, redirecionamentos: https://docs.astro.build/en/guides/routing/#redirects
- [A8] Guia de atualização para o Astro v7: https://docs.astro.build/en/guides/upgrade-to/v7/
- [A9] `@astrojs/sitemap` (página da v3.7.4): https://docs.astro.build/en/guides/integrations-guide/sitemap/
- [A10] Estrutura do projeto, `public/`: https://docs.astro.build/en/basics/project-structure/

**Código-fonte instalado** (`node_modules/astro` 7.3.7, salvo indicação)

- [C1] `dist/core/config/schemas/base.js`: esquema `i18n` e valores por defeito.
- [C2] `dist/core/config/schemas/refined-validators.js`: `redirectToDefaultLocale` só com prefixo; `defaultLocale` tem de estar em `locales`; regras do `fallback`; `domains` exige `output: "server"`.
- [C3] `dist/core/app/common.js`: `toRoutingStrategy()`, que traduz as opções em estratégias.
- [C4] `dist/i18n/router.js` e `dist/core/i18n/handler.js`: redirect da raiz e do `fallback` com estado 302.
- [C5] `dist/core/routing/3xx.js` e `dist/core/build/generate.js`: respostas 3xx gravadas como HTML com `meta refresh` (2 s se 302), `noindex` e `canonical`.
- [C6] `dist/core/routing/create-manifest.js`: erro `MissingIndexForInternationalization` e criação das rotas de `fallback`.
- [C7] `dist/i18n/index.js`: `getLocaleRelativeUrl` e as listas só juntam o prefixo ao caminho. Não há ocorrências de `hreflang` em `dist/`.
- [C8] `dist/i18n/utils.js` (`computePreferredLocale` lê `Accept-Language`) e `dist/core/build/generate.js` (o pedido de build é criado com `new Headers()`).
- [C9] `@astrojs/sitemap` 3.7.4 (tarball do npm): `dist/index.js`, `dist/generate-sitemap.js`, `dist/utils/parse-i18n-url.js`.

**Testes**

- [T] Builds de teste com o Astro 7.3.7 instalado, num projeto descartável fora do repositório, 2026-10-12. Variantes testadas:
  - sem prefixo + `fallback`;
  - prefixo + redirect;
  - prefixo sem redirect;
  - prefixo + redirect sem `index.astro`;
  - `fallbackType` `rewrite` e `redirect` para a língua por defeito e para outra língua;
  - `defaultLocale: 'pt'` com e sem `fallback`;
  - rota `[lang]` com `fallback`;
  - collection `glob()` com pastas `pt/`, `en/`, `fr/`;
  - `public/.htaccess`;
  - lista de páginas no hook `astro:build:done`.

**Google, W3C, Infomaniak**

- [G1] Google Search Central, "Tell Google about localized versions of your page": https://developers.google.com/search/docs/specialty/international/localized-versions
- [G2] Google Search Central, "Managing multi-regional and multilingual sites": https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- [G3] Google Search Central, "Redirects and Google Search": https://developers.google.com/search/docs/crawling-indexing/301-redirects
- [W1] W3C Internationalization, "Declaring language in HTML": https://www.w3.org/International/questions/qa-html-language-declarations
- [I1] Infomaniak, "Using mod_rewrite": https://www.infomaniak.com/en/support/faq/456/using-mod-rewrite

**Comunidade**

- [N1] Metadados do registo npm (`npm view`, 2026-10-12) para `astro-i18next`, `astro-i18n`, `@inlang/paraglide-js`, `@inlang/paraglide-astro`, `i18next`, `react-i18next` e `astro-loader-i18n`.
- [N2] Paraglide JS, exemplo para Astro: https://github.com/opral/paraglide-js/tree/main/examples/astro
- [N3] README de openscript/astro-i18n (`astro-loader-i18n`): https://github.com/openscript/astro-i18n

## O que não ficou confirmado

- O comportamento do `@astrojs/react` e do `@astrojs/sitemap` não foi testado em build, porque não estão instalados. Vem da documentação e do código publicado no npm.
- Não procurei se a armadilha do `fallback` (secção 1) já tem uma issue aberta no repositório do Astro.
- As regras de `.htaccess` não foram testadas no alojamento Infomaniak do Julien. A FAQ do Infomaniak não diz a que produto se aplica [I1].
