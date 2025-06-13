const Alerta = require('../models/Alerta');

// Criar novo alerta
exports.criarAlerta = async (req, res) => {
  try {
    const { tipo, localizacao, descricao, gravidade } = req.body;
    
    // Validação básica
    if (!tipo || !localizacao?.bairro || !descricao) {
      return res.status(400).json({ 
        success: false, 
        error: 'Campos obrigatórios faltando: tipo, localizacao.bairro, descricao' 
      });
    }

    const novoAlerta = new Alerta({
      tipo,
      localizacao: {
        bairro: localizacao.bairro.trim(),
        rua: localizacao.rua?.trim() || ''
      },
      descricao: descricao.trim(),
      gravidade: gravidade || 'media',
      fonte: 'manual'
    });

    await novoAlerta.save();
    
    res.status(201).json({ 
      success: true, 
      data: novoAlerta 
    });

  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Listar todos os alertas
exports.listarAlertas = async (req, res) => {
  try {
    const { gravidade } = req.query;
    
    const filtro = {};
    if (gravidade) filtro.gravidade = gravidade;

    const alertas = await Alerta.find(filtro).sort({ criadoEm: -1 });
    
    res.json({ 
      success: true, 
      data: alertas 
    });

  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Atualizar alerta (opcional)
exports.atualizarAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacao = req.body;

    const alertaAtualizado = await Alerta.findByIdAndUpdate(
      id,
      atualizacao,
      { new: true, runValidators: true }
    );

    if (!alertaAtualizado) {
      return res.status(404).json({ 
        success: false, 
        error: 'Alerta não encontrado' 
      });
    }

    res.json({ 
      success: true, 
      data: alertaAtualizado 
    });

  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Deletar alerta (opcional)
exports.deletarAlerta = async (req, res) => {
  try {
    const { id } = req.params;

    const alertaDeletado = await Alerta.findByIdAndDelete(id);

    if (!alertaDeletado) {
      return res.status(404).json({ 
        success: false, 
        error: 'Alerta não encontrado' 
      });
    }

    res.json({ 
      success: true, 
      data: alertaDeletado 
    });

  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};