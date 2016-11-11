# Commands
NODE_CMD = node
NPM_CMD = npm

.PHONY: lint test build

lint:
	${NPM_CMD} run lint

test:
	${NPM_CMD} test

build:
	${NPM_CMD} run build	
