// Lighthouse in mobile mode on every page of both builds (#59), as in CI.
// On PRs, dist gets 3 runs per page (blocks and warns) and dist-lancamento 1 (blocking only).
// On main, before Publishing, DESEMPENHO=false leaves 1 run and only the blocking checks.
// The summary goes to the job (or to the terminal). The HTML reports go to lighthouse-report/.
import { appendFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { BUILDS, pagesOf, type Build } from '../builds.ts';
import { TARGETS, checkSite, type Analysis } from './check.ts';

const WITH_PERFORMANCE = process.env.DESEMPENHO !== 'false';
const REPORTS_DIR = 'lighthouse-report';
const ON_GITHUB = process.env.GITHUB_ACTIONS === 'true';
const [published] = BUILDS;

/** On GitHub, a job annotation besides the summary. Elsewhere, the terminal summary is enough. */
function annotate(level: 'error' | 'warning', text: string) {
	if (ON_GITHUB) console.log(`::${level}::${text}`);
}

/**
 * Performance is measured on the published site, as the median of 3 runs.
 * The Commercial launch build only checks what blocks, which does not vary: 1 is enough.
 */
function runsFor(build: Build) {
	return WITH_PERFORMANCE && build === published ? 3 : 1;
}

function summary(build: Build, analyses: Analysis[]): string[] {
	const lines = [
		`## Lighthouse in mobile mode: \`${build.dist}\` (${build.name})`,
		'',
		'### Blocking targets',
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
		const passing = analyses.length === 1 ? 'The page passes' : `All ${analyses.length} pages pass`;
		lines.push(`${passing} the SEO, weight, font and request checks.`);
	}
	if (runsFor(build) === 1) return lines;

	lines.push(
		'',
		'### Performance (warning only)',
		'',
		`Median of ${runsFor(build)} runs. Values outside the target are in bold.`,
		'',
		`| Page | ${TARGETS.map((t) => `${t.name} (${t.threshold})`).join(' | ')} |`,
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
					`Lighthouse ${build.dist}${path}: ${target.name} ${target.format(value)}, target ${target.threshold}`,
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
	console.error(
		`Some blocking Lighthouse targets are not met. See the summary and ${REPORTS_DIR}/.`,
	);
	process.exitCode = 1;
}
