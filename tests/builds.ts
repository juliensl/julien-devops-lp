// The two builds the suite checks, and the pages each one generated.
import { existsSync, globSync } from 'node:fs';
import { test } from '@playwright/test';
import { CURRENT_PHASE, COMMERCIAL_LAUNCH, type Phase } from '../src/config/site.ts';
import { LANGUAGES, type Language } from './expected.ts';

export const BUILDS = [
	{ name: 'published', dist: 'dist', port: 4331, phase: CURRENT_PHASE, command: 'npm run build' },
	{
		name: 'commercial launch',
		dist: 'dist-launch',
		port: 4332,
		phase: COMMERCIAL_LAUNCH,
		command: 'npm run build:launch',
	},
] satisfies { name: string; dist: string; port: number; phase: Phase; command: string }[];

export type Build = (typeof BUILDS)[number];

/** Declares the tests once per build, each on its own server. */
export function inEachBuild(tests: (build: Build) => void) {
	for (const build of BUILDS) {
		test.describe(`build ${build.name}`, () => {
			test.use({ baseURL: `http://localhost:${build.port}` });
			tests(build);
		});
	}
}

export interface SitePage {
	path: string;
	/** The language, from the start of the path. Error pages (`/404.html`) have none. */
	language?: Language;
}

/** Every HTML page of the build: `pt/index.html` → `/pt/`. */
export function pagesOf(build: Build): SitePage[] {
	if (!existsSync(build.dist)) {
		throw new Error(`Missing folder ${build.dist}. Run "${build.command}" first.`);
	}
	return pagesIn(build.dist);
}

/** Every HTML page of a folder, as if it were a build. */
export function pagesIn(folder: string): SitePage[] {
	return globSync('**/*.html', { cwd: folder })
		.map((file) => `/${file.replace(/(^|\/)index\.html$/, '$1')}`)
		.sort()
		.map((path) => ({ path, language: path.endsWith('/') ? languageOf(path) : undefined }));
}

/** French has no prefix: it is the language of everything that does not start with another one. */
function languageOf(path: string): Language {
	const others = (Object.keys(LANGUAGES) as Language[]).filter((l) => LANGUAGES[l].prefix !== '/');
	return others.find((l) => path.startsWith(LANGUAGES[l].prefix)) ?? 'fr';
}
