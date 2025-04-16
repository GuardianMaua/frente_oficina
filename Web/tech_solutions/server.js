const express = require('express');
const path = require('path');
const app = express();
const PORT = 80;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Banco de dados "fake" (armazenamento inseguro)
const users = {
  'cliente1': { password: 'senha123', isAdmin: false },
  'admin': { password: 'Adm!nS3cr3t#2023', isAdmin: true }
};

// Rotas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user && user.password === password) {
    res.redirect(user.isAdmin ? '/admin' : '/dashboard');
  } else {
    res.redirect('/login?error=Credenciais+inválidas');
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});