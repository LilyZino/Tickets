// here we will configure the ExampleModel's router
import { AsyncRouter } from 'express-async-router';
import { getAllUsers, addUser, editUser, getUser, login } from './User.controller';

const router = AsyncRouter();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/', addUser);
router.post('/', editUser);
router.put('/login', login);

export default router;
