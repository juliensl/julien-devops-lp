// The dotted ∞ of the Hero and of the logo: its curve, how its points stray from it, its projection and colours.

export type Point = [x: number, y: number, z: number];

/** A lemniscate of Bernoulli with depth: its two loops cross at different heights. */
export function curve(t: number): Point {
	const sin = Math.sin(t);
	const cos = Math.cos(t);
	const d = 1 + sin * sin;
	return [cos / d, (sin * cos) / d, 0.3 * sin];
}

/** The point at `t` on the curve, moved `radius` off it, at `angle` around it. */
export function strayed(t: number, radius: number, angle: number): Point {
	const [x, y, z] = curve(t);
	const ahead = curve(t + 0.002);
	// The tangent, and two normals to move the point off the curve.
	const length = Math.hypot(ahead[0] - x, ahead[1] - y, ahead[2] - z) || 1;
	const [tx, ty, tz] = [(ahead[0] - x) / length, (ahead[1] - y) / length, (ahead[2] - z) / length];
	const flat = Math.hypot(tx, ty) || 1;
	const [nx, ny] = [-ty / flat, tx / flat];
	const along = Math.cos(angle) * radius;
	const across = Math.sin(angle) * radius;
	return [
		x + along * nx - across * tz * ny,
		y + along * ny + across * tz * nx,
		z + across * (tx * ny - ty * nx),
	];
}

/** Turns a point around the vertical axis, then the horizontal one, with perspective. */
export function projected([x, y, z]: Point, pitch: number, yaw: number) {
	const turnedX = x * Math.cos(yaw) + z * Math.sin(yaw);
	const turnedZ = -x * Math.sin(yaw) + z * Math.cos(yaw);
	const tiltedY = y * Math.cos(pitch) - turnedZ * Math.sin(pitch);
	const depth = y * Math.sin(pitch) + turnedZ * Math.cos(pitch);
	const perspective = 3 / (3 - depth);
	return { x: turnedX * perspective, y: tiltedY * perspective, depth, perspective };
}

/** How bright a point is: the far side of the ∞ is dimmer. */
export function nearness(depth: number) {
	return Math.min(Math.max(0.3 + (depth + 1.2) * 0.32, 0.2), 1);
}

/** How much of a point at `t` is green: the left loop is purple, the right one green, blended across the middle. */
export function greenShare(t: number) {
	return Math.min(Math.max((curve(t)[0] + 0.12) / 0.24, 0), 1);
}
