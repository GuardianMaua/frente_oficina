require('dotenv').config();
const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = 3000;

// Configuração do rate limiting para proteção contra brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);

// Dados do desafio (em ambiente real, use um banco de dados)
const users = {
  'admin@guardian.com': {
    password: 's3cr3tP@ss',
    recoveryCode: '42', // código de 2 dígitos
    isAdmin: true
  },
  'user@example.com': {
    password: 'password123',
    recoveryCode: '73',
    isAdmin: false
  }
};

// Rota principal - serve o frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];

  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Credenciais inválidas!' });
  }

  if (user.isAdmin) {
    // Flag só é retornada para o admin após login bem-sucedido
    return res.json({ 
      success: true, 
      isAdmin: true, 
      flag: process.env.FLAG || 'GUARDIAN{BRUTE_C0d3_EP}' 
    });
  }

  res.json({ success: true, isAdmin: false });
});

// Rota de recuperação de senha
app.post('/api/recover', (req, res) => {
  const { email } = req.body;
  
  if (!users[email]) {
    return res.status(404).json({ success: false, message: 'Email não encontrado' });
  }

  res.json({ 
    success: true, 
    hint: 'Um código de 2 dígitos foi enviado para seu email' 
  });
});

// Rota para verificar o código de recuperação
app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;
  const user = users[email];

  if (!user) {
    return res.status(404).json({ success: false, message: 'Email não encontrado' });
  }

  if (user.recoveryCode !== code) {
    return res.status(401).json({ success: false, message: 'Código incorreto!' });
  }

  res.json({ 
    success: true, 
    password: user.password,
    isAdmin: user.isAdmin
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});