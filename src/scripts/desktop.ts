// "Desktop" in the spec (#54, "Página principal"): wider than 960 px and no reduced motion. There,
// the Services and the Steps stay pinned while the page scrolls. The `min-[961px]:` classes use the
// same width.
export const DESKTOP = '(min-width: 961px) and (prefers-reduced-motion: no-preference)';
