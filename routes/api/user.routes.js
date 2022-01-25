const express = require("express");
const router = express.Router();

const userController = require('../../controllers/user/user.controller');

// controllers
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;