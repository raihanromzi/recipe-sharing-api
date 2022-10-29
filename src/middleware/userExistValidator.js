const express = require('express');
const { param, validationResult } = require('express-validator');
const db = require('../config/db');
const response = require('../utils/response');

const app = express();
module.exports = app.use(
  param('username').custom(async (username) => {
    const query = `SELECT *
                   FROM Registered_User
                   WHERE Username = '${username}'`;
    const existingUsername = await db.promise().query(query);
    if (existingUsername[0].length !== 0) {
      throw new Error('User Not Found');
    }
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .send(response.responseError('400 ', 'BAD_REQUEST', errors));
      return;
    }
    next();
  },
);
