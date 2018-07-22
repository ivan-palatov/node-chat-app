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

let messageTextbox = $('[name=message]')

$('#message-form').on('submit', e => {
    e.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, () => {
        messageTextbox.val('')
    })
})

let locationButton = $('#send-location')
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by Your browser!')
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...')

    navigator.geolocation.getCurrentPosition(position => {
        locationButton.removeAttr('disabled').text('Send Location')
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, () => {
        locationButton.removeAttr('disabled').text('Send Location')
        alert('Unable to fetch location, please try again later.')
    })
})