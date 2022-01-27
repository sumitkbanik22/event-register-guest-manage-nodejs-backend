const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StateSchema = new Schema({

    state_id : {
        type: Number,
        required: true,
        unique: true
    },
    state_name : {
        type: String,
        required: true,
        unique: true
    }
});

const State = mongoose.model('State', StateSchema);

exports.State = State;