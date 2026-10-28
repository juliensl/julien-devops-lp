import { execSync } from 'node:child_process';

/** The commit this build was built from. The Publishing confirmation (tests/publish/) looks for it on every page. */
export const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
