const { ApolloServer, ApolloError } = require('apollo-server')
//const SessionAPI = require('./datasources/sessions')
//const SpeakerAPI = require('./datasources/speakers')
const WalletAPI = require('./datasources/wallets')
const UserAPI = require('./datasources/users')

const typeDefs = require('./types/schema')
const resolvers = require('./resolvers/resolver')

const dataSources = () => ({
//    sessionAPI: new SessionAPI(),
//    speakerAPI: new SpeakerAPI(),
    walletAPI: new WalletAPI(),
    userAPI: new UserAPI()
})

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    dataSources,
    // formatError: (err) => {
    //     if(err.extensions.code == 'INTERNAL_SERVER_ERROR') {
    //         return new ApolloError("We are having some trouble", "ERROR", { token: "uniquetoken" })
    //     }
    //     return err
    // },
    debug: false,
    // introspection: false,
    // playground: false
})
server
    .listen({ port: process.env.PORT || 4000 })
    .then(
        ({ url }) => {
            console.log(`graphQL running at ${url}`)
        }    
    )