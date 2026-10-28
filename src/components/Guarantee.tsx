import { withNonBreakingSpaces } from '../lib/spaces';
import './Guarantee.css';

interface Props {
	label: string;
	title: string;
	/** O texto validado pelo Julien (#54). */
	text: string;
	/** Os Blocos com que a Garantia se aplica. */
	appliesWhen: string;
	conditionsTitle: string;
	conditions: string[];
	exclusionsTitle: string;
	exclusions: string[];
	/** A visualização: o número em grande, a barra e as suas legendas, e a nota por baixo. */
	number: string;
	belowNumber: string;
	inService: string;
	outOfService: string;
	note: string;
}

/**
 * A Garantia: o compromisso, quando se aplica, e os 99 % de forma visual, com uma barra da
 * largura da secção em que só a ponta (1 %) muda de cor. Sem equivalência anual nem horas por mês.
 * A barra fica sempre cheia: sem JS, não há a animação de enchimento do protótipo.
 */
export default function Guarantee({
	label,
	title,
	text,
	appliesWhen,
	conditionsTitle,
	conditions,
	exclusionsTitle,
	exclusions,
	number,
	belowNumber,
	inService,
	outOfService,
	note,
}: Props) {
	return (
		<section
			aria-labelledby="guarantee-title"
			className="page-width grid gap-14 py-[clamp(5rem,11vw,9rem)]"
		>
			<div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
				<div className="grid gap-4">
					<p className="label">{label}</p>
					<h2 id="guarantee-title" className="text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
						{withNonBreakingSpaces(title)}
					</h2>
				</div>
				<div className="grid gap-4">
					<p className="max-w-[34rem] text-lg text-foreground-secondary">
						{withNonBreakingSpaces(text)}
					</p>
					<p className="text-purple">{withNonBreakingSpaces(appliesWhen)}</p>
				</div>
			</div>

			<figure className="grid gap-4">
				<p className="guarantee-number">{withNonBreakingSpaces(number)}</p>
				<p className="mb-6 text-lg">{withNonBreakingSpaces(belowNumber)}</p>
				<div className="guarantee-bar" aria-hidden="true">
					<span></span>
					<span></span>
				</div>
				<div className="flex justify-between gap-4 text-sm text-foreground-secondary">
					<span>{withNonBreakingSpaces(inService)}</span>
					<span className="guarantee-out-of-service text-right">
						{withNonBreakingSpaces(outOfService)}
					</span>
				</div>
				<figcaption className="text-foreground-secondary">{withNonBreakingSpaces(note)}</figcaption>
			</figure>

			<div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
				<List id="guarantee-conditions" title={conditionsTitle} items={conditions} />
				<List id="guarantee-exclusions" title={exclusionsTitle} items={exclusions} />
			</div>
		</section>
	);
}

function List({ id, title, items }: { id: string; title: string; items: string[] }) {
	return (
		<div className="grid content-start gap-4">
			<h3 id={id} className="text-2xl">
				{title}
			</h3>
			<ul aria-labelledby={id} className="grid">
				{items.map((item) => (
					<li key={item} className="border-t border-line py-3 text-foreground-secondary">
						{withNonBreakingSpaces(item)}
					</li>
				))}
			</ul>
		</div>
	);
}
