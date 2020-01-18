import express from 'express';
import morgan from 'morgan';
import http from 'http';
import router from '../api';
import { initSocket } from './sockets';


export default () => {
    const app = express();

    const server = http.createServer(app);

    app.use('/static', express.static('../bundle'));
    app.use('/assets', express.static('assets'));
    app.use(morgan('dev', { immediate: true }));
    app.use(express.json());

    app.use('/api', router);

    initSocket(server);

    server.listen(process.env.HOST_PORT, () => console.log(`Listening on port ${process.env.HOST_PORT}`));
};