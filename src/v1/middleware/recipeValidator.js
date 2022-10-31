const express = require('express');
const { body, validationResult } = require('express-validator');
const response = require('../utils/response');

const app = express();
module.exports = app.use(
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

    // If error in body request
    if (!errors.isEmpty()) {
      res
        .status(400)
        .send(response.responseError('400 ', 'BAD_REQUEST', errors));
      return;
    }
    next();
  },
);
