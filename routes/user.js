const express = require('express');

const userController = require('../controller/user')
const userAuthenticationController = require('../controller/userAuthentication')

const router = express.Router();

router.get('/get-users', userAuthenticationController.userAuthentication, userController.getUsers)

router.post('/create', userController.getSignupUser, userController.postSignupUser)

router.post('/login', userController.userLogin)

module.exports = router;