# Landing page de Julien Laffont

Site estático em Astro, com React (gerado no build) e Tailwind. A spec é a [#54](https://github.com/juliensl/julien-devops-lp/issues/54) e o glossário está no `CONTEXT.md`.

## Comandos

Com o Node 24 (`nvm use` lê o `.nvmrc`):

| Comando                      | O que faz                                                   |
| :--------------------------- | :---------------------------------------------------------- |
| `npm ci`                     | Instala as dependências                                     |
| `npm run dev`                | Servidor de desenvolvimento em `localhost:4321`             |
| `npm run check`              | Verifica os tipos: um texto em falta numa língua faz falhar |
| `npm run format`             | Formata o código com o Prettier                             |
| `npm run build`              | Build do site publicado, em `dist/`                         |
| `npm run build:tres-linguas` | Build de teste com as três línguas, em `dist-tres-linguas/` |
| `npm test`                   | Suite Playwright sobre os dois builds, que têm de existir   |
| `npm run verificar`          | Tudo o que o workflow corre num PR, pela mesma ordem        |

## Onde fica cada coisa

- `src/config/site.ts`: o domínio, as línguas publicadas e o `noindex`.
- `src/config/valores.ts`: os valores únicos (página de marcação, LinkedIn…). O build falha se faltar algum.
- `src/i18n/`: os textos, um ficheiro por língua. O português é a Língua de referência; o francês e o inglês são tipados a partir dele.
- `src/paginas/<língua>/`: um ficheiro de página fino por página e por língua. Só se geram as páginas das línguas publicadas. As páginas sem língua ficam em `src/pages/`.
- `src/components/`: os componentes, comuns às três línguas.
- `testes/`: a suite Playwright, que percorre todas as páginas geradas.
