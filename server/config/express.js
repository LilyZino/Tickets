import express from 'express';
import morgan from 'morgan';
import http from 'http';
import path from 'path';
import serveStatic from 'serve-static';
import router from '../api';
import { initSocket } from './sockets';

const cors = require('cors');
// const bodyParser = require('body-parser');


export default () => {
  const app = express();

  const server = http.createServer(app);
  app.use('/public', express.static(path.join(__dirname, 'public')));

  // app.use('/static', express.static('../bundle'));
  // app.use('/assets', express.static('assets'));
  console.log('dirname', path.join(__dirname, '../../public/uploads'));
  app.use(morgan('dev', { immediate: true }));
  app.use(express.json());

  app.use('/api', router);

  app.use(cors()); // it enables all cors requests
  // app.use(fileUpload());
  // app.use(busboy());
  // app.use(methodOverride());
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());

  initSocket(server);

  server.listen(process.env.HOST_PORT, () => console.log(`Listening on port ${process.env.HOST_PORT}`));
};