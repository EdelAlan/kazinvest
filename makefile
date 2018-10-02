.PHONY: 
	f \
	b \
	nodeup

f:
	cd front && npm run serve

b:
	cd back && nodemon index.js

nodeup:
	cd front && \
	npm i && \
	cd ../back && \
	npm i