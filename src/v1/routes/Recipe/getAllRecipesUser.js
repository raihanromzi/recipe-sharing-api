const express = require('express');
const { param, validationResult } = require('express-validator');
const response = require('../../utils/response');
const db = require('../../config/db');

const router = express.Router();

module.exports = router.get(
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

  async (req, res) => {
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

      const query = `SELECT *
                     FROM Recipes
                     WHERE Username = '${username}'`;

      const results = await db.promise().query(query);
      if (results[0].length === 0) {
        res
          .status(404)
          .send(
            response.responseError('404', ' NOT_FOUND', 'Recipe Not Found')
          );
        return;
      }

      res.status(200).send(response.responseSuccess('200', 'OK', results[0]));
    } catch (e) {
      res
        .status(500)
        .send(response.responseError('500', 'SERVER ERROR', { e }));
    }
  }
);
