const validateData = (data) => {
    if(data.type != undefined) {
        return true
    }
    return false
}

module.exports = validateData