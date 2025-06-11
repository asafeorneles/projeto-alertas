const Chamado = require('../models/Chamado');

const path = require('path');

exports.criarChamado = async (req, res) => {
  try {
    const { bairro, rua, relato } = req.body;
    
    // Debug: verifique se o modelo foi carregado
    console.log('Modelo Chamado:', Chamado); 

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