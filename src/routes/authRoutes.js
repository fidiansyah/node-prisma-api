import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
     loginValidation, 
     forgotPasswordValidation, 
     verifyOtpValidation, 
     resetPasswordValidation 
    } from '../validations/authValidation.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.post('/login', loginValidation, validate, authController.login);
router.post('/forgot-password', forgotPasswordValidation, validate, authController.forgotPassword);
router.post('/verify-otp', verifyOtpValidation, validate, authController.verifyOTP);
router.post('/reset-password', resetPasswordValidation, validate, authController.resetPassword);
router.get('/logout', authMiddleware, authController.logout);

export default router;
