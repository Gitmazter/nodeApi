const axios = require('axios');
const Nft = require('./blockchain/Nft')

const generateNft = async () => {
    const duckData = await axios.get('https://random-d.uk/api/v2/quack')

    const title = "Your Honker!";
    const duckUrl = duckData.data.url;
    const description = duckData.data.message;
    const timestamp = Date.now()

    const duck = new Nft(title, duckUrl, description, timestamp)
    return duck
}

module.exports = generateNft