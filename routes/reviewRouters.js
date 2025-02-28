const express = require('express');
const reviewHandler = require('./../controller/reviewController');
const authController = require('./../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(reviewHandler.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user', 'guide'),
    reviewHandler.createReview
  );

module.exports = router;
