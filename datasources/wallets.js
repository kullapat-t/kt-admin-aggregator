const { RESTDataSource } = require('apollo-datasource-rest')

class WalletAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3000/speakers' // TODO get url from env config
    }

    async getWalletById(id) {
        const data = await this.get('/${id')
        return data
    }

    async getWallets() {
        const data = await this.get('/')
        return data
    }
}

module.exports = WalletAPI