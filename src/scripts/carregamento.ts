// Todo o JavaScript da página arranca depois do carregamento (#54, «Animações e JavaScript»).

/** Corre `arranque` quando a página acabar de carregar, ou já, se já acabou. */
export function depoisDoCarregamento(arranque: () => void) {
	if (document.readyState === 'complete') arranque();
	else addEventListener('load', arranque, { once: true });
}
