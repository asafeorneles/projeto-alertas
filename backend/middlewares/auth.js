const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, error: 'Token ausente' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Token inválido' });
  }
};
