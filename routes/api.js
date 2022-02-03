const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/api/user.routes');
const applicationRoutes = require('../routes/api/application.routes');
const swaggerRoutes = require('../routes/api/swagger.routes');

// routes
router.use('/user', userRoutes);
router.use('/application', applicationRoutes);
router.use('/swagger', swaggerRoutes);



module.exports = router;