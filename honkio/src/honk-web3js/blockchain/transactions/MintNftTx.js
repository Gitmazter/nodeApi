const generateNft = require("../../generateNft");

class MintNftTx {
    constructor (sender) {
        this.type = "HONK-mint-nft";
        this.sender = sender;
        this.valsig = false; // set as default until after checks
        this.instructions = {
            from : "0x000000000000000000000000000000000000000000",
            to : this.sender,
            token : "",
            success: false // set as default until after checks
        };
    };
};

export default MintNftTx