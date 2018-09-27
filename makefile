.PHONY: f b

f:
	cd kazinvest-front && npm run serve

b:
	cd kazinvest-back && nodemon index.js

nodeup:
	cd kazinvest-front && npm install \
	&& cd .. \
	cd kazinvest-back && npm install