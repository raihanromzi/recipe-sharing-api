const express = require('express');
const { param, body } = require('express-validator');
const db = require('../../config/db');
const userController = require('../../controllers/userController');
const userValidator = require('../../middleware/userValidator');
const userUpdateValidator = require('../../middleware/userUpdateValidator');

const router = express.Router();

// Delete User
router.delete(
  '/users/:username',

  // Check is username exist in db
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Users
                     WHERE Username = '${username}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Username Not Found');
      }
    }),

  userController.deleteUser
);

// Get All User
router.get('/users', userController.getAllUsers);

// Get Specific User
router.get('/users/:username', userController.getUser);

// Create User
router.post(
  '/users',

  userValidator,
  userController.postUser
);

// Update User Information
router.put(
  '/users/:username',
  userUpdateValidator,

  // Check is username exist in db
  param('username')
    .exists()
    .custom(async (username) => {
      const query = `SELECT COUNT(*)
                     FROM Users
                     WHERE Username = '${username}'`;
      const result = await db.promise().query(query);
      if (result[0][0]['COUNT(*)'] === 0) {
        throw new Error('Username Not Found');
      }
    }),

  userController.putUser
);

module.exports = router;
