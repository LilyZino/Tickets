// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
import { getAllUsers, addUser, editUser, getUser, login, getUsersSoldTicketsCount, getUsersRank, setUserRank } from './User.controller';

const router = AsyncRouter();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.get('/ticketCount/:id', getUsersSoldTicketsCount);
// router.get('/rank/:id', getUsersRank);
router.post('/rank', setUserRank);
router.put('/', addUser);
router.post('/', editUser);
router.put('/login', login);

export default router;
