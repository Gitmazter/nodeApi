class AirdropTx {
    constructor (sender, signature) {
        this.type = "GOS-airdrop"
        this.sender = sender;
        this.signature = signature
        this.signed = signature != undefined ? true : false
        this.instructions = {
            from : "0x00000000000000000000000000000000000000",
            to : sender,
            amount : 100,
            success : this.signed
        }
    }

}

module.exports = AirdropTx