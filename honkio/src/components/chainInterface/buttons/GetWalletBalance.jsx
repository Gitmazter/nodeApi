import { WalletContext } from "../../../contexts/WalletContext";
import { HonkBs58 } from "../../../honk-web3js/HonkBs58";
import { filterUserBlocks } from "./GetWalletTxs";
import { useContext } from "react";
import axios from 'axios';
import { displayNft } from "./unfoldBlocks";

export const GetWalletBalance = ({ setInterfaceDisplay, RPC_URL}) => {

    const { wallet, saveWallet } = useContext(WalletContext);

    const getData = async () => {
        const user = HonkBs58(wallet.account.keys.publicKey);
        let chain
        try {
            chain = await axios.get(`${RPC_URL}/history/range/?start=${0}&end=${Date.now()}`);
        }
        catch (err) {
            setInterfaceDisplay(String(err.message))
            return
        }
        const userBlocks = filterUserBlocks(chain.data.data, user);

        setInterfaceDisplay(balancesDisplay(userBlocks, user))
    };

    return (
        <button onClick={getData}>Get Wallet Balance</button>
    );
};

export function balancesDisplay (blocks, user) {
    let nftBlocks = [];
    let goosBalance = 0;

    blocks.map(block => {
        if(block.data.type === "HONK-mint-nft") {
            nftBlocks.push(block)
        }
        else if (block.data.instructions.to === user) {
            goosBalance += block.data.instructions.amount;
        }
        else if (block.data.instructions.from === user) {
            goosBalance -= block.data.instructions.amount
        }
    });

    const nftHtml = nftBlocks.map(block => {
        return displayNft(block)
    })
    console.log(goosBalance);
    return (
        <div id="accountSummary">
            <h2><u>Account Summary</u></h2>
            <h3>Account balance = {goosBalance} $GOOS</h3>
            <br/><br/>
            <h2><u>Your NFT's</u></h2>
            {nftHtml}
        </div>
    )
}