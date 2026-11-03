// The branch out of the dotted ∞, grown with the scroll beside the home page's sections down to the final button.

type Point = { x: number; y: number };
type Sample = Point & { length: number };

interface Leaf extends Point {
	length: number;
	/** In degrees, 0 pointing right. */
	angle: number;
	size: number;
	/** In the pinned Services, the card whose arrival makes it grow. */
	card?: number;
}

interface Pin {
	section: HTMLElement;
	/** The scroll at which the section pins, and the scroll it takes before it unpins. */
	start: number;
	travel: number;
	/** The section's bottom, how far its stage had slid down it when measured, and the stage's height. */
	bottom: number;
	slid: number;
	stageHeight: number;
}

/** The glowing points, drawn once per colour, and the colours of the thin line and of the leaves. */
interface Style {
	purple: HTMLCanvasElement;
	green: HTMLCanvasElement;
	white: HTMLCanvasElement;
	purpleLine: string;
	greenLine: string;
}

interface Frame {
	/** How far the branch has grown along its route. */
	length: number;
	ratio: number;
	screenHeight: number;
	time: number;
	/** How far the points have flowed along the branch. */
	flow: number;
	/** Where the branch leaves the ∞ right now, on screen, or null when the ∞ is off screen. */
	exit: Point | null;
}

const TAU = Math.PI * 2;
/** The tip follows the line at 62 % of the screen. */
const GROWTH_LINE = 0.62;
/** The first stretch of the branch bends to follow the ∞ as it sways and turns. */
const JOINT = 80;

