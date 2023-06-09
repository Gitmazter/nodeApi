const GENESIS_DATA = {
    "data" : {"GENESIS" : "block"},
    "prevHash" : "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d",
    "difficulty" : 2,
    "blockDepth" : 0
}

const OWNER_PRIVATEKEY = Uint8Array.from([ // Left unignored on purpose for now
    241, 140, 105,  89, 145,   1,  86, 137, 152, 232, 124,
      9, 105, 174,   6,  69, 136,  29, 105, 185, 113, 165,
     43,  61,   6, 162,  96, 190, 120,  52, 143, 206, 152,
    151, 193,  80, 254,  78, 215, 238, 106, 199,  34,  33,
    253,  63, 104, 192,  66, 230, 147, 235, 128, 143,  49,
     79, 146, 195, 151,   4, 100, 230, 103,  94
]);


module.exports = { GENESIS_DATA, OWNER_PRIVATEKEY};