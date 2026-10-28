// O Lighthouse em modo telemóvel sobre todas as páginas dos dois builds (#59), como na CI.
// Nos PR, o dist tem 3 execuções por página (bloqueia e avisa) e o dist-lancamento 1 (só o que
// bloqueia). Na main, antes da Publicação, DESEMPENHO=false deixa 1 execução e só o que bloqueia.
// O resumo vai para o job (ou para o terminal). Os relatórios HTML ficam em lighthouse-report/.
import { appendFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { BUILDS, pagesOf, type Build } from '../builds.ts';
import { TARGETS, checkSite, type Analysis } from './check.ts';

const WITH_PERFORMANCE = process.env.DESEMPENHO !== 'false';
const REPORTS_DIR = 'lighthouse-report';
const ON_GITHUB = process.env.GITHUB_ACTIONS === 'true';
const [published] = BUILDS;

/** No GitHub, uma anotação no job, além do resumo. Fora dele, basta o resumo no terminal. */
function annotate(level: 'error' | 'warning', text: string) {
	if (ON_GITHUB) console.log(`::${level}::${text}`);
}

/**
 * O desempenho mede-se no site publicado, com a mediana de 3 execuções.
 * O build do Lançamento comercial só verifica o que bloqueia, que não varia: basta 1.
 */
function runsFor(build: Build) {
	return WITH_PERFORMANCE && build === published ? 3 : 1;
}

function summary(build: Build, analyses: Analysis[]): string[] {
	const lines = [
		`## Lighthouse em modo telemóvel: \`${build.dist}\` (${build.name})`,
		'',
		'### Metas que bloqueiam',
		'',
	];
	const withFailures = analyses.filter((a) => a.failures.length);
	for (const { path, failures } of withFailures) {
		for (const failure of failures) {
			lines.push(`- \`${path}\`: ${failure}`);
			annotate('error', `Lighthouse ${build.dist}${path}: ${failure}`);
		}
	}
	if (!withFailures.length) {
		const passing =
			analyses.length === 1 ? 'A página cumpre' : `As ${analyses.length} páginas cumprem`;
		lines.push(`${passing} o SEO, os pesos, as fontes e os pedidos.`);
	}
	if (runsFor(build) === 1) return lines;

	lines.push(
		'',
		'### Desempenho (só avisa)',
		'',
		`Mediana de ${runsFor(build)} execuções. A negrito, o que está fora da meta.`,
		'',
		`| Página | ${TARGETS.map((t) => `${t.name} (${t.threshold})`).join(' | ')} |`,
		`| --- | ${TARGETS.map(() => '---:').join(' | ')} |`,
	);
	for (const { path, medians } of analyses) {
		const cells = TARGETS.map((target, i) => {
			const value = medians[i];
			if (value === null) return '—';
			if (target.passes(value)) return target.format(value);
			if (target.warns) {
				annotate(
					'warning',
					`Lighthouse ${build.dist}${path}: ${target.name} ${target.format(value)}, meta ${target.threshold}`,
				);
			}
			return `**${target.format(value)}**`;
		});
		lines.push(`| \`${path}\` | ${cells.join(' | ')} |`);
	}
	return lines;
}

rmSync(REPORTS_DIR, { recursive: true, force: true });
const lines: string[] = [];
let failed = false;
for (const build of BUILDS) {
	const analyses = await checkSite({
		dist: build.dist,
		pages: pagesOf(build),
		noindex: build.phase.noindex,
		runs: runsFor(build),
		reportsDir: join(REPORTS_DIR, build.dist),
		progress: console.log,
	});
	failed ||= analyses.some((a) => a.failures.length);
	lines.push(...summary(build, analyses), '');
}

const text = `${lines.join('\n')}\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
else console.log(`\n${text}`);

if (failed) {
	console.error(`Há metas do Lighthouse que bloqueiam por cumprir. Vê o resumo e ${REPORTS_DIR}/.`);
	process.exitCode = 1;
}
