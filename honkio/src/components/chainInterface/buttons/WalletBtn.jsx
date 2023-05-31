import { useContext } from "react";
import { WalletContext } from "../../../contexts/WalletContext";
import { SetDisplayWallet } from "../SetDisplayWallet";
import { HonkBs58, HonkU8Arr } from "../../../honk-web3js/HonkBs58";

export const WalletBtn = ({ setInterfaceDisplay }) => {

    const {wallet, saveWallet} = useContext(WalletContext)

    const walletConnect = async () => {
        if (wallet === undefined) {
            setInterfaceDisplay(SetDisplayWallet())
        }
        else {
            setInterfaceDisplay(showKeys(wallet))
        };
    };

    return (
        <button type="button" onClick={walletConnect} id="walletBtn">{wallet == undefined ? "Create/Connect Wallet" : "Show Keys"}</button>
    )
}


export function showKeys (wallet) {
    return (
        <div id="keysDiv">
            <h3><u>Welcome To HonkChain!</u></h3>
            <p>
                Public Key = {HonkBs58(wallet.account.keys.publicKey)} <br/>
                <hr/>
            </p>
            <h4><u>Remember to save your private key if you havnen't already!</u></h4>
            <p>
                Private Key = {HonkBs58(wallet.account.keys.secretKey)}
            </p>
        </div>
    )
}