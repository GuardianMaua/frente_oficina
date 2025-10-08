# Oficina Guardian — Semana 4 (Docker + Postgres + Front)

Aplicação web simples (Node.js + Express + PostgreSQL) com páginas estáticas (HTML) para login/registro e uma rota restrita. Pensada para uso didático/CTF.


> Observação: este README descreve **como subir e usar**.

## Tecnologias
- Node.js

- Express

- PostgreSQL

- Bcrypt (hash de senhas)

- JSON Web Token (JWT)

- Dotenv (variáveis de ambiente)

- CORS

- Docker Desktop (ou Docker Engine + Compose V2)

## Configuração
- git clone https://github.com/ferrenha/Oficina-Guardian.git
- cd Oficina-Guardian/Semana4
- npm init -y
- npm install express pg bcrypt jsonwebtoken dotenv cors


## Subir tudo com Docker Compose
- Na pasta **Semana4/**:
- docker compose up --build
# Para rodar o docker:
- docker compose up -d 
# Caso queira resetar:
- docker compose down -v
- docker compose up -d --build



## Estrutura
- controllers/      # controllers da API
- middleware/       # middlewares (inclui auth)
- routes/           # rotas da API
- public/           # páginas estáticas (index/login/register/dashboard/admin)
- db.js             # conexão Postgres
- server.js         # servidor Express
- init.sql          # cria tabela e insere usuários iniciais
- Dockerfile        # imagem do app
- docker-compose.yml

## Páginas & Endpoints

- Páginas (estáticas)

- / — home (links para login/registro)

- /login.html

- /register.html

- /dashboard.html

- /admin.html (área restrita)

API (prefixo /api/users)

- POST /register — cria usuário comum

- POST /login — autentica e retorna JWT

- GET /admin — conteúdo restrito (requer token)

- GET /me — valida token

- GET / — lista usuários (id, username, role)

