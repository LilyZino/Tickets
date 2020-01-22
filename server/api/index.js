import express from 'express';
import postRouter from './Post';
import userRouter from './User';
import mailAuthRouter from './MailAuth';

const router = express.Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/mailAuth', mailAuthRouter);

export default router;