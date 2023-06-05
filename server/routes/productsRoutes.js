import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import storage from '../config/cloudinary.js';
import productsCTRL from '../controllers/productsCTRL.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

const router = express.Router();

var upload = multer({ storage });

router.get('/', productsCTRL.productList);

router.post(
    '/create',
    tokenMiddleware.auth,
    upload.any('images'),
    productsCTRL.create
);

router.get('/slug/:slug', productsCTRL.productInfo);

router.get('/:id', productsCTRL.productInfoById);

router.delete('/:id', tokenMiddleware.auth, productsCTRL.remove);

router.put('/update/:id', tokenMiddleware.auth, productsCTRL.update);
router.put(
    '/add-images/:id',
    tokenMiddleware.auth,
    upload.any('images'),
    productsCTRL.addImages
);

export default router;
