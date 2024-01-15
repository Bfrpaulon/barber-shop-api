const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

// Rota para obter todos os barbeiros
router.get('/barbers', async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para obter um barbeiro específico
router.get('/barbers/:id', async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id);
    res.json(barber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para adicionar um novo barbeiro
router.post('/barbers', async (req, res) => {
  const newBarber = new Barber(req.body);
  try {
    const savedBarber = await newBarber.save();
    res.status(201).json(savedBarber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para atualizar um barbeiro
router.put('/barbers/:id', async (req, res) => {
  try {
    const updatedBarber = await Barber.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBarber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para excluir um barbeiro
router.delete('/barbers/:id', async (req, res) => {
  try {
    const deletedBarber = await Barber.findByIdAndDelete(req.params.id);
    res.json(deletedBarber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
