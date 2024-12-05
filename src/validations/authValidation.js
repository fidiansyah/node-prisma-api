import { body } from 'express-validator';

export const loginValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const forgotPasswordValidation = [
  body('email')
    .isEmail().withMessage('Please provide a valid email address')
    .notEmpty().withMessage('Email is required'),
];

export const verifyOtpValidation = [
  body('email')
    .isEmail().withMessage('Please provide a valid email address')
    .notEmpty().withMessage('Email is required'),
  body('otp')
    .notEmpty().withMessage('OTP is required'),
];

export const resetPasswordValidation = [
  body('email')
    .isEmail().withMessage('Please provide a valid email address')
    .notEmpty().withMessage('Email is required'),
  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
