const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota de autenticação
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB!"))
  .catch(err => console.log("❌ Erro MongoDB:", err));

// API protegidas
app.use('/api/chamados', require('./routes/chamados'));
app.use('/api/alertas', require('./routes/alertas'));

// Arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));

// Páginas públicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/criarchamado', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/criar-chamados.html'));
});

app.get('/chamados', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/listar-chamados.html'));
});

app.get('/alertas', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/alertas.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/login.html'));
});

app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/admin-dashboard.html'));
});

app.get('/admin-alertas', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/admin-alertas.html'));
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
