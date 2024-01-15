const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForm');

// Rota para enviar um formulário de contato
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContactForm = new ContactForm({ name, email, subject, message });
    const savedForm = await newContactForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para obter todos os formulários de contato
router.get('/contact', async (req, res) => {
  try {
    const forms = await ContactForm.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para obter um formulário de contato específico por ID
router.get('/contact/:id', async (req, res) => {
  try {
    const form = await ContactForm.findById(req.params.id);
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para atualizar um formulário de contato por ID
router.put('/contact/:id', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const updatedForm = await ContactForm.findByIdAndUpdate(
      req.params.id,
      { name, email, subject, message },
      { new: true } // Retorna o documento atualizado
    );

    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para excluir um formulário de contato por ID
router.delete('/contact/:id', async (req, res) => {
  try {
    await ContactForm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Formulário de contato excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
