DEVSERVER := root@192.168.55.167

.PHONY: 
	f \
	b \
	nodeup \
	pub

f:
	cd front && npm run serve

b:
	cd back && nodemon index.js

nodeup:
	cd front && \
	npm install && \
	cd ../back && \
	npm install

pub:
	cd ./front && npm run build && \
	mv dist ./kazinvest && cd .. && \
	scp -r ./front/kazinvest ${DEVSERVER}:/srv/ && \
	rm -rf ./front/kazinvest && \
	scp -r ./back ${DEVSERVER}:/srv/ && \
	ssh ${DEVSERVER} ' \
		rm -rf /srv/kazinvest-back && \
		mv /srv/back /srv/kazinvest-back && \
		cd /srv/kazinvest-back/ && \
		forever stop 0 && \
		forever start index.js \
	'

