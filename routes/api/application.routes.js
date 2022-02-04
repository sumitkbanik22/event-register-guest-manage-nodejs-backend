const express = require("express");
const router = express.Router();

// controllers
const stateAndDistrictController = require('../../controllers/application/stateAndDistrict.controller');
const applicationController = require('../../controllers/application/createApplication.controller');
const applicationOperationsController = require('../../controllers/application/applicationOperations.controller');
const fileUploadController = require('../../controllers/application/fileUpload.controller');
const csvFileOperationsController = require('../../controllers/application/csvFileOperations.controller');

const authmiddleware = require("../../middlewares/auth.middleware");
const fileUploadMiddleware = require("../../middlewares/uploads.middleware")

router.use(authmiddleware.authenticate);
router.get('/states', stateAndDistrictController.getStates);
router.get('/districts/:stateId', stateAndDistrictController.getDistricts);
router.post('/state/addDistricts', stateAndDistrictController.addDistricts);
router.post('/addEvent', applicationController.createApplication);
router.get('/index', applicationOperationsController.applicationIndex);
router.post('/document/upload', fileUploadMiddleware, fileUploadController.upload);
router.get('/document/download/:fileName', fileUploadController.downloadFile);
router.get('/fetchCSVContent', csvFileOperationsController.parseCSVFile);
router.get('/index/paginationAndSearching', applicationOperationsController.applicationIndexWithPaginationAndSearching);

module.exports = router;