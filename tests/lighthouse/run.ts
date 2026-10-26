// O Lighthouse em modo telemóvel sobre todas as páginas dos dois builds (#59), como na CI.
// Nos PR, o dist tem 3 execuções por página (bloqueia e avisa) e o dist-lancamento 1 (só o que
// bloqueia). Na main, antes da Publicação, DESEMPENHO=false deixa 1 execução e só o que bloqueia.
// O resumo vai para o job (ou para o terminal). Os relatórios HTML ficam em lighthouse-report/.
import { appendFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { BUILDS, paginas, type Build } from '../builds.ts';
import { METAS, verificarSite, type Analise } from './check.ts';

const COM_DESEMPENHO = process.env.DESEMPENHO !== 'false';
const RELATORIOS = 'lighthouse-report';
const NO_GITHUB = process.env.GITHUB_ACTIONS === 'true';
const [publicado] = BUILDS;

/** No GitHub, uma anotação no job, além do resumo. Fora dele, basta o resumo no terminal. */
function anotar(tipo: 'error' | 'warning', texto: string) {
	if (NO_GITHUB) console.log(`::${tipo}::${texto}`);
}

/**
 * O desempenho mede-se no site publicado, com a mediana de 3 execuções.
 * O build do Lançamento comercial só verifica o que bloqueia, que não varia: basta 1.
 */
function execucoes(build: Build) {
	return COM_DESEMPENHO && build === publicado ? 3 : 1;
}

function resumo(build: Build, analises: Analise[]): string[] {
	const linhas = [
		`## Lighthouse em modo telemóvel: \`${build.dist}\` (${build.nome})`,
		'',
		'### Metas que bloqueiam',
		'',
	];
	const comFalhas = analises.filter((a) => a.falhas.length);
	for (const { caminho, falhas } of comFalhas) {
		for (const falha of falhas) {
			linhas.push(`- \`${caminho}\`: ${falha}`);
			anotar('error', `Lighthouse ${build.dist}${caminho}: ${falha}`);
		}
	}
	if (!comFalhas.length) {
		const quantas =
			analises.length === 1 ? 'A página cumpre' : `As ${analises.length} páginas cumprem`;
		linhas.push(`${quantas} o SEO, os pesos, as fontes e os pedidos.`);
	}
	if (execucoes(build) === 1) return linhas;

	linhas.push(
		'',
		'### Desempenho (só avisa)',
		'',
		`Mediana de ${execucoes(build)} execuções. A negrito, o que está fora da meta.`,
		'',
		`| Página | ${METAS.map((m) => `${m.nome} (${m.alvo})`).join(' | ')} |`,
		`| --- | ${METAS.map(() => '---:').join(' | ')} |`,
	);
	for (const { caminho, medianas } of analises) {
		const celulas = METAS.map((meta, i) => {
			const valor = medianas[i];
			if (valor === null) return '—';
			if (meta.cumpre(valor)) return meta.formato(valor);
			if (meta.avisa) {
				anotar(
					'warning',
					`Lighthouse ${build.dist}${caminho}: ${meta.nome} ${meta.formato(valor)}, meta ${meta.alvo}`,
				);
			}
			return `**${meta.formato(valor)}**`;
		});
		linhas.push(`| \`${caminho}\` | ${celulas.join(' | ')} |`);
	}
	return linhas;
}

rmSync(RELATORIOS, { recursive: true, force: true });
const linhas: string[] = [];
let falhou = false;
for (const build of BUILDS) {
	const analises = await verificarSite({
		dist: build.dist,
		paginas: paginas(build),
		noindex: build.fase.noindex,
		execucoes: execucoes(build),
		relatorios: join(RELATORIOS, build.dist),
		progresso: console.log,
	});
	falhou ||= analises.some((a) => a.falhas.length);
	linhas.push(...resumo(build, analises), '');
}

const texto = `${linhas.join('\n')}\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, texto);
else console.log(`\n${texto}`);

if (falhou) {
	console.error(`Há metas do Lighthouse que bloqueiam por cumprir. Vê o resumo e ${RELATORIOS}/.`);
	process.exitCode = 1;
}
