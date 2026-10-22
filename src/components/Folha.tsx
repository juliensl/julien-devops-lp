interface Props {
	/** Em px. */
	tamanho?: number;
	className?: string;
}

/**
 * O ícone da folha (#54, «Folha»): contorno com ponta, talinho reto, nervura e dois riscos,
 * um para cima e outro para a direita. Desenha-se com a cor do texto (`currentColor`).
 * É decorativo: quem o usa dá o nome à ligação. A folha de pontos em fluxo (#69) segue o mesmo desenho.
 */
export default function Folha({ tamanho = 20, className }: Props) {
	return (
		<svg
			width={tamanho}
			height={tamanho}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.9"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			className={className}
		>
			<path d="M5 19.5C1.8 11 11 3.8 20.5 3.5C20.7 13.5 13.5 22.7 5 19.5Z" />
			<path d="M3 21.5L14.6 9.6" />
			<path d="M8.1 16.3V12.3" />
			<path d="M12.9 11.4H17" />
		</svg>
	);
}
