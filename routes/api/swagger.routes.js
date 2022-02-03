const express = require("express");
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('../../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;