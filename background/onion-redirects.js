"use strict";
/* redirect known domains to their onion addresses
   Inclusion is not an endorsement of the site. I might not even use them at all. */
(function() {
const onionRedirects = {
	// facebook
	'facebook.com': 'https://facebookcorewwwi.onion/',
	'www.facebook.com': 'https://facebookcorewwwi.onion/',
	'mbasic.facebook.com': 'https://mbasic.facebookcorewwwi.onion/',
	'developers.facebook.com': 'https://developers.facebookcorewwwi.onion/',
	// DuckDuckGo: https://duck.co/blog/post/16/friends-newsletter-40
	'duckduckgo.com': 'https://3g2upl4pq6kufc4m.onion/',
	'www.duckduckgo.com': 'https://3g2upl4pq6kufc4m.onion/',
	'icons.duckduckgo.com': 'https://3g2upl4pq6kufc4m.onion/',
	// ahmia.fi: footer of each site
	'ahmia.fi': 'http://msydqstlz2kzerdg.onion/',
	'www.ahmia.fi': 'http://msydqstlz2kzerdg.onion/',
	// piratebay: footer of each site
	'thepiratebay.org': 'http://piratebayztemzmv.onion/',
	'www.thepiratebay.org': 'http://piratebayztemzmv.onion/',
	// Martins Schmierzettel: https://blog.mdosch.de/2017/05/29/mein-blog-ist-nun-als-hidden-service-ueber-tor-verfuegbar/
	'blog.mdosch.de': 'http://blog.skt4odto3ycrngsv.onion/',
	// ProtonMail: https://protonmail.com/tor
	'protonmail.com': 'https://protonirockerxow.onion/',
	// Keybase.io: https://keybase.io/docs/command_line/tor
	'keybase.io': 'http://fncuwbiisyh6ak3i.onion/',
	'www.keybase.io': 'http://fncuwbiisyh6ak3i.onion/',
	// ProPublica: https://www.propublica.org/nerds/a-more-secure-and-anonymous-propublica-using-tor-hidden-services
	'propublica.org': 'http://www.propub3r6espa33w.onion/',
	'www.propublica.org': 'http://www.propub3r6espa33w.onion/',
	// ScryptMail: https://blog.scryptmail.com/complete-tor-support/
	'scryptmail.com': 'http://scryptmaildniwm6.onion/',
	'www.scryptmail.com': 'http://scryptmaildniwm6.onion/',
	// Qubes OS: footer of each site
	'qubes-os.org': 'http://qubesos4rrrrz6n4.onion/',
	'www.qubes-os.org': 'http://qubesos4rrrrz6n4.onion/',
	// text-only "link" to onion on clearnet usage
	'blockchain.info': 'https://blockchainbdgpzk.onion/',
	// text in the logo of the page
	'www.deepdotweb.com': 'http://deepdot35wvmeyd5.onion/',
	// The New York Times: https://open.nytimes.com/https-open-nytimes-com-the-new-york-times-as-a-tor-onion-service-e0d0b67b7482
	'nytimes.com': 'https://www.nytimes3xbfgragh.onion',
	'www.nytimes.com': 'https://www.nytimes3xbfgragh.onion',
	'open.nytimes.com': 'https://open.nytimes3xbfgragh.onion',
	// taz: mentioned on https://informant.taz.de/
	'taz.de': 'http://ibpj4qv7mufde33w.onion',
	'www.taz.de': 'http://ibpj4qv7mufde33w.onion',
	'informant.taz.de': 'http://mprt35sjunnxfa76.onion',
	// Invidious: in the README of the github project: https://github.com/omarroth/invidious
	'invidio.us': 'http://axqzx4s6s54s32yentfqojs3x5i7faxza6xo3ehd4bzzsg2ii4fv2iid.onion',
	'kgg2m7yk5aybusll.onion': 'http://axqzx4s6s54s32yentfqojs3x5i7faxza6xo3ehd4bzzsg2ii4fv2iid.onion',
	// Uberspace: https://blog.uberspace.de/toasting/
	'uber.space': 'http://ahcbagldgzdpa74g2mh74fvk5zjzpfjbvgqin6g3mfuu66tynv2gkiid.onion',
	'onastroidst6krpn.onion': 'http://ahcbagldgzdpa74g2mh74fvk5zjzpfjbvgqin6g3mfuu66tynv2gkiid.onion',
	'uberspace.de': 'http://ubrspc3z5xuzh2iss4xuacpjdqj24orwnuye5hk23cpykd3mcujvygqd.onion',
	'uberspaceyukm42r.onion': 'http://ubrspc3z5xuzh2iss4xuacpjdqj24orwnuye5hk23cpykd3mcujvygqd.onion',
	'blog.uberspace.de': 'http://blog.ubrspc3z5xuzh2iss4xuacpjdqj24orwnuye5hk23cpykd3mcujvygqd.onion',
	'blog.uberspaceyukm42r.onion': 'http://blog.ubrspc3z5xuzh2iss4xuacpjdqj24orwnuye5hk23cpykd3mcujvygqd.onion',
	'manual.uberspace.de': 'http://manual.ubrspc3z5xuzh2iss4xuacpjdqj24orwnuye5hk23cpykd3mcujvygqd.onion',
	'manual.uberspaceyukm42r.onion': 'http://manual.ubrspc3z5xuzh2iss4xuacpjdqj24orwnuye5hk23cpykd3mcujvygqd.onion',
	'lab.uberspace.de': 'http://lab.ubrspc3z5xuzh2iss4xuacpjdqj24orwnuye5hk23cpykd3mcujvygqd.onion',
	'lab.uberspaceyukm42r.onion': 'http://lab.ubrspc3z5xuzh2iss4xuacpjdqj24orwnuye5hk23cpykd3mcujvygqd.onion',
	// Nitter: wiki of the github project: https://github.com/zedeus/nitter/wiki/Instances
	'nitter.net': 'http://3nzoldnxplag42gqjs23xvghtzf6t6yzssrtytnntc6ppc7xxuoneoad.onion',
};
function redirectOnion(e) {
	const parts = e.url.split('/', 4);
	if (onionRedirects.hasOwnProperty(parts[2])) {
		const onion = onionRedirects[parts[2]];
		return {redirectUrl: onion + e.url.substr(e.url.indexOf('/', 8) + (onion.endsWith('/') ? 1 : 0)) };
	}
}
const watchedUrls = Object.keys(onionRedirects).reduce((arr, host) => arr.concat('*://' + host + '/*'), []);
browser.webRequest.onBeforeRequest.addListener(
		redirectOnion, {urls: watchedUrls }, ["blocking"]
);

function undoTor2Web(e) {
	const parts = e.url.split('/', 4);
	const onion = parts[2].split('.', 3);
	if (onion.length < 3)
		return {};
	return { redirectUrl: 'http://' + onion[0] + '.onion/' + e.url.substr(e.url.indexOf('/', 8) + 1) };
}
const urlsTor2Web = [
	'tor2web.org',
	'tor2web.com',
	'tor2web.xyz',
	'tor2web.fi',
	'tor2web.blutmagie.de',
	'onion.to',
	'onion.lu',
	'onion.sh',
	'onion.is',
	'onion.lt',
	'onion.cab',
	'onion.city',
	'onion.link',
	'onion.nu',
	'onion.direct',
	't2w.pw',
	'darktor.com',
	'torstorm.org',
	'connect2tor.org',
	'door2tor.org',
	'toradvisor.org',
].reduce((arr, host) => arr.concat('*://*.' + host + '/*'), []);
browser.webRequest.onBeforeRequest.addListener(
		undoTor2Web, {urls: urlsTor2Web }, ["blocking"]
);
})();
