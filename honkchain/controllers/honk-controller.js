const validateData = require('../crypto/txValidation/validateTxData');
const generateNft = require('../crypto/blockchain/helpers/generateNft');
const json2Uint8 = require('../crypto/txValidation/json2uint8');
const Blockchain = require('../crypto/blockchain/Blockchain');
const catchErrorAsync = require('../utils/catchErrorAsync');
const Signer = require('../crypto/blockchain/Signer')
const { OWNER_PRIVATEKEY } = require('../settings');
const AppError = require('../utils/AppError');

const ownerSigner = new Signer(OWNER_PRIVATEKEY, null);
const blockchain = new Blockchain();

const response = {
    status: 'Not found',
    statusCode: 404,
    data: null,
    error: null,
};

exports.transaction = catchErrorAsync(async (req, res) => {
    console.log('received tx');
    const signedTransaction = json2Uint8(req.body.signedTransaction);
    const senderU8  = json2Uint8(req.body.senderU8);
    const txData = ownerSigner.validate(signedTransaction, senderU8);       
    console.log(txData);
    if (txData == null) throw new AppError("Invalid Signature", 401);
    txData.valsig = true;

    // Should do this browser side where TX is created but:
    // Doing this here since random-d.uk doesn't use CORS which disables browser connections 
    // Could Break this out??
    if (txData.type === "HONK-mint-nft"){
        try {
            txData.instructions.token = await generateNft()
        }
        catch (err) {
            throw new AppError("NFT generation failed!", 501);
        }
    }
    const validityReturn = validateData(txData, blockchain);
    if (validityReturn !== true) throw new AppError(`Transaction Invalid! Reason: ${validityReturn}`, 401);
    txData.instructions.success = true;
    const block = blockchain.addBlock(txData);

    response.status = 'Transaction Successful!';
    response.statusCode = 210;
    response.data = block;
    res.status(response.statusCode).json(response);
});

exports.welcome = catchErrorAsync((req, res) => {
    response.status = 'Success';
    response.statusCode = 200;
    response.data = 'Proof of HONK!';
    res.status(response.statusCode).json(response);
})

exports.blockchainHistory = ((req, res) => {
    const allBlocks = blockchain.returnBlocksInTimerange(0, Date.now())
    response.status = 'Success';
    response.statusCode = 201;
    response.data = allBlocks;
    res.status(response.statusCode).json(response);
})

exports.getLatestBlock = ((req, res) => {
    const latestBlock = blockchain.returnLatestBlock()
    response.status = 'Success';
    response.statusCode = 202;
    response.data = latestBlock
    res.status(response.statusCode).json(response);
})

exports.getBlocksInRange = ((req, res) => {
    const start = req.query.start;
    const end = req.query.end;
    const blocksInRange = blockchain.returnBlocksInTimerange(start, end);

    response.status = 'Success';
    response.statusCode = 203;
    response.data = blocksInRange;
    res.status(response.statusCode).json(response);
});


