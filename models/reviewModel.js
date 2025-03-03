const mongoose = require('mongoose');
const Tour = require('./tourModel');

const rewiewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "A review can't be empty."],
    },
    rating: {
      type: Number,
      default: 1,
      min: [1, 'Rating must be greater or equal 1'],
      max: [5, 'Rating must be less or equal 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a author.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Query middleware
rewiewSchema.pre(/^find/, function (next) {
  this.populate([
    // {
    //   path: 'tour',
    //   select: 'name',
    // },
    {
      path: 'author',
      select: 'name photo',
    },
  ]);
  next();
});

//static method for calculating avgRating
rewiewSchema.statics.calAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  console.log(stats);
  await Tour.findByIdAndUpdate(tourId, {
    ratingsAverage: stats[0].avgRating,
    ratingsQuantity: stats[0].nRating,
  });
};

rewiewSchema.post('save', function () {
  //this points to current review doc and this.constructor points to current model
  this.constructor.calAverageRatings(this.tour);
  // next();    //post middleware does'nt have access to next function
});

const Review = mongoose.model('Review', rewiewSchema);

module.exports = Review;
