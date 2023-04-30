const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const UserGroup = sequelize.define('userGroup', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = UserGroup