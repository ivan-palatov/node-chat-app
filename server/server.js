const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
    console.log('New user connected')

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!')) //отправляет сообщение 1-му польз.
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Someone joined the chat')) //отправляет всем кроме 1

    socket.on('createMessage',(message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('Server got ur message')
    })

    socket.on('createLocationMessage', coords => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng))
    })


    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})


server.listen(port, () => console.log(`Server is up on port ${port}`))