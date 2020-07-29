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

# pub:
# 	cd ./front && npm run build && \
# 	mv dist ./kazinvest && cd .. && \
# 	scp -P 7722 -r ./front/kazinvest ${DEVSERVER}:/home/administrator && \
# 	rm -rf ./front/kazinvest && \
# 	mv ./back/node_modules . && \
# 	scp -P 7722 -r ./back ${DEVSERVER}:/home/administrator/ && \
# 	mv ./node_modules ./back
# 	ssh ${DEVSERVER} -p 7722 ' \
# 		rm -rf /home/administrator/kazinvest-back && \
# 		mv /home/administrator/back /home/administrator/kazinvest-back && \
# 		cd /home/administrator/kazinvest-back/ && \
# 		npm install && \
# 		forever stop 0 && \
# 		forever start index.js \
# 	'

pub:
	cd ./front && npm run build && \
	mv dist ./kazinvest && cd .. && \
	scp -P 7722 -r ./front/kazinvest ${DEVSERVER}:/home/administrator/ && \
	rm -rf ./front/kazinvest

some:
	mv ./back/node_modules .
	mv ./node_modules ./back

