FROM node:18-alpine

WORKDIR /client
COPY package.json package-lock.json ./

COPY . . 

RUN npm install

EXPOSE 3000

CMD ["node","start"]