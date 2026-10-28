import { comEspacosInseparaveis } from '../lib/spaces';
import BookingButton from './BookingButton';

interface Props {
	titulo: string;
	/** O perfil, em 3 afirmações: o SaaS, o crescimento e a equipa. */
	perfil: string[];
	/** Para o CTO de um SaaS que ainda não foi lançado. */
	aindaNaoLancado: string;
	tituloDasExclusoes: string;
	exclusoes: string[];
	textoDoBotao: string;
}

/** Logo a seguir ao Hero: o CTO percebe se o serviço é para ele, e pode marcar ali mesmo. */
export default function WhoItsFor({
	titulo,
	perfil,
	aindaNaoLancado,
	tituloDasExclusoes,
	exclusoes,
	textoDoBotao,
}: Props) {
	return (
		<section
			aria-labelledby="who-its-for-title"
			className="page-width grid gap-10 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2 id="who-its-for-title" className="label font-body">
				{titulo}
			</h2>
			<ul className="grid gap-x-12 gap-y-8 lg:grid-cols-3">
				{perfil.map((frase) => (
					<li
						key={frase}
						className="border-t-2 border-green pt-5 font-heading text-[clamp(1.5rem,2.6vw,2rem)] leading-tight"
					>
						{comEspacosInseparaveis(frase)}
					</li>
				))}
			</ul>
			<p className="max-w-2xl text-lg text-purple">{comEspacosInseparaveis(aindaNaoLancado)}</p>
			<div className="grid gap-4">
				<h3 id="who-its-for-exclusions" className="text-2xl">
					{tituloDasExclusoes}
				</h3>
				<ul aria-labelledby="who-its-for-exclusions" className="grid gap-x-12 md:grid-cols-2">
					{exclusoes.map((exclusao) => (
						<li
							key={exclusao}
							className="flex gap-3 border-t border-line py-4 text-foreground-secondary before:mt-[0.8em] before:h-px before:w-3 before:shrink-0 before:bg-line-strong"
						>
							{comEspacosInseparaveis(exclusao)}
						</li>
					))}
				</ul>
			</div>
			<div>
				<BookingButton texto={textoDoBotao} />
			</div>
		</section>
	);
}
