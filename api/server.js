const express = require('express')
const fs = require('fs')

const app = express()

app.get('//shibana/getHistory/', (req, res) => {

})

app.post('//shibana/addBlock', (req, res) => {

})

PORT = 7777;

app.listen(PORT, () => {
    console.log(`This server be banging on port: ${PORT}`);
})
