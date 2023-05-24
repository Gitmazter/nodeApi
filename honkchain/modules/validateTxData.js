const validateTxData = (data) => {
    if(data.type != undefined) {
        return true
        switch (data.type) {
            case "HONK-transact": 
            case "HONK-airdrop":
            case "HONK-mint-nft":
            case "HONK-burn-asset":
            case "HONK-create-account":
        }
    }
    return false
}

module.exports = validateTxData