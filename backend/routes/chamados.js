const express = require('express');
const router = express.Router();
const chamadosController = require('../controllers/chamadosController');
const upload = require('../config/multer');

router.post('/', upload.single('midia'), chamadosController.criarChamado);
router.get('/', chamadosController.listarChamados);
router.patch('/:id/status', chamadosController.atualizarStatus);

module.exports = router;