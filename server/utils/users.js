class Users {
    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        let user = {id, name, room}
        this.users.push(user)
        return user
    }
    removeUser(id) {
        let user = this.getUser(id)
        let changedUsers = this.users.filter(user => user.id !== id)
        this.users = changedUsers
        return user
    }
    getUser(id) {
        return this.users.filter(user => user.id === id)[0]
    }
    getUserList(room) {
        return this.users.filter(user => user.room === room).map(user => user.name)
    }
}

module.exports = {Users}