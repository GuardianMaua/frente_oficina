FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
EXPOSE 2121

CMD ["node", "server.js"]