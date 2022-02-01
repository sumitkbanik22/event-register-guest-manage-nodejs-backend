const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');
const { Application } = require('../../models/application.model');

class ApplicationOperations {

    async applicationIndex(req, res, next) {

        try {

            if (req.userId) { 

                let applications = await Application.find({ eveeventCreatorIdntId : req.userId });

                return successResponse.getSuccessMessage(res, applications);
                
            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {
            next(err);
        }
    }

}

module.exports = new ApplicationOperations();