const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 80;

// USE OS DEFAULTS DO CÓDIGO (sem -e, tudo funciona)
const FLAG = process.env.FLAG || 'flag{CTFWEB02_N30N_V4ULT_M4U4}';
const PIN  = String(process.env.PIN  || '1984').padStart(4, '0');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// cookie parser leve
app.use((req, _res, next) => {
  const raw = req.headers.cookie || '';
  const obj = {};
  raw.split(';').map(s => s.trim()).filter(Boolean).forEach(pair => {
    const i = pair.indexOf('=');
    const k = decodeURIComponent(i >= 0 ? pair.slice(0, i) : pair);
    const v = decodeURIComponent(i >= 0 ? pair.slice(i + 1) : '');
    obj[k] = v;
  });
  req.cookies = obj;
  next();
});

const sha1 = (s) => crypto.createHash('sha1').update(s).digest('hex');
const b64  = (s) => Buffer.from(s, 'utf8').toString('base64');
const fromB64 = (s) => Buffer.from(s, 'base64').toString('utf8');

app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.post('/login', (req, res) => {
  const { user, pin } = req.body || {};
  const cleanPin = String(pin || '').padStart(4, '0');
  const okUser = (user || '') === 'guest';
  const okPin  = cleanPin === PIN;

  res.set('X-PIN-Length', String(PIN.length));
  res.set('X-PIN-Hash', sha1(PIN));

  if (okUser && okPin) {
    res.cookie('session', b64(`guest:${cleanPin}`), { sameSite: 'Lax' });
    return res.json({ ok: true, message: 'Welcome, guest.' });
  }
  return res.json({ ok: false, message: 'Invalid credentials.' });
});

app.get('/vault', (req, res) => {
  let passed = false;

  // cookie
  const c = req.cookies.session;
  if (c) {
    try {
      const [u, p] = fromB64(c).split(':');
      if (u === 'guest' && p === PIN) passed = true;
    } catch {}
  }

  // header/query
  const headerPin = String(req.get('x-pin') || '').trim();
  const queryPin  = String(req.query.pin || '').trim();
  if (headerPin === PIN || queryPin === PIN) passed = true;

  if (!passed) return res.status(401).json({ ok: false, message: 'Unauthorized' });

  res.set('X-Flag', FLAG);
  return res.json({ ok: true, message: 'Vault opened.', flag: FLAG });
});

app.get('/status', (_req, res) => res.send('OK'));

app.listen(PORT, () => {
  console.log(`CTFWEB02 ON  →  http://localhost:${PORT}`);
});
