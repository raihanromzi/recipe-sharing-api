const express = require('express');
const userController = require('../../controllers/userController');
const userValidator = require('../../middleware/userValidator');
const userUpdateValidator = require('../../middleware/userUpdateValidator');

const router = express.Router();

// Delete User
router.delete('/users/:username', userController.deleteUser);

// Get All User
router.get('/users', userController.getAllUsers);

// Get Specific User
router.get('/users/:username', userController.getUser);

// Create User
router.post('/users', userValidator, userController.postUser);

// Update User Information
router.put('/users/:username', userUpdateValidator, userController.putUser);

module.exports = router;
