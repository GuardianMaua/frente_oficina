const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split(' ')[1]; 
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    
    const payload = jwt.decode(token); 
    if (!payload) return res.status(401).json({ error: 'Invalid token' });

    req.user = payload;
    next();
  } catch {
    return res.status(400).json({ error: 'Token parse error' });
  }
};

module.exports = authenticateToken;
