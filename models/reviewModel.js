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

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

rewiewSchema.post('save', function () {
  //this points to current review doc and this.constructor points to current model
  this.constructor.calAverageRatings(this.tour);
  // next();    //post middleware does'nt have access to next function
});

//findByIdAndUpdate -> internally both these queries use findOne()
//findByIdAndDelete
//implementing updating tours review on updation and deletion

//this gonna be a query middleware
rewiewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

rewiewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', rewiewSchema);

module.exports = Review;
