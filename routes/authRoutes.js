const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');

// Rota para criar a conta do gerente
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const manager = new Manager({ username, password });
    const savedManager = await manager.save();
    res.status(201).json(savedManager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para autenticar o gerente
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const manager = await Manager.findOne({ username });
    if (!manager) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isValidPassword = await manager.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gera o token de autenticação
    const token = jwt.sign({ id: manager._id }, 'secretpassword');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
