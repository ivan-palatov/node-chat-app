let socket = io()
socket.on('connect', () => {
    console.log('Connected to server')
})
socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', (message) => {
    let template = $('#message-template').html()
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: moment(message.createdAt).format('H:mm:ss')
    })
    $('#messages').append(html)
})

socket.on('newLocationMessage', message => {
    let template = $('#location-message-template').html()
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: moment(message.createdAt).format('H:mm:ss'),
        url: message.url
    })
    $('#messages').append(html)
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