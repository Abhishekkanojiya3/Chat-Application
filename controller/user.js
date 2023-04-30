const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const User = require('../models/user')
const UserGroup = require('../models/userGroup')

const { send } = require('process')
const jwt = require('jsonwebtoken')

exports.getUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            where: {
                userName: {
                    [Op.notIn]: [req.user.userName]
                }
            }
        })
        res.json({ users })
    } catch (error) {
        console.log(error)
    }
}

exports.getSignupUser = async(req, res, next) => {
    try {
        const email = req.body.email
        const userDetails = await User.findOne({ where: { email }, attributes: ['email'] })
        if (userDetails) {
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
        res.json({ success: true })
    } catch (err) {
        console.log(err)
    }

}
const generateToken = (userDetails) => {
    return jwt.sign({ userDetails }, 'secretKey')
}
exports.getNewUsersExceptSelf = async(req, res) => {
    try {
        const presentUserIds = []
        const groupId = req.query.groupId
        const presentUsers = await UserGroup.findAll({ where: { id } })
        presentUsers.forEach(user => {
            presentUserIds.push(user.id)
        });

        const users = await User.findAll({
            where: {
                userName: {
                    [Op.notIn]: [req.user.userName]
                },
                id: {
                    [Op.notIn]: presentUserIds
                }
            }
        })
        res.json({ users })
    } catch (error) {
        console.log(error)
    }
}

exports.userLogin = async(req, res) => {
    try {
        const { email, password } = req.body
        console.log('>>>>', req.body.email, password)
        const userDetails = await User.findOne({ where: { email } })
        if (!userDetails) {
            res.status(403).send({ message: "user doesn't exists", success: false })
        } else {
            bcrypt.compare(password, userDetails.password, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (result)
                        res.status(200).send({ message: "user exists", success: true, token: generateToken(userDetails) })
                    else
                        res.status(404).send({ message: "wrong password", success: false })
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}
exports.checkAdminStatus = async(req, res) => {
    const userData = await UserGroup.findOne({
        where: {
            userId: req.user.id,
            groupId: parseInt(req.query.currentTextingPerson)
        },
        attributes: ['isAdmin']
    })
    res.json({ userData })
}