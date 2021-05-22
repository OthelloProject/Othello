const path = require('path');
const http = require('http');
const chalk = require('chalk');
const express = require("express");
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')
const { userJoin, getcurrentuser, userLeave, getRoomUsers } = require('./utils/users');

let date = new Date();

const botName = 'SERVER';
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, "Welcome to Othello!"))
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        //sends the room info and stuff
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })


    });

    socket.on('chatMessage', msg => {
        const user = getcurrentuser(socket.id);
        io.emit('message', formatMessage(user.username, msg));
    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat.`));
        }

        //sends the room info and stuff
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    })
})

app.use(express.static(path.join(__dirname, 'public')))

server.listen(console.log(chalk.green(`Server is running` + chalk.red`\nPORT:` + chalk.magenta`\nTIME: ${date}`)));