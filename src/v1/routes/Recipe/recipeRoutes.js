const express = require('express');
const { param } = require('express-validator');
const recipeController = require('../../controllers/recipeController');
const recipeValidator = require('../../middleware/recipeValidator');
const db = require('../../config/db');

const router = express.Router();

// Create New Recipe
router.post(
  '/users/:username/recipes',
  recipeValidator,

  // Check is username exist in db
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Users
                     WHERE Username = '${username}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Username Not Found');
      }
    }),

  recipeController.postRecipe
);

// Delete Recipe
router.delete(
  '/users/:username/recipes/:recipeId',

  // Check is username exist in db
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Users
                     WHERE Username = '${username}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Username Not Found');
      }
    }),

  // Check is recipe exist in db
  param('recipeId')
    .exists()
    .custom(async (recipeId) => {
      const query = `SELECT COUNT(*)
                     FROM Recipes
                     WHERE RecipeID = '${recipeId}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Recipe Not Found');
      }
    }),

  recipeController.deleteRecipe
);

// Get All Recipes
router.get('/recipes', recipeController.getAllRecipes);

// Get All Recipes User
router.get(
  '/users/:username/recipes',

  // Check is username exist in db
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Users
                     WHERE Username = '${username}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Username Not Found');
      }
    }),

  recipeController.getAllRecipesUser
);

// Get Specific Recipe
router.get(
  '/users/:username/recipes/:recipeId',

  // Check is username exist in db
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Users
                     WHERE Username = '${username}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Username Not Found');
      }
    }),

  // Check is recipe exist in db
  param('recipeId')
    .exists()
    .custom(async (recipeId) => {
      const query = `SELECT COUNT(*)
                     FROM Recipes
                     WHERE RecipeID = '${recipeId}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Recipe Not Found');
      }
    }),

  recipeController.getSpecificRecipeUser
);

// Update Recipe
router.put(
  '/users/:username/recipes/:recipeId',
  recipeValidator,

  // Check is username exist in db
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Users
                     WHERE Username = '${username}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Username Not Found');
      }
    }),

  // Check is recipe exist in db
  param('recipeId')
    .exists()
    .custom(async (recipeId) => {
      const query = `SELECT COUNT(*)
                     FROM Recipes
                     WHERE RecipeID = '${recipeId}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Recipe Not Found');
      }
    }),

  recipeController.putRecipe
);

module.exports = router;
