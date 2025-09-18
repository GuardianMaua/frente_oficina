# Escolher a base
FROM node:20-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do projeto para o diretório de trabalho
COPY . .package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Expor a porta que a aplicação irá rodar
EXPOSE 80

# Comando para iniciar a aplicação
CMD ["node", "index.js"]

# Definir a variável de ambiente para produção
ENV NODE_ENV=production
