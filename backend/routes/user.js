const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');
const config=require('../config');

const { createUser, updateUser, deleteUser, getUser, getUserList } = require('../controllers/user');

router.post('/', [
    body('firstName').exists().isLength({ min: config.user.name.minLength, max: config.user.name.maxLength }).withMessage('Name must be at least 3 characters long'),
    body('lastName').exists().isLength({ min: config.user.name.minLength, max: config.user.name.maxLength }).withMessage('Name must be at least 3 characters long'),
    body('email').exists().isEmail().withMessage('Please enter a valid email'),
    body('domain').exists().withMessage('Domain is required'),
    body('gender').exists().withMessage('Gender is required')
], (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            succes: false,
            statusCode: 400,
            data: {},
            message: 'Validation error',
            error: errors.array()
        });
    } else {
        next();
    }
}, createUser);

router.put('/:id', [
    body('firstName').optional().isLength({ min: config.user.name.minLength, max: config.user.name.maxLength }).withMessage('Name must be at least 3 characters long'),
    body('lastName').optional().isLength({ min: config.user.name.minLength, max: config.user.name.maxLength }).withMessage('Name must be at least 3 characters long'),
    body('email').optional().isEmail().withMessage('Please enter a valid email')

], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            succes: false,
            statusCode: 400,
            data: {},
            message: 'Validation error',
            error: errors.array()
        });
    } else {
        next();
    }
}, updateUser);

router.delete('/:id', deleteUser);

router.get('/:id', getUser);

router.get('/', getUserList);

module.exports = router;