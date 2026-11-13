// The availability page's calculator: the longest downtime an availability objective allows.
// The build writes the first result into the page and the page's script recomputes it, both from here.

const SECONDS_PER_DAY = 86_400;

/**
 * The longest downtime an objective (in %) allows over `days`, measured 24 h a day:
 * (1 − objective / 100) × the period in seconds. Written as the page shows it, to the nearest second
 * ("43 min 12 s"), after `about` when the exact value has a fraction of a second.
 */
export function maxDowntime(objective: number, days: number, about: string): string {
	const exact = ((100 - objective) / 100) * days * SECONDS_PER_DAY;
	const total = Math.round(exact);
	const parts = [
		[Math.floor(total / 3600), 'h'],
		[Math.floor((total % 3600) / 60), 'min'],
		[total % 60, 's'],
	] as const;
	const text = parts
		.filter(([amount]) => amount > 0)
		.map(([amount, unit]) => `${amount} ${unit}`)
		.join(' ');
	// The subtraction leaves a tiny error: 100 − 99.95 is 0.04999999999999716.
	return Math.abs(exact - total) < 1e-6 ? text : `${about} ${text}`;
}
