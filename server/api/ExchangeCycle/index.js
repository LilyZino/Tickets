import { AsyncRouter } from 'express-async-router';
import { addTicket } from './ExchangeCycle.controller'

const router = AsyncRouter();

router.put('/tickets', addTicket);

export default router;
