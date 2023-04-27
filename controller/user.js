const bcrypt = require('bcrypt');

const User = require('../models/user')
const { send } = require('process')

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