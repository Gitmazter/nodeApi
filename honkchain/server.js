const express = require('express')
const router = require('./routes/honk-routes')
const cors = require('cors')
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');

const app = express()

app.use(cors({
    origin: '*',
    'Access-Control-Allow-Origin': "*"
}));

app.use(express.json())
app.use('/honkRpc', router)

app.all('*', (req, res, next) => {
    next(
        new AppError(
          `We honkly believe ${req.originalUrl}, is a honking wronk URL!`,
          404
        )
    );
});

app.use(errorHandler);

PORT = 1234;
app.listen(
    PORT,
    console.log(`This server be honking on port: ${PORT} in DEV MODE`)
)


// SIGNSHIT // Send with Pubkey
// const nacl = require('tweetnacl')
// const message = "hello"
// const msg = JSON.stringify(message);
// const msgBuffer = new Buffer.from(msg)
// const u8Msg = new Uint8Array(msgBuffer, 0, msg.length-1)
// const signedTx = nacl.sign(u8Msg, secretKey )

// Verify SIGNSHIT
// const verifyTx = nacl.sign.open(signedTx, publicKey)
// var string = new TextDecoder().decode(verifyTx);
// var json = JSON.parse(string)
// console.log(json)


//const signer = new Signer()
// signer.sign(txData)
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