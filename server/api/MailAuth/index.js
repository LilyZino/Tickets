// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
import { sendAuthenticationMail, verifyCode } from './MailAuth.controller';

const router = AsyncRouter();

router.post('/', sendAuthenticationMail);
router.get('/verify/:userMail/:uuid', verifyCode);

export default router;
