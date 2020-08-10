import express from 'express';
import morgan from 'morgan';
import http from 'http';
import path from 'path';
import router from '../api';
import { initSocket } from './sockets';

const cors = require('cors');


export default () => {
    const app = express();

    const server = http.createServer(app);
    app.use('/public', express.static(path.join(__dirname, 'public')));

    console.log('dirname', path.join(__dirname, '../../public/uploads'));
    app.use(morgan('dev', { immediate: true }));
    app.use(express.json());

    app.use('/api', router);

    app.use(cors()); // it enables all cors requests

    initSocket(server);

    server.listen(process.env.HOST_PORT, () => console.log(`Listening on port ${process.env.HOST_PORT}`));
};