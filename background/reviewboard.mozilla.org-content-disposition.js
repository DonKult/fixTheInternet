"use strict";
/* Firfox tries to make me download patches attached to bugreports,
   but it would be nicer if I could have a quick look at them in the browser */
(function() {
function mozillaReplaceContentType(e) {
	e.responseHeaders.forEach(o => {
		if (o.name.toLowerCase() === 'Content-Disposition'.toLowerCase()) {
			const trigger = 'attachment;';
			if (o.value.startsWith(trigger))
				o.value = 'inline;' + o.value.substr(trigger.length);
		} else if (o.name.toLowerCase() === 'Content-Type'.toLowerCase()) {
			if (o.value.startsWith('text/x-diff'))
				o.value = 'text/plain' + o.value.substr('text/x-diff'.length);
			else if (o.value.startsWith('text/x-patch'))
				o.value = 'text/plain' + o.value.substr('text/x-patch'.length);
		}
	});
	return {responseHeaders: e.responseHeaders};
}
browser.webRequest.onHeadersReceived.addListener(
	mozillaReplaceContentType,
	{urls: ['https://reviewboard.mozilla.org/r/*/diff/raw/'] },
	["blocking", "responseHeaders"]
);
})();
