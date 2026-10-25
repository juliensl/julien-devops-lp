# Landing page de Julien Laffont

Site estático em Astro, com React (gerado no build) e Tailwind. A spec é a [#54](https://github.com/juliensl/julien-devops-lp/issues/54) e o glossário está no `CONTEXT.md`.

## Comandos

Com o Node 24 (`nvm use` lê o `.nvmrc`):

| Comando                    | O que faz                                                        |
| :------------------------- | :--------------------------------------------------------------- |
| `npm ci`                   | Instala as dependências                                          |
| `npm run dev`              | Servidor de desenvolvimento em `localhost:4321`                  |
| `npm run check`            | Verifica os tipos: um texto em falta numa língua faz falhar      |
| `npm run format`           | Formata o código com o Prettier                                  |
| `npm run build`            | Build do site publicado, em `dist/`                              |
| `npm run build:lancamento` | Build de teste com o Lançamento comercial, em `dist-lancamento/` |
| `npm test`                 | Suite Playwright sobre os dois builds, que têm de existir        |
| `npm run verificar`        | Tudo o que o workflow corre num PR, pela mesma ordem             |
| `npm run confirmar`        | Confirma que o site publicado é o do `dist/` e deste commit      |

## Onde fica cada coisa

- `src/config/site.ts`: o domínio e o que cada fase publica (as línguas publicadas e o `noindex`).
- `src/config/values.ts`: os valores únicos (página de marcação, LinkedIn…). O build falha se faltar algum.
- `src/i18n/`: os textos, um ficheiro por língua. O português é a Língua de referência; o francês e o inglês são tipados a partir dele.
- `src/localized-pages/<língua>/`: um ficheiro de página fino por página e por língua. Só se geram as páginas das línguas publicadas. As páginas sem língua ficam em `src/pages/`. Uma página nova só aparece no `npm run dev` depois de o reiniciar.
- `src/components/`: os componentes, comuns às três línguas.
- `tests/`: a suite Playwright, que percorre todas as páginas geradas.
- `.github/workflows/`: `ci.yml` corre em cada PR; `publish.yml` corre depois de cada merge na `main`, repete as mesmas verificações (`.github/actions/verify/`) e faz a Publicação.
- `publish/`: o envio por SFTP (`publish.sh`, com a pasta-alvo) e a chave do servidor (`known_hosts`). Os secrets são `PUBLICACAO_CHAVE_SSH`, `PUBLICACAO_SERVIDOR` e `PUBLICACAO_UTILIZADOR`.
- `tests/publish/`: a confirmação que corre depois de cada Publicação, contra o site publicado.
- `public/.htaccess`: HTTPS, cache, compressão e 404 no Apache da Infomaniak. Só tem efeito no alojamento.
