const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// personalize via ambiente
const FLAG = process.env.FLAG || 'flag{CTFMAUA_OFICINA_renanlindo}';
const SECRET_CODE = process.env.CODE || 'opensesame'; // código que libera a flag

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// UI
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/** Desbloqueio — retorna a FLAG se o "code" estiver correto */
app.all('/unlock', (req, res) => {
  const code = req.method === 'GET' ? (req.query.code || '') : (req.body.code || '');
  if (String(code).trim() === SECRET_CODE) {
    res.set('X-Flag', FLAG);
    return res.json({ ok: true, message: 'GG!', flag: FLAG });
  }
  return res.json({ ok: false, message: 'Código incorreto.' });
});

/** Validação de FLAG — compara exatamente com a que está no servidor */
app.all('/submit-flag', (req, res) => {
  const submitted = (req.method === 'GET' ? req.query.flag : req.body.flag) || '';
  const isCorrect = String(submitted).trim() === FLAG;
  return res.json({
    ok: isCorrect,
    message: isCorrect ? 'Flag correta! ✅' : 'Flag incorreta. ❌',
  });
});

// Saúde
app.get('/status', (_req, res) => res.send('OK'));

app.listen(PORT, () => {
  console.log(`CTFWEB01 rodando em http://localhost:${PORT}`);
});
