const fs = require('fs'); 
const { parse } = require('csv-parse');
const successResponse = require('../../utils/successResponse');
const errorResponse = require('../../utils/errorResponse');

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

}


module.exports = new csvFile();