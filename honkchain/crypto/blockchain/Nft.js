const createHash = require('../create256hash')

class Nft {
    constructor (title, url, description) {
        this.title = title;
        this.url = url;
        this.description = description;
        this.hash = createHash(title, url, description);
    }
}

module.exports = Nft;