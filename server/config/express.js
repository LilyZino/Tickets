import express from 'express';
import morgan from 'morgan';
import http from 'http';
import router from '../api';
import { initSocket } from './sockets';
import path from 'path';
const cors = require('cors')
var methodOverride = require('method-override')
const fileUpload = require('express-fileupload');
const busboy = require('connect-busboy');
const bodyParser = require('body-parser');



export default () => {
    const app = express();

    const server = http.createServer(app);

    app.use('/static', express.static('../bundle'));
    app.use('/assets', express.static('assets'));
    //app.use('/public', express.static('public/uploads'));
    app.use(morgan('dev', { immediate: true }));
    app.use(express.json());

    app.use('/api', router);

    app.use('/public', express.static(path.join(__dirname, '..', '..', 'public/uploads'))); //to access the files in public folder
    app.use(cors()); // it enables all cors requests
    app.use(fileUpload());
    app.use(busboy()); 
    app.use(methodOverride());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //app.use(formidable());
    
    //console.log(upload); 
    //app.post('/fileupload', upload.single('MyFile'),  function(req, res) {
      //  console.log("Uploading: " + req.files); 
    //});
    
    initSocket(server);

    server.listen(process.env.HOST_PORT, () => console.log(`Listening on port ${process.env.HOST_PORT}`));
};