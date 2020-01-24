/* eslint-disable object-curly-newline */
// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
import { getAllTickets, addTicket, getTicketsByUser, getTicket, editTicket, deleteTicket, getTicketsByConcert } from './Ticket.controller';

const router = AsyncRouter();

router.get('/', getAllTickets);
router.get('/:id', getTicket);
router.put('/', addTicket);
router.post('/', editTicket);
router.get('/user/:userId', getTicketsByUser);
router.get('/concert/:concertId', getTicketsByConcert);
router.delete('/:id', deleteTicket);

export default router;
