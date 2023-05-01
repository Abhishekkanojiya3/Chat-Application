const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')

const UserRoute = require('./routes/user')
const imageRoute = require('./routes/image')
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

const http = require('http').createServer(app)

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {

    // Listen for chat messages
    socket.on('chatMessage', ({ from, to, message, chat }) => {
        // Broadcast the message to all users in the chat room
        socket.to(getRoomName(from, to)).emit('chatMessage', { chat, message });
    });

    // Join a chat room
    socket.on('joinChat', ({ from, to }) => {
        socket.join(getRoomName(from, to))
    });

    socket.on('groupChatMessage', ({ groupId, message, chat }) => {
        socket.to(groupId).emit('groupChatMessage', { chat, message });
    });

    socket.on('joinGroupChat', ({ groupId }) => {
        socket.join(groupId);
    });
});

function getRoomName(from, to) {
    // Generate a unique name for the chat room
    return `${Math.min(from, to)}:${Math.max(from, to)}`;
}

app.use(cors({
    origin: ['http://127.0.0.1:5500'],
    credentials: true
}))
app.use(helmet())
app.use(compression())
app.use('/image', imageRoute)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/group', groupRoute)
app.use('/user', UserRoute)

app.use('/password', forgotPasswordRoute)

app.use('/chat', chatRoute)

app.use(express.static(path.join(__dirname, 'public')));
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
        http.listen(3000)
    })