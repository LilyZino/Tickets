// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
import { getAllUsers, addUser, editUser, getUser, login, getUsersSoldTicketsCount } from './User.controller';

const router = AsyncRouter();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.get('/ticketCount/:id', getUsersSoldTicketsCount);
router.put('/', addUser);
router.post('/', editUser);
router.put('/login', login);

export default router;
