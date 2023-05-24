export const Main= () => {

    const sendGet = async () => {
        const res = await fetch('http://localhost:6969/honkRpc')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => { 
                console.log(err);
        })
    }

    const getHistory = async () => {
        const res = await fetch('http://localhost:6969/honkRpc/history')
        .then(response => response.json())
        .then(data => console.log(data.data[0]))
        .catch(err => console.log(err))
    }

    const latestBlock = async () => {
        const res = await fetch('http://localhost:6969/honkRpc/history/latest')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => { 
                console.log(err);
        })
    }

    const getBlocksInRange = async () => {
        const start = 0
        const end = Date.now()
        console.log(start, end);
        const res = await fetch(`http://localhost:6969/honkRpc/history/range/?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data => console.log(data))
        .catch(err => { 
            console.log(err);
        })
    }

    return (
        <main>
            <h1>HONK!</h1>
            <h1>HONK!</h1>
            <h1>HONK!</h1>
            <button type="button" onClick={getHistory}>Get History</button>
            <button type="button" onClick={latestBlock}>Get Latest Block</button>
            <button type="button" onClick={sendGet}>Ping</button>
            <button type="button" onClick={getBlocksInRange}>Get Range</button>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tempora ut sit nobis eveniet, voluptatum nesciunt neque ipsam vel consectetur placeat! Omnis expedita hic minima veritatis vitae cum eveniet voluptas.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus molestiae ad eius harum temporibus enim sequi eum! Ad vitae, deserunt consectetur consequuntur placeat quidem a? Ullam assumenda error repellat corporis.
                Lorem ipsdsadu   dolor sit amet consectetur adipisicing elit. Id doloremque unde placeat eaque in natus officia quam ex pariatur voluptatum tempora voluptatem, illo laboriosam rerum officiis! Autem accusantium ex enim!
            
            </p>
        </main>
    )
}