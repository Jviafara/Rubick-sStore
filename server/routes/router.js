import express from 'express';

const router = express.Router();

import orderRoutes from './ordersRoutes.js';
import productsRoutes from './productsRoutes.js';
import reviewsRouter from './reviewRoutes.js';
import usersRoutes from './usersRoutes.js';

router.use('/products', productsRoutes);
router.use('/user', usersRoutes);
router.use('/orders', orderRoutes);
router.use('/reviews', reviewsRouter);

export default router;
