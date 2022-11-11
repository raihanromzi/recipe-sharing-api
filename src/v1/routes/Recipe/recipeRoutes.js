const express = require('express');
const recipeController = require('../../controllers/recipeController');
const recipeValidator = require('../../middleware/recipeValidator');

const router = express.Router();

// Create New Recipe
router.post(
  '/users/:username/recipes',
  recipeValidator,
  recipeController.postRecipe
);

// Delete Recipe
router.delete(
  '/users/:username/recipes/:recipeId',
  recipeController.deleteRecipe
);

// Get All Recipes
router.get('/recipes', recipeController.getAllRecipes);

// Get All Recipes User
router.get('/users/:username/recipes', recipeController.getAllRecipesUser);

// Get Specific Recipe
router.get(
  '/users/:username/recipes/:recipeId',

  recipeController.getSpecificRecipeUser
);

// Update Recipe
router.put(
  '/users/:username/recipes/:recipeId',
  recipeValidator,

  recipeController.putRecipe
);

module.exports = router;
