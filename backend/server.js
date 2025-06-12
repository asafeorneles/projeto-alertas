const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const basicAuth = require('express-basic-auth');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB!"))
  .catch(err => console.log("❌ Erro MongoDB:", err));

// Configuração de autenticação básica
const authMiddleware = basicAuth({
  users: { 
    [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD 
  },
  challenge: true,
  unauthorizedResponse: 'Acesso não autorizado'
});

// Adicione esta configuração de CORS antes das rotas:
app.use(cors({
  origin: 'http://localhost:' + (process.env.PORT || 5000),
  credentials: true
}));

// Modifique a rota /login para processar o login:
app.post('/api/login', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Credenciais necessárias' });
  }
  
  // Verifica as credenciais (simplificado para exemplo)
  if (authHeader === 'Basic ' + Buffer.from(process.env.ADMIN_USER + ':' + process.env.ADMIN_PASSWORD).toString('base64')) {
    return res.json({ success: true });
  }
  
  res.status(401).json({ error: 'Credenciais inválidas' });
});

// Rotas da API
app.use('/api/chamados', require('./routes/chamados'));

app.use('/api/alertas', require('./routes/alertas'));

// Rotas para páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/criarchamado', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/criar-chamados.html'));
});

app.get('/alertas', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/alertas.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/login.html'));
});

// Rota admin protegida
app.get('/admin-alertas', authMiddleware, (req, res) => {
  console.log('Acesso autorizado para:', req.auth.user);
  res.sendFile(path.join(__dirname, '../frontend/pages/admin-alertas.html'));
});


// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));