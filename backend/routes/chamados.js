const express = require('express');
const router = express.Router();
const chamadosController = require('../controllers/chamadosController');
const upload = require('../config/multer');

// Rota para criar denúncia (com upload de mídia)
router.post('/', upload.single('midia'), chamadosController.criarChamado);

module.exports = router;