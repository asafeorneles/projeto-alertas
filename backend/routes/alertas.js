const express = require('express');
const router = express.Router();
const alertasController = require('../controllers/alertasController');

// Criar alerta
router.post('/', alertasController.criarAlerta);

// Listar alertas (com filtro opcional por gravidade)
router.get('/', alertasController.listarAlertas);

// Atualizar alerta (opcional)
router.put('/:id', alertasController.atualizarAlerta);

// Deletar alerta (opcional)
router.delete('/:id', alertasController.deletarAlerta);

module.exports = router;