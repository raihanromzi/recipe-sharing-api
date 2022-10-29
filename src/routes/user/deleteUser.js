const express = require('express');
const { param, validationResult } = require('express-validator');
const response = require('../../utils/response');
const db = require('../../config/db');

const route = express.Router();
module.exports = route.delete(
  '/users/:username',
  param('username').custom(async (username) => {
    const query = `SELECT *
                   FROM Registered_User
                   WHERE Username = '${username}'`;
    const existingUsername = await db.promise().query(query);
    console.log(existingUsername[0]);
    if (existingUsername[0].length === 0) {
      throw new Error('User Not Found');
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
      const { username } = req.params;
      const query = `DELETE
                     FROM Registered_User
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
          .send(
            response.responseSuccess('200', 'OK', 'Success Delete Merchant'),
          );
      });
    } catch (e) {
      res
        .status(500)
        .send(response.responseError('500', 'SERVER ERROR', { e }));
    }
  },
);
