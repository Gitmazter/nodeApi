const vanityAddressChecker = (publicKey, vanityString) => {
    let valid = true;
    for (let c in vanityString) {
        if (publicKey[c] != vanityString[c]) {
            valid = false;
        };
    };
    return valid;
};
module.exports = vanityAddressChecker;