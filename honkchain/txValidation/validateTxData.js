const {
    validateTransact, 
    validateAirdrop, 
    validateBurn, 
    validateNft
} = require('./ValidateTxs');

const validateTxData = (data) => {
    //console.log(data);
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
        switch (data.type) {
            case "HONK-transact": 
                console.log('its a Tx');
                validateTransact(instructions);
                break;
            case "HONK-airdrop":
                //console.log('its a drop');
                const valid = validateAirdrop(instructions, data.sender);
                if (valid !== true) {errorMessage = valid; return errorMessage};
                return valid;
                break;

            case "HONK-mint-nft":
                console.log('its a nefft');
                validateNft(instructions);
                break;
            case "HONK-burn-asset":
                console.log('burn bb burn');
                validateBurn(instructions);
                break;
            default:
                console.log('its wrong');
                errorMessage = "invalid transaction type";
                return errorMessage;
        };
    };
    return false;
};

module.exports = validateTxData;