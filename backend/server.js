const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));


// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB!"))
  .catch(err => console.log("❌ Erro MongoDB:", err));

// Rotas da API
app.use('/api/chamados', require('./routes/chamados'));
app.use('/api/alertas', require('./routes/alertas'));

// Rotas para páginas
app.get('/criarchamado', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/criar-chamados.html'));
});

app.get('/chamados', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/listar-chamados.html'));
});

app.get('/alertas', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/alertas.html'));
});

app.get('/admin-alertas', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/admin-alertas.html'));
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));