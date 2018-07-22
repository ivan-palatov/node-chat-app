const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
    console.log('New user connected')

    
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required!')
        }

        socket.join(params.room)
        // socket.leave('Some group')
        socket.emit('newMessage', generateMessage('Admin', `You have joined ${params.room} room`)) //отправляет сообщение 1-му польз.
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined the room`)) //отправляет всем кроме 1

        callback()
    })

    socket.on('createMessage',(message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback()
    })

    socket.on('createLocationMessage', coords => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng))
    })


    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})


server.listen(port, () => console.log(`Server is up on port ${port}`))