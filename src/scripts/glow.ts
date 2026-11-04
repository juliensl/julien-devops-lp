/** A glowing point, white at the centre, drawn once per color. The color is `#rrggbb`, as the fixed
    colors are written in global.css. */
export function glow(color: string) {
	const sprite = document.createElement('canvas');
	sprite.width = sprite.height = 64;
	const context = sprite.getContext('2d')!;
	const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16));
	const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
	gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
	gradient.addColorStop(0.16, `rgba(${r}, ${g}, ${b}, 1)`);
	gradient.addColorStop(0.42, `rgba(${r}, ${g}, ${b}, 0.28)`);
	gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
	context.fillStyle = gradient;
	context.fillRect(0, 0, 64, 64);
	return sprite;
}
