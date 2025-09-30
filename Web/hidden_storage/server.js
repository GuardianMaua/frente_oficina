// server.js (versão modificada)
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

const users = [];

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";
const FLAG_1 = "FLAG{D4D0S_V4Z4D0S_N4_API}";
const FLAG_2 = "FLAG{4C3SS0_4DMIN_C0NQU1ST4D0}";

users.push({
  username: "system_log",
  info: "Primeira parte da chave encontrada",
  flag: FLAG_1,
});
users.push({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "ctf-secret-session-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);
app.get("/criarConta.html", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "criarConta.html"))
);
app.get("/home.html", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "home.html"))
);
app.get("/armazenamento.html", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "armazenamento.html"))
);

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ error: "Usuário já existe" });
  }
  users.push({ username, password });
  return res.json({
    success: true,
    message: "Usuário criado! Agora faça login.",
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });
  req.session.user = { username: user.username };
  return res.json({ success: true });
});

app.get("/api/welcome", (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ error: "Não autenticado" });

  if (req.session.user.username === ADMIN_USERNAME) {
    return res.json({
      hello: `Login como ${ADMIN_USERNAME} bem-sucedido!`,
      flag: `🚩 Parabéns, aqui está a flag final: ${FLAG_2}`,
    });
  }

  // Para outros usuários, a dica vai para o CONSOLE
  return res.json({
    hello: `Olá, ${req.session.user.username}!`,
    hiddenClue:
      "Psst... parece que os desenvolvedores deixaram um endpoint de 'armazenamento' de dados ativo. Tente encontrá-lo.",
  });
});

app.get("/api/armazenamento", (req, res) => {
  return res.json({ data: users });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => res.json({ success: true }));
});

app.listen(PORT, () => {
  console.log(`🚩 CTF rodando em http://localhost:${PORT}`);
});
