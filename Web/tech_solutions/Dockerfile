FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=80

CMD ["node", "index.js"]

EXPOSE 80
