const express = require('express');
const tourController = require('./../controller/tourController');
const authController = require('./../controller/authController');
const reviewController = require('./../controller/reviewController');

const router = express.Router();

// router.param('id', checkId);

router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

//POST /tour/tourid1242w/reviews
//GET /tour/tourid1242w/reviews
//GET /tour/tourid1242w/reviews/reviewid1232w3

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user', 'guide'),
    reviewController.createReview
  );

module.exports = router;
