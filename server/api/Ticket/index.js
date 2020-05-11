/* eslint-disable object-curly-newline */
// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
var multer  = require('multer');
import path from "path";
import { getAllTickets, addTicket, addFile, getTicketsByUser, getTicket, editTicket, deleteTicket, getTicketsByConcert } from './Ticket.controller';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../../public/uploads/'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
   
var upload = multer({ storage: storage });
const router = AsyncRouter();

router.get('/', getAllTickets);
router.get('/:id', getTicket);
router.put('/', addTicket);
router.post('/', editTicket);
router.post('/upload', upload.any(), addFile);
router.get('/user/:userId', getTicketsByUser);
router.get('/concert/:concertId', getTicketsByConcert);
router.delete('/:id', deleteTicket);

export default router;
