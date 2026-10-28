#!/usr/bin/env bash
# Generates the site's 2 woff2 files from the full fonts in the google/fonts repository.
# Only needs to run again to change the font version or the characters.
# Needs fontTools: pip install fonttools brotli
#
# Why our own subset and not the `latin` file (#60):
# the `latin` file lacks the narrow no-break space (U+202F), ≥, ≤ and the arrows ← →.
# The full fonts have them, except Geist, which lacks U+202F: in Geist text,
# that space comes from the fallback font. The files end up slightly lighter than the `latin` ones.
set -euo pipefail

# The font version: a fixed google/fonts commit, so the result is always the same.
COMMIT=45e3d5269e4a17d823f6d84470bc084dc5ae46f6
SOURCE="https://raw.githubusercontent.com/google/fonts/$COMMIT/ofl"

# French, English and Portuguese, plus the punctuation and symbols the page uses:
# « » · ½ º ª (in the U+00A0–00FF block), œ, quotes, dashes, …, U+2009, U+202F, €, ™, ← →, −, ≤ ≥.
CHARACTERS="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+0178,U+02C6,U+02DA,U+02DC,U+2009,\
U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+202F,U+2039-203A,U+20AC,U+2122,\
U+2190,U+2192,U+2212,U+2264-2265"

DIR="$(cd "$(dirname "$0")" && pwd)"
TEMP="$(mktemp -d)"
trap 'rm -rf "$TEMP"' EXIT

curl -fsSL -o "$TEMP/bona-nova.ttf" "$SOURCE/bonanova/BonaNova-Regular.ttf"
curl -fsSL -o "$TEMP/geist.ttf" "$SOURCE/geist/Geist%5Bwght%5D.ttf"
curl -fsSL -o "$DIR/OFL-bona-nova.txt" "$SOURCE/bonanova/OFL.txt"
curl -fsSL -o "$DIR/OFL-geist.txt" "$SOURCE/geist/OFL.txt"

# Keeps all the font names, including the copyright and the licence (OFL), which travel with the file.
for font in bona-nova geist; do
	pyftsubset "$TEMP/$font.ttf" \
		--unicodes="$CHARACTERS" \
		--layout-features+=tnum,lnum,case \
		--name-IDs='*' \
		--flavor=woff2 \
		--output-file="$DIR/$font.woff2"
done

ls -l "$DIR"/*.woff2
