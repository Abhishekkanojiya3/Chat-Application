const express = require('express')

const userController = require('../controller/user')
const forgotPasswordController = require('../controller/forgotPassword')

const router = express()

router.post('/forgot-password', forgotPasswordController.ForgotPassword)

router.patch('/update-password', forgotPasswordController.updatePassword)

router.get('/forgot-password/:id', forgotPasswordController.getOnLinkClick)

module.exports = router