const express = require('express');
const router = express.Router();
const Haircut = require('../models/Haircut');

// Rota para obter todos os cortes de cabelo
router.get('/haircuts', async (req, res) => {
  try {
    const haircuts = await Haircut.find();
    res.json(haircuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para obter um corte de cabelo específico
router.get('/haircuts/:id', async (req, res) => {
  try {
    const haircut = await Haircut.findById(req.params.id);
    res.json(haircut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para adicionar um novo corte de cabelo
router.post('/haircuts', async (req, res) => {
  const newHaircut = new Haircut(req.body);
  try {
    const savedHaircut = await newHaircut.save();
    res.status(201).json(savedHaircut);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para atualizar um corte de cabelo
router.put('/haircuts/:id', async (req, res) => {
  try {
    const updatedHaircut = await Haircut.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHaircut);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para excluir um corte de cabelo
router.delete('/haircuts/:id', async (req, res) => {
  try {
    const deletedHaircut = await Haircut.findByIdAndDelete(req.params.id);
    res.json(deletedHaircut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
