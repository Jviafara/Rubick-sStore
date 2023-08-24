import express from 'express';
import { body } from 'express-validator';
import favoriteCTRL from '../controllers/favoriteCTRL.js';
import userCTRL from '../controllers/usersCTRL.js';
import requestHandler from '../handlers/request.handler.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
import User from '../models/user.js';

const router = express.Router();

router.post(
    '/register',
    body('name').exists().withMessage('Full Name is required'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email not valid')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) throw new Error('User already exists');
        }),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 0 })
        .withMessage('Password minimun 8 characters'),
    body('confirmPassword')
        .exists()
        .withMessage('Confirm Password is required')
        .isLength({ min: 0 })
        .withMessage('Password minimun 8 characters')
        .custom((value, { req }) => {
            if (value !== req.body.password)
                throw new Error("Passwords don't match");
            return true;
        }),
    requestHandler.validate,
    userCTRL.register
);

router.post(
    '/login',
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email not valid'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 0 })
        .withMessage('Password minimun 8 characters'),
    requestHandler.validate,
    userCTRL.login
);

router.put(
    '/updated',
    tokenMiddleware.auth,
    body('name').exists().withMessage('Full Name is required'),
    body('email')
        .exists()
        .withMessage('Password is required')
        .isEmail()
        .withMessage('Email not valid')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) Promise.reject('User already exists');
        }),
    requestHandler.validate,
    userCTRL.updatePassword
);

router.put(
    '/update-password',
    tokenMiddleware.auth,
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 0 })
        .withMessage('Username minimun 8 characters'),
    body('newPassword')
        .exists()
        .withMessage('New Password is required')
        .isLength({ min: 0 })
        .withMessage('New Password minimun 8 characters'),
    body('confirmNewPassword')
        .exists()
        .withMessage('Confirm New Password is required')
        .isLength({ min: 0 })
        .withMessage('Confirm new Password minimun 8 characters')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword)
                throw new Error("Passwords don't match");
            return true;
        }),
    requestHandler.validate,
    userCTRL.updatePassword
);

router.put('/change-rol/:id', tokenMiddleware.auth, userCTRL.changeRol);

router.get('/info', tokenMiddleware.auth, userCTRL.getinfo);

router.get('/users-list', tokenMiddleware.auth, userCTRL.usersList);

router.delete('/:id', tokenMiddleware.auth, userCTRL.remove);

router.post('/favorites', tokenMiddleware.auth, favoriteCTRL.addFavorite);

router.get('/favorites', tokenMiddleware.auth, favoriteCTRL.getFavoritesUser);

router.delete(
    '/favorites/:favoriteId',
    tokenMiddleware.auth,
    favoriteCTRL.removeFavorite
);

export default router;
