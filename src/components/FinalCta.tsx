import type { Lingua } from '../config/site';
import { valores } from '../config/values';
import { comEspacosInseparaveis } from '../lib/spaces';
import BookingButton from './BookingButton';

interface Props {
	lingua: Lingua;
	titulo: string;
	texto: string;
	textoDoBotao: string;
	/** Por baixo do botão: 45 min, Google Meet, gratuita e sem compromisso. */
	conversa: string;
	/** Só nas línguas que não são a da página de marcação: a marcação está noutra língua. */
	avisoDaMarcacao: string;
}

/** O fim da página: «Nunca perdes a infraestrutura.» e o botão, para o CTO decidir ali mesmo. */
export default function FinalCta({
	lingua,
	titulo,
	texto,
	textoDoBotao,
	conversa,
	avisoDaMarcacao,
}: Props) {
	const linha =
		lingua === valores.linguaDaPaginaDeMarcacao ? conversa : `${conversa} ${avisoDaMarcacao}`;
	return (
		<section
			aria-labelledby="cta-final-titulo"
			className="largura grid min-h-[70svh] content-center justify-items-start gap-6 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2 id="cta-final-titulo" className="text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.06]">
				{comEspacosInseparaveis(titulo)}
			</h2>
			<p className="max-w-2xl text-lg text-texto-secundario">{comEspacosInseparaveis(texto)}</p>
			{/* A única ligação da secção: o ramo (#73) acaba com 3 folhas junto dela. */}
			<BookingButton texto={textoDoBotao} />
			<p className="max-w-2xl text-sm text-texto-secundario">{comEspacosInseparaveis(linha)}</p>
		</section>
	);
}
