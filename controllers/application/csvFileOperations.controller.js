const fs = require('fs'); 
const { parse } = require('csv-parse');
const { Application } = require('../../models/application.model');
const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');
const csvDownload = require('../../utils/downloadCSV');

class csvFile {

    async parseCSVFile(req, res, next) {

        try {

            if (req.userId) { 

                const fetchedList = [];

                fs.createReadStream(__basedir + '/uploads/sample1000.csv')
                    .pipe(parse({
                        columns: true,
                    }))
                    .on('data', (data) => {
                        fetchedList.push(data);
                    })
                    .on('error', (err) => {
                        next(err);
                    })
                    .on('end', () => {
                        return successResponse.getSuccessMessage(res, fetchedList);
                    });

            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch(err) {
            next(err);
        }
    }

    async downloadCSVFile(req, res, next) {

        try {

            req.userId = req.query.userId;

            if (req.userId) { 

                const fields = [
                    {
                        label: 'Id',
                        value: '_id'
                    },
                    {
                        label: 'Event creator ID',
                        value: 'eventCreatorId'
                    },
                    {
                        label: 'Event Type',
                        value: 'eventType'
                    },
                    {
                        label: 'Event Name',
                        value: 'eventName'
                    },
                    {
                        label: 'Event Date',
                        value: 'eventDate'
                    },
                    {
                        label: 'Event Address',
                        value: 'eventAddress'
                    },
                    {
                        label: 'State',
                        value: 'eventState.state_name'
                    },
                    {
                        label: 'District',
                        value: 'eventDistrict.district_name'
                    }, 
                    {
                        label: 'Number of Guests Invited',
                        value: 'eventGuestsInvited'
                    },
                    {
                        label: 'Event Owner Name',
                        value: (row) => row.eventOwner.firstName + ' ' + row.eventOwner.lastName
                    },
                    {
                        label: 'Event Owner No.',
                        value: 'eventOwner.phone'
                    },
                    {
                        label: 'Event Owner Email',
                        value: 'eventOwner.email'
                    }, 
                    {
                        label: 'Created At',
                        value: 'createdAt'
                    },
                    {
                        label: 'Updated At',
                        value: 'updatedAt'
                    }
                ];

                let applications = await Application.find({ eventCreatorId : req.userId });

                return csvDownload.downloadResource(res, `applications-${req.userId}.csv`, fields, applications);

               
            } else {
                return errorResponse.getErrorMessage(res, 'Unauthorized Access');
            }

        } catch(err) {
            next(err);
        }
    }

}


module.exports = new csvFile();