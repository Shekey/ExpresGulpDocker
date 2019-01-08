FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ${PWD}/app/. .
RUN npm install -g nodemon
RUN npm install node-gyp node-sass
RUN npm install
RUN sudo apt-get install -y sqlite3 libsqlite3-dev
RUN mkdir /db
RUN /usr/bin/sqlite3 /db/test.db
CMD /bin/bash

EXPOSE 4000


