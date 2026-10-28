import { inseparaveis } from '../lib/spaces';
import './Guarantee.css';

interface Props {
	etiqueta: string;
	titulo: string;
	/** O texto validado pelo Julien (#54). */
	texto: string;
	/** Os Blocos com que a Garantia se aplica. */
	aplicaSe: string;
	tituloDasCondicoes: string;
	condicoes: string[];
	tituloDasExclusoes: string;
	exclusoes: string[];
	/** A visualização: o número em grande, a barra e as suas legendas, e a nota por baixo. */
	numero: string;
	porBaixoDoNumero: string;
	comServico: string;
	semServico: string;
	nota: string;
}

/**
 * A Garantia: o compromisso, quando se aplica, e os 99 % de forma visual, com uma barra da
 * largura da secção em que só a ponta (1 %) muda de cor. Sem equivalência anual nem horas por mês.
 * A barra fica sempre cheia: sem JS, não há a animação de enchimento do protótipo.
 */
export default function Guarantee({
	etiqueta,
	titulo,
	texto,
	aplicaSe,
	tituloDasCondicoes,
	condicoes,
	tituloDasExclusoes,
	exclusoes,
	numero,
	porBaixoDoNumero,
	comServico,
	semServico,
	nota,
}: Props) {
	return (
		<section
			aria-labelledby="garantia-titulo"
			data-seccao="garantia"
			className="largura grid gap-14 py-[clamp(5rem,11vw,9rem)]"
		>
			<div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
				<div className="grid gap-4">
					<p className="etiqueta">{etiqueta}</p>
					<h2 id="garantia-titulo" className="text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
						{inseparaveis(titulo)}
					</h2>
				</div>
				<div className="grid gap-4">
					<p className="max-w-[34rem] text-lg text-texto-secundario">{inseparaveis(texto)}</p>
					<p className="text-roxo">{inseparaveis(aplicaSe)}</p>
				</div>
			</div>

			<figure className="grid gap-4">
				<p className="garantia-numero">{inseparaveis(numero)}</p>
				<p className="mb-6 text-lg">{inseparaveis(porBaixoDoNumero)}</p>
				<div className="garantia-barra" aria-hidden="true">
					<span></span>
					<span></span>
				</div>
				<div className="flex justify-between gap-4 text-sm text-texto-secundario">
					<span>{inseparaveis(comServico)}</span>
					<span className="garantia-sem-servico text-right">{inseparaveis(semServico)}</span>
				</div>
				<figcaption className="text-texto-secundario">{inseparaveis(nota)}</figcaption>
			</figure>

			<div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
				<Lista id="garantia-condicoes" titulo={tituloDasCondicoes} itens={condicoes} />
				<Lista id="garantia-exclusoes" titulo={tituloDasExclusoes} itens={exclusoes} />
			</div>
		</section>
	);
}

function Lista({ id, titulo, itens }: { id: string; titulo: string; itens: string[] }) {
	return (
		<div className="grid content-start gap-4">
			<h3 id={id} className="text-2xl">
				{titulo}
			</h3>
			<ul aria-labelledby={id} className="grid">
				{itens.map((item) => (
					<li key={item} className="border-t border-linha py-3 text-texto-secundario">
						{inseparaveis(item)}
					</li>
				))}
			</ul>
		</div>
	);
}
