"use strict";
/* Youtube serves a javascript-only page for firefox, so we fake using a
   different browser which gets served a html version */
(function() {
function youtubeRewriteUserAgentHeader(e) {
	for (let header of e.requestHeaders)
		if (header.name.toLowerCase() === "user-agent")
			header.value = 'w3m/0.5.3';
	return {requestHeaders: e.requestHeaders};
}
browser.webRequest.onBeforeSendHeaders.addListener(youtubeRewriteUserAgentHeader,
	{urls: [
		'https://www.youtube.com/*',
		'https://www.youtube-nocookie.com/*'
	]},
	["blocking", "requestHeaders"]
);
})();
