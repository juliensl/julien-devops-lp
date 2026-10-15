# Que fontes gratuitas servem para a direção visual?

> Pesquisa do ticket [«Que fontes gratuitas servem para a direção visual?»](https://github.com/juliensl/julien-devops-lp/issues/42) (mapa [«Mapa: spec da landing page e da pipeline»](https://github.com/juliensl/julien-devops-lp/issues/4)). Fontes consultadas a **15/10/2026**.
> Este documento **não decide**. A escolha das fontes fica para [«Qual a direção visual?»](https://github.com/juliensl/julien-devops-lp/issues/8). Aqui ficam opções, pesos medidos e factos.
> **Unidades:** 1 KB = 1000 bytes. Os pesos são os dos ficheiros woff2 tal como são servidos. O woff2 já vem comprimido por dentro (Brotli) [W1], por isso a compressão do servidor quase não o reduz.

## Pergunta

Que fontes gratuitas, com uma licença que permita alojá-las no próprio site, servem para os estilos das referências visuais sem passar as metas (no máximo 2 ficheiros woff2 e 400 KB por página)? Quanto pesa cada uma e como se instala no Astro 7?

Contexto considerado:

- as referências de [«Que referências visuais apresentar ao Julien?»](https://github.com/juliensl/julien-devops-lp/issues/7) dividem-se em três estilos:
  - **serifa com mono:** Expertise By Me, Antithesis, Geoffrey Dorne;
  - **sans com mono:** Oxide, Axiom, Arkoder, OpenStatus;
  - **serifa calma com uma sans ou mono para o texto:** Krista Berlincourt;
- metas de [«Que metas de acessibilidade, desempenho e SEO definimos?»](https://github.com/juliensl/julien-devops-lp/issues/15):
  - no máximo 2 ficheiros woff2, alojados no site, sem Google Fonts nem outro pedido a terceiros;
  - página inteira ≤ 400 KB no primeiro carregamento, imagens incluídas; JS ≤ 75 KB;
  - CLS ≤ 0,1; WCAG 2.2 AA;
  - um itálico conta como mais um ficheiro; uma fonte variável com eixo de peso conta como um ficheiro;
- caracteres necessários (francês, inglês e português): é è ê ë à â ç œ æ ù û ü ï î ô ã õ á í ó ú (e as maiúsculas), « », espaço fino inseparável (U+202F), €, %, – e —, ≥;
- o projeto usa Astro 7.3.x (`"astro": "^7.3.7"`), React com TSX e Tailwind CSS.

## Resumo

- **Licenças.** Todas as fontes candidatas medidas aqui usam a SIL Open Font License 1.1 (OFL). A OFL permite alojar a fonte no próprio servidor e usá-la com `@font-face` [L1]. Fazer um subconjunto próprio conta como modificação: é permitido, mas normalmente não pode manter um "Reserved Font Name" (nome reservado) [L1]. Isto afeta Source Serif 4 ("Source"), IBM Plex ("Plex") e Sligoil ("Sligoil") [L2][L5][X1]. As fontes do Oxide, a Berkeley Mono (Axiom) e as fontes da Antithesis são pagas ou não estão em catálogos livres [R3][L7][L8][S1].
- **Caracteres.** O ficheiro `latin` do Fontsource tem todas as letras de francês e português e também « », €, %, – —, ’, …, º e ª [X1]. O `latin-ext` não faz falta. Nenhum ficheiro `latin` tem o espaço fino inseparável (U+202F) nem o ≥ (U+2265): esses dois caracteres aparecem noutra fonte [X1]. Um subconjunto próprio resolve isto quando a fonte completa tem o carácter.
- **Pesos.** Um ficheiro variável `latin` com eixo de peso pesa entre 23 e 58 KB. A versão com tamanho ótico (`opsz`) pesa entre 67 e 132 KB [X1]. As 9 combinações principais ficam entre 50,4 e 91,3 KB com os ficheiros publicados (Fontsource ou da fundição), ou seja, no máximo 23 % dos 400 KB. Com `opsz` na serifa, a mais pesada chega a 162,8 KB (41 %).
- **Serifa com mono:** Source Serif 4 + JetBrains Mono, 91,3 KB; Literata + IBM Plex Mono, 67,2 KB; Avara + Sligoil (as fontes Velvetyne do Geoffrey Dorne), 52,1 KB, mas a Avara só existe em Bold e Black e serve só para títulos.
- **Sans com mono:** Geist + Geist Mono, 52,5 KB (a Geist cita a Suisse Intl, do Oxide, como inspiração [L6]); Inter + JetBrains Mono, 88,7 KB; Instrument Sans + Commit Mono, 78,2 KB com os ficheiros do Fontsource ou 45,6 KB com subconjuntos próprios (o ficheiro da Commit Mono no Fontsource não está reduzido).
- **Serifa calma com sans ou mono:** Bona Nova + Inter, 75,2 KB (a combinação real da Krista Berlincourt [R7]); Instrument Serif + Geist, 50,4 KB; Newsreader + Fragment Mono, 83,3 KB.
- **Astro 7.3.** A API de fontes do Astro é estável desde a versão 6.0 e não mudou na 7 [A5][A6]. Descarrega as fontes no build e serve-as do próprio site, com `preload` e fontes de recurso ajustadas para reduzir o CLS [A1][T]. No build de teste:
  - o fornecedor Fontsource com os valores por defeito gera 2 ficheiros para uma só família (normal e itálico);
  - com um intervalo de pesos, o fornecedor Fontsource escolhe a versão com `opsz` (Inter: 72,9 KB em vez de 48,3 KB) [T];
  - o fornecedor local, com um ficheiro escolhido por nós, gera exatamente um ficheiro por família, com `preload` e fonte de recurso ajustada [T].

## 1. O que usam as referências

Verificado no HTML e no CSS de cada site a 15/10/2026 [R1]–[R8].

| Estilo | Site | Fontes encontradas | Gratuitas? |
|---|---|---|---|
| Serifa + mono | Expertise By Me | Source Serif 4 (variável, `wght`+`opsz`, mais itálico), Inter (400, 600, 800), JetBrains Mono (400, 500) e uma fonte de símbolos Nerd Fonts. Tudo alojado no site [R1]. | Sim (OFL) |
| Serifa + mono | Antithesis | Stringer (títulos), Onsite (texto) e AT Textual (etiquetas). Alojadas no site. Pelo caminho (`/_astro/fonts/`) e pelos nomes das fontes de recurso ("… fallback: Arial"), parece a API de fontes do Astro [R3]. | Não estão no Fontsource [F1]. Licença não verificada. |
| Serifa + mono | Geoffrey Dorne | **Avara** Bold (títulos) e **Sligoil** Micro (mono), as duas da fundição Velvetyne, mais uma fonte de ícones [R2]. | Sim (OFL) [L4][L5] |
| Sans + mono | Oxide | Suisse Intl (300, 400, 400 itálico, 500) e GT America Mono (400) [R4]. | Não. Licenças à venda [L7][L8]. |
| Sans + mono | Axiom | Geist e Berkeley Mono (variável) [R5]. | Geist sim; Berkeley Mono não [S1]. |
| Sans + mono | Arkoder | Noto Sans e JetBrains Mono, as duas variáveis (`wght`), em 2 woff2 alojados no próprio site com os nomes do Fontsource (`noto-sans-latin-wght-normal`, `jetbrains-mono-latin-wght-normal`) [R8]. | Sim (OFL) |
| Sans + mono | OpenStatus | **Commit Mono** (o mono usado em todo o site), Inter (variável) e Cal Sans [R6]. | Sim (OFL) [L3] |
| Serifa calma + sans/mono | Krista Berlincourt | **Bona Nova** (títulos, incluindo o `h1`), Inter e Inter Display, Fragment Mono, AR One Sans e Poppins. Site Framer; Bona Nova, Fragment Mono, AR One Sans e Poppins vêm do Google Fonts [R7]. | Sim (OFL) |

## 2. Caracteres de francês e português

Verifiquei a tabela de caracteres (`cmap`) de cada ficheiro com fontTools [X1].

**No ficheiro `latin` do Fontsource:**

- **Tem**, em todas as fontes medidas: todas as letras pedidas (é è ê ë à â ç œ æ ù û ü ï î ô ã õ á í ó ú e maiúsculas, incluindo Œ e Æ), « », o espaço inseparável normal (U+00A0), €, %, – —, ’ “ ”, …, º e ª.
- **Não tem**, em nenhuma fonte medida:
  - o **espaço fino inseparável U+202F**, usado em francês antes de « ; : ! ? » e entre o número e o %;
  - o **≥ (U+2265)**, por exemplo em «≥ 99 %» na Garantia;
  - também faltam → (U+2192), ≤ e Ÿ.
- **Porquê.** O `unicode-range` declarado inclui todo o bloco U+2000–206F [F1]. Mas o ficheiro só traz 18 caracteres desse bloco: U+2002, 2009, 200B, 2013, 2014, 2018, 2019, 201A, 201C, 201D, 201E, 2022, 2026, 2032, 2033, 2039, 203A e 2044. Comparei o Inter e a Bona Nova completos com o ficheiro `latin` de cada um: os completos têm o U+202F e o ficheiro `latin` não [X1].
- **Exceção:** o ficheiro `latin` da Commit Mono no Fontsource não está reduzido. Tem 1932 glifos, incluindo ≥ e →, e por isso pesa 48,1 KB [X1].

**O `latin-ext` não faz falta.** Nenhum dos caracteres pedidos está nesse ficheiro. Ele só seria descarregado se a página tivesse caracteres como Ÿ, ő ou ł [F1][X1].

**O que acontece a um carácter que falta.** O navegador desenha-o com a fonte seguinte da lista (a fonte de recurso ou a do sistema). Num espaço, a diferença é só de largura. Num ≥, o desenho muda.

**Nas fontes completas** (ficheiros do repositório google/fonts e das fundições) [X1]:

| Carácter | Fontes completas que o têm | Fontes completas que não o têm |
|---|---|---|
| U+202F (espaço fino inseparável) | Inter, Source Serif 4, IBM Plex Sans, Noto Sans, Bona Nova | todas as outras medidas |
| ≥ (U+2265) | quase todas | Instrument Serif, Instrument Sans, Noto Sans, Martian Mono |
| U+00A0 (espaço inseparável) | todas, menos uma | Avara |
| º e ª (1.º, 2.ª) | todas, menos duas | Avara, Sligoil |

**Opções para estes caracteres** (nenhuma decidida):

- fazer um subconjunto próprio com os caracteres certos (secção 3), se a fonte completa os tiver;
- usar o espaço inseparável U+00A0, que todas têm menos a Avara, em vez do U+202F;
- aceitar que o ≥ e o U+202F venham da fonte seguinte;
- escrever o texto sem o símbolo («99 % ou mais»). Esta é uma decisão de conteúdo, não de fonte.

## 3. Pesos medidos

**Como medi** [X1][X2]:

- **Coluna «Fontsource `latin`»:** o ficheiro descarregado a 15/10/2026 do CDN do Fontsource [F3]. Para as variáveis usei `https://cdn.jsdelivr.net/fontsource/fonts/<id>:vf@latest/latin-wght-normal.woff2`; para as estáticas, `…/<id>@latest/latin-400-normal.woff2`. São os mesmos ficheiros dos pacotes npm `@fontsource-variable/*` 5.3.x (confirmei bytes iguais para o Inter e a Source Serif 4) [F8].
- **Coluna «com `opsz`»:** o ficheiro `latin-opsz-normal.woff2` (eixos `wght` e `opsz`), ou `latin-standard-normal.woff2` quando há eixo de largura `wdth`.
- **Coluna «subconjunto próprio»:** gerado por mim com fontTools 4.67.0 a partir da fonte completa (repositório google/fonts ou da fundição). Inclui:
  - caracteres: U+0020–007E, U+00A0–00FF, ı, Œ œ, Ÿ, ˆ ˚ ˜, U+2009, – —, ‘ ’ ‚ “ ” „, •, …, U+202F, ‹ ›, €, ™, →, −, ≤ ≥;
  - funcionalidades OpenType: as que o fontTools mantém por defeito (kern, liga, calt, locl, mark…) mais `tnum`, `lnum` e `case`;
  - nas variáveis, fixei os eixos que não são de peso (`opsz`, `wdth`) no valor por defeito, salvo indicação.
- **Altura-x:** a altura do «x» a dividir pelo tamanho da fonte (tabela OS/2 da fonte completa). Quanto maior, maiores parecem as minúsculas ao mesmo tamanho.

### Serifas

| Fonte | Licença | Variável (eixos) | Fontsource `latin` | Com `opsz` | Subconjunto próprio | Altura-x | Notas |
|---|---|---|---|---|---|---|---|
| Source Serif 4 | OFL; "Source" reservado nos metadados da fonte [X1] | sim: `wght` 200–900, `opsz` 8–60; itálico à parte | 50 936 B (50,9 KB) | 122 360 B (122,4 KB) | 49,5 KB; 123,9 KB com `opsz`; 35,7 KB com peso limitado a 400–700 | 0,475 | Tem U+202F e ≥. Usada pela Expertise By Me [R1]. |
| Literata | OFL | sim: `wght` 200–900, `opsz` 7–72 | 52 496 B (52,5 KB) | 110 080 B (110,1 KB) | 50,8 KB | 0,507 | "for digital text… comfortable reading experience on any device" [L2] |
| Newsreader | OFL | sim: `wght` 200–800, `opsz` 6–72 | 58 084 B (58,1 KB) | 132 000 B (132,0 KB) | 54,3 KB; 128,0 KB com `opsz` | 0,426 | "intended for continuous on-screen reading" [L2]. Altura-x baixa. |
| Fraunces | OFL | sim: `wght` 100–900, `opsz` 9–144, `SOFT`, `WONK` | 36 620 B (36,6 KB) | 67 304 B (67,3 KB); 121 016 B com todos os eixos | 35,2 KB | 0,482 | Descrita como "display, Old Style soft-serif" [L2]. |
| IBM Plex Serif | OFL; "Plex" reservado [L2] | não (pesos estáticos) | 19 580 B (19,6 KB) por peso | — | 18,4 KB (13,7 KB sem hinting) | 0,516 | |
| Bona Nova | OFL | não (400, 700 e itálico) | 26 936 B (26,9 KB) por peso | — | 25,1 KB (15,9 KB sem hinting) | 0,440 | A completa tem U+202F e ≥. Usada pela Krista Berlincourt [R7]. |
| Instrument Serif | OFL | não (400 e itálico) | 21 032 B (21,0 KB) | — | 20,2 KB (14,2 KB sem hinting) | 0,510 | "condensed display font… intended for use at large sizes" [L2]. Não tem ≥. |
| Avara (Velvetyne) | OFL, declarada no README e no FONTLOG; sem licença nos metadados da fonte [L4] | não (só Bold, Black e Bold Italic) | não está no Fontsource; `Avara-Bold.woff2` oficial: 9 700 B (9,7 KB) | — | 7,1 KB (6,2 KB sem hinting) | 0,520 | Sem U+00A0, U+202F, º e ª. Usada pelo Geoffrey Dorne [R2]. |

### Sans

| Fonte | Licença | Variável (eixos) | Fontsource `latin` | Com `opsz`/`wdth` | Subconjunto próprio | Altura-x | Notas |
|---|---|---|---|---|---|---|---|
| Inter | OFL | sim: `wght` 100–900, `opsz` 14–32 | 48 256 B (48,3 KB) | 72 920 B (72,9 KB) | 39,6 KB; 61,7 KB com `opsz`; 28,8 KB com 400–700; 18,3 KB só 400 | 0,546 | "tall x-height to aid in readability" [L2]. Tem U+202F e ≥. Os desenhos «Display» estão no eixo `opsz` [L10]. |
| Geist | OFL [L6] | sim: `wght` 100–900 | 29 400 B (29,4 KB) | — | 27,2 KB | 0,530 | O README cita a Suisse International como inspiração [L6]. |
| Noto Sans | OFL | sim: `wght` 100–900, `wdth` 62,5–100 | 35 820 B (35,8 KB) | 59 928 B (59,9 KB) | 32,7 KB | 0,536 | Não tem ≥. O `latin-ext` pesa 168,0 KB, se for pedido. |
| IBM Plex Sans | OFL; "Plex" reservado [L2] | sim: `wght` 100–700, `wdth` 75–100 | 45 712 B (45,7 KB) | 65 488 B (65,5 KB) | 42,4 KB | 0,516 | Tem U+202F e ≥. |
| Manrope | OFL | sim: `wght` 200–800 | 24 836 B (24,8 KB) | — | 23,8 KB | 0,540 | Sem itálico. |
| Hanken Grotesk | OFL | sim: `wght` 100–900 | 34 704 B (34,7 KB) | — | 32,5 KB | 0,493 | "inspired by the classic grotesques" [L2] |
| Instrument Sans | OFL | sim: `wght` 400–700, `wdth` 75–100 | 30 092 B (30,1 KB) | 57 332 B (57,3 KB) | 29,8 KB | 0,510 | Não tem ≥. Peso mínimo 400. |

### Mono

Todas as mono medidas têm caracteres com 0,6 da largura do tamanho da fonte, menos a Fragment Mono (0,618) e a Martian Mono (0,75) [X1].

| Fonte | Licença | Variável (eixos) | Fontsource `latin` | Subconjunto próprio | Altura-x | Notas |
|---|---|---|---|---|---|---|
| JetBrains Mono | OFL | sim: `wght` 100–800 | 40 404 B (40,4 KB) | 38,0 KB; 28,4 KB com 400–700 | 0,550 | "made for the specific needs of developers" [L2]. Usada pela Expertise By Me e pela Arkoder. |
| Geist Mono | OFL [L6] | sim: `wght` 100–900 | 23 128 B (23,1 KB) | 21,3 KB | 0,530 | Feita para ser "the perfect partner to Geist Sans" [L6]. |
| IBM Plex Mono | OFL; "Plex" reservado [L2] | não | 14 708 B (14,7 KB) por peso | 13,4 KB (8,9 KB sem hinting) | 0,516 | |
| Commit Mono | OFL (`LICENSE-FONT`) [L3] | a versão de lançamento (v1.143) só traz 400 e 700, normal e itálico; há um ficheiro variável (`wght` 200–700, `ital` 0–1) no código do site, em `src/fonts/fontlab/` [L3] | 48 128 B (48,1 KB) por peso, **sem redução** (1932 glifos) | 15,8 KB com a variável (só normal); 23,1 KB com o eixo `ital` (normal e itálico no mesmo ficheiro); 15,0 KB com o 400 estático | 0,540 | Usada pela OpenStatus [R6]. "anonymous and neutral programming typeface" [L3]. |
| Fragment Mono | OFL | não (400 e itálico) | 25 224 B (25,2 KB) | 23,9 KB (14,0 KB sem hinting) | 0,524 | "monospaced coding version of Helvetica" [L2]. Usada pela Krista Berlincourt. |
| DM Mono | OFL | não (300, 400, 500) | 14 820 B (14,8 KB) | 14,2 KB (8,0 KB sem hinting) | 0,496 | |
| Martian Mono | OFL | sim: `wght` 100–800, `wdth` 75–112,5 | 23 556 B (23,6 KB) | 21,4 KB | 0,600 | Larga (0,75). Não tem ≥. |
| Sligoil (Velvetyne) | OFL; "Sligoil" reservado [L5] | sim: `SligoilVF`, `wght` 90–120 (Micro, Micro Medium, Micro Bold) | não está no Fontsource; oficiais: `Sligoil-Micro.woff2` 42 420 B (42,4 KB), `SligoilVF.woff2` 52 328 B (52,3 KB) | 11,4 KB (Micro); 18,1 KB (variável) | 0,540 | Sem U+202F, º e ª. Usada pelo Geoffrey Dorne [R2]. |

**Sobre o hinting.** Nas fontes estáticas, o hinting (instruções TrueType) ocupa uma parte grande do ficheiro. Por isso indico também o peso sem hinting. Não testei a diferença de nitidez no ecrã. Nas variáveis medidas, tirar o hinting quase não muda o peso, exceto na IBM Plex Sans (42,4 → 37,4 KB) [X2].

**Limitar o intervalo de pesos** reduz o ficheiro variável em cerca de 25 a 30 %. Com 400–700: Inter 39,6 → 28,8 KB; Source Serif 4 49,5 → 35,7 KB; JetBrains Mono 38,0 → 28,4 KB [X2].

## 4. Combinações por estilo

Cada combinação usa exatamente 2 ficheiros: um por família, sem itálico. «Total Fontsource» soma os ficheiros `latin` com eixo de peso (ou o peso 400 nas estáticas). Em percentagem dos 400 KB da página inteira.

Com só 2 ficheiros:

- não há itálico verdadeiro: o navegador inclina a fonte normal;
- numa fonte estática com um só peso, o navegador também simula o negrito;
- `font-synthesis` controla se o navegador pode fazer isto [M4].

### 4.1 Serifa com mono (Expertise By Me, Antithesis, Geoffrey Dorne)

| Combinação | Ficheiros | Total Fontsource | Subconjunto próprio |
|---|---|---|---|
| **A. Source Serif 4 + JetBrains Mono** | Source Serif 4 variável (`wght`) + JetBrains Mono variável | 91,3 KB (23 %) | 87,5 KB |
| A com `opsz` (como a Expertise By Me) | Source Serif 4 `opsz` + JetBrains Mono | 162,8 KB (41 %) | 161,9 KB |
| **B. Literata + IBM Plex Mono** | Literata variável (`wght`) + IBM Plex Mono 400 | 67,2 KB (17 %) | 64,2 KB |
| **C. Avara + Sligoil** (Velvetyne, como o Dorne) | `Avara-Bold.woff2` + `Sligoil-Micro.woff2` oficiais | 52,1 KB (13 %) | 18,5 KB |

- **A.**
  - Texto longo: a altura-x da Source Serif 4 (0,475) é menor do que a do Inter (0,546). Para minúsculas da mesma altura que o Inter a 16 px, seriam precisos cerca de 18 px.
  - Nome grande: com o ficheiro só de peso, o tamanho ótico fica fixo em 20 (o valor por defeito). Com o ficheiro `opsz`, o navegador ajusta o desenho ao tamanho: mais contraste nos tamanhos grandes [M5]. Custa mais 71,4 KB.
  - Licença: com um subconjunto próprio, a fonte não pode usar o nome "Source" (nome reservado) [L1].
- **B.**
  - A Literata tem a maior altura-x das serifas variáveis medidas (0,507) e foi feita para leitura em ecrã [L2].
  - A IBM Plex Mono é a mono mais leve (14,7 KB), mas só tem um peso por ficheiro: o negrito em mono seria simulado.
  - Licença: com um subconjunto próprio da Plex, a fonte não pode usar o nome "Plex" [L1][L2].
  - Alternativa: Newsreader no lugar da Literata (72,8 KB no total). A altura-x da Newsreader é baixa (0,426): precisa de cerca de 20,5 px para igualar o Inter a 16 px.
- **C.**
  - A Avara só existe em Bold, Black e Bold Italic [L4]: serve para o nome e os títulos, não para texto corrido.
  - O texto longo ficaria na Sligoil (mono) ou numa fonte do sistema (0 KB, mas diferente em cada aparelho).
  - Faltam caracteres: a Avara não tem U+00A0, U+202F, º nem ª; a Sligoil não tem U+202F, º nem ª [X1].
  - Licença: a Sligoil tem nome reservado [L5], por isso um subconjunto próprio tem de mudar de nome. A Avara não traz a licença nos metadados da fonte.

### 4.2 Sans com mono (Oxide, Axiom, Arkoder, OpenStatus)

| Combinação | Ficheiros | Total Fontsource | Subconjunto próprio |
|---|---|---|---|
| **A. Geist + Geist Mono** | duas variáveis (`wght`) | 52,5 KB (13 %) | 48,5 KB |
| **B. Inter + JetBrains Mono** | duas variáveis (`wght`) | 88,7 KB (22 %) | 77,6 KB |
| B com Noto Sans (como a Arkoder) | Noto Sans `wght` + JetBrains Mono | 76,2 KB (19 %) | 70,7 KB |
| **C. Instrument Sans + Commit Mono** | Instrument Sans `wght` + Commit Mono variável (subconjunto próprio) | 78,2 KB (20 %) com a Commit Mono do Fontsource | 45,6 KB |
| Só mono (como a OpenStatus) | Commit Mono variável com `ital` + fonte do sistema para o texto | — | 23,1 KB (1 ficheiro) |

- **A.**
  - A Geist é a sans da Axiom [R5] e cita a Suisse International (a sans do Oxide) como inspiração [L6]. A Geist Mono foi feita para acompanhar a Geist [L6].
  - O README diz que a Geist Sans foi pensada para "headlines, logos, posters, and other large display sizes" [L6]. Para texto longo no telemóvel, a altura-x (0,530) é próxima da do Inter.
  - Com os ficheiros do Fontsource, é a mais leve das combinações com duas variáveis.
- **B.**
  - O Inter foi "crafted & designed for computer screens" e tem altura-x alta [L2].
  - Os desenhos «Display» do Inter, que a Krista usa, estão no eixo `opsz` [L10]. Só vêm no ficheiro `opsz`, que tem mais 24,7 KB.
- **C.**
  - A Commit Mono é o mono da OpenStatus [R6].
  - O ficheiro do Fontsource não está reduzido (48,1 KB por peso). O subconjunto próprio da variável pesa 15,8 KB.
  - A Hanken Grotesk (34,7 KB) pode substituir a Instrument Sans. A Instrument Sans não tem ≥.
- **Mono para o texto todo.** No telemóvel, a 16 px, cada carácter mono ocupa 9,6 px. Num ecrã de 320 px com margens de 16 px, cabem 30 caracteres por linha. A preparação de «Que referências visuais apresentar ao Julien?» já notava que o texto todo em mono cansa nas respostas da FAQ.

### 4.3 Serifa calma com sans ou mono para o texto (Krista Berlincourt)

| Combinação | Ficheiros | Total Fontsource | Subconjunto próprio |
|---|---|---|---|
| **A. Bona Nova + Inter** (as fontes da Krista) | Bona Nova 400 + Inter `wght` | 75,2 KB (19 %) | 64,7 KB |
| **B. Instrument Serif + Geist** | Instrument Serif 400 + Geist `wght` | 50,4 KB (13 %) | 47,4 KB |
| B com Inter | Instrument Serif 400 + Inter `wght` | 69,3 KB (17 %) | 59,8 KB |
| **C. Newsreader + Fragment Mono** | Newsreader `wght` + Fragment Mono 400 | 83,3 KB (21 %) | 78,2 KB |

- **A.**
  - A Bona Nova é a digitalização da Bona, desenhada em 1971 por Andrzej Heidrich [L2]. É a fonte do `h1` da Krista [R7].
  - Só tem 400, 700 e itálico estáticos: com um ficheiro, os títulos ficam num peso só.
  - A fonte completa tem U+202F e ≥, que um subconjunto próprio pode manter. O ficheiro `latin` do Fontsource não os tem.
  - A altura-x é baixa (0,440). Na Krista, serve para títulos e o texto fica no Inter.
- **B.**
  - A Instrument Serif é uma serifa estreita para tamanhos grandes [L2]: serve para o nome e os títulos, não para texto corrido.
  - Não tem ≥ nem U+202F [X1].
- **C.**
  - A Newsreader serve para títulos e para texto ("continuous on-screen reading" [L2]), mas a altura-x é baixa (0,426).
  - A Fragment Mono é o mono da Krista [R7]. Só tem 400: o negrito em mono seria simulado.
  - Alternativa: Literata no lugar da Newsreader (77,7 KB no total).

### Legibilidade: notas comuns

- **Pesos finos.** A WCAG nota que fontes muito finas podem aparecer mais claras do que a cor definida, por causa do anti-aliasing. Nesses casos, recomenda traços mais grossos ou mais contraste do que o mínimo [WCAG1]. Com variáveis que descem até 100 ou 200, isto pesa na escolha do peso do texto.
- **Texto grande.** Para a WCAG, «texto grande» começa em 18 pt (24 px) normal ou 14 pt (cerca de 18,7 px) em negrito, com a ressalva das fontes muito finas [WCAG1].
- **Espaçamento.** O critério 1.4.12 pede que nada se perca se o Visitante aumentar a entrelinha até 1,5, o espaço entre letras até 0,12 e entre palavras até 0,16 do tamanho da fonte [WCAG2]. Isto depende do layout, não da fonte escolhida.
- **Telemóvel.** A altura-x indica o tamanho mínimo útil. A 16 px, as minúsculas medem: Inter 8,7 px; JetBrains Mono 8,8 px; Geist 8,5 px; Literata 8,1 px; Source Serif 4 7,6 px; Bona Nova 7,0 px; Newsreader 6,8 px.

## 5. Equivalentes gratuitos das fontes pagas

As semelhanças visuais abaixo são leitura minha, exceto onde há fonte.

| Fonte paga | Onde aparece | Opções gratuitas medidas |
|---|---|---|
| Suisse Intl (Swiss Typefaces) [L7] | Oxide | **Geist** (o README cita a Suisse International como inspiração [L6]), Inter, Hanken Grotesk, Instrument Sans |
| GT America Mono (Grilli Type) [L8] | Oxide | **Geist Mono**, IBM Plex Mono, JetBrains Mono |
| Berkeley Mono (U.S. Graphics) | Axiom | **Commit Mono** (usada pela OpenStatus), JetBrains Mono, Geist Mono |
| Stringer, Onsite, AT Textual | Antithesis | Não estão no Fontsource [F1]. Para o mesmo papel: Source Serif 4 ou Literata (títulos), Inter ou Geist (texto). |

- **Berkeley Mono.** A página do produto respondeu 403 ao pedido automático [L9]. Segundo um resumo do motor de pesquisa, a licença de programador custa 75 USD sem uso comercial, e as web fonts são um extra pago [S1]. Não confirmei na fonte primária.
- **Suisse Intl e GT America.** Os sites das fundições vendem licenças e oferecem fontes de teste [L7][L8].

## 6. Como alojar e pré-carregar no Astro 7.3

### 6.1 A API de fontes do Astro

- **Estado.** A API de fontes (`fonts`) passou de experimental a estável no Astro 6.0 [A5]. Todas as opções têm a etiqueta "Added in astro@6.0.0" [A2]. O guia de atualização para a v7 não menciona fontes [A6].
- **O que faz.** Descarrega as fontes e serve-as do próprio site. No build, os ficheiros vão para `_astro/fonts/`, com cache HTTP de ativos estáticos [A1].
- **Configuração** em `astro.config.mjs`: um array `fonts`, com `name`, `cssVariable` e `provider` em cada família [A1][A2].
- **Na página:** o componente `<Font cssVariable="…" />` de `astro:assets`, no `<head>`. Com `preload`, também gera `<link rel="preload">` [A4].
- **Fornecedores** [A3]:
  - `fontProviders.local()` lê ficheiros do disco. Os `variants` são obrigatórios, com `src`, `weight` (ex.: `"100 900"`) e `style`. O `src` aceita um caminho relativo, um URL ou uma importação de pacote (ex.: `"my-package/SomeFont.ttf"`). A documentação desaconselha pôr estes ficheiros em `public/`, porque ficariam duplicados no build.
  - `fontProviders.fontsource()` descarrega do Fontsource no build.
  - `fontProviders.npm()` lê pacotes como `@fontsource-variable/*`, instalados ou de um CDN.
  - Há ainda Adobe, Bunny, Fontshare, Google e Google Icons.
- **Valores por defeito** [A2]:
  - `weights: [400]`;
  - `styles: ["normal", "italic"]`;
  - `subsets: ["latin"]`;
  - `formats: ["woff2"]`;
  - `display: "swap"`;
  - `fallbacks: ["sans-serif"]`;
  - `optimizedFallbacks: true`.
- **Tailwind 4:** `@theme inline { --font-sans: var(--font-inter); }` [A1].

Exemplo com o fornecedor local (forma da documentação [A1][A3], testada no build [T]):

```js
// astro.config.mjs
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [{
    provider: fontProviders.local(),
    name: "Source Serif 4",
    cssVariable: "--font-serif",
    fallbacks: ["Georgia", "serif"],
    options: {
      variants: [{
        src: ["./src/assets/fonts/SourceSerif4-subset.woff2"],
        weight: "200 900",
        style: "normal",
      }],
    },
  }],
});
```

```astro
---
import { Font } from "astro:assets";
---
<head>
  <Font cssVariable="--font-serif" preload />  <!-- só a fonte do Hero -->
  <Font cssVariable="--font-mono" />           <!-- sem preload -->
</head>
```

### 6.2 O que mostrou o build de teste

Fiz builds com o Astro 7.3.7 instalado, num projeto descartável fora do repositório [T].

| Configuração | Resultado no build |
|---|---|
| Local, um woff2 variável de 49 552 B, `weight: "200 900"` | 1 ficheiro copiado sem alterações para `_astro/fonts/<hash>.woff2`. `@font-face` inline no `<head>` com `font-display: swap`, sem `unicode-range`. Com `preload`: `<link rel="preload" … as="font" type="font/woff2" crossorigin>`. |
| Fontsource sem `weights`, `styles` nem `subsets` (Inter, valores por defeito) | **2 ficheiros:** 400 normal (23 664 B) e 400 itálico (25 040 B). Com `preload`, os dois são pré-carregados. Uma família gasta as 2 fontes da meta. |
| Fontsource, `weights: ["100 900"]`, `styles: ["normal"]`, `subsets: ["latin"]` (Inter) | 1 ficheiro, mas o **`latin-opsz-normal`** (72 920 B), e não o `latin-wght-normal` (48 256 B). |
| O mesmo para a Source Serif 4 (`"200 900"`) | 1 ficheiro `opsz` de 122 360 B, e não o `wght` de 50 936 B. |
| O mesmo para a JetBrains Mono (sem `opsz`) | 1 ficheiro `wght` de 40 404 B. |
| Fontsource com `subsets: ["latin", "latin-ext"]` e `preload={[{ subset: "latin" }]}` | 2 `@font-face` com `unicode-range`; só o `latin` é pré-carregado. |
| NPM (`@fontsource-variable/source-serif-4`) | Sem `version` (por defeito `latest`), o build não conseguiu ler o CSS no CDN e a família ficou sem dados; o mesmo URL abria com `curl`. Com `version: "5.3.1"`, copiou **6 ficheiros** (todos os subconjuntos) apesar de `subsets: ["latin"]`. |

**Fontes de recurso (`fallbacks`)** [T][A7][A8][A9]:

- O Astro cria uma regra `@font-face` "… fallback: <fonte>". Essa regra aponta para uma fonte do sistema, com `size-adjust`, `ascent-override`, `descent-override` e `line-gap-override` calculados a partir das métricas da fonte.
- A fonte do sistema depende da última família genérica de `fallbacks`: `serif` → Times New Roman; `sans-serif` → Arial; `monospace` → Courier New [A8].
- Valores gerados no teste:
  - Inter contra Arial: `size-adjust` 107,12 %, `ascent-override` 90,44 %, `descent-override` 22,52 %. São os mesmos valores que o Next.js gerou para o Inter na OpenStatus [R6], o que confirma o cálculo;
  - Source Serif 4 contra Times New Roman: 110,77 %;
  - JetBrains Mono contra Courier New: 99,98 %.
- **Armadilha.** As métricas são guardadas pelo nome da família e lidas do primeiro ficheiro da lista [A7]. No teste com o fornecedor NPM, o primeiro ficheiro era o cirílico, e o `size-adjust` saiu 142,28 % em vez de 110,77 % [T].
- A regra usa `local("Arial")` (ou Times New Roman, ou Courier New). Num aparelho sem essa fonte, a regra não se aplica e fica a genérica, sem ajuste. Não testei em Android nem em Linux.

### 6.3 Pacotes `@fontsource-variable/*` importados no código

- **Instalação e uso:** `npm install @fontsource-variable/inter` e `import "@fontsource-variable/inter"` [F4].
- **O que importa:** o CSS por defeito traz o ficheiro `wght` de cada subconjunto, com `unicode-range`. O navegador só descarrega os subconjuntos usados na página [F4]. Há também `opsz.css`, `standard.css` e `wght-italic.css` [F8]. Nos pacotes variáveis não há CSS só com um subconjunto (`latin.css`) [F7].
- **`font-display`:** `swap` por defeito [F6].
- **Preload:** manual, com `import url from "…/files/inter-latin-wght-normal.woff2?url"` e um `<link rel="preload" … crossorigin>` [F5].
- **Fontes de recurso:** não há ajuste automático. O `size-adjust` e os overrides teriam de ser escritos à mão.
- **Combinação possível:** apontar o `src` do fornecedor local para o ficheiro do pacote (importação de pacote [A3]). Junta o ficheiro `wght` do Fontsource ao preload e às fontes de recurso do Astro. Não testei.

### 6.4 Ficheiros em `public/`

- `@font-face` e `<link rel="preload">` escritos à mão. Os ficheiros ficam sem hash no nome. Conforme os cabeçalhos de cache do servidor, uma nova versão com o mesmo nome pode demorar a chegar ao Visitante.
- Fontes de recurso ajustadas: também à mão.
- É o que faz a Expertise By Me: `fonts/fonts.css`, com um comentário a indicar um script `subset.sh` [R1].

### 6.5 `font-display`, preload e CLS

- **`swap`:** bloqueio muito curto e troca sem limite de tempo [M1]. O texto aparece logo, mas a troca pode deslocar o layout se a fonte de recurso tiver outras medidas [W1].
- **`optional`:** sem período de troca. A web.dev diz que garante que não há deslocações por troca de fonte. Em contrapartida, a fonte não é usada se chegar tarde [W1]. A web.dev sugere combinar `swap` nos elementos de marca com `optional` no texto [W1].
- **`size-adjust`:** multiplica as métricas da fonte e ajuda a aproximar a fonte de recurso da fonte web [M2]. É o que o Astro gera automaticamente [T].
- **Preload:**
  - fontes precisam do atributo `crossorigin`, mesmo no próprio domínio [M3];
  - o preload ignora o `unicode-range` e tira recursos a outros pedidos: deve ser usado com cuidado [W1];
  - o Fontsource recomenda pré-carregar só o subconjunto `latin` das fontes críticas [F5].
- **Meta de CLS.** Bom é ≤ 0,1 [W2]. Não medi o CLS de nenhuma combinação.

### 6.6 Comparação dos caminhos

| | API do Astro, fornecedor local | API do Astro, fornecedor Fontsource | `@fontsource-variable` importado | Ficheiros em `public/` |
|---|---|---|---|---|
| Ficheiros por família | exatamente os indicados | 1 com `styles: ["normal"]`; 2 com o valor por defeito [T] | 1 por subconjunto usado (`unicode-range`) [F4] | os indicados |
| Fontes com `opsz` | o ficheiro que escolhermos | o ficheiro `opsz`, maior [T] | o `wght` por defeito; `opsz.css` à escolha [F8] | o que escolhermos |
| Subconjunto próprio (≥, U+202F) | sim | não | não | sim |
| Preload | `<Font preload>` com `crossorigin` [T] | igual | manual (`?url`) [F5] | manual |
| Fontes de recurso ajustadas | automáticas [T] | automáticas [T] | à mão | à mão |
| Rede no build | não | sim (Fontsource) | só no `npm install` | não |
| Pedidos a terceiros no navegador | 0 | 0 | 0 | 0 |

## Limites

- **Data.** Pesos medidos a 15/10/2026, com os ficheiros `@latest` do CDN do Fontsource (pacotes npm 5.3.x) e o ramo `main` do google/fonts. Podem mudar com novas versões.
- **Subconjuntos próprios.** O peso depende dos caracteres e das funcionalidades OpenType mantidas. Usei uma lista mínima para FR/EN/PT. Uma lista maior pesa mais.
- **Legibilidade.** Não desenhei as fontes no ecrã nem testei com pessoas. As notas vêm de métricas (altura-x, largura) e das descrições dos autores. As semelhanças com as fontes pagas são leitura minha, salvo a Geist [L6].
- **Astro.**
  - Não testei o fornecedor local com uma importação de pacote, nem o fornecedor NPM com o pacote instalado.
  - Não medi o CLS nem corri o Lighthouse.
  - Não testei as fontes de recurso em Android nem em Linux.
- **Licenças.** Li o texto da OFL de cada fonte e a FAQ da OFL. Não é um parecer jurídico. As fontes da Antithesis não foram verificadas.
- **Berkeley Mono.** O preço vem de uma fonte secundária [S1].

## Pontos em aberto para «Qual a direção visual?»

Opções para [«Qual a direção visual?»](https://github.com/juliensl/julien-devops-lp/issues/8). Nada disto está decidido.

- **Estilo e combinação.** Qual dos três estilos, e qual das combinações (ou outra medida aqui)?
- **Fonte do nome.** O nome do Julien, em grande, serve de logótipo. Fica na fonte dos títulos ou numa fonte só de títulos (Avara, Instrument Serif, Bona Nova)?
- **Tamanho ótico.** Vale os 25 a 74 KB a mais do ficheiro `opsz` para o nome e os títulos?
- **Texto longo.** Fica na serifa, na sans ou numa fonte do sistema (0 KB, mas diferente em cada aparelho)?
- **Caracteres.** U+202F e ≥: subconjunto próprio, outro carácter, ou fonte de recurso?
- **Itálico e negrito.** Com 2 ficheiros, o itálico é sempre simulado. Aceita-se, ou evita-se o itálico no texto?
- **Fornecedor no Astro.** Local com ficheiros nossos (controlo exato e subconjunto próprio), ou Fontsource (menos trabalho, mas o ficheiro `opsz` e o cuidado com `styles`)?
- **`font-display`.** `swap` em tudo, ou `swap` no nome e `optional` no texto?

## Como foi feita a pesquisa

- **Referências** [R1]–[R8]: descarreguei o HTML e o CSS de cada site com `curl` e procurei as regras `@font-face` e `font-family`.
- **Metadados do Fontsource** [F1][F2]: `api.fontsource.org/v1/fonts/<id>` (licença, subconjuntos, pesos, `unicode-range`) e `/v1/variable/<id>` (eixos), para 29 famílias.
- **Ficheiros** [F3][L2]–[L5]: 84 woff2 do CDN do Fontsource, as fontes completas e os `OFL.txt` do google/fonts (23 famílias), e os ficheiros oficiais da Commit Mono (GitHub), da Avara e da Sligoil (GitLab da Velvetyne).
  - Cada download ficou numa pasta própria e nada dele foi executado.
- **Análise** [X1]: fontTools 4.67.0 e Brotli 1.2.0 (wheels do PyPI, com o SHA-256 verificado).
  - Lidos de cada ficheiro: tabela `cmap` (caracteres), `fvar` (eixos), OS/2 (altura-x), `hmtx` (largura do «0») e `name` (copyright e licença).
- **Subconjuntos próprios** [X2]: `fontTools.subset` com saída woff2. Nas variáveis, usei `fontTools.varLib.instancer` para fixar eixos ou limitar o peso.
- **Build de teste** [T]: projeto descartável fora do repositório, com o Astro 7.3.7 já instalado no projeto. Três configurações: local, Fontsource e NPM. Li o HTML e os ficheiros gerados em `dist/`.
- **Documentação** oficial do Astro, do Fontsource, da OFL, da MDN, da web.dev e da W3C (WCAG 2.2), e o código do Astro 7.3.7 no GitHub.

## Fontes

Todas consultadas a 15/10/2026.

**Astro**

- [A1] Astro Docs, "Using custom fonts": <https://docs.astro.build/en/guides/fonts/>
- [A2] Astro Docs, Configuration reference, `fonts`: <https://docs.astro.build/en/reference/configuration-reference/#fonts>
- [A3] Astro Docs, "Astro Font Provider API": <https://docs.astro.build/en/reference/font-provider-reference/>
- [A4] Astro Docs, `astro:assets`, `<Font />`: <https://docs.astro.build/en/reference/modules/astro-assets/#font->
- [A5] Astro Docs, "Upgrade to Astro v6", "Experimental features now stable": <https://docs.astro.build/en/guides/upgrade-to/v6/#experimental-features-now-stable>
- [A6] Astro Docs, "Upgrade to Astro v7": <https://docs.astro.build/en/guides/upgrade-to/v7/>
- [A7] Código do Astro 7.3.7, `optimize-fallbacks.ts`: <https://github.com/withastro/astro/blob/astro@7.3.7/packages/astro/src/assets/fonts/core/optimize-fallbacks.ts>
- [A8] Código do Astro 7.3.7, `system-fallbacks-provider.ts`: <https://github.com/withastro/astro/blob/astro@7.3.7/packages/astro/src/assets/fonts/infra/system-fallbacks-provider.ts>
- [A9] Código do Astro 7.3.7, `capsize-font-metrics-resolver.ts`: <https://github.com/withastro/astro/blob/astro@7.3.7/packages/astro/src/assets/fonts/infra/capsize-font-metrics-resolver.ts>

**Fontsource**

- [F1] API do Fontsource, metadados por família (ex.: Inter): <https://api.fontsource.org/v1/fonts/inter>
- [F2] API do Fontsource, eixos das variáveis (ex.: Inter): <https://api.fontsource.org/v1/variable/inter>
- [F3] CDN do Fontsource (jsDelivr), ficheiros medidos: `https://cdn.jsdelivr.net/fontsource/fonts/<id>:vf@latest/latin-wght-normal.woff2`, `…/latin-opsz-normal.woff2`, `…/latin-standard-normal.woff2`, `…/latin-ext-wght-normal.woff2` e `https://cdn.jsdelivr.net/fontsource/fonts/<id>@latest/latin-400-normal.woff2`
- [F4] Fontsource Docs, "Variable Fonts": <https://fontsource.org/docs/getting-started/variable>
- [F5] Fontsource Docs, "Preloading Fonts": <https://fontsource.org/docs/getting-started/preload>
- [F6] Fontsource Docs, "Font Display": <https://fontsource.org/docs/getting-started/display>
- [F7] Fontsource Docs, "Individual Subsets": <https://fontsource.org/docs/getting-started/subsets>
- [F8] Lista de ficheiros de `@fontsource-variable/inter@5.3.0` e `@fontsource-variable/source-serif-4@5.3.1` (jsDelivr): <https://data.jsdelivr.com/v1/packages/npm/@fontsource-variable/inter@5.3.0?structure=flat>

**Licenças e fundições**

- [L1] SIL, "OFL-FAQ" (entradas 1.8, 2.1, 2.2, 2.6 e 5.3): <https://openfontlicense.org/ofl-faq/>
- [L2] Repositório google/fonts: `OFL.txt`, `METADATA.pb` e `DESCRIPTION.en_us.html` de cada família (ex.: <https://github.com/google/fonts/tree/main/ofl/sourceserif4>, <https://github.com/google/fonts/tree/main/ofl/inter>, <https://github.com/google/fonts/tree/main/ofl/ibmplexmono>)
- [L3] Commit Mono: README, `LICENSE-FONT`, lançamento v1.143 e `src/fonts/fontlab/CommitMonoV143-VF.ttf`: <https://github.com/eigilnikolajsen/commit-mono>
- [L4] Avara (Velvetyne): README, FONTLOG e FONTINFO: <https://gitlab.com/velvetyne/Avara>
- [L5] Sligoil (Velvetyne): README, LICENSE e COPYRIGHT: <https://gitlab.com/velvetyne/sligoil>
- [L6] Geist: README: <https://github.com/vercel/geist-font>
- [L7] Swiss Typefaces, Suisse: <https://www.swisstypefaces.com/fonts/suisse/>
- [L8] Grilli Type, GT America: <https://www.grillitype.com/typeface/gt-america>
- [L9] U.S. Graphics Company, Berkeley Mono (respondeu 403 ao pedido automático): <https://usgraphics.com/products/berkeley-mono>
- [L10] Inter, notas da versão 4.0 ("Display" designs no eixo `opsz`): <https://github.com/rsms/inter/releases/tag/v4.0>

**Referências visuais** (HTML e CSS públicos)

- [R1] Expertise By Me: <https://www.expertiseby.me/fonts/fonts.css>
- [R2] Geoffrey Dorne: <https://geoffreydorne.com/styles.css>
- [R3] Antithesis: <https://antithesis.com/>
- [R4] Oxide: <https://oxide.computer/> (CSS `assets/index-Cfkbez_W.css`)
- [R5] Axiom: <https://axiom.co/>
- [R6] OpenStatus: <https://www.openstatus.dev/> (CSS `_next/static/immutable/chunks/11dgrltiqy-5v.css`)
- [R7] Krista Berlincourt: <https://www.kristaberlincourt.com/>
- [R8] Arkoder: <https://arkoder.dev/> (pedidos de fontes medidos com Playwright a 15/10/2026)

**Web e acessibilidade**

- [W1] web.dev, "Best practices for fonts": <https://web.dev/articles/font-best-practices>
- [W2] web.dev, "Cumulative Layout Shift (CLS)": <https://web.dev/articles/cls>
- [M1] MDN, `font-display`: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display>
- [M2] MDN, `size-adjust`: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/size-adjust>
- [M3] MDN, `rel="preload"`: <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload>
- [M4] MDN, `font-synthesis`: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-synthesis>
- [M5] MDN, `font-optical-sizing`: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-optical-sizing>
- [WCAG1] W3C, "Understanding SC 1.4.3: Contrast (Minimum)" (WCAG 2.2): <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
- [WCAG2] W3C, "Understanding SC 1.4.12: Text Spacing" (WCAG 2.2): <https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html>

**Medições próprias** (15/10/2026)

- [X1] Análise dos ficheiros com fontTools 4.67.0: tamanho em bytes, `cmap`, `fvar`, OS/2, `hmtx` e `name`. Ficheiros: os de [F3], as fontes completas de [L2] e os oficiais de [L3]–[L5].
- [X2] Subconjuntos próprios com `fontTools.subset` e `fontTools.varLib.instancer`. Lista de caracteres e opções na secção 3.
- [T] Builds de teste com o Astro 7.3.7, num projeto descartável fora do repositório: fornecedor local (subconjunto da Source Serif 4), Fontsource (Inter, Source Serif 4, JetBrains Mono e Geist Mono) e NPM (`@fontsource-variable/source-serif-4`).

**Fonte secundária** (usada só onde a primária não respondeu)

- [S1] Resumo de pesquisa web sobre o catálogo da U.S. Graphics (preços e extras de web font da Berkeley Mono), a partir de <https://usgraphics.com/catalog>. Não confirmado na página do produto.
