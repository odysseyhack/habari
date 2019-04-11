FROM node:10.15.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY server/package.json package.json
COPY blockchain/network /usr/src/app/network
COPY blockchain/shared /usr/src/app/shared
COPY blockchain/chaincode /usr/src/app/chaincode

RUN npm install --loglevel error
RUN npm cache clear --force

COPY server .
