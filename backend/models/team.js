const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: 
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
});

const TeamModel = mongoose.model('Team', teamSchema);

module.exports = TeamModel;
