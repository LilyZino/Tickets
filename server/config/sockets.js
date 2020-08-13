import io from 'socket.io';

let socket = null;

export const informTicketsUpdated = () => {
    socket.emit('tickets-updated');
    console.log('Sending tickets was updated to all clients');
};

export const informConcertsUpdated = () => {
    socket.emit('concerts-updated');
    console.log('Sending concerts was updated to all clients');
};

export const informReportsUpdated = () => {
    socket.emit('reports-updated');
    console.log('Sending reports was updated to all clients');
};

export const initSocket = (app) => {
    socket = io(app);
    socket.on('connection', (currSocket) => {
        console.log(`User connected: ${currSocket.client.id} `);
    });
};