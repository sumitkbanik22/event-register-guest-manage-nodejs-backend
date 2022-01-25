
class SuccessResponse {

    async getSuccesMessage(res, data = null) {
        res.status(200).json({
            'status': 'success',
            'response': data ? data : 'Request processed successfully!'
        });
    }

};

module.exports = new SuccessResponse();