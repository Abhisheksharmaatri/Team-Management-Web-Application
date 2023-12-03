const express = require('express');
const { body, validationResult } = require('express-validator');
const config = require('../config');
const { createTeam, updateTeam, deleteTeam, addMember, getTeam, getTeamList } = require('../controllers/team');

const router = express.Router();

router.post('/', [
    body('name').exists().isLength({ min: config.team.name.minLength, max: config.team.name.maxLength }).withMessage('Name must be at least 3 characters long'),
    body('description').exists().isLength({ min: config.team.description.minLength, max: config.team.description.maxLength }).withMessage('Description must be at least 3 characters long'),
    body('owner').exists().withMessage('Owner is required')
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
}, createTeam);

router.put('/:id', [
    body('name').optional().isLength({ min: config.team.name.minLength, max: config.team.name.maxLength }).withMessage('Name must be at least 3 characters long'),
    body('description').optional().isLength({ min: config.team.description.minLength, max: config.team.description.maxLength }).withMessage('Description must be at least 3 characters long'),
    body('owner').exists().withMessage('Owner is required')
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
}, updateTeam);

router.delete('/:id', deleteTeam);

router.patch('/:id', [
    body('userId').exists().withMessage('Members is required')
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
}, addMember);

router.get('/:id', getTeam);

router.get('/', getTeamList);

module.exports = router;