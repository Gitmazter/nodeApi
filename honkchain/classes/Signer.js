const Account = require('./Account');
const nacl = require('tweetnacl')

class Signer {
    constructor(keypair, vanityString){ // if keypair supplied, create signer from keypair
        this.account = new Account(keypair, vanityString)
    }
    
    sign(message){
        const secretKey = this.account.keys.secretKey;
        const publicKey = this.account.keys.publicKey;

        const msg = JSON.stringify(message);
        const msgBuffer = new Buffer.from(msg)
        const u8Msg = new Uint8Array(msgBuffer, 0, msg.length-1)

        const signedTx = nacl.sign(u8Msg, secretKey )

        return signedTx
    }
    validate(signedMessage, senderU8) {
        const verifyTx = nacl.sign.open(signedMessage, senderU8)
        if (verifyTx != null) {
            var string = new TextDecoder().decode(verifyTx);
            var json = JSON.parse(string)
            return json
        }
        else return null
    }


    decodeArr (binArray) {
        var str = "";
        for (var i = 0; i < binArray.length; i++) {
            str += String.fromCharCode(parseInt(binArray[i]));
        }
        return str
    
    }
}

module.exports = Signer