const express = require('express');
const { param } = require('express-validator');
const response = require('../../utils/response');
const db = require('../../config/db');

const router = express.Router();

module.exports = router.get(
  '/users/:username/recipes',
  param('username').custom(async (username) => {
    const query = `SELECT COUNT(*)
                   FROM Registered_User
                   WHERE Username = '${username}'`;
    const existingUsername = await db.promise().query(query);
    if (existingUsername[0].length === 0) {
      throw new Error('User Not Found');
    }
  }),
  async (req, res) => {
    try {
      const { username } = req.params;
      const query = `SELECT *
                     FROM Recipe
                     WHERE Username = '${username}'`;
      const results = await db.promise().query(query);
      if (results[0].length === 0) {
        res
          .status(404)
          .send(response.responseError('404', ' NOT_FOUND', 'User Not Found'));
        return;
      }

      res.status(200).send(response.responseSuccess('200', 'OK', results[0]));
    } catch (e) {
      res.status(500).send(response.responseError('500', 'SERVER ERROR', e));
    }
  },
);
