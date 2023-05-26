import AirdropTx from "../honkCrypto/transactions/AirdropTx";
import Signer from "../honkCrypto/Signer";
import { HonkBs58 } from "../honkCrypto/crypto/HonkBs58";
import axios from "axios";


export const Main= () => {
    // ENV vars don't work in React until npm build is called and deployed
    const RPC_URL = process.env.HONK_RPC_BASE_URL || "http://localhost:1235/honkRpc"
    const signer = new Signer()

    const sendPing = async () => {
        const res = await fetch(RPC_URL)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => { 
                console.log(err);
        })
    }

    const getHistory = async () => {
        const start = 0
        const end = Date.now()
        console.log(start, end);
        const res = await fetch(`${RPC_URL}/history/range/?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data => console.log(data))
        .catch(err => { 
            console.log(err);
        })
    }

    const latestBlock = async () => {
        const res = await fetch(`${RPC_URL}/history/latest`)
            .then(response => response.json())
            .then(data => console.log(data))
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
            .then(data => console.log(data))
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
            <h1>HONK!</h1>
            <h1>HONK!</h1>
            <h1>HONK!</h1>
            <button type="button" onClick={getHistory}>Get History</button>
            <button type="button" onClick={latestBlock}>Get Latest Block</button>
            <button type="button" onClick={sendPing}>Ping</button>
            <button type="button" onClick={getBlocksInRange}>Get Range</button>
            <button type="button" onClick={airdropTest}>Test Airdrop</button>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tempora ut sit nobis eveniet, voluptatum nesciunt neque ipsam vel consectetur placeat! Omnis expedita hic minima veritatis vitae cum eveniet voluptas.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus molestiae ad eius harum temporibus enim sequi eum! Ad vitae, deserunt consectetur consequuntur placeat quidem a? Ullam assumenda error repellat corporis.
                Lorem ipsdsadu   dolor sit amet consectetur adipisicing elit. Id doloremque unde placeat eaque in natus officia quam ex pariatur voluptatum tempora voluptatem, illo laboriosam rerum officiis! Autem accusantium ex enim!
            </p>
        </main>
    )
}