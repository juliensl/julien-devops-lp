import { values } from '../config/values';
import { withNonBreakingSpaces } from '../lib/spaces';

interface Props {
	title: string;
	/** The profile, in 3 statements: the SaaS, the growth and the team. */
	profile: string[];
	/** For the CTO of a SaaS that hasn't launched yet, below the first statement: `link`, a part of `text`, leads to the booking page. */
	notLaunchedYet: { text: string; link: string };
}

/** Right after the Hero: the CTO sees whether the service is for them, and a CTO not launched yet can still book. */
export default function WhoItsFor({ title, profile, notLaunchedYet }: Props) {
	const [beforeLink, afterLink] = notLaunchedYet.text.split(notLaunchedYet.link);
	return (
		<section
			aria-labelledby="who-its-for-title"
			className="page-width grid gap-10 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2 id="who-its-for-title" className="label font-body">
				{title}
			</h2>
			<ul className="grid gap-x-12 gap-y-8 lg:grid-cols-3">
				{profile.map((statement, k) => (
					<li key={statement} className="grid content-start gap-4 border-t-2 border-green pt-5">
						<p className="font-heading text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">
							{withNonBreakingSpaces(statement)}
						</p>
						{k === 0 && (
							<p className="text-lg text-purple">
								{withNonBreakingSpaces(beforeLink)}
								{/* A plain link to the booking page, in the same tab, like the booking button. */}
								<a href={values.bookingPage} className="underline underline-offset-3">
									{notLaunchedYet.link}
								</a>
								{withNonBreakingSpaces(afterLink)}
							</p>
						)}
					</li>
				))}
			</ul>
		</section>
	);
}
