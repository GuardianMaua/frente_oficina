# 1. Escolher a base
FROM node:20-alpine

# 2. Definir o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copiar os arquivos do seu projeto para dentro do container
COPY package*.json ./

# 4. Instalar dependências
RUN npm install

# 5. Copiar o resto do código
COPY . .

# 6. Definir o comando padrão ao rodar o container
CMD ["node", "server.js"]