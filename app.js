const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouters');
const userRouter = express.Router('./routes/userRouters');

//! 1) MIDDLEWARES

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;