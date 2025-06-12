const Chamado = require('../models/Chamado');
const path = require('path');

exports.criarChamado = async (req, res) => {
  try {
    const { bairro, rua, relato } = req.body;
    
    const midia = req.file 
      ? `uploads/${path.basename(req.file.path)}` 
      : null;

    const novoChamado = new Chamado({
      bairro: bairro.trim(),
      rua: rua.trim(),
      relato: relato.trim(),
      midia
    });

    await novoChamado.save();

    res.status(201).json({ 
      success: true,
      data: novoChamado
    });

  } catch (err) {
    console.error('Erro detalhado:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Novo método para listar chamados
exports.listarChamados = async (req, res) => {
  try {
    const chamados = await Chamado.find().sort({ criadoEm: -1 });
    res.json({ success: true, data: chamados });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Novo método para atualizar status
exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pendente', 'atendido', 'nao-atendido'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Status inválido' });
    }

    const chamado = await Chamado.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!chamado) {
      return res.status(404).json({ success: false, error: 'Chamado não encontrado' });
    }

    res.json({ success: true, data: chamado });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};