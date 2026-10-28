import type { ReactNode } from 'react';
import { withNonBreakingSpaces } from '../lib/spaces';

interface Props {
	title: string;
	todayTitle: string;
	/** O que o CTO vive hoje: o problema, em negrito, e o que isso quer dizer. */
	today: { title: string; text: string }[];
	alreadyTriedTitle: string;
	alreadyTried: string[];
	afterTitle: string;
	after: string[];
}

/** Cada item das listas é uma linha aberta, sem caixa, separada da anterior por um traço. */
const itemClass = 'border-t border-line py-4 text-[1.0625rem]';

/** O CTO reconhece-se no problema (o que vive e o que já tentou) e vê como fica depois. Sem números. */
export default function TodayAndAfter({
	title,
	todayTitle,
	today,
	alreadyTriedTitle,
	alreadyTried,
	afterTitle,
	after,
}: Props) {
	return (
		<section
			aria-labelledby="today-title"
			className="page-width grid gap-12 py-[clamp(5rem,11vw,9rem)]"
		>
			<h2 id="today-title" className="text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
				{title}
			</h2>
			<div className="grid gap-x-20 gap-y-14 lg:grid-cols-2">
				<div className="grid content-start gap-12">
					<List id="today-now" title={todayTitle} titleClass="text-foreground-secondary">
						{today.map((problem) => (
							<li key={problem.title} className={`${itemClass} text-foreground-secondary`}>
								<strong className="font-semibold text-foreground">
									{withNonBreakingSpaces(problem.title)}
								</strong>{' '}
								{withNonBreakingSpaces(problem.text)}
							</li>
						))}
					</List>
					<List
						id="today-already-tried"
						title={alreadyTriedTitle}
						titleClass="text-foreground-secondary"
					>
						{alreadyTried.map((attempt) => (
							<li
								key={attempt}
								className={`${itemClass} flex gap-3 text-foreground-secondary before:mt-[0.8em] before:h-px before:w-3 before:shrink-0 before:bg-line-strong`}
							>
								{withNonBreakingSpaces(attempt)}
							</li>
						))}
					</List>
				</div>
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
		<div className="grid content-start gap-4">
			<h3 id={id} className={`label font-body ${titleClass}`}>
				{title}
			</h3>
			<ul aria-labelledby={id} className="grid">
				{children}
			</ul>
		</div>
	);
}
