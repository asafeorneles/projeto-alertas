const express = require('express');
const router = express.Router();
const chamadosController = require('../controllers/chamadosController');
const upload = require('../config/multer');

// Rota para criar denúncia (com upload de mídia)
router.post('/', upload.single('midia'), chamadosController.criarChamado);

// Nova rota para listar chamados
router.get('/', chamadosController.listarChamados);

// Nova rota para atualizar status do chamado
router.patch('/:id/status', chamadosController.atualizarStatus);

module.exports = router;