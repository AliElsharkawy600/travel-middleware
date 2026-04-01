import { Router } from 'express';
import { getHotels } from '../controllers/hotel';

const router = Router();

router.get('/hotels', getHotels);

export default router;
