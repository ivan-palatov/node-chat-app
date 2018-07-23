let socket = io()

function scrollToBottom() {
    // selectors
    let messages = $('#messages')
    let newMessage = messages.children('li:last-child')
    // heights
    let clientHeight = messages.prop('clientHeight')
    let scrollTop = messages.prop('scrollTop')
    let scrollHeight = messages.prop('scrollHeight')
    let newMessageHeight = newMessage.innerHeight()
    let lastMessageHeight = newMessage.prev().innerHeight()

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', () => {
    let params = jQuery.deparam(window.location.search)
    socket.emit('join', params, err => {
        if (err) {
            alert(err)
            window.location.href = '/'
        } else {
            console.log('Everything\'s good')
        }
    })
})
socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('updateUserList', users => {
    let ol = $('<ol></ol>')
    users.forEach(user => ol.append($('<li></li>').text(user)));
    $('#users').html(ol)
})

socket.on('newMessage', (message) => {
    let template = $('#message-template').html()
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: moment(message.createdAt).format('H:mm:ss')
    })
    $('#messages').append(html)
    scrollToBottom()
})

socket.on('newLocationMessage', message => {
    let template = $('#location-message-template').html()
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: moment(message.createdAt).format('H:mm:ss'),
        url: message.url
    })
    $('#messages').append(html)
    scrollToBottom()
})

let messageTextbox = $('[name=message]')

$('#message-form').on('submit', e => {
    e.preventDefault()
    socket.emit('createMessage', {
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