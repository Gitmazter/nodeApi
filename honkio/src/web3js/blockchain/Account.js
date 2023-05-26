const vanityAddressChecker = require('../vanityAddressChecker');
const HonkBs58 = require('../HonkBs58');
const nacl = require('tweetnacl');

// Do this client side for security purposes
class Account {
    constructor(secretKey, vanityString) {
        if (secretKey != undefined) {
            console.log(secretKey);
            this.keys = nacl.sign.keyPair.fromSecretKey(secretKey);
        }
        else if (vanityString != undefined ) {
            this.keys = this.grind(vanityString);
        }
        else {
            this.keys = nacl.sign.keyPair();
        };
    };

    // Vanity can probably be refactored and broken out
    // CreateAccount + --Grind --address-starts-with ""
    grind(vanityString) {
        let keys;
        let pub;
        do {
            keys = nacl.sign.keyPair();
            pub = HonkBs58(keys.publicKey);
        } while (vanityAddressChecker(pub, vanityString) != true);
        return keys;
    };
};

module.exports = Account;