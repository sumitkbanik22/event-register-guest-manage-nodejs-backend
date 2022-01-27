const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');
const { User } = require('../models/user.model');
class AuthMiddleware {

    async authenticate(req, res, next) {
        
        try {

            const token = req.body.token || req.query.token || req.headers['authorization'].split(' ')[1] || req.headers['x-access-token'].split(' ')[1];

            if (!token) {
                return errorResponse.getErrorMessage(res, 'A token is required for authentication', 403);
            }

            const decoded = await jwt.verify(token, process.env.jwtSecretKey);
            let user;
            if (decoded) {
                user = await User.findOne({ _id : decoded._id });
            }
            req.userRole = user.userRole;
            req.userId = user._id;

            next();

        } catch (err) {
            next(err);
        }
    }

};

module.exports = new AuthMiddleware();