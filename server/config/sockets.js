import io from 'socket.io';

export const emitTicketsUpdate = () => {
    socket.broadcast.emit('hi');
};

export const onEmitTicketsUpdate = (callback) => {

};

export const initSocket = (app) => {
    const sockets = io(app);
    sockets.on('connection', (socket) => {
        console.log('a user connected');
        onEmitTicketsUpdate(() => {

        });
    });
};