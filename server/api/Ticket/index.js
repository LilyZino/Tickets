/* eslint-disable object-curly-newline */
// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
var multer  = require('multer');
import { getAllTickets, addTicket, addFile, getTicketsByUser, getTicket, editTicket, deleteTicket, getTicketsByConcert } from './Ticket.controller';

var upload = multer({ dest: '../../../public/uploads' });
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
