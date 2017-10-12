#!/bin/sh
# Autogenerates a clearnet-to-onion redirect file with all domains
# listed at the time of generation
set -e

BASE="$(basename "$0" '.sh')"
DIR="$(dirname "$0")"
FILE="${DIR}/${BASE}.js"
URL="https://${BASE}/"
URL_PARSE='url_parse_weasel'

case "$BASE" in
'onion.debian.org')
	MATCHES="['*://*.debian.org/*', '*://*.debian.net/*']"
	;;
'onion.torproject.org')
	MATCHES="['*://*.torproject.org/*', '*://www.onion-router.net/*']"
	;;
'onion.riseup.net')
	URL='https://riseup.net/security/network-security/tor/hs-addresses-signed.txt'
	URL_PARSE='url_parse_riseup_txt'
	MATCHES="['*://*.riseup.net/*', '*://0xacab.org/*']"
	;;
*)
	echo "ERROR: Unsupported domain $BASE"
	exit 1
esac

if [ -e "${FILE}" -a ! -e "${FILE}.old" ]; then
	mv "${FILE}" "${FILE}.old"
fi

url_parse_weasel() {
	GET "$1" | hxnormalize -x -l 100000 | \
		hxselect -i ul li -c | hxpipe | sed -n 's/^-//p' | paste - - - | \
		sed -n 's#^\([^ ]\+\)\s\+:\s\+\([^ ]\+\)$#	"\1": "\2",#p'
}
url_parse_riseup_txt() {
	GET "$1" | \
		sed -n 's#^\([^: ]\+\):\?\s\+\([^.]\+\.onion\) (port.*$#	"\1": "http://\2/",#p'
}

cat >"${FILE}" <<EOF
"use strict";
/* redirect all domains listed on $DOMAIN to their onion addresses */
(function() {
const onionRedirects = {
$("$URL_PARSE" "$URL")
};
function redirectOnion(e) {
	const parts = e.url.split('/', 4);
	if (onionRedirects.hasOwnProperty(parts[2]))
		return {redirectUrl: onionRedirects[parts[2]] + e.url.substr(e.url.indexOf('/', 8) + 1) };
}
browser.webRequest.onBeforeRequest.addListener(
		redirectOnion, {urls: $MATCHES }, ['blocking']
);
})();
EOF

if [ -e "${FILE}.old" ]; then
	diff -u "${FILE}.old" "${FILE}" || true
fi
