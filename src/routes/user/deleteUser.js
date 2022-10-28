const express = require('express');
const { validationResult } = require('express-validator');
const response = require('../../utils/response');
const db = require('../../config/db');

const route = express.Router();
module.exports = route.delete('/users/:username', (req, res) => {
  try {
    const { username } = req.params;
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', e));
  }
});
