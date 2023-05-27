class TransactTx {
    constructor (sender, amount, receiver) {
        this.type = "HONK-transact";
        this.sender = sender;
        this.valsig = false; // set as default until after checks
        this.instructions = {
            from : this.sender,
            to : receiver,
            token : "GOOS",
            amount : amount,
            success: false // set as default until after checks 
        };
    };
};

module.exports = TransactTx;