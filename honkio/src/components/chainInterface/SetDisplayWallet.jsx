import { useContext } from "react";
import { HonkU8Arr, HonkBs58 } from "../../web3js/HonkBs58";
import Signer from "../../web3js/blockchain/Signer"
import { WalletContext } from "../../contexts/WalletContext";
import { showKeys } from "./buttons/WalletBtn";


export const SetDisplayWallet = ({ setInterfaceDisplay }) => {
    const { wallet, saveWallet } = useContext(WalletContext);

    const handleSubmitPrivate = (event) => {
        event.preventDefault();
        const privkey = event.target.privateKey.value;
        const privU8 = HonkU8Arr(privkey);
        if (privU8.length !== 64) {
            return
        };
        const signer = new Signer(privU8);
        saveWallet(signer);
        setInterfaceDisplay(showKeys(signer));
        return;
    }

    const handleSubmitNew = (event) => {
        console.log('creating wallet');
        event.preventDefault();
        const signer = new Signer(undefined, event.target.vanity.value);
        saveWallet(signer);
        setInterfaceDisplay(showKeys(signer));
    }

    return (
        <div id="accountQueryDiv">
            <div id="privKeyDiv">
                <h2>Connect with Private Key</h2>
                <form onSubmit={handleSubmitPrivate}>
                    <input type="text" name="privateKey" className="keyInput"></input>
                    <button type="submit">Connect Wallet</button>
                </form>
            </div>
            <div id="newWalletDiv">
                <h2>Create New Wallet</h2>
                <h4>Would you like your address to start with a *vanity string*? (Leave blank if not)</h4>
                <form onSubmit={handleSubmitNew}>
                    <input type="text" length='3' name="vanity"></input>
                    <button type="submit">Create Wallet</button>
                </form>
            </div>
        </div>
    );
};