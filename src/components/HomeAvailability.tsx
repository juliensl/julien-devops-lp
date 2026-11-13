import type { Language } from '../config/site';
import { availabilityPath } from '../lib/paths';
import { withNonBreakingSpaces } from '../lib/spaces';

interface Props {
	language: Language;
	label: string;
	title: string;
	text: string;
	/** The three-month guarantee, only with the four Blocks. */
	guarantee: string;
	/** The link to the availability page, where the levels and the conditions are explained. */
	link: string;
}

/** Availability and reliability: an objective chosen together, and the way to the availability page. */
export default function HomeAvailability({ language, label, title, text, guarantee, link }: Props) {
	return (
		<section
			aria-labelledby="availability-title"
			data-section="availability"
			className="page-width grid gap-14 py-[clamp(5rem,11vw,9rem)]"
		>
			<div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
				<div data-reveal className="grid gap-4">
					<p className="label">{label}</p>
					<h2 id="availability-title" className="text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
						{withNonBreakingSpaces(title)}
					</h2>
				</div>
				<p data-reveal className="max-w-[34rem] text-lg text-foreground-secondary">
					{withNonBreakingSpaces(text)}
				</p>
			</div>

			<div data-reveal className="grid justify-items-start gap-5">
				<p className="max-w-3xl text-foreground-secondary">{withNonBreakingSpaces(guarantee)}</p>
				<a
					href={availabilityPath(language)}
					className="inline-flex min-h-11 items-center gap-2 font-semibold text-green underline-offset-3 hover:underline"
				>
					{withNonBreakingSpaces(link)}
					<span aria-hidden="true">→</span>
				</a>
			</div>
		</section>
	);
}
