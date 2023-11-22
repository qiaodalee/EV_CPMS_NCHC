ws.onopen = () => {
    console.log('Connect to ' + ws.url)
    IDReq = { header: "IDReq", body: { id: ws_id } }
    ws.send(JSON.stringify(IDReq))
}

ws.onclose = () => {
    console.log('Close connection')
}

function send_message(message) {
    setTimeout(() => {
        ws.send(JSON.stringify(message))
    }, 30)
}
