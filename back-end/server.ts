import { Server } from "socket.io";

const io = new Server(3000);

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('disconnect', () => {
        console.log('disconnected');
    });

    socket.on('message', (message) => {
        console.log('Server received:', message);
        io.emit('message', message);
    });
});

console.log('listening on port 3000');
