// The «Disponibilité & conditions» page: the four availability levels, the calculator of the longest
// downtime each one allows, what it means for the architecture, and the guarantee and its conditions.
import { expect, test } from '@playwright/test';
import { maxDowntime } from '../src/config/availability.ts';

/** A text with plain spaces, to compare with what the spec writes. */
const plain = (text: string) => text.replace(/ /g, ' ');

test.describe('the longest downtime of an objective', () => {
	// The spec's control values for a 30-day month (#129, «Decisões de teste»).
	for (const [objective, expected] of [
		[99.5, '3 h 36 min'],
		[99.9, '43 min 12 s'],
		[99.95, '21 min 36 s'],
		[99.99, 'about 4 min 19 s'],
	] as const) {
		test(`${objective} % over a 30-day month: ${expected}`, () => {
			expect(plain(maxDowntime(objective, 30, 'about'))).toBe(expected);
		});
	}

	// Worked out by hand over 365 days (31,536,000 s): 0.5 % = 157,680 s; 0.1 % = 31,536 s;
	// 0.05 % = 15,768 s; 0.01 % = 3,153.6 s.
	for (const [objective, expected] of [
		[99.5, '43 h 48 min'],
		[99.9, '8 h 45 min 36 s'],
		[99.95, '4 h 22 min 48 s'],
		[99.99, 'about 52 min 34 s'],
	] as const) {
		test(`${objective} % over a year of 365 days: ${expected}`, () => {
			expect(plain(maxDowntime(objective, 365, 'about'))).toBe(expected);
		});
	}

	test('a number never ends a line away from its unit', () => {
		expect(maxDowntime(99.9, 365, 'about')).toBe('8 h 45 min 36 s');
		expect(maxDowntime(99.99, 30, 'about')).toBe('about 4 min 19 s');
	});
});
