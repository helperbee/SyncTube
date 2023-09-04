require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const http = require('http');
const server = http.createServer(app);
const serverPort = process.env.PORT || 3000;

const { Server } = require("socket.io");//https://adamtheautomator.com/https-nodejs/ will need https for deployment.
const io = new Server(server, {cors: {
  origin: "*",
  methods: ["GET", "POST"]
}});



server.listen(serverPort, () => {
  console.log(`Server hosted on port:${serverPort}`);
});


io.on('connection', (socket) => {
    console.log("User connected from frontend.");
    socket.on('video', (info) => {
      socket.broadcast.emit('video', info);
    });
    socket.on('ping', (arg) => {
      socket.emit('pong', "hey");
    });    
 
});