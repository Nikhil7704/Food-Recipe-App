const express = require("express");
const Recipe = require("../models/recipes");
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Add a new recipe
router.post("/add", [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('ingredients').isArray().withMessage('Ingredients must be an array'),
  body('steps').isArray().withMessage('Steps must be an array'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, ingredients, steps, user } = req.body;
    const newRecipe = new Recipe({ title, description, ingredients, steps, user });
    await newRecipe.save();

    res.status(201).json({ message: "Recipe added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "name email");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific recipe
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("user", "name email");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
