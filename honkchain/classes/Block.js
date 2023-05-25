const createHash = require("../crypto/create256hash");
const powValidator = require("../crypto/powValidator");

class Block {
    constructor(data, prevHash, difficulty, blockDepth) {
        this.blockDepth = blockDepth
        this.timestamp = Math.floor(Date.now()/1000); // unix timestamp in seconds 
        this.nonce = 0
        this.data = data; // Block of transactions for block
        this.prevHash = prevHash; // hash of previous block
        this.blockHash = this.mineBlock(this.timestamp, data, prevHash, difficulty) 
    }

    mineBlock (timestamp, data, prevHash, difficulty) {
        let hash = '11111111'
        let nonce;
        while (powValidator(hash, difficulty) != true) {
            nonce = Math.round(Math.random() * 1000000)
            hash = createHash(timestamp, data, prevHash, nonce)
        } 
        this.nonce = nonce
        return hash
    }
}

module.exports = Block