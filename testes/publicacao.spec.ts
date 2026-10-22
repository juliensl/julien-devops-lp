// A confirmação que corre depois de cada Publicação (scripts/confirmar-publicacao.sh).
// No workflow da main, pergunta a julienlaffont.com; aqui, aos builds servidos localmente.
import { spawnSync } from 'node:child_process';
import { expect, test, type APIRequestContext } from '@playwright/test';
import { BUILDS, emCadaBuild, type Build } from './builds';

/** Confirma a Publicação das páginas de `paginasDe` no site servido por `servidoPor`. */
function confirmar(paginasDe: Build, servidoPor: Build, commit: string) {
	const site = `http://localhost:${servidoPor.porta}`;
	const { status, stdout, stderr, error } = spawnSync(
		'scripts/confirmar-publicacao.sh',
		[paginasDe.dist, site, commit],
		{ encoding: 'utf8' },
	);
	return { confirmada: status === 0, saida: stdout + stderr + (error?.message ?? '') };
}

/** O commit que o build escreveu na página principal em português. */
async function commitDe(request: APIRequestContext): Promise<string> {
	const html = await (await request.get('/pt/')).text();
	return html.match(/<meta name="commit" content="([0-9a-f]{40})"/)![1];
}

emCadaBuild((build) => {
	test('a confirmação passa quando cada página responde 200 com o commit do build', async ({
		request,
	}) => {
		const { confirmada, saida } = confirmar(build, build, await commitDe(request));
		expect(confirmada, saida).toBe(true);
	});

	test('a confirmação falha se as páginas têm outro commit', async ({ request }) => {
		const outro = (await commitDe(request)).replace(/^./, (c) => (c === '0' ? '1' : '0'));
		const { confirmada, saida } = confirmar(build, build, outro);
		expect(confirmada).toBe(false);
		expect(saida).toContain(`/pt/ não tem o commit ${outro}`);
	});
});

test.describe('a confirmação com as páginas de um build e o site de outro', () => {
	const [publicado, lancamento] = BUILDS;
	test.use({ baseURL: `http://localhost:${publicado.porta}` });

	test('falha se uma página do build não responde 200', async ({ request }) => {
		const { confirmada, saida } = confirmar(lancamento, publicado, await commitDe(request));
		expect(confirmada).toBe(false);
		expect(saida).toContain('/en/ respondeu 404');
	});

	test('sem index.html na raiz do build, falha se / não responde 404', async ({ request }) => {
		const { confirmada, saida } = confirmar(publicado, lancamento, await commitDe(request));
		expect(confirmada).toBe(false);
		expect(saida).toContain('/ respondeu 200, e não 404');
	});
});
