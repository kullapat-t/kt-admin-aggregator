const { DataSource } = require("apollo-datasource")
const users = require('../data/users.json')
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')

// update to RestDataSourceAPI and integrate with kt-admin-iam
class UserAPI extends DataSource {
    constructor() {
        super()
    }
    initialize(config) {}

    getUsers(args) {
        return _.filter(users, args)
    }
    getUserById(id) {
        return _.filter(users, { id })[0]
    }

    addUser(user) {
        const date = Date.now().toString()
        const newUser = { 
            ...user, 
            id: uuidv4(), 
            createdDate: date, 
            modifiedDate: date,
            enabled: true
        }
        users.push(newUser)
        return newUser
    }
    toggleUserStatus(id) {
        const result = _.filter(users, { id })
        result[0].enabled = !result[0].enabled
        return result[0]
    }
}

module.exports = UserAPI