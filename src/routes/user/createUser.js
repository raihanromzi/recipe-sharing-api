const express = require('express');
const response = require('../../utils/response');
const userValidator = require('../../middleware/userValidator');
const db = require('../../config/db');

const router = express.Router();
module.exports = router.post('/users', userValidator, (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      address,
      bio,
      phoneNumber,
    } = req.body;

    const query = `INSERT INTO Registered_User (Username, Email, Password, FirstName, LastName, Address, Bio,
                                                Phone_Number)
                   VALUES ('${username}', '${email}', '${password}', '${firstName}', '${lastName}', '${address}',
                           '${bio}',
                           '${phoneNumber}')`;
    db.query(query, (err) => {
      if (err) {
        res
          .status(500)
          .send(response.responseError(500, 'SERVER ERROR', { err }));
      } else {
        res.status(201).send(
          response.responseSuccess(201, 'CREATED', {
            username,
            email,
            password,
            firstName,
            lastName,
            address,
            bio,
            phoneNumber,
          }),
        );
      }
    });
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', e));
  }
});
