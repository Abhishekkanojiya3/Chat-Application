const express = require('express');

const userController = require('../controller/user')

const router = express.Router();

router.post('/create', userController.getSignupUser, userController.postSignupUser)

router.post('/login', userController.userLogin)

module.exports = router;