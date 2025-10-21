const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const port = 80;

let users = [{ id: 1, username: "Guardian", password: "senha1234" }];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Guardian",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.listen(port, () => {
  console.log(`Servidor CTF rodando em http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/files/wordlist.txt", (req, res) => {
  res.download(path.join(__dirname, "/files/wordlist.txt"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/login_page.html"));
});

// ALTERADO: Login agora cria uma sessão de admin
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`Tentativa de login com usuário: ${username}`);
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    // Se o login for válido, marca a sessão como autenticada
    req.session.isLoggedIn = true;
    req.session.username = user.username;
    res
      .status(200)
      .json({
        message: "Login bem-sucedido!",
        success: true,
        redirect: "/secreto",
      });
  } else {
    res
      .status(200)
      .json({ message: "Usuário e/ou senha incorretos!", success: false });
  }
});
app.get("/forget", (req, res) => {
  res.sendFile(__dirname + "/forget.html");
});
app.post("/forget", (req, res) => {
  const { username, success, message } = req.body;
  username.toString().trim();
  console.log(`Pedido de recuperação de senha para o email: ${username}`);
  const teste = users.find((u) => u.username === username);
  if (teste) {
    res
      .status(201)
      .json({
        username: "",
        message:
          "Instruções de recuperação de senha enviadas para o seu email.",
        success: true,
      });
  } else {
    res
      .status(401)
      .json({
        username: "",
        message: "Usuário não encontrado.",
        success: false,
      });
  }
});
// Middleware para verificar se o usuário está logado
function checkAuth(req, res, next) {
  if (req.session.isLoggedIn) {
    next(); // Se logado, continua
  } else {
    res.status(403).send("Acesso negado. Por favor, faça o login.");
  }
}

// ETAPA 1: LFI (Local File Inclusion)
app.get("/secreto", checkAuth, (req, res) => {
  const arquivoParaLer = req.query.arquivo;

  if (arquivoParaLer) {
    // VULNERABILIDADE DE LFI AQUI!
    // A aplicação lê um arquivo usando a entrada do usuário sem validação.
    try {
      const conteudo = fs.readFileSync(arquivoParaLer, "utf8");
      res.type("text/plain").send(conteudo);
    } catch (err) {
      res.status(404).send("Arquivo não encontrado.");
    }
  } else {
    res.send(`
        <h1>Área Secreta</h1>
        <p>Bem-vindo, ${req.session.username}.</p>
        <p>Nesse espaço, é possível encontrar documentos internos.</p>
        <p>Exemplo: <a href="/secreto?arquivo=files/documento_interno.txt">/secreto?arquivo=files/documento_interno.txt</a></p>
        `);
  }
});

// ETAPA 2: RCE (Remote Code Execution) - AGORA USANDO POST

// Quando o usuário ACESSA a página, mostramos o formulário (GET)
app.get("/admin/ferramenta-rede", checkAuth, (req, res) => {
  let form = `
        <h1>Ferramenta de Diagnóstico de Rede</h1>
        <form method="POST" action="/admin/ferramenta-rede">
            <label for="host">Endereço para executar:</label>
            <input type="text" id="host" name="host" size="50">
            <button type="submit">Executar</button>
        </form>
        <hr>
    `;
  res.send(form);
});

// Quando o usuário SUBMETE o formulário, processamos o comando (POST)
app.post("/admin/ferramenta-rede", checkAuth, (req, res) => {
  // A única mudança aqui é pegar o 'host' do CORPO da requisição
  const host = req.body.host;
  let form = `
        <h1>Ferramenta de Diagnóstico de Rede</h1>
        <form method="POST" action="/admin/ferramenta-rede">
            <label for="host">Endereço para executar:</label>
            <input type="text" id="host" name="host" size="50" value="${
              host || ""
            }">
            <button type="submit">Executar</button>
        </form>
        <hr>
    `;

  if (host) {
    // A VULNERABILIDADE DE RCE CONTINUA A MESMA AQUI
    const comando = `ping -c 3 ${host}`; // O ping é só uma isca, o jogador injetará outros comandos
    exec(comando, (error, stdout, stderr) => {
      const resultado = `<pre>${stdout || ""}${stderr || ""}</pre>`;
      res.send(form + resultado);
    });
  } else {
    res.send(form + "<pre>Por favor, insira um host.</pre>");
  }
});