export function createBranch(main: HTMLElement, style: Style) {
	let samples: Sample[] = [];
	let resting: Point[] = [];
	let restingExit: Point = { x: 0, y: 0 };
	let total = 0;
	let hero = { length: 0, endY: 0, topScroll: 0 };
	let leaves: Leaf[] = [];
	let nodes: Sample[] = [];
	let nodeRadius = 12;
	let tipRadius = 9;
	let purpleOnly = { from: Infinity, to: -1 };
	let pins: Pin[] = [];
	let services: { pin: Pin; length: number; cardCount: number } | null = null;
	let steps: { pin: Pin; marks: [progress: number, length: number][] } | null = null;
	let points = {
		offset: new Float32Array(0),
		phase: new Float32Array(0),
		green: new Uint8Array(0),
		spacing: 9,
	};
	let narrow = false;
	const direction = { x: 0, y: 0 };

	const spent = (scroll: number, pin: Pin) => Math.min(Math.max(scroll - pin.start, 0), pin.travel);
	/** The scroll without what the pinned sections took: it stays still while a section is pinned. */
	const virtual = (scroll: number) => pins.reduce((left, pin) => left - spent(scroll, pin), scroll);
	const progress = (scroll: number, pin: Pin) => (pin.travel ? spent(scroll, pin) / pin.travel : 1);

	/** Where the route passes nearest to `point`, as a length along it. */
	function lengthAt(point: Point) {
		let nearest = 0;
		let distance = Infinity;
		for (const sample of samples) {
			const d = Math.hypot(sample.x - point.x, sample.y - point.y);
			if (d < distance) {
				distance = d;
				nearest = sample.length;
			}
		}
		return nearest;
	}

	/** The point at `length` along the route; `direction` is left pointing the way it goes. */
	function pointAt(length: number): Point {
		let a = 0;
		let b = samples.length - 1;
		while (b - a > 1) {
			const middle = (a + b) >> 1;
			if (samples[middle].length < length) a = middle;
			else b = middle;
		}
		const [from, to] = [samples[a], samples[b]];
		const stretch = to.length - from.length || 1;
		const k = Math.min(Math.max((length - from.length) / stretch, 0), 1);
		direction.x = (to.x - from.x) / stretch;
		direction.y = (to.y - from.y) / stretch;
		return { x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k };
	}

	const angleAt = (length: number) => {
		pointAt(length);
		return (Math.atan2(direction.y, direction.x) * 180) / Math.PI;
	};

	/** Lays the route over the page as it is now, from where it leaves the ∞ at rest, on screen. */
	function layOut(exitOnScreen: Point, isNarrow: boolean) {
		narrow = isNarrow;
		const origin = main.getBoundingClientRect();
		const exit = { x: exitOnScreen.x - origin.left, y: exitOnScreen.y - origin.top };
		restingExit = exit;
		const measure = (e: Element) => {
			const r = e.getBoundingClientRect();
			return {
				x: r.left - origin.left,
				y: r.top - origin.top,
				width: r.width,
				height: r.height,
				bottom: r.bottom - origin.top,
			};
		};
		pins = [...main.querySelectorAll<HTMLElement>('[data-pinned]')].map((section) => {
			const stage = section.querySelector<HTMLElement>('[data-stage]')!;
			const { y, bottom } = measure(section);
			return {
				section,
				start: y - parseFloat(getComputedStyle(stage).top),
				travel: section.offsetHeight - stage.offsetHeight,
				bottom,
				slid: measure(stage).y - y,
				stageHeight: stage.offsetHeight,
			};
		});
		// Measured as if the pinned sections took no extra scroll, so the branch holds still while one is pinned.
		const place = (e: Element) => {
			const box = measure(e);
			let rise = 0;
			for (const pin of pins) {
				if (box.y >= pin.bottom - 1) rise += pin.travel;
				else if (e !== pin.section && pin.section.contains(e)) rise += pin.slid;
			}
			return { ...box, y: box.y - rise, bottom: box.bottom - rise };
		};

		const width = main.clientWidth;
		const sections = [...main.querySelectorAll<HTMLElement>(':scope > section')];
		const heroSection = sections[0];
		const box = place(main.querySelector('[data-infinity]')!);
		const text = place(heroSection.querySelector('h1')!.parentElement!);
		const left = Math.max(9, text.x - 34);
		const right = width - left;
		const leafSize = left < 40 ? 12 : 30;
		// On a tight margin, steeper leaves and smaller glows keep clear of the text.
		const tight = text.x - left < 20;
		tipRadius = tight ? 6 : 9;
		const inwards = tight ? -65 : -38;
		const towardsPage = (onRight: boolean) => (onRight ? -180 - inwards : inwards);

		const route: Point[] = [exit];
		const wanted: { near: Point; angle: number; size: number; card?: number; along?: boolean }[] =
			[];
		const nodesAt: Point[] = [];
		const last = () => route[route.length - 1];
		// Down to `y` at `x`, in a slight wave.
		const wave = Math.min(7, left - 4, text.x - left - 8);
		const down = (y: number, x = last().x) => {
			if (y - last().y > 70)
				route.push({ x: x + (route.length % 2 ? wave : -wave), y: (last().y + y) / 2 });
			const point = { x, y };
			route.push(point);
			return point;
		};
		// Across to `x`, at `y`, turning within `turn` px above and below it.
		const across = (y: number, x: number, turn = 40) => {
			const from = last();
			if (y - turn > from.y) down(y - turn);
			const side = Math.sign(x - from.x);
			route.push({ x: from.x + side * 50, y }, { x: x - side * 50, y }, { x, y: y + turn });
		};
		const offMargin = () => Math.abs(last().x - left) > 12;
		// A pair of leaves: one towards the page and, where the margin has room, one away from it.
		const pair = (point: Point) => {
			const onRight = point.x > width / 2;
			wanted.push({ near: point, angle: towardsPage(onRight), size: leafSize });
			if (left > 40)
				wanted.push({ near: point, angle: onRight ? -32 : -148, size: leafSize * 0.8 });
		};

		// The Hero: down by the ∞ until past the text when beside it, then to the left margin.
		const heroBox = place(heroSection);
		if (box.x > text.x + text.width / 2) {
			const y = Math.max(text.bottom, box.bottom) + 30;
			route.push(
				{ x: box.x + box.width * 0.08, y: y - 14 },
				{ x: text.x + text.width / 2, y },
				{ x: left + 40, y: y + 30 },
				{ x: left, y: Math.max(y + 110, heroBox.bottom) },
			);
		} else {
			route.push({ x: left + 40, y: box.bottom + 30 }, { x: left, y: box.bottom + 100 });
		}
		const heroEnd = last();

		let titleEnd: Point | null = null;
		let stepsEntry: Point | null = null;
		let stepsExit: Point | null = null;
		let purpleStretch: Point[] = [];
		let servicesPin: Pin | undefined;
		let stepsPin: Pin | undefined;
		for (const section of sections.slice(1, -1)) {
			const at = place(section);
			const first = place(section.firstElementChild ?? section);
			const pin = pins.find((p) => p.section === section);

			if (section.dataset.section === 'services') {
				const cards = [...section.querySelectorAll('[data-card]')].map(place);
				servicesPin = pin;
				if (pin) {
					// Pinned: beside the title, a leaf per card; once the cards have passed, under the title and down.
					const title = place(section.querySelector('h2')!.parentElement!);
					for (let k = 0; k < cards.length; k++) {
						const point = down(title.y + 8 + (k * (title.height - 8)) / (cards.length - 1));
						wanted.push({
							near: point,
							angle: k % 2 ? -150 : towardsPage(false),
							size: leafSize,
							card: k,
						});
					}
					titleEnd = last();
					const track = section.querySelector('[data-track]')!;
					// The gap between the title and the cards is narrow: the turns stay inside it.
					const [above, below] = [place(track.previousElementSibling!).bottom, place(track).y];
					across((above + below) / 2, right, Math.max((below - above) / 2 - 8, 4));
					down(at.y + pin.stageHeight - 20);
				} else {
					for (const y of new Set(cards.map((card) => card.y))) pair(down(y + 20));
				}
				continue;
			}

			if (section.dataset.section === 'steps') {
				// Along the stairs, with a node over each number, or down the margin beside them.
				stepsPin = pin;
				const heading = place(section.querySelector('h2')!);
				if (offMargin()) across((at.y + heading.y) / 2, left);
				stepsEntry = down(heading.bottom + 14, left);
				const numbers = [...section.querySelectorAll('[data-number]')].map(place);
				const inRow = numbers[1].y < numbers[0].y + numbers[0].height;
				nodeRadius = tight && !inRow ? 8 : 12;
				for (const number of numbers) {
					const node = inRow
						? { x: number.x + 8, y: number.y - 21 }
						: { x: left, y: number.y + 22 };
					if (inRow) route.push(node);
					else down(node.y);
					nodesAt.push(node);
				}
				// A leaf between each two Steps, towards the space under the title when they are in a row.
				for (let k = 1; k < nodesAt.length; k++) {
					const near = {
						x: (nodesAt[k - 1].x + nodesAt[k].x) / 2,
						y: (nodesAt[k - 1].y + nodesAt[k].y) / 2,
					};
					wanted.push(
						inRow
							? { near, angle: k % 2 ? -50 : -130, size: leafSize, along: true }
							: { near, angle: towardsPage(false), size: leafSize },
					);
				}
				if (inRow) {
					const lastNode = nodesAt[nodesAt.length - 1];
					stepsExit = { x: lastNode.x + 90, y: lastNode.y + 6 };
					route.push(stepsExit, { x: right, y: lastNode.y + 60 });
				}
				continue;
			}

			if (section.dataset.section === 'guarantee') {
				pair(down(first.y + 12));
				continue;
			}

			if (section.dataset.section === 'about') {
				// Purple only: half round the photo's arch, then down beside it, or the right margin if the text is below.
				const image = section.querySelector('img')!;
				const photo = place(image);
				const textBelow = place(image.nextElementSibling!).y > photo.y + photo.height / 2;
				const radius = photo.width / 2 + 16;
				const centreX = photo.x + photo.width / 2;
				const centreY = photo.y + photo.width / 2;
				// Down the margin first, so as not to drift towards the text above.
				down(centreY - radius);
				down(centreY, centreX - radius);
				const arch = last();
				for (let a = 1; a <= 12; a++) {
					const t = Math.PI + (a / 12) * Math.PI;
					route.push({ x: centreX + radius * Math.cos(t), y: centreY + radius * Math.sin(t) });
				}
				wanted.push({ near: { x: centreX, y: centreY - radius }, angle: -60, size: leafSize });
				const x = textBelow ? right : centreX + radius;
				const besideFrom = textBelow ? centreY + 60 : centreY;
				if (textBelow) route.push({ x, y: besideFrom });
				down(at.bottom - 30, x);
				wanted.push({
					near: { x, y: (besideFrom + photo.bottom) / 2 },
					angle: towardsPage(textBelow),
					size: leafSize,
				});
				purpleStretch = [arch, last()];
				continue;
			}

			// Back to the left margin in the space above the section, then a pair of leaves by its start.
			if (offMargin()) across(at.y, left);
			pair(down(first.y + 12));
		}

		// The end: 3 leaves beside the final button.
		const final = sections[sections.length - 1];
		const button = place(final.querySelector('a')!);
		if (offMargin()) across(place(final).y, left);
		const end = down(button.y + button.height / 2);
		const [up, forwards, back] = tight ? [-60, -95, -130] : [-70, -15, -125];
		wanted.push(
			{ near: end, angle: up, size: leafSize * 1.2 },
			{ near: end, angle: forwards, size: leafSize },
			{ near: end, angle: back, size: leafSize * 0.85 },
		);

		samples = sampled(route);
		total = samples[samples.length - 1].length;
		resting = samples.filter((s) => s.length < JOINT).map(({ x, y }) => ({ x, y }));
		hero = { length: lengthAt(heroEnd), endY: heroEnd.y, topScroll: -(origin.top + scrollY) };
		leaves = wanted.map(({ near, angle, size, card, along }) => {
			const length = lengthAt(near);
			return {
				...pointAt(length),
				length,
				angle: along ? angleAt(length) + angle : angle,
				size,
				card,
			};
		});
		// Two leaves along the Hero's stretch.
		for (const [share, turn] of [
			[0.35, -40],
			[0.7, 40],
		]) {
			const length = hero.length * share;
			leaves.push({ ...pointAt(length), length, angle: angleAt(length) + turn, size: leafSize });
		}
		nodes = nodesAt.map((node) => ({ ...node, length: lengthAt(node) }));
		purpleOnly = purpleStretch.length
			? { from: lengthAt(purpleStretch[0]), to: lengthAt(purpleStretch[1]) }
			: { from: Infinity, to: -1 };

		services =
			servicesPin && titleEnd
				? {
						pin: servicesPin,
						length: lengthAt(titleEnd),
						cardCount: leaves.filter((l) => l.card !== undefined).length,
					}
				: null;
		steps =
			stepsPin && stepsEntry && stepsExit
				? {
						pin: stepsPin,
						marks: [
							[0, lengthAt(stepsEntry)],
							...nodes.map(
								(node, k) => [(k + 0.5) / nodes.length, node.length] as [number, number],
							),
							[1, lengthAt(stepsExit)],
						],
					}
				: null;

		const spacing = narrow ? 11 : 9;
		const count = Math.ceil(total / spacing);
		points = {
			offset: Float32Array.from({ length: count }, () => (Math.random() - 0.5) * 7),
			phase: Float32Array.from({ length: count }, () => Math.random() * TAU),
			green: Uint8Array.from({ length: count }, () => (Math.random() < 0.2 ? 1 : 0)),
			spacing,
		};
	}

	/** In the pinned Steps, the branch reaches one Step at a time: linear between the entry, each node and the exit. */
	function alongSteps(p: number) {
		const marks = steps!.marks;
		for (let i = 1; i < marks.length; i++) {
			const [[p0, l0], [p1, l1]] = [marks[i - 1], marks[i]];
			if (p <= p1) return l0 + ((p - p0) / (p1 - p0 || 1)) * (l1 - l0);
		}
		return marks[marks.length - 1][1];
	}

	/** How far the branch should have grown at the current scroll: whole at the bottom of the page. */
	function target(screenHeight: number, atBottom: boolean) {
		if (atBottom) return total;
		const scroll = -main.getBoundingClientRect().top;
		const line = virtual(scroll) + screenHeight * GROWTH_LINE;
		let length = 0;
		for (const sample of samples) {
			if (sample.y <= line) length = sample.length;
			else if (sample.y > line + 160) break;
		}
		// The pinned Services hold it beside the title until the cards have passed.
		if (services && scroll < services.pin.start + services.pin.travel)
			length = Math.min(length, services.length);
		if (steps && scroll < steps.pin.start + steps.pin.travel)
			length = Math.min(length, alongSteps(progress(scroll, steps.pin)));
		// At the top only the ∞: the Hero's stretch grows with the first scroll, up to where the growth line takes over.
		const reach = Math.max(
			hero.endY - screenHeight * GROWTH_LINE - hero.topScroll,
			screenHeight * 0.25,
		);
		const fromTop = scroll - hero.topScroll;
		if (fromTop < reach) length = Math.min(length, (hero.length * Math.max(fromTop, 0)) / reach);
		return length;
	}

	/** Draws the branch as far as it has grown; true if any of it is on screen. */
	function draw(context: CanvasRenderingContext2D, frame: Frame) {
		const { length, ratio, time, flow } = frame;
		const { left, top: mainTop } = main.getBoundingClientRect();
		const scroll = virtual(-mainTop);
		if (frame.exit && resting.length) {
			const dx = frame.exit.x - left - restingExit.x;
			const dy = frame.exit.y + scroll - restingExit.y;
			for (let i = 0; i < resting.length; i++) {
				const k = 1 - samples[i].length / JOINT;
				samples[i].x = resting[i].x + dx * k;
				samples[i].y = resting[i].y + dy * k;
			}
		}
		context.setTransform(ratio, 0, 0, ratio, left * ratio, -scroll * ratio);
		const [top, bottom] = [scroll - 40, scroll + frame.screenHeight + 40];
		const seen = (y: number) => y > top && y < bottom;

		// A thin line, and points that flow along it in a helix.
		context.globalCompositeOperation = 'source-over';
		context.globalAlpha = 0.28;
		context.strokeStyle = style.purpleLine;
		context.lineWidth = 1.2;
		context.beginPath();
		let drawing = false;
		let [shortest, longest] = [Infinity, -1];
		for (const sample of samples) {
			if (sample.length > length) break;
			if (!seen(sample.y)) {
				drawing = false;
				continue;
			}
			if (drawing) context.lineTo(sample.x, sample.y);
			else context.moveTo(sample.x, sample.y);
			drawing = true;
			shortest = Math.min(shortest, sample.length);
			longest = sample.length;
		}
		if (length > 0 && drawing) {
			const tip = pointAt(length);
			context.lineTo(tip.x, tip.y);
		}
		context.stroke();
		if (longest < 0) return false;

		context.globalCompositeOperation = 'lighter';
		const { offset, phase, green, spacing } = points;
		const count = offset.length;
		const end = Math.min(longest + spacing, length);
		for (
			let s = shortest - ((((shortest - flow) % spacing) + spacing) % spacing);
			s <= end;
			s += spacing
		) {
			if (s < 0) continue;
			const i = ((Math.round((s - flow) / spacing) % count) + count) % count;
			const point = pointAt(s);
			if (!seen(point.y)) continue;
			const angle = phase[i] + s * 0.045 + time * 1.4;
			const depth = Math.sin(angle);
			const away = offset[i] * Math.cos(angle);
			const size = (3 + depth) * (narrow ? 0.85 : 1);
			const purpleHere = s > purpleOnly.from && s < purpleOnly.to;
			context.globalAlpha = (0.55 + depth * 0.35) * Math.min(s / 40, 1);
			context.drawImage(
				green[i] && !purpleHere ? style.green : style.purple,
				point.x - direction.y * away - size,
				point.y + direction.x * away - size,
				size * 2,
				size * 2,
			);
		}

		// A brighter purple node over each Step, once the branch gets there.
		for (const node of nodes) {
			if (node.length > length || !seen(node.y)) continue;
			const glow = (Math.min((length - node.length) / 30, 1) * nodeRadius) / 12;
			context.globalAlpha = 0.95;
			context.drawImage(style.purple, node.x - 12 * glow, node.y - 12 * glow, 24 * glow, 24 * glow);
			context.drawImage(style.white, node.x - 3.5 * glow, node.y - 3.5 * glow, 7 * glow, 7 * glow);
		}

		// The leaves grow as the tip passes them; in the pinned Services, as their card arrives.
		const cardsPassed = services ? progress(-mainTop, services.pin) * (services.cardCount - 1) : 0;
		for (const leaf of leaves) {
			if (leaf.length > length || !seen(leaf.y)) continue;
			let grown = length >= total - 0.5 ? 1 : Math.min((length - leaf.length) / 60, 1);
			if (leaf.card !== undefined && services)
				grown = Math.min(Math.max((cardsPassed - leaf.card) * 2 + 1, 0), 1);
			if (grown > 0) drawLeaf(context, leaf, 1 - (1 - grown) ** 2, time);
		}

		// The tip, while it grows.
		if (length > 0 && length < total - 1) {
			const tip = pointAt(length);
			context.globalAlpha = 0.9;
			const [r, core] = [tipRadius, tipRadius / 3];
			context.drawImage(style.green, tip.x - r, tip.y - r, r * 2, r * 2);
			context.drawImage(style.white, tip.x - core, tip.y - core, core * 2, core * 2);
		}
		return true;
	}

	/** A leaf of green points, `grown` from 0 to 1, swaying a little. */
	function drawLeaf(context: CanvasRenderingContext2D, leaf: Leaf, grown: number, time: number) {
		const length = leaf.size * grown;
		const width = length * 0.32;
		const sway = Math.sin(time * 1.3 + leaf.length * 0.01) * 5;
		context.save();
		context.translate(leaf.x, leaf.y);
		context.rotate(((leaf.angle + sway) * Math.PI) / 180);
		context.globalCompositeOperation = 'source-over';
		context.globalAlpha = 0.16;
		context.fillStyle = style.greenLine;
		context.beginPath();
		context.moveTo(0, 0);
		context.quadraticCurveTo(length / 2, -width * 1.4, length, 0);
		context.quadraticCurveTo(length / 2, width * 1.4, 0, 0);
		context.fill();
		context.globalCompositeOperation = 'lighter';
		const dots = length > 20 ? 7 : 4;
		const size = length > 20 ? 2.4 : 1.8;
		for (let k = 1; k <= dots; k++) {
			const u = k / (dots + 1);
			const x = u * length;
			const y = width * Math.sin(Math.PI * u) ** 0.8;
			context.globalAlpha = 0.8;
			context.drawImage(style.green, x - size, -y - size, size * 2, size * 2);
			context.drawImage(style.green, x - size, y - size, size * 2, size * 2);
			if (k % 2) {
				context.globalAlpha = 0.45;
				context.drawImage(style.green, x - size * 0.8, -size * 0.8, size * 1.6, size * 1.6);
			}
		}
		context.globalAlpha = 0.9;
		context.drawImage(style.green, length - 2.5, -2.5, 5, 5);
		context.restore();
	}

	return {
		layOut,
		target,
		draw,
		get total() {
			return total;
		},
	};
}

