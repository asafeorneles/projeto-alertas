const mongoose = require('mongoose');

const ChamadoSchema = new mongoose.Schema({
  bairro: { type: String, required: true },
  rua: { type: String, required: true },
  relato: { type: String, required: true },
  midia: { type: String },
  status: { type: String, default: 'pendente' },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chamado', ChamadoSchema);