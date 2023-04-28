const express = require('express')

const userAuthenticationController = require('../controller/userAuthentication')
const chatController = require('../controller/chat')

const router = express.Router()

router.post('/create', userAuthenticationController.userAuthentication, chatController.createChat)

module.exports = router