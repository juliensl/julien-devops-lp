import type { ReactNode } from 'react';
import { withNonBreakingSpaces } from '../lib/spaces';

interface Props {
	title: string;
	todayTitle: string;
	/** What the team lives with today. */
	today: string[];
	afterTitle: string;
	after: string[];
}

/** Each list item is an open row, with no box, separated from the previous one by a rule. */
const itemClass = 'border-t border-line py-4 text-[1.0625rem]';

/** The CTO recognizes the problem they live with and sees what comes after. No numbers. */
export default function TodayAndAfter({ title, todayTitle, today, afterTitle, after }: Props) {
	return (
		<section
			aria-labelledby="today-title"
			className="page-width grid gap-12 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2 id="today-title" data-reveal className="text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
				{withNonBreakingSpaces(title)}
			</h2>
			<div className="grid gap-x-20 gap-y-14 lg:grid-cols-2">
				<List id="today-now" title={todayTitle} titleClass="text-foreground-secondary">
					{today.map((problem) => (
						<li key={problem} className={`${itemClass} text-foreground-secondary`}>
							{withNonBreakingSpaces(problem)}
						</li>
					))}
				</List>
				<List id="today-after" title={afterTitle} titleClass="text-green">
					{after.map((gain) => (
						<li
							key={gain}
							className={`${itemClass} flex gap-3 text-foreground before:mt-[0.6em] before:size-2 before:shrink-0 before:rounded-full before:bg-green`}
						>
							{withNonBreakingSpaces(gain)}
						</li>
					))}
				</List>
			</div>
		</section>
	);
}

function List({
	id,
	title,
	titleClass,
	children,
}: {
	id: string;
	title: string;
	titleClass: string;
	children: ReactNode;
}) {
	return (
		<div data-reveal className="grid content-start gap-4">
			<h3 id={id} className={`label font-body ${titleClass}`}>
				{title}
			</h3>
			<ul aria-labelledby={id} className="grid">
				{children}
			</ul>
		</div>
	);
}
