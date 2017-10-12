ADDON_PATH = $(shell readlink -f .)

all xpi: README.html manifest.json dynamic_backgrounds
	zip --must-match -r fixtheinternet.xpi background/*.js background.in/*.js background.js manifest.json README.html

README.html: README.md
	./prepare-release README

manifest.json: manifest.json.in dynamic_backgrounds
	@sed -n '0,/@@BACKGROUND_SCRIPTS@@/p' manifest.json.in | head -n -1 > manifest.json
	find background -name '*.js' -type f -printf '      "%p",\n' | sort >> manifest.json
	find background.in -name '*.js' -type f -printf '      "%p",\n' | sort >> manifest.json
	@sed -n '/@@BACKGROUND_SCRIPTS@@/,$$p' manifest.json.in | tail -n +2 >> manifest.json

dynamic_backgrounds:
	find background.in -name '*.sh' -exec sh '{}' \;

distclean clean:
	rm -f README.html manifest.json backround.in/*.js backround.in/*.old fixtheinternet.xpi

.PHONY: dynamic_backgrounds
