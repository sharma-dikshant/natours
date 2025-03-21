const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  //1) Get Tour Data from collection
  const tours = await Tour.find();

  //2) Build templete
  //3) Render that template using tour data
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'name review rating author',
  });
  res.status(200).render('tour', {
    title: 'All tours',
    tour,
  });
});
