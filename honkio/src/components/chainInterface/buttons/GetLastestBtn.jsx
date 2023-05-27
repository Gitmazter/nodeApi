import { unfoldBlock } from "./unfoldBlocks"


export const GetLatestBtn = ({ setInterfaceDisplay, RPC_URL }) => {


    const latestBlock = async () => {
        const res = await fetch(`${RPC_URL}/history/latest`)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data.blockHash);
                setInterfaceDisplay(unfoldBlock(data.data))
            })
            .catch(err => { 
                console.log(err);
        })
    }

    return (
        <button type="button" onClick={latestBlock}>Get Latest Block</button>
    )
}