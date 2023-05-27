import { WalletContext } from "../../../contexts/WalletContext";
import { HonkBs58 } from "../../../web3js/HonkBs58";
import { unfoldBlocks } from "./unfoldBlocks";
import { useContext } from "react";
import axios from 'axios';

export const GetWalletTxs = ({ setInterfaceDisplay, RPC_URL}) => {
    const { wallet, saveWallet } = useContext(WalletContext);

    const getData = async () => {
        const user = HonkBs58(wallet.account.keys.publicKey);
        const chain = await axios.get(`${RPC_URL}/history/range/?start=${0}&end=${Date.now()}`);
        const userBlocks = filterUserBlocks(chain.data.data, user);
        setInterfaceDisplay(unfoldBlocks(userBlocks))  
    };

    return (
        <button onClick={getData}>Get Wallet Transactions</button>
    );
};

export function filterUserBlocks (chain, user) {
    const filterBlocks = chain.filter(block => {
        return (block.data.instructions.to === user || block.data.instructions.from === user )
    });
    return filterBlocks
};
