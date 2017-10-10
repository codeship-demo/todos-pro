FROM node:8.6.0-alpine

WORKDIR /usr/app

RUN apk update && apk add postgresql
COPY package.json .
RUN npm install --quiet

COPY . .

CMD ["npm", "start"]
