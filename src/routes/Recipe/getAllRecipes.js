const express = require('express');
const response = require('../../utils/response');
const db = require('../../config/db');

const router = express.Router();
module.exports = router.get('/recipes', async (req, res) => {
  try {
    const query = `SELECT Username, Title, Description, Cook_Time, Ingredients, Step_By_Step
                   FROM Recipes`;

    const results = await db.promise().query(query);

    if (results[0].length === 0) {
      res
        .status(404)
        .send(response.responseError('404', ' NOT_FOUND', 'Recipe Not Found'));
      return;
    }

    res.status(200).send(response.responseSuccess('200', 'OK', results[0]));
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
});
