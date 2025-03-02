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
    reviewHandler.setTourUserIds,
    reviewHandler.createReview
  );

router
  .route('/:id')
  .get(reviewHandler.getReview)
  .delete(reviewHandler.deleteReview)
  .patch(reviewHandler.updateReview);

module.exports = router;
