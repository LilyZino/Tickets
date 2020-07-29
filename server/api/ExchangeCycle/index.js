import { AsyncRouter } from 'express-async-router';
import { addTicket, getExchangeCycles, approveExchange } from './ExchangeCycle.controller';

const router = AsyncRouter();

router.get('/:userId', getExchangeCycles);
router.put('/tickets', addTicket);
router.post('/approve', approveExchange);

export default router;
