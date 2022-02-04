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

    async applicationIndexWithPaginationAndSearching(req, res, next) {

        try {

            if (req.userId) { 

                const limit = req.query.limit || 2;
                const currentPage = req.query.page || 1;
                const searchQuery = req.query.searchQuery

                if (searchQuery) {
                    // const allApplicationsBasedOnSearching = await Application.find({ eventCreatorId : req.userId, eventName: {$regex: new RegExp(`^${searchQuery}$`, 'i')}});

                    // db.users.find(name: new RegExp(search)) //For substring search, case sensitive. 
                    // db.users.find(name: new RegExp('^' + search + '$')) //For exact search, case sensitive
                    // db.users.find(name: new RegExp(search, 'i')) //For substring search, case insensitive
                    // db.users.find(name: new RegExp('^' +search + '$', 'i')); //For exact search, case insensitive
                    
                    const allApplicationsBasedOnSearching = await Application.find({ eventCreatorId : req.userId, eventName: {$regex:  new RegExp(searchQuery, 'i')}});

                    Application.find({ eventCreatorId : req.userId, eventName: {$regex: new RegExp(searchQuery, 'i') }}) // find applications based on userId
                                .sort({'eventDate' : 1}) // sorting with eventDate property
                                .skip((limit * currentPage) - limit) // in the first page the value of the skip is 0
                                .limit(limit) // output just 2 items
                                .exec((err, applications) => {
                                    if (err) {
                                        next(err);
                                    } else {       
                                        return successResponse.getSuccessMessage(res, { data : applications, pagination : {
                                            limit : Number(limit),
                                            currentPage: Number(currentPage),
                                            totalPages: Math.ceil(allApplicationsBasedOnSearching.length / limit),
                                            totalDocuments: allApplicationsBasedOnSearching.length
                                        }});

                                    }
                                }); 
                } else {

                    const allApplicationsBasedOnEventCreatorId = await Application.find({ eventCreatorId : req.userId });

                    Application.find({ eventCreatorId : req.userId }) // find applications based on userId
                                .sort({'eventDate' : 1}) // sorting with eventDate property
                                .skip((limit * currentPage) - limit) // in the first page the value of the skip is 0
                                .limit(limit) // output just 2 items
                                .exec((err, applications) => {
                                    if (err) {
                                        next(err);
                                    } else {
                                        return successResponse.getSuccessMessage(res, { data : applications, pagination : {
                                            limit : Number(limit),
                                            currentPage: Number(currentPage),
                                            totalPages: Math.ceil(allApplicationsBasedOnEventCreatorId.length / limit),
                                            totalDocuments: allApplicationsBasedOnEventCreatorId.length
                                        }});
                                    }
                                }); 
                }
                  
            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {
            next(err);
        }
    }

}

module.exports = new ApplicationOperations();