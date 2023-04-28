const bcrypt = require('bcrypt');

const User = require('../models/user')
const { send } = require('process')
const jwt = require('jsonwebtoken')

exports.getSignupUser = async(req, res, next) => {
    try {
        const email = req.body.email
        const userEmail = await User.findOne({ where: { email }, attributes: ['email'] })
        if (userEmail) {
            res.status(404).send({ message: 'User exist', success: false })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

exports.postSignupUser = async(req, res, next) => {
    try {
        const { userName, email, phoneNumber, password } = req.body
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async(error, hash) => {
            if (error) {
                console.log("error in password", error)
            } else {
                await User.create({
                    userName,
                    email,
                    phoneNumber,
                    password: hash
                })
            }
        })
        res.send({ status: 'success' })
    } catch (err) {
        console.log(err)
    }

}
const generateToken = (id) => {
    return jwt.sign({ userId: id }, 'secretKey')
}

exports.userLogin = async(req, res) => {
    try {
        const { email, password } = req.body
        console.log('>>>>', req.body.email, password)
        const userEmail = await User.findOne({ where: { email }, attributes: ['password', 'id'] })
        if (!userEmail) {
            res.status(403).send({ message: "user doesn't exists", success: false })
        } else {
            bcrypt.compare(password, userEmail.password, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (result)
                        res.status(200).send({ message: "user exists", success: true, token: generateToken(userEmail.id) })
                    else
                        res.status(404).send({ message: "wrong password", success: false })
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}