import express from 'express';
import ticketRouter from './Ticket';
import userRouter from './User';
import mailAuthRouter from './MailAuth';
import concertRouter from './Concert';
import exchangeCycleRouter from './ExchangeCycle'

const router = express.Router();

router.use('/tickets', ticketRouter);
router.use('/users', userRouter);
router.use('/mailAuth', mailAuthRouter);
router.use('/concerts', concertRouter);
router.use('/exchangecycles', exchangeCycleRouter);


export default router;