import { execSync } from 'node:child_process';

/** O commit que este build construiu. A confirmação da Publicação (tests/publish/) procura-o em cada página. */
export const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
