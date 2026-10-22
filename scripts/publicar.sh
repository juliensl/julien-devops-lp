#!/usr/bin/env bash
# A Publicação: envia o build para a pasta-alvo no alojamento da Infomaniak, por SFTP,
# em três passos, para que nenhum Visitante veja o site publicado a meio:
#   1. _astro/: o CSS, o JS e as imagens têm o hash no nome, por isso não substituem nada;
#   2. o HTML e o resto, que já encontram no servidor os ficheiros de _astro/ de que precisam;
#   3. as remoções: tudo o que já não está no build, incluindo os _astro/ antigos.
# Cada Publicação reenvia tudo (--transfer-all), sem comparar datas nem tamanhos.
# Cada ficheiro vai primeiro para um nome temporário e só depois substitui o antigo.
#
# Uso: scripts/publicar.sh <pasta do build>
# Lê do ambiente os 3 secrets (CHAVE_PRIVADA, SERVIDOR e UTILIZADOR) e, do workflow,
# PASTA_ALVO e KNOWN_HOSTS. A ligação só se faz se a chave do servidor for a de KNOWN_HOSTS.
set -euo pipefail

dist=${1%/}

ssh_dir=$(mktemp -d)
trap 'rm -rf "$ssh_dir"' EXIT
printf '%s\n' "$CHAVE_PRIVADA" | tr -d '\r' >"$ssh_dir/chave"
chmod 600 "$ssh_dir/chave"
printf '%s\n' "$KNOWN_HOSTS" >"$ssh_dir/known_hosts"

ssh="ssh -a -x -i $ssh_dir/chave -o IdentitiesOnly=yes -o BatchMode=yes"
ssh+=" -o StrictHostKeyChecking=yes -o UserKnownHostsFile=$ssh_dir/known_hosts"
enviar="mirror --reverse --transfer-all --no-perms --parallel=4 --verbose"

lftp <<FIM
set cmd:fail-exit yes
set net:max-retries 3
set net:reconnect-interval-base 5
set net:timeout 30
set xfer:use-temp-file yes
set sftp:connect-program "$ssh"
open --user "$UTILIZADOR" --password "" "sftp://$SERVIDOR"
$enviar "$dist/_astro" "$PASTA_ALVO/_astro"
$enviar --exclude ^_astro/ "$dist" "$PASTA_ALVO"
mirror --reverse --delete --only-missing --verbose "$dist" "$PASTA_ALVO"
FIM
