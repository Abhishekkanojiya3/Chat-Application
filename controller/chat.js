const OneToOneChat = require('../models/oneToOneChat')
const { Op } = require('sequelize');
const User = require('../models/user')
const Group = require('../models/group')
const UserGroup = require('../models/userGroup')
const GroupChat = require('../models/groupChat')
exports.createChat = async(req, res) => {
    try {
        const receiverId = req.query.receiverId
        const message = req.body.sentMessage
        const timeInMs = req.body.timeInMs
        const timeString = req.body.timeString
        const receiverData = await User.findOne({ where: { userName: receiverName } })
        await OneToOneChat.create({
            receiverId,
            message,
            timeInMs,
            timeString,
            userId: req.user.id
        })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
    }

}
exports.createGroupChat = async(req, res) => {
    try {
        const groupId = req.query.groupId
        const message = req.body.sentMessage
        const timeInMs = req.body.timeInMs
        const timeString = req.body.timeString
        await GroupChat.create({
            message,
            timeInMs,
            timeString,
            userId: req.user.id,
            groupId
        })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
    }
}
exports.loadPreviousChats = async(req, res) => {
    try {
        const receiverId = req.query.receiverId
        const receiverData = await User.findByPk(receiverId)
        const chats = await OneToOneChat.findAll({
            where: {
                [Op.or]: [{
                        [Op.and]: [
                            { receiverId: receiverData.id },
                            { userId: req.user.id }
                        ]
                    },
                    {
                        [Op.and]: [
                            { receiverId: req.user.id },
                            { userId: receiverData.id }
                        ]
                    }
                ]
            },
            order: [
                ['timeInMs', 'ASC']
            ]
        })
        res.json({ chats, userId: req.user.id })
    } catch (error) {
        console.log(error);
    }

}
exports.loadLiveRecieverMessages = async(req, res) => {
    try {
        const receiverId = req.query.receiverId
        const timeInMs = req.query.timeInMs
        const receiverData = await User.findByPk(receiverId)
        const chats = await OneToOneChat.findAll({
            where: {
                [Op.and]: [
                    { receiverId: req.user.id },
                    { userId: receiverData.id },
                    { timeInMs: {
                            [Op.gt]: timeInMs } }
                ]
            },
            order: [
                ['timeInMs', 'ASC']
            ]
        })
        res.json({ chats, userId: req.user.id })
    } catch (error) {
        console.log(error)
    }
}