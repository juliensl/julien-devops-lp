import BotaoMarcar from './BotaoMarcar';

interface Props {
	designacao: string;
	promessa: string;
	apoio: string;
	botao: string;
	nota: string;
}

/** O topo da página principal: a Designação, a Promessa e o botão. O ∞ chega com #72. */
export default function Hero({ designacao, promessa, apoio, botao, nota }: Props) {
	return (
		<section aria-labelledby="promessa" className="mx-auto max-w-5xl px-4 py-16 sm:px-8 sm:py-24">
			<p className="text-sm font-semibold tracking-wide text-neutral-700 uppercase">{designacao}</p>
			<h1 id="promessa" className="mt-4 text-3xl font-bold text-balance sm:text-5xl">
				{promessa}
			</h1>
			<p className="mt-6 max-w-2xl text-lg text-neutral-700">{apoio}</p>
			<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
				<BotaoMarcar texto={botao} />
				<p className="text-sm text-neutral-700">{nota}</p>
			</div>
		</section>
	);
}
