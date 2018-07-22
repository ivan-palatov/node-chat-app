const expect = require('expect')
const {isRealString} = require('./validation')

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        expect(isRealString({abc: 'test'})).toBe(false)
    })
    it('Should reject string with only spaces', () => {
        expect(isRealString('        ')).toBe(false)
    })
    it('Should allow good strings', () => {
        expect(isRealString('test value')).toBe(true)
    })
})