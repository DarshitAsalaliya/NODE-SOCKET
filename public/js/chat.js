const socket = io();

// Event From Server
socket.on('countUpdated',(count)=>{
    console.log(count);
});

document.querySelector('#increment').addEventListener('click',()=>{
    // Create New Event
    socket.emit('increment');
});

// Form Submit Event To Server
document.querySelector('#myForm').addEventListener('submit',(e)=>{  
    e.preventDefault();

    const msg = document.querySelector('#msg').value;
   
    // Create 
    socket.emit('onmsg',msg);
});

// Event From Server
socket.on('getmsg',(msg)=>{
    console.log(msg);
});