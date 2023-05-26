class AirdropTx {
    constructor (sender) {
        this.type = "HONK-airdrop";
        this.sender = sender;
        this.valsig = false; // set as default until after checks
        this.instructions = {
            from : "0x00000000000000000000000000000000000000",
            to : sender,
            token : "GOOS",
            amount : 10000000,
            success : true //always true
        };
    };
};

module.exports = AirdropTx;