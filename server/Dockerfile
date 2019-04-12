FROM node:10.15.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY server/package.json package.json
RUN npm install --loglevel error
COPY blockchain/shared /usr/src/app/shared
COPY blockchain/network /usr/src/app/network
COPY blockchain/chaincode /usr/src/app/chaincode
COPY blockchain/crypto-config /usr/src/app/crypto-config
COPY blockchain/config /usr/src/app/config

COPY server .


