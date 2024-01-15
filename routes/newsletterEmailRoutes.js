const express = require('express');
const router = express.Router();
const NewsletterEmail = require('../models/NewsletterEmail');

// Rota para adicionar um novo e-mail à newsletter
router.post('/newsletter', async (req, res) => {
    const { email } = req.body;

    try {
        const newEmail = new NewsletterEmail({ email });
        const savedEmail = await newEmail.save();
        res.status(201).json(savedEmail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para obter todos os e-mails da newsletter
router.get('/newsletter', async (req, res) => {
    try {
        const emails = await NewsletterEmail.find();
        res.json(emails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter um e-mail específico da newsletter
router.get('/newsletter/:email', async (req, res) => {
    try {
        const email = await NewsletterEmail.findOne({ email: req.params.email });
        res.json(email);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
