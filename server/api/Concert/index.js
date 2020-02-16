import { AsyncRouter } from 'express-async-router';
import { getAllConcerts, addConcert, getConcert, getConcertsRecommendations } from './Concert.controller';

const router = AsyncRouter();

router.get('/', getAllConcerts);
router.get('/:id', getConcert);
router.put('/', addConcert);
router.get('/recs/:id', getConcertsRecommendations);

export default router;
