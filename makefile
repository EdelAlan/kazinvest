.PHONY: f b

f:
	cd kazinvest-front && npm run serve

b:
	cd kazinvest-back && nodemon index.js