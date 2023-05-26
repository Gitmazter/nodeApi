const createHash = require('../create256hash')

class Nft {
    constructor (title, url, description, timestamp) {
        this.title = title
        this.url = url
        this.description = description
        this.timestamp = timestamp
        this.hash = createHash(title, url, description, timestamp)
    }
}

module.exports = Nft