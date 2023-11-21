const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path')
const { Server } = require("socket.io")

app.use(express.static(path.resolve('./public')))
const io = new Server(server)

//socket io
io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit('message', message)
    })
})

app.get('/', (req, res) => {
    return res.sendFile('./public/index.html')
})

server.listen(9000, () => console.log(`Server listening on PORT 9000`))