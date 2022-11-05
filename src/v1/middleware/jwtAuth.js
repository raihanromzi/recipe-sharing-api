const express = require('express');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const app = express();

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    res
      .status(401)
      .send(response.responseError(401, 'UNAUTHORIZED', 'Access Denied'));
    return;
  }

  // Verify JWT
  jwt.verify(token, process.env.ACCESS_KEY, (err) => {
    if (err) {
      res
        .status(403)
        .send(response.responseError(403, 'FORBIDDEN', 'Access Denied'));
    } else {
      next();
    }
  });
});

module.exports = app;
