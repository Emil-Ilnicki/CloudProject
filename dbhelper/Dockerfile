FROM node:14.14.0-alpine

WORKDIR "/app"

COPY ./package.json ./

RUN yarn install

COPY . . 

EXPOSE 4001

CMD [ "node", "index.js" ]
