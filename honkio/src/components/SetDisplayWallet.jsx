import { useContext } from "react";
import { HonkU8Arr, HonkBs58 } from "../web3js/HonkBs58";
import Signer from "../web3js/blockchain/Signer"
import { WalletContext } from "../contexts/WalletContext";


export const SetDisplayWallet = (wallet, saveWallet) => {
    const handleSubmitPrivate = (event) => {
        event.preventDefault()
        const privkey = event.target.privateKey.value
        const privU8 = HonkU8Arr(privkey)
        if (privU8.length !== 64) {
            // Throw Error
        }
        const signer = new Signer(privU8)
        return;
    }

    const handleSubmitNew= (event) => {
        console.log('creating wallet');
        event.preventDefault()
        const signer = new Signer()
        saveWallet(signer)
    }

    return (

        <div id="accountQueryDiv">
            <div id="privKeyDiv">
                <h2>Connect with Private Key</h2>
                <form onSubmit={handleSubmitPrivate}>
                    <input type="text" name="privateKey"></input>
                    <button type="submit">Connect Wallet</button>
                </form>
            </div>
            <div>
                <h2>Create New Wallet</h2>
                <h4>Would you like your address to start with a *vanity string*? (Leave blank if not)</h4>
                <form onSubmit={handleSubmitNew}>
                    <input type="text" name="vanity"></input>
                    <button type="submit">Create Wallet</button>
                </form>
            </div>
        </div>
/*         :
        <div id="displayWallet">
            <h2>Your wallet:</h2>
            <p>
                Public Key: {HonkBs58(walletContext.wallet.account.keys.publicKey)}
                Private Key: {HonkBs58(walletContext.wallet.account.keys.secretKey)}
            </p>
        </div> */

    )
}