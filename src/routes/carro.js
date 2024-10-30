const express = require('express');
const Carro = require('../models/Carro');
const Garagem = require('../models/Garagem');
const router = express.Router();

// Listar todos os carros
router.get('/', async (req, res) => {
  try {
    const carros = await Carro.find();
    res.json(carros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cadastrar um novo carro
router.post('/', async (req, res) => {
  const { modelo, marca, ano, cor, placa, garagemId, imagemUrl } = req.body;
  try {
    const novoCarro = new Carro({ modelo, marca, ano, cor, placa, garagemId, imagemUrl });
    await novoCarro.save();

    // Adicionar o carro à garagem
    if (garagemId) {
      const garagem = await Garagem.findById(garagemId);
      garagem.carros.push(novoCarro._id);
      await garagem.save();
    }

    res.status(201).json(novoCarro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar informações de um carro
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {  modelo, marca, ano, cor, placa, garagemId, imagemUrl } = req.body;
  try {
    const carro = await Carro.findByIdAndUpdate(id, { modelo, marca, ano, cor, placa, garagemId, imagemUrl }, { new: true });

    if (garagemId) {
      const garagem = await Garagem.findById(garagemId);
      garagem.carros.push(carro._id);
      await garagem.save();
    }

    res.json(carro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const carro = await Carro.findByIdAndDelete(id);
    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    res.json({ message: 'Carro excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;