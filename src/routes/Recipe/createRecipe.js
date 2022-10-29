const express = require('express');
const { param } = require('express-validator');
const response = require('../../utils/response');
const recipeValidator = require('../../middleware/recipeValidator');
const db = require('../../config/db');

const router = express.Router();
module.exports = router.post(
  '/users/:username/recipes',
  recipeValidator,
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT *
                   FROM Registered_User
                   WHERE Username = '${username}'`;
      const existingEmail = await db.promise().query(query);
      if (existingEmail[0].length === 0) {
        throw new Error('username not in exist');
      }
    }),
  (req, res) => {
    try {
      const { username } = req.params;
      const { title, description, cookTime, ingredients, stepByStep } =
        req.body;
      const query = `INSERT INTO Recipe (Username, Title, Description, Cook_Time, Ingredients, Step_By_Step)
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
        .send(
          response.responseError(
            '500',
            'SERVER ERROR',
            'Please Wait Server Error',
          ),
        );
    }
  },
);
