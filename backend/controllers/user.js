const User = require('../models/user');
const config=require('../config');
const createUser = async (req, res, next) => {
    const exisitingUser = await User.findOne({ email: req.body.email });
    if (exisitingUser) {
        const error = new Error('User already exists')
        error.statusCode = 401
        return res.status(401).json({
            success: false,
            statusCode: 401,
            data: {},
            message: 'User already exists',
            error: error
        })
    }
    const user = new User({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        domain: req.body.domain,
        gender:req.body.gender,
        avatar:config.user.avatar.defaultUrl,
        available:true
    })
    try {
        const createdUser = await user.save();
        return res.status(201).json({
            success: true,
            statusCode: 201,
            data: createdUser,
            message: 'User created successfully',
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
 


const updateUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
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
    if(req.body.firstName){
        user.firstName=req.body.firstName;
    }
    if(req.body.lastName){
        user.lastName=req.body.lastName;
    }
    if(req.body.email){
        user.email = req.body.email;
    }
    if(req.body.domain){
        user.domain = req.body.domain;
    }
    if (req.body.gender) {
        user.gender = req.body.gender;
    }
    if(req.body.available){
        user.available = req.body.available;
    }

    try {
        const updateUser = await user.save();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: updateUser,
            message: 'User updated successfully',
            error: {}
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            data: {},
            message: 'Internal server error',
            error: error
        })
    }
};

const deleteUser = async (req, res, next) => {

    const user = await User.findById(req.params.id);
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
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: user,
            message: 'User deleted successfully',
            error: {}
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            data: {},
            message: 'Internal server error',
            error: error
        })
    }
};

const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
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
    return res.status(200).json({
        success: true,
        statusCode: 200,
        data: user,
        message: 'User fetched successfully',
        error: {}
    })
};

const getUserList = async (req, res, next) => {
    console.log(req.query)
    try {
      if (!req.query.firstName && !req.query.lastName && !req.query.domain && !req.query.gender && !req.query.availability) {
        const allUsers = await User.find().limit(10);
          return res.status(200).json({
              success: true,
              statusCode: 200,
              data: allUsers,
              message: "User fetched successfully",
              error: {}
          })
      }
  
      const query = {};
  
      if (req.query.firstName) {
        query.firstName= { $regex: new RegExp(req.query.firstName, 'i') }
      }
      if (req.query.lastName) {
          query.lastName= { $regex: new RegExp(req.query.lastName, 'i') }
      }
  
      if (req.query.domain) {
        query.domain ={ $regex: new RegExp(req.query.domain, 'i') };
      }
  
      if (req.query.gender) {
        // Case-insensitive regex for gender
        query.gender = { $regex: new RegExp(req.query.gender, 'i') };
      }
  
      if (req.query.available) {
        query.available = req.query.available === 'true' ? true : false;
        }
    const users = await User.find(query).limit(10);
      res.status(200).json({
        success: true,
        statusCode: 200,
        data: users,
        message: 'User fetched successfully',
        error: {},
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        statusCode: 500,
        data: {},
        message: 'Internal server error',
        error: error,
      });
    }
  };
  

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUserList
};