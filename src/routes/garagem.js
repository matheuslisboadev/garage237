// src/routes/garagem.js
const express = require('express');
const Garagem = require('../models/Garagem');
const router = express.Router();

// Rota para listar todas as garagens
router.get('/', async (req, res) => {
  try {
    const garagens = await Garagem.find().populate('carros');
    res.json(garagens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para buscar uma garagem específica pelo ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const garagem = await Garagem.findById(id);
    if (!garagem) {
      return res.status(404).json({ message: 'Garagem não encontrada' });
    }
    res.json(garagem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar uma garagem pelo ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, localizacao } = req.body;

  try {
    const garagemAtualizada = await Garagem.findByIdAndUpdate(id, { nome, localizacao }, { new: true });
    res.json(garagemAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
