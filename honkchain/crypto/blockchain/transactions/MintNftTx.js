class MintNftTx {
    constructor (sender, signer) {
        this.type = "HONK-mint-nft";
        this.sender = sender;
        this.valsig = false; // set as default until after checks
        this.instructions = {
            from : "0x000000000000000000000000000000000000000000",
            to : this.sender,
            token : "EGG",
            nft_object : generateNft(),
            success: false // set as default until after checks
        };
    };
};

module.exports = MintNftTx;