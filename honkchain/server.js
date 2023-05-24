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
    // Search for whole history (Blockchain explorer),
    res.status(200).json(blockchain.blockchain);
})

app.post('//gooseApi/blockHistory/range/', (req, res) => {
    // between timestamps (range) 
    const { data } = req.body;

    const { start } = data;
    const { end }  = data;

    const historyInRange = getHistoryInRange(start, end) // Write this

    res.status(201).json({message : `All blocks from ${start} until ${end}`, chain: historyInRange})
})

app.post('//gooseApi/blockHistory/Account/', (req, res) => {
    // Account History
    const { data } = req.body;
    const { address } = data;
    const accountHistory =  getAccountHistory(address) // add func

    res.status(202).json()
})

app.post('//gooseApi/addTransact', (req, res) => {
    // CreateAccount + --Grind --address-starts-with ""
    const { data } = req.body;
    const txData = validateData(data)

    const block = blockchain.addBlock({ txData })

    res.status(203).json({message : 'transaction processed', block: block})
})

// Airdrop $GOOS || Send 100 $GOOS
// Send $GOOS || Sends $GOOS to address
// Buy Goose NFT || Mints Goose NFT with random goose image
// Burn assets || Burns $Goos or $GOOS nft

// Type : {
// GOS-Create-Account | Return < Private Key >
// GOS-Airdrop < address > | Tx hash confirmation and new balance
// GOS-Transact <receiver> <amount> | Tx hash confirmation and new balance
// GOS-Mint-Nft <address> | Tx hash confirmation and new balance 
// GOS-Asset-Burn <asset> <amount> | Tx hash confirmation and new balance 
// }

PORT = 7777;

app.listen(PORT, () => {
    console.log(`This server be banging on port: ${PORT}`);
})
