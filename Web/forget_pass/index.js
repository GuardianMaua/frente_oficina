const express = require('express');
const app = express();
const port = 80;
let users = [
  { id: 1, username: "Guardian", password: "senha1234" }
];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});
app.get('/files/wordlist.txt', (req, res) => {
  res.download(__dirname + '/files/wordlist.txt', 'wordlist.txt', (err) => {
    if (err) {
      console.error("Erro ao baixar o arquivo:", err);
      res.status(500).send("Erro ao baixar o arquivo.");
    }
  });
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname+'/login_page.html');
});
app.post("/login", (req, res) => {
  const { username, password, message, success, redirect } = req.body;
  username.toString().trim();
  password.toString().trim();
  console.log(`Tentativa de login com usuário: ${username} e senha: ${password}`);
  const user = users.find(u => u.username === username && u.password === password);
   if (user) {
    res.status(201).json({username: "", password: "", message: "Login bem-sucedido!", success: true, redirect:"/secreto"});
  } else {
    res.status(401).json({username: "", password: "", message: "Usuário e/ou senha incorretos!", success: false});
  }  
});
app.get("/forget", (req, res) => { 
  res.sendFile(__dirname+'/forget.html');
});
app.post("/forget", (req, res) => {
  const { username,success,message } = req.body;
  username.toString().trim();
  console.log(`Pedido de recuperação de senha para o email: ${username}`);
  const teste = users.find(u => u.username === username);
  if (teste) {
    res.status(201).json({username: "", message: "Instruções de recuperação de senha enviadas para o seu email.", success: true});
  } else {
    res.status(404).json({username: "", message: "Usuário não encontrado.", success: false});
  }
});
  app.get("/secreto", (req, res) => {
  res.send("Parabéns! Você encontrou a área secreta.");
});