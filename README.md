# Julien Laffont's landing page

Static site in Astro, with React (rendered at build time) and Tailwind. The spec is [#54](https://github.com/juliensl/julien-devops-lp/issues/54) and the glossary is in `CONTEXT.md`.

## Commands

With Node 24 (`nvm use` reads `.nvmrc`):

| Command                  | What it does                                                                   |
| :----------------------- | :----------------------------------------------------------------------------- |
| `npm ci`                 | Installs the dependencies                                                      |
| `npm run dev`            | Development server on `localhost:4321`                                         |
| `npm run check`          | Checks the types: a text missing in one language makes it fail                 |
| `npm run format`         | Formats the code with Prettier                                                 |
| `npm run build`          | Build of the published site, in `dist/`                                        |
| `npm run build:launch`   | Test build with the Commercial launch, in `dist-launch/`                       |
| `npm test`               | Playwright suite over both builds, which must already exist                    |
| `npm run lighthouse`     | Lighthouse in mobile mode over both builds (see below)                         |
| `npm run verify`         | Everything the workflow runs on a PR into `main`, in the same order            |
| `npm run confirm`        | Confirms that the published site is the one in `dist/`, from this commit       |
| `npm run share-image`    | Generates the share image from `dist/` (see below)                             |
| `npm run boundary-cases` | Lists the cloud chart's providers within 0.05 of a threshold, for Julien (#75) |

## Branches

- `main` only receives releases: each merge into it publishes the site.
- `develop` is where work lands. Start each branch from it and open the PR into it. Those PRs run the quick checks: Playwright on Chromium only, no Lighthouse run.
- Release: a PR from `develop` into `main`, which runs every check. Merge it with a merge commit, never a squash, so both branches keep the same history.
- Hotfix: a branch from `main`, a PR into `main`, then `main` merged into `develop`.

## Where things live

- `src/config/site.ts`: the domain and what each phase publishes (the published languages and `noindex`).
- `src/config/values.ts`: the shared values (booking page, LinkedIn…). The build fails if one is missing.
- `src/content/legal/<language>/`: the Legal information (`legal.md`) and the Privacy policy (`privacy.md`), in Markdown. The shared values go in as placeholders, such as `{email}` or `{legal.siret}`: an unknown one fails the build, and a `null` value (the VAT number until it is active) removes its line. The build also fails when a published language lacks one of the two pages.
- `src/config/audiences.ts`: the four Audiences of «Os teus desafios». Their ids are the anchors of the questions page (`/pt/questions/#cto`), which the header submenu links to.
- `src/config/testimonials.ts`: the Testimonials, with each author's written authorisation per language and the approval of each translation. A Testimonial only shows in a language its author authorised and, in English and Portuguese, whose translation the author approved. With none, the section disappears.
- `src/i18n/`: the texts, one file per language. French is the Reference language; Portuguese and English are typed from it.
- `src/localized-pages/<language>/`: one thin page file per page and per language. Only the pages of published languages are generated. Pages without a language stay in `src/pages/`. A new page only shows up in `npm run dev` after a restart.
- `src/pages/404.astro`: the 404 page, in English only and always with `noindex`. `astro preview` and `.htaccess` show it for any address that does not exist.
- `src/layouts/Base.astro`: the `<head>` of every page: `title`, `description`, `canonical`, `hreflang`, Open Graph, `noindex` and the commit.
- `src/integrations/sitemap.ts`: writes `sitemap.xml` and `robots.txt` at the end of the build. The sitemap only lists pages without `noindex`.
- `public/og-image.png`: the share image, a single one in English (the logo and the Designation), with its path and size in `src/config/share-image.ts`. It is generated with `npm run build && npm run share-image` (`scripts/share-image.ts`), which puts `src/assets/logo.png` on the background of the built site. It only needs regenerating when the logo, the English Designation or the colours change.
- `src/assets/logo.png`: the logo, Julien's image cropped to its content. Below 1024 px the header shows only the ∞, its left 9/4 (`src/components/Logo.astro`). `public/favicon.ico` (16, 32 and 48 px) and `public/apple-touch-icon.png` (180 px) are made from that ∞; a new logo needs them redone.
- `src/components/`: the components, shared by the three languages. The header and the footer reach every page through `src/layouts/Base.astro`.
- `src/config/ecology.ts`: the ecology page's estimator: the intensity of each country (Ember 2025), the watts per vCPU (Cloud Carbon Footprint), the published PUE (Uptime Institute) and the calculation. The build writes the first result into the page and the browser recomputes it from the same file. A new year of Ember data changes this file and the year in the sources' names (`src/i18n/`).
- `src/styles/global.css`: the colours and fonts of the visual identity, as Tailwind tokens (`bg-background`, `text-green`, `font-heading`…). Only these exist.
- `src/assets/fonts/`: the site's 2 fonts, generated by `subset.sh` (it only needs to run again to change font or characters).
- `src/scripts/`: the browser JavaScript, hand-written and without a library. `after-load.ts` starts it after the page loads. On the home, ecology and questions pages, the titles and blocks marked `data-reveal` fade in when the scroll brings them up to `growth-line.ts`, the line the branch's tip follows (`src/components/ScrollReveal.astro`). Automatic animations stop with the pause button (`src/components/PauseButton.astro`), which describes the signal each animation listens to.
- `tests/`: the Playwright suite, which goes through every generated page.
- `tests/lighthouse/`: Lighthouse in mobile mode, also over every generated page. SEO, sizes, fonts and requests to other domains block. Performance, LCP and TBT only warn, in the job summary, with the median of 3 runs on `dist/`. `dist-launch/` only checks what blocks. The HTML reports go to `lighthouse-report/`.
- `.github/workflows/`: `ci.yml` runs on each PR (every check into `main`, the quick ones into any other branch); `publish.yml` runs after each merge into `main`, repeats the checks (`.github/actions/verify/`) on Chromium only, since WebKit already ran in the release PR, and does the Publishing. `ci.yml` splits the Playwright suite into 4 jobs that run side by side (`--shard`): every check runs Chromium in one and WebKit, about 3 times slower, in three; the quick checks run Chromium in four. Lighthouse runs in a job of its own.
- `publish/`: the SFTP upload (`publish.sh`, with the target folder) and the server key (`known_hosts`). The secrets are `PUBLICACAO_CHAVE_SSH`, `PUBLICACAO_SERVIDOR` and `PUBLICACAO_UTILIZADOR` (Portuguese names, kept until Julien decides otherwise); the workflow passes them to the script as `PUBLISH_SSH_KEY`, `PUBLISH_SERVER` and `PUBLISH_USER`.
- `tests/publish/`: the confirmation that runs after each Publishing, against the published site.
- `public/.htaccess`: HTTPS, cache, compression and 404 on the Infomaniak Apache. It only has an effect on the hosting.
