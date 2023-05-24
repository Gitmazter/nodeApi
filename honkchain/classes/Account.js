const crypto = require('crypto')
const generateAddress = require('../modules/generateAddress')


class Account {
    constructor() {
        this.privateKey = this.createAccount()
        this.pubKey = ''
    }
    findTxs(pubkey){
        // get and search blockchain history for transactions, if none return [ ]
        return []
    }
    createAccount() {
        
    }
    signer(){
        // this.privateKey
        return signature
    }
}