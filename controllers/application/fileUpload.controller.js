const Joi = require('joi');
const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');
const { Document } = require('../../models/document.model');
const { Application } = require('../../models/application.model');
const _ = require('lodash');

class FileUpload {

    async upload(req, res, next) {

        try {
            if (req.userId) { 

                req.body.fileName = req.file.filename;
                
                let applications = await Application.findById({ _id : req.body.eventId });

                req.body.eventOwner = applications.eventOwner;

                // first validate the request
                const { error } = validateFileUploadReq(req.body);
                if (error) {
                    return errorResponse.getErrorMessage(res, error.details[0].message);
                }

                if (req.file == undefined) {
                    return errorResponse.getErrorMessage(res, 'Please upload a file!');
                }

                let document = new Document(_.pick(req.body, ['eventId', 'fileName', 'eventOwner']));

                await document.save();

                return successResponse.getSuccessMessage(res, _.pick(req.body, ['eventId', 'fileName', 'eventOwner']));

            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {
            next(err);
        }
    }

    async downloadFile(req, res, next) {

        try {

            // if (req.userId) { 

                const fileName = req.params.fileName;
                const directoryPath = __basedir + "/uploads/";

                res.download(directoryPath + fileName, fileName, (err) => {
                    if (err) {
                        return errorResponse.getErrorMessage(res, '"Could not download the file.' + err, 500);
                    }
                });

            // } else {
            //     return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            // }

        } catch (err) {
            next(err);
        }
    }

}

function validateFileUploadReq(req) {

    const schema = Joi.object({
        eventId: Joi.required(),
        fileName: Joi.string().required(),
        eventOwner: Joi.object().required()
    });
    const validation = schema.validate(req);
    return validation;
}

module.exports = new FileUpload();