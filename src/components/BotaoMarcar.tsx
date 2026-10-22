import { valores } from '../config/valores';

interface Props {
	/** «Marcar uma conversa», sempre com o mesmo texto em cada língua. */
	texto: string;
}

/** Ligação simples para a página de marcação, no mesmo separador. */
export default function BotaoMarcar({ texto }: Props) {
	return (
		<a
			href={valores.paginaDeMarcacao}
			className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
		>
			{texto}
		</a>
	);
}
