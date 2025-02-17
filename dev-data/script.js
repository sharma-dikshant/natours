const mongoose = require('mongoose');
const Tour = require(`${__dirname}/../models/tourModel`);
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

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

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8')
);

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log('ERROR in deleting data', err);
  } finally {
    process.exit();
  }
};

const importData = async () => {
  try {
    await Tour.create(data);
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
