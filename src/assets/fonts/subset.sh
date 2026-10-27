#!/usr/bin/env bash
# Gera os 2 woff2 do site a partir das fontes completas do repositório google/fonts.
# Só é preciso voltar a correr para mudar de versão das fontes ou de caracteres.
# Precisa do fontTools: pip install fonttools brotli
#
# Porquê um subconjunto próprio e não o ficheiro `latin` (#60):
# o ficheiro `latin` não tem o espaço fino inseparável (U+202F), o ≥, o ≤ nem as setas ← →.
# As fontes completas têm-nos, menos a Geist, que não tem o U+202F: no texto em Geist,
# esse espaço vem da fonte de recurso. Os ficheiros ficam um pouco mais leves do que os `latin`.
set -euo pipefail

# A versão das fontes: um commit fixo do google/fonts, para o resultado ser sempre o mesmo.
COMMIT=45e3d5269e4a17d823f6d84470bc084dc5ae46f6
ORIGEM="https://raw.githubusercontent.com/google/fonts/$COMMIT/ofl"

# Francês, inglês e português, mais a pontuação e os símbolos que a página usa:
# « » · ½ º ª (no bloco U+00A0–00FF), œ, aspas, travessões, …, U+2009, U+202F, €, ™, ← →, −, ≤ ≥.
CARACTERES="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+0178,U+02C6,U+02DA,U+02DC,U+2009,\
U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+202F,U+2039-203A,U+20AC,U+2122,\
U+2190,U+2192,U+2212,U+2264-2265"

PASTA="$(cd "$(dirname "$0")" && pwd)"
TEMP="$(mktemp -d)"
trap 'rm -rf "$TEMP"' EXIT

curl -fsSL -o "$TEMP/bona-nova.ttf" "$ORIGEM/bonanova/BonaNova-Regular.ttf"
curl -fsSL -o "$TEMP/geist.ttf" "$ORIGEM/geist/Geist%5Bwght%5D.ttf"
curl -fsSL -o "$PASTA/OFL-bona-nova.txt" "$ORIGEM/bonanova/OFL.txt"
curl -fsSL -o "$PASTA/OFL-geist.txt" "$ORIGEM/geist/OFL.txt"

# Mantém todos os nomes da fonte, incluindo o copyright e a licença (OFL), que viajam com o ficheiro.
for fonte in bona-nova geist; do
	pyftsubset "$TEMP/$fonte.ttf" \
		--unicodes="$CARACTERES" \
		--layout-features+=tnum,lnum,case \
		--name-IDs='*' \
		--flavor=woff2 \
		--output-file="$PASTA/$fonte.woff2"
done

ls -l "$PASTA"/*.woff2
