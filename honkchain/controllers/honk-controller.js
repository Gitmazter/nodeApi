const validateData = require('../txValidation/validateTxData');
const Blockchain = require('../crypto/blockchain/Blockchain');
const json2Uint8 = require('../txValidation/json2uint8');
const Signer = require('../crypto/blockchain/Signer');
const AppError = require('../utils/AppError');

const { OWNER_PRIVATEKEY } = require('../settings'); // env.js to save codelines
const generateNft = require('../crypto/generateNft');
const ownerSigner = new Signer(OWNER_PRIVATEKEY, null);
const blockchain = new Blockchain(ownerSigner);

//console.log(blockchain.blockchain);
const response = {
    status: 'Not found',
    statusCode: 404,
    data: null,
    error: null,
};

exports.transaction = ( async (req, res) => {
    const signedTransaction = json2Uint8(req.body.signedTransaction);
    const senderU8  = json2Uint8(req.body.senderU8);
    const txData = ownerSigner.validate(signedTransaction, senderU8);

    if (txData == null) throw new AppError("Invalid Signature", 401);
    txData.valsig = true;
    const isDataValid = validateData(txData);
    if (isDataValid !== true) throw new AppError(`Transaction Invalid! Reason: ${isDataValid}`, 402);
    if (txData.type === "HONK-mint-nft") {txData.instructions.token = await generateNft()}
    console.log(await txData.instructions.token);
    txData.instructions.success = true;
    const block = blockchain.addBlock(txData);
    console.log(block);


    response.status = 'Transaction Successful!';
    response.statusCode = 210;
    response.data = block;
    res.status(response.statusCode).json(response);
})

exports.welcome = ((req, res) => {
    response.status = 'Success';
    response.statusCode = 200;
    response.data = 'Proof of HONK!';
    res.status(response.statusCode).json(response);
})

exports.blockchainHistory = ((req, res) => {
    const allBlocks = collectBlocksInRange(0, Date.now());
    console.log(allBlocks.length);
    response.status = 'Success';
    response.statusCode = 201;
    response.data = allBlocks;
    res.status(response.statusCode).json(response);
})

exports.latestBlock = ((req, res) => {
    response.status = 'Success';
    response.statusCode = 202;
    const blockDepth = blockchain.blockchain.length;
    response.data = blockchain.blockchain[blockDepth - 1];
    res.status(response.statusCode).json(response);
})

exports.getBlocksInRange = ((req,res) => {
    const start = req.query.start;
    const end = req.query.end;
    console.log(start, end);
    const blocksInRange = collectBlocksInRange(start, end);
    response.status = 'Success';
    response.statusCode = 203;
    response.data = blocksInRange;
    res.status(response.statusCode).json(response);
});

function collectBlocksInRange (start, end) {
    const chain = blockchain.blockchain;
    let blocksInRange = [];
    for (let i in chain) {
        if (chain[i].timestamp > start && chain[i].timestamp < end) {
            blocksInRange.push(chain[i]);
        };
    };
    return blocksInRange
};

function logData (data) {
    console.log(data);
};
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