const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
    console.log('New user connected')

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app!',
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'Someone joined the chat',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', message => {
        console.log(message)

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
        // socket.broadcast.emit('newMessage', { // отправляет сообщение всем, КРОМЕ того кто отправляет сообщение
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})


server.listen(port, () => console.log(`Server is up on port ${port}`))