const express = require('express');
const userExist = require('../../middleware/userExistValidator');
const response = require('../../utils/response');
const db = require('../../config/db');

const route = express.Router();
module.exports = route.delete('/users/:username', userExist, (req, res) => {
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
        .send(response.responseSuccess('200', 'OK', 'Success Delete Merchant'));
    });
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
});
