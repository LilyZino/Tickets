/* eslint-disable object-curly-newline */
import { AsyncRouter } from 'express-async-router';
import { getAllTickets, addTicket, getTicketsByUser, getTicket, editTicket, deleteTicket, getTicketsByConcert } from './Ticket.controller';
import upload from '../middlewares/upload';

const router = AsyncRouter();

router.get('/', getAllTickets);
router.get('/:id', getTicket);
router.put('/', upload.any(), addTicket);
router.post('/', editTicket);
router.post('/buy', buyTicket);
router.get('/user/:userId', getTicketsByUser);
router.get('/concert/:concertId', getTicketsByConcert);
router.delete('/:id', deleteTicket);

export default router;
