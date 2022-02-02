const util = require('util');
const multer = require('multer');

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __basedir + "/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1]);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;