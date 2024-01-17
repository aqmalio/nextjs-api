const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const segmentController = require('../controllers/segmentController');
const userController = require('../controllers/userController');

// Define routes
router.get('/summary/users-per-day', summaryController.getUniqUsersDay)
router.get('/summary/total-unique-users', summaryController.getTotalUniqueUsers)
router.get('/summary/new-returning-users', summaryController.getNewReturningUsers)
router.get('/summary/total-new-returning-users', summaryController.getTotalNewReturningUsers)
router.get('/summary/busy-day', summaryController.getBusyDay)
router.get('/summary/busy-hour', summaryController.getBusyHour)
router.get('/summary/total-data', summaryController.getTotalData)

router.get('/segment/age', segmentController.getSegmentAge)
router.get('/segment/gender', segmentController.getSegmentGender)
router.get('/segment/brand-device', segmentController.getSegmentBrandDevice)
router.get('/segment/digital-interest', segmentController.getSegmentDigitalInterest)

router.get('/user/:id/detail', userController.getUserDetail)
router.get('/user/by', userController.getUserByLocation)

module.exports = router;