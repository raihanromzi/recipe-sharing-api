const express = require('express');
const { body, validationResult } = require('express-validator');
const response = require('../utils/response');
const db = require('../config/db');

const app = express();

module.exports = app.use(
  body('username')
    .exists()
    .isLength({ min: 3, max: 16 })
    .isString()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Users
                     WHERE Username = '${username}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] !== 0) {
        throw new Error('Username already in use');
      }
    }),
  body('email')
    .exists()
    .isString()
    .isEmail()
    .normalizeEmail()
    .custom(async (email) => {
      const query = `SELECT COUNT(*)
                     FROM Users
                     WHERE Email = '${email}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] !== 0) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .exists()
    .isLength({
      min: 5,
      max: 16,
    })
    .isString(),
  body('firstName').exists().isLength({ min: 3, max: 20 }).isString(),
  body('lastName')
    .exists()
    .isLength({
      min: 3,
      max: 20,
    })
    .isString(),
  body('address')
    .exists()
    .isLength({
      min: 3,
      max: 50,
    })
    .isString(),
  body('bio')
    .optional({ checkFalsy: true })
    .isLength({ min: 0, max: 255 })
    .isString(),
  body('phoneNumber')
    .exists()
    .isLength({
      min: 12,
      max: 15,
    })
    .isString(),
  (req, res, next) => {
    const errors = validationResult(req);

    // If Bio not exist then assign to empty string
    if (req.body.bio === undefined) {
      req.body.bio = '';
    }

    // If error in body request
    if (!errors.isEmpty()) {
      res
        .status(400)
        .send(response.responseError('400 ', 'BAD_REQUEST', errors));
      return;
    }
    next();
  }
);
