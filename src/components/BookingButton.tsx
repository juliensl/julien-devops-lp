import { valores } from '../config/values';

interface Props {
	/** «Marcar uma conversa», sempre com o mesmo texto em cada língua. */
	texto: string;
	/** Mais pequeno, para o cabeçalho, mas sempre com o alvo de toque de 44×44 px. */
	compacto?: boolean;
}

/** Ligação simples para a página de marcação, no mesmo separador. */
export default function BookingButton({ texto, compacto = false }: Props) {
	const tamanho = compacto ? 'px-3 text-[0.8125rem] sm:px-4 sm:text-[0.9375rem]' : 'px-6 text-base';
	return (
		<a
			href={valores.paginaDeMarcacao}
			className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-acao py-1 text-center leading-tight font-semibold text-branco transition-colors hover:bg-acao-hover ${tamanho}`}
		>
			{texto}
		</a>
	);
}
