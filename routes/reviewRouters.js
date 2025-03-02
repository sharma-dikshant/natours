const express = require('express');
const reviewHandler = require('./../controller/reviewController');
const authController = require('./../controller/authController');

//to get excess to params of previous routes set mergeParams property true
const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/')
  .get(reviewHandler.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewHandler.setTourUserIds,
    reviewHandler.createReview
  );

router
  .route('/:id')
  .get(reviewHandler.getReview)
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewHandler.deleteReview
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewHandler.updateReview
  );

module.exports = router;
