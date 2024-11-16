FROM node:18-alpine

WORKDIR /client
COPY package.json /client/

COPY . . 

RUN npm install

EXPOSE 8081

CMD ["node","start"]