# Commands
NODE_CMD = node
NPM_CMD = npm

.PHONY: build coverage test

build: coverage lint compile

coverage:
	$(NPM_CMD) run coverage

lint:
	$(NPM_CMD) run lint

compile:
	[[ -d 'dist' ]] || mkdir dist
	$(NPM_CMD) run build

test:
	$(NPM_CMD) test
