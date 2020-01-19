import io from 'socket.io';

let socket = null;

export const informTicketsUpdated = () => {
    socket.emit('posts-updated');
    console.log('Sending post was updated to all clients');
};

export const initSocket = (app) => {
    socket = io(app);
    socket.on('connection', (currSocket) => {
        console.log(`User connected: ${currSocket.client.id} `);
    });
};