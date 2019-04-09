FROM node:8.9.4-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY package.json package.json
RUN npm install --loglevel error
RUN npm cache clear --force

ADD . /usr/src/app

EXPOSE 4200
EXPOSE 49153
