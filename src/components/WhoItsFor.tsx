import { withNonBreakingSpaces } from '../lib/spaces';
import BookingButton from './BookingButton';

interface Props {
	title: string;
	intro: string;
	/** The situations the service is for, before or after the launch. */
	situations: string[];
	/** The text of the booking button that ends the section. */
	button: string;
}

/** Right after the Hero: the visitor sees whether the service is for them, and can book from there. */
export default function WhoItsFor({ title, intro, situations, button }: Props) {
	return (
		<section
			aria-labelledby="who-its-for-title"
			className="page-width grid gap-10 py-[clamp(5rem,11vw,9rem)]"
		>
			<div className="grid gap-5">
				<h2 id="who-its-for-title" data-reveal className="label font-body">
					{withNonBreakingSpaces(title)}
				</h2>
				<p data-reveal className="max-w-3xl text-xl text-foreground-secondary">
					{withNonBreakingSpaces(intro)}
				</p>
			</div>
			<ul className="grid gap-x-12 gap-y-8 lg:grid-cols-3">
				{situations.map((situation) => (
					<li
						key={situation}
						data-reveal
						className="border-t-2 border-green pt-5 font-heading text-[clamp(1.375rem,2.2vw,1.75rem)] leading-tight"
					>
						{withNonBreakingSpaces(situation)}
					</li>
				))}
			</ul>
			<div data-reveal>
				<BookingButton text={button} />
			</div>
		</section>
	);
}
