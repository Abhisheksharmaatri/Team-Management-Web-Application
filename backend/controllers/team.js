const Team = require('../models/team');
const User = require('../models/user');
const config = require('../config');

const createTeam = async (req, res, next) => { 
    const team = new Team({
        name: req.body.name,
        description: req.body.description,
        owner: req.body.owner
    })
    try {
        const createdTeam = await team.save();
        return res.status(201).json({
            success: true,
            statusCode: 201,
            data: createdTeam,
            message: 'Team created successfully',
            error: {}
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            statusCode: 500,
            data: {},
            message: 'Internal server error',
            error: error
        })
    }
};

const updateTeam = async (req, res, next) => { 
    const team = await Team.findById(req.params.id);
    if (!team) {
        const error = new Error('Team not found')
        error.statusCode = 401
        return res.status(401).json({
            success: false,
            statusCode: 401,
            data: {},
            message: 'Team not found',
            error: error
        })
    }
    if(req.body.name){
        team.name=req.body.name;
    }
    if(req.body.description){
        team.description=req.body.description;
    }
    if(req.body.owner){
        team.owner = req.body.owner;
    }
    try {
        const updatedTeam = await team.save();
        return res.status(201).json({
            success: true,
            statusCode: 201,
            data: updatedTeam,
            message: 'Team updated successfully',
            error: {}
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            statusCode: 500,
            data: {},
            message: 'Internal server error',
            error: error
        })
    }
};

const deleteTeam = async (req, res, next) => { 
    const team=await Team.findById(req.params.id);
    if (!team) {
        const error = new Error('Team not found')
        error.statusCode = 401
        return res.status(401).json({
            success: false,
            statusCode: 401,
            data: {},
            message: 'Team not found',
            error: error
        })
    }
    try {
        await Team.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: team,
            message: 'Team deleted successfully',
            error: {}
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            statusCode: 500,
            data: {},
            message: 'Internal server error',
            error: error
        })
    }
};

const addMember = async (req, res, next) => {
    const team = await Team.findById(req.params.id);
    if (!team) {
        const error = new Error('Team not found')
        error.statusCode = 401
        return res.status(401).json({
            success: false,
            statusCode: 401,
            data: {},
            message: 'Team not found',
            error: error
        })
    }
    const user = await User.findById(req.body.userId);
    if (!user) {
        const error = new Error('User not found')
        error.statusCode = 401
        return res.status(401).json({
            success: false,
            statusCode: 401,
            data: {},
            message: 'User not found',
            error: error
        })
    }
    if (team.members.includes(user._id)) { 
        const error = new Error('User already a member of this team')
        error.statusCode = 401
        return res.status(401).json({
            success: false,
            statusCode: 401,
            data: {},
            message: 'User already a member of this team',
            error: error
        })
    }
    try {
        team.members.push(user);
        const updatedTeam = await team.save();
        return res.status(201).json({
            success: true,
            statusCode: 201,
            data: updatedTeam,
            message: 'Member added successfully',
            error: {}
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            statusCode: 500,
            data: {},
            message: 'Internal server error',
            error: error
        })
    }
 }

const getTeam = async (req, res, next) => {
    try {
    const team = await Team.findById(req.params.id).populate('owner').populate('members');
    if (!team) {
        const error = new Error('Team not found')
        error.statusCode = 401
        return res.status(401).json({
            success: false,
            statusCode: 401,
            data: {},
            message: 'Team not found',
            error: error
        })
    }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: team,
            message: 'Team fetched successfully',
            error: {}
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            statusCode: 500,
            data: {},
            message: 'Internal server error',
            error: error
        })
    }
 };

const getTeamList = async (req, res, next) => {
    try {
        if (!req.query.name && !req.query.owner) {
            const teams = await Team.find().populate('owner').populate('members').limit(10);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: teams,
                message: 'Team list fetched successfully',
                error: {}
            });
        }

        const query = {};
        if (req.query.name) {
            query.name = { $regex: new RegExp(req.query.name, 'i') };
        }
        if (req.query.owner) {
            query.owner = req.query.owner;
        }

        const teams = await Team.find(query).populate('owner').populate('members');
        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: teams,
            message: 'Team list fetched successfully',
            error: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            data: {},
            message: 'Internal server error',
            error: error
        });
    };
};
 
module.exports = {
    createTeam,
    updateTeam,
    deleteTeam,
    addMember,
    getTeam,
    getTeamList
}