"use strict";
/* "normal" facebook can be quite cluttered and dependent on JS. */
(function() {
const facebookRedirects = [
	'facebook.com',
	'www.facebook.com',
];
function redirectFacebook(e) {
	return {redirectUrl: 'https://mbasic.facebook.com' + e.url.substr(e.url.indexOf('/', 8))};
}
const watchedUrls = facebookRedirects.map(host => '*://' + host + '/*');
browser.webRequest.onBeforeRequest.addListener(
		redirectFacebook, {urls: watchedUrls }, ["blocking"]
);
const facebookOnionRedirects = [
	'facebookcorewwwi.onion',
	'www.facebookcorewwwi.onion',
];
function redirectFacebookOnion(e) {
	return {redirectUrl: 'https://mbasic.facebookcorewwwi.onion' + e.url.substr(e.url.indexOf('/', 8))};
}
const watchedOnionUrls = facebookOnionRedirects.map(host => '*://' + host + '/*');
browser.webRequest.onBeforeRequest.addListener(
		redirectFacebookOnion, {urls: watchedOnionUrls }, ["blocking"]
);
})();
