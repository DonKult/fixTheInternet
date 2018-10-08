"use strict";
/* Poor man's https-everywhere: Should work on pushing them upstream */
(function() {
function redirectToHTTPS(e) {
	return { upgradeToSecure: true };
}
const httpToHttpsMatches = [
	// 'examples.org',
].reduce((arr, host) => arr.concat('http://' + host + '/*'), []);
if (httpToHttpsMatches.length !== 0) {
	browser.webRequest.onBeforeRequest.addListener(
		redirectToHTTPS, {urls: httpToHttpsMatches }, ["blocking"]
	);
}
})();
