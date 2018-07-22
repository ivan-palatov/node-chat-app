let socket = io()
socket.on('connect', () => {
    console.log('Connected to server')

    socket.emit('createMessage', {
        to: 'Yara',
        text: 'Some message from client to server'
    })
})
socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', (data) => {
    console.log(data)
})
