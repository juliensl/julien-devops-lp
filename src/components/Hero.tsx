import BotaoMarcar from './BotaoMarcar';

interface Props {
	designacao: string;
	promessa: string;
	apoio: string;
	textoDoBotao: string;
	nota: string;
}

/** O topo da página principal: a Designação, a Promessa e o botão. O ∞ chega com #72. */
export default function Hero({ designacao, promessa, apoio, textoDoBotao, nota }: Props) {
	return (
		<section aria-labelledby="promessa" className="largura py-16 sm:py-24">
			<p className="etiqueta">{designacao}</p>
			<h1
				id="promessa"
				className="mt-6 max-w-4xl text-[clamp(2.25rem,4.4vw,4.1rem)] leading-[1.05] tracking-[-0.012em]"
			>
				{promessa}
			</h1>
			<p className="mt-6 max-w-2xl text-lg text-texto-secundario">{apoio}</p>
			<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
				<BotaoMarcar texto={textoDoBotao} />
				<p className="text-sm text-texto-secundario">{nota}</p>
			</div>
		</section>
	);
}
