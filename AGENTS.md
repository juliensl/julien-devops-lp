## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Agent skills

### Issue tracker

Issues and specs live in this repo's GitHub Issues (`juliensl/julien-devops-lp`), managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root, created when needed. See `docs/agents/domain.md`.

## Branches

Start each work branch from `develop` and open its PR into `develop`. `main` only receives releases (a PR from `develop`, merged with a merge commit) and hotfixes; each merge into `main` publishes the site. See "Branches" in `README.md`.

## Language

- Everything in the repo is in English: code, comments, test titles, messages, scripts, CI and docs.
- GitHub issues and PR text are written in European Portuguese. `CONTEXT.md` gives the Portuguese name of each term, so issues and code map.
- Exceptions:
  - the site copy keeps its languages (the values in `src/i18n/*.ts`);
  - `data/Pitch - Julien Laffont.txt` stays as Julien's French original;
  - the `PUBLICACAO_*` secrets keep their names until Julien decides otherwise;
  - a comment that cites an issue section quotes its Portuguese title verbatim, so it can be found.
