const Block = require("./Block");
const fs = require('fs')

class Blockchain {
    constructor() {
        this.difficulty = 2;
        this.blockchain = [this.Genesis()]   
    }

    Genesis() {
        return new Block(
            {
                "type" : "Genesis-token-transfer",
                "amount": "100",
                "from": "0x00000000000000000000000000000000000000",
                "to" :  "0xAndziDev0g123ji418ss1324frtygs34fd1232",
                "success" : true,
            },
            "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d", //Solana genesis hash
            this.difficulty,
            0
        )
    }

    addBlock(data){
        const blockDepth = this.blockchain.length
        const block = new Block(
            data,
            this.blockchain[ blockDepth - 1 ].prevHash,
            this.difficulty,
            blockDepth
        )
        this.blockchain.push(block)

        //file = fs.writeFile('../blockchain.json', this.blockchain)

        return false
    } 

}


module.exports = Blockchain