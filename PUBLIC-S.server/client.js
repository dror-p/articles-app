
const WebSocket = require('ws')
const url = 'ws://localhost:14000'
const connection = new WebSocket(url)

console.log("starting client")
connection.onopen = () => {
    connection.send('Message From Client')
}

connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
    console.log(e.data)
}