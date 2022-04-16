const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = socketio(server);

const port = process.env.PORT || 3000;

// For JSON Support
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

count = 0;
io.on('connection',(socket)=>{
    
    console.log('Connected..');
    
    // Create New Event
    socket.emit('countUpdated',count);

    socket.on('increment',()=>{
        count++;
        // Only Change In 1 Client(Browser)
        //socket.emit('countUpdated',count);

        // Change In All Connected Client(Browser)
        io.emit('countUpdated',count);
    });

    socket.on('onmsg',(msg)=>{
        // Only Change In 1 Client(Browser)
        //socket.emit('getmsg',msg);

        // Change In All Connected Client(Browser)
        io.emit('getmsg',msg);
    });

    socket.on('disconnect',()=>{
        io.emit('getmsg','A user has left!');
    });
});

// Server
server.listen(port, ()=>{

});