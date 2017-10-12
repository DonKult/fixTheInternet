"use strict";
/* Click-tracking? No thanks */
(function() {
function skipOutgoingRedirectorFromMozilla(e) {
	const start_newurl = e.url.indexOf('/http');
	if (start_newurl === -1)
		return {};
	return {redirectUrl: decodeURIComponent(e.url.substr(start_newurl + 1))};
}
browser.webRequest.onBeforeRequest.addListener(
	skipOutgoingRedirectorFromMozilla, {urls: ['https://outgoing.prod.mozaws.net/*']}, ["blocking"]
);
})();
