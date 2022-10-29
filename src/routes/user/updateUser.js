const express = require('express');
const userExist = require('../../middleware/userExistValidator');
const response = require('../../utils/response');
const userUpdateValidator = require('../../middleware/userUpdateValidator');
const db = require('../../config/db');

const router = express.Router();

module.exports = router.put(
  '/users/:username',
  userExist,
  userUpdateValidator,
  async (req, res) => {
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
