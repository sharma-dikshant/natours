const Tour = require('../models/tourModel');


exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    // result: tours.length,
    // requestedAt: req.requestTime,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: '<Updated Tour here... >',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
