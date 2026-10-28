import type { ReactNode } from 'react';
import { inseparaveis } from '../lib/spaces';

interface Props {
	titulo: string;
	tituloDeHoje: string;
	/** O que o CTO vive hoje: o problema, em negrito, e o que isso quer dizer. */
	hoje: { titulo: string; texto: string }[];
	tituloDoQueJaTentaste: string;
	jaTentaste: string[];
	tituloDeDepois: string;
	depois: string[];
}

/** Cada item das listas é uma linha aberta, sem caixa, separada da anterior por um traço. */
const linha = 'border-t border-linha py-4 text-[1.0625rem]';

/** O CTO reconhece-se no problema (o que vive e o que já tentou) e vê como fica depois. Sem números. */
export default function TodayAndAfter({
	titulo,
	tituloDeHoje,
	hoje,
	tituloDoQueJaTentaste,
	jaTentaste,
	tituloDeDepois,
	depois,
}: Props) {
	return (
		<section
			aria-labelledby="hoje-titulo"
			data-seccao="hoje"
			className="largura grid gap-12 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2 id="hoje-titulo" className="text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
				{titulo}
			</h2>
			<div className="grid gap-x-20 gap-y-14 lg:grid-cols-2">
				<div className="grid content-start gap-12">
					<Lista id="hoje-agora" titulo={tituloDeHoje} corDoTitulo="text-texto-secundario">
						{hoje.map((problema) => (
							<li key={problema.titulo} className={`${linha} text-texto-secundario`}>
								<strong className="font-semibold text-texto">
									{inseparaveis(problema.titulo)}
								</strong>{' '}
								{inseparaveis(problema.texto)}
							</li>
						))}
					</Lista>
					<Lista
						id="hoje-ja-tentaste"
						titulo={tituloDoQueJaTentaste}
						corDoTitulo="text-texto-secundario"
					>
						{jaTentaste.map((tentativa) => (
							<li
								key={tentativa}
								className={`${linha} flex gap-3 text-texto-secundario before:mt-[0.8em] before:h-px before:w-3 before:shrink-0 before:bg-linha-forte`}
							>
								{inseparaveis(tentativa)}
							</li>
						))}
					</Lista>
				</div>
				<Lista id="hoje-depois" titulo={tituloDeDepois} corDoTitulo="text-verde">
					{depois.map((ganho) => (
						<li
							key={ganho}
							className={`${linha} flex gap-3 text-texto before:mt-[0.6em] before:size-2 before:shrink-0 before:rounded-full before:bg-verde`}
						>
							{inseparaveis(ganho)}
						</li>
					))}
				</Lista>
			</div>
		</section>
	);
}

function Lista({
	id,
	titulo,
	corDoTitulo,
	children,
}: {
	id: string;
	titulo: string;
	corDoTitulo: string;
	children: ReactNode;
}) {
	return (
		<div className="grid content-start gap-4">
			<h3 id={id} className={`etiqueta font-texto ${corDoTitulo}`}>
				{titulo}
			</h3>
			<ul aria-labelledby={id} className="grid">
				{children}
			</ul>
		</div>
	);
}
