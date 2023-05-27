import { PingBtn } from "./buttons/PingBtn"
import { AirdropBtn } from "./buttons/AirdropBtn"
import { GetRangeBtn } from "./buttons/GetRangeBtn"
import { GetHistoryBtn } from "./buttons/GetHistoryBtn"
import { GetLatestBtn } from "./buttons/GetLastestBtn"
import { WalletBtn } from "./buttons/WalletBtn"
import { MintNftBtn } from "./buttons/MintNftBtn"
import { BurnBtn } from "./buttons/BurnBtn"
import { SendTxBtn } from "./buttons/SendTxBtn"
import { GetWalletTxs } from "./buttons/GetWalletTxs"
import { GetWalletBalance } from "./buttons/GetWalletBalance"

export const InteractionButtons = ({ setInterfaceDisplay }) => {

    const RPC_URL = process.env.HONK_RPC_BASE_URL || "http://localhost:1235/honkRpc";

    return (
        <div id="interactionButtons">
            <WalletBtn setInterfaceDisplay={ setInterfaceDisplay } />
            <GetWalletTxs setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL}/>
            <GetWalletBalance setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL} />
            <PingBtn setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL} />
            <GetLatestBtn setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL} />
            <GetHistoryBtn setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL } />
            <GetRangeBtn setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL } />
            <AirdropBtn setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL} />
            <MintNftBtn setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL} />
            <SendTxBtn setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL } />
            <BurnBtn setInterfaceDisplay={ setInterfaceDisplay } RPC_URL={ RPC_URL} />
        </div>
    );
};

