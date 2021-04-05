FROM node:14.14.0-alpine

WORKDIR "/app"

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . . 

EXPOSE 4002

CMD [ "node", "index.js" ]