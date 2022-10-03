### DEV

build-dev:
	cd parser-rss-ui && $(MAKE) build-dev
	cd parser-rss-api  && $(MAKE) build

run-dev:
	docker-compose up

stop:
	docker-compose down

