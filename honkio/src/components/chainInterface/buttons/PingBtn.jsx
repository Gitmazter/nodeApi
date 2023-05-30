export const PingBtn = ({ setInterfaceDisplay, RPC_URL }) => {

    const sendPing = async () => {
        const res = await fetch(RPC_URL)
            .then(response => response.json())
            .then(data => setInterfaceDisplay(pingResponse(data)))
            .catch(err => {setInterfaceDisplay(String(err.message))});
    };

    return (
        <button type="button" onClick={sendPing}>Ping RPC endpoint</button>
    )
}

const pingResponse = (pingRes) => {
    return (
        <div>
            <p>
            response : "{pingRes.data}" <br/>
            status : {pingRes.status} <br/>
            statusCode : {pingRes.statusCode} <br/>
            </p>
        </div>
    );
};