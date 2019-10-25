"use strict";
/* Twitter can be quite cluttered and dependent on JS.
   Nitter seems far cleaner by default and can e.g. page without JS */
(function() {
const twitterRedirects = [
	'twitter.com',
	'www.twitter.com',
];
const nitterInstances = [
	// https://github.com/zedeus/nitter/wiki/Instances
	'nitter.net',
	'nitter.snopyta.org',
	'nitter.42l.fr',
	'nitter.nixnet.xyz',
	'nitter.lelux.fi',
	'nitter.pro',
	'nitter.13ad.de',
	'nitter.drycat.fr',
	//'3nzoldnxplag42gqjs23xvghtzf6t6yzssrtytnntc6ppc7xxuoneoad.onion',
	'nitter.l4qlywnpwqsluw65ts7md3khrivpirse744un3x7mlskqauz5pyuzgqd.onion',
	'nitteruacegiyzybcc2xej3obcti3dlysz5l5jns7ob4gict6tcualid.onion',
];
function redirectTwitter(e) {
	return {redirectUrl: 'https://' + nitterInstances[0] + e.url.substr(e.url.indexOf('/', 8))};
}
const domainToMatcher = host => '*://' + host + '/*';
let watchedUrls = twitterRedirects.map(domainToMatcher);
watchedUrls.push(...nitterInstances.slice(1).map(domainToMatcher));
browser.webRequest.onBeforeRequest.addListener(
		redirectTwitter, {urls: watchedUrls }, ["blocking"]
);
})();
