const HonkBs58 = require('../honkCrypto/crypto/HonkBs58')
const nacl = require('tweetnacl')
const vanityAddressChecker = require('../honkCrypto/crypto/vanityAddressChecker')

// Do this client side for security purposes
class Account {
    constructor(keypair, vanityString) {
        if (keypair != undefined) {
            this.keys = keypair // object with 2 Uint8Arrays keys: secretKey (64bytes), publicKey (32bytes)
        }
        else if (vanityString != undefined ) {
            this.keys = this.grind(vanityString)
        }
        else {
            this.keys = nacl.sign.keyPair()
        }
    }

    // Vanity can probably be refactored and broken out
    // CreateAccount + --Grind --address-starts-with ""
    grind(vanityString) {
        let keys;
        let pub;
        do {
            keys = nacl.sign.keyPair()
            pub = HonkBs58(keys.publicKey)
        } while (vanityAddressChecker(pub, vanityString) != true)
        return keys
    }
}

module.exports = Account