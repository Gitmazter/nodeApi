class BurnTx {
    constructor (sender, signer, amount, tokenAddress) {
        this.type = "GOS-airdrop"
        this.sender = sender;
        this.signature = signature
        this.signed = signature != undefined ? true : false
        this.instructions = {
            from : this.sender,
            to : "0x000000000000000000000000000000000000000000",
            amount : this.amount,
        }
    }
}

module.exports = BurnTx