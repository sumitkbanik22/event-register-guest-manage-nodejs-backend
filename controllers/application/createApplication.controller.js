const Joi = require('joi');
const _ = require('lodash');
const { Application } = require('../../models/application.model');
const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');
const sendEmail = require('../../utils/sendEmail');
const moment = require('moment');

class ApplicationCreate {

    async createApplication(req, res, next) {

        try {

            if (req.userId) { 
                
                req.eventCreatorId = req.userId;

                const { error } = validateCreateApplicationReq(req.body);
                if (error) {
                    return errorResponse.getErrorMessage(res, error.details[0].message);
                }

                let application = new Application(_.pick(req.body, ['eventCreatorId', 'eventType', 'eventDate', 'eventAddress', 'eventState', 'eventDistrict', 'eventGuestsInvited', 'eventOwner']));

                await application.save();

                await sendEmail.sendEmail(
                    application.eventOwner.email,
                    'Event Registered!',
                    {
                        name: application.eventOwner.firstName + (application.eventOwner.lastName ? ' ' + application.eventOwner.lastName : ''),
                        msg: `Your event scheduled on ${moment(application.eventDate).format('DD/MM/YYYY')} is registered!!!`
                    },
                    './templates/eventRegistered.handlebars'
                );

                return successResponse.getSuccessMessage(res, _.pick(application, ['_id', 'eventCreatorId', 'eventType', 'eventDate', 'eventAddress', 'eventState', 'eventDistrict', 'eventGuestsInvited', 'eventOwner']));


            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch (err) {
            next(err);
        }

    }

}

function validateCreateApplicationReq(req) {
    const schema = Joi.object({
        eventCreatorId: Joi.required(),
        eventType: Joi.number().required(),
        eventDate: Joi.date().required(),
        eventAddress: Joi.string().required(),
        eventState: Joi.object().required(),
        eventDistrict: Joi.object().required(),
        eventGuestsInvited: Joi.number().required(),
        eventOwner: Joi.object().required()
    });
    const validation = schema.validate(req);
    return validation;
}

module.exports = new ApplicationCreate();