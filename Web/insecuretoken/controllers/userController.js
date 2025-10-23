const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generic = (res, code = 401) =>
  res.status(code).json({ error: 'Usuário ou senha incorretos.' });


const registerUser = async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return generic(res, 400);

  try {
    const hash = await bcrypt.hash(password, 10);

    
    const q = `
      INSERT INTO users (username, password, role)
      VALUES ($1, $2, 'user')
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username, role
    `;
    const r = await pool.query(q, [username.trim(), hash]);

    if (r.rows.length === 0) {
      
      return generic(res, 400);
    }

    const user = r.rows[0];
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '1h' }
    );
    return res.json({ token, id: user.id, username: user.username, role: user.role });
  } catch {
    return generic(res, 400);
  }
};


const loginUser = async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return generic(res);

  try {
    const r = await pool.query(
      'SELECT id, username, password, role FROM users WHERE username=$1',
      [username]
    );
    if (r.rows.length === 0) return generic(res);

    const user = r.rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return generic(res);

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '1h' }
    );
    return res.json({ token, id: user.id, username: user.username, role: user.role });
  } catch {
    return generic(res);
  }
};


const getUsers = async (_req, res) => {
  try {
    const result = await pool.query('SELECT id, username, role FROM users');
    return res.json(result.rows);
  } catch {
    return res.status(500).json({ error: 'Erro interno.' });
  }
};


const getMe = (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Não autenticado.' });
  const { id, username, role } = req.user;
  return res.json({ id, username, role });
};

module.exports = { registerUser, loginUser, getUsers, getMe };
