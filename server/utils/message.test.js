const expect = require('expect')
const {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        const message = generateMessage('Tester', 'Some text')
        expect(message.from).toBe('Tester')
        expect(message.text).toBe('Some text')
        expect(typeof message.createdAt).toBe('number')
    })
})