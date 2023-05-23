const time = require('time')

class Block {
    constructor(data, prevHash, difficulty) {
        this.timestamp = Date.now()/1000; // unix timestamp in seconds 
        this.data = data; // Block of transactions for block
        this.prevHash = prevHash; // hash of previous block
        this.blockHash = this.mineBlock(timestamp, data, prevHash, difficulty) 
    }

    mineBlock (timestamp, data, prevHash, difficulty) {
        let Hash
        
    }
}

module.exports = Block