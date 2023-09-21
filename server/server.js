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

const tester = [];

server.listen(serverPort, () => {
  console.log(`Server hosted on port:${serverPort}`);
});
//{room:{members:[], messages:[{}]}}
//message structure
let messages = [];
io.on('connection', (socket) => {
    
    console.log("User connected from frontend.");
    socket.on('video', (info) => {
      console.log('Video Event : ', info);
      socket.broadcast.emit('video', { ...info, senderSocketId: socket.id });
    });
    socket.on('comment', (comment) => {
      let newestMessage = {...comment, pinned:false, sender:socket.id, id:messages.length+1, at:Date.now()}; 
      messages.push(newestMessage);
      io.emit('comment', newestMessage);//change this
      console.log('Comment Event : ', comment);
    });
    // socket.on('disconnect', () => {
    //   const disconnectedUser = users[socket.id];
    //   if (disconnectedUser) {
    //     socket.broadcast.emit('userDisconnected', { username: disconnectedUser.username });
    //     delete users[socket.id];
    //   }
    // });
    socket.on('pin', (pinInfo) => {
      console.log(messages);
      console.log(pinInfo);
      const pinned = (pinInfo.pinned ? true : false);
      messages[pinInfo.messageId-1].pinned = pinned; 
      socket.broadcast.emit('update', {type:'pin', messageId:pinInfo.messageId, pinned:pinned})

    });
    socket.on('pin2', (pinInfo) => {
      /*  web serial/web usb usage*/
      console.log(pinInfo);
    });
    socket.on('comments_all', () => {//this is probably bad
      socket.emit('comments_all', messages);
    });
    socket.on('ping', (arg) => {
      socket.emit('pong', tester);
    });    
 
});