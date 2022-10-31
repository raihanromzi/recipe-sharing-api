const express = require('express');
const { param, validationResult } = require('express-validator');
const response = require('../../utils/response');
const db = require('../../config/db');

const route = express.Router();
module.exports = route.delete(
  '/users/:username',

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

      const query = `DELETE
                     FROM Users
                     WHERE Username = '${username}'`;

      db.query(query, (err) => {
        if (err) {
          res
            .status(500)
            .send(response.responseError(500, 'SERVER ERROR', { err }));
          return;
        }
        res
          .status(200)
          .send(response.responseSuccess('200', 'OK', 'Success Delete User'));
      });
    } catch (e) {
      res
        .status(500)
        .send(response.responseError('500', 'SERVER ERROR', { e }));
    }
  },
);
