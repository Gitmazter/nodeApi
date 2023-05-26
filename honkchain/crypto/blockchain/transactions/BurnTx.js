class BurnTx {
    constructor (sender, amount, tokenAddress) {
        this.type = "HONK-burn-asset";
        this.sender = sender;
        this.valsig = false; // set as default until after checks
        this.instructions = {
            from : sender,
            to : "0x000000000000000000000000000000000000000000",
            tokenAddress : "Either GOOS or unique NFT hash",
            amount : amount,
            success: false // set as default until after checks
        };
    };
};

module.exports = BurnTx;