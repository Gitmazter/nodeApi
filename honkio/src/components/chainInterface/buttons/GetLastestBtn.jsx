import { unfoldBlock } from "./unfoldBlocks"


export const GetLatestBtn = ({ setInterfaceDisplay, RPC_URL }) => {


    const latestBlock = async () => {
        const res = await fetch(`${RPC_URL}/history/latest`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setInterfaceDisplay(unfoldBlock(data.data))
            })
            .catch(err => { 
                setInterfaceDisplay(String(err.message));
        })
    }

    return (
        <button type="button" onClick={latestBlock}>Get Latest Block</button>
    )
}