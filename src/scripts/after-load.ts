// O JavaScript da página arranca depois do carregamento (#54, «Animações e JavaScript»).

/** Corre `arranque` quando a página acabar de carregar, ou já, se já acabou. */
export function afterLoad(start: () => void) {
	if (document.readyState === 'complete') start();
	else addEventListener('load', start, { once: true });
}
