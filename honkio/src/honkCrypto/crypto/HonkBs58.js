const bs58 = require('bs58')

export function HonkBs58 (uint8Arr) {
    return bs58.encode(uint8Arr)
}
