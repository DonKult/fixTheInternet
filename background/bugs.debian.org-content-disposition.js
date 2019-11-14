"use strict";
/* Firfox tries to make me download patches attached to bugreports,
   but it would be nicer if I could have a quick look at them in the browser */
(function() {
function debianReplaceContentType(e) {
	e.responseHeaders.forEach(o => {
		if (o.name.toLowerCase() !== 'Content-Type'.toLowerCase())
			return;
		if (o.value.startsWith('text/x-diff'))
			o.value = 'text/plain' + o.value.substr('text/x-diff'.length);
		else if (o.value.startsWith('text/x-patch'))
			o.value = 'text/plain' + o.value.substr('text/x-patch'.length);
		else if (o.value.startsWith('text/x-python'))
			o.value = 'text/plain' + o.value.substr('text/x-python'.length);
		else if (o.value.startsWith('application/')) {
			if (o.value === 'application/gzip') {
				return;
				/* Not allowed at the moment, sadly
				// https://dxr.mozilla.org/mozilla-central/source/netwerk/protocol/http/HttpBaseChannel.cpp#1945
				// make it look like a 'normal' page instead of an inlined download
				e.responseHeaders.forEach(u => {
					if (u.name.toLowerCase() !== 'Content-Disposition'.toLowerCase())
						return;
					u.name = 'Content-Encoding';
					u.value = 'gzip';
				});
				//*/
			}
			o.value = 'text/plain; charset="utf-8"';
		}
	});
	return {responseHeaders: e.responseHeaders};
}
browser.webRequest.onHeadersReceived.addListener(
	debianReplaceContentType,
	{urls: ['https://bugs.debian.org/cgi-bin/bugreport.cgi?att=*'] },
	["blocking", "responseHeaders"]
);
})();
