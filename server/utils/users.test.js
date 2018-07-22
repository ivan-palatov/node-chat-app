const expect = require('expect')
const {Users} = require('./users')

let users
beforeEach(() =>{
    users = new Users()
    users.users = [{
        id: '1',
        name: 'Tst',
        room: 'Some room 1'
    }, {
        id: '2',
        name: 'Tst2',
        room: 'Some room 2'
    }, {
        id: '3',
        name: 'Tst3',
        room: 'Some room 1'
    }]
})

describe('Users class', () => {
    it('Should add new user', () => {
        let users = new Users()
        let user = {
            id: '213421',
            name: 'Tester',
            room: 'Some room'
        }
        const res = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([user])
    })
    it('Should return names for Some room 1', () => {
        expect(users.getUserList('Some room 1')).toEqual(['Tst', 'Tst3'])
    })
    it('Should return names for Some room 2', () => {
        expect(users.getUserList('Some room 2')).toEqual(['Tst2'])
    })
    it('Should remove a user', () => {
        users.removeUser('1')
        expect(users.users.length).toBe(2)
    })
    it('Should not remove user', () => {
        users.removeUser('242')
        expect(users.users.length).toBe(3)
    })
    it('Should find user', () => {
        let user = users.getUser('2')
        expect(user.id).toBe('2')
    })
    it('Should not find user', () => {
        expect(users.getUser('23')).toBeFalsy()
    })
})