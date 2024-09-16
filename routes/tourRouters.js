const express = require('express');
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  checkId,
} = require('./../controller/tourController');

const router = express.Router();

router.param('id', checkId);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
