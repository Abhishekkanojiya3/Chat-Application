const express = require('express')

const groupController = require('../controller/group')

const userAuthenticationController = require('../controller/userAuthentication')

const router = express.Router()


router.post('/create', userAuthenticationController.userAuthentication, groupController.createGroup)


router.get('/get-groups', userAuthenticationController.userAuthentication, groupController.getGroups)

router.get('/load-previous-group-chats', userAuthenticationController.userAuthentication, groupController.loadPreviousGroupChats)

router.get('/load-live-group-messages', userAuthenticationController.userAuthentication, groupController.loadLiveGroupMessages)

module.exports = router