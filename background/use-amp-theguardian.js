"use strict";
/* It is sad, but the AMP version is actually more useable
   and less cluttered even (or because?) JS is disabled */
(function() {
function redirectAMPGuardian(e) {
	return {redirectUrl: 'https://amp.theguardian.com/' + e.url.substr(e.url.indexOf('/', 8) + 1) };
}
browser.webRequest.onBeforeRequest.addListener(
		redirectAMPGuardian, {urls: [ '*://www.theguardian.com/*' ], types: ['main_frame'] }, ["blocking"]
);
})();
