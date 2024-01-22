const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// GET All Categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Specific Category
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST New Category
router.post('/categories', async (req, res) => {
  const category = new Category({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    icon: req.body.icon,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT Update Category
router.put('/categories/:id', async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
  
      if (category) {
        category.title = req.body.title || category.title;
        category.description = req.body.description || category.description;
        category.price = req.body.price || category.price;
        category.icon = req.body.icon || category.icon;
  
        const updatedCategory = await category.save();
        res.json(updatedCategory);
      } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // DELETE Category
  router.delete('/categories/:id', async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndRemove(req.params.id);
  
      if (deletedCategory) {
        res.json({ message: 'Categoria removida com sucesso' });
      } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;
