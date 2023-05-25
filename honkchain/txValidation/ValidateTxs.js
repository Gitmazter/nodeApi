const validateTransact = (instructions) => {}

const validateAirdrop = (instructions, sender) => {
    //console.log(instructions, sender);
    if(sender != instructions.to) {
        return false
    }
    return true
}

const validateNft = (instructions) => {}
const validateBurn = (instructions) => {}


module.exports = { validateTransact, validateAirdrop, validateNft, validateBurn }