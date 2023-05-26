const json2Uint8 = (json) => {
    //console.log(typeof(json)); // String
    
    const parsed = JSON.parse(json);
    //console.log(typeof(parsed)); // object
    
    const noOfkeys = Object.keys(parsed).length;
    //console.log(noOfkeys); // returns number of keys! 

    let uint8Array = new Uint8Array(noOfkeys);

    for (let i = 0; i < noOfkeys; i++) {
        uint8Array[i] = parsed[i];
    };
    
    return uint8Array;

};

module.exports = json2Uint8;