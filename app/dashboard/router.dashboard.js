const express = require('express');
const dashboardController = require('./dashboard.controller');

const router = express.Router();

router.get('/api/user',dashboardController.advocates);
router.post('/api/user/add',dashboardController.addAdvocate);
router.get('/api/user/:userId',dashboardController.advocate);
router.delete('/api/user/:userId',dashboardController.advocateUserDelete);
module.exports = router;