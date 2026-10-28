import type { ReactNode } from 'react';
import { comEspacosInseparaveis } from '../lib/spaces';

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
const classeDoItem = 'border-t border-line py-4 text-[1.0625rem]';

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
			aria-labelledby="today-title"
			className="page-width grid gap-12 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2 id="today-title" className="text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
				{titulo}
			</h2>
			<div className="grid gap-x-20 gap-y-14 lg:grid-cols-2">
				<div className="grid content-start gap-12">
					<Lista id="today-now" titulo={tituloDeHoje} classeDoTitulo="text-foreground-secondary">
						{hoje.map((problema) => (
							<li key={problema.titulo} className={`${classeDoItem} text-foreground-secondary`}>
								<strong className="font-semibold text-foreground">
									{comEspacosInseparaveis(problema.titulo)}
								</strong>{' '}
								{comEspacosInseparaveis(problema.texto)}
							</li>
						))}
					</Lista>
					<Lista
						id="today-already-tried"
						titulo={tituloDoQueJaTentaste}
						classeDoTitulo="text-foreground-secondary"
					>
						{jaTentaste.map((tentativa) => (
							<li
								key={tentativa}
								className={`${classeDoItem} flex gap-3 text-foreground-secondary before:mt-[0.8em] before:h-px before:w-3 before:shrink-0 before:bg-line-strong`}
							>
								{comEspacosInseparaveis(tentativa)}
							</li>
						))}
					</Lista>
				</div>
				<Lista id="today-after" titulo={tituloDeDepois} classeDoTitulo="text-green">
					{depois.map((ganho) => (
						<li
							key={ganho}
							className={`${classeDoItem} flex gap-3 text-foreground before:mt-[0.6em] before:size-2 before:shrink-0 before:rounded-full before:bg-green`}
						>
							{comEspacosInseparaveis(ganho)}
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
	classeDoTitulo,
	children,
}: {
	id: string;
	titulo: string;
	classeDoTitulo: string;
	children: ReactNode;
}) {
	return (
		<div className="grid content-start gap-4">
			<h3 id={id} className={`label font-body ${classeDoTitulo}`}>
				{titulo}
			</h3>
			<ul aria-labelledby={id} className="grid">
				{children}
			</ul>
		</div>
	);
}
