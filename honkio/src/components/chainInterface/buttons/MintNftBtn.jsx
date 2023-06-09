import axios from "axios"
import { HonkBs58 } from "../../../honk-web3js/HonkBs58"
import { displayNft, unfoldNftBlock } from "./unfoldBlocks"
import { WalletContext } from "../../../contexts/WalletContext"
import { useContext } from "react"
import MintNftTx from "../../../honk-web3js/blockchain/transactions/MintNftTx"

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
            setInterfaceDisplay(displayNft(res.data.data))
        }
        catch (err) {
            setInterfaceDisplay(String(err.message))
        }
    }


    return (
        <button type="button" onClick={sendTx}>Mint Nft</button>
    )
}