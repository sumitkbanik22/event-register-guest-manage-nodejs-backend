const axios = require('axios');
const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');

class StateAndDistrict {

    async getStates(req, res, next) {

        try {

            if (req.userId) {
                
                const response = await axios.get(`${process.env.COWIN_PROD_URL}/v2/admin/location/states`);
                return successResponse.getSuccessMessage(res, response.data);

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
                const response = await axios.get(`${process.env.COWIN_PROD_URL}/v2/admin/location/districts/${stateId}`);
                return successResponse.getSuccessMessage(res, response.data);

            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {

            next(err);
        }

    }

};

module.exports = new StateAndDistrict();