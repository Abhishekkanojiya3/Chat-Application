const express = require('express')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const userAuthenticationController = require('../controller/userAuthentication')
const imageController = require('../controller/image')

const router = express()

router.post('/', upload.single('selectedFile'), userAuthenticationController.userAuthentication, imageController.postToS3)

router.get('/:key', imageController.getFromS3)

module.exports = router