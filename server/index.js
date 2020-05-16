console.log('starting');
'use strict'

const app = require('express')
const serverHttp = require('http').Server(app)
const io = require('socket.io')(serverHttp)

const myMessages = []

io.on('connection', (socket)=>{
    socket.on('send-message', (data)=>{
        myMessages.push(data)
        socket.emit('text-event', myMessages)
        socket.broadcast.emit('text-event', myMessages)
    })
})

serverHttp.listen(4000, () => {
    console.log('chat api running on port: ${4000}')
})