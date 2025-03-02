const express = require('express');
const reviewHandler = require('./../controller/reviewController');
const authController = require('./../controller/authController');

//to get excess to params of previous routes set mergeParams property true
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewHandler.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user', 'guide'),
    reviewHandler.createReview
  );

router.route('/:id').delete(reviewHandler.deleteReview);

module.exports = router;
