import { unfoldBlocks } from "./unfoldBlocks"

export const GetRangeBtn = ({ setInterfaceDisplay, RPC_URL }) => {
    const rangeInterface = () => {
        setInterfaceDisplay(rangeForm(getBlocksInRange));
    };

    const getBlocksInRange = async (e) => {
        e.preventDefault()
        const start = e.target.start.value
        const end = e.target.end.value
        console.log(start, end);
        const res = await fetch(`${RPC_URL}/history/range/?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data =>  setInterfaceDisplay(unfoldBlocks(data.data)))
        .catch(err => { 
            setInterfaceDisplay(String(err.message));
        })
    }

    return (
        <button type="button" onClick={rangeInterface}>Get blocks in range</button>
    );
}

function rangeForm (getBlocksInRange) {
    return (
        <form onSubmit={getBlocksInRange}>
            <input name="start" type="number" placeholder="start time (UNIX)"></input>
            <input name="end" type="number" placeholder="end time (UNIX)"></input>
            <button type="submit">Get blocks in range</button>
        </form>
    );
};