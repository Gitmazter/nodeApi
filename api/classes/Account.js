const crypto = require('crypto')


class Account {
    constructor(seedPhrase) {
        this.pubKey = crypto.Hash(seedPhrase)
        this.privateKey = 
        this.transactions = findTxs(this.pubKey)
    }
    findTxs(pubkey){
        // get and search blockchain history for transactions, if none return [ ]
        return []
    }
}