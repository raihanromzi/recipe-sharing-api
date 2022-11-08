const { validationResult } = require('express-validator');
const response = require('../utils/response');
const db = require('../config/db');

const postRecipe = (req, res) => {
  // if username not exist throw response error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(response.responseError('400 ', 'BAD_REQUEST', errors));
    return;
  }

  try {
    const { username } = req.params;
    const { title, description, cookTime, ingredients, stepByStep } = req.body;

    const query = `INSERT INTO Recipes (Username, Title, Description, Cook_Time, Ingredients, Step_By_Step)
                   VALUES ('${username}', '${title}', '${description}', '${cookTime}',
                           '${JSON.stringify(ingredients)}',
                           '${JSON.stringify(stepByStep)}')`;

    db.query(query, (err) => {
      if (err) {
        res
          .status(500)
          .send(response.responseError('500', 'SERVER ERROR', { err }));
      } else {
        res.status(201).send(
          response.responseSuccess(201, 'CREATED', {
            username,
            title,
            description,
            cookTime,
            ingredients,
            stepByStep,
          })
        );
      }
    });
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

const deleteRecipe = (req, res) => {
  // if username not exist throw response error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(response.responseError('400 ', 'BAD_REQUEST', errors));
    return;
  }

  try {
    const { username, recipeId } = req.params;
    const query = `DELETE
                   FROM Recipes
                   WHERE Username = '${username}'
                     AND RecipeID = '${recipeId}'`;
    db.query(query, (err) => {
      if (err) {
        res
          .status(500)
          .send(response.responseError('500', 'SERVER ERROR', { err }));
      } else {
        res
          .status(200)
          .send(response.responseSuccess('200', 'OK', 'Success Delete Recipe'));
      }
    });
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const query = `SELECT Username, Title, Description, Cook_Time, Ingredients, Step_By_Step
                   FROM Recipes`;

    const results = await db.promise().query(query);

    if (results[0].length === 0) {
      res
        .status(404)
        .send(response.responseError('404', ' NOT_FOUND', 'Recipe Not Found'));
      return;
    }

    res.status(200).send(response.responseSuccess('200', 'OK', results[0]));
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

const getAllRecipesUser = async (req, res) => {
  // if username not exist throw response error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(response.responseError('400 ', 'BAD_REQUEST', errors));
    return;
  }

  try {
    const { username } = req.params;

    const query = `SELECT *
                   FROM Recipes
                   WHERE Username = '${username}'`;

    const results = await db.promise().query(query);
    if (results[0].length === 0) {
      res
        .status(404)
        .send(response.responseError('404', ' NOT_FOUND', 'Recipe Not Found'));
      return;
    }

    res.status(200).send(response.responseSuccess('200', 'OK', results[0]));
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

const getSpecificRecipeUser = async (req, res) => {
  // if username not exist throw response error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(response.responseError('400 ', 'BAD_REQUEST', errors));
    return;
  }

  try {
    const { username, recipeId } = req.params;

    const query = `SELECT *
                   FROM Recipes
                   WHERE Username = '${username}'
                     AND RecipeID = '${recipeId}'`;

    const results = await db.promise().query(query);
    if (results[0].length === 0) {
      res
        .status(404)
        .send(response.responseError('404', ' NOT_FOUND', 'Recipe Not Found'));
      return;
    }

    res.status(200).send(response.responseSuccess('200', 'OK', results[0]));
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

const putRecipe = (req, res) => {
  // if username not exist throw response error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(response.responseError('400 ', 'BAD_REQUEST', errors));
    return;
  }

  try {
    const { username, recipeId } = req.params;
    const { title, description, cookTime, ingredients, stepByStep } = req.body;

    const query = `UPDATE Recipes
                   SET Title='${title}',
                       Description='${description}',
                       Cook_Time=${cookTime},
                       Ingredients='${JSON.stringify(ingredients)}',
                       Step_By_Step='${JSON.stringify(stepByStep)}'
                   WHERE Username = '${username}'
                     AND RecipeID = '${recipeId}'`;

    db.query(query, (err) => {
      if (err) {
        res
          .status(500)
          .send(response.responseError('500', 'SERVER ERROR', { err }));
      } else {
        res
          .status(200)
          .send(response.responseSuccess('200', 'OK', 'Recipe updated'));
      }
    });
  } catch (e) {
    res.send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

module.exports = {
  postRecipe,
  deleteRecipe,
  getAllRecipes,
  getAllRecipesUser,
  getSpecificRecipeUser,
  putRecipe,
};
