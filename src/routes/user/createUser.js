const express = require('express');
const response = require('../../utils/response');
const userValidator = require('../../middleware/createUserValidator');
const db = require('../../config/db');

const router = express.Router();
module.exports = router.post('/users', userValidator, (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      address,
      bio,
      phoneNumber,
    } = req.body;

    const query = `INSERT INTO Registered_User (Username, Password, FirstName, LastName, Address, Bio, Phone_Number)
                   VALUES ('${username}', '${password}', '${firstName}', '${lastName}', '${address}', '${bio}',
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
    res
      .status(500)
      .send(
        response.responseError(
          '500',
          'SERVER ERROR',
          'Please Wait Server Error',
        ),
      );
  }
});
