import { InteractionButtons } from "./chainInterface/InteractionButtons"; 
import { SetDisplayWallet } from "./chainInterface/SetDisplayWallet";
import { WalletContext } from "../contexts/WalletContext";
import { useContext, useEffect, useState } from "react";


export const Main= () => {
    const {wallet , saveWallet} = useContext(WalletContext);

    const [interfaceDisplay, setInterfaceDisplay] = useState("_");

    useEffect(() => {
        console.log(wallet);
    }, [interfaceDisplay, wallet]);


    return (
        wallet === undefined 
        ?
        <main>
        <h1>HONK.IO</h1>
            <section id="chainInterface">
                <InteractionButtons/>
                <div id="responseDisplay">
                    <SetDisplayWallet setInterfaceDisplay={setInterfaceDisplay}/>
                </div>
            </section>
        </main>
        :
        <main>
            <h1>HONK.IO</h1>
            <section id="chainInterface">
                <InteractionButtons setInterfaceDisplay={setInterfaceDisplay} />
                <div id="responseDisplay">
                    {interfaceDisplay}
                </div>
            </section>
        </main>
    );
};

