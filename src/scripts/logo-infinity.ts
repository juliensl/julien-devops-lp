// The logo's ∞: the Hero's at rest, narrowed, in a box HEIGHT units tall. Its points are the same on every page.
import { curve, greenShare, nearness, projected, strayed, type Point } from './infinity';

const TAU = Math.PI * 2;
const PITCH = 0.5;
const YAW = -0.4;
/** Narrower than the Hero's: squeezed sideways. */
const SQUASH = 0.8;
const POINT_COUNT = 110;
/** How far the points stray from the curve, and their size, relative to the ∞. */
const SPREAD = 0.05;
const POINT_SIZE = 0.065;
/** Room for the glow around the curve, relative to the ∞. */
const ROOM = 0.2;

/** Where the pen starts: where the two loops cross. */
export const START = Math.PI / 2;
export const HEIGHT = 40;

function flattened(point: Point) {
	const { x, ...rest } = projected(point, PITCH, YAW);
	return { x: x * SQUASH, ...rest };
}

const outline = Array.from({ length: 200 }, (_, i) => flattened(curve((i / 200) * TAU)));
const [left, right] = [Math.min(...outline.map((p) => p.x)), Math.max(...outline.map((p) => p.x))];
const [top, bottom] = [Math.min(...outline.map((p) => p.y)), Math.max(...outline.map((p) => p.y))];
const SCALE = HEIGHT / (bottom - top + ROOM);
export const WIDTH = round((right - left + ROOM) * SCALE);
/** The pen's glow radius. */
export const PEN_SIZE = round(SCALE * POINT_SIZE * 3.2);

/** Where a point of the ∞ falls in the box, and how near it is. */
export function place(point: Point) {
	const { x, y, depth, perspective } = flattened(point);
	return {
		x: WIDTH / 2 + (x - (left + right) / 2) * SCALE,
		y: HEIGHT / 2 + (y - (top + bottom) / 2) * SCALE,
		depth,
		perspective,
	};
}

/** The thin lines from the start to `lap` radians around: the purple loop first, then the green one. */
export function lines(lap: number): [purple: string, green: string] {
	const line = (from: number, to: number) => {
		if (to <= from) return '';
		const steps = Math.ceil(((to - from) / TAU) * 160);
		return Array.from({ length: steps + 1 }, (_, i) => {
			const { x, y } = place(curve(from + ((to - from) * i) / steps));
			return `${i ? 'L' : 'M'}${round(x)} ${round(y)}`;
		}).join('');
	};
	return [line(START, START + Math.min(lap, Math.PI)), line(START + Math.PI, START + lap)];
}

/** The points, in the order the pen reaches them: how far along they are, where they rest, how big and bright. */
export function dots() {
	const random = seeded(7);
	return Array.from({ length: POINT_COUNT }, (_, i) => {
		const along = (i / POINT_COUNT) * TAU;
		const radius = Math.sqrt(random()) * SPREAD;
		const phase = random() * TAU;
		const size = 0.55 + random() * 0.95;
		const t = START + along;
		const { x, y, depth, perspective } = place(strayed(t, radius, phase));
		return {
			along: round(along),
			x: round(x),
			y: round(y),
			r: round(SCALE * POINT_SIZE * size * perspective),
			brightness: nearness(depth),
			green: greenShare(t),
		};
	});
}

function round(value: number) {
	return Math.round(value * 100) / 100;
}

/** A small seeded random generator (mulberry32), so the points never change. */
function seeded(seed: number) {
	return () => {
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
