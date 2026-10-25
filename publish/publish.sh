#!/usr/bin/env bash
# A Publicação: envia o dist/ para a pasta-alvo na Infomaniak, por SFTP, em três passagens,
# para que nenhum Visitante veja o site publicado a meio:
#   1. _astro/: o CSS e o JS têm o hash no nome, por isso os novos não substituem nenhum;
#   2. o HTML e o resto, que já encontram no servidor os ficheiros de _astro/ de que precisam;
#   3. as remoções: tudo o que já não está no dist, incluindo os _astro/ antigos.
# Cada Publicação reenvia tudo (--transfer-all): o lftp não compara o conteúdo dos ficheiros.
# Cada ficheiro vai primeiro para um nome temporário (.in.*) e só depois toma o lugar do antigo.
# Como o SFTP não muda o nome por cima de um ficheiro, o lftp apaga o antigo logo antes:
# o ficheiro falta só durante esse pedido, e não durante o envio todo.
#
# Lê do ambiente os 3 secrets: PUBLICACAO_CHAVE_SSH, PUBLICACAO_SERVIDOR e PUBLICACAO_UTILIZADOR.
# Só liga se a chave do servidor for a que está em known_hosts, nesta pasta.
set -euo pipefail

# A pasta do site, tal como a conta FTP + SSH a vê. A confirmar no primeiro login (#57).
# Nunca a raiz do alojamento: a passagem 3 apagaria tudo o resto, incluindo a chave da CI.
PASTA_ALVO=sites/devops.julienlaffont.com

aqui=$(dirname "$(realpath "$0")")
cd "$aqui/.."

case $PASTA_ALVO in
'' | . | ./ | /)
	echo "::error::PASTA_ALVO não pode ser a raiz do alojamento." >&2
	exit 1
	;;
esac
if ! grep -q '^[^#]' "$aqui/known_hosts"; then
	echo "::error::Falta a chave do servidor em publish/known_hosts (#57)." >&2
	exit 1
fi

chave=$(mktemp)
trap 'rm -f "$chave"' EXIT
printf '%s\n' "$PUBLICACAO_CHAVE_SSH" | tr -d '\r' >"$chave"

ligacao="ssh -a -x -i $chave -o IdentitiesOnly=yes -o BatchMode=yes"
ligacao+=" -o StrictHostKeyChecking=yes -o UserKnownHostsFile=$aqui/known_hosts"
enviar='mirror --reverse --transfer-all --verbose'

# Poucas tentativas: a Infomaniak bane o IP depois de vários logins falhados.
lftp <<FIM
set cmd:fail-exit yes
set net:max-retries 2
set net:reconnect-interval-base 5
set net:timeout 30
set xfer:use-temp-file yes
set sftp:connect-program "$ligacao"
open --user "$PUBLICACAO_UTILIZADOR" --password "" "sftp://$PUBLICACAO_SERVIDOR"
$enviar dist/_astro $PASTA_ALVO/_astro
$enviar --exclude ^_astro/ dist $PASTA_ALVO
mirror --reverse --delete --only-missing --verbose dist $PASTA_ALVO
FIM
