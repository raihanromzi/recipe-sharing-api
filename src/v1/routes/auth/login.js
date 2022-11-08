require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const response = require('../../utils/response');

const router = express.Router();

router.get('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
      res
        .status(400)
        .send(
          response.responseError(
            400,
            'BAD_REQUEST',
            'Invalid Username or Password!'
          )
        );
    } else if (
      username !== process.env.USERNAME_ADMIN ||
      password !== process.env.PASSWORD_ADMIN
    ) {
      res
        .status(400)
        .send(
          response.responseError(
            400,
            'BAD_REQUEST',
            'Invalid Username or Password!'
          )
        );
    }

    // Authenticate User
    const payload = { username, password };
    const accessToken = jwt.sign(payload, process.env.ACCESS_KEY);
    res.json({ accessToken });
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER_ERROR', { e }));
  }
});

module.exports = router;
