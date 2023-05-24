const nacl = require('tweetnacl')

// Do this client side for security purposes
class Account {
    constructor(vanityString) {

        vanityString === undefined 
        ? this.keys = nacl.sign.keyPair()
        : this.keys = this.getVanity(vanityString)
    }

    // Vanity can probably be refactored and broken out
    // CreateAccount + --Grind --address-starts-with ""
    getVanity(vanityString) {
        // Rewrite func here
    }
}

module.exports = Account