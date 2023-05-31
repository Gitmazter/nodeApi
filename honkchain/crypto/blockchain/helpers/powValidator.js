const powValidator = (hash, difficulty) => { // Proof of HONK
    let valid = true;

    const oaSlice = hash.slice(0,2);
    if (oaSlice != "0a") {
        valid = false;
    };

    const zSlice = hash.slice(2, difficulty+2);
    for (var c in zSlice) {
        if (zSlice[c] != "0") {
            valid = false;
        };
    };

    return valid;
};

module.exports =  powValidator;