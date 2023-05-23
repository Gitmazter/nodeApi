const Blockchain = require('./classes/Blockchain')
const express = require('express')
const fs = require('fs')
const validateData = require('./modules/validateData')

const app = express()
const blockchain = new Blockchain()


blockchain.addBlock({"type":"Create Account"})
console.log(blockchain.blockchain);

const data = {"type":"GOC-token-transfer"}

if (validateData(data) == true) {
    blockchain.addBlock(data)
    console.log(blockchain.blockchain);
}

app.get('//gooseApi/blockHistory/', (req, res) => {
    // Search for whole history,
    // between timestamps
    // Account History
})

app.post('//gooseApi/addTransact', (req, res) => {
    // CreateAccount
    // Airdrop $GOOS
    // Send $GOOS
    // Buy Goose NFT
    // Burn assets
})

PORT = 7777;

app.listen(PORT, () => {
    console.log(`This server be banging on port: ${PORT}`);
})
