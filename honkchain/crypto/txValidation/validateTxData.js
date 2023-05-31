const {
    validateTransact, 
    validateAirdrop, 
    validateBurn, 
    validateNft
} = require('./ValidateTxs');

const validateTxData = (data, blockchain) => {
    //////console.log(data);
    let errorMessage = "";
    let instructions;

    try {
        instructions = data.instructions;
    }
    catch (err) {
        errorMessage = "tx lacks instructions";
        return errorMessage;
    };

    if(data.type != undefined) {
        let valid
        switch (data.type) {
            case "HONK-transact": 
                valid = validateTransact(instructions, data.sender, blockchain);
                return valid
                break;

            case "HONK-airdrop":
                valid = validateAirdrop(instructions, data.sender);
                return valid;
                break;

            case "HONK-mint-nft":
                valid = validateNft(instructions);
                return valid
                break;

            case "HONK-burn-asset":
                valid = validateBurn(instructions, data.sender, blockchain);
                return valid
                break;
                
            default:
                return "invalid transaction type"
        };
    };
    return false;
};

module.exports = validateTxData;