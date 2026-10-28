import { withNonBreakingSpaces } from '../lib/spaces';
import BookingButton from './BookingButton';

interface Props {
	title: string;
	/** The profile, in 3 statements: the SaaS, the growth and the team. */
	profile: string[];
	/** For the CTO of a SaaS that hasn't launched yet. */
	notLaunchedYet: string;
	exclusionsTitle: string;
	exclusions: string[];
	buttonText: string;
}

/** Right after the Hero: the CTO sees whether the service is for them, and can book right there. */
export default function WhoItsFor({
	title,
	profile,
	notLaunchedYet,
	exclusionsTitle,
	exclusions,
	buttonText,
}: Props) {
	return (
		<section
			aria-labelledby="who-its-for-title"
			className="page-width grid gap-10 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2 id="who-its-for-title" className="label font-body">
				{title}
			</h2>
			<ul className="grid gap-x-12 gap-y-8 lg:grid-cols-3">
				{profile.map((statement) => (
					<li
						key={statement}
						className="border-t-2 border-green pt-5 font-heading text-[clamp(1.5rem,2.6vw,2rem)] leading-tight"
					>
						{withNonBreakingSpaces(statement)}
					</li>
				))}
			</ul>
			<p className="max-w-2xl text-lg text-purple">{withNonBreakingSpaces(notLaunchedYet)}</p>
			<div className="grid gap-4">
				<h3 id="who-its-for-exclusions" className="text-2xl">
					{exclusionsTitle}
				</h3>
				<ul aria-labelledby="who-its-for-exclusions" className="grid gap-x-12 md:grid-cols-2">
					{exclusions.map((exclusion) => (
						<li
							key={exclusion}
							className="flex gap-3 border-t border-line py-4 text-foreground-secondary before:mt-[0.8em] before:h-px before:w-3 before:shrink-0 before:bg-line-strong"
						>
							{withNonBreakingSpaces(exclusion)}
						</li>
					))}
				</ul>
			</div>
			<div>
				<BookingButton text={buttonText} />
			</div>
		</section>
	);
}
