const bcrypt = require('bcrypt');
const response = require('../utils/response');
const db = require('../config/db');

const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    const queryUsername = `SELECT *
                           FROM Users
                           WHERE Username = '${username}'`;

    const result = await db.promise().query(queryUsername);

    if (result[0].length === 0) {
      res
        .status(404)
        .send(
          response.responseError('404', ' NOT_FOUND', 'Username Not Found')
        );
      return;
    }

    const queryDeleteUser = `DELETE
                             FROM Users
                             WHERE Username = '${username}'`;

    const queryDeleteRecipe = `DELETE
                               FROM Recipes
                               WHERE Username = '${username}'`;

    db.query(queryDeleteUser, (err) => {
      if (err) {
        res
          .status(500)
          .send(response.responseError('500', 'SERVER ERROR', { err }));
      }
    });

    db.query(queryDeleteRecipe, (err) => {
      if (err) {
        res
          .status(500)
          .send(response.responseError('500', 'SERVER ERROR', { err }));
      } else {
        res
          .status(200)
          .send(response.responseSuccess('200', 'OK', 'Success Delete User'));
      }
    });
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

const getAllUsers = async (req, res) => {
  try {
    const query = `SELECT *
                   FROM Users`;

    const results = await db.promise().query(query);
    if (results[0].length === 0) {
      res
        .status(404)
        .send(response.responseError('404', ' NOT_FOUND', 'Users Not Found'));
      return;
    }

    res.status(200).send(response.responseSuccess('200', 'OK', results[0]));
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

const getUser = async (req, res) => {
  try {
    const { username } = req.params;

    const queryUsername = `SELECT *
                           FROM Users
                           WHERE Username = '${username}'`;

    const result = await db.promise().query(queryUsername);

    if (result[0].length === 0) {
      res
        .status(404)
        .send(
          response.responseError('404', ' NOT_FOUND', 'Username Not Found')
        );
      return;
    }

    const query = `SELECT Username, Email, Firstname, Lastname, Address, Bio
                   FROM Users
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
};

const postUser = async (req, res) => {
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

    // Username, Email Validation
    const queryUsername = `SELECT *
                           FROM Users
                           WHERE Username = '${username}'`;
    const resultUsername = await db.promise().query(queryUsername);
    if (resultUsername[0].length !== 0) {
      res
        .status(400)
        .send(
          response.responseError(
            '400 ',
            'BAD_REQUEST',
            'Username Already In Use'
          )
        );
      return;
    }

    const queryEmail = `SELECT *
                        FROM Users
                        WHERE Email = '${email}'`;
    const resultEmail = await db.promise().query(queryEmail);
    if (resultEmail[0].length !== 0) {
      res
        .status(400)
        .send(
          response.responseError('400 ', 'BAD_REQUEST', 'Email Already In Use')
        );
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO Users (Username, Email, Password, FirstName, LastName, Address, Bio,
                                      Phone_Number)
                   VALUES ('${username}', '${email}', '${hashedPassword}', '${firstName}', '${lastName}', '${address}',
                           '${bio}',
                           '${phoneNumber}')`;

    db.query(query, (err) => {
      if (err) {
        res
          .status(500)
          .send(response.responseError('500', 'SERVER ERROR', { err }));
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
          })
        );
      }
    });
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

const putUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { firstName, lastName, address, bio, phoneNumber } = req.body;

    const queryUsername = `SELECT *
                           FROM Users
                           WHERE Username = '${username}'`;

    const result = await db.promise().query(queryUsername);

    if (result[0].length === 0) {
      res
        .status(404)
        .send(
          response.responseError('404', ' NOT_FOUND', 'Username Not Found')
        );
      return;
    }

    const query = `UPDATE Users
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
      } else {
        res
          .status(200)
          .send(response.responseSuccess('200', 'OK', 'User updated'));
      }
    });
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER ERROR', { e }));
  }
};

module.exports = { deleteUser, getAllUsers, getUser, postUser, putUser };
