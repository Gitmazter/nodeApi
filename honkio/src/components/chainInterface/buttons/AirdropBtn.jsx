import AirdropTx from "../../../web3js/blockchain/transactions/AirdropTx" 
import { WalletContext } from "../../../contexts/WalletContext"
import { HonkBs58 } from "../../../web3js/HonkBs58"
import { unfoldBlock } from "./unfoldBlocks"
import { useContext } from "react"
import axios from "axios"

export const AirdropBtn = ({ setInterfaceDisplay, RPC_URL }) => {

    const { wallet, saveWallet } = useContext(WalletContext);

    const airdropTest = async () => {
        const sender = HonkBs58(wallet.account.keys.publicKey);
        const txData = new AirdropTx(sender);
        const signedTxData = wallet.sign(txData);
        const senderu8 = wallet.account.keys.publicKey;
        try {
            const res = await axios
                .post(
                        `${RPC_URL}/transact`,
                        {
                            "signedTransaction": JSON.stringify(signedTxData),
                            "senderU8": JSON.stringify(senderu8)
                        },
                        {headers : {"Content-Type":"application/json"}}
                    );

            setInterfaceDisplay(unfoldBlock(res.data.data));
        }
        catch (err) {
            setInterfaceDisplay(String(err.message));
        };
    };

    return (
        <button type="button" onClick={airdropTest}>Request Airdrop</button>
    );
};