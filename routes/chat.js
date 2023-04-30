const express = require('express')

const userAuthenticationController = require('../controller/userAuthentication')
const chatController = require('../controller/chat')

const router = express.Router()

router.get('/load-previous-chats', userAuthenticationController.userAuthentication, chatController.loadPreviousChats)

router.post('/create-group-chat', userAuthenticationController.userAuthentication, chatController.createGroupChat)

router.get('/load-live-receiver-messages', userAuthenticationController.userAuthentication, chatController.loadLiveRecieverMessages)

router.post('/create', userAuthenticationController.userAuthentication, chatController.createChat)

module.exports = router