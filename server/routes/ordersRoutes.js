import express from 'express';
import tokenMiddleware from '../middlewares/token.middleware.js';

const router = express.Router();

import orderCTRL from '../controllers/ordersCTRL.js';

router.post('/create', orderCTRL.create);
router.get('/order-detail/:id', tokenMiddleware.auth, orderCTRL.orderDetail);
router.get('/', tokenMiddleware.auth, orderCTRL.ordersList);
router.put('/order-payment/:id', tokenMiddleware.auth, orderCTRL.orderPayment);
router.put(
    '/order-delivery/:id',
    tokenMiddleware.auth,
    orderCTRL.orderDelivery
);
router.delete('/delete/:id', tokenMiddleware.auth, orderCTRL.remove);
router.put('/update/:id', tokenMiddleware.auth, orderCTRL.updateOrder);

export default router;
