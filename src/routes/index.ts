import { Router } from 'express';
import hotelRoutes from './hotelRoutes';

const router = Router();

router.use('/', hotelRoutes);

export default router;
