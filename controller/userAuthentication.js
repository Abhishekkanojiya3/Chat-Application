const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.userAuthentication = async(req, res, next) => {
    try {
        const token = req.header('Authorization')
        const user = jwt.verify(token, 'secretKey')
        req.user = user.userDetails
        next()
    } catch (error) {
        console.log(error)
    }
}