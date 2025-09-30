// index.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 80;

// personalize se quiser via variável de ambiente
const FLAG = process.env.FLAG || 'flag{GUARDIAN-CTF-FLAG}';

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Página principal
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// PISTA 1: robots -> manda para /.well-known/ctf
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send('User-agent: *\nDisallow: /.well-known/ctf\n');
});

// PISTA 2: dica em base64
app.get('/.well-known/ctf', (_req, res) => {
  const dica = 'Visite /elevate para ganhar privilégio temporário e depois envie o formulário "Envie seus dados" com role=admin.';
  const b64 = Buffer.from(dica, 'utf8').toString('base64');
  res.type('text/plain').send(`Nada para ver aqui.\n${b64}\n`);
});

// Atalho para elevar (seta cookie)
app.get('/elevate', (req, res) => {
  // cookie simples (não HttpOnly para você conseguir ver no navegador se quiser)
  res.cookie('elevated', '1', { maxAge: 10 * 60 * 1000, sameSite: 'Lax' });
  res.type('text/plain').send('Privilégio temporário concedido por 10 minutos. Volte à página e envie o formulário com role=admin.');
});

// Endpoint principal com condição da flag (sem terminal)
app.post('/postExample', (req, res) => {
  const { name, email, role } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ message: 'Dados inválidos: informe name e email.' });
  }

  const elevated = req.cookies.elevated === '1';
  if (elevated && role === 'admin') {
    res.set('X-Flag', FLAG);
    return res.json({ message: 'GG!', flag: FLAG });
  }

  return res.json({ message: `Recebido! Nome: ${name}, Email: ${email}` });
});

// Mantém o submitForm do seu exemplo
app.post('/submitForm', (req, res) => {
  const { nome, mensagem } = req.body || {};
  if (!nome || !mensagem) {
    return res.status(400).json({ message: 'Preencha nome e mensagem.' });
  }
  return res.json({ message: `Mensagem recebida de ${nome}: ${mensagem}` });
});

app.listen(port, () => {
  console.log(`API Iniciada na porta ${port}! http://localhost:${port}`);
});