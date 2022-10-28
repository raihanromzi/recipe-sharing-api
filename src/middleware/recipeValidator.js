const express = require('express');
const { param, body, validationResult } = require('express-validator');
const response = require('../utils/response');
const db = require('../config/db');

const app = express();
module.exports = app.use(
  param('username').custom(async (username) => {
    const query = `SELECT *
                   FROM Registered_User
                   WHERE Username = '${username}'`;
    const existingEmail = await db.promise().query(query);
    if (existingEmail[0].length !== 0) {
      throw new Error('username not in exist');
    }
  }),
  body('title').exists().isString().isLength({
    min: 5,
    max: 50,
  }),
  body('description').exists().isString().isLength({
    min: 10,
    max: 300,
  }),
  body('cookTime').exists().isNumeric().isLength({
    min: 1,
    max: 24,
  }),
  body('ingredients').exists().isObject(),
  body('stepByStep').exists().isObject(),
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
