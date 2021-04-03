const { ApolloError } = require('apollo-server-errors')
const _ = require('lodash')

module.exports = {
    Query: {
        users: (parent, args, { dataSources }, info) => {
            return dataSources.userAPI.getUsers(args)
        },
        userById: (parent, { id }, { dataSources }, info) => {
            return dataSources.userAPI.getUserById(id)
        }
    },
    Mutation: {
        addUser: (parent, { user }, { dataSources }, info) => {
            return dataSources.userAPI.addUser(user)
        },
        toggleUserStatus: (parent, { id }, { dataSources }, info) => {
            return dataSources.userAPI.toggleUserStatus(id)
        }
    },
    User: {
        wallets: async (user, args, { dataSources }, info) => {
            try {
                // benefit of using RESTDataSource -> caches a call for the duration of time
                const wallets = await dataSources.walletAPI.getWallets()
                const output = wallets.filter((wallet) => {
                    return _.filter(user.wallets, { id: wallet.id }).length > 0
                })
                return output
            } catch (e) {
                return new ApolloError(`Unable to get wallets: ${e.message}`, "WALLETAPIERROR", { token: "uniquetoken" })
            }
        }
    }
}