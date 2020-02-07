import express from 'express';
import ticketRouter from './Ticket';
import userRouter from './User';
import mailAuthRouter from './MailAuth';
import concertRouter from './Concert';

const router = express.Router();

router.use('/tickets', ticketRouter);
router.use('/users', userRouter);
router.use('/mailAuth', mailAuthRouter);
router.use('/concerts', concertRouter);


export default router;