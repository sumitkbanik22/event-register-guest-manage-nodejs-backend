const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');
const { Application } = require('../../models/application.model');

class ApplicationOperations {

    async applicationIndex(req, res, next) {

        try {

            if (req.userId) { 

                let applications = await Application.find({ eventCreatorId : req.userId });

                return successResponse.getSuccessMessage(res, applications);
                
            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {
            next(err);
        }
    }

    async applicationIndexWithPagination(req, res, next) {

        try {

            if (req.userId) { 

                const allApplications = await Application.find({ eventCreatorId : req.userId });

                const limit = req.query.limit || 2;
                const currentPage = req.query.page || 1;
                
                Application.find({ eventCreatorId : req.userId }) // find applications based on userId
                            .sort({'eventDate' : 1}) // sorting with eventDate property
                            .skip((limit * currentPage) - limit) // in the first page the value of the skip is 0
                            .limit(limit) // output just 2 items
                            .exec((err, applications) => {
                                if (err) {
                                    next(err);
                                } else {
                                    Application.count((err, count) => { // count to calculate the number of pages
                                        if (err) {
                                            next(err);
                                        } else {
                                            return successResponse.getSuccessMessage(res, { data : applications, pagination : {
                                                limit : Number(limit),
                                                currentPage: Number(currentPage),
                                                totalPages: Math.ceil(count / limit),
                                                totalDocuments: allApplications.length
                                            }});
                                        }
                                    })

                                }
                            });     
            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {
            next(err);
        }
    }

}

module.exports = new ApplicationOperations();