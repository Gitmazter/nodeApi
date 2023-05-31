const createHash = require('../create256hash');
const { error } = require('console');
const Block = require("./Block");
const fs = require('fs');

class Blockchain {
    constructor() {
        this.difficulty = 2;
        this.blockchain = this.start()
    };

    start() {
        fs.writeFileSync('../chaindata.json', '' ,{flag: "a"})

        const chainData = fs.readFileSync('../chaindata.json') 
        let chainObj 
        try {
            chainObj = JSON.parse(chainData)
        }
        catch (error) {
            console.log('no chain present, starting new Honk Chain');
            return this.Genesis()
        }  
        const isChainValid = this.validate(chainObj);
        console.log(`Is chain valid? : ${isChainValid}`);
        if (isChainValid === true) {return chainObj;}
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
        return true
    };

    Genesis() {
        const GENESIS_BLOCK = Block.Genesis()
        fs.writeFileSync(
            '../chaindata.json',
            JSON.stringify(GENESIS_BLOCK))
        return [GENESIS_BLOCK]
    };

    addBlock(data){
        const blockDepth = this.blockchain.length
        console.log('adding block');
        const block = new Block({
            data : data,
            prevHash : this.blockchain[blockDepth - 1].blockHash,
            difficulty : this.difficulty,
            blockDepth : blockDepth
        });
        
        this.blockchain.push(block);
        fs.writeFileSync(
            '../chaindata.json'
            , JSON.stringify(this.blockchain));

        return block;
    };

    returnBlocksInTimerange(start, end) {
        let chain = this.blockchain
        //console.log(chain);
        let blocksInRange = [];
        for (let i in chain) {
            if (chain[i].timestamp > start && chain[i].timestamp < end) {
                blocksInRange.push(chain[i]);
            };
        };
        return blocksInRange
    }

    returnBlocksMatchingAddress (address) {
        //console.log('getting blocks');
        const chain = this.blockchain
        let matchingBlocks = []
        for (let i in chain) {
            const instructions = chain[i].data.instructions;
            if (instructions.to === address || instructions.from === address)
            matchingBlocks.push(chain[i])
        };
        return matchingBlocks;
    }

    returnAddressGoosBalance(address) {
        const chain = this.blockchain
        let addressBalance = 0
        for (let i = 1; i < this.blockchain.length ; i++) {
            const instructions = chain[i].data.instructions;
            if (instructions.to === address) {
                addressBalance += Number(instructions.amount)
            }
            else if(instructions.from === address) {
                addressBalance -= Number(instructions.amount)
            }
        }; 
        //console.log(addressBalance);
        return addressBalance
    }

    returnLatestBlock () {
        //console.log(this.blockchain);
        const length = this.blockchain.length - 1
        const latestBlock = this.blockchain[length]
        //console.log(latestBlock);
        return latestBlock
    }
};

module.exports = Blockchain;
