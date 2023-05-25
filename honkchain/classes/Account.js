const nacl = require('tweetnacl')
const HonkBs58 = require('../crypto/HonkBs58')
const vanityAddressChecker = require('../crypto/vanityAddressChecker')

// Do this client side for security purposes
class Account {
    constructor(secretKey, vanityString) {
        if (secretKey != undefined) {
            this.keys = nacl.sign.keyPair.fromSecretKey(secretKey)
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