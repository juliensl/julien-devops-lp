export type Estado = 'publicado' | 'hipotese' | 'calculado';

interface Props {
	estado: Estado;
	/** O nome do estado, na língua da página. */
	rotulo: string;
}

/**
 * O selo de um valor da página de ecologia: Publicado, Hipótese ou Calculado.
 * A cor segue o `data-estado`, por isso o script do estimador muda um selo só com o atributo e o texto.
 */
export default function Selo({ estado, rotulo }: Props) {
	return (
		<span
			data-estado={estado}
			className="inline-flex items-center rounded-full border px-2 py-0.5 align-middle text-[0.6875rem] leading-tight font-semibold tracking-[0.04em] whitespace-nowrap data-[estado=calculado]:border-transparent data-[estado=calculado]:bg-roxo/15 data-[estado=calculado]:text-roxo data-[estado=hipotese]:border-dashed data-[estado=hipotese]:border-roxo data-[estado=hipotese]:text-roxo data-[estado=publicado]:border-verde-forte data-[estado=publicado]:bg-verde/15 data-[estado=publicado]:text-verde"
		>
			{rotulo}
		</span>
	);
}
