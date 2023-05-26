const errorHandler = require('./middleware/errorHandler');
const router = require('./routes/honk-routes');
const AppError = require('./utils/AppError');
const dotenv = require('dotenv')
dotenv.config('./.env')
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*',
    'Access-Control-Allow-Origin': "*"
}));
app.use('/honkRpc', router);
app.use(express.json());


app.all('*', (req, res, next) => {
    next(
        new AppError(
          `We honkly believe ${req.originalUrl}, is a honking wronk URL!`,
          404
        )
    );
});

app.use(errorHandler);

PORT = 1235;
app.listen(
    PORT,
    console.log(`This server be honking on port: ${PORT} in DEV MODE`)
);


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