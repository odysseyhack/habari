FROM node:10.15-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package.json
RUN npm install --loglevel error
RUN npm cache clear --force

COPY . .
