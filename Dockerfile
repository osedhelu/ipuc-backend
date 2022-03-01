FROM node:16.5.0-alpine3.14
RUN npm i -g nodemon 
RUN npm i -g ts-node 
WORKDIR /usr/src/backend
COPY . .
COPY ./dist/ ./dist/
COPY ./node_modules ./node_modules/
COPY ./src/ ./src/
run ls -al
