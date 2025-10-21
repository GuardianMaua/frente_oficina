const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, getMe } = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

const FLAG = 'FLAG{You_Found_It!}';
//Endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/me', authenticateToken, getMe);

router.get('/admin', authenticateToken, (req, res) => {
  if (req.user?.role === 'admin') {
    return res.json({ flag: FLAG });
  }
  return res.status(403).json({ error: 'Forbidden: admin only' });
});

module.exports = router;
