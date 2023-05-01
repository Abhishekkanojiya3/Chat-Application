const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'database-2.cjkkhdr89hqm.us-east-2.rds.amazonaws.com',
    dialect: 'mysql'
})

module.exports = sequelize