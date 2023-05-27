import axios from "axios"
import { HonkBs58 } from "../../../web3js/HonkBs58"
import { unfoldBlock } from "./unfoldBlocks"
import { WalletContext } from "../../../contexts/WalletContext"
import { useContext } from "react"
import TransactTx from "../../../web3js/blockchain/transactions/TransactTx"

export const SendTxBtn = ({ setInterfaceDisplay, RPC_URL, txType }) => {
    
    const { wallet, saveWallet } = useContext(WalletContext)

    const sendTx = () => {
        

    }

    return (
        <button type="button" onClick={sendTx}></button>
    )
}