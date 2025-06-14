const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
}, { versionKey: false });

// Criptografar senha antes de salvar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Verifica senha no login
UserSchema.methods.compararSenha = function (senhaInserida) {
  return bcrypt.compare(senhaInserida, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
