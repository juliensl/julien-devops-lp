import { withNonBreakingSpaces } from '../lib/spaces';
import BookingButton from './BookingButton';

interface Props {
	title: string;
	/** O perfil, em 3 afirmações: o SaaS, o crescimento e a equipa. */
	profile: string[];
	/** Para o CTO de um SaaS que ainda não foi lançado. */
	notLaunchedYet: string;
	exclusionsTitle: string;
	exclusions: string[];
	buttonText: string;
}

/** Logo a seguir ao Hero: o CTO percebe se o serviço é para ele, e pode marcar ali mesmo. */
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
