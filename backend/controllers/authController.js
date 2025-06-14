const User = require('../models/User');
const jwt = require('jsonwebtoken');

const gerarToken = (id) => {
  return jwt.sign({ id }, 'secreto', { expiresIn: '2h' }); // Troque 'secreto' por uma env var depois
};

// Registrar usuário (admin)
exports.registrar = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ success: false, error: 'Usuário já existe' });
    }

    const novoUsuario = await User.create({ email, senha });
    res.status(201).json({ 
      success: true, 
      token: gerarToken(novoUsuario._id)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
    }

    res.json({ success: true, token: gerarToken(usuario._id) });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
