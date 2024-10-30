const mongoose = require('mongoose');

const CarroSchema = new mongoose.Schema({
  modelo: String,
  marca: String,
  ano: Number,
  cor: String,
  placa: String,
  imagemUrl: String,
  garagemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Garagem' }
});

module.exports = mongoose.model('Carro', CarroSchema);
