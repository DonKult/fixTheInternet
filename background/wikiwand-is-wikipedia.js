"use strict";
/* wikiwand is an empty page without JS, lets just use the source */
(function() {
function redirectWikipedia(e) {
	const parts = e.url.split('/', 5);
	console.log("wikiwand", parts);
	if (parts.length < 5)
		return {};
	return {redirectUrl: 'https://' + parts[3] + '.wikipedia.org/wiki/' + parts[4] };
}
browser.webRequest.onBeforeRequest.addListener(
		redirectWikipedia, {urls: [ '*://wikiwand.com/*', '*://*.wikiwand.com/*' ], types: ['main_frame'] }, ["blocking"]
);
})();
