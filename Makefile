ADDON_PATH = $(shell readlink -f .)

all xpi: README.html manifest.json dynamic_backgrounds
	zip --must-match -r fixtheinternet.xpi background/*.js background.in/*.js background.js manifest.json README.html

README.html: README.md
	./prepare-release README

manifest.json: manifest.json.in .git dynamic_backgrounds
	@sed -n -e 's#@@VERSION@@#$(shell git describe | cut -c 2-)#' -e '0,/@@BACKGROUND_SCRIPTS@@/p' $< | head -n -1 > $@
	find background -name '*.js' -type f -printf '      "%p",\n' | sort >> $@
	find background.in -name '*.js' -type f -printf '      "%p",\n' | sort >> $@
	@sed -n '/@@BACKGROUND_SCRIPTS@@/,$$p' $< | tail -n +2 >> $@

dynamic_backgrounds:
	find background.in -name '*.sh' -exec sh '{}' \;

distclean clean:
	rm -f README.html manifest.json background.in/*.js background.in/*.old fixtheinternet.xpi

.PHONY: dynamic_backgrounds
