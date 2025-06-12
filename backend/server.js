const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const basicAuth = require('express-basic-auth');

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin*', basicAuth({
  users,
  challenge: true,
  realm: 'Área Administrativa'
}));

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));

// Rotas de API (mantidas intactas)
app.use('/api/chamado', require('./routes/chamados'));
app.use('/api/alertas', require('./routes/alertas'));
app.get('/api/alertas', async (req, res) => {
  try {
    const alertas = await Alerta.find().sort({ criadoEm: -1 });
    res.json({ success: true, data: alertas });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Rotas para páginas HTML
app.get('/criarchamados', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/criar-chamados.html'));
});

app.get('/alertas', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/alertas.html'));
});

app.get('/admin-alertas', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/admin-alertas.html'));
});
app.get('/admin-alertas', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/admin-alertas.html'));
});

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB!"))
  .catch(err => console.log("❌ Erro MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}! 🚀`));
