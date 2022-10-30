const express = require('express');
const { param, validationResult } = require('express-validator');
const response = require('../../utils/response');
const userUpdateValidator = require('../../middleware/userUpdateValidator');
const db = require('../../config/db');

const router = express.Router();

module.exports = router.put(
  '/users/:username',
  userUpdateValidator,

  // Check is username exist in db
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Registered_User
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
