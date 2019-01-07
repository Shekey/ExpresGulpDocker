FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ${PWD}/app/. .
RUN npm install -g nodemon
RUN npm install node-gyp node-sass
RUN npm install

EXPOSE 4000


