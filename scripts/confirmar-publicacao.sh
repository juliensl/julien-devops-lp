#!/usr/bin/env bash
# A confirmação depois da Publicação: cada página do build responde 200 no site
# e tem a meta tag com o commit publicado. Se não, sai com erro e o job fica vermelho.
#
# Uso: scripts/confirmar-publicacao.sh <pasta do build> <URL do site> <commit>
#   scripts/confirmar-publicacao.sh dist https://julienlaffont.com "$GITHUB_SHA"
set -euo pipefail

dist=$1
site=${2%/}
commit=$3

corpo=$(mktemp)
trap 'rm -f "$corpo"' EXIT
falhas=0

# Pede um caminho ao site, como um Visitante: guarda o corpo e escreve o estado HTTP.
pedir() {
	curl --silent --show-error --max-time 30 --retry 2 \
		--output "$corpo" --write-out '%{http_code}' "$site$1" || true
}

tem_o_commit() {
	grep --quiet --fixed-strings "<meta name=\"commit\" content=\"$commit\">" "$corpo"
}

falha() {
	echo "✗ $1"
	falhas=$((falhas + 1))
}

# As páginas do build: pt/index.html → /pt/, 404.html → /404.html.
paginas=$(cd "$dist" && find . -name '*.html' | sed -E 's#^\./##; s#(^|/)index\.html$#\1#; s#^#/#' | sort)

for caminho in $paginas; do
	estado=$(pedir "$caminho")
	if [[ $estado != 200 ]]; then
		falha "$caminho respondeu $estado"
	elif ! tem_o_commit; then
		falha "$caminho não tem o commit $commit"
	else
		echo "✓ $caminho"
	fi
done

# Sem index.html na raiz (antes do Lançamento comercial), / dá a página 404.
# O Apache responderia 403 se o .htaccess não o evitasse.
if [[ ! -f $dist/index.html ]]; then
	estado=$(pedir /)
	if [[ $estado != 404 ]]; then
		falha "/ respondeu $estado, e não 404"
	elif [[ -f $dist/404.html ]] && ! tem_o_commit; then
		falha "/ respondeu 404, mas não com a página 404 do commit $commit"
	else
		echo "✓ / responde 404"
	fi
fi

if ((falhas > 0)); then
	echo "A Publicação não se confirma: $falhas falha(s)."
	exit 1
fi
echo "Publicação confirmada: commit $commit."
