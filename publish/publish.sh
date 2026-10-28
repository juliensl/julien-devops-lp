#!/usr/bin/env bash
# Publishing: sends dist/ to the target folder at Infomaniak, over SFTP, in three passes,
# so that no Visitor sees the published site halfway:
#   1. _astro/: the CSS and JS have the hash in their name, so the new ones replace none;
#   2. the HTML and the rest, which already find on the server the _astro/ files they need;
#   3. the deletions: everything no longer in dist, including the old _astro/ files.
# Each Publishing resends everything (--transfer-all): lftp does not compare file contents.
# Each file first goes to a temporary name (.in.*) and only then takes the old one's place.
# Since SFTP does not rename over a file, lftp deletes the old one just before:
# the file is missing only during that request, not during the whole upload.
#
# Reads the 3 secrets from the environment: PUBLISH_SSH_KEY, PUBLISH_SERVER and PUBLISH_USER.
# Only connects if the server key is the one in known_hosts, in this folder.
set -euo pipefail

# The site folder, as the FTP + SSH account sees it. The login starts at the hosting root (#57).
# Never the hosting root: pass 3 would delete everything else, including the CI key.
TARGET_DIR=sites/devops.julienlaffont.com

here=$(dirname "$(realpath "$0")")
cd "$here/.."

case $TARGET_DIR in
'' | . | ./ | /)
	echo "::error::TARGET_DIR cannot be the hosting root." >&2
	exit 1
	;;
esac
if ! grep -q '^[^#]' "$here/known_hosts"; then
	echo "::error::The server key is missing from publish/known_hosts (#57)." >&2
	exit 1
fi

key=$(mktemp)
trap 'rm -f "$key"' EXIT
printf '%s\n' "$PUBLISH_SSH_KEY" | tr -d '\r' >"$key"

connection="ssh -a -x -i $key -o IdentitiesOnly=yes -o BatchMode=yes"
connection+=" -o StrictHostKeyChecking=yes -o UserKnownHostsFile=$here/known_hosts"
upload='mirror --reverse --transfer-all --verbose'

# Few retries: Infomaniak bans the IP after several failed logins.
lftp <<EOF_LFTP
set cmd:fail-exit yes
set net:max-retries 2
set net:reconnect-interval-base 5
set net:timeout 30
set xfer:use-temp-file yes
set sftp:connect-program "$connection"
open --user "$PUBLISH_USER" --password "" "sftp://$PUBLISH_SERVER"
$upload dist/_astro $TARGET_DIR/_astro
$upload --exclude ^_astro/ dist $TARGET_DIR
mirror --reverse --delete --only-missing --verbose dist $TARGET_DIR
EOF_LFTP
