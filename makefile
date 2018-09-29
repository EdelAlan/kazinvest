.PHONY: 
	f \
	b \
	nodeup

f:
	cd kazinvest-front && npm run serve

b:
	cd kazinvest-back && nodemon index.js

nodeup:
	cd kazinvest-front && \
	npm i && \
	cd ../kazinvest-back && \
	npm i