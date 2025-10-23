# 🍔 InsecureToken — Desafio (Web + Docker)

Aplicação web simples (Node.js + Express + PostgreSQL) com páginas estáticas para login/registro e uma área administrativa protegida por JWT.

## 🎯 Visão Geral do Desafio

- Objetivo: explore a aplicação e alcance privilégios mais altos.
- Flag: `GUARDIAN{...}`

## 🚀 Início Rápido

### Pré-requisitos
- Docker (recomendado)
- Node.js 18+ (opcional, para desenvolvimento local)

### Desenvolvimento Local

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Configurar ambiente (.env) — exemplo:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=admin
   DB_NAME=db
   JWT_SECRET=secretkey
   PORT=80
   ```

3. Iniciar servidor:
   ```bash
   node server.js
   ```

4. Acessar:
   - http://localhost (ou http://localhost:80)

### Deploy com Docker

1. Construir a imagem:
   ```bash
   docker build -t insecureToken .
   ```

2. Executar o container:
   ```bash
   docker run -p 80:80 -p 22:22 -p 5432:5432 insecuretoken
   ```

3. Acessar a aplicação:
   - http://localhost (ou http://localhost:80)


## 🛠️ Endpoints da API

### Usuários (`/api/users`)
- POST `/register` — cria usuário comum
- POST `/login` — autentica e retorna JWT
- GET `/` — lista usuários (id, username, role)
- GET `/me` — retorna dados do usuário autenticado (Bearer token)
- GET `/admin` — área restrita (exige token com role `admin`)

### Mídia (`/api/media`)
- POST `/avatar` — upload de avatar (apenas admin). Campo `file` (PNG/JPG, até 200KB)

### Exemplos (curl)
```bash
# Registrar
curl -X POST http://localhost/api/users/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"senhaSegura"}'

# Login
curl -X POST http://localhost/api/users/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"senhaSegura"}'

## ⚠️ Aviso

Aplicação criada para fins educacionais. Não utilize técnicas ofensivas fora de ambientes autorizados.

## 🤝 Contribuição

Sinta-se à vontade para abrir issues e melhorias.

## 📄 Licença

Uso educativo. Aja com responsabilidade e ética.
