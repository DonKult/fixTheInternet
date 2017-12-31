ADDON_PATH = $(shell readlink -f .)

all xpi: README.html manifest.json dynamic_backgrounds
	zip --must-match -r fixtheinternet.xpi background/*.js background.in/*.js background.js manifest.json README.html

README.html: README.md
	./prepare-release README

.gitdescribe: .git
	git describe > $@

manifest.json: manifest.json.in dynamic_backgrounds .gitdescribe
	@sed -n -e 's#@@VERSION@@#$(shell cut -c 2- ".gitdescribe")#' -e '0,/@@BACKGROUND_SCRIPTS@@/p' $< | head -n -1 > $@
	find background -name '*.js' -type f -printf '      "%p",\n' | sort >> $@
	find background.in -name '*.js' -type f -printf '      "%p",\n' | sort >> $@
	@sed -n '/@@BACKGROUND_SCRIPTS@@/,$$p' $< | tail -n +2 >> $@

dynamic_backgrounds:
	find background.in -name '*.sh' -exec sh '{}' \;

distclean clean:
	rm -f .gitdescribe README.html manifest.json backround.in/*.js backround.in/*.old fixtheinternet.xpi

.PHONY: dynamic_backgrounds
