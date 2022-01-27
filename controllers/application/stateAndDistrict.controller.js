const axios = require('axios');
const _ = require('lodash');
const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');
const { State } = require('../../models/state.model');
const { District, validateDistrictsAddRequest } = require('../../models/district.model');
class StateAndDistrict {

    async getStates(req, res, next) {

        try {

            if (req.userId) {
                
                // const response = await axios.get(`${process.env.COWIN_PROD_URL}/v2/admin/location/states`);
                // return successResponse.getSuccessMessage(res, response.data);

                const states = await State.find({});

                console.log(states);

                return successResponse.getSuccessMessage(res, states);

            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {

            next(err);
        }

    }

    async getDistricts(req, res, next) {

        try {

            if (req.userId) {
                
                const stateId = req.params.stateId;
                // const response = await axios.get(`${process.env.COWIN_PROD_URL}/v2/admin/location/districts/${stateId}`);
                // return successResponse.getSuccessMessage(res, response.data);

                const districts = await District.findOne({state_id : stateId});

                return successResponse.getSuccessMessage(res, districts);

            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {

            next(err);
        }

    }

    async addDistricts(req, res, next) {

        try {

            if (req.userId && req.userRole == 2) {

                // first validate the request
                const { error } = validateDistrictsAddRequest(req.body);
                if (error) {
                    return errorResponse.getErrorMessage(res, error.details[0].message);
                }

                let districts = new District(_.pick(req.body, ['state_id', 'state_name', 'districts']));

                await districts.save();

                return successResponse.getSuccessMessage(res, _.pick(districts, ['state_id', 'state_name', 'districts']));

            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {
            next(err);
        }
    }

};

module.exports = new StateAndDistrict();