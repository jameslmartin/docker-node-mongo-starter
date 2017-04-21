.PHONY: help init dev debug unit-test
.DEFAULT_GOAL := help

DOCKER_IMAGE=node:7
APP_NAME=CIO-Record-Exercise
APP_PORT=8080
MONGO_PORT=27017
NODE_DEBUG_PORT=7080
DOCKER_CONTAINER_NAME=$(APP_NAME)
WATCH?=true

help:
	#source:http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


run-docker:
	@-docker rm -f $(DOCKER_CONTAINER_NAME)
	@docker run --rm \
		$(DOCKER_OPTS) \
		$(DOCKER_PORTS) \
		-v /var/run/docker.sock:/var/run/docker.sock \
		--name=$(DOCKER_CONTAINER_NAME) \
		--volume `pwd`:/root/app/$(APP_NAME) \
		--workdir /root/app/$(APP_NAME) \
		$(DOCKER_IMAGE) $(DOCKER_CMD)

prod:
	@docker-compose up --build

init: DOCKER_CONTAINER_NAME=$(APP_NAME)-init
init: DOCKER_CMD=npm install
init: DOCKER_OPTS=-it
init: run-docker
init: ## Initializes the project by running npm install

db:
	@docker run \
	  -p $(MONGO_PORT):27017 \
		--name=mongo \
		mongo &

dev: DOCKER_CMD=npm run dev
dev: DOCKER_PORTS=-p $(APP_PORT):8080
dev: DOCKER_OPTS=-it --link mongo
dev: run-docker

debug: DOCKER_CMD=npm run debug
debug: DOCKER_PORTS=-p $(APP_PORT):8080 -p $(NODE_DEBUG_PORT):7080
debug: DOCKER_OPTS=-it --link mongo
debug: run-docker
debug: ## Stands up a dev environment with debug options turned on

unit-test: DOCKER_CMD=npm run unit-test
unit-test: DOCKER_CONTAINER_NAME=$(APP_NAME)-test
unit-test: DOCKER_OPTS=-it -e WATCH=$(WATCH)
unit-test: run-docker
unit-test: ## Runs the unit tests for the project
