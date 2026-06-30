import { body, validationResult } from "express-validator";


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const registerValidator = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    body('role').isIn(['buyer', 'seller']).withMessage('Invalid role'),
    body('contact').trim().notEmpty().withMessage('Contact is required'),
    validate
];