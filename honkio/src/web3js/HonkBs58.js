const bs58 = require('bs58');

function HonkBs58 (uint8Arr) {
    return bs58.encode(uint8Arr);
}
function HonkU8Arr (bs58key) {
    return bs58.decode(bs58key)
}


module.exports = { HonkBs58, HonkU8Arr };