const express = require('express');
const db = require('../../config/db');
const response = require('../../utils/response');

const router = express.Router();
module.exports = router.get('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const query = `SELECT Username, Email, Firstname, Lastname, Address, Bio
                   FROM Registered_User
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
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
});
