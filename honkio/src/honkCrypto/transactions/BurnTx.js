class BurnTx {
    constructor (sender, signer, amount, tokenAddress) {
        this.type = "HONK-burn-asset"
        this.sender = sender;
        this.valsig = false // set as default until after checks
        this.instructions = {
            from : this.sender,
            to : "0x000000000000000000000000000000000000000000",
            amount : this.amount,
            success: false // set as default until after checks
        }
    }
}

module.exports = BurnTx