# fixTheInternet

Firefox [WebExtension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
with the boring and easy task to fix the Internet for me.

## What the heck?

This extension collects small snippets of background scripts to solve specific
(and not so specific) problems with my preferred browser Firefox and the
internet. The problem of modifying websites to my liking is handled by the
[dotPageMod](https://github.com/DonKult/dotPageMod) extension instead.

As is it is likely not at all useful for anyone but me, but feel free to
grab what you need for yourself.

## Installation

At the moment you have to build the extension yourself to install it. Given
that I approximate the userbase to be only me, I have no plans to shuffle the
addon into the review queue as it would just waste valuable reviewer time.
That also means you have to run a Developer/Nightly edition of Firefox as it
isn't signed.

## Why isn't it working on about: pages or addons.mozilla.org?

The reason is security. WebExtensions aren't allowed to insert code into
privileged tabs like about: pages and a few other domains to avoid people
being tricked by evil extensions and co.

## Why not part of dotPageMod?

The scripts here require access to WebExtension APIs only available for
background scripts, not to content scripts which is what dotPageMod handles.
You could of course implement some API in dotPageMod to call them from
content scripts, but then you a) basically reimplement the WebExtension API
over the message system and more importantly b) those scripts aren't really
limited to specific sites – they might effect some, but usually before the site
is even visited (like rewriting URIs and such) and "reloading" could end in [!FUN!](http://dwarffortresswiki.org/index.php/Fun).

## License

The extension is MIT (Expat) licensed.

	Copyright © 2017 David Kalnischkies <david@kalnischkies.de>

	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
	of the Software, and to permit persons to whom the Software is furnished to do
	so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.