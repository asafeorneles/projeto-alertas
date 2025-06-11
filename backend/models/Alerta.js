const mongoose = require('mongoose');

const AlertaSchema = new mongoose.Schema({
  tipo: { 
    type: String,
    required: true,
    enum: ['deslizamento', 'rachadura', 'desabamento', 'outros']
  },
  localizacao: {
    bairro: { type: String, required: true },
    rua: { type: String }
  },
  descricao: { type: String, required: true },
  gravidade: { type: String, enum: ['baixa', 'media', 'alta'], default: 'media' },
  criadoEm: { type: Date, default: Date.now },
  fonte: { type: String, enum: ['manual', 'api'], required: true }
});

module.exports = mongoose.model('Alerta', AlertaSchema);