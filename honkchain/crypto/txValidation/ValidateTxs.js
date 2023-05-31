
const validateTransact = (instructions, sender, blockchain) => {
    const senderBalance = blockchain.returnAddressGoosBalance(sender)
    
    //console.log(senderBalance);
    if (senderBalance < instructions.amount) {
        return ("Insufficient Balance") 
    } else {
        return true
    }
};

const validateAirdrop = (instructions, sender) => {
    ////console.log(instructions, sender);
    if(sender != instructions.to) {
        return false;
    };
    return true;
};

const validateNft = (instructions) => {
    if (instructions.token.url != undefined && 
        instructions.token.title != undefined &&
        instructions.token.description != undefined &&
        instructions.token.hash != undefined
        ){
        return true
    }
    return false
};

const validateBurn = (instructions, sender, blockchain) => {
    //console.log(sender);
    const senderBalance = blockchain.returnAddressGoosBalance(sender)
    //console.log(senderBalance);
    if (senderBalance - instructions.amount < 0) {
        return ("Insufficient Balance") 
    } else {
        return true
    }
};


module.exports = { validateTransact, validateAirdrop, validateNft, validateBurn };