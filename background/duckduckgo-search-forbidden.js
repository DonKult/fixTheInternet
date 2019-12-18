"use strict";
/* If you change the search and hit enter while using the onion address you get "403 Forbidden" */
(function(){
function rewriteOrigin(e) {
	for (var header of e.requestHeaders) {
		if (header.name.toLowerCase() === "origin" && header.value === "https://3g2upl4pq6kufc4m.onion") {
			header.value = "https://duckduckgo.com";
			break;
		}
	}
	return {requestHeaders: e.requestHeaders};
}
browser.webRequest.onBeforeSendHeaders.addListener(
	rewriteOrigin,
	{urls: [ "https://3g2upl4pq6kufc4m.onion/*" ]},
	["blocking", "requestHeaders"]
);})();
