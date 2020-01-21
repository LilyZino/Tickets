import { AsyncRouter } from 'express-async-router';
import { getAllConcerts, addConcert, getConcert } from './Concert.controller';

const router = AsyncRouter();

router.get('/', getAllConcerts);
router.get('/:id', getConcert);
router.put('/', addConcert);

export default router;
