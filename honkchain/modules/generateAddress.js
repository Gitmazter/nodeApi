const base58Encode = require('../crypto/base58Encode')

const generateAddress = () => {
    let seed = []
    for (let i = 0; i < 64; i++) {
        let uint = Math.round(Math.random() * 255);
        seed.push(uint)
    }
    // privateKey = base58Encode(seed)
    // return privateKey
    return seed
}

module.exports = generateAddress