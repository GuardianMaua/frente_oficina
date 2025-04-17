# Etapa de build (caso queira futuramente usar TS ou bundler)
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app .

ENV PORT=80

EXPOSE 80

CMD ["node", "server.js"]
