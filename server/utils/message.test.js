const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        const message = generateMessage('Tester', 'Some text')
        expect(message.from).toBe('Tester')
        expect(message.text).toBe('Some text')
        expect(typeof message.createdAt).toBe('number')
    })
})

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        const message = generateLocationMessage('Tester', 123.123, 241.241)
        expect(message.from).toBe('Tester')
        expect(typeof message.createdAt).toBe('number')
        expect(message.url).toBe('https://www.google.com/maps?q=123.123,241.241')
    })
})