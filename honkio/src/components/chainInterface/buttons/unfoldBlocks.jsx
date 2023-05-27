export function unfoldBlock(block){
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
        return (
            <div className="blockDiv">
                {unfoldBlock(block)}
            </div>
            )
    })
    return html
}
