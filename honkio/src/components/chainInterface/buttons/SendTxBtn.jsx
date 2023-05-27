import axios from "axios"
import { HonkBs58 } from "../../../web3js/HonkBs58"
import { unfoldBlock } from "./unfoldBlocks"
import { WalletContext } from "../../../contexts/WalletContext"
import { useContext } from "react"
import TransactTx from "../../../web3js/blockchain/transactions/TransactTx"

export const SendTxBtn = ({ setInterfaceDisplay, RPC_URL, txType }) => {
    
    const { wallet, saveWallet } = useContext(WalletContext)

    const txInterface = () => {
        setInterfaceDisplay(txForm(sendTx))
    }

    const sendTx = async (e) => {
        e.preventDefault()
        const sender = HonkBs58(wallet.account.keys.publicKey)
        const amount = e.target.amount.value
        const receiver = e.target.receiver.value

        const txData = new TransactTx(sender, amount, receiver)
        const signedTxData = wallet.sign(txData)
        const senderu8 = wallet.account.keys.publicKey
        try {
            const res = await axios
                .post(
                        `${RPC_URL}/transact`,
                        {
                            "signedTransaction": JSON.stringify(signedTxData),
                            "senderU8": JSON.stringify(senderu8)
                        },
                        {headers : {"Content-Type":"application/json"}}
                    )

            setInterfaceDisplay(unfoldBlock(res.data.data))
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <button type="button" onClick={txInterface}>Send $GOOS</button>
    )
}

function txForm (sendTx) {
    return (
        <form onSubmit={sendTx}>
            <input name='receiver' type="text" placeholder="receiver" className="keyInput"></input>
            <input name='amount' type="number" placeholder="amount"></input>
            <button type='submit'>Send GOOS</button>
        </form>
    )
}