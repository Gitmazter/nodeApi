import BurnTx from "../../../web3js/blockchain/transactions/BurnTx"
import { WalletContext } from "../../../contexts/WalletContext"
import { HonkBs58 } from "../../../web3js/HonkBs58"
import { unfoldBlock } from "./unfoldBlocks"
import { useContext } from "react"
import axios from "axios"

export const BurnBtn = ({ setInterfaceDisplay, RPC_URL}) => {
    const { wallet, saveWallet } = useContext(WalletContext);

    const burnInterface = () => {
        setInterfaceDisplay(burnForm(sendTx));
    };


    const sendTx = async (e) => {
        e.preventDefault();
        const sender = HonkBs58(wallet.account.keys.publicKey);
        const amount = e.target.amount.value;

        const txData = new BurnTx(sender, amount);
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
            console.log(err);
        };
    };

    return (
        <button type="button" onClick={burnInterface}>Burn $GOOS</button>
    );
};

function burnForm (sendTx) {
    return (
        <form onSubmit={sendTx}>
            <input name="amount" type="number" placeholder="amount to burn"></input>
            <button type="submit">Burn GOOS</button>
        </form>
    );
};