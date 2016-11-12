# Commands
NODE_CMD = node
NPM_CMD = npm

.PHONY: coverage lint build

lint:
	$(NPM_CMD) run lint

test:
	$(NPM_CMD) test

build:
	$(NPM_CMD) run build

coverage:
	$(NPM_CMD) run coverage
