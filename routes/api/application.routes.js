const express = require("express");
const router = express.Router();

// controllers
const stateAndDistrictController = require('../../controllers/application/stateAndDistrict.controller');

const applicationController = require('../../controllers/application/createApplication.controller');

const authmiddleware = require("../../middlewares/auth.middleware");

router.use(authmiddleware.authenticate);
router.get('/states', stateAndDistrictController.getStates);
router.get('/districts/:stateId', stateAndDistrictController.getDistricts);
router.post('/state/addDistricts', stateAndDistrictController.addDistricts);
router.post('/addEvent', applicationController.createApplication);

module.exports = router;