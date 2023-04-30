const express = require('express');

const userController = require('../controller/user')
const userAuthenticationController = require('../controller/userAuthentication')

const router = express.Router();

router.get('/get-users', userAuthenticationController.userAuthentication, userController.getUsers)

router.post('/create', userController.getSignupUser, userController.postSignupUser)

router.get('/check-admin-status', userAuthenticationController.userAuthentication, userController.checkAdminStatus)

router.get('/get-new-users', userAuthenticationController.userAuthentication, userController.getNewUsersExceptSelf)

router.post('/login', userController.userLogin)

module.exports = router;