import { execSync } from 'node:child_process';

/** O commit que este build construiu. A verificação da Publicação procura-o em cada página. */
export const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
