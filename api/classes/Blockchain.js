const Block = require("./Block");

class Blockchain {
    constructor() {
        this.difficulty = 3;
        this.blockchain = [Genesis()]   
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
            "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d",
            this.difficulty
        )
    }
    addBlock(){

    }
}

module.exports = Blockchain