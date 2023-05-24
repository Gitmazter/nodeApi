const Chain = require('../classes/Blockchain')
const blockchain = new Chain()

const response = {
    status: 'Not found',
    statusCode: 404,
    data: null,
    error: null,
};

exports.welcome = ((req, res) => {
    response.status = 'Success';
    response.statusCode = 200;
    response.data = 'Welcome to HONK CHAIN! HONK!';
    res.status(response.statusCode).json(response);
})

exports.blockchainHistory = ((req, res) => {
    response.status = 'Success';
    response.statusCode = 201;
    response.data = blockchain.blockchain
    res.status(response.statusCode).json(response)
})

exports.latestBlock = ((req, res) => {
    response.status = 'Success';
    response.statusCode = 202;
    response.data = blockchain.blockchain[blockchain.blockDepth]
    res.status(response.statusCode).json(response)
})

exports.getBlocksInRange = ((req,res) => {
    const start = req.query.start;
    const end = req.query.end;
    console.log(start, end);
    const blocksInRange = collectBlocksInRange(start, end)
    response.status = 'Success';
    response.statusCode = 203;
    response.data = blocksInRange
    res.status(response.statusCode).json(response)
})

function collectBlocksInRange (start, end) {
    const chain = blockchain.blockchain
    let blocksInRange = []
    for (let i in chain) {
        console.log(chain[i].timestamp);
        if (chain[i].timestamp > start && chain[i].timestamp < end) {
            blocksInRange.push(chain[i])
        }
    }
    return blocksInRange
}

// Get whole blockchain history
// Get time range history
// Get account history

// Airdrop $GOOS || Send 100 $GOOS
// Send $GOOS || Sends $GOOS to address
// Buy Goose NFT || Mints Goose NFT with random goose image
// Burn assets || Burnasds $Goos or $GOOS nft

// Type : {
// GOS-Airdrop < address > | Tx hash confirmation and new balance
// GOS-Transact <receiver> <amount> | Tx hash confirmation and new balance
// GOS-Mint-Nft <address> | Tx hash confirmation and new balance 
// GOS-Asset-Burn <asset> <amount> | Tx hash confirmation and new balance 
// }