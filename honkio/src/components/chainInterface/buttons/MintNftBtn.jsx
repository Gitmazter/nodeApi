import axios from "axios"
import { HonkBs58 } from "../../../web3js/HonkBs58"
import { unfoldNftBlock } from "./unfoldBlocks"
import { WalletContext } from "../../../contexts/WalletContext"
import { useContext } from "react"
import MintNftTx from "../../../web3js/blockchain/transactions/MintNftTx"

export const MintNftBtn = ({ setInterfaceDisplay, RPC_URL }) => {
    
    const { wallet, saveWallet } = useContext(WalletContext)

    const sendTx = async () => {
        const sender = HonkBs58(wallet.account.keys.publicKey)
        const txData = new MintNftTx(sender)
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
            console.log(res.data.data);
            //setInterfaceDisplay(unfoldNftBlock(res.data.data))
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <button type="button" onClick={sendTx}></button>
    )
}