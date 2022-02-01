const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({

    eventCreatorId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    eventType: {
        type: Number,
    },
    eventDate: {
        type: Date,
    },
    eventAddress: {
        type: String,
    },
    eventState: {
        type: Object,
    },
    eventDistrict: {
        type: Object,
    },
    eventGuestsInvited: {
        type: Number
    },
    eventOwner: {
        type: Object
    }
},{
    timestamps: true
});

const Application = mongoose.model('Application', ApplicationSchema);

exports.Application = Application;