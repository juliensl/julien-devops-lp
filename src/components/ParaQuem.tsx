import { inseparaveis } from '../lib/espacos';
import BotaoMarcar from './BotaoMarcar';

interface Props {
	titulo: string;
	/** O perfil, em 3 afirmações: o SaaS, a fase de crescimento e a equipa. */
	perfil: string[];
	/** Para o CTO de um SaaS que ainda não foi lançado. */
	antesDoLancamento: string;
	tituloDasExclusoes: string;
	exclusoes: string[];
	textoDoBotao: string;
}

/** Logo a seguir ao Hero: o CTO percebe se o serviço é para ele, e pode marcar ali mesmo. */
export default function ParaQuem({
	titulo,
	perfil,
	antesDoLancamento,
	tituloDasExclusoes,
	exclusoes,
	textoDoBotao,
}: Props) {
	return (
		<section
			aria-labelledby="para-quem-titulo"
			data-seccao="para-quem"
			className="largura grid gap-10 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2 id="para-quem-titulo" className="etiqueta font-texto">
				{titulo}
			</h2>
			<ul className="grid gap-x-12 gap-y-8 lg:grid-cols-3">
				{perfil.map((frase) => (
					<li
						key={frase}
						className="border-t-2 border-verde pt-5 font-titulos text-[clamp(1.5rem,2.6vw,2rem)] leading-tight"
					>
						{inseparaveis(frase)}
					</li>
				))}
			</ul>
			<p className="max-w-2xl text-lg text-roxo">{inseparaveis(antesDoLancamento)}</p>
			<div className="grid gap-4">
				<h3 id="para-quem-exclusoes" className="text-2xl">
					{tituloDasExclusoes}
				</h3>
				<ul aria-labelledby="para-quem-exclusoes" className="grid gap-x-12 md:grid-cols-2">
					{exclusoes.map((exclusao) => (
						<li
							key={exclusao}
							className="flex gap-3 border-t border-linha py-4 text-texto-secundario before:mt-[0.8em] before:h-px before:w-3 before:shrink-0 before:bg-linha-forte"
						>
							{inseparaveis(exclusao)}
						</li>
					))}
				</ul>
			</div>
			<div>
				<BotaoMarcar texto={textoDoBotao} />
			</div>
		</section>
	);
}
