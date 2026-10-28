# Landing page de Julien Laffont

Site estático em Astro, com React (gerado no build) e Tailwind. A spec é a [#54](https://github.com/juliensl/julien-devops-lp/issues/54) e o glossário está no `CONTEXT.md`.

## Comandos

Com o Node 24 (`nvm use` lê o `.nvmrc`):

| Comando                      | O que faz                                                        |
| :--------------------------- | :--------------------------------------------------------------- |
| `npm ci`                     | Instala as dependências                                          |
| `npm run dev`                | Servidor de desenvolvimento em `localhost:4321`                  |
| `npm run check`              | Verifica os tipos: um texto em falta numa língua faz falhar      |
| `npm run format`             | Formata o código com o Prettier                                  |
| `npm run build`              | Build do site publicado, em `dist/`                              |
| `npm run build:lancamento`   | Build de teste com o Lançamento comercial, em `dist-lancamento/` |
| `npm test`                   | Suite Playwright sobre os dois builds, que têm de existir        |
| `npm run lighthouse`         | Lighthouse em modo telemóvel sobre os dois builds (ver abaixo)   |
| `npm run verificar`          | Tudo o que o workflow corre num PR, pela mesma ordem             |
| `npm run confirmar`          | Confirma que o site publicado é o do `dist/` e deste commit      |
| `npm run imagem-de-partilha` | Gera a imagem de partilha a partir do `dist/` (ver abaixo)       |

## Onde fica cada coisa

- `src/config/site.ts`: o domínio e o que cada fase publica (as línguas publicadas e o `noindex`).
- `src/config/values.ts`: os valores únicos (página de marcação, LinkedIn…). O build falha se faltar algum.
- `src/i18n/`: os textos, um ficheiro por língua. O português é a Língua de referência; o francês e o inglês são tipados a partir dele.
- `src/localized-pages/<língua>/`: um ficheiro de página fino por página e por língua. Só se geram as páginas das línguas publicadas. As páginas sem língua ficam em `src/pages/`. Uma página nova só aparece no `npm run dev` depois de o reiniciar.
- `src/pages/404.astro`: a página 404, só em inglês e sempre com `noindex`. O `astro preview` e o `.htaccess` mostram-na em qualquer endereço inexistente.
- `src/layouts/Base.astro`: o `<head>` de todas as páginas: `title`, `description`, `canonical`, `hreflang`, Open Graph, `noindex` e o commit.
- `src/integrations/sitemap.ts`: escreve o `sitemap.xml` e o `robots.txt` no fim do build. O sitemap só lista as páginas sem `noindex`.
- `public/og-image.png`: a imagem de partilha, uma só e em inglês (o logótipo e a Designação), com o caminho e o tamanho em `src/config/share-image.ts`. Gera-se com `npm run build && npm run imagem-de-partilha` (`scripts/share-image.ts`), que fotografa o logótipo do site construído. Só é preciso voltar a gerá-la quando o logótipo, a Designação inglesa ou as cores mudarem.
- `src/components/`: os componentes, comuns às três línguas. O cabeçalho e o rodapé entram em todas as páginas pelo `src/layouts/Base.astro`.
- `src/styles/global.css`: as cores e as fontes da identidade visual, como tokens do Tailwind (`bg-fundo`, `text-verde`, `font-titulos`…). Só existem estas.
- `src/assets/fonts/`: as 2 fontes do site, geradas por `subset.sh` (só é preciso voltar a correr para mudar de fonte ou de caracteres).
- `src/scripts/`: o JavaScript do navegador, feito à mão e sem biblioteca. `after-load.ts` faz-o arrancar depois do carregamento. As animações automáticas param com o botão de pausa (`src/components/PauseButton.astro`), que descreve o sinal que cada animação escuta.
- `tests/`: a suite Playwright, que percorre todas as páginas geradas.
- `tests/lighthouse/`: o Lighthouse em modo telemóvel, também sobre todas as páginas geradas. O SEO, os pesos, as fontes e os pedidos a outros domínios bloqueiam. O desempenho, o LCP e o TBT só avisam, no resumo do job, com a mediana de 3 execuções no `dist/`. O `dist-lancamento/` só verifica o que bloqueia. Os relatórios HTML ficam em `lighthouse-report/`.
- `.github/workflows/`: `ci.yml` corre em cada PR; `publish.yml` corre depois de cada merge na `main`, repete as mesmas verificações (`.github/actions/verify/`) e faz a Publicação.
- `publish/`: o envio por SFTP (`publish.sh`, com a pasta-alvo) e a chave do servidor (`known_hosts`). Os secrets são `PUBLICACAO_CHAVE_SSH`, `PUBLICACAO_SERVIDOR` e `PUBLICACAO_UTILIZADOR`.
- `tests/publish/`: a confirmação que corre depois de cada Publicação, contra o site publicado.
- `public/.htaccess`: HTTPS, cache, compressão e 404 no Apache da Infomaniak. Só tem efeito no alojamento.
