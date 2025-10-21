const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Módulo essencial para lidar com caminhos de arquivos

const app = express();
const PORT = 80;

// Configura o body-parser para ler dados de formulários
app.use(bodyParser.urlencoded({ extended: true }));

// Rota 1: Raiz (porta 3000)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota 2: Página de senha (/REambar) - GET
app.get('/REambar', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reambar.html'));
});

// Rota 3: Processamento da senha (/REambar) - POST
app.post('/REambar', (req, res) => {
  const senhaDigitada = req.body.senha;

  if (senhaDigitada === 'Scarlectus') {
    res.redirect('/REambar/ativar');
  } else {
    res.redirect('/REambar?error=1');
  }
});

// Rota 4: Ativação (/REambar/ativar)
app.get('/REambar/ativar', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ativar.html'));
});

// NOVO: Rota para a página de dinossauros
app.get('/dinossauros', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dinossauros.html'));
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`[+] Servidor rodando em http://localhost:${PORT}`);
});