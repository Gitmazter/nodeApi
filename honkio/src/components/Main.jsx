import AirdropTx from "../honkCrypto/transactions/AirdropTx";
import Signer from "../honkCrypto/Signer";
import { HonkBs58 } from "../honkCrypto/crypto/HonkBs58";
import axios from "axios";
import { useEffect, useState } from "react";


export const Main= () => {
     const [responseText, setResponseText] = useState("_")
    // ENV vars don't work in React until npm build is called and deployed
    const RPC_URL = process.env.HONK_RPC_BASE_URL || "http://localhost:1235/honkRpc"
    const signer = new Signer()

    const sendPing = async () => {
        const res = await fetch(RPC_URL)
            .then(response => response.json())
            .then(data => setResponseText(pingResponse(data)))
            .catch(err => { 
                console.log(err);
        })
    }

    useEffect(() => {

    }, [responseText])

    const getHistory = async () => {
        const start = 0
        const end = Date.now()
        console.log(start, end);
        const res = await fetch(`${RPC_URL}/history/range/?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data => setResponseText(unfoldBlocks(data.data)))
        .catch(err => { 
            console.log(err);
        })
    }

    const latestBlock = async () => {
        const res = await fetch(`${RPC_URL}/history/latest`)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data.blockHash);
                setResponseText(unfoldBlock(data.data))
            })
            .catch(err => { 
                console.log(err);
        })
    }

    const getBlocksInRange = async () => {
        const start = 0
        const end = Date.now()
        console.log(start, end);
        const res = await fetch(`${RPC_URL}/history/range/?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data =>  setResponseText(unfoldBlocks(data.data)))
        .catch(err => { 
            console.log(err);
        })
    }

    const airdropTest = async () => {
        const sender = HonkBs58(signer.account.keys.publicKey)
        const txData = new AirdropTx(sender)
        const signedTxData = signer.sign(txData)
        const senderu8 = signer.account.keys.publicKey
        try {
            const res = await axios
                .post(
                    `${RPC_URL}/transact`,
                    {
                        "signedTransaction": JSON.stringify(signedTxData),
                        "senderU8": JSON.stringify(senderu8)
                    },
                    {
                        headers : {
                            "Content-Type":"application/json"
                        }
                    })

            console.log(res.data.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <main>
            <h1>HONK.IO</h1>
            <section id="chainInterface">
                <div id="interactionButtons">
                    <button type="button" id="walletBtn">Create/Connect Wallet</button>
                    <button type="button" /* onClick={getAccountHistory} */>Get Wallet Balances</button>
                    <button type="button" /* onClick={getAccountHistory} */>Get Wallet Transactions</button>
                    <button type="button" onClick={sendPing}>Ping RPC endpoint</button>
                    <button type="button" onClick={latestBlock}>Get Latest Block</button>
                    <button type="button" onClick={getHistory}>Get Full Block History</button>
                    <button type="button" onClick={getBlocksInRange}>Get Blocks in Range</button>
                    <button type="button" onClick={airdropTest}>Test Airdrop</button>
                    <button type="button" /* onClick={mintTest} */>Test Mint</button>
                    <button type="button" /* onClick={txTest} */>Test Transact</button>
                    <button type="button" /* onClick={burnTest} */>Test Burn</button>
                </div>
                <div id="responseDisplay">
                {responseText}
                </div>
            </section>
        </main>
    )
}

function unfoldBlock(block){
    // If type HONK-mint-nft // write special unfold response for "TOKEN" field using NFT object
    const dateTime = new Date(block.timestamp*1000)
    return (
        <p> 
            Block Depth :{block.blockDepth} <br/>
            Timestamp : {block.timestamp}<br/>
            DateTime: {dateTime.getFullYear()}/{dateTime.getMonth()+1}/{dateTime.getDate()}.{dateTime.getHours()}:{dateTime.getMinutes()}:{dateTime.getMinutes()} <br/>
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

function unfoldBlocks(blocks) {

    const html = blocks.map((block) => {
        return (
            <div className="blockDiv">
                {unfoldBlock(block)}
            </div>
            )
    })
    console.log(html);
    return html

}

function pingResponse(pingRes) {
    return (
        <div>
            <p>
            response : "{pingRes.data}" <br/>
            status : {pingRes.status} <br/>
            statusCode : {pingRes.statusCode} <br/>
            </p>
        </div>
    )
}  