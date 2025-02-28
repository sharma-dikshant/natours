const mongoose = require('mongoose');

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
    {
      path: 'tour',
      select: 'name',
    },
    {
      path: 'author',
      select: 'name photo',
    },
  ]);
  next();
});

const Review = mongoose.model('Review', rewiewSchema);

module.exports = Review;
