// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
import { getAllUsers, addUser, blockUser, unblockUser, getUser, getUserPurchases, login, getUsersSoldTicketsCount, setUserCredits, getUserCredits, setUserRank, reportUser, removeReport } from './User.controller';

const router = AsyncRouter();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.get('/ticketCount/:id', getUsersSoldTicketsCount);
router.get('/purchases/:id', getUserPurchases);
router.post('/rank', setUserRank);
router.post('/credits', setUserCredits);
router.post('/block/:id', blockUser);
router.post('/unblock/:id', unblockUser);
router.post('/report', reportUser);
router.post('/remove_report', removeReport);
router.put('/credits', getUserCredits);
router.put('/', addUser);
router.put('/login', login);

export default router;
