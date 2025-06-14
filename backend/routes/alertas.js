const express = require('express');
const router = express.Router();
const alertasController = require('../controllers/alertasController');
const autenticar = require('../middlewares/auth'); // Middleware de autenticação

// Criar alerta (proteção aplicada)
router.post('/', autenticar, alertasController.criarAlerta);

// Listar alertas (rota pública com filtro opcional)
router.get('/', alertasController.listarAlertas);

// Atualizar alerta (protegida)
router.put('/:id', autenticar, alertasController.atualizarAlerta);

// Deletar alerta (protegida)
router.delete('/:id', autenticar, alertasController.deletarAlerta);

module.exports = router;
