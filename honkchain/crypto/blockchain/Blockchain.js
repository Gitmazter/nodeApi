const AirdropTx = require('./transactions/AirdropTx');
const HonkBs58 = require('../HonkBs58');
const Block = require("./Block");
const fs = require('fs');

class Blockchain {
    constructor(owner) {
        this.difficulty = 2;
        this.blockchain = [this.Genesis(owner)];  
    }

    Genesis(owner) {
        const ownerPubU8 = owner.account.keys.publicKey;
        const ownerPub = HonkBs58(ownerPubU8) ;
        const block = new Block(
            new AirdropTx(ownerPub),
            "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d", //Solana genesis hash
            this.difficulty,
            0
        );
        fs.writeFileSync('../chaindata.json', `${JSON.stringify(block)}\n`);
        return block;
    } 

    addBlock(data){
        const blockDepth = this.blockchain.length;
        const block = new Block(
            data,
            this.blockchain[ blockDepth- 1 ].blockHash,
            this.difficulty,
            blockDepth
        );
        this.blockchain.push(block);
        fs.writeFileSync('../chaindata.json', `${JSON.stringify(this)}\n`);
        console.log(block);
        return block;
    };

    validateChain(){

    };

};


module.exports = Blockchain;