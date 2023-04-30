const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const GroupChat = sequelize.define('groupChat', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    timeInMs: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    timeString: {
        type: Sequelize.STRING,
        allowNull: false
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = GroupChat