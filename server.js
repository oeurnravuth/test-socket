const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;
server.listen(PORT);
console.log("Server is running");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const connections = [];

io.sockets.on("connection", socket => {
    connections.push(socket);
    console.log(" %s sockets is connected", connections.length);

    socket.on("disconnect", () => {
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on("sending message", message => {
        console.log("Message is received :", message);

        io.sockets.emit("new message", { message: message });
    });

});