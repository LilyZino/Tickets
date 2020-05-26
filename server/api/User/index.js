// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
import { getAllUsers, addUser, editUser, getUser, getUserPurchases, login, getUsersSoldTicketsCount, setUserCredits, getUserCredits, setUserRank } from './User.controller';

const router = AsyncRouter();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.get('/ticketCount/:id', getUsersSoldTicketsCount);
router.post('/rank', setUserRank);
router.post('/credits', setUserCredits);
router.put('/credits', getUserCredits);
router.put('/', addUser);
router.post('/', editUser);
router.put('/login', login);
router.get('/purchases/:id', getUserPurchases);

export default router;
