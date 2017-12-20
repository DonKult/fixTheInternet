"use strict";
/* Don't download the exports, show them inline if possible – e.g. the PDF */
(function() {
function dispositionInlineForGoogleDocuments(e) {
	e.responseHeaders.forEach(o => {
		if (o.name.toLowerCase() !== 'Content-Disposition'.toLowerCase())
			return;
		const trigger = 'attachment;';
		if (o.value.startsWith(trigger))
			o.value = 'inline;' + o.value.substr(trigger.length);
	});
	return {responseHeaders: e.responseHeaders};
}
browser.webRequest.onHeadersReceived.addListener(
	dispositionInlineForGoogleDocuments,
	{urls: [
		'https://docs.google.com/document/export?id=*',
		'https://docs.google.com/presentation/d/*' + '/export/*?id=*',
		'https://docs.google.com/spreadsheets/d/*' + '/export?id=*'
	], types: ['main_frame'] },
	["blocking", "responseHeaders"]
);
})();
