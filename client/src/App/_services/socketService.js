import io from 'socket.io-client';

let sockets = null;

export const initSockets = () => {
    sockets = io();
};

export const registerSocketEvent = (message, func) => {
    if (sockets != null) {
        sockets.on(message, func);
        console.log(`socket was registered for ${message} event`);
    }
};