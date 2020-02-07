// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
import { verifyCode } from './MailAuth.controller';

const router = AsyncRouter();

router.get('/verify/:userMail/:uuid', verifyCode);

export default router;
