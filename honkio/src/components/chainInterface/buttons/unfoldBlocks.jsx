export function unfoldBlock(block) {
    if (block.blockDepth === 0 ) {
        return "genesis"
    }
    else if (block.data.type === "HONK-mint-nft") {
        return unfoldNftBlock(block)
    }
    else {
        return unfoldRegularBlock(block)
    }
}


export function unfoldRegularBlock(block){
    console.log(block);
    // If type HONK-mint-nft // write special unfold response for "TOKEN" field using NFT object
    const dateTime = new Date(block.timestamp*1000)
    return (
        <p> 
            Block Depth :{block.blockDepth} <br/>
            Timestamp : {block.timestamp}<br/>
            DateTime: {dateTime.getFullYear()}/{dateTime.getMonth()+1}/{dateTime.getDate()}.{dateTime.getHours()}:{dateTime.getMinutes()}:{dateTime.getSeconds()} <br/>
            Block Hash : {block.blockHash} <br/>
            Previous Hash : {block.prevHash} <br/>
            Nonce : {block.nonce} <br/>
            <hr></hr>
            Data ::::: <br/>
            type : {block.data.type}<br/>
            sender : {block.data.sender}<br/>
            Valid Signatue : {block.data.valsig ? "true" : "false"}<br/>
            <hr></hr>
            Instructions::::: <br/>
            From:{block.data.instructions.from}<br/>
            To:{block.data.instructions.to}<br/>
            Token:{block.data.instructions.token}<br/>
            Amount:{block.data.instructions.amount}<br/>
            Success:{block.data.instructions.success ? "true" : "false"}<br/>

        </p>
    );
}

export function unfoldBlocks(blocks) {
    const html = blocks.map((block) => {
        console.log(block);
        return (
            <div className="blockDiv">
                {unfoldBlock(block)}
            </div>
            )
    })
    return html
}

export function unfoldNftBlock (block) {
    console.log(block);
    const dateTime = new Date(block.timestamp*1000)
    return (
        <p> 
            Block Depth :{block.blockDepth} <br/>
            Timestamp : {block.timestamp}<br/>
            DateTime: {dateTime.getFullYear()}/{dateTime.getMonth()+1}/{dateTime.getDate()}.{dateTime.getHours()}:{dateTime.getMinutes()}:{dateTime.getSeconds()} <br/>
            Block Hash : {block.blockHash} <br/>
            Previous Hash : {block.prevHash} <br/>
            Nonce : {block.nonce} <br/>
            <hr></hr>
            Data ::::: <br/>
            type : {block.data.type}<br/>
            sender : {block.data.sender}<br/>
            Valid Signatue : {block.data.valsig ? "true" : "false"}<br/>
            <hr></hr>
            Instructions::::: <br/>
            From:{block.data.instructions.from}<br/>
            To:{block.data.instructions.to}<br/>
            Success:{block.data.instructions.success ? "true" : "false"}<br/>
            <hr></hr>
            Token: NFT <br/>
            description: {block.data.instructions.token.description}<br/>
            nftHash: {block.data.instructions.token.hash}<br/>
            title: {block.data.instructions.token.title}<br/>
            url: {block.data.instructions.token.url}<br/>
        </p>
    );
}

export function displayNft (block) {
    const blockhash = block.blockHash
    const title = block.data.instructions.token.title
    const imgUrl = block.data.instructions.token.url
    const desc = block.data.instructions.token.description
    const tokenHash = block.data.instructions.token.hash
    console.log(imgUrl);
    return (
        <div className="nftBlock">
            <h2>{title}</h2>
            <img src={imgUrl} className="nftImg"/>
            <p>Description: {desc} </p>
            <p>Token Hash: {tokenHash}</p>
            <p>Blockhash: {blockhash}</p>
        </div>
    )
}