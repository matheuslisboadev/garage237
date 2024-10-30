const mongoose = require('mongoose');

const GaragemSchema = new mongoose.Schema({
  nome: String,
  localizacao: String,
  carros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carro' }]
});

module.exports = mongoose.model('Garagem', GaragemSchema);