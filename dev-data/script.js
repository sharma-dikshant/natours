const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require(`${__dirname}/../models/tourModel`);
const User = require(`${__dirname}/../models/userModel`);
const Review = require(`${__dirname}/../models/reviewModel`);

const DB = process.env.DATABASE.replace(
  '<DB_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log('DB is not connected', err);
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);

const dropIndex = (ind) =>
  Tour.collection
    .dropIndex(ind)
    .then(() => {
      console.log("Unique index on 'name' dropped");
    })
    .catch((err) => {
      console.log('Error dropping index:', err);
    });

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log('ERROR in deleting data', err);
  } finally {
    process.exit();
  }
};

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log('ERROR in importing data', err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--import') {
  importData();
} else {
  console.log('Please provide a valid command');
}

// dropIndex('name_1');
