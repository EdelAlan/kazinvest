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
	npm i && \
	cd ../back && \
	npm i

pub:
	cd ./front && npm run build && \
	mv dist ./kazinvest-front_1 && cd .. && \
	scp -r ./front/kazinvest-front_1 root@192.168.55.167:/srv/ && \
	rm -rf ./front/kazinvest-front_1 && \
	scp -r ./back root@192.168.55.167:/srv/ && \
	ssh root@192.168.55.167 ' \
		mv /srv/back /srv/kazinvest-back_1 && \
		cd /srv/kazinvest-back_1/ \
	'
		# && forever stop 0 && \ 
		# forever start index \
