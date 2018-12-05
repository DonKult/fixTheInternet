"use strict";
/* Mobile wikipedia is a nice read as it is cleaner by default,
   but uses more JS and so on. As the content is the same, we just
   redirect to the non-mobile Wikipedia. That could easily be reversed,
   so that e.g. reddit communities wouldn't be littered by bots posting
   this link (or the other) in comments all the time… */
(function() {
function redirectWikipedia(e) {
	const parts = e.url.split('/', 4);
	if (onionRedirects.hasOwnProperty(parts[2]) === false)
		return;
	const dots = parts[2].split('.', 2);
	return {redirectUrl: 'https://' + dots[0] + '.wikipedia.org/' + e.url.substr(e.url.indexOf('/', 8) + 1) };
}
browser.webRequest.onBeforeRequest.addListener(
		redirectWikipedia, {urls: [ '*://*.m.wikipedia.org/*' ], types: ['main_frame'] }, ["blocking"]
);
})();
