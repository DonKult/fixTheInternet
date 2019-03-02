"use strict";
/* Youtube can be quite cluttered and dependent on JS.
   Invidious seems far cleaner by default and can e.g. page without JS */
(function() {
const youtubeRedirects = [
	'youtube.com',
	'www.youtube.com',
	'm.youtube.com',
	'youtu.be',
	'www.youtu.be',
	'youtube-nocookie.com',
	'www.youtube-nocookie.com',
];
function redirectYoutube(e) {
	return {redirectUrl: 'https://invidio.us' + e.url.substr(e.url.indexOf('/', 8))};
}
const watchedUrls = youtubeRedirects.map(host => '*://' + host + '/*');
browser.webRequest.onBeforeRequest.addListener(
		redirectYoutube, {urls: watchedUrls }, ["blocking"]
);
})();
