const bs58 = require('bs58')

const base58Encode = (uint8Arr) => {
    const base58Hash = bs58.encode(uint8Arr)
    return base58Hash
}

module.exports = base58Encode