const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DistrictSchema = new Schema({

    state_id : {
        type: Number,
        required: true
    },
    state_name : {
        type: String,
        required: true
    },
    districts : {
        type: Array,
        required: true
    }
});

function validateDistrictsAddRequest(req) {
    const schema = Joi.object({
        state_id: Joi.number().required(),
        state_name: Joi.string().required(),
        districts: Joi.array().required()
    });
    const validation = schema.validate(req);
    return validation;
}

const District = mongoose.model('District', DistrictSchema);

exports.District = District;
exports.validateDistrictsAddRequest = validateDistrictsAddRequest;