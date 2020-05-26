import { AsyncRouter } from 'express-async-router';
import { getAllConcerts, addConcert, getConcert, getConcertsRecommendations, getConcertList, editConcert, deleteConcert } from './Concert.controller';

const router = AsyncRouter();

router.get('/', getAllConcerts);
router.get('/:id', getConcert);
router.put('/', addConcert);
router.post('/', editConcert);
router.get('/recs/:id', getConcertsRecommendations);
router.get('/list/:id', getConcertList);
router.delete('/:id', deleteConcert);

export default router;
