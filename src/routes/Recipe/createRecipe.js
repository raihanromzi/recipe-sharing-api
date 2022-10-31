const express = require('express');
const { param, validationResult } = require('express-validator');
const response = require('../../utils/response');
const recipeValidator = require('../../middleware/recipeValidator');
const db = require('../../config/db');

const router = express.Router();
module.exports = router.post(
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

  (req, res) => {
    // if username not exist throw response error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res
        .status(400)
        .send(response.responseError('400 ', 'BAD_REQUEST', errors));
      return;
    }

    try {
      const { username } = req.params;
      const { title, description, cookTime, ingredients, stepByStep } =
        req.body;

      const query = `INSERT INTO Recipes (Username, Title, Description, Cook_Time, Ingredients, Step_By_Step)
                     VALUES ('${username}', '${title}', '${description}', '${cookTime}',
                             '${JSON.stringify(ingredients)}',
                             '${JSON.stringify(stepByStep)}')`;

      db.query(query, (err) => {
        if (err) {
          res
            .status(500)
            .send(response.responseError(500, 'SERVER ERROR', { err }));
        } else {
          res.status(201).send(
            response.responseSuccess(201, 'CREATED', {
              username,
              title,
              description,
              cookTime,
              ingredients,
              stepByStep,
            }),
          );
        }
      });
    } catch (e) {
      res
        .status(500)
        .send(response.responseError('500', 'SERVER ERROR', { e }));
    }
  },
);
