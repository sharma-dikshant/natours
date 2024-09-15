const express = require('express');
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
} = require('./../controller/tourController');

const route = express.Router();

route.route('/').get(getAllTours).post(createTour);
route.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = route;
