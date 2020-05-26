import { AsyncRouter } from 'express-async-router';
import { addTicket, getExchangeCycles } from './ExchangeCycle.controller';

const router = AsyncRouter();

router.get('/:userId', getExchangeCycles);
router.put('/tickets', addTicket);

export default router;
