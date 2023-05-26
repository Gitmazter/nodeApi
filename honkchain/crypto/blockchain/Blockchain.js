const AirdropTx = require('./transactions/AirdropTx');
const createHash = require('../create256hash');
const { log, error } = require('console');
const HonkBs58 = require('../HonkBs58');
const Block = require("./Block");
const fs = require('fs');

class Blockchain {
    constructor(owner) {
        this.difficulty = 2;
        this.blockchain = [this.start(owner)];  
    };

    start(owner) {
        let chainJson = fs.readFileSync('../chaindata.json');

        let chainObj
        try {chainObj = JSON.parse(chainJson);}
        catch (error) {
            console.log('no chain present, starting new Honk Chain');
            return this.Genesis(owner);
        } 

        const isChainValid = this.validate(chainObj.honkchain);
        console.log(`Is chain valid? : ${true}`);
        
        if (isChainValid == true) {return chainObj.honkchain;}
        else {throw error("This chain is invalid with please rollback Honk Node to latest valid snapshot")}
    };

    validate (chain) {
        console.log('validating chain');
        if (chain.length > 1) { 
            for (let i = 0; i < chain.length -1; i++) {
                const block = chain[i];
                const hash = createHash(block.timestamp, block.data, block.prevHash, block.nonce);
                if (chain[i + 1].prevHash != hash) {
                    return false;
                };
            };
            return true;
        };
        return true;
    };

    Genesis(owner) {
        const ownerPubU8 = owner.account.keys.publicKey;
        const ownerPub = HonkBs58(ownerPubU8) ;
        const block = new Block(
            new AirdropTx(ownerPub),
            "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d", //Solana genesis hash
            this.difficulty,
            0
        );
        fs.writeFileSync(
            '../chaindata.json',
            JSON.stringify({honkchain : [block]}));
        return block;
    } ;

    addBlock(data){
        const blockDepth = this.blockchain.length;
        const block = new Block(
            data,
            this.blockchain[ blockDepth- 1 ].blockHash,
            this.difficulty,
            blockDepth
        );
        this.blockchain.push(block);
        fs.writeFileSync(
            '../chaindata.json'
            , JSON.stringify({honkchain : this.blockchain}));
        console.log(block);
        return block;
    };

};


module.exports = Blockchain;