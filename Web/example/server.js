const express = require("express");
const app = express();
const path = require("path");

const port = 80;

app.use(express.json());

let usuarios = [];
let proximoId = 1;

app.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ error: "Campos nome, email e senha são obrigatórios." });
  }
  const usuario = { id: proximoId++, nome, email, senha };
  usuarios.push(usuario);

  if (email == "admin@maua.br") {
    res
      .status(201)
      .json({
        id: 0,
        nome: "VOCE ENCONTROU",
        email: "FL4G_4UL4",
        senha: "PARABENS",
      });
  } else {
    res.status(201).json(usuario);
  }
});

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
