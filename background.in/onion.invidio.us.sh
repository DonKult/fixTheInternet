#!/bin/sh
# Autogenerates a redirect file with all instances listed at the time of generation
# redirected to a single choosen instance
set -e

# endpoint given on https://github.com/iv-org/invidious/wiki/Invidious-Instances
URL='https://instances.invidio.us/instances.json'
MYCHOICE='4l2dgddgsrkf2ous66i6seeyi6etzfgrue332grh2n7madpwopotugyd.onion'

BASE="$(basename "$0" '.sh')"
DIR="$(dirname "$0")"
FILE="${DIR}/${BASE}.js"

if [ -e "${FILE}" -a ! -e "${FILE}.old" ]; then
	mv "${FILE}" "${FILE}.old"
fi

get_instances_list() {
	GET "$1" | \
		jq -r '.[][1].uri' | sed -e 's#^https\?://##' -e 's#/\+##'
}
INSTANCES="$(get_instances_list "$URL")"
if ! echo "$INSTANCES" | grep -q "^$MYCHOICE\$"; then
	echo "ERROR: Choosen instance is not in the list of instances for $FILE"
	exit 100
fi

cat >"${FILE}" <<EOF
"use strict";
/* redirect all instances listed on $URL to a single instance */
(function() {
function redirectToInstance(e) {
	return {redirectUrl: "http://${MYCHOICE}/" + e.url.substr(e.url.indexOf('/', 8) + 1) };
}
browser.webRequest.onBeforeRequest.addListener(
		redirectToInstance, {urls: [
$(echo "$INSTANCES" | grep -v "^$MYCHOICE\$" | sed -e 's#^#			"*://#' -e 's#$#/*",#')
		] }, ['blocking']
);
})();
EOF

if [ -e "${FILE}.old" ]; then
	diff -u "${FILE}.old" "${FILE}" || true
fi
