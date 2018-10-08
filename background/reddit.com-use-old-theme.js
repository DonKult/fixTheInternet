"use strict";
/* The new design is hipp and stuff, but very hard to modify with my own CSS,
   uses more JS and hides sidebars on most subreddits */
(function() {
function redditRedirectScript(e) {
	return { redirectUrl: 'https://old.reddit.com/' + e.url.substr(e.url.indexOf('/', 8) + 1) };
}
browser.webRequest.onBeforeRequest.addListener(
	redditRedirectScript,
	{urls: ['https://reddit.com/*', 'https://www.reddit.com/*'], types: ['main_frame']}, ["blocking"]
);
})();