/** A smooth curve through the points (Catmull-Rom, tangents capped), sampled with the length along it. */
function sampled(points: Point[]) {
	const tangent = (a: Point, c: Point, max: number) => {
		const [x, y] = [(c.x - a.x) / 6, (c.y - a.y) / 6];
		const k = Math.min(1, max / (Math.hypot(x, y) || 1));
		return { x: x * k, y: y * k };
	};
	const samples: Sample[] = [{ ...points[0], length: 0 }];
	for (let i = 0; i < points.length - 1; i++) {
		const [b, c] = [points[i], points[i + 1]];
		const max = Math.hypot(c.x - b.x, c.y - b.y) / 3;
		const t1 = tangent(points[i - 1] ?? b, c, max);
		const t2 = tangent(b, points[i + 2] ?? c, max);
		const [c1, c2] = [
			{ x: b.x + t1.x, y: b.y + t1.y },
			{ x: c.x - t2.x, y: c.y - t2.y },
		];
		for (let k = 1; k <= 16; k++) {
			const t = k / 16;
			const u = 1 - t;
			const x = u * u * u * b.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * c.x;
			const y = u * u * u * b.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * c.y;
			const previous = samples[samples.length - 1];
			samples.push({ x, y, length: previous.length + Math.hypot(x - previous.x, y - previous.y) });
		}
	}
	return samples;
}
