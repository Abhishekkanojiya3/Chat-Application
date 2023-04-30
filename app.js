const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const path = require('path')

const UserRoute = require('./routes/user')
const sequelize = require('./util/database')
const groupRoute = require('./routes/group')

const chatRoute = require('./routes/chat')

const forgotPasswordRoute = require('./routes/forgotPassword')
const errorController = require('./controller/error')
const OneToOneChat = require('./models/oneToOneChat')
const Group = require('./models/group')
const GroupChat = require('./models/groupChat')
const UserGroup = require('./models/userGroup')

const User = require('./models/user')
const ForgotPassword = require('./models/forgotPassword')
const app = express()

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/group', groupRoute)
app.use('/user', UserRoute)

app.use('/password', forgotPasswordRoute)

app.use('/chat', chatRoute)

app.use(errorController.sendError)

User.hasMany(ForgotPassword)
ForgotPassword.belongsTo(User)

User.hasMany(OneToOneChat)
OneToOneChat.belongsTo(User)

User.hasMany(GroupChat)
GroupChat.belongsTo(User)

User.belongsToMany(Group, { through: UserGroup })
Group.belongsToMany(User, { through: UserGroup })

Group.hasMany(GroupChat)
GroupChat.belongsTo(Group)

User.hasMany(UserGroup)
UserGroup.belongsTo(User)

sequelize
    .sync()
    .then(() => {
        app.listen(3000)
    })