const express = require("express");
const router = express.Router();

// controllers
const stateAndDistrictController = require('../../controllers/application/stateAndDistrict.controller');

const authmiddleware = require("../../middlewares/auth.middleware");

router.use(authmiddleware.authenticate);
router.get('/states', stateAndDistrictController.getStates);
router.get('/districts/:stateId', stateAndDistrictController.getDistricts);

module.exports = router;