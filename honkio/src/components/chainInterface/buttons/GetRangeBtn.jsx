import { unfoldBlocks } from "./unfoldBlocks"

export const GetRangeBtn = ({ setInterfaceDisplay, RPC_URL }) => {

    const getBlocksInRange = async () => {
        const start = 0
        const end = Date.now()
        console.log(start, end);
        const res = await fetch(`${RPC_URL}/history/range/?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data =>  setInterfaceDisplay(unfoldBlocks(data.data)))
        .catch(err => { 
            console.log(err);
        })
    }

    return (
        <button type="button" onClick={getBlocksInRange}>Get Blocks in Range</button>
    )
}