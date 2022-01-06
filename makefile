.PHONY: install clean console web

install:
	docker-compose run --rm npm install

web: install
	docker-compose run --rm --service-ports npm run web

console: install
	docker-compose run --rm npm run console

clean:
	docker-compose run --rm bash rm -rf build package-lock.json node_modules .npm
