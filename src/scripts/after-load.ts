// The page's JavaScript starts after the page has loaded (#54, "Animações e JavaScript").

/** Runs `start` when the page finishes loading, or right away if it already has. */
export function afterLoad(start: () => void) {
	if (document.readyState === 'complete') start();
	else addEventListener('load', start, { once: true });
}
