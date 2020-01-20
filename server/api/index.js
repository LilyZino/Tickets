import express from 'express';
import exampleModalRouter from './ExampleModel';
import postRouter from './Post';
import userRouter from './User';
import mailAuthRouter from './MailAuth';

const router = express.Router();

router.get('/', (req, res) => {
    // test route, can be deleted
    console.log('hello');
    res.send('hello');
});

router.use('/exampleModal', exampleModalRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/mailAuth', mailAuthRouter);

export default router;