import express from 'express';
import { body } from 'express-validator';
import reviewCTRL from '../controllers/reviewCTRL.js';
import requestHandler from '../handlers/request.handler.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

const router = express.Router({ mergeParams: true });

router.get('/', tokenMiddleware.auth, reviewCTRL.getReviewsOfUser);

router.post(
    '/',
    tokenMiddleware.auth,
    body('rate').exists().withMessage('Rate is required'),
    requestHandler.validate,
    reviewCTRL.create
);

router.delete('/:reviewId', tokenMiddleware.auth, reviewCTRL.remove);

export default router;
