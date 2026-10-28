// Lighthouse, in mobile mode, on the pages of a build (#59).
// Reports which blocking targets each page fails, and measures the warning-only ones.
import { mkdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import { preview } from 'astro';
import lighthouse, { generateReport, type Result } from 'lighthouse';
import type { SitePage } from '../builds.ts';

/** 1 KB = 1024 bytes, as in Lighthouse budgets. */
const KB = 1024;
const MAX_PAGE_SIZE = 400 * KB;
const MAX_JS_SIZE = 75 * KB;
const MAX_FONTS = 2;

/** A target that varies from run to run: shown in the summary, as a median. */
export interface Target {
	name: string;
	threshold: string;
	/** When missed, it also shows as a warning in the job. */
	warns: boolean;
	value: (lhr: Result) => number | null;
	passes: (value: number) => boolean;
	format: (value: number) => string;
}

const categoryScore = (category: string) => (lhr: Result) => {
	const score = lhr.categories[category]?.score;
	return score == null ? null : Math.round(score * 100);
};
const metric = (audit: string) => (lhr: Result) => lhr.audits[audit]?.numericValue ?? null;

/** The performance score. It also picks the median run, the one in the report. */
const PERFORMANCE: Target = {
	name: 'Performance',
	threshold: '≥ 90',
	warns: true,
	value: categoryScore('performance'),
	passes: (v) => v >= 90,
	format: (v) => `${v}`,
};

export const TARGETS: Target[] = [
	PERFORMANCE,
	{
		name: 'LCP',
		threshold: '≤ 2.5 s',
		warns: true,
		value: metric('largest-contentful-paint'),
		passes: (ms) => ms <= 2500,
		format: (ms) => `${formatNumber(ms / 1000, 1)} s`,
	},
	{
		name: 'TBT',
		threshold: '≤ 200 ms',
		warns: true,
		value: metric('total-blocking-time'),
		passes: (ms) => ms <= 200,
		format: (ms) => `${formatNumber(ms, 0)} ms`,
	},
	{
		name: 'CLS',
		threshold: '≤ 0.1',
		warns: false,
		value: metric('cumulative-layout-shift'),
		passes: (v) => v <= 0.1,
		format: (v) => formatNumber(v, 2),
	},
	{
		name: 'Accessibility',
		threshold: '100',
		warns: false,
		value: categoryScore('accessibility'),
		passes: (v) => v === 100,
		format: (v) => `${v}`,
	},
	{
		name: 'Best practices',
		threshold: '100',
		warns: false,
		value: categoryScore('best-practices'),
		passes: (v) => v === 100,
		format: (v) => `${v}`,
	},
];

export interface Options {
	/** The build folder, served as on the hosting. */
	dist: string;
	pages: SitePage[];
	/** The `noindex` constant of the build's phase: SEO requires it, or requires indexable pages. */
	noindex: boolean;
	/** How many times Lighthouse analyzes each page. The medians come from these runs. */
	runs: number;
	/** The folder that holds the HTML report of each page's median run. */
	reportsDir?: string;
	/** Receives one line per run, to show progress. */
	progress?: (line: string) => void;
}

export interface Analysis {
	path: string;
	/** The blocking targets that some run failed. */
	failures: string[];
	/** The median of each target, in `TARGETS` order, or null if Lighthouse did not measure it. */
	medians: (number | null)[];
}

export async function checkSite(options: Options): Promise<Analysis[]> {
	const server = await preview({
		outDir: options.dist,
		server: { port: 0 },
		logLevel: 'error',
	});
	const chromiumPort = await freePort();
	// Playwright's Chromium, the same one the tests use, in new headless mode.
	const browser = await chromium.launch({
		channel: 'chromium',
		args: [`--remote-debugging-port=${chromiumPort}`],
	});
	if (options.reportsDir) mkdirSync(options.reportsDir, { recursive: true });

	const analyses: Analysis[] = [];
	try {
		for (const { path, language } of options.pages) {
			const url = `http://localhost:${server.port}${path}`;
			const runs: Result[] = [];
			for (let n = 1; n <= options.runs; n++) {
				options.progress?.(`${options.dist}${path}: run ${n} of ${options.runs}`);
				const result = await lighthouse(url, {
					port: chromiumPort,
					logLevel: 'error',
					onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
				});
				if (!result) throw new Error(`Lighthouse returned no result for ${path}.`);
				runs.push(result.lhr);
			}

			// Error pages, which have no language, always have noindex, as in the Playwright suite.
			const needsNoindex = options.noindex || !language;
			const failures = new Set(runs.flatMap((lhr) => failuresOf(lhr, needsNoindex)));
			const medians = TARGETS.map((target) => median(runs.map(target.value)));
			analyses.push({ path, failures: [...failures], medians });

			if (options.reportsDir) {
				const medianPerformance = medians[TARGETS.indexOf(PERFORMANCE)];
				const medianRun =
					runs.find((lhr) => PERFORMANCE.value(lhr) === medianPerformance) ?? runs[0];
				writeFileSync(
					join(options.reportsDir, `${reportName(path)}.html`),
					generateReport(medianRun, 'html'),
				);
			}
		}
	} finally {
		await browser.close();
		await server.stop();
	}
	return analyses;
}

/** The blocking targets that this run failed. */
function failuresOf(lhr: Result, needsNoindex: boolean): string[] {
	if (lhr.runtimeError) {
		return [`Lighthouse could not analyze the page: ${lhr.runtimeError.message}`];
	}
	const failures = seoFailures(lhr, needsNoindex);
	const allRequests = networkRequests(lhr);
	const pageSize = totalSize(allRequests);
	if (pageSize > MAX_PAGE_SIZE) {
		failures.push(`page weighs ${kb(pageSize)}, max ${kb(MAX_PAGE_SIZE)}`);
	}
	// Only counts JS from .js files. JS written inside the HTML only counts toward the page weight.
	const js = totalSize(allRequests.filter((r) => r.resourceType === 'Script'));
	if (js > MAX_JS_SIZE) failures.push(`JS weighs ${kb(js)}, max ${kb(MAX_JS_SIZE)}`);

	const fonts = allRequests.filter((r) => r.resourceType === 'Font');
	if (fonts.length > MAX_FONTS) {
		failures.push(`${fonts.length} fonts, max ${MAX_FONTS}`);
	}
	for (const { url } of fonts) {
		const { pathname } = new URL(url);
		if (!pathname.endsWith('.woff2')) failures.push(`font not in woff2: ${pathname}`);
	}

	const pageOrigin = new URL(lhr.requestedUrl!).origin;
	for (const { url } of allRequests) {
		const { protocol, origin } = new URL(url);
		if (/^(http|ws)s?:$/.test(protocol) && origin !== pageOrigin) {
			failures.push(`request to another domain: ${url}`);
		}
	}
	return failures;
}

interface NetworkRequest {
	url: string;
	resourceType?: string;
	transferSize?: number;
}

/** The requests of the first load, with their transferred (compressed) size. */
function networkRequests(lhr: Result): NetworkRequest[] {
	const details = lhr.audits['network-requests']?.details;
	return details?.type === 'table' ? (details.items as unknown as NetworkRequest[]) : [];
}

function totalSize(requests: NetworkRequest[]) {
	return requests.reduce((total, r) => total + (r.transferSize ?? 0), 0);
}

/**
 * SEO at 100, except indexing while the `noindex` constant is on:
 * then it requires the opposite, that Lighthouse sees the page as blocked.
 */
function seoFailures(lhr: Result, needsNoindex: boolean): string[] {
	const failedAudits = lhr.categories.seo.auditRefs
		.filter((ref) => ref.weight > 0)
		.map((ref) => lhr.audits[ref.id])
		.filter((audit) => audit.score !== null && audit.score < 1);
	const blocked = failedAudits.some((audit) => audit.id === 'is-crawlable');
	const failures = needsNoindex && !blocked ? ['SEO: missing noindex'] : [];
	for (const audit of failedAudits) {
		if (audit.id !== 'is-crawlable' || !needsNoindex) failures.push(`SEO: ${audit.title}`);
	}
	return failures;
}

/** The median of the measured values. With an even count, the mean of the middle two. */
function median(values: (number | null)[]): number | null {
	const measured = values.filter((v) => v !== null).sort((a, b) => a - b);
	if (!measured.length) return null;
	const middle = Math.floor(measured.length / 2);
	return measured.length % 2 ? measured[middle] : (measured[middle - 1] + measured[middle]) / 2;
}

/** A number with `decimals` decimal places and no grouping: `formatNumber(2.5, 1)` → `2.5`. */
function formatNumber(value: number, decimals: number) {
	return value.toLocaleString('en', {
		useGrouping: false,
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
}

function kb(bytes: number) {
	return `${formatNumber(bytes / KB, 1)} KB`;
}

/** The report name of a page: `/pt/` → `pt`, `/` → `index`, `/404.html` → `404`. */
function reportName(path: string) {
	return path.replace(/^\/|\/$|\.html$/g, '').replaceAll('/', '-') || 'index';
}

/** A free port, chosen by the OS, for Lighthouse to talk to Chromium. */
async function freePort(): Promise<number> {
	const server = createServer().listen(0);
	await new Promise((ready) => server.once('listening', ready));
	const { port } = server.address() as { port: number };
	await new Promise((closed) => server.close(closed));
	return port;
}
