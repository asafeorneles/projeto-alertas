const express = require('express');
const router = express.Router();
const Alerta = require('../models/Alerta');

// Criar alerta (admin)
router.post('/', async (req, res) => {
  try {
    const novoAlerta = new Alerta({ ...req.body, fonte: 'manual' });
    await novoAlerta.save();
    res.status(201).json({ success: true, data: novoAlerta });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Listar alertas (público)
router.get('/', async (req, res) => {
  try {
    const alertas = await Alerta.find().sort({ criadoEm: -1 });
    res.json({ success: true, data: alertas });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;