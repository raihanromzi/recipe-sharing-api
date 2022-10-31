const express = require('express');
const { param, validationResult } = require('express-validator');
const db = require('../../config/db');
const response = require('../../utils/response');

const router = express.Router();
module.exports = router.delete(
  '/users/:username/recipes/:recipeId',

  // Check is username exist in db
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Registered_User
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
                     FROM Recipe
                     WHERE RecipeID = '${recipeId}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Recipe Not Found');
      }
    }),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res
        .status(400)
        .send(response.responseError('400 ', 'BAD_REQUEST', errors));
      return;
    }

    try {
      const { username, recipeId } = req.params;
      const query = `DELETE
                     FROM Recipe
                     WHERE Username = '${username}'
                       AND RecipeID = '${recipeId}'`;
      db.query(query, (err) => {
        if (err) {
          res
            .status(500)
            .send(response.responseError(500, 'SERVER ERROR', { err }));
          return;
        }
        res
          .status(200)
          .send(response.responseSuccess('200', 'OK', 'Success Delete Recipe'));
      });
    } catch (e) {
      res
        .status(500)
        .send(response.responseError('500', 'SERVER ERROR', { e }));
    }
  },
);
