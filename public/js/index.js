let socket = io()
socket.on('connect', () => {
    console.log('Connected to server')
})
socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', (message) => {
    let li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    $('#messages').append(li)
})

socket.on('newLocationMessage', message => {
    let li = $('<li></li>')
    let a = $('<a target="_blank">My current location</a>')
    li.text(`${message.from}: `)
    a.attr('href', message.url)
    li.append(a)
    $('#messages').append(li)
})

$('#message-form').on('submit', e => {
    e.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, (data) => {
        console.log(data)
    })
})

let locationButton = $('#send-location')
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by Your browser!')
    }
    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, () => alert('Unable to fetch location, please try again later.'))
})