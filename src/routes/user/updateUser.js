const express = require('express');
const { param, validationResult } = require('express-validator');
const response = require('../../utils/response');
const userUpdateValidator = require('../../middleware/userUpdateValidator');
const db = require('../../config/db');

const router = express.Router();

module.exports = router.put(
  '/users/:username',
  param('username').custom(async (username) => {
    const query = `SELECT *
                   FROM Registered_User
                   WHERE Username = '${username}'`;
    const existingUsername = await db.promise().query(query);
    if (existingUsername[0].length === 0) {
      throw new Error('User Not Found');
    }
  }),
  userUpdateValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .send(response.responseError('400 ', 'BAD_REQUEST', errors));
      return;
    }
    try {
      const { username } = req.params;
      const { firstName, lastName, address, bio, phoneNumber } = req.body;
      const query = `UPDATE Registered_User
                     SET Firstname='${firstName}',
                         Lastname='${lastName}',
                         Address='${address}',
                         Bio='${bio}',
                         Phone_Number='${phoneNumber}'
                     WHERE Username = '${username}'`;
      db.query(query, (err) => {
        if (err) {
          res
            .status(500)
            .send(response.responseError('500', 'SERVER ERROR', { err }));
        }
        res
          .status(200)
          .send(response.responseSuccess('200', 'OK', 'User updated'));
      });
    } catch (e) {
      res
        .status(500)
        .send(response.responseError('500', 'SERVER ERROR', { e }));
    }
  },
);
