import { body } from 'express-validator';

export const userValidation = [
  body('username')
    .notEmpty().withMessage('Username is required'),
  body('email')
    .isEmail().withMessage('Email is not valid'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];
