class BurnTx {
    constructor (sender, amount) {
        this.type = "HONK-burn-asset";
        this.sender = sender;
        this.valsig = false; // set as default until after checks
        this.instructions = {
            from : sender,
            to : "0x000000000000000000000000000000000000000000",
            token: "GOOS",
            amount : amount,
            success: false // set as default until after checks
        };
    };
};

export default BurnTx